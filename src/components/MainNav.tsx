import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import UserNameMenu from "./UserNameMenu"
import { Link } from "react-router";

export default function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to='/order-status' className="font-bold hover:text-orange-500">
            Ordenes
          </Link>
          <UserNameMenu />
        </>
      ) : (
        <Button variant="ghost" className="font-bold hover:text-orange-500 hover:bg-white" onClick={async () => await loginWithRedirect()}>LogIn</Button>
      )}
    </span>
  )
}
