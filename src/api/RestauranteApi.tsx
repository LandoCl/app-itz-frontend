import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { Restaurante } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetRestaurante() {
    const { getAccessTokenSilently } = useAuth0();
    const getRestauranteRequest = async (): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error('Error al obtener los datos del restaurante')
        }
        return res.json();
    }
    return useQuery({
        queryKey: ['restaurante'],
        queryFn: getRestauranteRequest,
    })
}

export function useCreateRestaurante() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    const createRestauranteRequest = async (restaurantFormData: FormData) => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            body: restaurantFormData
        });
        if (!res.ok) {
            throw new Error('Error al crear el restaurante')
        }
        return res.json()
    }
    return useMutation({
        mutationFn: (restaurante: FormData): Promise<Restaurante> => createRestauranteRequest(restaurante),
        onError: (err) => {
            toast.error('Error al crear el restaurante');
            console.log(err);
            throw new Error('Error al crear el restaurante');
        },
        onSuccess: (restaurante) => {
            toast.success('Restaurante creado exitosamente');
            console.log(restaurante);
            queryClient.invalidateQueries({ queryKey: ['restaurante'] });
        },
    })
}

export function useUpdateRestaurante() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    const updateRestauranteRequest = async (restaurantFormData: FormData): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            body: restaurantFormData
        });
        if (!res.ok) {
            throw new Error('Error al actualizar el restaurante')
        }
        return res.json()
    }
    return useMutation({
        mutationFn: (formData: FormData): Promise<Restaurante> => updateRestauranteRequest(formData),
        onError: (err) => {
            console.log(err);
            toast.error(err.toString());
            throw new Error('Error al actualizar el restaurante');
        },
        onSuccess: () => {
            toast.success('Restaurante actualizado');
            queryClient.invalidateQueries({ queryKey: ['restaurante'] });
        },
    })
}