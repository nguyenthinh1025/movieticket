import moment from 'moment/moment';
import React from 'react'
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
export default function Film (props) {
    const { arrPhim } = props;
    return (
        <div className="p-4 lg:w-1/3">
            <div className="wrapper">
                <div className="card front-face">
                    <img src={arrPhim.hinhAnh} />
                </div>
                <div className="card back-face">
                    <img src={arrPhim.hinhAnh} />
                    <div className="info">
                        <div className="title">
                            {arrPhim.tenPhim}
                        </div>
                        <p>
                            {(arrPhim.moTa).slice(0, 100)}<span className='font-bold'>...Xem thêm</span>
                        </p>
                        <p className='mt-3 font-bold text-orange-400 text-sm'>
                            Ngày Khởi Chiếu :  {moment(arrPhim.ngayKhoiChieu).format('YYYY/MM/DD')}
                        </p>

                    </div>
                    <ul>
                        <NavLink to={`/detail/${arrPhim.maPhim}`} >Đặt Vé</NavLink>
                    </ul>
                </div>
            </div>

        </div>
    )
}
