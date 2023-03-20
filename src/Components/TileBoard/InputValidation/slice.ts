import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { type FormState } from './types'

const initialState: FormState = {
    errors: {},
    values: {},
    touched: {},
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        resetState(state) {
            state.errors = { ...initialState.errors }
            state.values = { ...initialState.values }
            state.touched = { ...initialState.touched }
        },
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

        setError(
            state,
            action: PayloadAction<{
                fieldName: string
                error: string | undefined
            }>,
        ) {
            state.errors[action.payload.fieldName] = action.payload.error
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

export const {
    resetState,
    setValues,
    setFieldValue,
    setError,
    setErrors,
    setTouched,
} = formSlice.actions
export default formSlice.reducer
