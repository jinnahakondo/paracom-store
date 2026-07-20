"use client"
import Link from "next/link";
import { CheckCircle2, Download, ArrowRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "../cart/CartItem";

interface PaymentSuccessProps {
  transactionId?: string;
  amount?: string;
  date?: string;
  paymentMethod?: string;
  customerEmail?: string;
}

export default function PaymentSuccess({
  transactionId = "TXN_8492049182",
  amount = "$149.00",
  date = "July 20, 2026",
  paymentMethod = "Visa ending in 4242",
  customerEmail = "alex@example.com",
}: PaymentSuccessProps) {

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id")

  const items = useCartStore(state => state.cartItems)

  useEffect(() => {
    if (sessionId && items.length > 0) {
      axiosInstance.post(`/api/checkout/sessions/${sessionId}`, { items })
        .then(data => console.log(data.data))
        .catch(error => console.log(error.message))

    }
  }, [sessionId, items])


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 md:p-8">
      <Card className="w-full max-w-md border-border shadow-lg">
        {/* Header Icon & Title */}
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Payment Successful!
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Thank you for your purchase. We&apos;ve sent a receipt to{" "}
            <span className="font-medium text-foreground">{customerEmail}</span>.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Amount Badge */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-4 border border-border/50">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Amount Paid
            </span>
            <span className="text-3xl font-extrabold text-foreground mt-1">
              {amount}
            </span>
          </div>

          <Separator className="my-2" />

          {/* Transaction Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Transaction ID</span>
              <div className="flex items-center gap-1 font-mono text-xs font-semibold text-foreground bg-muted px-2 py-1 rounded">
                <span>{transactionId}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-foreground">{date}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium text-foreground">{paymentMethod}</span>
            </div>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="flex flex-col gap-2 pt-2">
          <Button asChild className="w-full font-medium" size="lg">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" className="w-full" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}