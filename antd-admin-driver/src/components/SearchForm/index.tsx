import { Button, Form, Space } from 'antd';

export default function SearchForm(props: any) {
  return (
    <Form
      className='searchForm'
      form={props.form}
      name='searchForm'
      layout='inline'
      initialValues={props.initialValues}>
      {props.children}
      <Form.Item>
        <Space>
          <Button type='primary' onClick={props.submit}>
            搜索
          </Button>
          <Button onClick={props.reset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
