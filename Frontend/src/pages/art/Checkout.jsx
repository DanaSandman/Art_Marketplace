import React from 'react';
import { useLocation } from "react-router-dom";
import { TextField } from '@material-ui/core';
import { CheckoutModal } from '../../cmps/art/CheckoutModal.jsx';


export function Checkout () {

      const initialBuyer = {
            firstName: '',
            lastName: '',
            company: '',
            address: '',
            apartment: '',
            postalCode: null,
            city: '',
            country: '',
            phoneNumber: null,
        }

 const [ buyer, setBuyer ] = React.useState(initialBuyer)

        const location = useLocation();
        const {onCheckOut} = location.state;

 const handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        setBuyer(
            (prevState) => {
                return {
                    buyer: {
                        ...prevState.buyer,
                        [field]: value,
                    },
                };
            },
        );
    }

 const {
            firstName,
            lastName,
            company,
            address,
            apartment,
            postalCode,
            city,
            country,
            phoneNumber,
        } = buyer;

        return (
            <div className="check-out-container">
                <div className="check-out-title">
                <h1>Contact information</h1>               
                <form>
                    <TextField
                        required
                        value={firstName}
                        name='firstName'
                        label='First name'
                        variant='outlined'
                        onChange={handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={lastName}
                        name='lastName'
                        label='Last name'
                        variant='outlined'
                        onChange={handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={company}
                        name='company'
                        label='Company (optional)'
                        variant='outlined'
                        onChange={handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={address}
                        name='address'
                        label='Address'
                        variant='outlined'
                        onChange={handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={apartment}
                        name='apartment'
                        label='Apartment'
                        variant='outlined'
                        onChange={handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={postalCode}
                        name='postalCode'
                        label='Postal Code'
                        variant='outlined'
                        onChange={handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={city}
                        name='city'
                        label='City'
                        variant='outlined'
                        onChange={handleChange}
                    >
                    </TextField>

                    <TextField
                        required
                        value={country}
                        name='country'
                        label='Country'
                        variant='outlined'
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        value={country}
                        name='country'
                        label='Country'
                        variant='outlined'
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        value={phoneNumber}
                        name='phoneNumber'
                        label='Phone number'
                        variant='outlined'
                        onChange={handleChange}
                    />
                    <CheckoutModal  onCheckOut={onCheckOut} variant='outlined' type='submit'/>
                </form >
                </div>
            </div>
        );
    }
