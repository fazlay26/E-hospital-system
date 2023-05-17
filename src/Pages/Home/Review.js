import React from 'react';

const Review = ({ review }) => {
    return (

        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{review.description}</h2>
            </div>
            <div className='flex items-center pl-10 mb-5'>
                <div className="avatar">
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 mr-10">
                        <img src={review.img} alt='' />
                    </div>
                </div>
                <div>
                    <h1>{review.name}</h1>
                    <h4>{review.location}</h4>
                </div>
            </div>
        </div>

    );
};

export default Review;