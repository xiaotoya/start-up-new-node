import axios, { AxiosError } from "axios"
import { checkErrorStatus } from "./checkErrorStatus"
import { RequstInterceptors } from "./type"
import { retry } from "./axiosRetry"
import { AxiosMax } from "./Axios"

// 继承了我们在最开始实现的抽象类RequstInterceptors，主要关心responseInterceptorsCatch内容
const _RequstInterceptors: RequstInterceptors = {
    requestInterceptors(config) {
        return config
    },
    requestInterceptorsCatch(err) {
        return err
    },
    responseInterceptor(config) {
        return config
    },
    responseInterceptorsCatch(axiosInstance, err: AxiosError) {
        let message = err.code === 'ECONNABORTED' ? '请求超时' : undefined
        // 判断本次请求是否已经被取消
        if (axios.isCancel(err)) {
            return Promise.reject(err);
        }
        // 检查响应状态码
        checkErrorStatus((err as AxiosError).response?.status, message, (message) => console.log(message))

        // 响应错误实现重连功能
        return retry(axiosInstance, err as AxiosError)
    },
}
const httpRequest = new AxiosMax({
    directlyGetData: true,
    baseURL: 'http://localhost:3000/',
    timeout: 3000,
    interceptors: _RequstInterceptors,
    abortRepetitiveRequest: true,
    retryConfig: {
        count: 5,
        waitTime: 500
    }
})
export default httpRequest;