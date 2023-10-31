"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import SpinnerInformation from "@/components/ui/SpinnerInformation"
import { SESSION_AUTHENTICATED, SESSION_LOADING, SESSION_UNAUTHENTICATED } from "@/util/const"


export default function LayoutCustomers({ children }) {
    const { status } = useSession()
    const router = useRouter()

    if (status === SESSION_LOADING)
        return (
            <SpinnerInformation />
        )

    if (status === SESSION_AUTHENTICATED)
        router?.push("/customers")

    if (status === SESSION_UNAUTHENTICATED)
        return (
            <>{children}</>
        )
}