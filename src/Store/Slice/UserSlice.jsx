import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        post: []
    },
    reducers: {
        getUser(state, action) {
            state.user = action.payload
        },
        postUser(state, action) {
            // let post = JSON.parse(JSON.stringify(state.post));
            let post = state.post
            post = [...action.payload]
            state.post = [...post]
            console.log('first',state.post)
        },
        getComment(state, action) {
            // const state1 = JSON.parse(JSON.stringify(state.post));
            let state1 = state.post
            // console.log(state1)
            let index = state1?.findIndex(x => x.id == action.payload[1]);
            state1[index].comments = action.payload[0] || [];
            state.post = [...state1]
        },
        editcomm(state, action) {
            // const state2 = JSON.parse(JSON.stringify(state.post));
            let state2 = state.post
            let index2 = state2?.findIndex(x => x.id == action.payload[1]);
            let i = state2[index2].comments?.findIndex(x => x.id == action.payload[0].id)
            state2[index2].comments[i] = action.payload[0];
            state.post = [...state2]
        },
        delecomm(state, action) {
            // const state3 = JSON.parse(JSON.stringify(state.post));
            let state3  = state.post
            let index3 = state3?.findIndex(x => x.id == action.payload[1]);
            let del = state3[index3].comments.filter(({ id }) => id !== action.payload[2]);
            state3[index3].comments = del
            state.post = [...state3]
        }
    },
})
console.log(userSlice.actions)

export const { getUser, postUser, getComment, delecomm, editcomm } = userSlice.actions