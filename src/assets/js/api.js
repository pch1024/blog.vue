import http from './request'

export const Login = (data = {}) => {
  return http({
    url: '/api/login',
    method: 'POST',
    type: 'json',
    data
  })
}

export const EditDoc = (data = {}) => {
  return http({
    url: '/api/editDoc',
    method: 'POST',
    type: 'json',
    data
  })
}

export const docList = (data = {}) => {
  return http({
    url: '/api/docList',
    method: 'POST',
    type: 'json',
    data
  })
}
export const deleteDoc = (params = {}) => {
  return http({
    url: `/api/deleteDoc/${params.id}`,
    method: 'GET',
    type: 'json'
  })
}

export const doc = (params = {}) => {
  return http({
    url: `/api/doc/${params.id}`,
    method: 'GET',
    type: 'json'
  })
}
