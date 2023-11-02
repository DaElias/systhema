import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/util/database"
import { compare } from "bcryptjs"
import { isValidEmail } from "./validation.server"
import { NEXTAUTH_SECRET } from "@/util/const"


const configAuth = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                //Check if the user exists.
                try {
                    if (!isValidEmail(credentials.email))
                        throw new Error("E-mail non valida!!")
                    // const user = await prisma.user.findFirst({ where: { email: credentials.email } })
                    const user = await prisma.user.findUnique({ where: { email: credentials.email } })
                    if (!user) {
                        throw new Error("Utente non trovato!!")
                    } else {
                        const isPasswordCorrect = await compare(credentials.password, user.password)
                        if (!isPasswordCorrect) {
                            throw new Error("Credenziali errate!")
                        } else {
                            // everything ok!!
                            delete user.password
                            return user
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token
            return session
        },
    },
    pages: {
        error: "/login",
    },
    secret: NEXTAUTH_SECRET,
    session: {
        // strategy: "database",
        jwt: true,
        maxAge: 3 * 60 * 60,
        // maxAge: 1,
    }
}

export default configAuth