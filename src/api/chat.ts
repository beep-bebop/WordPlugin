import { api } from './api'

export const chat = (params: any) => {
  return api({
    url: '/chat',
    method: 'post',
    data: JSON.stringify(params)
  })
}
export const chatfile = (params: any) => {
  return api({
    url: '/local_doc_qa/local_doc_chat',
    method: 'post',
    data: JSON.stringify(params)
  })
}
export const bingSearch = (params: any) => {
  return api({
    url: '/local_doc_qa/bing_search_chat',
    method: 'post',
    data: JSON.stringify(params)

  })
}
export const webUrl = () => {
  return window.location.origin
}
export const setapi = () => {
  return '127.0.0.1:8000'
}
