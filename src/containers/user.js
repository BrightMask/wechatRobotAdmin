/*
 * @Author: your name
 * @Date: 2020-10-05 16:17:52
 * @LastEditTime: 2020-10-15 00:48:13
 * @LastEditors: Please set LastEditors
 * @Description: 用户列表
 * @FilePath: \project\src\containers\user.js
 */
import React from 'react'
import {Table, Pagination, Form, Row, Col, Input, Select, Button  } from 'antd'
import APIService from '../service/APIService'
const { Option } = Select;
class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            curPage: 1,
            pageSize: 10, 
            total: 0

        }
    }
    componentDidMount(){
        this.fetchUsers()
    }

    fetchUsers(page, query) {
        this.setState({
            curPage: page ? page : 0
        }, () => {
            let {curPage, pageSize} = this.state
            let params = {
                page: page ? page - 1 : curPage,
                size: pageSize
            }
            if(query) {
                params = {
                    page: params.page ?params.page : 0,
                    size: params.size ? params.size : 10,
                    mark: query.mark ? query.mark : '',
                    name:  query.name ? query.name : '',
                    sex:  query.sex ? query.sex : null,
                    status:  query.status ? query.status : null,

                    
                }
            }
            // this.props.form.getFieldsValue()
            APIService.WeChatRobotAPI('fetchUsers', params).then(res => {
                this.setState({
                    dataSource: res.data.content,
                    total: res.data.totalElements
                })
            })  
        })
       
    }

    handleChangePage(page) {
        this.fetchUsers(page)
    }

    handleQuery(values) {
        this.fetchUsers(0, values)
    }
    render () {
        const {dataSource, curPage, pageSize, total} = this.state
        const columns = [
           
            {
                title: '昵称',
                dataIndex: 'nickName',
                key: 'nickName',
                width: 260,
                ellipsis: true
            },
            {
                title: '备注名',
                dataIndex: 'remarkName',
                key: 'remarkName',
            },
            {
                title: '用户类型',
                dataIndex: 'type',
                key: 'type',
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 0 ? 
                                    <span style={{color: '#1E90FF'}}>普通用户</span>
                                    :
                                    text == 1 ?
                                    <span style={{color: '#FFD700'}}>VIP</span>
                                    :
                                    text == 2 ?
                                    <span style={{color: '#FF8C00'}}>SVIP</span>
                                    :
                                    <span style={{color: '#ccc'}}>未知</span>

                                
                            }

                        </div>
                    )
                }
            },
            {
                title: '用户状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 0 ? 
                                    <span style={{color: '#008000'}}>正常</span>
                                    :
                                    text == 1 ?
                                    <span style={{color: '#ff0000'}}>异常（不可租号）</span>
                                    :
                                    <span style={{color: '#ccc'}}>未知</span>
                                
                            }

                        </div>
                    )
                }
            },
            {
                title: '余额',
                dataIndex: 'balance',
                key: 'balance',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 1 ? 
                                    <span >男</span>
                                    :
                                    <span >女</span>
                                
                            }

                        </div>
                    )
                }
            },
            {
                title: '租号模式',
                dataIndex: 'rentMode',
                key: 'rentMode',
                render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 1 ? 
                                    <span>先打后付款</span>
                                    :
                                    text == 2 ?
                                    <span>先付款后打</span>
                                    :
                                    <span style={{color: '#ccc'}}>未知</span>
                                
                            }

                        </div>
                    )
                }
            },
           
            
            // {
            //     title: '操作',
            //     dataIndex: 'operation',
            //     key: 'operation',
            //     render: () => {
            //         return (
            //             <div>
            //                 <Button type="link">编辑</Button>
            //                 <Button type="link">删除</Button>  
            //             </div>
            //         )
            //     }
            // },
            
        ]
        const formItemLayout = {
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 14,
            },
          };
        return (
            <div>
                <div>
                    <Form {...formItemLayout}  onFinish={this.handleQuery.bind(this)}>
                        <Row style={{backgroundColor: '#fff', padding: '16px 0px 0px 0px', marginBottom: 16}}>
                            <Col span={5}>
                                <Form.Item label="昵称" name="name">
                                   
                                    <Input placeholder="请输入昵称" allowClear={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label="备注名" name="mark">
                                 
                                        <Input placeholder="请输入备注名" allowClear={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label="状态" name="status">
                                 
                                            <Select allowClear={true}>
                                                <Option value={0}>正常</Option>
                                                <Option value={1}>异常（不可租号）</Option>
                                            </Select>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item label="性别" name="sex">
                                            <Select allowClear={true}>
                                                <Option value="1">男</Option>
                                                <Option value="2">女</Option>
                                            </Select>
                                  
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item >
                                    <Button type="primary"  htmlType="submit">查询</Button>
                                </Form.Item>
                            </Col>
                           
                        </Row>

                        
                    </Form>
                </div>
                <Table 
                    style={{marginBottom: 20}}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
                <Pagination defaultCurrent={curPage} total={total} pageSize={pageSize} onChange={this.handleChangePage.bind(this)} showSizeChanger={false}/>
            </div>
        )
    }
}
export default UserList