import { createEdgeRouter } from "next-connect"
import { getCustomersController, postCustomersController, putCustomersController } from "@/controller/customers.controller"

const router = createEdgeRouter()

router
    .get(getCustomersController)
    .post(postCustomersController)
    .put(putCustomersController)

export async function GET(request, ctx) {
    return router.run(request, ctx)
}
export async function POST(request, ctx) {
    return router.run(request, ctx)
}
export async function PUT(request, ctx) {
    return router.run(request, ctx)
}
