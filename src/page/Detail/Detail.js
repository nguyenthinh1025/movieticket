import { Radio, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LayThongTinLichChieuPhimAction } from '../../redux/action/QuanLyPhimAction';
import moment from 'moment';
import TabPane from 'antd/es/tabs/TabPane';
import { NavLink } from 'react-router-dom';

export default function Detail (props) {
    const { filmDetail } = useSelector(root => root.QuanLyPhimReducer)
    const [tabPosition, setTabPosition] = useState('left');
    const dispatch = useDispatch()
    const { id } = props.match.params;
    useEffect(() => {
        const action = LayThongTinLichChieuPhimAction(id);
        dispatch(action)
    }, []);

    console.log(filmDetail);
    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: '100%', backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center' }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100%' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className='grid grid-cols-12 mb-10'>
                    <div className='col-span-5 col-start-3'>
                        <div className='grid grid-cols-3 '>
                            <img className='col-span-1' src={filmDetail.hinhAnh} style={{ width: '100%', height: 250 }} />
                            <div className='col-span-2 ml-5' >
                                <p className='text-sm text-green-600'>Ngày Chiếu : {moment(filmDetail.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                                <p className='text-4xl'>{filmDetail.tenPhim}</p>

                            </div>

                        </div>
                        <p className='mt-10'><span className='font-bold text-xl text-green-600'>Mô tả : </span>{filmDetail.moTa}</p>

                    </div>
                    <div className='col-span-4'>
                        <h1 style={{ marginLeft: '20%', fontWeight: 'bold', fontSize: '15px' }} className="text-green-600">Đánh Giá</h1>
                        <h1 style={{ marginLeft: '10%' }} className="mb-5 text-green-600 text-2xl"> <Rate className='text-center text-green-600' allowHalf value={filmDetail.danhGia / 2} /></h1>

                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia * 10} %</span>
                            <div className='slice'>
                                <div className='bar'></div>
                                <div className='fill'></div>
                            </div>
                        </div>

                    </div>
                </div>
                <Tabs

                    defaultActiveKey="1"
                    centered
                    className=" bg-slate-200 mt-10  py-5 "
                    style={{ width: '70%', margin: '0 auto' }}
                >
                    <TabPane tab="Lịch Chiếu" key={1}>
                        <Tabs tabPosition={tabPosition} className="bg-slate-200 py-5" style={{ height: '100%', width: '90%', margin: '0 auto' }}>
                            {filmDetail.heThongRapChieu?.map((htr, index) => {
                                return <TabPane tab={
                                    <div>
                                        <img src={htr.logo} width={50} height={50} />
                                        {htr.tenHeThongRap}
                                    </div>
                                } key={index}>

                                    {htr.cumRapChieu?.map((cumRap, index) => {
                                        return <div className='mt-5' key={index}>
                                            <div className='flex flex-row'>
                                                <img src={cumRap.hinhAnh} width={40} height={40} className="rounded" />
                                                <div className='ml-2'>
                                                    <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }}>{cumRap.tenCumRap}</p>
                                                    <p className='text-gray-400' style={{ marginTop: '0' }}>{cumRap.diaChi}</p>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-4 mt-5'>
                                                {cumRap.lichChieuPhim?.slice(0, 12).map((item, index) => {
                                                    return <NavLink to={`/checkout/${item.maLichChieu}`} className='col-span-1 text-green-600 font-bold' key={index}>{moment(item.ngayChieuGioChieu).format('hh:mm A')}</NavLink >
                                                })}

                                            </div>
                                        </div>
                                    })}
                                </TabPane>
                            })}
                        </Tabs>
                    </TabPane>
                    <TabPane tab="Thông Tin" key={2}>

                    </TabPane>
                    <TabPane tab="Đánh Giá" key={3}>

                    </TabPane>
                </Tabs>

                <div className='mt-20 ml-10'>

                </div>
            </CustomCard>
        </div>
    )
}
