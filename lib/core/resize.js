'use strict';

exports.__esModule = true;
exports.default = resize;

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _concatStream = require('concat-stream');

var _concatStream2 = _interopRequireDefault(_concatStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file resize
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
function resize(buffer) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _query$w = query.w,
      w = _query$w === undefined ? 10 : _query$w,
      _query$h = query.h,
      h = _query$h === undefined ? 10 : _query$h;

  var resizeStream = (0, _sharp2.default)(buffer).resize(parseInt(w), parseInt(h));

  return new Promise(function (resolve, reject) {
    resizeStream.on('error', function (err) {
      reject(err);
    });
    resizeStream.pipe((0, _concatStream2.default)(function (buffer) {
      resolve(buffer);
    }));
  });
}