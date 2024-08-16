import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from 'antd';
import {
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { message } from '@/components/AntdGlobal';
import { IModalProp } from '@/types/modal';
import { IOrder } from '@/types/modules/api';
import orderApi from '@/api/orderApi';

export default function CreateOrderModal(
  props: IModalProp,
) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [vehicleList, setVehicleList] = useState<IOrder.DictItem[]>([]);
  const [cityList, setCityList] = useState<IOrder.DictItem[]>([]);

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
  const getCityList = async () => {
    const list = await orderApi.getCityList();
    setCityList(list)
  };
  const getVehicleList = async () => {
    const list = await orderApi.getVehicleList();
    setVehicleList(list)
  };

  useEffect(() => {
    if (visible) {
      getCityList()
      getVehicleList()
    }
  }, [visible]);

  // 提交
  const handleSubmit = async () => {
    const valid = await form.validateFields();

    if (valid) {
      const params = {
        ...form.getFieldsValue(),
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

  return (
    <Modal
      title={'创建订单'}
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'>
      <Form
        form={form}
        layout='horizontal'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='right'>
        <Row>
          <Col span={12}>
            <Form.Item
              label='城市名称'
              name='cityName'
              rules={[
                {
                  required: true,
                  message: '请选择城市名称',
                },
              ]}>
              <Select placeholder='请选择'>
                {cityList.map(item => (
                  <Select.Option
                    value={item.name} // 这里提交name
                    key={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='车型名称'
              name='vehicleName'
              rules={[
                {
                  required: true,
                  message: '请选择车型名称',
                },
              ]}>
              <Select placeholder='请选择'>
                {vehicleList.map(item => (
                  <Select.Option
                    value={item.name} // 这里提交name
                    key={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label='用户名称'
              name='userName'
              rules={[
                {
                  required: true,
                  message: '请输入用户名称',
                },
              ]}>
              <Input placeholder='请输入用户名称'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='手机号' name='mobile'>
              <Input placeholder='请输入'></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label='起始地址' name='startAddress'>
              <Input placeholder='请输入用户名称'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='结束地址' name='endAddress'>
              <Input placeholder='请输入'></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label='下单金额'
              name='orderAmount'
              rules={[
                {
                  required: true,
                  message: '请输入下单金额',
                },
              ]}>
              <Input
                type='number'
                placeholder='请输入用户名称'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='支付金额'
              name='userPayAmount'
              rules={[
                {
                  required: true,
                  message: '请输入支付金额',
                },
              ]}>
              <Input
                type='number'
                placeholder='请输入'></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label='司机名称'
              name='driverName'
              rules={[
                {
                  required: true,
                  message: '请输入司机名称',
                },
              ]}>
              <Input placeholder='请输入司机名称'></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='司机金额'
              name='driverAmount'
              rules={[
                {
                  required: true,
                  message: '请输入司机金额',
                },
              ]}>
              <Input
                type='number'
                placeholder='请输入'></Input>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label='支付方式' name='payType'>
              <Select placeholder='请选择'>
                <Select.Option value={1} key={1}>
                  微信
                </Select.Option>
                <Select.Option value={2} key={2}>
                  支付宝
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='订单状态' name='state'>
              <Select placeholder='请选择'>
                <Select.Option
                  value={IOrder.IState.doing}
                  key={IOrder.IState.doing}>
                  进行中
                </Select.Option>
                <Select.Option
                  value={IOrder.IState.done}
                  key={IOrder.IState.done}>
                  已完成
                </Select.Option>
                <Select.Option
                  value={IOrder.IState.timeout}
                  key={IOrder.IState.timeout}>
                  超时
                </Select.Option>
                <Select.Option
                  value={IOrder.IState.cancel}
                  key={IOrder.IState.cancel}>
                  取消
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label='用车时间' name='useTime'>
              <DatePicker></DatePicker>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='结束时间' name='endTime'>
              <DatePicker></DatePicker>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
