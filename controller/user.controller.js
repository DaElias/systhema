import { prisma } from "@/util/localStorage"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function postUserController(req, res) {
    try {
        const { name, last_name, email, password } = await req.json()

        const validateEmail = await prisma.user.findUnique({ where: { email: email }, select: { id: true } })
        if (validateEmail)
            throw Error("email già utilizzata")

        const securePassword = await hash(password, 10)

        await prisma.user.create({ data: { name, last_name, email, password: securePassword } })

        return new NextResponse(JSON.stringify({ status: 201 }), { status: 201 })
    } catch (error) {
        // console.log(error)
        return new NextResponse(JSON.stringify({ message: error.toString() }), { status: 400 })
    }
}