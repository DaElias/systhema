import { useState, useEffect } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const fetchData = async () => {
            try {
                setLoading(true)
                const { signal } = controller
                const response = await fetch(url, { signal })
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`)
                }
                const data = await response.json()
                setData(data)
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
        return () => {
            controller.abort()
        }
    }, [update])

    return [data, loading, error, setUpdate]
}

export default useFetch
