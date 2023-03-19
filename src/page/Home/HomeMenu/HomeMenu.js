import { Radio, Space, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LayThongTinHeThongRapAction } from '../../../redux/action/QuanLyRapAction';

const HomeMenu = () => {
    const { arrHeThongRap } = useSelector(root => root.HeThongRapReducer);
    console.log(arrHeThongRap);
    const [tabPosition, setTabPosition] = useState('left');
    const dispatch = useDispatch()
    useEffect(() => {
        const action = LayThongTinHeThongRapAction();
        dispatch(action)
    }, []);

    return (
        <div className=' ml-10 mt-10 pb-10'>

            <Tabs tabPosition={tabPosition} className="ml-6">
                {arrHeThongRap?.map((heThongRap, index) => {
                    return <TabPane tab={<img src={heThongRap.logo} className='rounded-full w-10' />} key={index}>
                        <Tabs tabPosition={tabPosition}>
                            {heThongRap?.lstCumRap?.map((cumRap, index) => {

                                return <TabPane tab={

                                    <div style={{ width: '300px', display: 'flex' }}>
                                        <img src={cumRap.hinhAnh} className='rounded-full w-10' />


                                        <div className='text-left ml-2'>
                                            {cumRap.tenCumRap}
                                            <p className='text-red-600'>Chi Tiết</p>
                                        </div>
                                    </div>
                                }
                                    key={index}
                                >

                                    {cumRap.danhSachPhim.map((item, index) => {
                                        return <Fragment key={index}>
                                            <div className='my-5' style={{ display: "flex", marginBottom: '100px' }}>
                                                <div className='flex'>
                                                    <img src={item.hinhAnh} style={{ height: '250px', width: '180px' }} />
                                                    <div className='ml-10'>
                                                        <h2 className='text-2xl text-orange-400 font-bold ml-2 pb-10'>{item.tenPhim}</h2>
                                                        <p className='text-xl font-bold mb-5'>{cumRap.diaChi}</p>
                                                        <div className='grid - grid-cols-4 gap-20'>
                                                            {item.lstLichChieuTheoPhim?.slice(0, 15).map((lichChieu, index) => {
                                                                return <NavLink to='/' className='text-xl text-indigo-500' key={index}>
                                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    })}
                                </TabPane>

                            })}
                        </Tabs>
                    </TabPane>

                })}

            </Tabs >
        </div >
    )
}

export default HomeMenu