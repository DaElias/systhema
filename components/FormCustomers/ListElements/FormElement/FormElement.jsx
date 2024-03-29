"use client"
import useForm from "@/hooks/useForm";
import { Button, Divider, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import { TRADUCTION_ITALY, covertArrayToHas } from "@/lib/utils";
import { useMemo, useState } from "react";


const INIT_VALIDATE = { name: false, description: false, category: false, category: false }

export default function FormElement(props) {
    const [element, handleChange] = useForm(
        {
            id: props.id, uid: props.uid,
            customer_id: props.idCustomer, category_id: props.category_id,
            name: props.name, description: props.description,
            state: props.state, Category: props?.Category?.name,
            delivery_description: props.delivery_description, value: props.value
        }
    )
    const [validate, setValidate] = useState(INIT_VALIDATE)
    const hasCategory = useMemo(() => covertArrayToHas({ key: "name", array: props.listCategories }), [])

    const handleSubmit = () => {
        // validate date felds
        const validateName = typeof element.name == "undefined" || element.name == ""
        const validateDescription = typeof element.description == "undefined" || element.description == ""
        const validateCategory = typeof element.Category == "undefined" || element.Category == ""

        if (validateName) {
            setValidate(prev => { return { ...prev, name: true } })
        } else {
            setValidate(prev => { return { ...prev, name: false } })
        }
        if (validateDescription) {
            setValidate(prev => { return { ...prev, description: true } })
        } else {
            setValidate(prev => { return { ...prev, description: false } })
        }
        if (validateCategory) {
            setValidate(prev => { return { ...prev, category: true } })
        } else {
            setValidate(prev => { return { ...prev, category: false } })
        }

        if (validateName || validateDescription || validateCategory)
            return

        // if (props.type == "create") {
        const newElement = {
            // ...element,
            name: element.name,
            description: element.description,
            delivery_description: element.delivery_description,
            id: !element.id ? -1 : element.id,
            customer_id: !element.customer_id ? -1 : element.customer_id,
            category_id: hasCategory[element.Category].id,
            state: !element.state ? "IN_PROCESS" : element.state,
            Category: { name: element.Category },
            uid: element.uid ? element.uid : Date.now(),
            type: props.type,
            value: !element.value ? 0 : element.value
        }
        props.handleElementsOptions(newElement)
        props.handleCancel()
    }

    return (
        <div className="flex flex-col gap-3">
            <Divider className='mb-2' />
            <Input
                label="Nome"
                labelPlacement="outside"
                isInvalid={validate.name}
                errorMessage={validate.name && "Il nome del campo è obbligatorio!!"}
                value={element.name}
                name='name'
                onChange={handleChange}
                isDisabled={props.type == "view"}

            />
            <Textarea
                name="description"
                label="Descrizione"
                labelPlacement="outside"
                className="w-full max-w-3xl"
                value={element.description}
                onChange={handleChange}
                isDisabled={props.type == "view"}
                isInvalid={validate.description}
                errorMessage={validate.description && "Il descrizione del campo è obbligatorio!!"}
            />
            <Textarea
                name="delivery_description"
                label="Descrizione Consegna"
                labelPlacement="outside"
                className="w-full max-w-3xl"
                value={element.delivery_description}
                onChange={handleChange}
                isDisabled={props.type == "view"}
            />
            <Input
                label="Preventivo Costi"
                labelPlacement="outside-left"
                className="w-full px-2"
                value={element.value}
                name='value'
                onChange={handleChange}
                isDisabled={props.type == "view"}
                type="number"
            />
            <Select
                label="Categoria"
                className="w-full"
                name='Category'
                defaultSelectedKeys={[element.Category]}
                isDisabled={props.type == "view"}
                onChange={handleChange}
                isInvalid={validate.category}
                errorMessage={validate.category && "Il categoria del campo è obbligatorio!!"}
            >
                {
                    props.listCategories.map((item) => (
                        <SelectItem key={item.name} value={item.id}>
                            {item.name}
                        </SelectItem>
                    ))
                }
            </Select>
            <Select
                label="stato"
                className="w-full"
                name='state'
                defaultSelectedKeys={[element.state]}
                isDisabled={props.type == "view"}
                onChange={handleChange}
            >
                {
                    ["READY", "IN_PROCESS", "WAITING", "HAS_NO_REPAIR"].map((item) => (
                        <SelectItem key={item} value={item}>
                            {TRADUCTION_ITALY[item]}
                        </SelectItem>
                    ))
                }
            </Select>

            <div className='flex gap-2 justify-center'>
                {props.type != "view" && (
                    <Button color="primary" variant='ghost' onClick={() => handleSubmit()} >Mantenere</Button>
                )}
                {props.handleCancel && (
                    <Button onClick={() => props.handleCancel()} color="danger" variant='ghost'>Esci</Button>
                )}
            </div>
        </div>
    )
}