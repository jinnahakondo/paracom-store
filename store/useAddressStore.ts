import { addAddress, deleteAddress, getSavedAddresses, setDefaultAddressApi, updateAddressApi } from "@/lib/fetchData";
import { AddressType } from "@/types/types";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AddressState {
    savedAddresses: AddressType[];
    addAddress: (address: AddressType) => Promise<void>;
    updateAddress: ({ addressId, updateAddress }: { addressId: string, updateAddress: AddressType }) => Promise<void>;
    deleteAddress: (addressId: string) => Promise<void>;
    setDefaultAddress: (addressId: string) => Promise<void>;
    fetchAddresses: () => Promise<void>;
    isAddressLoading: boolean;
}

const sortAddresses = (addresses: AddressType[]) =>
    [...addresses].sort(
        (a, b) => Number(b.isDefault) - Number(a.isDefault)
    );

const store: StateCreator<AddressState> = (set, get) => ({
    savedAddresses: [],
    isAddressLoading: true,

    fetchAddresses: async () => {
        console.log('hello');
        set({ isAddressLoading: true });
        try {
            const { data } = await getSavedAddresses();
            set({ savedAddresses: data ?? [] });
        } catch (error) {
            console.error("failde to load addresses", error);
        } finally {
            set({ isAddressLoading: false });
        }
    },
    addAddress: async (address) => {
        try {
            const res = await addAddress(address);
            set(state => ({
                savedAddresses: [...state.savedAddresses, res.data]
            }))
        } catch (error) {
            console.log(error);
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
    },
    setDefaultAddress: async (addressId) => {
        const updatedAddresses = get().savedAddresses.map(address =>
            address._id === addressId
                ? { ...address, isDefault: true }
                : { ...address, isDefault: false }
        );

        // Default address moves to first position
        set({
            savedAddresses: sortAddresses(updatedAddresses),
        });

        try {
            await setDefaultAddressApi(addressId);
        } catch (error: any) {
            console.log(error.message);
        }
    }
})

export const useAddressState = create<AddressState>()(
    persist(
        devtools(store),
        {
            name: "address-store",
            partialize: (state) => ({
                savedAddresses: state.savedAddresses,
            })
        }
    )
)