"use client"
import { useAuth0 } from "@auth0/auth0-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function UserNameMenu() {
    const { user, logout } = useAuth0();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center px-3 bg-slate-50 font-bold hover:text-orange-500 gap-2'>
                <CircleUserRound className="text-orange-500" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-slate-50 border-orange-500'>
                <DropdownMenuItem>
                    <Link to='/manage-restaurant' className="font-bold hover:text-orange-500">Administrar Restaurante</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to='/user-profile' className="font-bold hover:text-orange-500">Perfil</Link>
                </DropdownMenuItem>
                <Separator></Separator>
                <DropdownMenuItem>
                    <Button className='flex flex-1 font-bold bg-orange-500' onClick={() => logout()}>Salir</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}