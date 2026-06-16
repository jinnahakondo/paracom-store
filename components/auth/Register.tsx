"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";

import * as z from "zod"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { baseSchema } from "@/lib/zod/zodSchema";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { toast } from "sonner";
const registerSchema = baseSchema.pick({
    name: true,
    email: true,
    password: true,
    confirmPassword: true
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    }
);

type RegisterSchema = z.infer<typeof registerSchema>



export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterSchema>({

        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const onSubmit = async (data: RegisterSchema) => {
        const user = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        const res = await axios.post('/api/register', user)
        if (res.data.success) {
            toast.success("Registration successfull")
        }
    }

    return (
        <Card className="w-full max-w-md p-4 max-sm:ring-0">
            <CardHeader>
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription className="text-base">Create Your Account To Access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                {...register("name")}
                                id="name"
                                autoComplete="off"
                                placeholder="Your Name" />
                            <FieldError>
                                {errors.name?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                {...register("email")}
                                id="email"
                                autoComplete="off"
                                placeholder="example@gmail.com" />
                            <FieldError>
                                {errors.email?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                {...register("password")}
                                id="password"
                                type="password"
                                autoComplete="off"
                                placeholder="******" />
                            <FieldError>
                                {errors.password?.message}
                            </FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                            <Input
                                {...register("confirmPassword")}
                                id="confirmPassword"
                                type="password"
                                autoComplete="off"
                                placeholder="******" />
                            <FieldError>
                                {errors.confirmPassword?.message}
                            </FieldError>
                        </Field>
                    </FieldGroup>
                    <Button type="submit"
                        size={"lg"}
                        className="mt-5 w-full"
                    >Register</Button>
                </form>
                <div className="flex items-center gap-2 justify-center ">
                    <div className="h-0.5 w-full bg-border"></div>
                    OR
                    <div className="h-0.5 w-full bg-border"></div>
                </div>
                <SocialLogin />
                <div className="flex items-center justify-center gap-2">
                    <span>Already have an Account?</span>
                    <Link href={'/login'} className="underline text-primary">Login</Link>
                </div>
            </CardContent>
        </Card>
    );
}
