/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */

import app from './app'
import port from './port'

app.listen(port, () => {
  console.log('img-api run on port: http://localhost:%d', port)
})
