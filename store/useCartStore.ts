import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { StateCreator } from "zustand";
import { verifyAuth } from '@/lib/auth/verifyAuth';
import { getCartData, mergeCartDb } from '@/lib/fetchData';
import { CartType } from '@/types/types';



export interface CartItem {
    _id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

// actions 
interface AddToCart {
    product: CartItem;
    userId?: string | null
};

type RemoveCartItem = AddToCart;

interface UpdateQuantity {
    productId: string;
    quantity?: number;
    userId?: string | null;
    type: 'INCREMENT' | 'DECREMENT' | 'QUANTITY'
}


interface CartState {
    cartItems: CartItem[];
    isLoading: boolean;

    addToCart: ({ product, userId }: AddToCart) => void;
    removeCartItem: ({ product, userId }: RemoveCartItem) => void;
    updateQuantity: ({ productId, quantity, userId, type }: UpdateQuantity) => void;
    clearCart: (userId?: string | null) => void;
    mergeCartWithDb: (userId: string) => Promise<void>;
}



const store: StateCreator<CartState> = (set, get) => ({
    cartItems: [],
    isLoading: false,


    addToCart: ({ product }) => {
        const currentItems = get().cartItems;
        const existingItem = currentItems.find(item => item._id === product._id);
        const updatedItems = existingItem ?
            currentItems.map(item => item._id === product._id ?
                { ...item, quantity: item.quantity + 1 }
                :
                item
            )
            :
            [...currentItems, product];

        set({ cartItems: updatedItems })
    },
    removeCartItem: ({ product }) => set(state => (
        {
            cartItems: state.cartItems.filter(item => item._id !== product._id)
        }
    )),
    updateQuantity: ({ productId, quantity, userId, type }) => {
        const currentItems = get().cartItems;

        const updatedItems = currentItems.map(item => item._id === productId ?
            {
                ...item,
                quantity: type === 'INCREMENT' ?
                    item.quantity + 1
                    :
                    type === 'DECREMENT' ?
                        Math.max(1, item.quantity - 1)
                        :
                        quantity ?? item.quantity
            }
            :
            item
        );

        set({ cartItems: updatedItems })
    },
    clearCart: (userId) => {
        set({ cartItems: [] })
    },
    mergeCartWithDb: async (userId) => {
        if (!userId) return;

        const localCart = get().cartItems;
        const { data } = await getCartData()
        const dbCart = data || []

        console.log(dbCart);

        // maping local cart items and database cartItems without duplicate
        const mergedMap = new Map();

        [...localCart, ...dbCart].forEach(item => {
            const existing = mergedMap.get(item._id);

            if (existing) {
                mergedMap.set(item._id, {
                    ...item,
                    quantity: existing.quantity + item.quantity
                });
            } else {
                mergedMap.set(item._id, item);
            }
        })

        // making an arry with mergedMap values 
        const mergedCart = Array.from(mergedMap.values())

        set({ cartItems: mergedCart });

        const items = mergedCart.map(cart => ({
            product: cart._id,
            quantity: Number(cart.quantity),

        }))

        const finalCart: CartType = {
            user: userId,
            items
        }

        await mergeCartDb(finalCart)

    }
})


export const useCartStore = create<CartState>()(
    persist(
        devtools(store),
        { name: "cart" }
    )
)
