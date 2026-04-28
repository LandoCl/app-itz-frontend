//Esta pagina se va a usar para redirigir la app
//cuando el usuario inicie sesion
import { useCreateUser } from "@/api/UserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
export default function AuthCallbackPage() {
    const { user } = useAuth0();
    const createUserRequest = useCreateUser();
    const navigate = useNavigate();

    const hasCreatedUser = useRef(false);
    useEffect(()=>{
        if(user?.sub&&user?.email&&!hasCreatedUser.current){
            createUserRequest.mutate({auth0Id:user.sub,email:user.email})
            hasCreatedUser.current = true;
        }
        navigate('/');
    },[createUserRequest,navigate,user]);
    
  return (
    <div>Loading...</div>
  )
}
