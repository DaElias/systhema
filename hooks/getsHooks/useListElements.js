import { useEffect, useMemo, useState } from "react";

export default function useListElements({ id, type }) {
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [update, setUpdate] = useState(false)
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
    }, [id, update])
    const updateList = () => setUpdate(prev => !prev)
    const listElements = useMemo(() => !list?.length ? [] : list, [list])
    return [listElements, isLoading, isError, setList, updateList]
}