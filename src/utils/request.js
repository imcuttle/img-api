/**
 * @file request
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
import superagent from 'superagent'

export default function request(url, options = {}) {
  let { method = 'get', data, headers } = options
  method = method.toUpperCase()
  const request = superagent(method, url)
  if (headers) {
    Object.keys(headers)
      .forEach(function (name) {
        request.set(name, headers[name])
      })
  }
  if (data) {
    if (method === 'GET') {
      request.query(data)
    }
    else {
      request.send(data)
    }
  }

  return request
}
