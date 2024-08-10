import { Avatar, Button, Card, Col, Descriptions, DescriptionsProps, Divider, Row } from "antd";
import styles from './index.module.less'
import { useEffect, useState } from "react";
import { useUserInfoStore } from "@/store";
import api from "@/api";
import { IDashBoard } from "@/types/modules/api";
import { formatLocaleAmount } from "@/utils/thousandNumber";
import { useCharts } from "@/hook/useCharts";

export default function Dashboard() {
  const userInfo = useUserInfoStore(state => state.userInfo)
  const [report, setReport] = useState<IDashBoard.reportData>()

  // 折线图
  const [lineRef, lineChart] = useCharts()

  // 饼图
  const [pieCityRef, pieCityChart] = useCharts()

  // 饼图
  const [pieAgeRef, pieAgeChart] = useCharts()

  // 雷达图
  const [radarRef, radarChart] = useCharts()

  const descitems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: userInfo.userId,
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo.userEmail,
    },
    {
      key: '3',
      label: '状态',
      children: userInfo.state,
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo.mobile,
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo.job,
    },
  ];

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  useEffect(() => {
    getReportData()
  }, [])

  // 设置折线图
  const setLineChart = () => {
    if (!lineChart) return;

    lineChart?.setOption({
      // title: {
      //   text: '订单和流水走势图'
      // },
      tooltip: {
        trigger: 'axis',
      },
      // 顶部图例
      legend: {
        data: ['订单', '流水']
      },
      // 网格容器
      grid: {
        left: '5%',
        right: '15px',
        bottom: '10%',
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [10, 20, 30, 50, 60, 70, 80, 90, 100, 110, 120]
        },
        {
          name: '流水',
          type: 'line',
          data: [1000, 200, 300, 50, 600, 700, 800, 900, 1000, 1100, 1200]
        },
      ]
    })
  }

  // 设置饼图
  const setPieChart = () => {
    if (!pieCityChart || !pieAgeChart) return;

    pieCityChart?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '北' },
            { value: 735, name: '上' },
            { value: 580, name: '广' },
            { value: 484, name: '深' },
            { value: 300, name: '杭' }
          ],
        }
      ]
    })

    pieAgeChart?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [40, 140],
          roseType: 'area',
          data: [
            { value: 30, name: '北' },
            { value: 45, name: '上' },
            { value: 60, name: '广' },
            { value: 20, name: '深' },
            { value: 150, name: '杭' }
          ],
        }
      ]
    })
  }

  // 设置雷图
  const setRadarChart = () => {
    if (!radarChart) return;

    radarChart?.setOption({
      // title: {
      //   text: '司机模型诊断',
      //   left: 'center',
      // },
      legend: {
        data: ['司机模型诊断'],
      },
      radar: {
        // 五个方向
        indicator: [
          { name: '服务态度', max: 10 }, // 最大值，和真实数据对比
          { name: '在线时长', max: 400 },
          { name: '接单率', max: 100 },
          { name: '评分', max: 5 },
          { name: '关注度', max: 10000 },
        ],
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: [
            {
              name: '司机模型诊断',
              value: [8, 300, 80, 4, 9000]
            }
          ],
        }
      ]
    })
  }


  useEffect(() => {
    setLineChart()
    setPieChart()
    setRadarChart()
  }, [lineChart, pieCityChart, pieAgeChart, radarChart])

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <Avatar size={80} src={<img src={userInfo.userImg} alt="avatar" />} />
        <Descriptions title="欢迎👏🏻" items={descitems} />
      </div>

      <Divider />

      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="司机数量" hoverable type="inner">
              {formatLocaleAmount(report?.driverCount)}个
            </Card>
          </Col>
          <Col span={6}>
            <Card title="总流水" hoverable type="inner" >
              {formatLocaleAmount(report?.totalMoney)}元
            </Card>
          </Col>
          <Col span={6}>
            <Card title="总订单" hoverable type="inner">
              {formatLocaleAmount(report?.orderCount)}单
            </Card>
          </Col>
          <Col span={6}>
            <Card title="开通城市" hoverable type="inner">
              {formatLocaleAmount(report?.cityNum)}座
            </Card>
          </Col>
        </Row>
      </div>

      <Divider />

      <div>
        <Card
          title="订单和流水走势图"
          extra={<Button type="primary">刷新</Button>}
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>

        <Divider dashed />

        <Card
          title="订单和流水走势图"
          extra={<Button type="primary">刷新</Button>}
        >
          <div className={styles.pieChart}>
            <div ref={pieCityRef} className={styles.pieChartItem}></div>
            <div ref={pieAgeRef} className={styles.pieChartItem}></div>
          </div>
        </Card>

        <Divider dashed />

        <Card
          title="订单和流水走势图"
          extra={<Button type="primary">刷新</Button>}
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}