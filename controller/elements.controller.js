import { NextResponse } from "next/server";
import { prisma } from "@/util/database";
// import { validateToken } from "@/util/jwt";


export async function getElementController(req, res) {
    try {
        // if (! await validateToken(req))
        // return new NextResponse("unauthorized", { status: 401 })
        const elements = await prisma.element.findMany()

        return new NextResponse(JSON.stringify(elements), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify(error.toString()), { status: 400 })
    }
}



export async function getElementByCustomesIdController(req, res) {
    try {
        // if (! await validateToken(req))
        // return new NextResponse("unauthorized", { status: 401 })
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
