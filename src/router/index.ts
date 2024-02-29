import { createRouter, type RouteRecordRaw } from "vue-router";
import { flatMultiLevelRoutes, history } from "./helper";
import routeSettings from "@/config/route";

const Layouts = () => import("@/layouts/index.vue");

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 * 给常驻路由的404和403设置name, 可能会导致刷新页面进入404
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/views/register/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
          elIcon: "HomeFilled",
          affix: true
        }
      }
    ]
  }
];

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    name: "LoginUser",
    path: "/login-user",
    component: Layouts,
    redirect: "/login-user/user-info",
    meta: {
      title: "当前用户",
      hidden: true,
      roles: ["user"] // 可以在根路由中设置角色
    },
    children: [
      {
        name: "UserInfo",
        path: "user-info",
        component: () => import("@/views/user-info/index.vue"),
        meta: {
          title: "用户信息"
        }
      }
    ]
  },
  {
    name: "Itf",
    path: "/itf",
    component: Layouts,
    redirect: "/itf/itf-manage",
    meta: {
      title: "接口管理",
      elIcon: "Paperclip"
      // roles: ["admin"] // 可以在根路由中设置角色
      // alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        name: "ItfManage",
        path: "itf-manage",
        component: () => import("@/views/itf/index.vue"),
        meta: {
          elIcon: "Paperclip",
          title: "接口数据",
          keepAlive: true
        }
      },
      {
        name: "ItfInfo",
        path: "itf-info",
        component: () => import("@/views/itf/info/index.vue"),
        meta: {
          title: "接口信息",
          hidden: true,
          activeMenu: "/itf/itf-manage"
        }
      }
    ]
  },
  {
    name: "Document",
    path: "/document",
    component: Layouts,
    redirect: "/document/invoke-document",
    meta: {
      title: "文档数据",
      elIcon: "Document"
    },
    children: [
      {
        name: "invokeDocument",
        path: "invoke-document",
        component: () => import("@/views/document/index.vue"),
        meta: {
          title: "使用文档",
          elIcon: "Document"
        }
      }
    ]
  },
  {
    name: "User",
    path: "/user",
    component: Layouts,
    redirect: "/user/user-manage",
    meta: {
      title: "用户数据",
      elIcon: "Avatar",
      roles: ["admin"] // 可以在根路由中设置角色
    },
    children: [
      {
        name: "UserManage",
        path: "user-manage",
        component: () => import("@/views/user/index.vue"),
        meta: {
          title: "用户管理",
          elIcon: "Avatar",
          keepAlive: true
        }
      }
    ]
  },
  {
    name: "ErrorPage",
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    meta: {
      hidden: true
    }
  }
];

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache
    ? flatMultiLevelRoutes(constantRoutes)
    : constantRoutes
});

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach(route => {
      const { name, meta } = route;
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload();
  }
}

export default router;
