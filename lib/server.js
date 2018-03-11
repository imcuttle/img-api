'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _port = require('./port');

var _port2 = _interopRequireDefault(_port);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */

_app2.default.listen(_port2.default, function () {
  console.log('img-api run on port: http://localhost:%d', _port2.default);
});