import { NextResponse } from "next/server";
import { prisma } from "@/util/database";
// import { validateToken } from "@/util/jwt";


export async function getCustomersController(req, res) {
    try {
        // if (! await validateToken(req))
        // return new NextResponse("unauthorized", { status: 401 })
        const customers = await prisma.customers.findMany()

        return new NextResponse(JSON.stringify(customers), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify(error.toString()), { status: 400 })
    }
}
export async function postCustomersController(req, res) {
    try {
        // if (! await validateToken(req))
        // return new NextResponse("unauthorized", { status: 401 })
        const { newLisElements, newCostumers } = await req.json()

        const customer = await prisma.customers.create({ data: { ...newCostumers } })
        console.log(customer)

        await prisma.element.createMany({
            data: newLisElements.map(
                (element) => {
                    element.customer_id = customer.id
                    return element
                }
            )
        })

        return new NextResponse(JSON.stringify({ status: 201 }), { status: 201 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify({ message: error.toString() }), { status: 400 })
    }
}



