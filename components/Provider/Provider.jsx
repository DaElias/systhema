"use client"
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react"


export default function Provider({ children }) {
    return (
        <SessionProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </SessionProvider>
    )
}