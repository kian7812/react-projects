import { IAuthLoader } from "@/router/AuthLoader";
import { useUserInfoStore } from "@/store";
import { Button } from "antd";
import { useRouteLoaderData } from "react-router-dom";

export default function AuthButton(props: any) {
  const data = useRouteLoaderData('layout') as IAuthLoader // ✅ 没有泛型只能做强转换
  const role = useUserInfoStore((state) => state.userInfo.role)

  // 不需要判断权限，直接返回Button
  if (!props.auth) return <Button {...props}>{props.children}</Button>

  // 需要权限判断，且有权限，或管理员 role 1
  if (data.buttonList.includes(props.auth) || role === 1) return <Button {...props}>{props.children}</Button>

  // 没有权限
  return <></>
};
