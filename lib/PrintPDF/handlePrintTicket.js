import jsPDF from 'jspdf';




export default function handlePrintTicket({ }) {
    let doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        // width, height
        format: [80, 80]
    })

    doc.text('Hello world!', 2, 5)
    doc.save('two-by-four.pdf')
}