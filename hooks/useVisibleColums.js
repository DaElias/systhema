import { useEffect, useState } from "react";
import { serviceGetVisibleColumns, serviceUpdateVisibleColumns } from "@/service/apiService";

const INITIAL_VISIBLE_COLUMNS = [
    // "fiscale_code",
    "name",
    "last_name",
    "address",
    "zip_code",
    "city",
    // "provice",
    "contact_1",
    // "contact_2",
    "email_1",
    // "email_2",
    "actions"
    ,]

export default function useVisibleColumns() {
    const [visibleColumns, setVisibleColumns] = useState(new Set([]));

    useEffect(() => {
        const getData = async () => {
            const response = await serviceGetVisibleColumns()
            if (response != []){
                setVisibleColumns(response)
            }else{
                setVisibleColumns(INITIAL_VISIBLE_COLUMNS)
            }
                
        }
        getData()
    }, [])

    useEffect(() => {
        serviceUpdateVisibleColumns(visibleColumns)
    }, [visibleColumns])

    return [visibleColumns, setVisibleColumns]
}