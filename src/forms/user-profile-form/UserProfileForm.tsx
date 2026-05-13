"use client"
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { type BackEndUser } from '@/api/types';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { toast } from 'sonner';


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    address: z.string('Direccion debe ser requerida'),
    city: z.string('Ciudad es requerida'),
    country: z.string('Pais es requerido'),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (userProfileData: UserFormData) => void;
    getUser: BackEndUser;
}

export default function UserProfileForm({ onSave, getUser }: Props) {
    const form = useForm<UserFormData>({
        defaultValues: {
            email: '',
            name: '',
            address: '',
            city: '',
            country: ''
        },
        resolver: zodResolver(formSchema)
    })
    function onSubmit(data: UserFormData) {
        onSave(data);
    }
    const onInvalid = () => {
        toast.error('Por favor, llena todos los campos requeridos');
    }
    useEffect(() => {
        form.reset(getUser);
    }, [getUser, form])
    return (
        <Card>
            <form id='user-profile-form' onSubmit={form.handleSubmit(onSubmit, onInvalid)}
                className='space-y-4 bg-gray-50 rounded-lg md:pd-10'>
                <CardHeader>
                    <CardTitle>
                        Perfil del usuario
                    </CardTitle>
                    <CardDescription>
                        Consulta y cambia la informacion de tu perfil aqui
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Controller
                            name='email'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input
                                        {...field} disabled
                                        id='email'
                                        placeholder='Teclea tu email'
                                        className='bg-white'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} />
                    </FieldGroup>
                    <FieldGroup>
                        <Controller
                            name='name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}
                                    className='mt-4'>
                                    <FieldLabel>Nombre</FieldLabel>
                                    <Input
                                        {...field}
                                        id='name'
                                        placeholder='Teclea tu nombre'
                                        className='bg-white'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} />
                    </FieldGroup>
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <FieldGroup>
                            <Controller
                                name='address'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}
                                        className='mt-4'>
                                        <FieldLabel>Direccion</FieldLabel>
                                        <Input
                                            {...field}
                                            id='address'
                                            placeholder='Teclea tu direccion'
                                            className='bg-white'
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )} />
                        </FieldGroup>
                        <FieldGroup>
                            <Controller
                                name='city'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}
                                        className='mt-4'>
                                        <FieldLabel>Ciudad</FieldLabel>
                                        <Input
                                            {...field}
                                            id='city'
                                            placeholder='Teclea tu ciudad'
                                            className='bg-white'
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )} />
                        </FieldGroup>
                        <FieldGroup>
                            <Controller
                                name='country'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}
                                        className='mt-4'>
                                        <FieldLabel>Pais</FieldLabel>
                                        <Input
                                            {...field}
                                            id='country'
                                            placeholder='Teclea tu pais'
                                            className='bg-white'
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )} />
                        </FieldGroup>
                    </div>
                </CardContent>
                <CardFooter className='mt-4'>
                    <Field orientation='horizontal'>
                        <Button type='submit' form='user-profile-form' className='bg-orange-500 text-white'>
                            Actualizar
                        </Button>
                    </Field>
                </CardFooter>

            </form>
        </Card>
    )
}
