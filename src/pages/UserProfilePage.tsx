import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"
import { useGetUser, useUpdateUser } from "@/api/UserApi"
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";

export default function UserProfilePage() {
    const { data: user, isLoading, isError } = useGetUser();
    const updateUserRequest = useUpdateUser();
    if (isLoading) {
        return (
            <LoadingButton />
        )
    }
    if (isError || !user) {
        toast.error('Error al cargar los datos del usuario')
        return (
            <span>No se pudieron obtener los datos del usuario</span>
        )
    }
    return (
        <UserProfileForm onSave={updateUserRequest.mutate} getUser={user} />
    )
}

