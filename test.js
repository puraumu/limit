var limit = require('./')
  , num = 0

/**
 * Use "DEBUG=limit mocha test"
 */

describe('limit', function() {

  beforeEach(function() {
    limit.reset()
    console.log('#' + num + ' begins')
    num++
  })

  describe('when `release` is invoked', function() {
    it('should decrement active member if no arguments are passed', function() {
      limit('hoge', function(hoge, release) {
        release()
      })
    })
  })

  describe('when active member is smaller than the max', function() {
    it('should invoke the callback immediately', function() {
      var len = 3
      for (var i = 0; i < len; i++) {
        limit('foo', function(foo, release) {
          release();
        })
      };
    })
  })

  describe('when active member is lager than the max', function() {
    it('should store the item', function() {
      var len = 8
        , time = 20
      for (var i = 0; i < len; i++) {
        limit(i, function(index, release) {
          console.log('#' + index);
        })
      };
    })

    it('should invoke stored function if `release` is called', function(done) {
      var len = 8
        , time = 20
      for (var i = 0; i < len; i++) {
        limit(i, function(index, release) {
          console.log('#' + index);
          setTimeout(function() {
            release()
          }, time)
        })
        if (i == len - 1) {
          setTimeout(function() {
            done()
          }, time * len);
        };
      };
    })
  })

})
