"use client"
import { useState } from 'react';
import useForm from '@/hooks/useForm';
import { Button, Divider, Input, Select, Textarea } from '@nextui-org/react';
import { MailIcon } from './svg/MailIcon';


export default function FormCustomers(props) {
    const [dateCustomers, handleChange, formReset] = useForm({
        id: props.id,
        name: props.name,
        last_name: props.last_name,
        address: props.address,
        contact_1: props.contact_1,
        contact_2: props.contact_2,
        email_1: props.email_1,
        email_2: props.email_2,
        provice: props.provice,
        city: props.city,
        zip_code: props.zip_code,
        fiscale_code: props.fiscale_code
    })
    const [validate, setValidate] = useState({ name: "t" })

    console.log(dateCustomers)

    const handleSubmit = (event) => {
        event.preventDefault()
        // const dataForm = Object.fromEntries(new window.FormData(e.target))
        // console.log(dataForm)
    }

    return (
        <form
            className='flex flex-col gap-4 w-full'
            onSubmit={handleSubmit}
        >
            <Divider />
            <div className='flex flex-col'>
                <Input
                    label="Code Fiscale"
                    labelPlacement="outside"
                    placeholder="..."
                    value={dateCustomers.fiscale_code}
                    name='fiscale_code'
                    onChange={handleChange}
                    disabled={props.type == "view"}

                />
            </div>
            <div className='flex gap-2 flex-row'>
                <Input
                    label="Nome"
                    labelPlacement="outside"
                    placeholder="..."
                    isInvalid={true}
                    errorMessage="Please enter a valid email"
                    value={dateCustomers.name}
                    name='name'
                    onChange={handleChange}
                    disabled={props.type == "view"}

                />
                <Input
                    label="Cognome"
                    labelPlacement="outside"
                    placeholder="..."
                    value={dateCustomers.last_name}
                    name='last_name'
                    onChange={handleChange}
                    disabled={props.type == "view"}

                />
            </div>
            <Textarea
                name="address"
                label="Address"
                labelPlacement="outside"
                placeholder="Enter your description"
                className=" w-full"
                value={dateCustomers.address}
                onChange={handleChange}
                disabled={props.type == "view"}

            />
            <div className='flex gap-2 flex-row items-center'>
                <Input
                    label="C.A.P."
                    labelPlacement="inside"
                    value={dateCustomers.zip_code}
                    name='zip_code'
                    onChange={handleChange}
                    disabled={props.type == "view"}

                />
                <Select
                    label="Select an Cittá"
                    className="max-w-xs"
                    name='city'
                    disabled={props.type == "view"}
                >
                    {[].map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                            {animal.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Select an Provice"
                    className="max-w-xs"
                    name='provice'
                    disabled={props.type == "view"}
                >
                    {[].map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                            {animal.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className='flex gap-2 flex-row items-center'>
                <Input
                    label="Telefono (1)"
                    labelPlacement="outside"
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    value={dateCustomers.contact_1}
                    name='contact_1'
                    onChange={handleChange}
                    disabled={props.type == "view"}
                />
                <Input
                    label="Telefono (2)"
                    labelPlacement="outside"
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    value={dateCustomers.contact_1}
                    name='contact_1'
                    onChange={handleChange}
                    disabled={props.type == "view"}
                />
            </div>
            <div className='flex gap-2 flex-row items-center'>
                <Input
                    type="email"
                    label="Email (1)"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    value={dateCustomers.email_1}
                    name='email_1'
                    onChange={handleChange}
                    disabled={props.type == "view"}
                />
                <Input
                    type="email"
                    label="Email (2)"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    value={dateCustomers.email_2}
                    name='email_2'
                    onChange={handleChange}
                    disabled={props.type == "view"}
                />
            </div>

            {props.type != "view" && (
                <Button color="primary" variant='ghost' type='submit' >Submit</Button>
            )}
            {props.handleCancel && (
                <Button onClick={() => props.handleCancel()} color="default" variant='shadow'>{props.type == "view" ? "Exit" : "Cancel"}</Button>
            )}
        </form>
    )
}