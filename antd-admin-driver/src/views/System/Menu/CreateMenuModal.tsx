import api from '@/api';
import { message } from '@/components/AntdGlobal';
import { IAction, IModalProp } from '@/types/modal';
import { IMenu } from '@/types/modules/api';
import { Modal, Form, TreeSelect, Input, Select, InputNumber, Radio } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons'

// ✅Form.Item 里面的 Input、TreeSelect都是受控组件

export default function CreateMenuModal(props: IModalProp) {
  const [action, setAction] = useState<IAction>();
  const [visible, setVisible] = useState(false);
  const [menuList, setMenuList] = useState<IMenu.MenuItem[]>([]);
  const [form] = Form.useForm()

  // 对外方法
  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (type: IAction, data?: IMenu.MenuItem) => {
    setVisible(true)
    setAction(type)
    // open 时调用
    getList()
    if (data) {
      // 子集创建和编辑
      // 子集 {parentId: _id} 这样form只填充有值的name
      form.setFieldsValue(data)
    }
  }

  // 列表
  const getList = () => {
    api.getMenuList().then((res) => {
      setMenuList(res)
    })
  }


  const handleSubmit = () => {
    form.validateFields().then((valid) => {
      if (valid) {
        const params = form.getFieldsValue()

        if (action === 'create') {
          api.createMenu(params).then(() => { message.success('操作成功') })
        } else if (action === 'edit') {
          api.editMenu(params).then(() => { message.success('操作成功') })
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
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
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
        initialValues={{
          menuType: 1,
          menuState: 1,
        }}
      >
        {/* 隐藏域✅ */}
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>

        <Form.Item label='上级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ // 映射label value
              label: 'menuName',
              value: '_id',
            }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label='菜单名称'
          name='menuName'
          rules={[
            { required: true, message: '请输入名称' }
          ]}
        >
          <Input placeholder='请输入名称' />
        </Form.Item>
        {/* menuType是按钮时，隐藏 菜单图标和菜单地址，显示 权限表示 */}
        <Form.Item noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2
              ? (
                <Form.Item label='权限标识' name='menuCode'>
                  <Input placeholder='请输入' />
                </Form.Item>
              ) : (
                <>
                  <Form.Item label='菜单图标' name='icon'>
                    <Input placeholder='请输入' />
                  </Form.Item>
                  <Form.Item label='菜单地址' name='path'>
                    <Input placeholder='请输入' />
                  </Form.Item>
                </>
              )
          }}
        </Form.Item>

        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入' />
        </Form.Item>

        <Form.Item
          label='排序'
          name='orderBy'
          tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}
        >
          <InputNumber placeholder='请输入' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal >
  );
}
