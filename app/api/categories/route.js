import { createEdgeRouter } from "next-connect";
import { getCategoriesController, postCreateCategoryController } from "@/controller/categories.controller";

const router = createEdgeRouter();

router
    .get(getCategoriesController)
    .post(postCreateCategoryController)

export async function GET(request, ctx) {
    return router.run(request, ctx)
}
export async function POST(request, ctx) {
    return router.run(request, ctx)
}
