import axios, { type AxiosResponse } from 'axios'

const service = axios.create({
  baseURL: '127.0.0.0.1:8000'
})

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) { return response }

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
