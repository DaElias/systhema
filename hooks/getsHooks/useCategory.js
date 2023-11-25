import { useMemo } from "react"
import useFetch from "../useFetch"
import { KEY_DOCUMENT_STOREGE_API_CATEGORES } from "@/util/const"


export default function useCategory() {
   const [data, isLoading, isError, setUpdate] = useFetch(KEY_DOCUMENT_STOREGE_API_CATEGORES,[])
   const listCategories = useMemo(() => !data?.length ? [] : data, [data])
   return { listCategories, isLoading, isError, updateCategory: () => { setUpdate(prev => !prev) } }
}