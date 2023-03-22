import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { type FormState } from '../types'

const initialState: FormState = {
    errors: {},
    values: {},
    touched: {},
    isFormValid: false,
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

        setIsFormValid(state, action) {
            state.isFormValid = action.payload
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
    setErrors,
    setTouched,
    setIsFormValid,
} = formSlice.actions
export default formSlice.reducer
