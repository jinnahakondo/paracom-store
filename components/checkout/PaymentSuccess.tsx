"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useCartStore } from "@/store/useCartStore";


export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");

  const getSelectedItems = useCartStore((state) => state.getSelectedItems);
  const items = getSelectedItems()

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!sessionId || items.length === 0) return;

    axiosInstance
      .post(`/api/checkout/sessions/${sessionId}`, { items })
      .catch((error) => {
        console.log(error.message);
      });
  }, [sessionId, items]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCountdown((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(interval);
  //         router.replace("/orders");
  //         return 0;
  //       }

  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 md:p-8">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Payment Successful!
          </CardTitle>

          <p className="text-sm text-muted-foreground mt-2">
            Thank you for your purchase.
          </p>

          <p className="text-sm text-muted-foreground mt-4">
            Redirecting to your orders in{" "}
            <span className="font-bold text-primary">
              {countdown}
            </span>{" "}
            seconds...
          </p>

          <Link
            href="/orders"
            className="text-sm text-primary hover:underline mt-3 inline-block"
          >
            Go to orders now
          </Link>
        </CardHeader>
      </Card>
    </div>
  );
}