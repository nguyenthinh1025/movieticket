import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";




export const CheckOutTemplate = (props) => {
    const { Component, ...restProps } = props;


    if (localStorage.getItem('taiKhoan') === 'nouser') {
        return <Redirect to='/login' />
    }
    return <Route {...restProps} render={(rootRoute) => {
        return <Fragment>


            <Component {...rootRoute} />

        </Fragment>
    }} />
}