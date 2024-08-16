import { defineMockData } from 'vite-plugin-mock-dev-server';
import { randomString } from '../utils/tools';

const dayTimestamp = 1000 * 60 * 60 * 24;
const monthTimestamp = dayTimestamp * 30;
let now = Date.now();
// 生成时间
function generateCreateTime() {
  now = now - monthTimestamp * 2;
  return now;
}

export const orderList = defineMockData('orderList', {
  page: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  list: [
    {
      _id: '669e14fe4a54800ac8e56bc5',
      orderId: 'T20241721636094077',
      cityName: '北',
      userName: '测试',
      driverAmount: 100,
      driverName: '第三方',
      vehicleName: '小面',
      route: [],
      useTime: '2023-11-22T10:44:25.613Z',
      endTime: '2023-11-22T10:44:25.613Z',
      createId: 1000002,
      createTime: '2023-11-22T10:44:25.613Z',
    },
  ],
});

// 车型列表 vehicleList
export const vehicleList = defineMockData('vehicleList', {
  list: [
    { id: '10001', name: '小面' },
    { id: '10002', name: '中面' },
    { id: '10003', name: '大面' },
    { id: '10004', name: '货车' },
  ],
});
// 城市列表 cityList
export const cityList = defineMockData('cityList', {
  list: [
    { id: '10001', name: '北' },
    { id: '10002', name: '上' },
    { id: '10003', name: '广' },
    { id: '10004', name: '深' },
  ],
});

// 创建
export const createOrder = params => {
  const item = {
    _id: '',
    orderId: '',
    cityName: '',
    userName: '',
    mobile: '',
    startAddress: '',
    endAddress: '',
    orderAmount: 0,
    userPayAmount: 0,
    driverAmount: 0,
    payType: 0,
    driverName: '',
    vehicleName: '',
    state: '',
    route: [], // 不清楚
    useTime: generateCreateTime(),
    endTime: generateCreateTime(),
    createId: 1000002,
    createTime: generateCreateTime(),
  };

  const newItem = {
    ...item,
    ...params,
    _id: randomString(18),
    orderId: randomString(18),
  };

  orderList.value.list.push(newItem);
};

// 编辑、权限设置
export const orderDetail = (params) => {
  const item = orderList.value.list.find(
    o => o.orderId === params.orderId,
  );
  return item
};

// // 删除
// export const deleteRole = params => {
//   const index = orderList.value.list.findIndex(
//     o => o._id === params._id,
//   );
//   orderList.value.list.splice(index, 1);
// };
