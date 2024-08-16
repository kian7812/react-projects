import orderApi from "@/api/orderApi";
import { IModalDetailProp } from "@/types/modal";
import { IOrder } from "@/types/modules/api";
import { formatDate } from "@/utils/localeDate";
import { formatLocaleAmount } from "@/utils/thousandNumber";
import { formatMobile } from "@/utils/tools";
import { Descriptions, Modal } from "antd";
import { useImperativeHandle, useState } from "react";


export default function OrderDetailModal(props: IModalDetailProp) {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState<IOrder.OrderItem>();

  // react文档不推荐这样open modal 而且 文档还是和forwardRef一起使用
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });

  const open = async (id: string) => {
    setVisible(true);
    // 订单详情
    const data = await orderApi.getOrderDetail({ orderId: id })
    setDetail(data)
  };

  // 取消
  const handleCancel = () => {
    setVisible(false);
  };

  // 订单状态
  const formatState = (state?: IOrder.IState) => {
    if (!state) return '-' // ✅ts需要加否则下面会报错

    const map = {
      1: '进行中',
      2: '已完成',
      3: '超时',
      4: '取消',
    }

    return map[state]
  }

  return (
    <Modal
      title="订单详情"
      width={800}
      open={visible}
      footer={false}
      onCancel={handleCancel}
    >
      <Descriptions column={2} style={{ padding: '10px 20px' }}>
        <Descriptions.Item label="订单编号">{detail?.orderId}</Descriptions.Item>
        <Descriptions.Item label="下单城市">{detail?.cityName}</Descriptions.Item>
        <Descriptions.Item label="下单用户">{detail?.userName}</Descriptions.Item>
        <Descriptions.Item label="手机号">{formatMobile(detail?.mobile)}</Descriptions.Item>

        <Descriptions.Item label="起点">{detail?.startAddress}</Descriptions.Item>
        <Descriptions.Item label="终点">{detail?.endAddress}</Descriptions.Item>

        <Descriptions.Item label="订单金额">{formatLocaleAmount(detail?.orderAmount)}</Descriptions.Item>
        <Descriptions.Item label="用户支付金额">{formatLocaleAmount(detail?.userPayAmount)}</Descriptions.Item>

        <Descriptions.Item label="司机到账金额">{formatLocaleAmount(detail?.driverAmount)}</Descriptions.Item>
        <Descriptions.Item label="支付方式">{detail?.payType == 1 ? '微信' : '支付宝'}</Descriptions.Item>

        <Descriptions.Item label="司机名称">{detail?.driverName}</Descriptions.Item>
        <Descriptions.Item label="订单车型">{detail?.vehicleName}</Descriptions.Item>

        <Descriptions.Item label="订单状态">{formatState(detail?.state)}</Descriptions.Item>
        <Descriptions.Item label="用车时间">{formatDate(detail?.useTime)}</Descriptions.Item>

        <Descriptions.Item label="订单结束时间">{formatDate(detail?.endTime)}</Descriptions.Item>
        <Descriptions.Item label="订单创建时间">{formatDate(detail?.createTime)}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
};
