"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import register from "@/lib/actions/register";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { SkeletonCard } from "@/components/CardComponents/SkeletonCard";
import { Turnstile } from "@marsidev/react-turnstile";
import { captchaVerify } from "@/lib/actions/captchaVerify";



const RegisterPage = () => {
  const [loading, setLoading] = useState(true);
  const [token,setToken] = useState<string>("")

  const registerUser = async (formData: FormData) => {
    const verify = await captchaVerify(token);

    if(verify == 403){
        toast({
          title:"Invalid Captcha",
          description: "Please try again",
          variant:"destructive"
        })
        return;
    }

    const status = await register(formData);

    if (status == 200) {
      toast({
        title: "User registered successfully !!",
        description: "Please login to continue",
      });
      redirect("/app/login");
    } else if (status == 403) {
      toast({
        title: "User already exists !!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error while user registration !!",
        variant: "destructive",
      });
    }
  };

  const { data } = useSession();
  useEffect(() => {
    setLoading(false)
    if (data) {
      toast({ title: "User already logged in" });
      redirect("/app/home");
    }
  }, [data]);

  if (loading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <SkeletonCard />
      </div>
    );

  return (
    <div className="flex w-full h-screen justify-center items-center px-4">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-xl">Register</CardTitle>
          <CardDescription className="text-center text-lg">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <form action={registerUser}>
          <CardContent>
            <Label>Email</Label>
            <Input
              name="email"
              className="mb-4"
              placeholder="Enter your email"
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              className="mb-4"
              placeholder="Enter your password"
            />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full">
            <Turnstile onSuccess={(token) => {
              setToken(token)
            }} siteKey='0x4AAAAAAAbu8T-y1tAsroOZ' />
              <Button className="mt-4" disabled={token == ""}>Register</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
