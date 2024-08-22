import { IOrder } from '@/types/modules/api';
import { formatDate } from '@/utils/localeDate';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useAntdTable } from 'ahooks';
import { message } from '@/components/AntdGlobal';
import orderApi from '@/api/orderApi';
import CreateOrderModal from './components/CreateOrderModal';
import CreateOrderModalFormRender from './components/CreateOrderModalFormRender';
import { formatLocaleAmount } from '@/utils/thousandNumber';
import OrderDetailModal from './components/OrderDetailModal';

// ✅使用 ahooks 的 useAntdTable 实现表格查询分页

// 固定的返回参数接口结构
interface Result {
  total: number;
  list: IOrder.OrderItem[];
}
// 获取表格数据
const getTableData = (
  // 第一个参数是分页
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  // 第二个参数是表单
  formData: IOrder.SearchParams,
): Promise<Result> => {
  return orderApi
    .getOrderList({
      ...formData,
      pageNum: current,
      pageSize: pageSize,
    })
    .then((res) => {
      return {
        total: res.page.total,
        list: res.list,
      };
    });
};

export default function OrderList() {
  const [form] = Form.useForm();
  const orderRef = useRef<{ open: () => void }>();
  const detailRef = useRef<{
    open: (orderId: string) => void;
  }>();

  // ✅使用 useAntdTable
  // table 配置项 pagination 和 dataSource 使用 tableProps 代替
  // 搜索和重置 使用 search 方法
  const { tableProps, search } = useAntdTable(
    getTableData,
    {
      // 用来获取表单参数
      form,
      // 默认 pageSize
      // defaultPageSize: 4,
      // 定义默认参数
      defaultParams: [
        { current: 1, pageSize: 4 }, // 必填，第一个参数，初始话page
        { state: IOrder.IState.doing }, // 必填，第二个参数，初始化表单
      ],
    },
  );

  // 搜索
  const handleSearch = () => {
    search.submit();
  };

  // 重置表单
  const handleReset = () => {
    search.reset();
  };

  // 创建
  const handleCreate = () => {
    orderRef.current?.open();
  };

  // 订单详情
  const handleDetail = (id: string) => {
    detailRef.current?.open(id);
  };

  // 删除
  const handleDel = (id: string) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该订单吗</span>,
      onOk: () => {
        delUserReq(id);
      },
    });
  };

  // 删除用户接口
  const delUserReq = (id: string) => {
    orderApi.deleteOrder({ orderId: id }).then(() => {
      message.success('删除成功');
      handleReset();
    });
  };

  // 文件导出
  const handleExport = () => {
    orderApi.exportData(form.getFieldsValue());
  };

  // TableColumnsType ✅ 行值就能.出来
  const columns: TableColumnsType<IOrder.OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName',
      width: 80,
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress',
      width: 160,
      render(_, record) {
        return (
          <div>
            <p>开始地址：{record.startAddress}</p>
            <p>结束地址：{record.endAddress}</p>
          </div>
        );
      },
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
      render(createTime: string | number) {
        // ✅dataIndex 列的属性，render第一个参数是该属性值
        // 第二个参数是record行数据
        return formatDate(createTime);
      },
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render(orderAmount) {
        return formatLocaleAmount(orderAmount);
      },
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(role: number) {
        return {
          1: '进行中',
          2: '已完成',
          3: '超时',
          4: '取消',
        }[role];
      },
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type='text'
            onClick={() => {
              handleDetail(record.orderId);
            }}>
            详情
          </Button>
          {/* <Button type="text" onClick={() => { handleDel(record.userId) }}>打点</Button> */}
          {/* <Button type="text" onClick={() => { handleDel(record.userId) }}>轨迹</Button> */}
          <Button
            type='text'
            danger
            onClick={() => {
              handleDel(record.orderId);
            }}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='orderList'>
      <Form
        className='searchForm'
        form={form}
        name='searchForm'
        layout='inline'
        // initialValues={{ state: 0 }}  // 通过 上面 hook 实现
      >
        <Form.Item name='orderId' label='订单ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='订单状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={IOrder.IState.doing}>
              进行中
            </Select.Option>
            <Select.Option value={IOrder.IState.done}>
              已完成
            </Select.Option>
            <Select.Option value={IOrder.IState.timeout}>
              超时
            </Select.Option>
            <Select.Option value={IOrder.IState.cancel}>
              取消
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>订单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' onClick={handleExport}>
              导出
            </Button>
          </div>
        </div>

        <div className='tableWrapper'>
          <Table
            columns={columns}
            bordered
            rowKey='_id'
            {...tableProps}
          />
        </div>
      </div>

      {/* 创建 可打开注释 */}
      {/* <CreateOrderModal
        mRef={orderRef}
        update={handleReset}
      /> */}

      {/* 使用 FormRender 创建 */}
      <CreateOrderModalFormRender
        mRef={orderRef}
        update={handleReset}
      />

      {/* 详情 */}
      <OrderDetailModal mRef={detailRef} />
    </div>
  );
}
