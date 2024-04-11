"use client"
import { Label } from "@/components/ui/label";
import { ModeToggle } from "./ModeToggle";
import { signOut,signIn } from "next-auth/react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"

import { Button } from "./button";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import { LoginRegDropDown } from "./LoginRegDropDown";
  
export function Appbar(){
    const router = useRouter()
    const pathname = usePathname()
    

    return <div className="flex mt-3 px-6">
        <div className="flex mt-1">
        <Label className="text-xl font-bold">EatMyUrl</Label>
        </div>
        <div className="invisible md:visible flex ml-12">
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Features</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Shorten</MenubarItem>
                    <MenubarItem>View Analytics</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
        <Button variant='link' className="ml-4">Customers</Button>
        <Button variant='link' className="ml-4">Pricing</Button>
        </div>
        <div className="absolute right-6 flex">
        <LoginRegDropDown pathname={pathname}/> 
        {pathname == '/dashboard'?<div><Button variant='outline' className="mr-4 hidden md:inline-block" onClick={()=>signOut()}>Signout</Button></div>:<div>
        <Button variant='outline' onClick={()=>signIn()} className="mr-2 hidden md:inline-block">Login</Button>
        <Button variant='outline' className="mr-4 hidden md:inline-block" onClick={()=>router.push('/signup')}>Register</Button>
        </div>}
        
        <ModeToggle/>
        </div>
    </div>
}