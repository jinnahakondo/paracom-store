import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { StateCreator } from "zustand";
import { CartItemType } from '@/types/types';
import { addToCartDB, getDBCartData, mergeDBCart, removeDBCartItem, updateDBItemQty } from '@/lib/fetchData';



interface UpdateQuantity {
    status: boolean;
    itemId: string;
    quantity?: number;
    type: 'INCREMENT' | 'DECREMENT' | 'QUANTITY'
}

interface AddToCart {
    status: boolean,
    newItem: CartItemType
}

interface IRemoveCartItem {
    status: boolean,
    itemId: string
}


interface CartState {
    cartItems: CartItemType[];
    isLoading: boolean;

    addToCart: ({ status, newItem }: AddToCart) => Promise<void>;
    removeCartItem: ({ status, itemId }: IRemoveCartItem) => Promise<void>;
    updateQuantity: ({ status, itemId, quantity, type }: UpdateQuantity) => Promise<void>;
    clearCart: (userId?: string | null) => void;
    mergeCartWithDb: () => Promise<void>;
    toggleSelect: (itemId: string) => void;
    toggleSelectAll: (isSelected: boolean) => void;
    getSelectedItems: () => CartItemType[];
}



const store: StateCreator<CartState> = (set, get) => ({
    cartItems: [],
    totalPrice: 0,
    isLoading: false,

    addToCart: async ({ status, newItem }) => {
        const currentItems = get().cartItems;

        const existingItem = currentItems.find(item => item._id === newItem._id);

        const updatedItems = existingItem ?
            currentItems.map(item => item._id === newItem._id ?
                { ...item, quantity: item.quantity + 1 }
                :
                item
            )
            :
            [...currentItems, newItem];

        set({ cartItems: updatedItems })


        // db update 
        if (status) {
            try {
                await addToCartDB({ product: String(newItem._id), })
            } catch (error) {
                console.error(error);
            }
        }
    },
    removeCartItem: async ({ status, itemId }) => {
        set(state => (
            {
                cartItems: state.cartItems.filter(item => item._id !== itemId)
            }
        ));

        // remove item from db 
        if (status) {
            try {
                await removeDBCartItem(itemId)
            } catch (error) {
                console.log(error);
            }
        }
    },
    updateQuantity: async ({ status, itemId, quantity, type }) => {
        const currentItems = get().cartItems;

        const updatedItems = currentItems.map(item => item._id === itemId ?
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

        // update db cart item quantity 
        if (status) {
            try {
                await updateDBItemQty({ itemId, type })
            } catch (error) {
                console.log(error);
            }
        }

    },
    clearCart: (userId) => {
        set({ cartItems: [] })
    },

    mergeCartWithDb: async () => {


        const localCart = get().cartItems;

        const { data } = await getDBCartData();

        const dbCart = data ?? [];


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
        // save merged data in db 
        try {
            await mergeDBCart(mergedCart)
        } catch (error) {
            console.log(error);
        }


    },
    toggleSelect: (itemId) => set(
        (
            state => ({
                cartItems: state.cartItems.map(item => item._id === itemId ?
                    { ...item, isSelected: !item.isSelected }
                    :
                    item)
            })
        )
    ),
    toggleSelectAll: (isSelected) => set(
        state => ({
            cartItems: state.cartItems.map(item => ({ ...item, isSelected: isSelected }))
        })
    ),
    getSelectedItems: () => {
        return get().cartItems.filter(item => item.isSelected);
    }

})


export const useCartStore = create<CartState>()(
    persist(
        devtools(store),
        {
            name: "cart",
            partialize: (state) => ({
                cartItems: state.cartItems,
            })
        }
    )
)
