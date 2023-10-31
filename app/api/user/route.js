import { createEdgeRouter } from "next-connect"
import { postUserController } from "@/controller/user.controller"

const router = createEdgeRouter()

router
    .post(postUserController)


export async function POST(request, ctx) {
    return router.run(request, ctx)
}

