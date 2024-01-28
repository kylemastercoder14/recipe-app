"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await currentUser();
  if(profile) {
    return redirect("/home");
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
        <div className="left bg-[url('/images/hero.jpg')] p-5 w-[60%] h-full bg-cover bg-no-repeat hidden md:block">
            <div className="md:block hidden">
                <Logo width={300} />
            </div>
        </div>
        <div className="right relative text-white h-full md:p-5 p-3 flex flex-col w-[40%] bg-[#0f1014]">
            <div className="flex items-center justify-center flex-col mt-80">
                <div className="flex items-center justify-center gap-3">
                    <p className="md:text-3xl text-xl font-bold">Get Started</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Button variant={"primary"} className="px-10 w-40">
                        <Link href="/sign-in">
                            Log in
                        </Link>
                    </Button>
                    <Button variant={"primary"} className="px-10 w-40">
                        <Link href="/sign-up">
                            Sign up
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="absolute bottom-10 md:left-[35%] left-0">
                <Logo width={200} />
                <div className="flex items-center justify-center gap-2 mt-3">
                    <p className="text-xs underline">Terms of Use</p>
                    <p className="text-xs">|</p>
                    <p className="text-xs underline">Privacy policy</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SetupPage;
