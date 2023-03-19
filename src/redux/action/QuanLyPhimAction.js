import { history } from "../../App";
import { http } from "../../service/Service"



export const LayDanhSachPhimAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/QuanLyPhim/LayDanhSachPhim?maNhom=GP00');
            const action = {
                type: "LAY_DANH_SACH_PHIM",
                arrPhim: result.data.content
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}

export const QuanLyPhimAction1 = (tenPhim) => {
    return async (dispatch) => {
        try {
            let result = await http.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP00&tenPhim=${tenPhim}`);

            const action = {
                type: 'LAY_DANH_SACH_PHIM',
                arrPhim: result.data.content
            }
            dispatch(action);
            console.log(action);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}


export const LayThongTinLichChieuPhimAction = (id) => {
    return async (dispatch) => {
        try {
            let result = await http.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=` + id);
            const action = {
                type: "LAY_THONG_TIN_LICH_CHIEU",
                filmDetail: result.data.content
            }
            dispatch(action);
        } catch (error) {
            console.log(error);
        }
    }
}

export const xoaPhimAction = (maPhim) => {

    return async (dispatch) => {
        try {
            let result = await http.delete('/api/QuanLyPhim/XoaPhim?MaPhim=' + maPhim);

            dispatch(LayDanhSachPhimAction())

        } catch (error) {
            console.log(error);
        }
    }
}

export const LayThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await http.get('/QuanLyPhim/LayThongTinPhim?MaPhim=' + maPhim);
            const action = {
                type: 'LAY_THONG_TIN_PHIM',
                thongTinPhim: result.data.content
            }
            dispatch(action);

        } catch (error) {
            console.log(error);
        }
    }
}


export const CapNhatPhimUpload = (upload) => {

    return async (dispatch) => {
        try {
            let result = await http.post('/QuanLyPhim/CapNhatPhimUpload', upload);
            alert('Cập Nhật Phim Thành Công')
            console.log(result.data.content);
            dispatch(LayDanhSachPhimAction())
            history.push('/admin/films')
        } catch (error) {
            console.log(error);
        }
    }
}