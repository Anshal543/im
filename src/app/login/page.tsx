import { auth } from "@/auth";
import LoginForm from "@/components/login-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <LoginForm />
        </CardContent>
    
      </Card>
    </div>
  );
};

export default Page;
