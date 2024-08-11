import api from '@/api';
import { message } from '@/components/AntdGlobal';
import { IAction, IModalProp } from '@/types/modal';
import { IDept, IUser } from '@/types/modules/api';
import { Modal, Form, TreeSelect, Input, Select } from 'antd';
import { useEffect, useImperativeHandle, useState } from 'react';

// ✅Form.Item 里面的 Input、TreeSelect都是受控组件

export default function CreateDeptModal(props: IModalProp) {
  const [action, setAction] = useState<IAction>();
  const [visible, setVisible] = useState(false);
  const [deptList, setDeptList] = useState<IDept.DeptItem[]>([]);
  const [allUsers, setAllUsers] = useState<IUser.UserInfo[]>([]);
  const [form] = Form.useForm()

  // 对外方法
  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (type: IAction, data?: IDept.DeptItem) => {
    setVisible(true)
    setAction(type)
    getDeptList() // open 时调用
    if (data) {
      // 子集创建和编辑
      // 子集 {parentId: _id} 这样form只填充有值的name
      form.setFieldsValue(data)
    }
  }

  useEffect(() => {
    getAllUserList()
  }, []);

  // 部门列表
  const getDeptList = () => {
    api.getDeptList().then((res) => {
      setDeptList(res)
    })
  }
  // 用户全部列表
  const getAllUserList = () => {
    api.getUserAllList().then((res) => {
      setAllUsers(res)
    })
  }

  const handleSubmit = () => {
    form.validateFields().then((valid) => {
      if (valid) {
        const params = form.getFieldsValue()

        if (action === 'create') {
          api.createDept(params).then(() => { message.success('操作成功') })
        } else if (action === 'edit') {
          api.editDept(params).then(() => { message.success('操作成功') })
        }

        handleCancel()
        props.update()
      }
    }).catch(() => {
      // 捕获下错误
    })
  };

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  };

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
      >
        {/* 隐藏域✅ */}
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='上级' name='parentId'>
          <TreeSelect
            placeholder='请选择上级'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ // 映射label value
              label: 'deptName',
              value: '_id',
            }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item
          label='部门名称'
          name='deptName'
          rules={[
            { required: true, message: '请输入名称' }
          ]}
        >
          <Input placeholder='请输入名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName'
          rules={[
            { required: true, message: '请选择负责人' }
          ]}
        >
          <Select>
            {allUsers.map((item) => (
              <Select.Option value={item.userName} key={item._id}>
                {item.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
