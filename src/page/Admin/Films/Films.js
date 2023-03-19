import React, { useEffect } from 'react'
import { Button, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LayDanhSachPhimAction, QuanLyPhimAction, QuanLyPhimAction1, xoaPhimAction } from '../../../redux/action/QuanLyPhimAction';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from './../../../App'
export default function Films () {

    const { arrDefault } = useSelector(rootReducer => rootReducer.QuanLyPhimReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        const action = LayDanhSachPhimAction();

        dispatch(action);
    }, []);

    const { Search } = Input;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = (value) => {
        const action = QuanLyPhimAction1(value);
        dispatch(action)
    }
    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            width: '15%',
            // value: (text, object) => {

            // },

            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            width: '15%',
            render: (text, films, index) => {
                return <Fragment>
                    <img src={films.hinhAnh} alt={films.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </Fragment>
            }
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            width: '30%',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();

                if (tenPhimA > tenPhimB) {
                    return 1
                }
                return -1;
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',
            width: '20%',
            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1
                }
                return -1;
            },
            render: (text, films) => {
                return <Fragment>
                    {films.moTa.length > 50 ? films.moTa.substr(0, 50) + '...' : films.moTa}
                </Fragment>
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Action',
            dataIndex: 'maPhim',
            width: '25%',

            render: (text, films) => {
                return <Fragment>
                    <NavLink key={1} to={`/admin/films/editfilms/${films.maPhim}`} className={' mr-2  text-3xl '} style={{ color: 'blue' }}><EditOutlined /></NavLink>
                    <span key={2} className={'text-2xl '} style={{ color: 'red', cursor: 'pointer' }} onClick={() => {
                        if (window.confirm('Bạn có muốn xóa Phim ' + films.tenPhim)) {
                            dispatch(xoaPhimAction(films.maPhim))
                        }
                    }}><DeleteOutlined /></span>
                </Fragment>
            },
            sortDirections: ['descend'],
        },
    ];

    const data = arrDefault;
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            <h3 className='text-2xl'>Quản Lý Phim</h3>
            <Button className='mb-5' onClick={() => {
                history.push('/admin/films/addnew');
            }} >Thêm Films</Button>
            <Search
                className='mb-5'
                placeholder="Search Phim"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                suffix={suffix}
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />
        </div >
    )
}
