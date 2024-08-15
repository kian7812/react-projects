

import { IRole } from "@/types/modules/api";
import { formatDate } from "@/utils/localeDate";
import { Button, Form, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useRef, useState } from "react";
import CreateRoleDialog from "./CreateRoleDialog";
import SetPermissionDialog from "./SetPermissionDialog";
import { IModalProp } from "@/types/modal";
import { useAntdTable } from "ahooks";
import roleApi from "@/api/roleApi";
import { message } from '@/components/AntdGlobal'

// ✅使用 ahooks 的 useAntdTable 实现表格查询分页
// 固定的返回参数接口结构
interface Result {
  total: number;
  list: IRole.RoleItem[];
}
const getTableData = (
  { current, pageSize }: { current: number, pageSize: number }, // 第一个参数是分页
  formData: IRole.Params // // 第二个参数是表单
): Promise<Result> => {
  return roleApi.getRoleList({
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

export default function RoleList() {
  const [form] = Form.useForm();
  const roleRef: IModalProp['mRef'] = useRef()
  const permissionRef: IModalProp['mRef'] = useRef()

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
    roleRef.current?.open('create')
  }

  // 编辑
  const handleEdit = (record: IRole.RoleItem) => {
    roleRef.current?.open('edit', record)
  }

  // 设置权限
  const handleSetPermission = (record: IRole.RoleItem) => {
    permissionRef.current?.open('edit', record)
  }

  // 删除
  const handleDel = (_id: string) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该角色吗</span>,
      onOk: () => {
        deleteReq(_id)
      }
    })
  }
  // 删除接口
  const deleteReq = (_id: string) => {
    roleApi.deleteRole({ _id: _id }).then(() => {
      message.success('删除成功')
      handleReset()
    })
  }

  // TableColumnsType ✅ 行值就能.出来
  const columns: TableColumnsType<IRole.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string | number) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
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
      render: (_, record: IRole.RoleItem) => (
        <Space>
          <Button type="text" onClick={() => { handleEdit(record) }}>编辑</Button>
          <Button type="text" onClick={() => { handleSetPermission(record) }}>设置权限</Button>
          <Button type="text" danger onClick={() => { handleDel(record._id) }}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="roleList">
      <Form
        className="searchForm"
        form={form}
        name="searchForm"
        layout="inline"
      >
        <Form.Item name='roleName' label="角色名称">
          <Input placeholder="请输入角色名称" />
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
          <div className="title">角色列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>新增</Button>
          </div>
        </div>

        <div className="tableWrapper">
          <Table
            columns={columns}
            bordered
            rowKey="_id"
            {...tableProps}
          />
        </div>
      </div>


      <CreateRoleDialog
        mRef={roleRef}
        update={handleReset}
      />

      {/* 设置权限 */}
      <SetPermissionDialog
        mRef={permissionRef}
        update={handleReset}
      />
    </div>
  )
};

