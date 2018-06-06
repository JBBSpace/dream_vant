
export default {
  // 全局路径
  apiServer: 'http://192.168.1.193:9000',
  imageServer: '/',
  // 本地存储
  setStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  getStorage (name) {
    if (!name) return
    let content = window.localStorage.getItem(name)
    return JSON.parse(content)
  },
  removeStorage (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}
