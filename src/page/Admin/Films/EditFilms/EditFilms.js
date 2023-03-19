import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { Formik, useFormik } from 'formik';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CapNhatPhimUpload, LayThongTinPhimAction } from '../../../../redux/action/QuanLyPhimAction';


export default function EditFilms (props) {
    const { thongTinPhim } = useSelector(rootReducer => rootReducer.QuanLyPhimReducer);

    const dispatch = useDispatch()
    const [img, setImg] = useState('');

    useEffect(() => {
        let id = props.match.params.id;
        const action = LayThongTinPhimAction(id);
        dispatch(action);
        console.log(id);
    }, []);
    const fromik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            dangChieu: thongTinPhim?.dangChieu,
            sapChieu: thongTinPhim?.sapChieu,
            hot: thongTinPhim?.hot,
            danhGia: thongTinPhim?.danhGia,
            hinhAnh: thongTinPhim?.hinhAnh,
            maNhom: '',

        },
        onSubmit: (value) => {
            console.log(value);
            value.maNhom = 'GP00';
            let formData = new FormData();
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    formData.append(key, value[key])
                }
                else {
                    if (value.hinhAnh !== null) {
                        formData.append('File', value.hinhAnh, value.hinhAnh.name);
                    }
                }
            }
            console.log(formData);
            const action = CapNhatPhimUpload(formData);
            dispatch(action);
        }
    })

    const handleChangeDatePicker = (value) => {
        const ngayKhoiChieu = moment(value)
            ;
        fromik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const hadleChangeSwitch = (name) => {
        return (value) => {
            fromik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            await fromik.setFieldValue('hinhAnh', file)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log(e.target.result);
                setImg(e.target.result);
            }

        }
    }
    return (
        <Form
            onSubmitCapture={fromik.handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        // initialValues={{ size: componentSize }}
        // onValuesChange={onFormLayoutChange}
        // size={componentSize}
        >
            <h3> Thêm Mới Phim</h3>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={fromik.handleChange} value={fromik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={fromik.handleChange} value={fromik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô Tả">
                <Input name='moTa' onChange={fromik.handleChange} value={fromik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày Khởi Chiếu">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} value={moment(fromik.values.ngayKhoiChieu)} />
            </Form.Item>
            <Form.Item label="Đang Chiếu" >
                <Switch name='dangChieu' onChange={hadleChangeSwitch('dangChieu')} checked={fromik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp Chiếu" >
                <Switch name='sapChieu' onChange={hadleChangeSwitch('sapChieu')} checked={fromik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" >
                <Switch name='hot' onChange={hadleChangeSwitch('hot')} checked={fromik.values.hot} />
            </Form.Item>
            <Form.Item label="Số Sao">
                <InputNumber onChange={(value) => { fromik.setFieldValue('danhGia', value) }} value={fromik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình Ảnh">
                <input type='file' onChange={handleChangeFile} accept='image/png,image/jpeg,image/gif,image/png' />
                <img style={{ width: 150, height: 150 }} src={img === '' ? thongTinPhim.hinhAnh : img} />
            </Form.Item>
            <Form.Item label="Tác Vụ">
                <button type='submit' className='bg-blue-300 text-white p-2'>Cập Nhật</button>
            </Form.Item>
        </Form>
    );


}



