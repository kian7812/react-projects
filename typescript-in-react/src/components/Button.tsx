import React, { ComponentProps, useRef, useState } from "react";

// Button
type Color = "blue" | "red" | "green" | "yellow" | "purple"

type ButtonProps = {
  backgroundColor: Color;
  textColor: Color;
  fontSize: number;
  pillShape?: boolean;
  padding: [number, number, number, number] // tuple
}

export default function Button({
  backgroundColor,
  fontSize,
  // pillShape,
  textColor,
  padding
}: ButtonProps) {

  return (
    <button style={{
      backgroundColor: backgroundColor,
      color: textColor,
      fontSize: fontSize,
      padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`
    }}>
      Click
    </button>
  )
}

// ButtonA
type ButtonAProps = {
  style: {
    backgroundColor: string;
    fontSize: number;
    textColor: string;
  }
}

export function ButtonA({ style }: ButtonAProps) {
  return (
    <button style={style}>
      Click A
    </button>
  )
}

// ButtonB
type ButtonBProps = {
  style: React.CSSProperties
}
export function ButtonB({ style }: ButtonBProps) {
  return (
    <button style={style}>
      Click B
    </button>
  )
}

// ButtonC
type ButtonCProps = {
  borderRadius: Record<string, number>
}
export function ButtonC({ borderRadius }: ButtonCProps) {
  return (
    <button style={{
      ...borderRadius,
      backgroundColor: 'blue'
    }}>
      Click C
    </button >
  )
}

// ButtonD
type ButtonDProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export function ButtonD({ onClick }: ButtonDProps) {
  return (
    <button
      onClick={onClick}
    >
      Click D
    </button >
  )
}

// ButtonE
type ButtonEProps = {
  children: React.ReactNode // 范围大包含元素和文本
}
export function ButtonE({ children }: ButtonEProps) {
  return (
    <button>
      {children}
    </button >
  )
}

// ButtonF
// 'ButtonF' components don't accept text as child elements. Text in JSX has the type 'string', but the expected type of 'children' is 'Element'.
type ButtonFProps = {
  children: JSX.Element // 只能是元素
}
export function ButtonF({ children }: ButtonFProps) {
  return (
    <button>
      {children}
    </button >
  )
}

// ButtonG
type ButtonGProps = {
  setCount: React.Dispatch<React.SetStateAction<number>> // useState 的 set 类型，鼠标浮动到定义的地方查看
}
export function ButtonG({ setCount }: ButtonGProps) {
  setCount(1)
  return (
    <button>
      ButtonG
    </button >
  )
}

// ButtonH 参数有默认值，那类型就是默认值类型
export function ButtonH({ name = "H" }) {
  return (
    <button>
      ButtonH{name}
    </button >
  )
}

// ButtonI
// ComponentProps 包含html元素、组件的类型 👍🏻
// Used to retrieve the props a component accepts. Can either be passed a string, 
// indicating a DOM element (e.g. 'div', 'span', etc.) or the type of a React component.

// It's usually better to use ComponentPropsWithRef or ComponentPropsWithoutRef instead of this type, 
// as they let you be explicit about whether or not to include the ref prop.
type ButtonIProps = ComponentProps<'button'>
// type ButtonIProps = ComponentProps<'img'>
// type ButtonIProps = ComponentProps<'a'>
export function ButtonI({ type, autoFocus }: ButtonIProps) {
  return (
    <button type={type} autoFocus={autoFocus}>
      ButtonI
    </button >
  )
}

// ButtonJ
// React.ComponentProps 包含html元素、组件的类型 👍🏻
// Used to retrieve the props a component accepts. Can either be passed a string, 
// indicating a DOM element (e.g. 'div', 'span', etc.) or the type of a React component.

// It's usually better to use ComponentPropsWithRef or ComponentPropsWithoutRef instead of this type, 
// as they let you be explicit about whether or not to include the ref prop.
type ButtonJProps = React.ComponentProps<'button'>
// type ButtonJProps = React.ComponentProps<'img'>
// type ButtonJProps = React.ComponentProps<'a'>
export function ButtonJ({ type, autoFocus, ref }: ButtonJProps) {
  return (
    <button ref={ref} type={type} autoFocus={autoFocus}>
      ButtonJ
    </button >
  )
}

// ButtonK
// 剩余参数、扩展类型
type ButtonKProps = React.ComponentProps<'button'> & {
  variant?: "primary" | "secondary"
}

export function ButtonK({ type, autoFocus, ...rest }: ButtonKProps) {
  return (
    <button type={type} autoFocus={autoFocus} {...rest}>
      ButtonK
    </button >
  )
}

// ButtonL
// 扩展类型
type ButtonLProps = {
  type: "button" | "submit" | "reest";
  color: "red" | "blue" | "green"
}

type SuperButtonLProps = ButtonLProps & {
  size: "md" | "large";
}
// or
// interface ButtonLProps {
//   type: "button" | "submit" | "reest";
//   color: "red" | "blue" | "green"
// }

// interface SuperButtonLProps extends ButtonLProps {
//   size: "md" | "large";
// }

export function ButtonL(props: SuperButtonLProps) {
  console.log(props);

  return (
    <button>
      ButtonL
    </button >
  )
}

// ButtonM
// 事件对象e类型：浮动到 onClick={(e) => {}} 的e上查看并复制
export function ButtonM() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e);
  }
  return (
    <button onClick={handleClick}>
      ButtonM
    </button >
  )
}

// ButtonN
// useState 类型
type ButtonNUser = {
  name: string;
  age: number
}
export function ButtonN() {
  // const [count, setCount] = useState(0) // 初始参数定义类型
  // const [count, setCount] = useState<number>(0) // 或者手动定义，有时没必要
  const [user,] = useState<ButtonNUser | null>(null)  // 定义对象类型
  const name = user?.name
  const age = user?.age

  return (
    <button>
      ButtonN{`${name}${age}`}
    </button >
  )
}

// ButtonO
// useRef 类型
export function ButtonO() {
  // const ref = useRef(null)
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <button ref={ref}>
      ButtonO
    </button >
  )
}

// useContent 单独视频，或看 那个文档

// ButtonP
// as const 作用：作为具体类型，只读不能修改。
// const ButtonPButtonOptions: readonly ["hello", "typescript", "react"]
const ButtonPButtonOptions = [
  "hello",
  "typescript",
  "react"
] as const
// as 
type ButtonPButtonColor = "red" | "blue" | "green";
export function ButtonP() {
  // const preButtonColor: ButtonPButtonColor
  const preButtonColor = localStorage.getItem('button-color') as ButtonPButtonColor
  console.log(preButtonColor);


  return (
    <button>
      {ButtonPButtonOptions.map((option) => {
        return option
      })}
    </button >
  )
}

// 泛型T
// 在tsx文件里要加 , 😁
// const converToArray = <T,>(value: T): T[] => {
//   return [value]
// }
// function 不用加 ,
function converToArray<T>(value: T): T[] {
  return [value]
}
console.log(converToArray); // 飘红


// ButtonQ
// 泛型：相关联的类型
type ButtonQProps<T> = {
  countValue: T;
  countHistory: T[];
}
// 正确 <ButtonQ countValue={1}  countHistory={[1, true, 'a']} />
// (property) countValue: string | number | boolean
// 报错 <ButtonQ countValue={{a:1}}  countHistory={[1, true, 'a']} />
export function ButtonQ<T>({ countValue, countHistory }: ButtonQProps<T>) {
  console.log(countValue, countHistory); // 飘红

  return (
    <button>
      ButtonQ
    </button >
  )
}

// 导入标记类型
// import {type Color} from './type.ts'

// 接口返回data标记类型为 unknown，不用 any，意思确实不清楚
// 也可用zod进行类型验证
// .then((data:unknown) => {})
// 或使用 ts-reset 包，默认返回数据自动加上 unknown


// 类型文件在哪里
// 在 node_modules/@type/**  react | node | react-dom | json5

