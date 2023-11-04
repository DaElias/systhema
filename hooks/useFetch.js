import { useState, useEffect } from 'react'
import { Store } from "tauri-plugin-store-api";

function useFetch(url, defaultValue) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const store = new Store(".settings.dat")
                const data = await store.get(url)
                if (!data) {
                    setData(defaultValue)
                } else {
                    setData(data)
                }
                setLoading(false)
            } catch (error) {
                if (error.name === 'AbortError') {
                    // console.log('La solicitud fue cancelada.')
                } else {
                    setError(error.message)
                    setLoading(false)
                }
            }
        }
        fetchData()
    }, [update])

    return [data, loading, error, setUpdate]
}

export default useFetch
