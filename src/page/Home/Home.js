import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Film from '../../component/Film/Film';
import { LayDanhSachPhimAction } from '../../redux/action/QuanLyPhimAction';
import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";

import HomeMenu from './HomeMenu/HomeMenu'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';

const Home = () => {

    const dispatch = useDispatch()
    const { arrPhim, dangChieu, sapChieu } = useSelector(root => root.QuanLyPhimReducer);
    useEffect(() => {
        const action = LayDanhSachPhimAction();
        dispatch(action)


    }, []);


    console.log(arrPhim);

    let activeFilm = dangChieu === true ? 'active_Film' : "none_active_Film";
    let activeFilmSC = sapChieu === true ? 'active_Film' : "none_active_Film"

    const [perPage, setPerPage] = useState(6);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(arrPhim.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return arrPhim.slice((current - 1) * pageSize, current * pageSize);
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>;
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>;
        }
        return originalElement;
    }
    return (
        <div>
            <HomeCarousel />
            <div className='pl-2 bg-slate-200'>

                <section className="text-gray-600 body-font">
                    <div className="container px-12 py-24 mx-auto">
                        <div className='flex mb-10'>
                            <button className={`hover:bg-gray-800 bg-orange-200 text-black hover:text-white px-8 py-3 font-semibold rounded mr-2 `} onClick={() => {
                                const action = {
                                    type: "SET_PHIM_SAP_CHIEU",
                                }
                                dispatch(action)

                            }}>Phim Sắp Chiếu</button>
                            <button className='hover:bg-gray-800 bg-orange-200 text-black hover:text-white px-8 py-3 font-semibold rounded mr-2 ' onClick={() => {
                                const action = {
                                    type: "SET_PHIM_DANG_CHIEU",
                                }
                                dispatch(action)

                            }}>Phim Đang Chiếu</button>
                        </div>
                        <div className="flex flex-wrap -m-4 ml-10">

                            {/*    <div className="col-md-10">
                                    <div className="card">
                                        <div className="card-body p-0"> */}




                            {getData(current, size).map((item, index) => {
                                return <Film key={index} arrPhim={item} />
                            })}


                        </div>
                    </div>

                    {/*  </div>
                    </div>
                </div> */}
                </section >

                <Pagination

                    className="pagination-data"
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                    onChange={PaginationChange}
                    total={arrPhim.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                />

                <HomeMenu />
            </div >
        </div>
    )
}

export default Home