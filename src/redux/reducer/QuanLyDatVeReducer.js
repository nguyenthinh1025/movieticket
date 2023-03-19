

const stateDefault = {
    chiTietPhongVe: {},
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [{ maGhe: 93801 }, { maGhe: 93802 }]
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'CHI_TIET_PHONG_VE': {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state }
        }

        case 'DANH_SACH_GHE_DANG_DAT': {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(item => item.maGhe === action.danhSachGheDD.maGhe);
            if (index != -1) {
                danhSachGheCapNhat = danhSachGheCapNhat.filter(item => item.maGhe !== action.danhSachGheDD.maGhe)
                // danhSachGheCapNhat.splice(index, 1)

            } else {
                danhSachGheCapNhat.push(action.danhSachGheDD)
                if (danhSachGheCapNhat.length > 10) {
                    if (window.confirm('Mua tối đa 10 vé!!!')) {
                        danhSachGheCapNhat = danhSachGheCapNhat.filter(item => item.maGhe !== action.danhSachGheDD.maGhe)
                    }
                }
            }
            state.danhSachGheDangDat = danhSachGheCapNhat;
            return { ...state }

        }
        case 'DAT_VE_HOAN_TAT': {
            state.danhSachGheDangDat = [];
            return { ...state }
        }


        case 'DAT_GHE': {
            state.danhSachGheKhachDat = action.arrGheKhachDat;
            return { ...state }
        }
        default: return state;
    }
}