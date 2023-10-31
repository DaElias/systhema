"use client"

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Image, Input } from "@nextui-org/react"
import InputPassword from "../ui/InputPassword";
import LOGO from "/public/logo.png"

export default function FormLogin() {
    const router = useRouter()
    const params = useSearchParams()
    const messageError = params.get('error') || ""

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = Object.fromEntries(new window.FormData(event.target))
        signIn("credentials", {
            email,
            password,
        }).then(() => {
            router?.push("/customers");
        }).catch((error) => {
            router?.push(`/login?error=${error}`);
        });
    }

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center h-screen w-full">
            <Image
                width={340}
                src={LOGO.src}
                alt="logo" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:w-1/4">
                <h2>
                    Accedi all &apos;app
                </h2>
                <Input required type="email" label="Email" name="email" placeholder="Inserisci il tuo indirizzo email" />
                <InputPassword required />
                <Button
                    size="lg"
                    variant="bordered"
                    color="primary"
                    type="submit"
                >
                    Login
                </Button>
                {messageError?.length != 0 && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{messageError}</span>
                )}
            </form>
        </div>
    )
}