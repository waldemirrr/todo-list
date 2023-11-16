import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IFilter {
    [key: string]: boolean
}

const initialState: IFilter = { common: true, rare: true, epic: true }

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAll: (state) => {
            return state = initialState
        },
        filterSpecific: (state, action: PayloadAction<string>) => {
            const keys = Object.keys(initialState);
            return state = Object.fromEntries(keys.map((key) => {
                if (key === action.payload) return [key, true];
                return [key, false]
            }));
        }
    }
})

export const { filterAll, filterSpecific } = filterSlice.actions
export default filterSlice.reducer