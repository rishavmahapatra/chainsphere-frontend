"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BASE_URL } from "@/config/config";

const Otp = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const [isVerifying, setIsVerifying] = useState(false)

  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  // email =

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("OTP submitted:", otp);

    if (otp.length !== 6) {
      toast("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      
      setIsVerifying(true)
  // http://3.109.67.109:8001/api/v1
      const res = await axios.post(`${BASE_URL}/user/verifyOtp`, {
        email,
        otp,
      });

      // console.log("OTP verification success:", res.data);

      toast("OTP verification success ");


      router.push("/login");
    } catch (error) {
      console.log(error.response.data.message);
      toast("OTP verification failed:", error.response.data.message);
    }finally{

      setIsVerifying(false)

    }


  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0 max-w-full w-[600px] mx-auto">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Verify OTP</h1>
                <p className="text-muted-foreground text-balance">
                  Enter the OTP to login to your Chainsphere account
                </p>
              </div>
              <div className="otpBoxes text-white flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button type="submit" className="w-full" disabled={isVerifying}>
                Submit
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/logo.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain p-8"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;
