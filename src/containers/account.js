/*
 * @Author: your name
 * @Date: 2020-10-05 16:17:52
 * @LastEditTime: 2020-10-25 01:00:23
 * @LastEditors: Please set LastEditors
 * @Description: 账号列表
 * @FilePath: \project\src\containers\user.js
 */
import React from 'react'
import { Table, Drawer, Button, Form, Input, Select, Col, Row, message } from 'antd'
import APIService from '../service/APIService'
const rankLevelSingleOpts = [
    { key: 0, value: '黑铁' },
    { key: 1, value: '青铜' },
    { key: 2, value: '白银' },
    { key: 3, value: '黄金' },
    { key: 4, value: '铂金' },
    { key: 5, value: '钻石' },
    { key: 6, value: '大师' },
    { key: 7, value: '王者' },
    { key: -1, value: '无段位' },

]
const rankLevelFlexibleOpts = {}

const rankLevelNumOpts = [
    { key: 'Ⅰ', value: 'Ⅰ' },
    { key: 'Ⅱ', value: 'Ⅱ' },
    { key: 'Ⅲ', value: 'Ⅲ' },
    { key: 'Ⅳ', value: 'Ⅳ' },
    { key: 'Ⅴ', value: 'Ⅴ' },
]

const vipsLevelOpts = [
    { key: 0, value: '普通' },
    { key: 1, value: 'VIP' },
    { key: 2, value: 'SVIP' },
]
class AccountList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [
                {}
            ],
            initData: {
                rankLevelName: '0',
                rankLevelFlexibleNum: '0'
            },
            visible: false
        }
    }

    componentDidMount() {
        this.fecthAccounts()
    }

    fecthAccounts() {
        APIService.WeChatRobotAPI('fetchAccounts', { wxid: 'root' }).then(res => {
            console.log('res======', res)
            this.setState({
                dataSource: res.data
            })
        })
    }

    handleEditAccount(record) {
        // 单双排具体值
        let rankLevelNum = record.rankLevelSingle ? record.rankLevelSingle.substring(2, record.rankLevelSingle.length) : null
        // 灵活排具体值
        let rankFlexLevelNum = record.rankLevelFlexible ? record.rankLevelFlexible.substring(2, record.rankLevelFlexible.length) : null
        this.setState({
            initData: {
                ...record,
                rankLevelNum: rankLevelNum,
                rankLevelName: record.rankIndexSingle ? record.rankIndexSingle : -1,
                rankLevelFlexibleName: record.rankIndexFlexible ? record.rankIndexFlexible : -1,
                rankLevelFlexibleNum: rankFlexLevelNum
            },
            visible: true
        })
    }
    onFinish(values) {
        let params = {
            ...values,
            rankIndexSingle: values.rankLevelName ? values.rankLevelName : 0,
            rankLevelSingle: rankLevelSingleOpts.find(item => item.key === values.rankLevelName).value + values.rankLevelNum,
            rankIndexFlexible: values.rankLevelFlexibleName ? values.rankLevelFlexibleName : 0,
            rankLevelFlexible: rankLevelSingleOpts.find(item => item.key === values.rankLevelFlexibleName).value + values.rankLevelFlexibleNum
        }
        if(this.state.initData) {
            params.id = this.state.initData.id
        }
        delete values.rankLevelName
        delete values.rankLevelNum
        delete values.rankLevelFlexibleName
        delete values.rankLevelFlexibleNum
        APIService.WeChatRobotAPI('saveAccounts', params).then(res => {
            if(res.code === 200) {
                message.success('保存成功！')
                this.setState({
                    visible: false
                })
            }
        })
    }


    render() {
        const { dataSource, initData, visible } = this.state
        const columns = [
            { title: '账号', dataIndex: 'username', key: 'username', },
            { title: '密码', dataIndex: 'password', key: 'password', },
            { title: '昵称', dataIndex: 'nickName', key: 'nickName', },
            {
                title: 'VIP限制等级', dataIndex: 'vipLevel', key: 'vipLevel', render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 0 ?
                                    <span style={{ color: '#008000' }}>普通</span>
                                    :
                                    text == 1 ?
                                        <span style={{ color: '#FF8C00' }}>VIP</span>
                                        :
                                        <span style={{ color: '#ff0000' }}>SVIP</span>

                            }

                        </div>
                    )
                }
            },
            {
                title: '状态', dataIndex: 'status', key: 'status', render: (text, record, index) => {
                    return (
                        <div>
                            {
                                text == 0 ?
                                    <span style={{ color: '#008000' }}>正常</span>
                                    :
                                    text == 1 ?
                                        <span style={{ color: '#FF8C00' }}>使用中</span>
                                        :
                                        <span style={{ color: '#ff0000' }}>不可用</span>

                            }

                        </div>
                    )
                }
            },
            { title: '单双排段位', dataIndex: 'rankLevelSingle', key: 'rankLevelSingle', },
            { title: '灵活排位段位', dataIndex: 'rankLevelFlexible', key: 'rankLevelFlexible', },
            { title: '英雄数量', dataIndex: 'heroNum', key: 'heroNum', },
            { title: '等级', dataIndex: 'level', key: 'level', },
            { title: '租号单价（元/时）', dataIndex: 'price', key: 'price', },
            { title: '英雄', dataIndex: 'heroList', key: 'heroList', ellipsis: true },
            {
                title: '操作', dataIndex: 'operation', render: (text, record, index) => {
                    return (
                        <div>
                            <Button type='link' onClick={this.handleEditAccount.bind(this, record)}>编辑</Button>
                        </div>
                    )
                }
            }

        ]


        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
                <Drawer
                    visible={visible}
                    width={600}
                    title={initData ? '编辑' : '新建'}
                    onClose={() => { this.setState({ visible: false }) }}

                >
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        initialValues={initData}
                        onFinish={this.onFinish.bind(this)}
                    >
                        <Form.Item label="账号" name="username" required={true}>
                            <Input placeholder="请输入账号" />
                        </Form.Item>
                        <Form.Item label="密码" name="password" required={true}>
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item label="昵称" name="nickName">
                            <Input placeholder="请输入昵称" />
                        </Form.Item>
                        <Form.Item label="VIP限制等级" name="vipLevel">
                            <Select>
                                {
                                    vipsLevelOpts.map((item, index) => {
                                        return (
                                            <Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="单双排段位">
                            <Form.Item name="rankLevelName">

                                <Select placeholder="请选择单双排段位">
                                    {
                                        rankLevelSingleOpts.map((item, index) => {
                                            return (
                                                <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="rankLevelNum">
                                <Select>
                                    {
                                        rankLevelNumOpts.map((item, index) => {
                                            return (
                                                <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>

                        </Form.Item>
                        <Form.Item label="灵活排位段位">
                            <Form.Item name="rankLevelFlexibleName">
                                <Select placeholder="请选择单双排段位">
                                    {
                                        rankLevelSingleOpts.map((item, index) => {
                                            return (
                                                <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="rankLevelFlexibleNum">
                                <Select>

                                    {
                                        rankLevelNumOpts.map((item, index) => {
                                            return (
                                                <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                            )
                                        })
                                    }

                                </Select>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="英雄数量" name="heroNum">
                            <Input placeholder="请输入昵称" />
                        </Form.Item>
                        <Form.Item label="等级" name="level">
                            <Input placeholder="请输入昵称" />
                        </Form.Item>
                        <Form.Item label="租号单价（元/时）" name="price">
                            <Input placeholder="请输入租号单价" />
                        </Form.Item>
                        <Form.Item label="英雄" name="heroList">
                            <Input.TextArea placeholder="请输入英雄" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default AccountList