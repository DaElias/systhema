export const {
    NEXTAUTH_SECRET,
    NODE_ENV
} = process.env

export const SESSION_UNAUTHENTICATED = "unauthenticated"
export const SESSION_LOADING = "loading"
export const SESSION_AUTHENTICATED = "authenticated"

export const EMAILREGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const PHONEREGEX = /^\(\d{3}\) \d{3}-\d{4}$/
export const KEY_DOCUMENT_STOREGE = ".settings.dat"
export const KEY_DOCUMENT_STOREGE_API_CATEGORES = "api-category"
export const KEY_DOCUMENT_STOREGE_API_CUSTOMERS = "api-customers"
export const KEY_DOCUMENT_STOREGE_API_ELEMENTS = "api-elements"
