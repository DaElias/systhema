import { createEdgeRouter } from "next-connect";
import { getElementController, postElementController } from "@/controller/elements.controller";

const router = createEdgeRouter();

router
    .get(getElementController)
    .post(postElementController)

export async function GET(request, ctx) {
    return router.run(request, ctx)
}
export async function POST(request, ctx) {
    return router.run(request, ctx)
}
