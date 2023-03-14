import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { type FormState } from './FormContext'

const initialState: FormState = {
    errors: {},
    values: {},
    touched: {},
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setValues(state, action: PayloadAction<Record<string, string>>) {
            state.values = {
                ...state.values,
                ...action.payload,
            }
        },

        setFieldValue(
            state,
            action: PayloadAction<{ fieldName: string; value: string }>,
        ) {
            state.values[action.payload.fieldName] = action.payload.value
        },

        setErrors(
            state,
            action: PayloadAction<Record<string, string | undefined>>,
        ) {
            state.errors = {
                ...state.errors,
                ...action.payload,
            }
        },

        setTouched(state, action: PayloadAction<Record<string, boolean>>) {
            state.touched = {
                ...state.touched,
                ...action.payload,
            }
        },
    },
})

export const { setValues, setFieldValue, setErrors, setTouched } =
    formSlice.actions
export default formSlice.reducer
