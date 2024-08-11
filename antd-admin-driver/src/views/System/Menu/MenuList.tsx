import api from '@/api';
import { IMenu } from '@/types/modules/api';
import { Button, Form, Input, Modal, Select, Space, Table, TableColumnsType } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CreateMenuModal from './CreateMenuModal';
import { IAction } from '@/types/modal';
import { message } from '@/components/AntdGlobal';
import { formatDate } from '@/utils/localeDate';

export default function MenuList() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<IMenu.MenuItem[]>([]);
  // ✅dataSource 只要包含children，table自定就树形结构了
  const menuRef = useRef<{
    open: (type: IAction, data?: IMenu.MenuItem | { parentId: number }) => void
  }>()

  useEffect(() => {
    getList()
  }, []);

  // 列表接口
  const getList = () => {
    api.getMenuList(form.getFieldsValue()).then((res) => {
      setDataSource(res)
    })
  }

  // 搜索
  const handleSearch = () => {
    getList()
  }
  // 重置
  const handleReset = () => {
    form.resetFields()
    getList()
  }
  // 创建
  const handleCreate = () => {
    menuRef.current?.open('create')
  }
  const handleSubCreate = (id: number) => {
    menuRef.current?.open('create', { parentId: id })
  }
  // 编辑
  const handleEdit = (record: IMenu.MenuItem) => {
    menuRef.current?.open('edit', record)
  }
  // 删除
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该菜单吗</span>,
      onOk: () => {
        reqDelete(id)
      }
    })
  }
  // 删除接口
  const reqDelete = async (id: number) => {
    await api.deleteMenu({
      _id: id
    })
    message.success('删除成功')
    handleReset()
  }

  // ✅ record 就有类型了
  const columns: TableColumnsType<IMenu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面',
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component',
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
      <Form className='searchForm' form={form} layout='inline'
        initialValues={{
          menuState: 1,
        }}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='请输入名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
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
          <div className='title'>菜单列表</div>
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

      <CreateMenuModal mRef={menuRef} update={handleReset} />
    </div>
  );
}
