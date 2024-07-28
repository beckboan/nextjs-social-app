import { Metadata } from "next";
import signUpImage from "@/assets/desert.jpg";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Page = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up today!</h1>
            <p>
              A place where <span className="italic">you</span> can connect.
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href={"/login"} className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
        <Image
          src={signUpImage}
          alt="desert"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};

export default Page;
