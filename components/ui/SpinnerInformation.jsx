import { Spinner } from "@nextui-org/react";

export default function SpinnerInformation() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen ">
            <Spinner size="lg" color="warning" />
            <span className="font-bold text-xl border-b-3 border-orange-500">Caricamento!!</span>
        </div>
    )
}