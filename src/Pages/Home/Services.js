import React from 'react';
import flouride from '../../assets/images/fluoride.png'
import cavity from '../../assets/images/cavity.png'
import whitening from '../../assets/images/whitening.png'
import Service from './Service';

const Services = () => {
    const services = [
        {
            _id: 1,
            name: 'Fluoride Treatment',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: flouride
        },
        {
            _id: 2,
            name: 'Cavity Filling',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: cavity
        },
        {
            _id: 3,
            name: 'Teeth Whitening',
            description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img: whitening
        }
    ]
    return (
        <div className='my-28'>
            <div className='text-center'>
                <h1 className='text-xl font-bold text-primary'>OUR SERVICES</h1>
                <h1 className='text-4xl'>Services We Provide</h1>
            </div>
            <div className='my-10 grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-8'>
                {
                    services.map(service => <Service key={service._id}
                        service={service}
                    ></Service>)
                }
            </div>

        </div>
    );
};

export default Services;