import { NextResponse } from "next/server";
import { prisma } from "@/util/database";
import { validateToken } from "@/service/jwt.validate";


export async function getElementController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })
        const elements = await prisma.element.findMany()

        return new NextResponse(JSON.stringify(elements), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify(error.toString()), { status: 400 })
    }
}

export async function postElementController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })
        const element = await req.json()

        await prisma.element.create({ data: { ...element } })

        return new NextResponse(JSON.stringify({ status: 201 }), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify({ message: error.toString() }), { status: 400 })
    }
}
export async function putElementController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })
        const element = await req.json()

        if (!element.id || element.id == -1)
            throw Error('id element not found')

        await prisma.element.update({ data: { ...element }, where: { id: parseInt(element.id) } })

        return new NextResponse(JSON.stringify({ status: 200 }), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify({ message: error.toString() }), { status: 400 })
    }
}



export async function getElementByCustomesIdController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })
        const { id } = res.params;
        const elements = await prisma.element.findMany({
            where: { customer_id: parseInt(id) },
            select: {
                Category: { select: { name: true } },
                name: true, id: true, description: true, state: true,
                delivery_description: true
            }
        })

        return new NextResponse(JSON.stringify(elements), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify(error.toString()), { status: 400 })
    }
}
