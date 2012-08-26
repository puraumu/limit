
/**
 * Module dependencies.
 */

var debug = require('debug')('limit')

/**
 * Expose `limit`
 */

 exports = module.exports = limit;

/**
 * Max number of function to called at the same time.
 */

exports.max = 5;

/**
 * Reset counters.
 */

exports.reset = function() {
  callback = null;
  pending = [];
  active = 0;
  return this;
}

/**
 * Limits the number of function to be called at the same time. All
 * arguments are preserved and passed to the callback which is passed
 * to `limit`. The last argument is `release`. This function will
 * invoke itself.
 *
 * The `max` controls functions number which work at the same
 * time. If the number of functions exceed `max`, functions are
 * stored in `pending`. By passing no arguments to `release` continue
 * to invoke stored function.
 *
 */

var callback
  , pending = []
  , active = 0

function limit() {
  var len = arguments.length
  if (!len) {
    if (pending.length) {
      var req = pending.shift();
      debug('shifted');
      req.fn.apply(this, req.args)
    };
    active--;
    debug('active: ' + active);
    if (active == 0) {
      debug('end?');
      exports.reset();
    }
    return;
  };

  var fn = arguments[len - 1]
    , args = [].slice.call(arguments, 0, len - 1).concat(limit)

  if (callback) fn = callback;
  else callback = fn;

  active++;

  if (exports.max < active) {
    pending.push({fn: fn, args: args});
    debug('pushed');
    return;
  };

  fn.apply(this, args);
};

