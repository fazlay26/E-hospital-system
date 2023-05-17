
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L0hc6DdE5bh3gXfgz3zoZxYxVGOMUTYwQRaoErBkVHRhp4QPU12pUXbc14Y3EEmSONx9J0uog63dVXmfVyyd8L7004J8NduaQ');




const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/booking/${id}`;

    //['booking', id] =ekadik jinish er upor depend korle evabe araay er moddhe dite hoy
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <button className="btn loading">loading</button>
    }

    return (
        <div>
            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div class="card-body">
                    <p className="text-success font-bold">Hello, {appointment.patient}</p>
                    <h2 class="card-title">Please Pay for: {appointment.treatment}</h2>
                    <p>Your Appointment: <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
                    <p>Please pay: ${appointment.price}</p>
                </div>
            </div>
            {/* eatr moddhe payment er jinishpati thakbe */}
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    {/* Elements react stripe theke import korsi */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;