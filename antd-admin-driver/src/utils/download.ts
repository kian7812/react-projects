
// ✅比较完整的文件下载方法
export default function downloadFile(response: any, fileName = '下载文件.xlsx') {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
  // 返回 Blob: {size: 15308, type: 'application/vnd.openxmlformats'}
  const resBlob = response.data // 可根据实际情况调整，先这样
  const blob = new Blob([resBlob], { type: resBlob.type })
  // 可与后端定好，文件名放到头信息里，一般情况后端不给加
  const name = response.headers['fileName'] as string || fileName
  const link = document.createElement('a') // 创建a标签
  // a标签需要有download属性，可作为文件名称
  link.download = decodeURIComponent(name) // 放置名称乱码
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link) // 添加到body
  link.click() // 模拟点击
  document.body.removeChild(link) // 下载后删除a标签
  // 最后注意，要释放这个文件，Blob 可能比较大，会很占用内存
  window.URL.revokeObjectURL(link.href)
};

// ✅ URL.createObjectURL 可做图片预览等
