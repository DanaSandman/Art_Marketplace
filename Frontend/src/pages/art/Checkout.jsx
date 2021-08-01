import React from 'react';
import { TextField, Button } from '@material-ui/core';


export class Checkout extends React.Component {
    state = {
        buyer: {
            firstName: '',
            lastName: '',
            company: '',
            address: '',
            apartment: '',
            postalCode: null,
            city: '',
            country: '',
            phoneNumber: null,
        },
    };

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState(
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

    render() {
        const { buyer } = this.state;
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
                </div>
                
                <form>
                    <TextField
                        required
                        value={firstName}
                        name='firstName'
                        label='First name'
                        variant='outlined'
                        onChange={this.handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={lastName}
                        name='lastName'
                        label='Last name'
                        variant='outlined'
                        onChange={this.handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={company}
                        name='company'
                        label='Company (optional)'
                        variant='outlined'
                        onChange={this.handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={address}
                        name='address'
                        label='Address'
                        variant='outlined'
                        onChange={this.handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={apartment}
                        name='apartment'
                        label='Apartment'
                        variant='outlined'
                        onChange={this.handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={postalCode}
                        name='postalCode'
                        label='Postal Code'
                        variant='outlined'
                        onChange={this.handleChange}
                    >
                    </TextField>
                    <TextField
                        required
                        value={city}
                        name='city'
                        label='City'
                        variant='outlined'
                        onChange={this.handleChange}
                    >
                    </TextField>

                    <TextField
                        required
                        value={country}
                        name='country'
                        label='Country'
                        variant='outlined'
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        value={country}
                        name='country'
                        label='Country'
                        variant='outlined'
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        value={phoneNumber}
                        name='phoneNumber'
                        label='Phone number'
                        variant='outlined'
                        onChange={this.handleChange}
                    />
                    <Button variant='outlined' type='submit'>
                        Continue to shipping
                </Button>
                </form >
            </div>
        );
    }
}