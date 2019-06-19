import TCHttp from 'http/http-client'

export function getModuleList(userId) {
  const url = '/api/menu/module-list'
  return TCHttp.get(url, {
    userId
  })
}
