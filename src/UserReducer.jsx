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
        },
        deleteUser(state,action) {
            const {id} = action.payload;
            const uu = state.find((user)=>user.id==id)
            if(uu){
                return state.filter((f)=>f.id !== id)
            }
        }
    }
});

export const { setUsers, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
