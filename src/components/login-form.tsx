"use client";

import { authenticate } from "@/lib/login-action";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter()
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
          toast.error("Email and password are required");
          return;
        }
        const toastId = toast.loading("Logging in");
        const error = await authenticate(email, password);
        if (!error){
            toast.success("Login success", {
                id: toastId,
              });
              router.refresh()
        }
         
        else {
          toast.error(String(error), {
            id: toastId,
          });
        }
      }}
      className="flex flex-col gap-4 "
    >
      <Input type="email" placeholder="Email"  name="email" />
      <Input type="password" placeholder="password"  name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
