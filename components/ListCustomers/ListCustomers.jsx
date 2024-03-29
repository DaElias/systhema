"use client"
import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, Pagination, Divider,
} from "@nextui-org/react";
import { PlusIcon } from "../ui/svg/PlusIcon";
import { VerticalDotsIcon } from "../ui/svg/VerticalDotsIcon";
import { SearchIcon } from "../ui/svg/SearchIcon";
import { ChevronDownIcon } from "../ui/svg/ChevronDownIcon";
// import {columns, constumers, statusOptions} from "./mockup";
import { capitalize } from "@/lib/utils";
import ModalComponent from "../ui/ModalComponent";
import FormCustomers from "../FormCustomers/FormCustomers";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import LOGO from "/public/logo.png"
import { signOut } from "next-auth/react";
import { serviceDeleteCustomer } from "@/service/apiService";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


const columns = [
  { name: "Code Fiscale", uid: "fiscale_code" },
  { name: "Nome", uid: "name", sortable: true },
  { name: "Cognome", uid: "last_name" },
  { name: "Indirizzo", uid: "address" },
  { name: "C.A.P.", uid: "zip_code", sortable: true },
  { name: "Cittá", uid: "city", sortable: true },
  { name: "Provice", uid: "provice", sortable: true },
  { name: "Telefono (1)", uid: "contact_1" },
  { name: "Telefono (2)", uid: "contact_2" },
  { name: "Email (1)", uid: "email_1" },
  { name: "Email (2)", uid: "email_2" },
  { name: "AZIONI", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];


const INITIAL_VISIBLE_COLUMNS = [
  // "fiscale_code",
  "name",
  "last_name",
  "address",
  // "zip_code",
  // "city",
  // "provice",
  "contact_1",
  // "contact_2",
  "email_1",
  // "email_2",
  "actions"
  ,]


const INITIAL_ROWS_PER_PAGE = 10
const INITIAL_STATE_IS_OPEN = { value: false, data: {}, type: "view" }
export default function ListCustomers() {
  // get Data
  const [data = [], isLoading, error, update] = useFetch("/api/customers")
  const constumers = useMemo(() => !data?.length ? [] : data, [data])
  // Modal
  const [isOpenComponent, setIsOpenComponent] = useState(INITIAL_STATE_IS_OPEN)
  // Table
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil(constumers.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])


  const filteredItems = useMemo(() => {
    let filteredconstumers = [...constumers];

    if (hasSearchFilter) {
      filteredconstumers = filteredconstumers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredconstumers = filteredconstumers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredconstumers;
  }, [constumers, filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const hadleShowModalComponet = ({ dataUser = {}, type }) =>
    setIsOpenComponent({
      data: dataUser, value: true, type
    })

  const handleDeleteCustomers = async (id) => {
    const response = await serviceDeleteCustomer(id)
    if (response.status == 200)
      update()
  }

  const titleModalComponent = useMemo(() => {
    const { type } = isOpenComponent
    if (type == "view")
      return "Visualizza cliente"
    if (type == "create")
      return "Creare Cliente"
    if (type == "edit")
      return "Modifica Cliente"
    return ""
  }, [isOpenComponent.type])

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      // case "name":
      //   return (
      //     <User
      //       avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
      //       classNames={{
      //         description: "text-default-500",
      //       }}
      //       description={user.email}
      //       name={cellValue}
      //     >
      //       {user.email}
      //     </User>
      //   );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => hadleShowModalComponet({ dataUser: user, type: "view" })} >
                  visualizzazione
                </DropdownItem>
                <DropdownItem onClick={() => hadleShowModalComponet({ dataUser: user, type: "edit" })}>
                  Modificare
                </DropdownItem>
                <DropdownItem onClick={() => handleDeleteCustomers(user.id)}>
                  Eliminare
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Image src={LOGO} alt="logo" />
          <Button onClick={signOut} className="mb-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">Logout</Button>
        </div>
        <Divider className='' />
        {/* <h1>Form Customers</h1> */}

        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 sm:h-12",
            }}
            placeholder="Cerca per nome del cliente..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Colonne
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
              onClick={() => hadleShowModalComponet({ type: "create" })}
            >
              Creare Clienti
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {constumers.length} clienti</span>
          <label className="flex items-center text-default-400 text-small">
            Righe per pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="5">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    constumers.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "Tutti gli elementi selezionati"
            : `${selectedKeys.size} di ${items.length} Selezionati`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
      base: "px-2"
    }),
    [],
  );



  return (
    <>
      <ModalComponent
        isOpen={isOpenComponent.value}
        onClose={() => setIsOpenComponent(INITIAL_STATE_IS_OPEN)}
        title={titleModalComponent}
      >
        <FormCustomers
          {...isOpenComponent.data}
          handleCancel={() => setIsOpenComponent(INITIAL_STATE_IS_OPEN)}
          type={isOpenComponent.type}
          handleUpdate={() => update()}
        />
      </ModalComponent>
      <Table
        isCompact
        removeWrapper
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background ",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No constumers found"} items={sortedItems}
          isLoading={isLoading}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
