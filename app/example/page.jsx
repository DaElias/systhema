"use client"
import PrintIcon from "@/components/ui/svg/PrintIcon"
import handlePrintTicket from "@/lib/PrintPDF/handlePrintTicket"

export default function Example() {
    const handleClick = () => {
        handlePrintTicket({ id: "1", elementName: "Pc 12", customersName: "User Example", createdAt: "2023-10-31 20:27:39.228", delivery_description: "La ''Befana'' es una tradición italiana que se celebra el 6 de enero, coincidiendo con la Epifanía, una festividad religiosa. La figura central de esta tradición es La ''Befana'', una bruja buena o vieja mujer que se dice que vuela por los cielos en una escoba la noche anterior al 6 de enero. Durante su vuelo, visita los hogares de los niños italianos y deja regalos o dulces en las medias que cuelgan en las chimeneas o en las camas.", value: " 23.99" })
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={() => handleClick()} className="bg-red-500 rounded-md p-2 text-white">Print
                Element
            </button>
        </div>
    )
}
