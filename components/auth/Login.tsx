"use client"
import { zodResolver } from "@hookform/resolvers/zod"


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
import { signIn } from "next-auth/react"



const loginSchema = baseSchema.pick({ email: true, password: true })
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({

    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

 

  const onSubmit = async (data: LoginFormData) => {

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (res?.ok) {
      alert("login in success")
    } else {
      alert(res?.error)
    }
  }

  return (
    <Card className="w-full max-w-md p-4 max-sm:ring-0">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-base">Access Your Ai Powered Workspace</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Email</FieldLabel>
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
                autoComplete="off"
                placeholder="******" />
              <FieldError>
                {errors.password?.message}
              </FieldError>
            </Field>
          </FieldGroup>
          <Button type="submit"
            size={"lg"}
            className="mt-5 w-full"
          >Login</Button>
        </form>
        <div className="flex items-center gap-2 justify-center ">
          <div className="h-0.5 w-full bg-border"></div>
          OR
          <div className="h-0.5 w-full bg-border"></div>
        </div>
        <SocialLogin />
        <div className="flex items-center justify-center gap-2">
          <span>Already have an Account?</span>
          <Link href={'/register'} className="underline text-primary">Register</Link>
        </div>
      </CardContent>
    </Card>
  );
}
