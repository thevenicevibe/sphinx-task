    import React, { useState, useEffect } from 'react';
    import { useDispatch } from 'react-redux';
    import { setUsers } from './UserReducer';
    import { Button, TextField, Typography, IconButton, Slide, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
    import CloseIcon from '@mui/icons-material/Close';

    const Create = ({ open, onClose }) => {
        const dispatch = useDispatch();
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [mobile, setMobile] = useState('');
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [country, setCountry] = useState('');
        const [countries, setCountries] = useState([]);
        const [states, setStates] = useState([]);
        const [error, setError] = useState('');

        useEffect(() => {
            fetch('https://vinoapi.winayak.com/api/core/countries?keyword')
              .then(response => response.json())
              .then(data => {
                  console.log('Fetched countries:', data); // Log the fetched countries
                  setCountries(data.list || []); // Set countries list or default to empty array
              })
              .catch(error => {
                  console.error('Error fetching countries:', error);
              });
        }, []);
        
        const handleCountryChange = (event) => {
            const selectedCountry = event.target.value;
            setCountry(selectedCountry);
        
            fetch(`https://vinoapi.winayak.com/api/core/states?country_id=${selectedCountry}`)
              .then(response => response.json())
              .then(data => {
                  console.log('Fetched states:', data); // Log the fetched states
                  setStates(response.data.list.id || []); // Set states list or default to empty array
              })
              .catch(error => {
                  console.error('Error fetching states:', error);
              });
        };
        
        
        const handleAddUser = () => {
            if (!name || !email || !mobile || !city || !state || !country) {
                setError('All fields are required.');
                return;
            }

            const newUser = { id: Date.now(), name, email, mobile, city, state, country };
            
            // Dispatch action to add user
            // dispatch(setUsers(prevUsers => [...prevUsers, newUser]));
            dispatch(addUser(newUser));

            // Clear form
            setName('');
            setEmail('');
            setMobile('');
            setCity('');
            setState('');
            setCountry('');
            setError('');
            onClose();
        };

        return (
            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        width: 300,
                        height: '100vh',
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        backgroundColor: 'white',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        padding: 2,
                        overflowY: 'auto',
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" gutterBottom>
                        Add User
                    </Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Mobile No."
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    {/* <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    /> */}
                    <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Select
            value={country}
            onChange={handleCountryChange}
            label="Country"
        >
            {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}> {/* Ensure `country.code` is unique */}
                    {country.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>

    <FormControl fullWidth margin="normal">
        <InputLabel>State</InputLabel>
        <Select
            value={state}
            onChange={(e) => setState(e.target.value)}
            label="State"
        >
            {states.map((state) => (
                <MenuItem key={state.code} value={state.code}> {/* Ensure `state.code` is unique */}
                    {state.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
                    {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAddUser}
                        sx={{ mt: 2 }}
                    >
                        Add User
                    </Button>
                </Box>
            </Slide>
        );
    };

    export default Create;
