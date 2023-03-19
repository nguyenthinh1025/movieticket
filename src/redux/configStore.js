
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { CarouselReducer } from './reducer/CarouselReducer';
import { HeThongRapReducer } from './reducer/HeThongRapReducer';
import { LoadingReducer } from './reducer/LoadingReducer';
import { QuanLyDatVeReducer } from './reducer/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './reducer/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './reducer/QuanLyPhimReducer';





const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    HeThongRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
});

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare);
// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(rootReducer, composeCustom);