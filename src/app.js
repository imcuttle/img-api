/**
 * @file app
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
import express from 'express'
import fs from 'fs'
import nps from 'path'
import nurl from 'url'
import request from './utils/request'

const app = express()

function ensureRequire(path) {
  const exp = require(path)
  return exp.default || exp
}

// Read core
const coreDir = nps.join(__dirname, 'core')
const coreList = fs.readdirSync(coreDir)
const actions = {}
coreList
  .filter(core => ['.js'].includes(nps.extname(core)))
  .forEach(name => {
    const action = name.replace(/\.[^.]+?$/, '')
    actions[action] = ensureRequire(nps.join(coreDir, name))
  })

app.all('/', function (req, res, next) {
  res.type('html')
  res.status(500)
     .send(`<html>
<head>
<title>Img API</title>
<style></style>
</head>
<body>
<h3>Welcome to img api!</h3>
<div>
  <a href="/resize/http://cdn.leoh.io/images/base_zero/image_198.jpg">Have a try</a>
</div>
</body>
</html>`)
})
app.all('/:action/**', async function (req, res, next) {
  let { action, 0: imgUrl } = req.params
  imgUrl = decodeURIComponent(imgUrl)
  // console.log(imgUrl)
  const process = actions[action]
  if (!process) {
    next(new Error('illegal action: ' + action + '. supporting ' + Object.keys(actions) + ' currently.'))
    return
  }
  const imgReq = request(imgUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
      'host': nurl.parse(imgUrl).host,
      'accept': '*/*'
    }
  })
  let imgResponse
  try {
    imgResponse = await imgReq
    res.status(imgResponse.status)
    Object
      .keys(imgResponse.headers)
      .forEach(function (name) {
        res.set(name, imgResponse.headers[name])
      })
    res.send(await process(imgResponse.body, req.query))
  } catch (err) {
    err.req = imgReq
    err.res = imgResponse
    next(err)
  }
})

// error
app.use(function (error, req, res, next) {
  if (!(
      error instanceof Error
    )) {
    next()
  }
  res.type('html')
  res.status(500)
     .send(`<html>
<head>
<title>Img API Error</title>
<style></style>
</head>
<body>
<h3>${error.message}</h3>
${error.req ? `<pre>${JSON.stringify(error.req, null, 2)}</pre>` : ''}
${error.res ? `<pre>${JSON.stringify(error.res, null, 2)}</pre>` : ''}
<pre>${error.stack}</pre>
</body>
</html>`)
})

export default app
