import React, { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BD_LOCATION_DATA } from '@/data/locationData'

interface Props {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    isAddressEditing: boolean;
}

export default function SavedAddressDialog(
    {
        isDialogOpen,
        setIsDialogOpen,
        isAddressEditing,
    }: Props
) {

    const [division, setDivision] = useState('')
    const divisions = Object.keys(BD_LOCATION_DATA);

    console.log(division);

    // Get dynamic district options based on selected division
    const availableDistricts = useMemo(() => {
        if (!division) return [];
        return BD_LOCATION_DATA[division] || []
    }, [division])


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Address
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isAddressEditing ? "Edit Address" : "Add New Address"}
                    </DialogTitle>
                </DialogHeader>

                <form className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="e.g. 01700000000"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 ">
                        {/* Division Dropdown */}
                        <div className="space-y-2">
                            <Label>Division</Label>
                            <Select
                                required
                                onValueChange={(value) => setDivision(value)}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Select Division" />
                                </SelectTrigger>
                                <SelectContent>
                                    {divisions.map((division) => (
                                        <SelectItem
                                            key={division}
                                            value={division}

                                        >
                                            {division}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* District Dropdown */}
                        <div className="space-y-2">
                            <Label>District</Label>
                            <Select
                                required
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue
                                        placeholder="Select District"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableDistricts.map((district) => (
                                        <SelectItem key={district} value={district}>
                                            {district}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 space-y-2">
                            <Label htmlFor="city">City / Upazila</Label>
                            <Input
                                id="city"
                                placeholder="e.g. Sadullapur"
                                required
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                                id="postalCode"
                                placeholder="5710"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                            id="address"
                            placeholder="House, road, locality..."
                            required
                        />
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isAddressEditing ? "Update" : "Save"} Address
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
