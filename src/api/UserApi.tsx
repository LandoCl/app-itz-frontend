const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { User, UpdateUser, BackEndUser } from './types';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

//funcion para crear un usuario en el backend
export function useCreateUser() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();
    //Peticion al backend para crear un usuario
    const createUserRequest = async (user: User) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + "/api/user", {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!res.ok) { //Regresa un error 500
            console.log(res);
            throw new Error("Error al crear el usuario");
        }
        //Si el backend regresa 200 o 201
        return res.json();
    };
    return useMutation({
        mutationFn: (user: User) => createUserRequest(user),
        onError: (err) => {
            console.log(err);
            throw new Error("Error al crear el usuario");
        }, onSuccess: (user) => {
            console.log(user);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
};
//funcion para actualizar el perfil del usuario
export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();
    //funcion enviar al backend la actualizacion
    const updateUserRequest = async (formData: UpdateUser) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!res.ok) throw new Error("Error al actualizar el usuario");
        return res.json();
    }
    return useMutation({
        mutationFn: (formData: UpdateUser) => updateUserRequest(formData),
        onError: (err) => {
            toast.error("Error al actualizar el usuario");
            console.log(err);
            throw new Error("Error al actualizar el usuario")
        },
        onSuccess: (user) => {
            toast.success("Perfil del usuario actualizado");
            console.log(user);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}
export function useGetUser() {
    const { getAccessTokenSilently } = useAuth0();
    const getUserRequest = async (): Promise<BackEndUser> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error('Error al obtener los datos del usuario')
        }
        return res.json()
    }
    return useQuery({
        queryKey: ['users'],
        queryFn: getUserRequest,
    });
}