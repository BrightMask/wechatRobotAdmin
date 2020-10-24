/*
 * @Author: your name
 * @Date: 2020-10-05 16:17:52
 * @LastEditTime: 2020-10-15 00:40:03
 * @LastEditors: Please set LastEditors
 * @Description: 订单列表
 * @FilePath: \project\src\containers\user.js
 */
import React from 'react'
import {Table, Pagination} from 'antd'
import APIService from '../service/APIService'
import {formdateTime} from '../utils/utils'

class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            curPage: 0,
            pageSize: 10, 
            total: 0
        }
    }

    componentDidMount(){
        this.fetchOrders()
    }

    fetchOrders(page) {
        this.setState({
            curPage: page ? page : 0
        }, () => {
            let {curPage, pageSize} = this.state
            let params = {
                page: page ? page - 1  : curPage,
                size: pageSize
            }
            APIService.WeChatRobotAPI('fetchOrders', params).then(res => {
                this.setState({
                    dataSource: res.data.content,
                    total: res.data.totalElements

                })
            })  
        })
        
    }

    
    handleChangePage(page) {
        this.fetchOrders(page)
    }

    render () {
        const {dataSource, curPage, pageSize, total} = this.state

        const columns = [
            {
                title: '订单号',
                dataIndex: 'accountId',
                key: 'accountId',
            },
           
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 0 ? 
                                    <span style={{color: '#008000'}}>已结束</span>
                                    :
                                    text == 1 ?
                                    <span style={{color: '#FF8C00'}}>进行中</span>
                                    :
                                    text == 2 ?
                                    <span style={{color: '#1E90FF'}}>已完成</span>
                                    :
                                    <span style={{color: '#ccc'}}>其他</span>
                            }

                        </div>
                    )
                }
            },
            {
                title: '消费金额(元)',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: '历时(分钟)',
                dataIndex: 'costTime',
                key: 'costTime',
            },
            {
                title: '支付状态',
                dataIndex: 'payStatus',
                key: 'payStatus',
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 0 ? 
                                    <span style={{color: '#008000'}}>已支付</span>
                                    :
                                    text == 1 ?
                                    <span style={{color: '#FF8C00'}}>待支付</span>
                                    :
                                    <span style={{color: '#ccc'}}>未知</span>
                            }

                        </div>
                    )
                }
            },
            {
                title: '开始时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (text, record, index) => {
                    let time = formdateTime(text)
                    return (
                        <div>
                            {time}
                        </div>
                    )
                }
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
                render: (text, record, index) => {
                    let time = formdateTime(text)
                    return (
                        <div>
                            {time}
                        </div>
                    )
                }
            },
            
        ]

        return (
            <div>
                <Table 
                    style={{marginBottom: 20}}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
                <Pagination defaultCurrent={curPage} total={total} pageSize={pageSize} onChange={this.handleChangePage.bind(this)}  showSizeChanger={false}/>

            </div>
        )
    }
}

export default OrderList