import { getToken } from "next-auth/jwt"
import { NEXTAUTH_SECRET } from "@/util/const"
import { prisma } from "@/util/database"

export async function validateToken(req, validateAdmin = false) {
    const token = await getToken({ req, NEXTAUTH_SECRET })
    if (validateAdmin) {
        const user = await prisma.user.findUnique({ where: { id: parseInt(token.id) }, select: { role: true } })
        return user?.role == "ADMIN"
    }
    return token
}
