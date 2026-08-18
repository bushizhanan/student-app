import { defineStore } from 'pinia'

// 用户信息类型，严格对齐后端返回字段
export type UserData = {
  id: number
  name: string
  age: string
  email: string
  phone: string
  role: string
  avatar: string | null
  birth: string
  created_at: string
  gender: string
}

export type UserInfo = {
  data: UserData
}

export const useAlertsStore = defineStore('alerts', {
  state: () => ({
    token: '',
    userInfo: null as UserInfo | null
  }),

  getters: {
    // 判断是否登录
    isLogin: (state): boolean => !!state.userInfo
  },

  actions: {
    /**
     * 从localStorage加载用户（页面刷新调用）
     */
    loadUser() {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          this.userInfo = JSON.parse(userStr) as UserInfo
        } catch (e) {
          this.clearUser()
        }
      }
    },

    /**
     * 设置用户信息，同时持久化到localStorage
     * @param info 真实用户对象 {id,name,gender...}
     */
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      localStorage.setItem('user', JSON.stringify(info))
    },

    /**
     * 清空登录状态，退出登录
     */
    clearUser() {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('user')
    }
  }
})