import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ appointment }) => { //appointment ta payment page theke eshece
    const stripe = useStripe(); //eta ekta hook
    const elements = useElements(); //cardElement  er moddhe je info guli dicchi shey info guli ney useElements 
    const [cardError, setCardError] = useState(''); //payment  korte giye kono error paile  shetar jonne ekta state declare korlam
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState(''); //paymentIntent  er jonne state declare

    const { _id, price, patient, patientEmail } = appointment;

    useEffect(() => {
        //paymentIntent  er client side:
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }) //object hishebe price ta  pathai disi
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        // jodi stripe ar elements na pai thole return kore dibe
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);//elements theke cardElement diye data guli nicche.payment er shomoy amr card number,date,zip eshb data nicche

        // card re kono data na paile ami samne  agabo na
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        }); //kivabe payment korbe shey method  ta nicchi

        setCardError(error?.message || '') //payment korte giye kono error paile  sheta state e set kore diyechi
        setSuccess('');
        setProcessing(true);
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: { //eshob info guli stripe  er  kache jabe
                        email: patientEmail,
                        name: patient
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent); //jokhon bill deya succes hoy tokohn paymentIntent er moddhe  besh kichu info pabo
            setSuccess('Congrats! Your payment is completed.')

            //store payment on database
            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id
            }
            fetch(`http://localhost:5000/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            }).then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                })

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* CardElement ta react stripe theke ashbe */}
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || success}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;