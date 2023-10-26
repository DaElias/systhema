"use client"
import useForm from "@/hooks/useForm";
import { Button, Divider, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import { TRADUCTION_ITALY } from "@/lib/utils";




export default function FormElement(props) {
    const [element, handleChange, resetForm] = useForm(
        {
            name: props.name, description: props.description,
            state: props.state, category: props?.Category?.name
        }
    )

    console.log(props)

    return (
        <div className="flex flex-col gap-3">
            <Divider className='mb-2' />
            <Input
                label="Nome"
                labelPlacement="outside"
                placeholder="..."
                // isInvalid={true}
                // errorMessage="Please enter a valid email"
                value={element.name}
                name='name'
                onChange={handleChange}
                isDisabled={props.type == "view"}

            />
            <Textarea
                name="description"
                label="Description"
                labelPlacement="outside"
                className="w-full max-w-3xl"
                value={element.description}
                onChange={handleChange}
                isDisabled={props.type == "view"}
            />
            <Select
                label="Category"
                className="w-full"
                name='category'
                defaultSelectedKeys={[element.category]}
                isDisabled={props.type == "view"}
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
                    <Button color="primary" variant='ghost' type='submit' >Salvar</Button>
                )}
                {props.handleCancel && (
                    <Button onClick={() => props.handleCancel()} color="danger" variant='ghost'>{props.type == "view" ? "Exit" : "Cancel"}</Button>
                )}
            </div>
        </div>
    )
}