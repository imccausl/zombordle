import { createContext, useContext } from 'react'

import type {
    FormFunctions,
    FormState,
    FormStateActions,
    SharedFormProviderProps,
} from '../types'

export type ContextProps = FormState &
    FormStateActions &
    FormFunctions &
    SharedFormProviderProps

const FormContext = createContext<ContextProps | null>(null)
FormContext.displayName = 'FormContext'

export const useFormContext = () => {
    const form = useContext(FormContext)

    if (!form) {
        throw new Error(
            'useFormContext can only be used in elements that are children of a FormProvider',
        )
    }

    return form
}

export default FormContext
