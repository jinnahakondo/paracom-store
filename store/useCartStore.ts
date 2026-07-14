import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { StateCreator } from "zustand";


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
    checkOutItem: CartItem | null;
    isLoading: boolean;

    addToCart: ({ product, userId }: AddToCart) => void;
    removeCartItem: ({ product, userId }: RemoveCartItem) => void;
    updateQuantity: ({ productId, quantity, userId, type }: UpdateQuantity) => void;
    setCheckOutItem: (cartItem: CartItem) => void;
    clearCheckOutItem: () => void;
}



const store: StateCreator<CartState> = (set, get) => ({
    cartItems: [],
    checkOutItem: null,
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
    setCheckOutItem: (cartItem) => set({ checkOutItem: cartItem }),
    clearCheckOutItem: () => set({ checkOutItem: null })
})


export const useCartStore = create<CartState>()(
    persist(
        devtools(store),
        { name: "cart" }
    )
)
