import { useMemo } from "react"
import useFetch from "../useFetch"
import { KEY_DOCUMENT_STOREGE_API_CATEGORES } from "@/util/const"
import { covertArrayToHas } from "@/lib/utils"


export default function useCategory() {
   const [data, isLoading, isError, setUpdate] = useFetch(KEY_DOCUMENT_STOREGE_API_CATEGORES, [])
   const listCategories = useMemo(() => !data?.length ? [] : data, [data])
   const hashListCategories = useMemo(() => !data?.length ? {} : covertArrayToHas({ key: "id", array: listCategories }), [data])
   console.log(hashListCategories)
   console.log(listCategories)
   return { listCategories,hashListCategories, isLoading, isError, updateCategory: () => { setUpdate(prev => !prev) } }
}