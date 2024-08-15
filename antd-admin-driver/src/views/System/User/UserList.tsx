import api from "@/api";
import { IUser } from "@/types/modules/api";
import { PageParams } from "@/types/modules/common";
import { formatDate } from "@/utils/localeDate";
import { Button, Form, Input, Modal, Select, Space, Table, TableColumnsType, TableProps, Tag } from "antd";
import { Key, useEffect, useRef, useState } from "react";
import CreateUserDialog from "./CreateUserDialog";
import { IAction, IModalProp } from "@/types/modal";
import { message } from '@/components/AntdGlobal'
import AuthButton from "@/components/AuthButton";

export default function UserList() {
  const [dateSource, setDateSource] = useState<IUser.UserInfo[]>([])
  const [form] = Form.useForm();
  const userRef: IModalProp['mRef'] = useRef()
  const [userIds, setUserIds] = useState<number[]>([]);

  const [pageConf, setPageConf] = useState<{
    current: number
    pageSize: number
    total: number
  }>({
    current: 1,
    pageSize: 5,
    total: 0
  })

  // 用户信息列表
  const getUserList = (params: PageParams) => {
    const values = form.getFieldsValue() // getFieldsValue 还有 单个的 getFieldValue

    api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize || pageConf.pageSize,
    }).then((res) => {
      setDateSource(res.list)
      setPageConf({
        ...pageConf,
        current: res.page.pageNum,
        pageSize: res.page.pageSize,
        total: res.page.total,
      })
    })
  }

  useEffect(() => {
    // 初始分页
    getUserList({
      pageNum: 1,
    })
  }, [])


  // 搜索
  const handleSearch = () => {
    getUserList({
      pageNum: 1,
    })
  }

  // 分页改变
  const pageChange = (page: number) => {
    setPageConf({
      ...pageConf,
      current: page,
    })

    getUserList({
      pageNum: page,
    })
  }

  // 重置表单
  const handleReset = () => {
    form.resetFields()
    handleSearch()
  }

  // 创建
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  // 编辑
  const handleEdit = (record: IUser.UserInfo) => {
    userRef.current?.open('edit', record)
  }

  // 删除
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗</span>,
      onOk: () => {
        delUserReq([userId])
      }
    })
  }

  const batchDel = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除用户')
      return
    }

    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗</span>,
      onOk: () => {
        delUserReq(userIds)
      }
    })
  }

  // 删除用户 接口
  const delUserReq = (ids: number[]) => {
    api.delUser({ userIds: ids }).then(() => {
      message.success('删除成功')
      setUserIds([]) // 删除完重置
      handleSearch()
    })
  }

  // TableColumnsType ✅ 行值就能.出来
  const columns: TableColumnsType<IUser.UserInfo> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通',
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: string) {
        return {
          0: '无',
          1: '在职',
          2: '离职',
          3: '试用期',
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string | number) {
        // ✅dataIndex 列的属性即接口字段，render第一个参数是该属性值
        // 第二个参数是record行数据
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (val, record: IUser.UserInfo) => (
        <Space>
          <Button type="text" onClick={() => { handleEdit(record) }}>编辑</Button>
          <Button type="text" danger onClick={() => { handleDel(record.userId) }}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="userList">
      <Form
        className="searchForm"
        form={form}
        layout="inline"
        initialValues={{ state: 0 }}
      >
        <Form.Item name='userId' label="用户ID">
          <Input placeholder="请输入用户ID" />
        </Form.Item>
        <Form.Item name='userName' label="用户名称">
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item name='state' label="状态">
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item >
          <Space>
            <Button type="primary" onClick={handleSearch}>搜索</Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className="baseTable">
        <div className="headerWrapper">
          <div className="title">用户列表</div>
          <div className="action">
            {/* <AuthButton auth='create313' type="primary" onClick={handleCreate}>新增</AuthButton> */}
            <AuthButton auth='user@create' type="primary" onClick={handleCreate}>新增</AuthButton>
            <Button danger onClick={batchDel}>批量删除</Button>
          </div>
        </div>

        <div className="tableWrapper">
          <Table
            dataSource={dateSource}
            columns={columns}
            bordered
            rowKey="userId"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: userIds, // ✅目的作为受控组件
              onChange: (selectedRowKeys: Key[]) => {
                setUserIds(selectedRowKeys as number[])
              }
            }}
            pagination={{
              position: ['bottomRight'],
              current: pageConf.current,
              pageSize: pageConf.pageSize,
              total: pageConf.total,
              showQuickJumper: true,
              showTotal(total) {
                return `总共${total}条`
              },
              onChange(page) {
                pageChange(page)
              }
            }}
          />
        </div>
      </div>

      <CreateUserDialog mRef={userRef} update={handleSearch} />
    </div>
  )
};

