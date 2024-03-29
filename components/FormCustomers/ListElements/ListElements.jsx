"use client"
import { useCallback, useMemo, useState } from "react"
import FormElement from "./FormElement/FormElement"
import FormCategory from "@/components/FormCategory/FormCategory"
import useCategory from "@/hooks/getsHooks/useCategory"
import ModalComponent from "@/components/ui/ModalComponent"
import { EyeIcon } from "@/components/ui/svg/EyeIcon"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Divider, Button, Spinner } from "@nextui-org/react"
import { EditIcon } from "@/components/ui/svg/EditIcon"
import { DeleteIcon } from "@/components/ui/svg/DeleteIcon"
import { TRADUCTION_ITALY } from "@/lib/utils"
import { PlusIcon } from "@/components/ui/svg/PlusIcon"
import PrintIcon from "@/components/ui/svg/PrintIcon"
// import { elements } from "./mockup"

const statusColorMap = {
    IN_PROCESS: "warning",
    READY: "success",
    WAITING: "warning",
    HAS_NO_REPAIR: "danger",
}


const columns = [
    { name: "NOME", uid: "name" },
    { name: "CATEGORIA", uid: "Category" },
    { name: "STATO", uid: "state" },
    { name: "AZIONI", uid: "actions" },
]


export default function ListElements({ typeCustomers, listElements, isLoading, handleElementsOptions, idCustomer = -1, handlePrintBillElement }) {
    const { listCategories, updateCategory } = useCategory()
    const [isOpenComponentAddCategory, setIsOpenComponentAddCategory] = useState(false)
    const [isOpenComponentElements, setIsOpenComponentElements] = useState({
        value: false,
        data: { typeCustomers, listElements, isLoading },
        type: typeCustomers
    })
    const titleModalComponent = useMemo(() => {
        const { type } = isOpenComponentElements
        if (type == "view")
            return "Visualizza elemento"
        if (type == "create")
            return "Crea nuovo elemento"
        if (type == "edit")
            return "Modifica elemento"
        return ""
    }, [isOpenComponentElements.type])

    const hadleShowModalComponetElement = ({ element = {}, type }) =>
        setIsOpenComponentElements({
            data: element, value: true, type
        })

    const renderCell = useCallback((element, columnKey) => {
        const cellValue = element[columnKey]
        switch (columnKey) {
            case "Category":
                return cellValue?.name
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{element.team}</p>
                    </div>
                )
            case "state":
                return (
                    <Chip className="capitalize" color={statusColorMap[element.state]} size="sm" variant="flat">
                        {TRADUCTION_ITALY[cellValue]}
                        {/* {cellValue} */}
                    </Chip>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Dettagli">
                            {/* <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => setIsOpenComponentElements(prev => { return { ...prev, value: true } })}> */}
                            <button
                                className="text-lg text-default-800 cursor-pointer active:opacity-50 disabled:opacity-50" onClick={() => hadleShowModalComponetElement({ type: "view", element })}>
                                <EyeIcon />
                            </button>
                        </Tooltip>
                        <Tooltip content="Modifica elemento">
                            <button
                                disabled={isOpenComponentElements.type == "view"}
                                className="text-lg text-default-800 cursor-pointer active:opacity-50 disabled:opacity-50" onClick={() => hadleShowModalComponetElement({ type: "edit", element })}>
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip content="Stampa">
                            <button
                                disabled={isOpenComponentElements.type == "create"}
                                className="text-lg text-danger cursor-pointer active:opacity-50 disabled:opacity-50"
                                onClick={() => handlePrintBillElement(
                                    {
                                        id: element.id, name: element.name, value: element.value,
                                        state: element.state, createdAt: element.createdAt,
                                        delivery_description: element.delivery_description
                                    }
                                )}
                            >
                                <PrintIcon height={15} width={15} />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Elimina elemento">
                            <button
                                disabled={isOpenComponentElements.type == "view"}
                                className="text-lg text-danger cursor-pointer active:opacity-50 disabled:opacity-50"
                                onClick={() => handleElementsOptions({ id: element.id, uid: element.uid, type: "delete" })}
                            >
                                <DeleteIcon />
                            </button>
                        </Tooltip>
                    </div>
                )
            default:
                return cellValue
        }
    }, [])

    return (
        <>
            {/* Component of Elements */}
            <ModalComponent
                isDismissable={isOpenComponentElements.type == "view"}
                isOpen={isOpenComponentElements.value}
                onClose={() => setIsOpenComponentElements(prev => { return { ...prev, value: false, type: typeCustomers } })}
                title={titleModalComponent}
                size={"sm"}
            >
                <FormElement {...isOpenComponentElements.data}
                    type={isOpenComponentElements.type}
                    handleCancel={() => setIsOpenComponentElements(prev => { return { ...prev, value: false, type: typeCustomers } })}
                    listCategories={listCategories}
                    category={isOpenComponentElements?.data?.Category?.name}
                    handleElementsOptions={handleElementsOptions}
                    idCustomer={idCustomer}
                    id={isOpenComponentElements.data?.id}
                />
            </ModalComponent>
            {/* Create Category */}
            <ModalComponent
                isOpen={isOpenComponentAddCategory}
                onClose={() => setIsOpenComponentAddCategory(false)}
                title={"Aggiungi Categoria"}
                size={"sm"}
            >
                <FormCategory
                    handleCancel={() => { setIsOpenComponentAddCategory(false); updateCategory() }}
                    listCategories={listCategories}
                />
            </ModalComponent>
            <Divider className='mb-2' />
            <div className="flex justify-between items-center">
                <h3 className='text-md font-extrabold'>Elementi</h3>
                <div className="flex gap-2">
                    <Button
                        className="bg-foreground text-background"
                        endContent={<PlusIcon />}
                        size="sm"
                        isDisabled={isOpenComponentElements.type == "view"}
                        onClick={() => hadleShowModalComponetElement({ type: "create" })}
                    >
                        Aggiungi elemento
                    </Button>
                    <Button
                        className="bg-foreground text-background"
                        endContent={<PlusIcon />}
                        size="sm"
                        isDisabled={isOpenComponentElements.type == "view"}
                        onClick={() => setIsOpenComponentAddCategory(true)}
                    >
                        Aggiungi categoria
                    </Button>
                </div>
            </div>
            {isLoading ?
                <Spinner className="py-5" size="lg" label="Caricamento..." color="default" labelColor="foreground" />
                :
                listElements.length == 0 ?
                    <div className="text-center py-5">
                        Non ci sono elementi!! 😱
                    </div>
                    :
                    <Table
                        shadow="none" >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={listElements}>
                            {(item, index) => (
                                <TableRow key={index}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
            }
        </>
    )
}
