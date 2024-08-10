import { Form, GetProp, Input, Modal, Select, Upload, UploadProps } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useImperativeHandle, useState } from "react";
import storage from "@/utils/storage";
import { message } from '@/components/AntdGlobal'
import { IAction, IModalProp } from "@/types/modal";
import { IUser } from "@/types/modules/api";
import api from "@/api";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function CreateUser(props: IModalProp) {
  const [imgUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<IAction>('create');
  const [form] = Form.useForm()
  const token = storage.get('token')


  // react文档不推荐这样open modal 而且 文档还是和forwardRef一起使用
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (type: IAction, data?: IUser.UserInfo) => {
    setVisible(true)
    setAction(type)

    // 编辑时
    if (type === 'edit' && data) {
      // ✅表单赋值，data字段比 表单多，setFieldsValue只赋值它需要的
      // ✅userId 可使用 隐藏域，省去使用状态变量
      form.setFieldsValue(data)
    }
  }


  const handleSubmit = async () => {
    const valid = await form.validateFields()

    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: ''
      }

      if (action === 'create') {
        api.createUser(params)
        message.success('创建成功')
      } else if (action === 'edit') {
        api.editUser(params)
        message.success('修改成功')
      }

      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
    setImageUrl('')
  }

  // 上传前文件校验  
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片需要小于 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  // 上传过程
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    } else if (info.file.status === 'done') {
      // 返回体
      const { code } = info.file.response
      if (code === 0) {
        message.success('上传成功');
        getBase64(info.file.originFileObj as FileType, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      } else {
        message.error('上传失败');
      }

    } else if (info.file.status === 'error') {
      message.error('上传失败');
    }
  };
  return (
    <Modal title='创建用户'
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign="right" >
        <Form.Item name="userId" hidden>
          {/* 隐藏域 userId ✅ */}
          <Input />
        </Form.Item>
        <Form.Item
          label="用户名称"
          name="userName"
          rules={[
            { required: true, message: '请输入内容' },
            { min: 5, max: 12, message: '用户名称最小5个字符，最大12个字符' },
          ]}
        >
          <Input placeholder="请输入用户名称"></Input>
        </Form.Item>
        <Form.Item
          label="用户邮箱"
          name="userEmail"
          rules={[
            { required: true, message: '请输入内容' },
            { type: 'email', message: '请输入正确的邮箱' },
            { pattern: /^\w+@123.com$/, message: '邮箱必须以@123.com结尾' },
          ]}
        >
          <Input placeholder="请输入用户邮箱" disabled={action === 'edit'}></Input>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            { len: 11, message: '手机号必须为11位数字' },
            { pattern: /1[1-9]\d{9}/, message: '手机号必须为1开头的11位数字' },
          ]}
        >
          <Input type="number" placeholder="请输入手机号"></Input>
        </Form.Item>
        <Form.Item label="部门" name="deptId"
        >
          <Input placeholder="请输入部门"></Input>
        </Form.Item>
        <Form.Item label="岗位" name="job">
          <Input placeholder="请输入岗位"></Input>
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Select style={{ width: 120 }}>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Input placeholder="请输入角色"></Input>
        </Form.Item>
        <Form.Item label="用户头像">
          <Upload
            listType="picture-circle"
            showUploadList={false}
            headers={{
              Authorization: 'Bearer ' + token
            }}
            action={'/mock-local-api/users/upload'}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imgUrl
              ? <img src={imgUrl} style={{ width: '100%' }} />
              : <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div>
                  上传头像
                </div>
              </div>}

          </Upload>
        </Form.Item>
      </Form>
    </Modal >
  )
}