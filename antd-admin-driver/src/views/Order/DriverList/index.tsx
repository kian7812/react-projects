import { formatDate } from '@/utils/localeDate';
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  TableColumnsType,
} from 'antd';
import { useEffect, useState } from 'react';
import { IDriver } from '@/types/modules/api';
import orderApi from '@/api/orderApi';
import { formatLocaleAmount } from '@/utils/thousandNumber';

export default function DriverList() {
  const [tableDate, setTableDate] = useState<IDriver.DriverItem[]>([]);
  const [form] = Form.useForm();

  // 列表
  const getList = () => {
    // getFieldsValue 还有 单个的 getFieldValue
    const values = form.getFieldsValue();

    orderApi
      .getDriverList({
        ...values,
      })
      .then(res => {
        setTableDate(res.list);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  // 搜索
  const handleSearch = () => {
    getList();
  };
  // 重置表单
  const handleReset = () => {
    form.resetFields();
    handleSearch();
  };

  // TableColumnsType ✅ 行值就能.出来
  const columns: TableColumnsType<IDriver.DriverItem> = [
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName',
      fixed: 'left', // ✅固定列，左，需给定一个width
      width: 100,
    },
    {
      title: '司机信息',
      dataIndex: 'driverInfo',
      key: 'driverInfo',
      fixed: 'left',
      width: 200,
      render(_, record) {
        return <div>
          <p>司机ID：{record.driverId}</p>
          <p>手机号码：{record.driverPhone}</p>
          <p>注册城市：{record.cityName}</p>
          <p>会员等级：{record.grade}</p>
          <p>司机等级：{record.driverLevel}</p>
        </div>;
      },
    },
    {
      title: '司机状态',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      width: 100,
      render(accountStatus: number) {
        return {
          0: '待认证',
          1: '正常',
          2: '暂时拉黑',
          3: '永久拉黑',
          4: '停止推送',
        }[accountStatus];
      },
    },
    {
      title: '车辆信息',
      dataIndex: 'vehicleInfo',
      key: 'vehicleInfo',
      width: 260,
      render(_, record) {
        return <div>
          <p>车牌号码：{record.carNo}</p>
          <p>车牌品牌：{record.vehicleBrand}</p>
          <p>车牌名称：{record.vehicleName}</p>
        </div>;
      },
    },
    {
      title: '昨日在线时长',
      dataIndex: 'onlineTime',
      key: 'onlineTime',
      width: 150,
    },
    {
      title: '昨日司机流水',
      dataIndex: 'driverAmount',
      key: 'driverAmount',
      width: 120,
      render(driverAmount) {
        return formatLocaleAmount(driverAmount);
      },
    },
    {
      title: '司机评分',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
    },
    {
      title: '行为分',
      dataIndex: 'driverScore',
      key: 'driverScore',
      width: 100,
    },
    {
      title: '昨日推单数',
      dataIndex: 'pushOrderCount',
      key: 'pushOrderCount',
      width: 120,
    },
    {
      title: '昨日完单数',
      dataIndex: 'orderCompleteCount',
      key: 'orderCompleteCount',
      width: 120,
    },
    {
      title: '加入时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 220,
      render(createTime) {
        // ✅dataIndex 列的属性即接口字段，render第一个参数是该属性值
        // 第二个参数是record行数据
        return formatDate(createTime);
      },
    },
  ];

  return (
    <div className='driverList'>
      <Form
        className='searchForm'
        form={form}
        layout='inline'
      >
        <Form.Item name='driverName' label='司机名称'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='accountStatus' label='司机状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>待认证</Select.Option>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>
              暂时拉黑
            </Select.Option>
            <Select.Option value={3}>
              永久拉黑
            </Select.Option>
            <Select.Option value={4}>
              停止推送
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
          <div className='title'>司机列表</div>
          <div className='action'></div>
        </div>

        <div className='tableWrapper'>
          <Table
            bordered
            rowKey='id'
            columns={columns}
            dataSource={tableDate}
            pagination={false} // 不用分页
            scroll={{ x: 1300 }} //✅应该是超过宽度出现横向滚动条，不指定好像不能fixed功能，会平分负宽度
          />
        </div>
      </div>
    </div>
  );
}
