
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

// export async function servicefindOrdersByUserId(idUser) {
//     return await sendRequest(`/api/orders?id_user=${idUser}`)
// }
// export async function serviceDeleteProduct({ user_id = "", product_id = "" }) {
//     const options = createRequestoptions('DELETE');
//     return await sendRequest(`/api/product?user_id=${user_id}&product_id=${product_id}`, options)
// }

export async function serviceCreateElement(newElement) {
    const options = createRequestoptions('POST', newElement);
    return await sendRequest(`/api/elements`, options)
}

export async function serviceCreateCustomers(newCustomers) {
    const options = createRequestoptions('POST', newCustomers);
    return await sendRequest(`/api/customers`, options)
}


export async function serviceCreateCategory(newCategory) {
    const options = createRequestoptions('POST', newCategory);
    return await sendRequest(`/api/categories`, options)
}