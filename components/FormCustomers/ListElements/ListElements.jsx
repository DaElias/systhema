"use client"
import { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, getKeyValue, Divider, Button } from "@nextui-org/react";
import ModalComponent from "@/components/ui/ModalComponent";
import FormElement from "./FormElement/FormElement";
import { EyeIcon } from "@/components/ui/svg/EyeIcon";
import { EditIcon } from "@/components/ui/svg/EditIcon";
import { DeleteIcon } from "@/components/ui/svg/DeleteIcon";
import { TRADUCTION_ITALY } from "@/lib/utils";
import { users } from "./mockup";
import { PlusIcon } from "@/components/ui/svg/PlusIcon";

const statusColorMap = {
    IN_PROCESS: "warning",
    READY: "success",
    WAITING: "warning",
    HAS_NO_REPAIR: "danger",
};


const columns = [
    { name: "NAME", uid: "name" },
    { name: "CATEGORY", uid: "category" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];


export default function ListElements(props) {
    const [isOpenComponent, setIsOpenComponent] = useState({ value: false, data: { ...props }, type: props.typeCustomers })
    const titleModalComponent = useMemo(() => {
        const { type } = isOpenComponent
        if (type == "view")
            return "View Element"
        if (type == "create")
            return "Create New Element"
        if (type == "edit")
            return "Edit Element"
        return ""
    }, [isOpenComponent.type])

    const hadleShowModalComponet = ({ element = {}, type }) =>
        setIsOpenComponent({
            data: element, value: true, type
        })


    const renderCell = useCallback((element, columnKey) => {
        const cellValue = element[columnKey];
        switch (columnKey) {
            // case "name":
            //     return (
            //         <element
            //             avatarProps={{ radius: "lg", src: element.avatar }}
            //             description={element.email}
            //             name={cellValue}
            //         >
            //             {element.email}
            //         </element>
            //     );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{element.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[element.status]} size="sm" variant="flat">
                        {TRADUCTION_ITALY[cellValue]}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            {/* <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => setIsOpenComponent(prev => { return { ...prev, value: true } })}> */}
                            <button
                                className="text-lg text-default-800 cursor-pointer active:opacity-50 disabled:opacity-50" onClick={() => hadleShowModalComponet({ type: "view", element })}>
                                <EyeIcon />
                            </button>
                        </Tooltip>
                        <Tooltip content="Edit element">
                            <button
                                disabled={isOpenComponent.type == "view"}
                                className="text-lg text-default-800 cursor-pointer active:opacity-50 disabled:opacity-50" onClick={() => hadleShowModalComponet({ type: "edit", element })}>
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete element">
                            <button
                                disabled={isOpenComponent.type == "view"}
                                className="text-lg text-danger cursor-pointer active:opacity-50 disabled:opacity-50">
                                <DeleteIcon />
                            </button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    return (
        <>
            <ModalComponent
                isDismissable={isOpenComponent.type == "view"}
                isOpen={isOpenComponent.value}
                onClose={() => setIsOpenComponent(prev => { return { ...prev, value: false } })}
                title={titleModalComponent}
                // size="md"
                size={"sm"}
            >
                <FormElement {...isOpenComponent.data}
                    type={isOpenComponent.type}
                    handleCancel={() => setIsOpenComponent(prev => { return { ...prev, value: false } })}
                />
            </ModalComponent>
            <Divider className='mb-2' />
            <div className="flex justify-between items-center">
                <h3 className='text-md font-extrabold'>List of Elements</h3>
                <Button
                    className="bg-foreground text-background"
                    endContent={<PlusIcon />}
                    size="sm"
                    isDisabled={isOpenComponent.type == "view"}
                    onClick={() => hadleShowModalComponet({ type: "create" })}
                >
                    Add New
                </Button>
            </div>
            <Table
                shadow="none" >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
