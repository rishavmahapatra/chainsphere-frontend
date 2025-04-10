"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

export function ResetPasswordForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token  = localStorage.getItem("token")

  const handleShowPassword = (passwordId) => {
    switch (passwordId) {
      case "oldPassword":
        setShowPassword({
          ...showPassword,
          oldPassword: !showPassword.oldPassword,
        });
        break;
      case "newPassword":
        setShowPassword({
          ...showPassword,
          newPassword: !showPassword.newPassword,
        });
        break;
      case "confirmPassword":
        setShowPassword({
          ...showPassword,
          confirmPassword: !showPassword.confirmPassword,
        });
        break;

      default:
        break;
    }
    console.log("password id  update ", showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.chainsphere.tech/api/v1/user/changePassword",
        formData,{
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        }
      );

      if (response.data.success) {
        toast("Password reset successfully");
        router.push("/");
      }
    } catch (error) {
      toast("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className={cn("flex  flex-col gap-6")}>
      <Card className="overflow-hidden  p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex  flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  Reset your password
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="oldPassword">Old Password</Label>
                </div>
                <div className="inputWrapper flex relative">
                  <Input
                    id="oldPassword"
                    type={`${showPassword.oldPassword ? "text" : "password"}`}
                    value={formData.oldPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, oldPassword: e.target.value })
                    }
                    placeholder="enter the old password"
                    required
                  />
                  {showPassword.oldPassword ? (
                    <span
                      onClick={() => {
                        handleShowPassword("oldPassword");
                      }}
                      className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                    >
                      {" "}
                      <BiShow fontSize={"1.2rem"} />{" "}
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        handleShowPassword("oldPassword");
                      }}
                      className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                    >
                      {" "}
                      <BiHide fontSize={"1.2rem"} />{" "}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="newPassword">New Password</Label>
                </div>
               <div className="inputWrapper flex relative">
               <Input
                  id="newPassword"
                  type={`${showPassword.newPassword ? "text" : "password"}`}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  placeholder="enter the new password"
                  required
                />
                 {showPassword.newPassword ? (
                    <span
                      onClick={() => {
                        handleShowPassword("newPassword");
                      }}
                      className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                    >
                      {" "}
                      <BiShow fontSize={"1.2rem"} />{" "}
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        handleShowPassword("newPassword");
                      }}
                      className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                    >
                      {" "}
                      <BiHide fontSize={"1.2rem"} />{" "}
                    </span>
                  )}
               </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <div className="inputwrapper flex relative">
                <Input
                  id="confirmPassword"
                  type={`${showPassword.confirmPassword ? "text" : "password"}`}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="please confirm your password"
                  required
                />
                 {showPassword.confirmPassword ? (
                    <span
                      onClick={() => {
                        handleShowPassword("confirmPassword");
                      }}
                      className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                    >
                      {" "}
                      <BiShow fontSize={"1.2rem"} />{" "}
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        handleShowPassword("confirmPassword");
                      }}
                      className="showIcon absolute right-2 top-[50%] translate-y-[-50%] "
                    >
                      {" "}
                      <BiHide fontSize={"1.2rem"} />{" "}
                    </span>
                  )}
                </div>
               
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/logo.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain p-8 "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
