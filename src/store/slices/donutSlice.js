import { createSlice } from '@reduxjs/toolkit';
import { languages } from "../../languages";
import { selectedLanguage } from './languageSlice'


export const staticDonutList = [
    {
        id: 1,
        img: '/images/3.PNG',
        name: 'Vanilla Whisk',
        description: languages[selectedLanguage].description1,
        price: '$2.49',
        flavor: ['vanilla'],
        styles: { name: 'text-[#fcfff3]', highlight1: 'text-[#fff4bd]' }
    },
    {
        id: 2,
        img: '/images/10.PNG',
        name: 'Berry Melt',
        description: languages[selectedLanguage].description2,
        price: '$3.29',
        flavor: ['strawberry'],
        styles: { name: 'text-[#FB6090]', highlight1: 'text-[#94c973]', highlight2: 'text-[#fbe698]', highlight3: 'text-[#fa26a0]', highlight4: 'text-[#2ff3e0]' }
    },
    {
        id: 3,
        img: '/images/1.PNG',
        name: 'Caramel Dream',
        description: languages[selectedLanguage].description3,
        price: '$3.29',
        flavor: ['caramel'],
        styles: { name: 'text-orange-100', highlight1: 'text-yellow-600' }
    },
    {
        id: 4,
        img: '/images/2.PNG',
        name: 'Chocolate Wish',
        description: languages[selectedLanguage].description4,
        price: '$2.99',
        flavor: ['chocolate'],
        styles: { name: 'text-[#a47551]', highlight1: 'text-[#e4d4c8]' }
    },
    {
        id: 5,
        img: '/images/4.PNG',
        name: 'Berry Bliss',
        description: languages[selectedLanguage].description5,
        price: '$2.99',
        flavor: ['strawberry'],
        styles: { name: 'text-pink-300', highlight1: 'text-[#75e6da]' }
    },
    {
        id: 6,
        img: '/images/6.PNG',
        name: 'Choco Swirl',
        description: languages[selectedLanguage].description6,
        price: '$3.19',
        flavor: ['chocolate', 'vanilla'],
        styles: { name: 'text-[#935f4c]', highlight1: 'text-[#fffae5]' }
    },
    {
        id: 7,
        img: '/images/5.PNG',
        name: 'Berry Chocolate',
        description: languages[selectedLanguage].description7,
        price: '$3.49',
        flavor: ['strawberry', 'chocolate'],
        styles: { name: 'text-pink-300', highlight1: 'text-[#56382d]' }
    },
    {
        id: 8,
        img: '/images/8.PNG',
        name: 'Chocolate Delux',
        description: languages[selectedLanguage].description8,
        price: '$3.19',
        flavor: ['chocolate'],
        styles: { name: 'text-[#b49a87]', highlight1: 'text-[#d6ad60]' }
    },
    {
        id: 9,
        img: '/images/7.PNG',
        name: 'Vanilla Cloud',
        description: languages[selectedLanguage].description9,
        price: '$2.79',
        flavor: ['vanilla'],
        styles: { name: 'text-[#ebeae5]', highlight1: 'text-[#a1dbf1]' }
    },
    {
        id: 10,
        img: '/images/9.PNG',
        name: 'Double Chocolate',
        description: languages[selectedLanguage].description10,
        price: '$3.49',
        flavor: ['chocolate'],
        styles: { name: 'text-[#988686]', highlight1: 'text-[#5c4e4e]' }
    }
];

const donutSlice = createSlice({
    name: 'donut',
    initialState: {
        activeSlide: 0,
        flavors: [],
        donutList: staticDonutList,
        userDonutList: []
    },
    reducers: {
        changeActiveSlide: (state, action) => {
            state.activeSlide = action.payload;
        },
        setFlavors: (state, action) => {
            state.flavors = action.payload;
            state.activeSlide = 0;
        },
        setDonutList: (state, action) => {
            state.donutList = action.payload;
        },
        setUserDonutList: (state, action) => {
            console.log(action.payload)
            state.userDonutList = [...state.userDonutList, ...action.payload]
        },
        removeDonut: (state, action) => {
            state.userDonutList.splice(action.payload, 1)
        },
        editDonutCount: (state, action) => {
            const { donut: donutAction, count: countAction } = action.payload
            const modifiedList = state.userDonutList.map((donut) => {
                if (donut.description === donutAction.description) {
                    console.log("Iste krofne")
                    return {...donut, count: countAction}
                }
                return donut;
            })
            console.log(modifiedList)
            state.userDonutList = modifiedList;
        }
    }
})

export const { changeActiveSlide, setFlavors, setDonutList, setUserDonutList, removeDonut, editDonutCount } = donutSlice.actions;
export const donutReducer = donutSlice.reducer;