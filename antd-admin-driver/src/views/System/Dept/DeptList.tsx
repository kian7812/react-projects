import api from '@/api';
import { IDept } from '@/types/modules/api';
import { Button, Form, Input, Modal, Space, Table, TableColumnsType } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CreateDeptModal from './CreateDeptModal';
import { IAction } from '@/types/modal';
import { message } from '@/components/AntdGlobal';
import { formatDate } from '@/utils/localeDate';

export default function DeptList() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<IDept.DeptItem[]>([]);
  // ✅dataSource 只要包含children，table自定就树形结构了
  const deptRef = useRef<{
    open: (type: IAction, data?: IDept.DeptItem | { parentId: string }) => void
  }>()

  useEffect(() => {
    getDeptList()
  }, []);

  const getDeptList = () => {
    api.getDeptList(form.getFieldsValue()).then((res) => {
      setDataSource(res)
    })
  }

  const handleSearch = () => {
    getDeptList()
  }

  const handleReset = () => {
    form.resetFields()
    getDeptList()
  }


  // 创建
  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }

  // 编辑
  const handleEdit = (record: IDept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }

  // 删除
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该部门吗</span>,
      onOk: () => {
        reqDeleteDept(id)
      }
    })
  }

  const reqDeleteDept = async (id: string) => {
    await api.deleteDept({
      _id: id
    })
    message.success('删除成功')
    handleReset()
  }

  // ✅ record 就有类型了
  const columns: TableColumnsType<IDept.DeptItem> = [
    {
      title: '部门列表',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200,
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>新增</Button>
            <Button type='text' onClick={() => handleEdit(record)}>编辑</Button>
            <Button type='text' danger onClick={() => handleDelete(record._id)}>删除</Button>
          </Space>
        )
      }
    },
  ];

  return (
    <div>
      <Form className='searchForm' form={form} layout='inline'>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>搜索</Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>

        </Form.Item>
      </Form>

      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>新增</Button>
          </div>
        </div>

        <div className='tableWrapper'>
          <Table
            bordered
            rowKey='_id'
            pagination={false}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </div>

      <CreateDeptModal mRef={deptRef} update={handleReset} />
    </div>
  );
}
