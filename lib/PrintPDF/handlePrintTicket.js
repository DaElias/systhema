"use client"
import jsPDF from 'jspdf'
import LOGO from '/public/logo-print.png'
import { getTimeFormat, processingDescriptionLong } from '../utils';
// Documentation
// https://rawgit.com/MrRio/jsPDF/master/



export default function handlePrintTicket(
    { elementName = "", customersName = "", id = "", value = "", delivery_description = "", createdAt = "" }
) {
    const { finalText, length } = processingDescriptionLong(delivery_description, 40)
    let doc = new jsPDF({
        // orientation: 'landscape',
        unit: 'mm',
        // width, height
        format: [80, 100 + (length * 4)]
    })
    const owner = "DI SAVERIO IANNELLI"
    // doc.setFontSize(40)
    // doc.setFont("helvetica", "bold")
    // doc.text("SISTHEMA", 3, 20)
    const valuePosition = 65
    doc.addImage(LOGO.src, "PNG", 0, -9, 80, 40)
    // doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(owner, 40 - owner.length, 30)
    doc.text("Via Carmine Aversa N.26", 20, 34)
    doc.text("87012 Castrovillari CS", 22, 38)
    doc.text("TEL. 328 6830008", 24, 42)

    doc.setFontSize(12)
    // Line
    doc.setFont("helvetica", "bold")
    doc.text(getTimeFormat(createdAt), 20, 50)
    doc.setFontSize(10)
    // Line
    doc.setFont("helvetica", "bold")
    doc.text("Id dell'elemento:", 5, 55)
    doc.setFont("helvetica", "normal")
    doc.text(id, valuePosition - id.length, 55)
    // Line
    doc.setFont("helvetica", "bold")
    doc.text("Nome dell'elemento:", 5, 60)
    doc.setFont("helvetica", "normal")
    doc.text(elementName, valuePosition - elementName.length, 60)
    // Line
    doc.setFont("helvetica", "bold")
    doc.text("Nome del cliente:", 5, 65)
    doc.setFont("helvetica", "normal")
    doc.text(customersName, valuePosition - customersName.length, 65)
    // Line
    doc.setFont("helvetica", "bold")
    doc.text("Valore stimato:", 5, 70)
    doc.setFont("helvetica", "normal")
    doc.text(value, valuePosition - value.length, 70)
    // Line
    doc.setFont("helvetica", "bold")
    doc.text("Descrizione di consegna", 14, 75)
    // ***  delivery_description
    doc.setFont("helvetica", "normal")
    doc.text(finalText, 5, 80)

    // doc.autoPrint()
    doc.save(`${customersName}-${id}.pdf`)
}