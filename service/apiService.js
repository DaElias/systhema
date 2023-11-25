import { Store } from "tauri-plugin-store-api";
import { generateUid } from "@/lib/utils";
import { KEY_DOCUMENT_STOREGE, KEY_DOCUMENT_STOREGE_API_CATEGORES, KEY_DOCUMENT_STOREGE_API_CUSTOMERS, KEY_DOCUMENT_STOREGE_API_ELEMENTS } from '@/util/const';



async function sendRequest(url, options) {
    const response = await fetch(url, options);
    return await response.json();
}

function createRequestoptions(method, body) {
    return {
        'method': method,
        'headers': {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
}


// * Elements

export async function serviceGetElementByIdCustomers(id) {
    const store = new Store(KEY_DOCUMENT_STOREGE)
    const listElements = await store.get(KEY_DOCUMENT_STOREGE_API_ELEMENTS) || []
    return listElements.filter(element => {
        if (element.customer_id == id) {
            return element
        }
        return null
    })
}


export async function serviceEditElement(newElement) {
    const options = createRequestoptions('PUT', newElement);
    return await sendRequest(`/api/elements`, options)
}
export async function serviceCreateElement(newElement) {
    const options = createRequestoptions('POST', newElement);
    return await sendRequest(`/api/elements`, options)
}
export async function serviceDeleteElement(id) {
    const options = createRequestoptions('DELETE', { id });
    return await sendRequest(`/api/elements`, options)
}

// * Customers
export async function serviceCreateCustomers({ newCostumers, newLisElements = [] }) {
    try {
        const store = new Store(KEY_DOCUMENT_STOREGE)

        const list_custumers = await store.get(KEY_DOCUMENT_STOREGE_API_CUSTOMERS)

        const idCustomer = generateUid()
        list_custumers.push({ ...newCostumers, id: idCustomer })
        await store.set(KEY_DOCUMENT_STOREGE_API_CUSTOMERS, list_custumers)
        await store.save()

        const newListElements = newLisElements.map((element) => {
            element.id = generateUid()
            element.customer_id = idCustomer
        })

        let listELements = await store.get(KEY_DOCUMENT_STOREGE_API_ELEMENTS) || []
        listELements = [...listELements, ...newListElements]
        await store.set(KEY_DOCUMENT_STOREGE_API_ELEMENTS, listELements)
        await store.save()


        return { status: 201 }
    } catch (error) {
        console.log(error)
    }
}
export async function serviceEditCustomer(customer) {
    const options = createRequestoptions('PUT', customer);
    return await sendRequest(`/api/customers`, options)
}
export async function serviceDeleteCustomer(id) {
    const options = createRequestoptions('DELETE', { id });
    return await sendRequest(`/api/customers`, options)
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

// * Users
export async function serviceCreateUser(newUser) {
    const options = createRequestoptions('POST', newUser);
    return await sendRequest(`/api/user`, options)
}
