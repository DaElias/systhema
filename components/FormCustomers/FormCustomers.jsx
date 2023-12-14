"use client"
import { useState } from 'react';
import useForm from '@/hooks/useForm';
import useListElements from '@/hooks/getsHooks/useListElements';
import ListElements from './ListElements/ListElements';
import { Button, Divider, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { MailIcon } from '../ui/svg/MailIcon';
import { HAS_PROVINCE, clearObject } from '@/lib/utils';
import useValidateFelds from '@/hooks/useValidateFelds';
import { serviceCreateCustomers, serviceCreateElement, serviceDeleteElement, serviceEditCustomer, serviceEditElement } from '@/service/apiService';
import { open } from '@tauri-apps/api/shell';


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
    const [validateCustomers, handleValidations] = useValidateFelds({
        name: false,
        last_name: false,
        address: false,
        contact_1: false,
        email_1: false,
        provice: false,
        city: false,
        zip_code: false,
    }, dateCustomers)
    const [listElements, isLoading, isError,
        setListElement, updateListElements] = useListElements({ id: props.id, type: props.type })
    const [isLoadingForm, setIsLoadingForm] = useState(false)

    const handleSubmit = (event = null) => {
        // event.preventDefault()
        // validate feltds
        const validateName = handleValidations("name")
        const validateLast_name = handleValidations("last_name")
        const validateAddress = handleValidations("address")
        const validateZip_code = handleValidations("zip_code")
        const validateCity = handleValidations("city")
        const validateProvice = handleValidations("provice")
        const validateContact_1 = handleValidations("contact_1")
        const validateEmail_1 = handleValidations("email_1")

        if (validateName || validateLast_name || validateAddress || validateZip_code || validateCity ||
            validateProvice || validateContact_1 || validateEmail_1)
            return

        if (props.type == "create") {
            handleCreateCustomers()
            return
        }
        if (props.type == "edit") {
            handleEditCutomers()
            return
        }
    }

    // Options Elements
    const handleElementsOptions = async (newElement) => {
        if (newElement.type == "create") {
            if (newElement.customer_id != -1) {
                const isCreateElement = await handleCreateElement(newElement)
                if (!isCreateElement)
                    return
                updateListElements()
            } else {
                const newListElement = listElements
                newElement.uid = Date.now()
                newListElement.push(newElement)
                setListElement(newListElement)
            }
        } else if (newElement.type == "edit") {
            let key = "uid"
            if (newElement.id != -1) {
                key = "id"
                const isEditElement = await handleEditElement(newElement)
                if (!isEditElement) {
                    return
                }
            }
            setListElement(prev => prev.map((element) => {
                if (element[key] == newElement[key]) {
                    return newElement
                }
                return element
            }))
        } else if (newElement.type == "delete") {
            setIsLoadingForm(true)
            if (newElement.id) {
                const response = await serviceDeleteElement(
                    { idElement: newElement.id, idCustomers: dateCustomers.id }
                )
                if (response.status != 200) {
                    setIsLoadingForm(false)
                    return
                }
                updateListElements()
            } else {
                setListElement(prev => prev.filter(item => item.uid != newElement.uid))
            }
            setIsLoadingForm(false)
        }
    }

    const handleCreateCustomers = async () => {
        // we shoud send the date of customers and element
        const newLisElements = listElements.map((element) => {
            return {
                name: element.name,
                description: element.description,
                delivery_description: element.delivery_description,
                state: element.state,
                category_id: element.category_id,
                value: parseFloat(element.value)
            }
        })
        const newCostumers = clearObject(dateCustomers)
        const response = await serviceCreateCustomers({ newLisElements, newCostumers })
        if (response.status == 201) {
            props.handleUpdate()
            props.handleCancel()
        } else {
            console.log(response)
        }
    }

    const handleEditCutomers = async () => {
        const costumer = clearObject(dateCustomers)
        console.log(dateCustomers)
        const response = await serviceEditCustomer(costumer)
        if (response.status == 200) {
            props.handleUpdate()
            props.handleCancel()
        } else {
            console.log(response)
        }
    }


    const handleCreateElement = async (element) => {
        setIsLoadingForm(true)
        const newElement = clearObject({
            name: element.name,
            description: element.description,
            delivery_description: element.delivery_description,
            state: element.state,
            category_id: element.category_id,
            customer_id: element.customer_id,
            value: element.value
        })
        const response = await serviceCreateElement(newElement)
        setIsLoadingForm(false)
        return response.status == 201
    }

    const handleEditElement = async (element) => {
        setIsLoadingForm(true)
        const newElement = clearObject({
            id: element.id,
            name: element.name,
            description: element.description,
            delivery_description: element.delivery_description,
            state: element.state,
            category_id: element.category_id,
            customer_id: element.customer_id,
            value: parseFloat(element.value)
        })
        const response = await serviceEditElement(newElement)
        setIsLoadingForm(false)
        return response.status == 200
    }

    const handlePrintBillElement = (element) => {

        const elementName = element.name
        const customersName = `${dateCustomers.name} ${dateCustomers.last_name}`
        const delivery_description = element.delivery_description
        const createdAt = !element.createdAt ? new Date() : element.createdAt
        const id = element.id + ""
        const value = element.value + ""

        // chage this
        const link = "https://systema-5frvg7je5-sisthema-admins-projects.vercel.app/"

        open(`${link}/?elementName="${elementName}"&customersName="${customersName}"&id="${id}"&value="${value}"&delivery_description="${delivery_description}"&createdAt="${createdAt}"`)
    }



    return (
        <div
            className={`flex flex-col gap-4 w-full pb-2 ${isLoadingForm && 'cursor-wait'} `}
        // onSubmit={handleSubmit}
        >
            <h3 className='text-md font-extrabold'>Costumer Information</h3>
            {/* Form Customers */}
            <>
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
                            isInvalid={validateCustomers.name}
                            errorMessage={validateCustomers.name && "Il nome del campo è obbligatorio!!"}
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
                            isInvalid={validateCustomers.last_name}
                            errorMessage={validateCustomers.last_name && "Il cognome del campo è obbligatorio!!"}
                        />
                    </div>
                    <Textarea
                        name="address"
                        label="Indirizzo"
                        labelPlacement="outside"
                        placeholder="Enter your address"
                        className=" w-full"
                        value={dateCustomers.address}
                        onChange={handleChange}
                        isDisabled={props.type == "view"}
                        isInvalid={validateCustomers.address}
                        errorMessage={validateCustomers.address && "Il indirizzo del campo è obbligatorio!!"}
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
                        isInvalid={validateCustomers.zip_code}
                        errorMessage={validateCustomers.zip_code && "Il C.A.P. del campo è obbligatorio!!"}
                    />
                    <Input
                        label="Cittá"
                        labelPlacement="inside"
                        value={dateCustomers.city}
                        name='city'
                        onChange={handleChange}
                        isDisabled={props.type == "view"}
                        isInvalid={validateCustomers.city}
                        errorMessage={validateCustomers.city && "Il cittá del campo è obbligatorio!!"}
                    />
                    <Select
                        label="Provice"
                        className="max-w-xs"
                        name='provice'
                        defaultSelectedKeys={[dateCustomers.provice]}
                        isDisabled={props.type == "view"}
                        onChange={handleChange}
                        isInvalid={validateCustomers.provice}
                        errorMessage={validateCustomers.provice && "Il provice del campo è obbligatorio!!"}
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
                            isInvalid={validateCustomers.contact_1}
                            errorMessage={validateCustomers.contact_1 && "Il telefono del campo è obbligatorio!!"}

                        />
                        {dateCustomers.contact_1 ?
                            <div
                                className='cursor-pointer border-green-500 border-b-2 mx-2 text-green-500'
                                onClick={() => open(`https://wa.me/${dateCustomers.contact_1}`)}
                                target='_blank'
                            >
                                Vai su Whatsapp
                            </div>
                            :
                            <span className='border-green-500 border-b-2 mx-2 text-green-500 opacity-50'>
                                Vai su Whatsapp
                            </span>
                        }
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
                        {dateCustomers.contact_2 ?
                            <div
                                className='cursor-pointer border-green-500 border-b-2 mx-2 text-green-500'
                                onClick={() => open(`https://wa.me/${dateCustomers.contact_2}`)}
                                target='_blank'
                            >
                                Vai su Whatsapp
                            </div>
                            :
                            <span className='border-green-500 border-b-2 mx-2 text-green-500 opacity-50'>
                                Vai su Whatsapp
                            </span>
                        }
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
                        isInvalid={validateCustomers.email_1}
                        errorMessage={validateCustomers.email_1 && "Il email del campo è obbligatorio!!"}

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
            </>

            {/* List Elemets */}
            <ListElements
                idCustomer={dateCustomers.id}
                typeCustomers={props.type}
                listElements={listElements}
                isLoading={isLoading}
                handleElementsOptions={handleElementsOptions}
                handlePrintBillElement={handlePrintBillElement}
            />

            <div className='flex gap-2 justify-center'>
                {props.type != "view" && (
                    <Button
                        color="primary"
                        variant='ghost'
                        type='submit'
                        onClick={() => handleSubmit()}
                    >Salvar</Button>
                )}
                {props.handleCancel && (
                    <Button onClick={() => props.handleCancel()} color="danger" variant='ghost'>{props.type == "view" ? "Uscita" : "Annulla"}</Button>
                )}
            </div>
        </div>
    )
}