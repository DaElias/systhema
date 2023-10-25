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
