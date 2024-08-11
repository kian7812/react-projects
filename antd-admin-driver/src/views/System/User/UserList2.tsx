import api from "@/api";
import { IUser } from "@/types/modules/api";
import { PageParams } from "@/types/modules/common";
import { formatDate } from "@/utils/localeDate";
import { Button, Form, Input, message, Modal, Select, Space, Table, TableColumnsType, TableProps, Tag } from "antd";
import { Key, useEffect, useRef, useState } from "react";
import CreateUserDialog from "./CreateUserDialog";
import { IAction, IModalProp } from "@/types/modal";
import { useAntdTable } from "ahooks";

// ✅使用 useAntdTable 实现表格查询分页

// 固定的返回参数接口结构
interface Result {
  total: number;
  list: IUser.UserInfo[];
}
const getTableData = (
  { current, pageSize }: { current: number, pageSize: number }, // 第一个参数是分页
  formData: IUser.Params // // 第二个参数是表单
): Promise<Result> => {
  return api.getUserList({
    ...formData,
    pageNum: current,
    pageSize: pageSize,
  }).then((res) => {
    return {
      total: res.page.total,
      list: res.list
    }
  })
};

export default function UserList() {
  const [form] = Form.useForm();
  const userRef: IModalProp['mRef'] = useRef()
  const [userIds, setUserIds] = useState<number[]>([]);

  // 使用 useAntdTable
  // table 配置项 pagination 和 dataSource 使用 tableProps 代替
  // 搜索和重置 使用 search 方法
  const { tableProps, search } = useAntdTable(getTableData, {
    form, // 用来获取表单参数
    defaultPageSize: 4, // 默认 pageSize
  })

  // 搜索
  const handleSearch = () => {
    search.submit()
  }

  // 重置表单
  const handleReset = () => {
    search.reset()
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

  // 批量删除
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
      handleReset()
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
        // ✅dataIndex 列的属性，render第一个参数是该属性值
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
            <Button type="primary" onClick={handleCreate}>新增</Button>
            <Button danger onClick={batchDel}>批量删除</Button>
          </div>
        </div>

        <div className="tableWrapper">
          <Table
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
            {...tableProps}
          />
        </div>
      </div>

      <CreateUserDialog
        mRef={userRef}
        update={handleReset}
      />
    </div>
  )
};

