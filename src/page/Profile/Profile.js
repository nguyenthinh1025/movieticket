import _ from 'lodash'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LichSuDatVeAction } from '../../redux/action/QuanLyNguoiDungAction'

export default function Profile () {
    const dispatch = useDispatch()
    const { thongTinNguoiDung, login } = useSelector(root => root.QuanLyNguoiDungReducer)
    console.log(thongTinNguoiDung);
    useEffect(() => {

        const action = LichSuDatVeAction();
        dispatch(action)

    }, []);
    return (
        <div className="mb-10">
            <nav className="border-b px-4 py-2 bg-white">
                <div className="flex flex-wrap items-center justify-between md:justify-around">
                    {/* logo */}
                    <img className="h-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/150px-Instagram_logo.svg.png" alt="instagram" />
                    {/* search*/}
                    <div className="relative hidden sm:block text-gray-500">
                        <input className="search-bar max-w-xs border rounded bg-gray-200 px-4
      text-center outline-none focus:border-gray-400" type="search" placeholder="Search" />
                        <i className="fa fa-search absolute top-0 left-0 ml-12 mt-1" />
                    </div>
                    <div className="space-x-4">
                        <a className="inline-block bg-blue-500 px-2 py-1 text-white font-semibold 
                     text-sm rounded" href="#">Log In</a>
                        <a className="inline-block text-blue-500 font-semibold text-sm" href="#">Sign Up</a>
                    </div>
                </div>
            </nav>
            <main className="bg-gray-100 bg-opacity-25">
                <div className="lg:w-8/12 lg:mx-auto mb-8">
                    <header className="flex flex-wrap items-center p-4 md:py-8">
                        <div className="md:w-3/12 md:ml-16">
                            {/* profile image */}
                            <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
               border-2 border-pink-600 p-1" src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" alt="profile" />
                        </div>
                        {/* profile meta */}
                        <div className="w-8/12 md:w-7/12 ml-4">
                            <div className="md:flex md:flex-wrap md:items-center mb-4">
                                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                                    {localStorage.getItem('taiKhoan')}
                                </h2>
                                {/* badge */}
                                <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                         relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                                    <i className="fas fa-check text-white text-xs absolute inset-x-0
                         ml-1 mt-px" />
                                </span>
                                {/* follow button */}
                                <a href="#" className="bg-blue-500 px-2 py-1 
                  text-white font-semibold text-sm rounded block text-center 
                  sm:inline-block block">Follow</a>
                            </div>
                            {/* post, following, followers list for medium screens */}

                            {/* user meta form medium screens */}
                            <div className="hidden md:block">
                                <h1 className=""><span className='font-semibold'>Email : </span> {login?.email}</h1>

                            </div>
                        </div>
                        {/* user meta form small screens */}
                        <div className="hidden md:block text-sm my-2 ml-10">
                            <h1 className="text-2xl"><span className='font-semibold text-lg'>FullName : </span> {(login?.hoTen)}</h1>
                        </div>
                    </header>
                    {/* posts */}
                    <div className="px-px md:px-3">
                        {/* user following for mobile only */}

                        <ul className="flex items-center justify-around md:justify-center space-x-12  mb-10 
              uppercase tracking-widest font-semibold text-xs text-gray-600
              border-t">
                            {/* posts tab is active */}
                            <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">

                            </li>
                            <li>
                                <a className="inline-block p-3" href="#">
                                    <i className="far fa-square text-xl md:text-xs" />
                                    <span className="hidden md:inline mb-10">History Book Ticket</span>

                                </a>
                            </li>
                            <li>

                            </li>
                        </ul>
                        {/* flexbox grid */}
                        <div className="flex flex-wrap gap-5">
                            {thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
                                return <div className="" key={index}>
                                    <a className="block relative h-48 rounded overflow-hidden">
                                        <img className="object-cover object-center w-full h-full block" src={item.hinhAnh} />
                                    </a>
                                    <div className="mt-4">
                                        <h2 className="text-gray-900 title-font text-center text-2xl font-medium">{item.tenPhim}</h2>
                                        <p className="mt-1"> <span className='font-bold'>Ngày Chiếu : </span> {moment(item.ngayDat).format('hh:mm A - DD/MM/YYYY')}</p>
                                        <p> <span className='font-bold'>Địa Điểm : </span>  {_.first(item.danhSachGhe).tenHeThongRap}</p>
                                        <div className='grid grid-cols-2 my-5'>
                                            <div>
                                                <span className='text-red-500'>Ghế : {item.danhSachGhe?.map((item, index) => { return <span key={index} >{item.tenGhe} , </span> })}</span>
                                            </div>
                                            <div className='text-right'>

                                            </div>
                                        </div>
                                        {/* <p className='flex'><span className='font-bold pr-4 '>Ghế : </span>{item.danhSachGhe?.map((item, index) => { return <div key={index} >{item.tenGhe} , </div> })} </p> */}
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}
