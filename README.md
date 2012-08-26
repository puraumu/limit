# Limit

Limits the number of function to be called at the same time.

``` javascript
var len = 8

for (var i = 0; i < len; i++) {
  limit(i, function(index, release) {
    console.log('#' + index);
  })
};

// #0
// #1
// #2
// #3
// #4
// no message unless `release()`
```

Becase `limit` limits number of function to 5 by default, the index form 5 will not appear. So release it.


``` javascript
var len = 8

for (var i = 0; i < len; i++) {
  limit(i, function(index, release) {
    console.log('#' + index);
    setTimeout(function() {
      release()
    }, 20)
  })
};

// #0
// #1
// #2
// #3
// #4

// 20ms passed and then:
// #5
// #6
// #7
```
