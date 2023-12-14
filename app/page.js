"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import handlePrintTicket from "@/lib/PrintPDF/handlePrintTicket"
import IMG_LOGO from '/public/logo.png'
import Image from "next/image"

// http://localhost:3000/?elementName="PC"&customersName="juan"&id="1"&value="12"&delivery_description="loremas"&createdAt="12/12/2012"

export default function Home() {
  const params = useSearchParams()
  const [btnIsActive, setBtnIsActive] = useState(false)
  const [printELement, setPrintELement] = useState({})


  useEffect(() => {
    try {
      const elementName = JSON.parse(params.get("elementName"))
      const customersName = JSON.parse(params.get("customersName"))
      const id = JSON.parse(params.get("id"))
      const value = JSON.parse(params.get("value"))
      const delivery_description = JSON.parse(params.get("delivery_description"))
      const createdAt = JSON.parse(params.get("createdAt"))

      if (!elementName
        || !customersName
        || !id
        || !value
        || !delivery_description
        || !createdAt)
        throw new Error("params is not found!!")
      const data = { createdAt, customersName, delivery_description, elementName, id, value }
      // print pdf
      handlePrintTicket(data)
      setPrintELement(data)
    } catch (error) {
      setBtnIsActive(true)
    }
  }, [])

  return (
    <main className="flex flex-col gap-4 justify-center items-center bg-slate-200 w-screen h-screen">
      <Image src={IMG_LOGO} />
      <button
        onClick={() => { handlePrintTicket(printELement) }}
        disabled={btnIsActive} className="disabled:opacity-50 text-white font-bold bg-blue-400 rounded-md p-10">Stampare PDF</button>
      {btnIsActive && <span className="rounded-md bg-red-600 text-white p-5">Si è verificato un errore durante la generazione del PDF!!</span>}
    </main>
  )
}
