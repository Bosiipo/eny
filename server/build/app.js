"use strict";

require("@babel/polyfill");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.get('/api/rates', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, base, currency, exchangeRates, response, results;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, base = _req$query.base, currency = _req$query.currency;

            if (base) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(404).json('Base value is required!'));

          case 3:
            if (currency) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(404).json('Currency value(s) are required!'));

          case 5:
            _context.next = 7;
            return (0, _nodeFetch.default)("https://api.exchangeratesapi.io/latest/?base=".concat(base, "&currency=").concat(currency));

          case 7:
            exchangeRates = _context.sent;
            _context.next = 10;
            return exchangeRates.json();

          case 10:
            response = _context.sent;
            results = {
              base: response.base,
              date: response.date,
              rates: response.rates
            };

            if (!response.error) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(404).json(response.error));

          case 14:
            return _context.abrupt("return", res.status(200).json({
              results: results
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.listen(process.env.PORT, function () {
  return console.log("App is running on PORT ".concat(process.env.PORT));
});