"use client"
import useForm from "@/hooks/useForm"
import { serviceCreateCategory } from "@/service/apiService"
import { Button, Divider, Input, Textarea } from "@nextui-org/react"
import { useEffect, useMemo, useState } from "react"

export default function FormCategory({ handleCancel, listCategories = [] }) {
    const [dataForm, handleChange, resetForm] = useForm({ name: "", description: "" })
    const [validateError, setValidateError] = useState({ error: false })
    const listCategoriesString = useMemo(() => listCategories.map(item => item.name.toLowerCase()), [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (dataForm.name.length == 0 || !dataForm.description.length == 0)
            return

        const respose = await serviceCreateCategory(dataForm)
        if (respose.status != "create") {
            console.log("create")
        } else {
            console.log("error")
        }
    }


    useEffect(() => {
        const validateName = dataForm.name
            .replaceAll(" ", "")
            .toLowerCase()
        setValidateError(
            listCategoriesString
                .includes(validateName)
            || listCategoriesString
                .includes(dataForm.name.toLowerCase())
        )
    }, [dataForm.name])


    return (
        <form onSubmit={handleSubmit}>
            <Divider className='mb-2' />
            <Input
                label="Name"
                labelPlacement="outside"
                placeholder="..."
                value={dataForm.name}
                name='name'
                onChange={handleChange}
                isInvalid={validateError}
                errorMessage={validateError && `${dataForm.name} is already exist!!`}
            />
            <Textarea
                name="description"
                label="Description"
                labelPlacement="outside"
                placeholder="add description"
                className=" w-full"
                value={dataForm.description}
                onChange={handleChange}
            />
            <div className='flex gap-2 justify-center py-2'>
                <Button isDisabled={validateError} color="primary" variant='ghost' type='submit' >Salvar</Button>
                {handleCancel && (
                    <Button onClick={() => handleCancel()} color="danger" variant='ghost'>Cancell</Button>
                )}
            </div>

        </form>
    )
}