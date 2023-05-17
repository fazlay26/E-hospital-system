import React from 'react';
import appoinment from '../../assets/images/appointment.png'

const Contact = () => {
    return (

        <div className='py-5' style={{ background: `url(${appoinment})` }}>
            <div className='text-center'>
                <h1 className='text-primary'>Contact Us</h1>
                <h2 className='text-4xl text-white'>Stay connected with us</h2>
            </div>
            <form className="w-full max-w-lg mx-auto my-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                            E-mail
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" />
                    </div>
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                            Subject
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                            Message
                        </label>
                        <textarea className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>

                    </div>
                </div>
                <div className='flex justify-center '>
                    <button className="btn btn-primary text-white font-bold uppercase bg-gradient-to-r from-primary to-secondary ">submit</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;