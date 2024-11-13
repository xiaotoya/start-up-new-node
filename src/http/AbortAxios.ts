import { AxiosRequestConfig } from "axios"

// 用于存储控制器
const pendingMap = new Map<string, AbortController>()

// 创建各请求唯一标识, 返回值类似：'/api:get'，后续作为pendingMap的key
const getUrl = (config: AxiosRequestConfig) => {
    return [config.url, config.method].join(':')
}

class AbortAxios {
    // 添加控制器
    addPending(config: AxiosRequestConfig) {
        this.removePending(config)
        const url = getUrl(config)
        // 创建控制器实例
        const abortController = new AbortController()
        // 定义对应signal标识
        config.signal = abortController.signal
        if (!pendingMap.has(url)) {
            pendingMap.set(url, abortController)
        }
    }
    // 清除重复请求
    removePending(config: AxiosRequestConfig) {
        const url = getUrl(config)
        if (pendingMap.has(url)) {
            // 获取对应请求的控制器实例
            const abortController = pendingMap.get(url)
            // 取消请求
            abortController?.abort()
            // 清除出pendingMap
            pendingMap.delete(url)
        }
    }
}

export default AbortAxios