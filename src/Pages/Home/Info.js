import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg'
import phone from '../../assets/icons/phone.svg'
import marker from '../../assets/icons/marker.svg'

const Info = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
            <InfoCard bgClass='bg-gradient-to-r from-primary to-secondary' cardTitle="Opening Hours" img={clock}></InfoCard>
            <InfoCard bgClass='bg-accent' cardTitle="Visit our location" img={marker}></InfoCard>
            <InfoCard bgClass='bg-gradient-to-r from-primary to-secondary' cardTitle="Contact us now" img={phone}></InfoCard>
        </div>
    );
};

export default Info;