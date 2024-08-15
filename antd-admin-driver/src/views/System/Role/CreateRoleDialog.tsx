import { Form, Input, Modal } from "antd";
import { useImperativeHandle, useState } from "react";
import { message } from '@/components/AntdGlobal'
import { IAction, IModalProp } from "@/types/modal";
import { IRole } from "@/types/modules/api";
import roleApi from "@/api/roleApi";


export default function CreateRoleDialog(props: IModalProp) {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<IAction>('create');
  const [form] = Form.useForm()

  // react文档不推荐这样open modal 而且 文档还是和forwardRef一起使用
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (type: IAction, data?: IRole.RoleItem) => {
    setVisible(true)
    setAction(type)

    // 编辑时
    if (type === 'edit' && data) {
      // ✅表单赋值，data字段比 表单多，setFieldsValue只赋值它需要的
      // ✅_id 可使用 隐藏域，省去使用状态变量, 为空就是新增，data._id有则自动赋值
      form.setFieldsValue(data)
    }
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()

    if (valid) {
      const params = {
        ...form.getFieldsValue(),
      }

      if (action === 'create') {
        roleApi.createRole(params)
        message.success('创建成功')
      } else if (action === 'edit') {
        roleApi.editRole(params)
        message.success('修改成功')
      }

      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '创建角色' : '编辑角色'}
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      {/* label 宽度设置 labelCol */}
      <Form form={form} labelCol={{ span: 4 }} labelAlign="right" >
        <Form.Item name="_id" hidden>
          {/* 隐藏域 _id ✅ */}
          <Input />
        </Form.Item>
        <Form.Item
          label="角色名称"
          name="roleName"
          rules={[
            { required: true, message: '请输入内容' },
          ]}
        >
          <Input placeholder="请输入角色名称"></Input>
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark"
        >
          <Input.TextArea placeholder="请输入备注"></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal >
  )
}