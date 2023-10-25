import { createEdgeRouter } from "next-connect";
import { getElementController } from "@/controller/elements.controller";

const router = createEdgeRouter();

router
    .get(getElementController)

export async function GET(request, ctx) {
    return router.run(request, ctx)
}
