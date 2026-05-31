import { Link } from "react-router";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileNavLinks() {
  const { logout } = useAuth0();
  return (
    <>
      <Link to="/user-profile" className="text-orange-500 mx-4">
        Perfil
      </Link>
      <Link to="/manage-restaurant" className="text-orange-500 mx-4">
        Administrar restaurante</Link>
      <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="flex items-center px-3 font-bold hover:text-orange-500 mx-4">
        Salir
      </Button>
    </>
  )
}
