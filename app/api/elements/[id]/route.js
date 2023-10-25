import { NextResponse } from "next/server";
import { prisma } from "@/util/database";
// import { validateToken } from "@/util/jwt";


export async function GET(req, res) {
    try {
        // if (! await validateToken(req))
        // return new NextResponse("unauthorized", { status: 401 })
        const { id } = res.params;
        const elements = await prisma.element.findMany({ where: { customer_id: parseInt(id) } })

        return new NextResponse(JSON.stringify(elements), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify(error.toString()), { status: 400 })
    }
}
