// src/components/UserTable.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Button } from "@mui/material";
import { deleteUser } from './UserReducer';

import Create from './Create';

const UserTable = () => {
    const btnstyle = { margin: '8px 0' };
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    console.log(users)

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleDelete = (id) => {
        dispatch(
            deleteUser({
                id:id
            })
        )
    }
    return (
        <div className="container">
            <h2>User Table</h2>
            <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ mb: 2 }}>
                Add User
            </Button>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ?(users.map((user) => (
                        <tr key={user.id} >
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.city}</td>
                             <td>{user.state}</td>
                            <td>{user.country}</td> 
                            <td>
                                <Link to={`/edit/${user.id}`} >
                                    <Button>+</Button>
                                </Link>
                                <Button onClick={()=>handleDelete(user.id)}> 
                                    -
                                </Button>
                            </td>
                        </tr>
                     ))):(
                        <tr>
                            <td colSpan="6">No Users Avaiable</td>
                        </tr>
                     )} 
                </tbody>
            </table>
            <Create open={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default UserTable;
