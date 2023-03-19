import { history } from "../../App";
import { http } from "../../service/Service"


import { ToastContainer, toast } from 'react-toastify';



export const DangnhapAction = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "DISPLAY_LOADING" })
            let result = await http.post('/QuanLyNguoiDung/DangNhap', user);
            const action = {
                type: "LOGIN",
                login: result.data.content
            }
            await dispatch(action)
            console.log(result);
            history.push('/home')
            dispatch({ type: "HIDE_LOADING" })
            toast(`Login  thành công`, {
                position: toast.POSITION.TOP_RIGHT
            });
        } catch (error) {
            dispatch({ type: "HIDE_LOADING" })
            console.log(error);
        }
    }
}

export const DangKyAction = (user) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/QuanLyNguoiDung/DangKy', user);
            await history.push('/login')
            toast(`Register User Successfull`, {
                position: toast.POSITION.TOP_RIGHT
            });
        } catch (error) {
            console.log(error);
        }
    }
}


export const LichSuDatVeAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.post('/QuanLyNguoiDung/ThongTinTaiKhoan')
            const action = {
                type: "LICH_SU_DAT_VE",
                thongTinNguoiDung: result.data.content
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}