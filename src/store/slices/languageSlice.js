import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
    name: 'language',
    initialState: {
        selectedLanguage: 'English',
        showLanguages: false
    },
    reducers: {
        setLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
        },
        setShowLanguage: (state, action) => {
            state.showLanguages = action.payload;
        },
    }
})

export const { setLanguage, setShowLanguage } = languageSlice.actions;
export const { selectedLanguage } = languageSlice.getInitialState()
export const languageReducer = languageSlice.reducer;