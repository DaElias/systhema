import Link from "next/link";
import { signOut } from "next-auth/react"
import { Button } from "@nextui-org/react";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold text-gray-800">
                Nessuna autorizzazione
            </h1>
            <p className="text-lg text-gray-600">Ci dispiace, ma non hai l'autorizzazione necessaria per accedere a questa pagina.</p>
            <Link href="/" className="my-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Torna alla pagina principale</Link>
            <Button onClick={signOut} className="mb-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">Cancella la sottoscrizione</Button>
        </div>
    )
}