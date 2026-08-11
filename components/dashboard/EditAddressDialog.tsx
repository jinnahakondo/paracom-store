import React, { useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BD_LOCATION_DATA } from '@/data/locationData'
import { useForm, Controller } from 'react-hook-form'
import { baseSchema } from '@/lib/zod/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useCartStore } from '@/store/useCartStore'
import { AddressType } from '@/types/types'

interface Props {
    isEdit: boolean
    setIsEdit: (open: boolean) => void
    editingAddress: AddressType | null;
    setEditingAddress: (address: AddressType) => void;
}

const addressSchema = baseSchema.pick({
    name: true,
    phone: true,
    division: true,
    district: true,
    city: true,
    postalCode: true,
    address: true,
})

type AddressFormValues = z.infer<typeof addressSchema>


export default function EditAddressDialog({
    isEdit,
    setIsEdit,
    editingAddress,
    setEditingAddress
}: Props) {
    const divisions = useMemo(() => Object.keys(BD_LOCATION_DATA), [])

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
    })

    // Populate form whenever editingAddress or isEdit state changes
    useEffect(() => {
        if (editingAddress && isEdit) {
            reset({
                name: editingAddress.name || '',
                phone: editingAddress.phone || '',
                division: editingAddress.division || '',
                district: editingAddress.district || '',
                city: editingAddress.city || '',
                postalCode: String(editingAddress.postalCode || ''),
                address: editingAddress.address || '',
            })
        }
    }, [editingAddress, isEdit, reset])

    const selectedDivision = watch('division')

    const availableDistricts = useMemo(() => {
        if (!selectedDivision) return []
        return BD_LOCATION_DATA[selectedDivision as keyof typeof BD_LOCATION_DATA] || []
    }, [selectedDivision]);

    const updateAddress = useCartStore(s => s.updateAddress);
    const isLoading = useCartStore(s => s.isAddressLoading);


    const onSubmit = async (data: AddressFormValues) => {
        if (!editingAddress?._id) return;

        try {
            await updateAddress(
                {
                    addressId: String(editingAddress._id),
                    updateAddress: data
                }
            );
            toast.success("Address updated successfully");
            setIsEdit(false);
        } catch (error) {
            toast.error("Failed to update address");
        }
    }

    return (
        <Dialog open={isEdit} onOpenChange={setIsEdit}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Address</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">

                    {/* Name & Phone */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. John Doe"
                                {...register('name')}
                                disabled={isLoading}
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="e.g. 01700000000"
                                {...register('phone')}
                                disabled={isLoading}
                            />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                        </div>
                    </div>

                    {/* Division & District */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Division Select */}
                        <div className="space-y-2">
                            <Label>Division</Label>
                            <Controller
                                name="division"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(val) => {
                                            field.onChange(val)
                                            setValue('district', '', { shouldValidate: true })
                                        }}
                                        value={field.value || undefined}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Division" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {divisions.map((div) => (
                                                <SelectItem key={div} value={div}>
                                                    {div}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.division && <p className="text-xs text-red-500">{errors.division.message}</p>}
                        </div>

                        {/* District Select */}
                        <div className="space-y-2">
                            <Label>District</Label>
                            <Controller
                                name="district"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || undefined}
                                        disabled={isLoading || !selectedDivision}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={selectedDivision ? "Select District" : "Select Division First"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableDistricts.map((dist) => (
                                                <SelectItem key={dist} value={dist}>
                                                    {dist}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.district && <p className="text-xs text-red-500">{errors.district.message}</p>}
                        </div>
                    </div>

                    {/* City & Postal Code */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 space-y-2">
                            <Label htmlFor="city">City / Upazila</Label>
                            <Input
                                id="city"
                                placeholder="e.g. Sadullapur"
                                {...register('city')}
                                disabled={isLoading}
                            />
                            {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                                id="postalCode"
                                placeholder="5710"
                                {...register('postalCode')}
                                disabled={isLoading}
                            />
                            {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode.message}</p>}
                        </div>
                    </div>

                    {/* Street Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                            id="address"
                            placeholder="House, road, locality..."
                            {...register('address')}
                            disabled={isLoading}
                        />
                        {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEdit(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isLoading}
                        >
                            Update Address
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}