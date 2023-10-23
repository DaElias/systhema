"use client"
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useForm from '@/hooks/useForm';
import { Button, TextareaAutosize } from '@mui/material';


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
    }

    return (
        <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit}
        >
            {/* <TextField
                label="Nome"
                name='name'
                value={dateCustomers.name}
                onChange={handleChange}
                variant="filled"
            />
            <TextField
                label="Cognome"
                name='last_name'
                value={dateCustomers.last_name}
                onChange={handleChange}
                variant="filled"
            />

            <div>
                <div className='text-slate-600'>
                    Address
                </div>
                <textarea
                    name='address'
                    className='bg-gray-100 w-full'
                    value={dateCustomers.address}
                    onChange={handleChange}
                />
            </div>

            <Button type='submit' variant='outlined'>Submit</Button> */}
        </form>
    )
}