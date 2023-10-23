import { useState } from "react"

export default function useForm(initialValue) {
    const [value, setValue] = useState(initialValue)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValue({ ...value, [name]: value })
    }

    const restForm = () => setValue(initialValue)

    return [value, handleChange, restForm]
}