import React from 'react';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const navigate = useNavigate()
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [token] = useToken(user || gUser)//user google diye ashuk or email diye signup koruk ,tai 2 takei parameter hishebe hooks e pathai disi
    let signInError;
    if (loading || gLoading || updating) {
        return <button className="btn loading">loading</button>
    }
    if (gError || error || updateError) {
        signInError = <p>{gError?.message || error?.message}</p>
    }
    const onSubmit = async data => {
        console.log(data)
        await createUserWithEmailAndPassword(data.email, data.password)
        //new user jokhon create hobe tokhon displayName null thakbe .displayName ta update korar jonne amader useUpdate hook ta dorker
        await updateProfile({ displayName: data.name }); //updateProfile =react firebase hook theke niye ashbo

        navigate('/appoinment')
        window.location.reload()
    };
    if (token) {
        console.log(gUser);
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">SignUp</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'name is Required'

                                    },

                                })}
                                type="name" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'

                                    },
                                    pattern: {
                                        value: /[A-Za-z]{3}/,
                                        message: 'Provide a valid Email' // JS only: <p>error message</p> TS only support string
                                    }
                                })}
                                type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="text-red-500">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'password is Required'

                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or Longer' // JS only: <p>error message</p> TS only support string
                                    }
                                })}
                                type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <p className='text-red-500'> {signInError}</p>
                        <input className='btn btn-primary w-full max-w-xs text-white' value='Signup' type="submit" />
                    </form>
                    <p>Already Have An Account?<Link className='text-primary' to='/login'>Please Login</Link></p>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-primary text-white">continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;