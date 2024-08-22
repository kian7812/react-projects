import { Suspense } from 'react';

// 不起作用，貌似不是这样定义

export default function LazyLoad(props: any) {
  console.log(props);
  return (
    <Suspense fallback={<h2>加载中....</h2>}>
      {props.children}
    </Suspense>
  );
}
