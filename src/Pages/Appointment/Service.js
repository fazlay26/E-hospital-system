import React from 'react';

const Service = ({ service, setTreatment }) => {
    const { name, slots, price } = service
    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl text-center">
            <div class="card-body ">
                <div className='flex justify-center'><h2 class="card-title text-secondary text-center">{name}</h2></div>
                {/* javascript e 0 false and 1 true */}
                <p>{
                    slots.length ? <span>{slots[0]}</span> : <span className='text-red-500'>try another day</span>
                }</p>
                {/* 1 tar beshi slots thakle spaces hobe ar 1 ta othoba 1 tar kom thakle space hobe */}
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p>price<small>${price}</small></p>
                <div class="card-actions justify-center">
                    {/* <button  class="btn btn-secondary text-white">Book Appointment</button> */}
                    <label onClick={() => setTreatment(service)} disabled={slots.length === 0} for="booking-modal" class="btn btn-secondary text-white">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default Service;