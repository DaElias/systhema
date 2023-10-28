import { useEffect, useMemo, useState } from "react";

export default function useListElements({ id, type }) {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const data = await fetch(`/api/elements/${id}`).then(res => res.json())
                setList(data)
                setIsLoading(false)
            } catch (error) {
                setIsError(true)
            }
        }
        if (type !== "create")
            getData()
    }, [id])
    const listElements = useMemo(() => !list?.length ? [] : list, [list])
    console.log(listElements)

    return [listElements, isLoading, isError]
}