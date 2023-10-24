import Link from "next/link";
// import { TbError404 } from "react-icons/tb";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-semibold text-gray-800">
                Errore 404
            </h1>
            <p className="text-lg text-gray-600">Ci dispiace, ma la pagina che stai cercando non è disponibile.</p>
            <Link href="/" className="my-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Torna alla pagina principale</Link>
        </div>
    )
}