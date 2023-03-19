import { http } from "../../service/Service"



export const LayThongTinHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP00');
            const action = {
                type: 'LAY_THONG_TIN_HE_THONG_RAP',
                arrHeThongRap: result.data.content
            }
            dispatch(action);
        } catch (error) {
            console.log(error);
        }
    }
}