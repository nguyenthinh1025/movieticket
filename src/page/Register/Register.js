import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import { DangKyAction, DangnhapAction } from '../../redux/action/QuanLyNguoiDungAction';
import * as Yup from "yup";
const Register = () => {

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: '',
            soDt: '',
            maNhom: "GP00",
            hoTen: '',
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string()
                .min(4, "user Name 2 characters")
                .required("Required!"),
            matKhau: Yup.string()
                .min(4, "Password 2 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            soDt: Yup.number()

                .required("Required!"),
            hoTen: Yup.string()
                .min(5, "Password 5 characters")
                .required("Required!"),
        }),
        onSubmit: (value) => {
            console.log(value);
            const action = DangKyAction(value);
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
                    <div className=" px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 xl:max-w-2xl">
                        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Register</h2>
                        <div className="mt-12">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Username : </div>
                                    <input onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="Enter your Username" name='taiKhoan' />
                                    <p className='text-red-500'>{formik.errors.taiKhoan}</p>
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Password :
                                        </div>

                                    </div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name='matKhau' placeholder="Enter your Password" onChange={formik.handleChange} />
                                    <p className='text-red-500'>{formik.errors.matKhau}</p>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Email : </div>
                                    <input onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="abc@gmail.com" name='email' />
                                    <p className='text-red-500'>{formik.errors.email}</p>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Phone Number : </div>
                                    <input onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="Enter your Phone Number" name='soDt' />
                                    <p className='text-red-500'>{formik.errors.soDt}</p>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Full Name : </div>
                                    <input onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="Enter your Full Name" name='hoTen' />
                                    <p className='text-red-500'>{formik.errors.hoTen}</p>
                                </div>
                                <div className="mt-10">
                                    <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg" >
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                                Have an account ? <NavLink to='/login' className="cursor-pointer text-indigo-600 hover:text-indigo-800">Login</NavLink>
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

export default Register