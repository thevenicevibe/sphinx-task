// src/components/UserTable.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Link, Button } from "@mui/material";
import Create from './Create';

const UserTable = () => {
    const users = useSelector((state) => state.users);
    console.log(users)
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

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
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            {/* <td>{user.city}</td> */}
                            <td>{user.state}</td>
                            <td>{user.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Create open={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default UserTable;
