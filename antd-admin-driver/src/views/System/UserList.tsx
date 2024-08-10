import api from "@/api";
import { IUser } from "@/types/modules/api";
import { PageParams } from "@/types/modules/common";
import { formatDate } from "@/utils/localeDate";
import { Button, Form, Input, Select, Space, Table, TableColumnsType, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";

export default function UserList() {
  const [dateSource, setDateSource] = useState<IUser.UserInfo[]>([])
  const [form] = Form.useForm();
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
      pageSize: params.pageSize,
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
      pageSize: pageConf.pageSize,
    })
  }, [])


  // 搜索
  const handleSearch = () => {
    getUserList({
      pageNum: 1,
      pageSize: pageConf.pageSize,
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
      pageSize: pageConf.pageSize,
    })
  }

  // 重置表单
  const handleReset = (params) => {
    form.resetFields()
    handleSearch()
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
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <Space>
          <Button type="text">编辑</Button>
          <Button type="text" danger>删除</Button>
        </Space>
      ),
    },
  ];


  return (
    <div className="userList">
      <Form
        className="searchForm"
        form={form}
        name="searchForm"
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
            <Select.Option value={2}>试用期</Select.Option>
            <Select.Option value={3}>离职</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item >
          <Space>
            <Button type="primary" onClick={handleSearch}>搜索</Button>
            <Button type="primary" onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className="baseTable">
        <div className="headerWrapper">
          <div className="title">用户列表</div>
          <div className="action">
            <Button>新增</Button>
            <Button>批量删除</Button>
          </div>
        </div>

        <div className="tableWrapper">
          <Table
            dataSource={dateSource}
            columns={columns}
            bordered
            rowKey="userId"
            rowSelection={{
              type: 'checkbox'
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
    </div>
  )
};

