import {ref} from "vue"
import store from "@/store"
import {defineStore} from "pinia"
import {usePermissionStore} from "./permission"
import {useTagsViewStore} from "./tags-view"
import {useSettingsStore} from "./settings"
import {getToken, removeToken, setToken} from "@/utils/cache/cookies"
import router, {resetRouter} from "@/router"
import {type RouteRecordRaw} from "vue-router"
import {LoginForm, UserVO} from "@/api/login/type";
import {reqLogin, reqLoginUser, reqLogout} from "@/api/login";
import {BaseResponse} from "../../../types/api";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const loginUser = ref<UserVO>()

  const permissionStore = usePermissionStore()
  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }

  /** 登录 */
  const login = async (loginForm: LoginForm) => {
    const res: BaseResponse<string> = await reqLogin(loginForm)
    setToken(res.data)
    token.value = res.data
  }

  /** 获取用户详情 */
  const getLoginUser = async () => {
    const {data} = await reqLoginUser()
    loginUser.value = data

    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = [data.role];
  }

  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getLoginUser()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    _resetTagsView()
  }

  /** 登出 */
  const logout = async () => {
    await reqLogout()
    resetToken()
    resetRouter()
    _resetTagsView()
  }

  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return {token, loginUser, roles, setRoles, login, getLoginUser, changeRoles, logout, resetToken}
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
