import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';


const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    //usequery diye service name backend e  je api banaisi sheta diye data load koretsi:
    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    const imageStorageKey = 'ae89e3e94b9cd2f4f06e2df7f02de56c';//imgbb theke  ei api key ta enechi

    /**
     * 3 ways to store images
     * 1. Third party storage //Free open public storage is ok for Practice project 
     * 2. Your own storage in your own server (file system)
     * 3. Database: Mongodb 
     * 
     * YUP: to validate file: Search: Yup file validation for react hook form
    */
    const onSubmit = async data => {

        const image = data.image[0];
        const formData = new FormData();//img or file pathate hobe formData hishebe
        formData.append('image', image);
        //image ta imgbb te pathabo ei url call kore post method er moddhe diye
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData //img pathaite hole body er moddhe formData pathaite hobe
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url; //ei img ta ami amr backend e pathabo
                    const doctor = {
                        name: data.name, //name er value ta nicchi form er register theke
                        email: data.email,
                        specialty: data.specialty,
                        img: img
                    }
                    // send to your database 
                    fetch('http://localhost:5000/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Doctor added successfully')
                                reset(); //eta useForm thekei ashe.form submit deyar por  form ta  reset hoye jabe
                            }
                            else {
                                toast.error('Failed to add the doctor');
                            }
                        })

                }

            })
    }

    if (isLoading) {
        return <button className="btn loading">loading</button>
    }

    return (
        <div>
            <h2 className="text-2xl">Add a New Doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    {/* select er vitor eta {...register('specialty')} dite hobe */}
                    <select {...register('specialty')} class="select input-bordered w-full max-w-xs">
                        {/* useQuery diye je data load korechi sheta dekhabo option er moddhe */}
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            >{service.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        type="file" //photo er jonne input feild er type hobe file
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <input className='btn w-full max-w-xs text-white' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddDoctor;