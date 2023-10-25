import { createEdgeRouter } from "next-connect";
import { getCustomersController } from "@/controller/customers.controller";

const router = createEdgeRouter();

router
    .get(getCustomersController)

export async function GET(request, ctx) {
    return router.run(request, ctx)
}
