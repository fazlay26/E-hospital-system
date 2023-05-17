import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'

const MakeAppointment = () => {
    return (
        <section style={{ background: `url(${appointment})` }} className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-130px]' src={doctor} alt="" />
            </div>
            <div className='flex-1'>
                <h1 className='text-primary my-4'>Appointment</h1>
                <h2 className='text-4xl my-4 text-white'>Make an appointment Today</h2>
                <h3 className='my-4 text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</h3>
                <button className="btn btn-primary text-white font-bold uppercase bg-gradient-to-r from-primary to-secondary">Get Started</button>

            </div>
        </section>
    );
};

export default MakeAppointment;