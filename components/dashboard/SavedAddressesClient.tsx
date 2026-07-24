"use client";

import { useState } from "react";
import { Plus, MapPin, Pencil, Trash2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import SavedAddressDialog from "./AddAddressDialog";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getSavedAddresses } from "@/lib/fetchData";
import SavedAddressesSkeleton from "../skeleton/SavedAddressesSkeleton";
import AddAddressDialog from "./AddAddressDialog";
import EditAddressDialog from "./EditAddressDialog";



export interface Address {
  _id: string;
  name: string;
  phone: string;
  division: string;
  district: string;
  city: string;
  postalCode: number | string;
  address: string;
  isDefault?: boolean;
}



export default function SavedAddressesClient() {

  const { status, data: session } = useSession()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['saved-addresses', session?.user.id],
    queryFn: getSavedAddresses,
  })

  const savedAddresses = data?.data ?? [];

  if (isLoading) return <SavedAddressesSkeleton />

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
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
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
          <Button onClick={() => setIsDialogOpen(true)} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Address
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {savedAddresses.map((item: Address) => (
            <Card
              key={item._id}
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
                      setIsEdit(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
              <EditAddressDialog
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                savedAddresses={item}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}