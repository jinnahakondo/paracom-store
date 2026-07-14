
import OrderReviewCard from "@/components/checkout/OrderReviewCard";
import OrderSummaryCard from "@/components/checkout/OrderSummaryCard";
import ShippingBillingCard from "@/components/checkout/ShippingBillingCard";




export default function Checkout() {
    return (
        <div className='py-16'>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4'>
                <div className='space-y-4 flex-1'>
                    <ShippingBillingCard />
                    <OrderReviewCard />
                </div>
                <div>
                    <OrderSummaryCard />
                </div>
            </div>
        </div>
    )
}
