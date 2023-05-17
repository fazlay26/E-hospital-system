import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import ExtraSection from './ExtraSection';
import Footer from './Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Testimonial from './Testimonial';


const Home = () => {
    return (
        <div>
            <div className='px-12 w-full'>
                <Banner></Banner>
                <Info></Info>
                <Services></Services>
                <ExtraSection></ExtraSection>
                <MakeAppointment></MakeAppointment>
                <Testimonial></Testimonial>
                <Contact></Contact>
                <Footer></Footer>
            </div>






        </div>
    );
};

export default Home;