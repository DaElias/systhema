import { createEdgeRouter } from "next-connect"
import { deleteElementController, getElementController, postElementController, putElementController } from "@/controller/elements.controller"

const router = createEdgeRouter()

router
    .get(getElementController)
    .post(postElementController)
    .put(putElementController)
    .delete(deleteElementController)

export async function GET(request, ctx) {
    return router.run(request, ctx)
}
export async function POST(request, ctx) {
    return router.run(request, ctx)
}
export async function PUT(request, ctx) {
    return router.run(request, ctx)
}
export async function DELETE(request, ctx) {
    return router.run(request, ctx)
}
