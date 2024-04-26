"use client";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../DropdownComponents/ModeToggle";
import { signOut, signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { LoginRegDropDown } from "../DropdownComponents/LoginRegDropDown";
import { Card } from "../ui/card";

export function Appbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card className="sticky top-0 w-full pb-3 z-30">
      <div className="flex mt-3 px-6">
        <div className="flex mt-1">
          <Label
            onClick={() => router.push("/")}
            className="text-xl font-bold cursor-pointer"
          >
            EatMyUrl
          </Label>
        </div>
        <div className="absolute right-6 flex">
          <LoginRegDropDown pathname={pathname} />
          {pathname == "/dashboard" ? (
            <div>
              <Button
                variant="outline"
                className="mr-4 hidden md:inline-block"
                onClick={() => signOut()}
              >
                Signout
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="outline"
                onClick={() => signIn()}
                className="mr-2 hidden md:inline-block"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="mr-4 hidden md:inline-block"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </div>
          )}

          <ModeToggle />
        </div>
      </div>
    </Card>
  );
}