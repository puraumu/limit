var limit = require('./')
  , num = 0

/**
 * Use "DEBUG=limit mocha test"
 */

describe('limit', function() {

  beforeEach(function() {
    // console.log('#' + num + ' begins')
    num++
  })

  describe('when `release` is invoked', function() {
    it('should decrement active member if no arguments are passed', function() {
      limit(function(release) {
        release()
      })
    })
  })

  describe('when active member is smaller than the max', function() {
    // it('should invoke the callback immediately', function() {
      // var c = 0
      // limit('foo', function(obj, release) {
        // obj.should.eql(c)
        // c++
      // })
      // limit.do('hoge', function(release) {
        // var len = 3
        // for (var i = 0; i < len; i++) {
          // release('foo', i)
        // };
      // })
      // limit.start('hoge')
    // })
  })

  describe('when active member is lager than the max', function() {
    it('should store the item', function(done) {
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

    // it('should invoke stored item and decrement active member if `release` is called', function(done) {
      // var c = 0
        // , len = 8
      // limit.do('foo', function(obj, release) {
        // setTimeout(function() {
          // release()
        // }, 20);
        // c++;
        // if (c == len) done();
      // })
      // limit.do('hoge', function(release) {
        // for (var i = 0; i < len; i++) {
          // release('foo', '#' + i)
        // };
      // })
      // limit.start('hoge')
    // })

  })

})
