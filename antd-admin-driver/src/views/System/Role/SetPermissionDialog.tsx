import { Form, Input, Modal, Tree, TreeProps } from "antd";
import { useEffect, useImperativeHandle, useState } from "react";
import { message } from '@/components/AntdGlobal'
import { IAction, IModalProp } from "@/types/modal";
import { IMenu, IRole } from "@/types/modules/api";
import roleApi from "@/api/roleApi";
import api from "@/api";



export default function CreateRoleDialog(props: IModalProp) {
  const [visible, setVisible] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<IMenu.MenuItem[]>();
  const [roleInfo, setRoleInfo] = useState<IRole.RoleItem>();
  const [permission, setPermission] = useState<IRole.Permission>();

  // react文档不推荐这样open modal 而且 文档还是和forwardRef一起使用
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (type: IAction, data?: IRole.RoleItem) => {
    setVisible(true)

    // 编辑时
    if (type === 'edit' && data) {
      setRoleInfo(data)
      // 回显tree已选中keys
      setCheckedKeys(data.permissionList.checkedKeys)
    }
  }

  // 获取菜单列表
  useEffect(() => {
    getMenuList()
  }, []);
  const getMenuList = async () => {
    const menuList = await api.getMenuList()
    setMenuList(menuList)
  }


  // Tree 的子及都勾选了，父级自动勾选
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue, item: any) => {
    // 用户受控组件状态
    setCheckedKeys(checkedKeysValue as string[])
    // 接口权限
    const checkedKeys: string[] = []
    const parentKeys: string[] = []

    item.checkedNodes.forEach((node: IMenu.MenuItem) => {
      // 默认末级都是按钮类型了，根据按钮类型做判断，严谨吗，如果没有查看、操作编辑呢
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })

    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys: checkedKeys,
        halfCheckedKeys: parentKeys
      }
    })
  }

  // 提交
  const handleSubmit = async () => {
    if (permission) {
      // const params = { }
      roleApi.updatePermission(permission)
      message.success('设置成功')

      handleCancel()
      props.update()
    }
  }
  // 取消
  const handleCancel = () => {
    setVisible(false)
    setPermission(undefined)
  }

  return (
    <Modal
      title={'设置权限'}
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      {/* labelCol 设置 label 宽度  */}
      {/* Form.Item 的 name 属性就不需要了，name 可用于验证登 */}
      <Form labelCol={{ span: 4 }} labelAlign="right" >
        <Form.Item
          label="角色名称"
        >
          {roleInfo?.roleName}
        </Form.Item>

        <Form.Item
          label="权限"
        >
          {/* 受控组件，只有更新 checkedKeys 才能改变 Tree的状态 */}
          <Tree
            checkable
            defaultExpandAll
            fieldNames={{
              title: 'menuName',
              key: '_id',
              children: 'children'
            }}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          />
        </Form.Item>
      </Form>
    </Modal >
  )
}