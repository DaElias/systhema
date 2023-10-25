"use client"
import useForm from "@/hooks/useForm";
import { TRADUCTION_ITALY } from "@/lib/utils";
import { Divider, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Input } from '@nextui-org/react';




export default function FormElement(props) {
    const [element, handleChange, resetForm] = useForm({ name: props.name, description: props.description, status: props.status })


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
            {/* <Select
                label="Category"
                className="max-w-xs"
                name='category'
                // defaultSelectedKeys={[dateCustomers.category]}
                isDisabled={props.type == "view"}
            >
                {
                    // props.type != "view" &&
                    HAS_PROVINCE.map((item) => (
                        <SelectItem key={item} value={item}>
                            {item}
                        </SelectItem>
                    ))
                }
            </Select> */}
            <Select
                label="Status"
                className="w-full"
                name='status'
                defaultSelectedKeys={[element.status]}
                isDisabled={props.type == "view"}
                onChange={handleChange}
                variant={statusColorMap[element.status]}
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
        </div>
    )
}