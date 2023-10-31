import { NextResponse } from "next/server";
import { prisma } from "@/util/database";
import { validateToken } from "@/service/jwt.validate";


export async function getCategoriesController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })
        const categories = await prisma.category.findMany()

        return new NextResponse(JSON.stringify(categories), { status: 200 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify(error.toString()), { status: 400 })
    }
}
export async function postCreateCategoryController(req, res) {
    try {
        if (! await validateToken(req, true))
            return new NextResponse("unauthorized", { status: 401 })
        const { name, description } = await req.json()
        // console.log(name, description)
        // console.log(name, description)
        if (!name || !description)
            return new NextResponse("params not found!!", { status: 400 })

        await prisma.category.create({ data: { name, description } })

        return new NextResponse(JSON.stringify({ status: "create" }), { status: 201 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify({ status: "error", msg: error.toString() }), { status: 400 })
    }
}
