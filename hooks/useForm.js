import { useState } from "react"

export default function useForm(initialValue) {
    const [data, setData] = useState(initialValue)
    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }
    const restForm = () => setData(initialValue)
    return [data, handleChange, restForm]
}