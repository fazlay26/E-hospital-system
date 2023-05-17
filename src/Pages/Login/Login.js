import React from 'react';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [token] = useToken(user || gUser)
    let signInError;
    if (loading || gLoading) {
        return <button className="btn loading">loading</button>
    }
    //login korte  giye firebase er internal error khaile evabe dekhabo:
    if (gError || error) {
        signInError = <p>{gError?.message || error?.message}</p>
    }
    const onSubmit = data => {
        console.log(data)
        signInWithEmailAndPassword(data.email, data.password)
    };
    if (token) {
        navigate(from, { replace: true })
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <input className='btn btn-primary w-full max-w-xs text-white' value='Login' type="submit" />
                    </form>
                    <p>New to Doctors Portal?<Link className='text-primary' to='/signup'>Create An Account</Link></p>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-primary text-white">continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;