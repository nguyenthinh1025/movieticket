import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { DangnhapAction } from '../../redux/action/QuanLyNguoiDungAction';

const Login = () => {

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: ""
        },
        onSubmit: (value) => {
            console.log(value);
            const action = DangnhapAction(value);
            dispatch(action)
        }
    })
    return (
        <div>
            <div className="lg:flex">
                <div className="lg:w-1/2 xl:max-w-screen-sm">
                    <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                        <div className="cursor-pointer flex items-center">
                            <div>
                                <img src='./images/logo.png' className='w-10' />
                            </div>
                            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">CGFilm</div>
                        </div>
                    </div>
                    <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                        <div className='font-bold'>
                            <p>User Name : user567</p>
                            <p>Password: 1234</p>
                        </div>
                        <div className='font-bold'>
                            <p>User Name : user789</p>
                            <p>Password: 1234</p>
                        </div>
                        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Log in</h2>
                        <div className="mt-12">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Username : </div>
                                    <input onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="Enter your Username" name='taiKhoan' />
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Password :
                                        </div>
                                        <div>
                                            <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer">
                                                Forgot Password?
                                            </a>
                                        </div>
                                    </div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name='matKhau' placeholder="Enter your password" onChange={formik.handleChange} />
                                </div>
                                <div className="mt-10">
                                    <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg" >
                                        Log In
                                    </button>
                                </div>
                            </form>
                            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                                Don't have an account ? <NavLink to='/register' className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center  flex-1 h-screen" style={{ backgroundImage: 'url(https://images.moviesanywhere.com/4677177f6f0595289bc3e767e7b47459/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center' }}>

                    <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                        <div className='w-5/6 mx-auto'>
                            <img style={{ opacity: '1!important' }} src='https://images.moviesanywhere.com/4677177f6f0595289bc3e767e7b47459/1d6c6c73-ab1e-4453-969c-6a4e965ebb37.jpg' />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Login