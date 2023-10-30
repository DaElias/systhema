import { createEdgeRouter } from "next-connect"
import { getCustomersController, postCustomersController } from "@/controller/customers.controller"

const router = createEdgeRouter()

router
    .get(getCustomersController)
    .post(postCustomersController)
export async function GET(request, ctx) {
    return router.run(request, ctx)
}
export async function POST(request, ctx) {
    return router.run(request, ctx)
}
