import React, { Fragment, useEffect } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, DatVeAction, LayChiTietPhongVe } from '../../redux/action/QuanLyDatVeAction'
import './Checkout.css'
import style from './Checkout.module.css'
import _ from 'lodash'
import { CloseOutlined } from '@ant-design/icons'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import TabPane from 'antd/es/tabs/TabPane';
import { LichSuDatVeAction } from '../../redux/action/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../../index';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';
function CheckOut (props) {
    const dispatch = useDispatch()
    const { id } = props.match.params;
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(root => root.QuanLyDatVeReducer);
    const { login } = useSelector(root => root.QuanLyNguoiDungReducer)
    console.log(chiTietPhongVe);
    useEffect(() => {
        const action = LayChiTietPhongVe(id)
        dispatch(action)

        connection.on('loadDanhSachGheDaDat', (dsGheDangDatReturn) => {
            console.log('ds', dsGheDangDatReturn);

            dsGheDangDatReturn = dsGheDangDatReturn.filter(item => item.taiKhoan !== login.taiKhoan)

            let arrGheKhachDat = dsGheDangDatReturn.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);
                return [...result, ...arrGhe]
            }, [])
            arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe')
            console.log(arrGheKhachDat);
            dispatch({
                type: 'DAT_GHE',
                arrGheKhachDat,
            })
        })
    }, []);


    const { danhSachGhe, thongTinPhim } = chiTietPhongVe;
    console.log(danhSachGhe);
    const renderSeats = () => {
        return danhSachGhe?.map((item, index) => {
            let classGheVip = item.loaiGhe === "Vip" ? "gheVip" : "";
            let classGheDaDat = item.daDat === true ? 'gheDaDat' : '';
            let gheDangDat = "";
            let GheDD = danhSachGheDangDat.findIndex(gDD => gDD.maGhe === item.maGhe);
            if (GheDD != -1) {
                gheDangDat = 'gheDangDat';
            }
            let clasGheDaDuocDat = '';
            if (login?.taiKhoan === item.taiKhoanNguoiDat) {
                clasGheDaDuocDat = 'gheKhachDat'
            }
            let gheKhachDat = '';
            let indexGheKhachDat = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === item.maGhe);
            if (indexGheKhachDat != -1) {
                gheKhachDat = 'gheKhachDangDat'
            }
            return <Fragment key={index}>
                <button disabled={item.daDat || gheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${gheDangDat} ${clasGheDaDuocDat} ${gheKhachDat}`} onClick={() => {
                    const action = datGheAction(item, props.match.params.id)
                    console.log(item);
                    dispatch(action)
                }}>{item.daDat ? <CloseOutlined style={{ fontWeight: 'bold' }} /> : item.stt}</button>
                {(index + 1) % 16 === 0 ? <br /> : ""}
            </Fragment>
        })
    }

    return (
        <div className=' min-h-screen' style={{}}>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <div className='flex flex-col items-center mt-5'>
                        <img src='./../../images/screen.png' />
                        <div className=''>

                            {renderSeats()}
                        </div>
                    </div>
                    <div className=' mt-5 flex justify-center'>
                        <table className='divide-y devide-gray-200 w-2/3'>
                            <thead className='bg-gray-50 p-5'>
                                <tr>
                                    <th>Ghế Chưa Đặt</th>
                                    <th>Ghế Đang đặt</th>
                                    <th>Ghế Vip</th>
                                    <th>Ghế Đã đặt</th>
                                    <th>Ghế Mình Đặt</th>
                                    <th>Ghế Khách Đặt</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white devide-y devide-gray-200'>
                                <tr className='pl-4'>
                                    <td className='text-center'><button className='ghe text-center'></button></td>
                                    <td className='text-center'><button className='ghe gheDangDat text-center'></button></td>
                                    <td className='text-center'><button className='ghe gheVip text-center'></button></td>
                                    <td className='text-center'><button className='ghe gheDaDat text-center'><CloseOutlined /></button></td>
                                    <td className='text-center'><button className='ghe gheKhachDat text-center'><CloseOutlined /></button></td>
                                    <td className='text-center'><button className='ghe gheKhachDangDat text-center'><CloseOutlined /></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='col-span-3 mr-5'>
                    <h3 className='text-green-400 text-center text-2xl'>{danhSachGheDangDat.reduce((tongTien, ghe, index) => { return tongTien += ghe.giaVe; }, 0)} đ</h3>
                    <hr />
                    <h3 className='text-2xl mt-2 mb-2 text-center font-bold'> {thongTinPhim?.tenPhim}</h3>
                    <p><span className='font-bold'>Địa Điểm : </span>{thongTinPhim?.diaChi}</p>
                    <p><span className='font-bold'>Ngày Chiếu : </span>{thongTinPhim?.ngayChieu} </p>
                    <hr />
                    <div className='grid grid-cols-2 my-5'>
                        <div>
                            <span className='text-red-500'>Ghế: {_.sortBy(danhSachGheDangDat, ['maGhe']).map((item, index) => {
                                return <span className='text-red-500' key={index}>{item.stt} ,</span>
                            })}</span>
                        </div>
                        <div className='text-right'>
                            <span className='text-green-400'>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                return tongTien += ghe.giaVe;
                            }, 0)}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i className='font-bold'>Email:</i> <br />
                        {login?.email}
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i className='font-bold'>Họ Tên:</i><br />
                        {login?.hoTen}
                    </div>
                    <hr />
                    <div className='flex flex-col justify-around'>
                        <div className='bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer' onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            console.log(thongTinDatVe);
                            dispatch(DatVeAction(thongTinDatVe))
                        }} >
                            Đặt Vé
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default function(props) {
    return <div className='p-5 flex justify-between'>
        <Tabs defaultActiveKey='1'>
            <TabPane tab="01 Chọn Ghế Thanh Toán" key="1">
                <CheckOut {...props} />
            </TabPane>
            <TabPane tab="02 Kết Quả Đặt Vé" key="2">
                <KetQuaDatVe  {...props} />
            </TabPane>


        </Tabs>
        <NavLink to='/home' className='font-bold text-lg text-orange-400'>Home</NavLink>
    </div>
}



function KetQuaDatVe (props) {
    const dispatch = useDispatch()
    const { thongTinNguoiDung, login } = useSelector(root => root.QuanLyNguoiDungReducer)

    useEffect(() => {
        const action = LichSuDatVeAction();
        dispatch(action)
    }, []);
    console.log(thongTinNguoiDung);

    return <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <h1 className='text-center display-4 font-bold text-2xl text-orange-600 py-10'>Lịch Sử Đặt Vé</h1>
            <div className="flex flex-wrap gap-10">
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
    </section>

}