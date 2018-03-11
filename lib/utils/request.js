'use strict';

exports.__esModule = true;
exports.default = request;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$method = options.method,
      method = _options$method === undefined ? 'get' : _options$method,
      data = options.data,
      headers = options.headers;

  method = method.toUpperCase();
  var request = (0, _superagent2.default)(method, url);
  if (headers) {
    Object.keys(headers).forEach(function (name) {
      request.set(name, headers[name]);
    });
  }
  if (data) {
    if (method === 'GET') {
      request.query(data);
    } else {
      request.send(data);
    }
  }

  return request;
} /**
   * @file request
   * @author Cuttle Cong
   * @date 2018/3/11
   * @description
   */