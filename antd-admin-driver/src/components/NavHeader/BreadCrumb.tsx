import { IAuthLoader } from "@/router/AuthLoader";
import { findTreeNode } from "@/utils/tools";
import { Breadcrumb } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useRouteLoaderData } from "react-router-dom";

export default function BreadCrumb() {
  const [breadList, setBreadList] = useState<(string | ReactNode)[]>();
  const { pathname } = useLocation()

  // 权限数据
  const data = useRouteLoaderData('layout') as IAuthLoader

  useEffect(() => {
    const list = findTreeNode(data.menuList, pathname, [])
    setBreadList([<a href="/welcome" />, ...list])
  }, [])

  return (
    <Breadcrumb
      items={breadList?.map(o => ({ title: o }))}
      style={{ marginLeft: 10 }}
    />
  )
};
