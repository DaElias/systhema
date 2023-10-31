"use client"
import { Button, Input } from "@nextui-org/react"
import InputPassword from "../ui/InputPassword"
import { useState } from "react"
import { serviceCreateUser } from "@/service/apiService"
import { useRouter } from "next/navigation"



export default function FormRegister() {
    const [messageError, setMessageError] = useState("")
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { name, last_name, email, password, validate_password } = Object.fromEntries(new window.FormData(event.target))

        // validate information
        if (name === "") {
            return setMessageError(prev => "Il nome è obbligatorio");
        }
        if (last_name === "") {
            return setMessageError(prev => "Il cognome è obbligatorio");
        }
        if (email === "") {
            return setMessageError(prev => "L'indirizzo email è obbligatorio");
        }
        if (password === "") {
            return setMessageError(prev => "La password è obbligatoria");
        }
        if (validate_password === "") {
            return setMessageError(prev => "La conferma della password è obbligatoria");
        }
        if (password !== validate_password)
            return setMessageError(prev => "La password non corrisponde");

        setMessageError(prev => "");

        const response = await serviceCreateUser({ name, last_name, email, password })
        if (response.status == 201) {
            router.push("/login")
        } else {
            setMessageError(prev => response.message);
        }
    }


    return (
        <form
            style={{ background: "#6190E8" }}
            onSubmit={handleSubmit} className="flex flex-col h-screen justify-center items-center">
            <div className="grid gap-3 w-full sm:w-1/2 bg-white rounded-lg p-10">
                <h1 className="text-xl font-extrabold">Registrare gli utenti</h1>
                <Input
                    // isInvalid={validate.description}
                    // errorMessage={validate.description && "Il descrizione del campo è obbligatorio!!"}
                    type="text" label="Nome" name="name" placeholder="Inserisci il tuo Nome" />
                <Input type="text" label="Cognome" name="last_name" placeholder="Inserisci il tuo Nome" />
                <Input type="email" label="Email" name="email" placeholder="Inserisci il tuo indirizzo email" />
                <InputPassword />
                <InputPassword label="Conferma password" name="validate_password" />
                <Button
                    size="lg"
                    variant="bordered"
                    color="primary"
                    type="submit"
                >
                    Registrati
                </Button>
                {messageError?.length != 0 && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{messageError}</span>
                )}
            </div>
        </form>
    )
}