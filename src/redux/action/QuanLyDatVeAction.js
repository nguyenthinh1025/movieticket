import { toast } from "react-toastify";
import { connection } from "../..";
import { http } from "../../service/Service";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";



export const LayChiTietPhongVe = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "DISPLAY_LOADING" })
            let result = await http.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
            const action = {
                type: "CHI_TIET_PHONG_VE",
                chiTietPhongVe: result.data.content
            }
            console.log(result.data.content);
            dispatch(action)
            dispatch({ type: "HIDE_LOADING" })
        } catch (error) {
            dispatch({ type: "HIDE_LOADING" })
            console.log(error);
        }
    }
}


export const DatVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch) => {
        try {

            dispatch({ type: "DISPLAY_LOADING" })
            let result = await http.post('/QuanLyDatVe/DatVe', thongTinDatVe)
            console.log(result.data.content);
            await dispatch(LayChiTietPhongVe(thongTinDatVe.maLichChieu))
            await dispatch({ type: "DAT_VE_HOAN_TAT" })
            dispatch({ type: "HIDE_LOADING" })
            toast(`Book Movie Ticket Successfull`, {
                position: toast.POSITION.TOP_RIGHT
            });
        } catch (error) {
            console.log(error);
            dispatch({ type: "HIDE_LOADING" })
        }
    }
}


export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch({

            type: "DANH_SACH_GHE_DANG_DAT",
            danhSachGheDD: ghe

        })

        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.login.taiKhoan
        console.log(maLichChieu)
        console.log(danhSachGheDangDat);
        console.log(taiKhoan);
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
        connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu)
    }
}