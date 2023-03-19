

const stateDefault = {
    arrHeThongRap: []
}

export const HeThongRapReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LAY_THONG_TIN_HE_THONG_RAP': {
            state.arrHeThongRap = action.arrHeThongRap;
            return { ...state }
        }

        default: return state;
    }
}