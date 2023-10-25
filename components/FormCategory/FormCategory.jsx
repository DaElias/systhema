"use client"
import { Button, Divider, Input, Textarea } from "@nextui-org/react"

export default function FormCategory({ handleCancel }) {

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <Divider className='mb-2' />
            <Input
                label="Name"
                labelPlacement="outside"
                placeholder="..."
                // value={dateCustomers.fiscale_code}
                name='name'
            // onChange={handleChange}
            // isDisabled={props.type == "view"}
            />
            <Textarea
                name="description"
                label="Description"
                labelPlacement="outside"
                placeholder="add description"
                className=" w-full"
            // value={dateCustomers.address}
            // onChange={handleChange}
            // isDisabled={props.type == "view"}

            />
            <div className='flex gap-2 justify-center'>
                <Button color="primary" variant='ghost' type='submit' >Salvar</Button>
                {handleCancel && (
                    <Button onClick={() => handleCancel()} color="danger" variant='ghost'>Cancell</Button>
                )}
            </div>

        </form>
    )
}