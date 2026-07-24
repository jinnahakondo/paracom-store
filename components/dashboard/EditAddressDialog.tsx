import React, { useMemo } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BD_LOCATION_DATA } from '@/data/locationData'
import { Address } from './SavedAddressesClient'
import { useForm, Controller } from 'react-hook-form'
import { baseSchema } from '@/lib/zod/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface Props {
    isEdit: boolean
    setIsEdit: (open: boolean) => void
    savedAddresses: Address
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
    savedAddresses,
}: Props) {
    const divisions = Object.keys(BD_LOCATION_DATA)

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        // Pass initial values directly from props
        defaultValues: {
            name: savedAddresses?.name || '',
            phone: savedAddresses?.phone || '',
            division: savedAddresses?.division || '',
            district: savedAddresses?.district || '',
            city: savedAddresses?.city || '',
            postalCode: String(savedAddresses?.postalCode) || '',
            address: savedAddresses?.address || '',
        },
    })

    // Watch the division field directly from React Hook Form
    const selectedDivision = watch('division')

    // Derive districts dynamically based on watched division value
    const availableDistricts = useMemo(() => {
        if (!selectedDivision) return []
        return BD_LOCATION_DATA[selectedDivision] || []
    }, [selectedDivision])

    const onSubmit = async (data: AddressFormValues) => {
        console.log('Submitted Data:', data)
        setIsEdit(false)
    }

    return (
        <Dialog open={isEdit} onOpenChange={setIsEdit}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Address</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 pt-2">

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
                                            // Reset district when division changes
                                            setValue('district', '')
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
                            onClick={() => setIsEdit(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Update Address</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}