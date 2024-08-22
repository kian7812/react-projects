import { Modal } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { message } from '@/components/AntdGlobal';
import { IModalProp } from '@/types/modal';
import orderApi from '@/api/orderApi';
import FormRender, { useForm } from 'form-render';

export default function CreateOrderModal(
  props: IModalProp,
) {
  const [visible, setVisible] = useState(false);
  const form = useForm();

  // react文档不推荐这样open modal 而且 文档还是和forwardRef一起使用
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });

  const open = () => {
    setVisible(true);
  };

  // 获取城市列表和车型列表
  const getInitData = async () => {
    const cityList = await orderApi.getCityList();
    const behicleList = await orderApi.getVehicleList();

    form.setSchema({
      cityName: {
        props: {
          options: cityList.map((o) => ({
            label: o.name,
            value: o.name,
          })),
        },
      },
      vehicleName: {
        props: {
          options: behicleList.map((o) => ({
            label: o.name,
            value: o.name,
          })),
        },
      },
    });
  };

  // 提交
  const handleSubmit = async () => {
    const valid = await form.validateFields();

    if (valid) {
      const params = {
        ...form.getValues(),
      };

      await orderApi.createOrder(params);
      message.success('创建成功');

      handleCancel();
      props.update();
    }
  };
  // 取消
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const schema = {
    type: 'object',
    displayType: 'row',
    column: 2,
    labelWidth: 120,
    properties: {
      cityName: {
        title: '城市名称',
        type: 'string',
        widget: 'select',
        rules: [
          {
            required: true,
            message: '请选择城市名称',
          },
        ],
      },
      vehicleName: {
        title: '车型',
        type: 'string',
        widget: 'select',
        required: true,
      },
      userName: {
        title: '用户名称',
        type: 'string',
        widget: 'input',
        required: true,
        placeholder: '请输入',
      },
      mobile: {
        title: '手机号',
        type: 'string',
        widget: 'inputNumber',
        placeholder: '请输入',
        rules: [
          {
            pattern: /^1[1-9]\d{9}$/,
            message: '请输入有效手机号',
          },
        ],
      },
      startAddress: {
        title: '起始地址',
        type: 'string',
        widget: 'input',
        placeholder: '请输入',
      },
      endAddress: {
        title: '结束地址',
        type: 'string',
        widget: 'input',
        placeholder: '请输入',
      },
      orderAmount: {
        title: '下单金额',
        type: 'number',
        widget: 'inputNumber',
        placeholder: '请输入',
        required: true,
      },
      userPayAmount: {
        title: '支付金额',
        type: 'number',
        widget: 'inputNumber',
        placeholder: '请输入',
        required: true,
      },
      driverName: {
        title: '司机名称',
        type: 'string',
        widget: 'input',
        placeholder: '请输入',
        required: true,
      },
      driverAmount: {
        title: '司机金额',
        type: 'number',
        widget: 'inputNumber',
        placeholder: '请输入',
        required: true,
      },
      payType: {
        title: '支付方式',
        type: 'number',
        widget: 'select',
        placeholder: '请选择',
        props: {
          options: [
            {
              label: '微信',
              value: 1,
            },
            {
              label: '支付宝',
              value: 2,
            },
          ],
        },
      },
      state: {
        title: '订单状态',
        type: 'number',
        widget: 'select',
        placeholder: '请选择',
        props: {
          options: [
            {
              label: '进行中',
              value: 1,
            },
            {
              label: '已完成',
              value: 2,
            },
            {
              label: '超时',
              value: 3,
            },
            {
              label: '已完成取消',
              value: 4,
            },
          ],
        },
      },
      useTime: {
        title: '用车时间',
        type: 'string',
        widget: 'datePicker',
      },
      endTime: {
        title: '结束时间',
        type: 'string',
        widget: 'datePicker',
      },
    },
  };

  return (
    <Modal
      title={'创建订单'}
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'>
      <FormRender
        form={form}
        schema={schema}
        onMount={getInitData}
      />
    </Modal>
  );
}
