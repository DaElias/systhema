"use client"
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./svg/EyeFilledIcon";

export default function InputPassword({ label = "Password", variant = "bordered", name = "password", required = false }) {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    return (
        <Input
            label={label}
            variant={variant}
            name={name}
            placeholder="Inserisci la tua password"
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            required={required}
            type={isVisible ? "text" : "password"}
            className="w-full"
        />
    )
}