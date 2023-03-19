import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App';
import { LayDanhSachPhimAction } from '../../../../redux/action/QuanLyPhimAction';

const Header = (props) => {
    const { login } = useSelector(root => root.QuanLyNguoiDungReducer);
    console.log(login);
    const dispatch = useDispatch()
    useEffect(() => {

    },);
    return (
        <header className='fixed w-full z-10'>
            <nav className="bg-gray-600 pt-5 pb-5 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-300  text-amber-600">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl" style={{ cursor: 'pointer' }}>
                    <div onClick={() => {
                        history.push('/')
                    }} className="flex items-center">
                        <img src="./../images/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CGFilm</span>
                    </div>
                    <div className="flex items-center lg:order-2">
                        {localStorage.getItem('taiKhoan') === "nouser" ? <NavLink to='/login' className="text-white dark:text-white hover:bg-gray-50 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</NavLink>
                            :
                            <div className='flex content-center justify-center'>
                                <NavLink to='/profile' className='mt-2'>Hello ! {localStorage.getItem('taiKhoan')}</NavLink>
                                <button className='text-white dark:text-white hover:bg-gray-50 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800' onClick={async () => {
                                    const action = {
                                        type: "LOGOUT",

                                    }
                                    await dispatch(action)
                                    history.push('/')
                                }}>Logout </button>


                            </div>}

                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to='/home' className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent  lg:p-0 dark:text-white" activeClassName='text-amber-500' aria-current="page">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact' className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" activeClassName='text-amber-500' >Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to='/news' className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" activeClassName='text-amber-500' >News</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>


    )
}

export default Header