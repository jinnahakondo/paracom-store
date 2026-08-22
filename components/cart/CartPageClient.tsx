"use client"
import { useCartStore } from '@/store/useCartStore';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { BsCartX } from 'react-icons/bs';
import { Checkbox } from '../ui/checkbox';
import { CartItemType } from '@/types/types';
import { CartItem } from './CartItem';
import OrderSummaryCard from '../checkout/OrderSummaryCard';

export default function CartPageClient() {
    const cart = useCartStore(state => state.cartItems);
    const toggleSelectAll = useCartStore(state => state.toggleSelectAll);
    const getTotalPrice = useCartStore(state => state.getSelectedTotalPrice);
    const totalPrice = getTotalPrice()
    return (
        <div>
            {/* empty cart  */}
            {
                cart.length === 0 &&
                <div className='h-[calc(100vh-64px)] grid place-items-center justify-center'>
                    <div className='flex flex-col items-center gap-2'>
                        <BsCartX size={72} />
                        Your shopping cart is empty
                    </div>
                </div>
            }
            <div className=' grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6'>
                {/* cart content here  */}
                <div className='bg-card border border-border shadow-sm p-4 rounded-md flex-1'>
                    <h3 className='text-xl font-semibold px-2 mb-2'>Shoping Cart</h3>

                    {/* toggle select all item  */}
                    <div className="flex items-center justify-between  p-2">
                        <div className="flex items-center gap-4 ">
                            <Checkbox
                                onCheckedChange={
                                    (checked) => toggleSelectAll(Boolean(checked))
                                }
                            />
                            <p className="text-accent-foreground">
                                Select All ({cart.length} items)
                            </p>
                        </div>

                        <div className="flex items-center gap-1">
                            <Trash2 size={16} />
                            Delete
                        </div>
                    </div>
                    {/* cart data */}
                    <div className="space-y-4 mt-4 overflow-y-auto">
                        {cart.map((item: CartItemType) => <CartItem
                            key={item.productId}
                            item={item}
                        />)}
                    </div>
                </div>
                <OrderSummaryCard />
            </div>
        </div>
    )
}
