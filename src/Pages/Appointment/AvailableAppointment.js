import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointment = ({ date }) => {
    //const [services, setServices] = useState([])
    const [treatment, setTreatment] = useState(null)
    const formattedDate = format(date, 'PP')
    const { isLoading, error, data: services, refetch } = useQuery(['available', formattedDate], () =>
        fetch(`http://localhost:5000/available?date=${formattedDate}`).then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return <button className="btn loading">loading</button>
    }
    // useEffect(() => {
    //     fetch(`http://localhost:5000/available?date=${formattedDate}`)
    //         .then(res => res.json())
    //         .then(data => setServices(data))
    // }, [formattedDate])
    return (
        <div className='my-16'>
            <h1 className='text-secondary text-center'>Available Appointments on {format(date || new Date(), 'PP')}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service => <Service key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></Service>)
                }
            </div>
            {treatment && <BookingModal refetch={refetch} date={date} setTreatment={setTreatment} treatment={treatment}></BookingModal>}
        </div>
    );
};

export default AvailableAppointment;