"use client";

import { useEffect, useState } from "react";
import { Plus, MapPin, Pencil, Trash2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddAddressDialog from "./AddAddressDialog";
import EditAddressDialog from "./EditAddressDialog";
import { toast } from "sonner";
import { AddressType } from "@/types/types";
import { useAddressState } from "@/store/useAddressStore";

export default function SavedAddressesClient() {


  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(null)

  const fetchAddresses = useAddressState(s => s.fetchAddresses)
  const savedAddresses = useAddressState(s => s.savedAddresses);
  const deleteAddress = useAddressState(s => s.deleteAddress);
  const isLoading = useAddressState(s => s.isAddressLoading);
  const setDefaultAddress = useAddressState(s => s.setDefaultAddress);


  useEffect(() => {
    fetchAddresses()
  }, [])

  if (isLoading) return <div className="flex justify-center">Loading...</div>



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Saved Addresses</h1>
          <p className="text-sm text-muted-foreground">
            Manage your delivery and billing locations.
          </p>
        </div>

        {/* dialog  */}
        <AddAddressDialog
          isAdd={isAdd}
          setIsAdd={setIsAdd}
        />
      </div>

      {/* Addresses Grid */}
      {savedAddresses.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
          <MapPin className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-base font-semibold">No saved addresses</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add an address to speed up checkout.
          </p>
          <Button onClick={() => setIsAdd(true)} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Address
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {savedAddresses.map((item: AddressType, i: number) => (
            <Card
              key={item?._id || i}
              className={`relative flex flex-col justify-between transition-colors ${item.isDefault ? "border-primary/50 bg-primary/5" : ""
                }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                      {item.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{item.phone}</p>
                  </div>
                  {item.isDefault && (
                    <Badge variant="secondary" className="gap-1 font-normal text-xs">
                      <CheckCircle2 className="h-3 w-3 text-primary" /> Default
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p className="line-clamp-2 text-foreground/80">{item.address}</p>
                <p>
                  {item.city}, {item.district}, {item.division} - {item.postalCode}
                </p>
              </CardContent>

              <CardFooter className="pt-2 flex items-center justify-between border-t border-border/50 mt-auto">
                {!item.isDefault ? (
                  <Button
                    onClick={() => setDefaultAddress(String(item._id))}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
                  >
                    Set as Default
                  </Button>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setEditingAddress(item)
                      setIsEdit(true)
                    }}

                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        await deleteAddress(String(item._id));
                        toast.success("Address deleted successfully");
                      } catch (error) {
                        toast.error("Failed to delete address");
                      }
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {/* edit address modal */}
      <EditAddressDialog
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editingAddress={editingAddress}
      />
    </div>
  );
}