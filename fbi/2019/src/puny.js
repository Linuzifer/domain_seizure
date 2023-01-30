/**
 * Copyright (C) 2011 by Ben Noordhuis <info@bnoordhuis.nl>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var TMIN = 1
var TMAX = 26
var BASE = 36
var SKEW = 38
var DAMP = 700 // initial bias scaler
var INITIAL_N = 128
var INITIAL_BIAS = 72

function adaptBias (delta, nPoints, isFirst) {
  // scale back, then increase delta
  delta /= isFirst ? DAMP : 2
  delta += ~~(delta / nPoints)

  var s = (BASE - TMIN)
  var t = ~~((s * TMAX) / 2) // threshold=455

  for (var k = 0; delta > t; k += BASE) {
    delta = ~~(delta / s)
  }

  var a = (BASE - TMIN + 1) * delta
  var b = (delta + SKEW)

  return k + ~~(a / b)
}

function decodeDigit (d) {
  if (d >= 48 && d <= 57) {
    return d - 22 // 0..9
  }
  if (d >= 65 && d <= 90) {
    return d - 65 // A..Z
  }
  if (d >= 97 && d <= 122) {
    return d - 97 // a..z
  }
  throw new Error('Illegal digit #' + d)
}

function threshold (k, bias) {
  if (k <= bias + TMIN) {
    return TMIN
  }
  if (k >= bias + TMAX) {
    return TMAX
  }
  return k - bias
}

function decode (input) {
  if (typeof input !== 'string') {
    throw new Error('Argument must be a string.')
  }

  // find basic code points/delta separator
  var b = 1 + input.lastIndexOf('-')

  input = input.split('').map(function (c) {
    return c.charCodeAt(0)
  })

  // start with a copy of the basic code points
  var output = input.slice(0, b ? (b - 1) : 0)

  var n = INITIAL_N
  var bias = INITIAL_BIAS

  for (var i = 0, len = input.length; b < len; ++i) {
    var orgI = i

    for (var k = BASE, w = 1; ; k += BASE) {
      var d = decodeDigit(input[b++])

      // TODO overflow check
      i += d * w

      var t = threshold(k, bias)
      if (d < t) {
        break
      }

      // TODO overflow check
      w *= BASE - t
    }

    var x = 1 + output.length
    bias = adaptBias(i - orgI, x, orgI === 0)
    // TODO overflow check
    n += ~~(i / x)
    i %= x

    output.splice(i, 0, n)
  }

  return String.fromCharCode.apply(String, output)
}

function punyDecodeDomain (domain) {
  var domainArray = domain.split('.')
  var outputArray = []
  for (var i = 0; i < domainArray.length; ++i) {
    var s = domainArray[i]
    outputArray.push(s.match(/^xn--/) ? decode(s.slice(4)) : s)
  }
  return outputArray.join('.')
}

