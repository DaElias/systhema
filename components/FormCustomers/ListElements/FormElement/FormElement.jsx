"use client"
import useForm from "@/hooks/useForm";
import { Button, Divider, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import { TRADUCTION_ITALY, covertArrayToHas } from "@/lib/utils";
import { useMemo, useState } from "react";


const INIT_VALIDATE = { name: false, description: false, category: false, category: false }

export default function FormElement(props) {
    const [element, handleChange, resetForm] = useForm(
        {
            name: props.name, description: props.description,
            state: props.state, Category: props?.Category?.name,
            delivery_description: props.delivery_description
        }
    )
    const [validate, setValidate] = useState(INIT_VALIDATE)
    const hasCategory = useMemo(() => covertArrayToHas({ key: "name", array: props.listCategories }), [])

    console.log(element)
    console.log(hasCategory[element.Category]?.id)
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

        if (props.type == "create") {
            const newElement = {
                ...element,
                id: -1,
                customer_id: -1,
                category_id: hasCategory[element.Category].id,
                state: !element.state ? "IN_PROCESS" : element.state,
                Category: { name: element.Category }
            }
            props.handleCreateElement(newElement)
        }

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
            <Select
                label="Categoria"
                className="w-full"
                name='Category'
                // defaultSelectedKeys={[hasCategory[element.Category]?.id]}
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
                label="state"
                className="w-full"
                name='state'
                defaultSelectedKeys={[element.state]}
                isDisabled={props.type == "view"}
                onChange={handleChange}
            >
                {
                    // props.type != "view" &&
                    ["READY", "IN_PROCESS", "WAITING", "HAS_NO_REPAIR"].map((item) => (
                        <SelectItem key={item} value={item}>
                            {TRADUCTION_ITALY[item]}
                        </SelectItem>
                    ))
                }
            </Select>

            <div className='flex gap-2 justify-center'>
                {props.type != "view" && (
                    <Button color="primary" variant='ghost' onClick={() => handleSubmit()} >Salvar</Button>
                )}
                {props.handleCancel && (
                    <Button onClick={() => props.handleCancel()} color="danger" variant='ghost'>{props.type == "view" ? "Exit" : "Cancel"}</Button>
                )}
            </div>
        </div>
    )
}