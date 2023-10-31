import NextAuth from "next-auth";
import configAuth from "@/service/auth.validate";

const handler = NextAuth(configAuth);

export { handler as GET, handler as POST };
