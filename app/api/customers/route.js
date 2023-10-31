import { createEdgeRouter } from "next-connect"
import { deleteCustomersController, getCustomersController, postCustomersController, putCustomersController } from "@/controller/customers.controller"

const router = createEdgeRouter()

router
    .get(getCustomersController)
    .post(postCustomersController)
    .put(putCustomersController)
    .delete(deleteCustomersController)

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
