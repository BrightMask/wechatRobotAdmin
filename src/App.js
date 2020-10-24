/*
 * @Author: your name
 * @Date: 2020-10-05 16:09:56
 * @LastEditTime: 2020-10-14 22:58:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\src\App.js
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Tabs } from 'antd';
import AccountList from './containers/account'
import UserList from './containers/user'
import OrderList from './containers/orders'

const {TabPane } = Tabs
const { Header, Content } = Layout;
function App() {
    return (
        <div className="App">
            <Layout style={{height: '100%'}}>
                <Header style={{color: '#fff', fontSize: '24px', textAlign:'left'}}>
                    包猪公微信机器人管理后台
                </Header>
                <Layout>
                    <Content className="page-content">
                        <Tabs>
                            <TabPane tab="账号列表" key={0}>

                                <AccountList />
                            </TabPane>
                            <TabPane tab="用户列表" key={1}>
                                <UserList />

                            </TabPane>
                            <TabPane tab="订单列表" key={2}>
                                <OrderList />

                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>

            </Layout>
        </div>
    );
}

export default App;
