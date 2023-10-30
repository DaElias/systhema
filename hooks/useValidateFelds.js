import { useState } from "react"

export default function useValidateFelds(initialState, dateForm) {
   const [validate, setValidate] = useState(initialState)

   const handleValidations = (key = "") => {
      const validateKey = typeof dateForm[key] == "undefined" || dateForm[key] == ""
      if (validateKey) {
         setValidate(prev => { return { ...prev, [key]: true } }) // error
      } else {
         setValidate(prev => { return { ...prev, [key]: false } })
      }
      return validateKey
   }
   return [validate, handleValidations]
}