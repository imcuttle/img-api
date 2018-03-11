/**
 * @file resize
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
import sharp from 'sharp'
import concat from 'concat-stream'

export default function resize(buffer, query = {}) {
  const { w = 10, h = 10 } = query
  const resizeStream = sharp(buffer).resize(parseInt(w), parseInt(h))

  return new Promise((resolve, reject) => {
    resizeStream.on('error', function (err) {
      reject(err)
    })
    resizeStream.pipe(concat(function (buffer) {
      resolve(buffer)
    }))
  })
}
