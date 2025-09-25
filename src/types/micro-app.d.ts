/**
 * micro-app 相关类型声明
 */

declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__?: boolean
    microApp?: {
      addDataListener: (callback: (data: any) => void) => void
      removeDataListener: (callback: (data: any) => void) => void
      getData: () => any
      dispatch: (data: any) => void
    }
  }
}

export {}
