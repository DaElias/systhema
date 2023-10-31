"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import SpinnerInformation from "@/components/ui/SpinnerInformation"
import { SESSION_AUTHENTICATED, SESSION_LOADING, SESSION_UNAUTHENTICATED } from "@/util/const"
import UnauthorizedPage from "@/components/ui/UnauthorizedPage"


export default function LayoutCustomers({ children }) {
    const { status, data } = useSession()
    const router = useRouter()

    if (status === SESSION_LOADING)
        return (
            <SpinnerInformation />
        )

    // if (data?.user?.role == "USER")
    //     return (
    //         <UnauthorizedPage />
    //     )

    if (status === SESSION_UNAUTHENTICATED)
        router?.push("/login")


    if (status === SESSION_AUTHENTICATED)
        return (
            <>{children}</>
        )
}