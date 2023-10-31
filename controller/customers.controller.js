import { NextResponse } from "next/server";
import { prisma } from "@/util/database";
import { validateToken } from "@/service/jwt.validate";
import { isUserAdmin } from "@/service/validation.server";


export async function getCustomersController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })

        const customers = await prisma.customers.findMany()

        return new NextResponse(JSON.stringify(customers), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify(error.toString()), { status: 400 })
    }
}
export async function postCustomersController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })

        const { newLisElements, newCostumers } = await req.json()
        const customer = await prisma.customers.create({ data: { ...newCostumers } })
        // console.log(customer)
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
export async function putCustomersController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })

        const customer = await req.json()

        if (!customer.id || customer.id == -1)
            throw Error('customer id not found!!')

        await prisma.customers.update({ data: customer, where: { id: parseInt(customer.id) } })

        return new NextResponse(JSON.stringify({ status: 200 }), { status: 201 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify({ message: error.toString() }), { status: 400 })
    }
}
export async function deleteCustomersController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })

        const { id } = await req.json()

        if (!id || id == -1)
            throw Error('customer id not found!!')

        await prisma.element.deleteMany({ where: { customer_id: parseInt(id) } })
        await prisma.customers.deleteMany({ where: { id: parseInt(id) } })

        return new NextResponse(JSON.stringify({ status: 200 }), { status: 201 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify({ message: error.toString() }), { status: 400 })
    }
}



