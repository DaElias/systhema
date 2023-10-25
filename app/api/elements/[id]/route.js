import { createEdgeRouter } from "next-connect";
import { getElementByCustomesIdController } from "@/controller/elements.controller";

const router = createEdgeRouter();

router
    .get(getElementByCustomesIdController)

export async function GET(request, ctx) {
    return router.run(request, ctx)
}
