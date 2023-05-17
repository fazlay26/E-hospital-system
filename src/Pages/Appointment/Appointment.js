import React, { useState } from 'react';
import Footer from '../Home/Footer';
import AppointmentBanner from './AppointmentBanner';
import AvailableAppointment from './AvailableAppointment';

const Appointment = () => {
    const [date, setDate] = useState(new Date()) //date ta shb jaigao props hishebe use korar  jonne ekhane use koresi
    return (
        <div className='mx-12'>
            <AppointmentBanner date={date} setDate={setDate}></AppointmentBanner>
            <AvailableAppointment date={date}></AvailableAppointment>
            <Footer></Footer>

        </div>
    );
};

export default Appointment;