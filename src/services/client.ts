import axios, { AxiosError, AxiosResponse } from 'axios'

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 0
})


const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response.data.result
}

const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response?.status === 404) {
    window.location.href = '/404'
  }
  return Promise.reject(error)
}

client.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
)
