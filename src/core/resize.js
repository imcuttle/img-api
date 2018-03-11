/**
 * @file resize
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
import sharp from 'sharp'
import size from 'image-size'
import concat from 'concat-stream'

export default async function resize(buffer, query = {}) {
  let { w, h, s = 1 } = query

  if (!w && !h && s) {
    const { width, height } = size(buffer)
    w = s * width
    h = s * height
  }
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
