'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('./utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file app
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
var app = (0, _express2.default)();

function ensureRequire(path) {
  var exp = require(path);
  return exp.default || exp;
}

// Read core
var coreDir = _path2.default.join(__dirname, 'core');
var coreList = _fs2.default.readdirSync(coreDir);
var actions = {};
coreList.filter(function (core) {
  return ['.js'].includes(_path2.default.extname(core));
}).forEach(function (name) {
  var action = name.replace(/\.[^.]+?$/, '');
  actions[action] = ensureRequire(_path2.default.join(coreDir, name));
});

app.all('/', function (req, res, next) {
  res.type('html');
  res.status(500).send('<html>\n<head>\n<title>Img API</title>\n<style></style>\n</head>\n<body>\n<h3>welcome to img api!</h3>\n<div>\n  <a href="/resize">have a try</a>\n</div>\n</body>\n</html>');
});
app.all('/:action/**', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var _req$params, action, imgUrl, process, imgReq, imgResponse;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, action = _req$params.action, imgUrl = _req$params[0];
            process = actions[action];

            if (process) {
              _context.next = 5;
              break;
            }

            next(new Error('illegal action: ' + action + '. supporting ' + Object.keys(actions) + ' currently.'));
            return _context.abrupt('return');

          case 5:
            imgReq = (0, _request2.default)(imgUrl, {
              headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
              }
            });
            _context.next = 8;
            return imgReq;

          case 8:
            imgResponse = _context.sent;

            res.status(imgResponse.status);
            Object.keys(imgResponse.headers).forEach(function (name) {
              res.set(name, imgResponse.headers[name]);
            });
            _context.prev = 11;
            _context.t0 = res;
            _context.next = 15;
            return process(imgResponse.body, req.query);

          case 15:
            _context.t1 = _context.sent;

            _context.t0.send.call(_context.t0, _context.t1);

            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t2 = _context['catch'](11);

            next(_context.t2);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[11, 19]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// error
app.use(function (error, req, res, next) {
  if (!(error instanceof Error)) {
    next();
  }
  res.type('html');
  res.status(500).send('<html>\n<head>\n<title>Img API Error</title>\n<style></style>\n</head>\n<body>\n<h3>' + error.message + '</h3>\n<pre>' + error.stack + '</pre>\n</body>\n</html>');
});

exports.default = app;