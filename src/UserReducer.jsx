// UserReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
        addUser(state, action) {
            state.push(action.payload);
        }
    }
});

export const { setUsers, addUser } = userSlice.actions;
export default userSlice.reducer;
