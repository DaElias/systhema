"use client"
import { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, getKeyValue, Divider, Button } from "@nextui-org/react";
import ModalComponent from "@/components/ui/ModalComponent";
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
    const [isOpenComponent, setIsOpenComponent] = useState({ value: false, data: { ...props }, type: "view" })

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


    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            // case "name":
            //     return (
            //         <User
            //             avatarProps={{ radius: "lg", src: user.avatar }}
            //             description={user.email}
            //             name={cellValue}
            //         >
            //             {user.email}
            //         </User>
            //     );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {TRADUCTION_ITALY[cellValue]}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            {/* <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => setIsOpenComponent(prev => { return { ...prev, value: true } })}> */}
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => hadleShowModalComponet({ type: "view" })}>
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => hadleShowModalComponet({ type: "edit" })}>
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
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
                size="md"
            >
            </ModalComponent>
            <Divider className='mb-2' />
            <div className="flex justify-between items-center">
                <h3 className='text-md font-extrabold'>List of Elements</h3>
                <Button
                    className="bg-foreground text-background"
                    endContent={<PlusIcon />}
                    size="sm"
                    onClick={() => hadleShowModalComponet({ type: "create" })}
                >
                    Add New
                </Button>
            </div>
            <Table >
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
