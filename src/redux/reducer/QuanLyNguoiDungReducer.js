import { history } from "../../App"

const stateDefault = {
    login: JSON.parse(localStorage.getItem('userLogin')),
    thongTinNguoiDung: {}

}



export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "LOGIN": {
            const { login } = action
            localStorage.setItem('userLogin', JSON.stringify(login))
            localStorage.setItem('taiKhoan', login.taiKhoan)
            localStorage.setItem('USER_TOKEN', login.accessToken)
            return { ...state, login: login };
        }
        case "LOGOUT": {
            const loginm = localStorage.setItem('userLogin', JSON.stringify({}))
            localStorage.setItem('taiKhoan', 'nouser')

            state.login = loginm;

            return { ...state }
        }

        case 'LICH_SU_DAT_VE': {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state }
        }


        default: return state;
    }
}