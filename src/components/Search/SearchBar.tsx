"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod"
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { useEffect } from "react";

const formSchema = z.object({
    searchQuery: z.string().min(1, "Nombre del restaurante es requerido")
})
export type SearchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string;
}

export default function SearchBar({ onSubmit, onReset, placeHolder, searchQuery }: Props) {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: ''
        }
    })
    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])
    const handleReset = () => {
        form.reset({
            searchQuery: ''
        });
        if (onReset) {
            onReset();
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.searchQuery ? 'border-red-500' : 'border-gray-200'}`}>
                <SearchIcon strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
                <Controller
                    name="searchQuery"
                    control={form.control}
                    render={({ field }) => (
                        <Field className="flex-1 w-full">
                            <ButtonGroup className="flex flex-row w-full items-center gap-2 border-none shadow-none rounded-full!">
                                <Input
                                    {...field}
                                    placeholder={placeHolder}
                                    id="searchQuery"
                                    className="border-none shadow-none text-xl focus-visible:ring-0 bg-blue-50 flex-1" />
                                <Button onClick={handleReset} type="button" variant="outline">
                                    Limpiar
                                </Button>
                                <Button type="submit" className="bg-orange-500 text-white font-semibold hover:bg-orange-600 px-6 border-none">
                                    Buscar
                                </Button>
                            </ButtonGroup>
                        </Field>
                    )} />
            </FieldGroup>
        </form>
    )
}
