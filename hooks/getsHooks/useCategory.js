import { useMemo } from "react"
import useFetch from "../useFetch"


export default function useCategory() {
   const [data, isLoading, isError, setUpdate] = useFetch("get-api-categories",[])
   const listCategories = useMemo(() => !data?.length ? [] : data, [data])
   return { listCategories, isLoading, isError, updateCategory: () => { setUpdate(prev => !prev) } }
}