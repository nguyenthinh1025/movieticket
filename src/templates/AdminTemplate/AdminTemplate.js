import { Fragment } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    FileOutlined,
    DesktopOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, NavLink, Route } from "react-router-dom";
import './AdminTemplate.css'
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const App = () => {



}



export const AdminTempplate = (props) => {

    const { Component, ...restProps } = props;
    const [collapsed, setCollapsed] = useState(false);
    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment style={{ minHeight: '100vh' }}>
            <Layout>

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}>
                        <Menu.Item key="0" width={100}>
                            <img src='https://picsum.photos/200' />
                        </Menu.Item>
                        <Menu.Item key="1" icon={<UserOutlined />} >
                            <NavLink to='/admin/users' >User</NavLink>
                        </Menu.Item>
                        <SubMenu key='sub1' title='Films'>
                            <Menu.Item key="10" icon={<FileOutlined />} >
                                <NavLink to='/admin/films' >Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="11" icon={<FileOutlined />} >
                                <NavLink to='/admin/films/addnew' >Addnew</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3" icon={<DesktopOutlined />} >
                            <NavLink to='/admin/showtime' >Showtime</NavLink>
                        </Menu.Item>
                    </Menu>




                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed)
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>
        </Fragment >
    }} />
}


