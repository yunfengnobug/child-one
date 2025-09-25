/**
 * 微前端统一路由处理工具
 * 支持自动检测路由模式，最小化配置
 */
import type { Router } from 'vue-router'

/**
 * 统一的微前端路由处理函数
 * 自动检测并适配 history 和 hash 路由模式
 */
export function setupMicroAppRouter(router: Router) {
  // 只在微前端环境中运行
  if (!window.__MICRO_APP_ENVIRONMENT__) {
    return
  }

  /**
   * 自动检测路由模式
   */
  function detectRouteMode(): 'history' | 'hash' {
    const history = router.options.history
    if (history && typeof history === 'object') {
      const historyType = history.constructor.name
      if (historyType.includes('Hash') || historyType.includes('hash')) {
        return 'hash'
      }
    }
    return 'history'
  }

  const routeMode = detectRouteMode()

  /**
   * 标准化路由路径
   */
  function normalizeRoute(route: string): string {
    if (!route.startsWith('/')) {
      route = '/' + route
    }
    // 移除可能的 hash 符号
    if (route.includes('#')) {
      route = route.split('#')[1] || '/'
    }
    return route
  }

  /**
   * 执行路由跳转
   */
  function navigateToRoute(targetRoute: string) {
    try {
      const normalizedRoute = normalizeRoute(targetRoute)

      // 检查路由是否存在
      const matchedRoute = router.resolve(normalizedRoute)
      if (matchedRoute && matchedRoute.name !== 'NotFound') {
        // 检查是否需要跳转
        const currentPath = router.currentRoute.value.path
        if (currentPath !== normalizedRoute) {
          router.push(normalizedRoute).catch(() => {
            // 忽略路由跳转错误
          })
        }
      }
    } catch (error) {
      // 忽略路由处理错误
    }
  }

  // 设置路由监听器
  window.microApp?.addDataListener((data: any) => {
    if (data.targetRoute && typeof data.targetRoute === 'string') {
      navigateToRoute(data.targetRoute)
    }
  })

  // 处理初始路由
  const initialData = window.microApp?.getData()
  if (initialData?.targetRoute) {
    navigateToRoute(initialData.targetRoute)
  }
}

/**
 * 类型声明
 */
declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__?: boolean
    __MICRO_APP_BASE_ROUTE__?: string
    microApp?: {
      addDataListener: (callback: (data: any) => void) => void
      getData: () => any
      setData: (data: any) => void
    }
  }
}

export default setupMicroAppRouter
