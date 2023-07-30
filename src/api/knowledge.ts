// chat_file.ts

import { api } from './api'

export const uploadFile = async (file: File, knowledgeBaseId: any) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('knowledge_base_id', knowledgeBaseId)

  return api({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/local_doc_qa/upload_file',
    method: 'post',
    data: formData
  })
}
export const getFileList = async (knowledgeBaseId: any) => {
  return api({
    url: '/local_doc_qa/list_files',
    method: 'get',
    params: {
      knowledgeBaseId
    }
  })
}

export const deleteFile = async (fileId: any) => {
  return api({
    url: '/local_doc_qa/delete_file',
    method: 'delete',
    params: {
      fileId
    }
  })
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
export const deletefile = (params: any) => {
  return api({
    url: '/local_doc_qa/delete_file',
    method: 'delete',
    params
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
export const getKbsList = () => {
  return api({
    url: '/local_doc_qa/list_knowledge_base',
    method: 'get'
  })
}
