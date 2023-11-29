import { Store } from "tauri-plugin-store-api";
import { generateUid } from "@/lib/utils";
import { KEY_DOCUMENT_STOREGE, KEY_DOCUMENT_STOREGE_API_CATEGORES, KEY_DOCUMENT_STOREGE_API_CUSTOMERS, KEY_DOCUMENT_STOREGE_API_VISIBLE_COLUMNS } from '@/util/const';


// * Elements

export async function serviceGetElementByIdCustomers(id) {
    const store = new Store(KEY_DOCUMENT_STOREGE)
    return await store.get(id) || []
}


export async function serviceEditElement(newElement) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        const idCustomer = newElement.customer_id
        const listElements = await store.get(idCustomer) || []
        const newListElements = listElements.map((element) => {
            if (element.id == newElement.id)
                return newElement
            return element
        })
        await store.set(idCustomer, newListElements)
        await store.save()
        return { status: 200 }
    } catch (error) {
        return { status: 400, message: error.toString() }
    }
}
export async function serviceCreateElement(newElement) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        const idCustomer = newElement.customer_id
        const listElements = await store.get(idCustomer) || []
        listElements.push({ ...newElement, id: generateUid() })
        await store.set(idCustomer, listElements)
        await store.save()
        return { status: 201 }
    } catch (error) {
        return { status: 400, message: error.toString() }
    }
}
export async function serviceDeleteElement({ idElement, idCustomers }) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        const listElements = await store.get(idCustomers) || []
        const newListElements = listElements.filter(
            (element) => {
                if (element.id != idElement) {
                    return element
                }
                return null
            }
        )
        await store.set(idCustomers, newListElements)
        await store.save()
        return { status: 200 }
    } catch (error) {
        return { status: 400, message: error.toString() }
    }
}

// * Customers
export async function serviceCreateCustomers({ newCostumers, newLisElements }) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        const list_custumers = await store.get(KEY_DOCUMENT_STOREGE_API_CUSTOMERS)
        const idCustomer = generateUid()
        list_custumers.push({ ...newCostumers, id: idCustomer })
        await store.set(KEY_DOCUMENT_STOREGE_API_CUSTOMERS, list_custumers)
        await store.save()
        const newListElementsToSave = newLisElements.map((element) => {
            element.id = generateUid()
            element.customer_id = idCustomer
            return element
        })
        await store.set(idCustomer, newListElementsToSave)
        await store.save()
        return { status: 201 }
    } catch (error) {
        console.log(error)
        return { status: 400, message: error.toString() }
    }
}
export async function serviceEditCustomer(customer) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        const listCustomers = await store.get(KEY_DOCUMENT_STOREGE_API_CUSTOMERS) || []
        const newListCustomers = listCustomers.map((oldCustomer) => {
            if (customer.id == oldCustomer.id) {
                return customer
            }
            return oldCustomer
        })
        await store.set(KEY_DOCUMENT_STOREGE_API_CUSTOMERS, newListCustomers)
        await store.save()
        return { status: 200 }
    } catch (error) {
        return { status: 400, message: error.toString() }
    }
}
export async function serviceDeleteCustomer(id) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        const listCustomers = await store.get(KEY_DOCUMENT_STOREGE_API_CUSTOMERS) || []
        const newListCustomers = listCustomers.filter(
            (customer) => {
                if (customer.id != id) {
                    return customer
                }
                return null
            }
        )
        await store.delete(id)
        await store.set(KEY_DOCUMENT_STOREGE_API_CUSTOMERS, newListCustomers)
        await store.save()
        return { status: 200 }
    } catch (error) {
        console.log(error)
        return { status: 400, message: error.toString() }
    }
}

//  * Category
export async function serviceCreateCategory({ name, description }) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        const listCategores = await store.get(KEY_DOCUMENT_STOREGE_API_CATEGORES)
        // * validate if exist 
        for (let i = 0; i < listCategores.length; i++) {
            if (name == listCategores.name)
                throw new Error("this category is really exsit!!")
        }
        listCategores.push({ id: generateUid(), name, description })
        await store.set(KEY_DOCUMENT_STOREGE_API_CATEGORES, listCategores)
        await store.save()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


export async function serviceUpdateVisibleColumns(listColums = []) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        await store.set(KEY_DOCUMENT_STOREGE_API_VISIBLE_COLUMNS, listColums)
        await store.save()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
export async function serviceGetVisibleColumns() {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)
        return await store.get(KEY_DOCUMENT_STOREGE_API_VISIBLE_COLUMNS) || []
    } catch (error) {
        console.log(error)
        return []
    }
}

// * Users
// export async function serviceCreateUser(newUser) {
// }
