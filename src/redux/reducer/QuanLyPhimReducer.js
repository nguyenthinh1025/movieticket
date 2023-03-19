
const stateDefault = {
    arrPhim: [],
    dangChieu: true,
    sapChieu: true,
    arrDefault: [],
    filmDetail: {},
    thongTinPhim: {}
}



export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'LAY_DANH_SACH_PHIM': {
            state.arrPhim = action.arrPhim;
            state.arrDefault = state.arrPhim
            return { ...state }
        }
        case 'SET_PHIM_SAP_CHIEU': {

            state.arrPhim = state.arrDefault.filter(item => item.dangChieu === state.dangChieu);
            return { ...state }
        }
        case 'SET_PHIM_DANG_CHIEU': {

            state.arrPhim = state.arrDefault.filter(item => item.sapChieu === state.sapChieu);
            return { ...state }
        }
        case 'LAY_THONG_TIN_LICH_CHIEU': {
            state.filmDetail = action.filmDetail;
            return { ...state }
        }
        case 'LAY_THONG_TIN_PHIM': {
            state.thongTinPhim = action.thongTinPhim;
            return { ...state };
        }
        default: return state;
    }
}