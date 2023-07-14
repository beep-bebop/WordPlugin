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

export const getKbsList = () => {
  return api({
    url: '/local_doc_qa/list_knowledge_base',
    method: 'get'

  })
}

export const deleteKb = (knowledgeBaseId: any) => {
  return api({
    url: '/local_doc_qa/delete_knowledge_base',
    method: 'delete',
    params: {
      knowledgeBaseId
    }
  })
}

export const getfilelist = (knowledgeBaseId: any) => {
  return api({
    url: '/local_doc_qa/list_files',
    method: 'get',
    params: { knowledgeBaseId }

  })
}
export const bingSearch = (params: any) => {
  return api({
    url: '/local_doc_qa/bing_search_chat',
    method: 'post',
    data: JSON.stringify(params)

  })
}
export const deletefile = (params: any) => {
  return api({
    url: '/local_doc_qa/delete_file',
    method: 'delete',
    params
  })
}
export const webUrl = () => {
  return window.location.origin
}
export const setapi = () => {
  return '127.0.0.1:8000'
}
export const getkblist = () => {
  return api({
    url: '/local_doc_qa/list_knowledge_base',
    method: 'get',
    params: {}

  })
}
export const deletekb = (params: any) => {
  return api({
    url: '/local_doc_qa/delete_knowledge_base',
    method: 'post',
    data: JSON.stringify(params)
  })
}
