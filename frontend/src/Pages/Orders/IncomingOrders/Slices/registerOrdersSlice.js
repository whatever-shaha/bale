import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../../../Config/Api.js'
import {universalToast} from '../../../../Components/ToastMessages/ToastMessages.js'

export const createOrder = createAsyncThunk(
    'createOrder/createOrder',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/connections/registerorder', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const registerOrdersSlice = createSlice({
    name: 'registerOrders',
    initialState: {
        allProductsPartner: [],
        categoriesPartner: [],
        lastOrder: null,
        loading: false,
    },
    reducers: {
        setAllProductsPartner: (state, {payload}) => {
            state.allProductsPartner = [...payload]
        },
        setCategoriesPartner: (state, {payload}) => {
            state.categoriesPartner = [...payload]
        },
    },
    extraReducers: {
        [createOrder.pending]: (state) => {
            state.loading = true
        },
        [createOrder.fulfilled]: (state, {payload}) => {
            state.lastOrder = payload
            state.loading = false
        },
        [createOrder.rejected]: (state, {payload}) => {
            universalToast(payload, 'error')
            state.loading = false
        },
    },
})

export const {setAllProductsPartner, setCategoriesPartner} =
    registerOrdersSlice.actions
export default registerOrdersSlice.reducer
