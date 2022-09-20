import {createSlice} from '@reduxjs/toolkit'

const registerOrdersSlice = createSlice({
    name: 'registerOrders',
    initialState: {
        allProductsPartner: [],
        categoriesPartner: [],
    },
    reducers: {
        setAllProductsPartner: (state, {payload}) => {
            state.allProductsPartner = [...payload]
        },
        setCategoriesPartner: (state, {payload}) => {
            state.categoriesPartner = [...payload]
        },
    },
    extraReducers: {},
})

export const {setAllProductsPartner, setCategoriesPartner} =
    registerOrdersSlice.actions
export default registerOrdersSlice.reducer
