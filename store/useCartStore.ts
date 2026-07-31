import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { StateCreator } from "zustand";
import { AddressType, CartItemType } from '@/types/types';
import { addAddress, addToCartDB, deleteAddress, getDBCartData, getSavedAddresses, mergeDBCart, removeDBCartItem, updateAddressApi, updateDBItemQty } from '@/lib/fetchData';



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
    //address related
    savedAddresses: AddressType[];
    addAddress: (address: AddressType) => Promise<void>;
    updateAddress: ({ addressId, updateAddress }: { addressId: string, updateAddress: AddressType }) => Promise<void>;
    deleteAddress: (addressId: string) => Promise<void>;
    setDefaultAddress?: (addressId: string) => Promise<void>;
    fetchAddresses: () => Promise<void>;
    isAddressLoading: boolean;
}



const store: StateCreator<CartState> = (set, get) => ({
    cartItems: [],
    totalPrice: 0,
    savedAddresses: [],
    isLoading: false,
    isAddressLoading: false,

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

    //user address related 
    fetchAddresses: async () => {
        console.log('hello');
        set({ isAddressLoading: true });
        try {
            const { data } = await getSavedAddresses();
            set({ savedAddresses: data ?? [], isAddressLoading: false });
        } catch (error) {
            console.error("failde to load addresses", error);
            set({ isAddressLoading: false });
        }
    },
    addAddress: async (address) => {
        set({ isAddressLoading: true })
        try {
            const res = await addAddress(address);
            set(state => ({
                savedAddresses: [...state.savedAddresses, res.data],
                isAddressLoading: false
            }))
            set({ isAddressLoading: false })
        } catch (error) {
            console.log(error);
        } finally {
            set({ isAddressLoading: false })
        }
    },
    updateAddress: async ({ addressId, updateAddress }) => {
        const updatesavedAddresses = get().savedAddresses.map(address => address._id === addressId ? {
            ...address, ...updateAddress
        } : address);

        set({ savedAddresses: updatesavedAddresses })

        try {
            await updateAddressApi({ addressId, updateAddress })
        } catch (error) {
            console.log(error);
        }
    },
    deleteAddress: async (addressId) => {
        const allAddresses = get().savedAddresses;
        const newAddresses = allAddresses.filter(a => a._id !== addressId)
        set({ savedAddresses: newAddresses })
        try {
            await deleteAddress(addressId)
        } catch (error) {
            console.log(error);
        }
    }


})


export const useCartStore = create<CartState>()(
    persist(
        devtools(store),
        { name: "cart" }
    )
)
