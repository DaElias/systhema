"use client"
import { useState } from 'react';
import useForm from '@/hooks/useForm';
import { Button, Divider, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { MailIcon } from '../ui/svg/MailIcon';
import { HAS_PROVINCE } from '@/lib/utils';
import ListElements from './ListElements/ListElements';
import Link from 'next/link';


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

    const handleSubmit = (event) => {
        event.preventDefault()
        // const dataForm = Object.fromEntries(new window.FormData(e.target))
        // console.log(dataForm)
    }

    return (
        <form
            className='flex flex-col gap-4 w-full pb-2'
            onSubmit={handleSubmit}
        >
            <h3 className='text-md font-extrabold'>Costumer Information</h3>
            {/* Form Customers */}
            <div className=''>
                <Divider className='mb-4' />
                <div className='flex flex-col'>
                    <Input
                        label="Code Fiscale"
                        labelPlacement="outside"
                        placeholder="..."
                        value={dateCustomers.fiscale_code}
                        name='fiscale_code'
                        onChange={handleChange}
                        isDisabled={props.type == "view"}
                    />
                </div>
                <div className='flex gap-2 flex-row py-2'>
                    <Input
                        label="Nome"
                        labelPlacement="outside"
                        placeholder="..."
                        // isInvalid={true}
                        // errorMessage="Please enter a valid email"
                        value={dateCustomers.name}
                        name='name'
                        onChange={handleChange}
                        isDisabled={props.type == "view"}

                    />
                    <Input
                        label="Cognome"
                        labelPlacement="outside"
                        placeholder="..."
                        value={dateCustomers.last_name}
                        name='last_name'
                        onChange={handleChange}
                        isDisabled={props.type == "view"}

                    />
                </div>
                <Textarea
                    name="address"
                    label="Address"
                    labelPlacement="outside"
                    placeholder="Enter your address"
                    className=" w-full"
                    value={dateCustomers.address}
                    onChange={handleChange}
                    isDisabled={props.type == "view"}

                />
            </div>
            <div className='flex gap-2 flex-row items-center'>
                <Input
                    label="C.A.P."
                    labelPlacement="inside"
                    value={dateCustomers.zip_code}
                    name='zip_code'
                    onChange={handleChange}
                    isDisabled={props.type == "view"}

                />
                <Input
                    label="Cittá"
                    labelPlacement="inside"
                    value={dateCustomers.city}
                    name='city'
                    onChange={handleChange}
                    isDisabled={props.type == "view"}
                />
                <Select
                    label="Provice"
                    className="max-w-xs"
                    name='provice'
                    defaultSelectedKeys={[dateCustomers.provice]}
                    isDisabled={props.type == "view"}
                    onChange={handleChange}
                >
                    {
                        // props.type != "view" &&
                        HAS_PROVINCE.map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))
                    }
                </Select>
            </div>
            <div className='flex gap-2 flex-row items-center'>
                <div className='w-full'>
                    <Input
                        label="Telefono (1)"
                        labelPlacement="outside"
                        startContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        value={dateCustomers.contact_1}
                        name='contact_1'
                        onChange={handleChange}
                        isDisabled={props.type == "view"}
                    />
                    {dateCustomers.contact_1 && (
                        <Link
                            className='border-green-500 border-b-2 mx-2 text-green-500'
                            href={`https://wa.me/${dateCustomers.contact_1}`}
                            target='_blank'
                        >
                            Vai su Whatsapp
                        </Link>
                    )}
                </div>
                <div className='w-full'>
                    <Input
                        label="Telefono (2)"
                        labelPlacement="outside"
                        startContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        value={dateCustomers.contact_2}
                        name='contact_2'
                        onChange={handleChange}
                        isDisabled={props.type == "view"}
                    />
                    {dateCustomers.contact_2 && (
                        <Link
                            className='border-green-500 border-b-2 mx-2 text-green-500'
                            href={`https://wa.me/${dateCustomers.contact_2}`}
                            target='_blank' >
                            Vai su Whatsapp
                        </Link>
                    )}
                </div>
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
                    isDisabled={props.type == "view"}
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
                    isDisabled={props.type == "view"}
                />
            </div>


            {/* List Elemets */}
            <ListElements id={dateCustomers.id} typeCustomers={props.type} />

            <div className='flex gap-2 justify-center'>
                {props.type != "view" && (
                    <Button color="primary" variant='ghost' type='submit' >Salvar</Button>
                )}
                {props.handleCancel && (
                    <Button onClick={() => props.handleCancel()} color="danger" variant='ghost'>{props.type == "view" ? "Exit" : "Cancel"}</Button>
                )}
            </div>
        </form>
    )
}