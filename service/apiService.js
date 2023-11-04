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
export async function serviceCreateCustomers(newCustomers) {
    const options = createRequestoptions('POST', newCustomers);
    return await sendRequest(`/api/customers`, options)
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
export async function serviceCreateCategory(newCategory) {
    const options = createRequestoptions('POST', newCategory);
    return await sendRequest(`/api/categories`, options)
}

// * Users
export async function serviceCreateUser(newUser) {
    const options = createRequestoptions('POST', newUser);
    return await sendRequest(`/api/user`, options)
}
