import React, { useMemo } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BD_LOCATION_DATA } from '@/data/locationData'
import { useForm, Controller } from 'react-hook-form'
import { baseSchema } from '@/lib/zod/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from 'sonner'


interface Props {
    isAdd: boolean;
    setIsAdd: (open: boolean) => void;
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

export type AddressFormValues = z.infer<typeof addressSchema>

const addAddress = async (newAddress: AddressFormValues) => {
    const res = await axiosInstance.post('/api/save-address', { address: newAddress });
    return res.data;
}


export default function AddAddressDialog({
    isAdd,
    setIsAdd,
}: Props) {
    const divisions = Object.keys(BD_LOCATION_DATA);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: '',
            phone: '',
            division: '',
            district: '',
            city: '',
            postalCode: '',
            address: '',
        },
    })

    // Watch division to dynamically derive available districts
    const selectedDivision = watch('division')

    const availableDistricts = useMemo(() => {
        if (!selectedDivision) return [];
        return BD_LOCATION_DATA[selectedDivision] || []
    }, [selectedDivision])

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['add-address'],
        mutationFn: addAddress,
        onSuccess: () => {
            toast.success('address added successfully')
            queryClient.invalidateQueries({ queryKey: ['saved-addresses'] });
            reset();
            setIsAdd(false);
        },
        onError: (error) => {
            toast.error("Something went wrong!")
        },
    })

    const onSubmit = async (data: AddressFormValues) => {
        mutate(data)
    }

    return (
        <Dialog open={isAdd} onOpenChange={setIsAdd}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Address
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
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
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="e.g. 01700000000"
                                {...register('phone')}
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
                                            setValue('district', '') // Reset district selection when division changes
                                        }}
                                        value={field.value}
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
                                        value={field.value}
                                        disabled={!selectedDivision}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select District" />
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
                            />
                            {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                                id="postalCode"
                                placeholder="5710"
                                {...register('postalCode')}
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
                        />
                        {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset()
                                setIsAdd(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isPending}
                            type="submit"
                        >Save Address</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}