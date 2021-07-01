
/*!
  * Bootstrap v4.5.2 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, (function (exports, $, Popper) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
  Popper = Popper && Object.prototype.hasOwnProperty.call(Popper, 'default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.2): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.5.2';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + CLASS_NAME_ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(EVENT_CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(CLASS_NAME_SHOW);

      if (!$(element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(EVENT_CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.5.2';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_BUTTON = '.btn';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }

            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;

    if (!$(button).hasClass(CLASS_NAME_BUTTON)) {
      button = $(button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      if (initialButton.tagName !== 'LABEL' || inputBtn && inputBtn.type !== 'checkbox') {
        Button._jQueryInterface.call($(button), 'toggle');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(SELECTOR_BUTTON)[0];
    $(button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $(window).on(EVENT_LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.5.2';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $(this._element).on(EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $.Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $(indicators).removeClass(CLASS_NAME_ACTIVE$1);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(CLASS_NAME_SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE$1);
          $(activeElement).removeClass(CLASS_NAME_ACTIVE$1 + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(CLASS_NAME_ACTIVE$1);
        $(nextElement).addClass(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _extends({}, Default, $(this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $(target).data(), $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(EVENT_LOAD_DATA_API$1, function () {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.5.2';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$1));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(CLASS_NAME_SHOW$1)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(EVENT_SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var startEvent = $.Event(EVENT_HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(CLASS_NAME_SHOW$1)) {
              $(trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(CLASS_NAME_SHOW$1);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _extends({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.5.2';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = $(this._menu).hasClass(CLASS_NAME_SHOW$2);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED) || $(this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(EVENT_SHOW$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $(parent).toggleClass(CLASS_NAME_SHOW$2).trigger($.Event(EVENT_SHOWN$1, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(CLASS_NAME_DISABLED) || !$(this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(EVENT_HIDE$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $(this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $(parent).toggleClass(CLASS_NAME_SHOW$2).trigger($.Event(EVENT_HIDDEN$1, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $(this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($(this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(CLASS_NAME_SHOW$2)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(EVENT_HIDE$1, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $(dropdownMenu).removeClass(CLASS_NAME_SHOW$2);
        $(parent).removeClass(CLASS_NAME_SHOW$2).trigger($.Event(EVENT_HIDDEN$1, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || $(this).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(CLASS_NAME_SHOW$2);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          $(parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
        return $(item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$4 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.5.2';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$3 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(CLASS_NAME_FADE$1)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(EVENT_MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(EVENT_HIDE$2);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(CLASS_NAME_FADE$1);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(EVENT_FOCUSIN);
      $(this._element).removeClass(CLASS_NAME_SHOW$3);
      $(this._element).off(EVENT_CLICK_DISMISS);
      $(this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      $(document).off(EVENT_FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $.Event(EVENT_HIDE_PREVENTED);
        $(this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.defaultPrevented) {
          return;
        }

        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._element).off(Util.TRANSITION_END);
        $(this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            $(_this3._element).one(Util.TRANSITION_END, function () {
              _this3._element.style.overflowY = '';
            }).emulateTransitionEnd(_this3._element, modalTransitionDuration);
          }
        }).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $(this._element).hasClass(CLASS_NAME_FADE$1);
      var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      if ($(this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(CLASS_NAME_SHOW$3);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $(_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $(document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
      .on(EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this6.hide();
          } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $(window).on(EVENT_RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $(window).off(EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(CLASS_NAME_OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $(_this8._element).trigger(EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $(this._element).hasClass(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(EVENT_CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this9._triggerBackdropTransition();
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(CLASS_NAME_SHOW$3);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(CLASS_NAME_SHOW$3);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(CLASS_NAME_FADE$1)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _extends({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _extends({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(EVENT_SHOW$2, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(EVENT_HIDDEN$2, function () {
        if ($(_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.2): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.5.2';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var Event = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(CLASS_NAME_SHOW$4)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(CLASS_NAME_FADE$2);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $(tip).addClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(CLASS_NAME_FADE$2)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($(this.tip).hasClass(CLASS_NAME_FADE$2)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(CLASS_NAME_FADE$2 + " " + CLASS_NAME_SHOW$4);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $(_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(CLASS_NAME_SHOW$4) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(CLASS_NAME_FADE$2);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.5.2';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$5);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.5.2';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE$2);
        $link.addClass(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$2); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE$2); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE$2);
      }

      $(this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(EVENT_LOAD_DATA_API$2, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.5.2';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$2 = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(CLASS_NAME_ACTIVE$3) || $(this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(SELECTOR_NAV_LIST_GROUP$1)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$2;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(EVENT_HIDE$3, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(EVENT_SHOWN$3, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(SELECTOR_ACTIVE_UL) : $(container).children(SELECTOR_ACTIVE$2);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(CLASS_NAME_FADE$4);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(CLASS_NAME_SHOW$6).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(CLASS_NAME_ACTIVE$3);
        var dropdownChild = $(active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$4)) {
        element.classList.add(CLASS_NAME_SHOW$6);
      }

      if (element.parentNode && $(element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(SELECTOR_DROPDOWN$1)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE$1));
          $(dropdownToggleList).addClass(CLASS_NAME_ACTIVE$3);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.5.2';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $.Event(EVENT_SHOW$4);
      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$5);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$7);

        $(_this._element).trigger(EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      Util.reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var hideEvent = $.Event(EVENT_HIDE$4);
      $(this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        this._element.classList.remove(CLASS_NAME_SHOW$7);
      }

      $(this._element).off(EVENT_CLICK_DISMISS$1);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $(this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        $(_this3._element).trigger(EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map

/*!
 * jQuery Smooth Scroll - v2.0.0 - 2016-07-31
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2016 Karl Swedberg
 * Licensed MIT
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {

  var version = '2.0.0';
  var optionOverrides = {};
  var defaults = {
    exclude: [],
    excludeWithin: [],
    offset: 0,

    // one of 'top' or 'left'
    direction: 'top',

    // if set, bind click events through delegation
    //  supported since jQuery 1.4.2
    delegateSelector: null,

    // jQuery set of elements you wish to scroll (for $.smoothScroll).
    //  if null (default), $('html, body').firstScrollable() is used.
    scrollElement: null,

    // only use if you want to override default behavior
    scrollTarget: null,

    // fn(opts) function to be called before scrolling occurs.
    // `this` is the element(s) being scrolled
    beforeScroll: function() {},

    // fn(opts) function to be called after scrolling occurs.
    // `this` is the triggering element
    afterScroll: function() {},

    // easing name. jQuery comes with "swing" and "linear." For others, you'll need an easing plugin
    // from jQuery UI or elsewhere
    easing: 'swing',

    // speed can be a number or 'auto'
    // if 'auto', the speed will be calculated based on the formula:
    // (current scroll position - target scroll position) / autoCoeffic
    speed: 400,

    // coefficient for "auto" speed
    autoCoefficient: 2,

    // $.fn.smoothScroll only: whether to prevent the default click action
    preventDefault: true
  };

  var getScrollable = function(opts) {
    var scrollable = [];
    var scrolled = false;
    var dir = opts.dir && opts.dir === 'left' ? 'scrollLeft' : 'scrollTop';

    this.each(function() {
      var el = $(this);

      if (this === document || this === window) {
        return;
      }

      if (document.scrollingElement && (this === document.documentElement || this === document.body)) {
        scrollable.push(document.scrollingElement);

        return false;
      }

      if (el[dir]() > 0) {
        scrollable.push(this);
      } else {
        // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
        el[dir](1);
        scrolled = el[dir]() > 0;

        if (scrolled) {
          scrollable.push(this);
        }
        // then put it back, of course
        el[dir](0);
      }
    });

    if (!scrollable.length) {
      this.each(function() {
        // If no scrollable elements and <html> has scroll-behavior:smooth because
        // "When this property is specified on the root element, it applies to the viewport instead."
        // and "The scroll-behavior property of the … body element is *not* propagated to the viewport."
        // → https://drafts.csswg.org/cssom-view/#propdef-scroll-behavior
        if (this === document.documentElement && $(this).css('scrollBehavior') === 'smooth') {
          scrollable = [this];
        }

        // If still no scrollable elements, fall back to <body>,
        // if it's in the jQuery collection
        // (doing this because Safari sets scrollTop async,
        // so can't set it to 1 and immediately get the value.)
        if (!scrollable.length && this.nodeName === 'BODY') {
          scrollable = [this];
        }
      });
    }

    // Use the first scrollable element if we're calling firstScrollable()
    if (opts.el === 'first' && scrollable.length > 1) {
      scrollable = [scrollable[0]];
    }

    return scrollable;
  };

  $.fn.extend({
    scrollable: function(dir) {
      var scrl = getScrollable.call(this, {dir: dir});

      return this.pushStack(scrl);
    },
    firstScrollable: function(dir) {
      var scrl = getScrollable.call(this, {el: 'first', dir: dir});

      return this.pushStack(scrl);
    },

    smoothScroll: function(options, extra) {
      options = options || {};

      if (options === 'options') {
        if (!extra) {
          return this.first().data('ssOpts');
        }

        return this.each(function() {
          var $this = $(this);
          var opts = $.extend($this.data('ssOpts') || {}, extra);

          $(this).data('ssOpts', opts);
        });
      }

      var opts = $.extend({}, $.fn.smoothScroll.defaults, options);

      var clickHandler = function(event) {
        var escapeSelector = function(str) {
          return str.replace(/(:|\.|\/)/g, '\\$1');
        };

        var link = this;
        var $link = $(this);
        var thisOpts = $.extend({}, opts, $link.data('ssOpts') || {});
        var exclude = opts.exclude;
        var excludeWithin = thisOpts.excludeWithin;
        var elCounter = 0;
        var ewlCounter = 0;
        var include = true;
        var clickOpts = {};
        var locationPath = $.smoothScroll.filterPath(location.pathname);
        var linkPath = $.smoothScroll.filterPath(link.pathname);
        var hostMatch = location.hostname === link.hostname || !link.hostname;
        var pathMatch = thisOpts.scrollTarget || (linkPath === locationPath);
        var thisHash = escapeSelector(link.hash);

        if (thisHash && !$(thisHash).length) {
          include = false;
        }

        if (!thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash)) {
          include = false;
        } else {
          while (include && elCounter < exclude.length) {
            if ($link.is(escapeSelector(exclude[elCounter++]))) {
              include = false;
            }
          }

          while (include && ewlCounter < excludeWithin.length) {
            if ($link.closest(excludeWithin[ewlCounter++]).length) {
              include = false;
            }
          }
        }

        if (include) {
          if (thisOpts.preventDefault) {
            event.preventDefault();
          }

          $.extend(clickOpts, thisOpts, {
            scrollTarget: thisOpts.scrollTarget || thisHash,
            link: link
          });

          $.smoothScroll(clickOpts);
        }
      };

      if (options.delegateSelector !== null) {
        this
        .off('click.smoothscroll', options.delegateSelector)
        .on('click.smoothscroll', options.delegateSelector, clickHandler);
      } else {
        this
        .off('click.smoothscroll')
        .on('click.smoothscroll', clickHandler);
      }

      return this;
    }
  });

  $.smoothScroll = function(options, px) {
    if (options === 'options' && typeof px === 'object') {
      return $.extend(optionOverrides, px);
    }
    var opts, $scroller, scrollTargetOffset, speed, delta;
    var scrollerOffset = 0;
    var offPos = 'offset';
    var scrollDir = 'scrollTop';
    var aniProps = {};
    var aniOpts = {};

    if (typeof options === 'number') {
      opts = $.extend({link: null}, $.fn.smoothScroll.defaults, optionOverrides);
      scrollTargetOffset = options;
    } else {
      opts = $.extend({link: null}, $.fn.smoothScroll.defaults, options || {}, optionOverrides);

      if (opts.scrollElement) {
        offPos = 'position';

        if (opts.scrollElement.css('position') === 'static') {
          opts.scrollElement.css('position', 'relative');
        }
      }
    }

    scrollDir = opts.direction === 'left' ? 'scrollLeft' : scrollDir;

    if (opts.scrollElement) {
      $scroller = opts.scrollElement;

      if (!(/^(?:HTML|BODY)$/).test($scroller[0].nodeName)) {
        scrollerOffset = $scroller[scrollDir]();
      }
    } else {
      $scroller = $('html, body').firstScrollable(opts.direction);
    }

    // beforeScroll callback function must fire before calculating offset
    opts.beforeScroll.call($scroller, opts);

    scrollTargetOffset = (typeof options === 'number') ? options :
                          px ||
                          ($(opts.scrollTarget)[offPos]() &&
                          $(opts.scrollTarget)[offPos]()[opts.direction]) ||
                          0;

    aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;
    speed = opts.speed;

    // automatically calculate the speed of the scroll based on distance / coefficient
    if (speed === 'auto') {

      // $scroller[scrollDir]() is position before scroll, aniProps[scrollDir] is position after
      // When delta is greater, speed will be greater.
      delta = Math.abs(aniProps[scrollDir] - $scroller[scrollDir]());

      // Divide the delta by the coefficient
      speed = delta / opts.autoCoefficient;
    }

    aniOpts = {
      duration: speed,
      easing: opts.easing,
      complete: function() {
        opts.afterScroll.call(opts.link, opts);
      }
    };

    if (opts.step) {
      aniOpts.step = opts.step;
    }

    if ($scroller.length) {
      $scroller.stop().animate(aniProps, aniOpts);
    } else {
      opts.afterScroll.call(opts.link, opts);
    }
  };

  $.smoothScroll.version = version;
  $.smoothScroll.filterPath = function(string) {
    string = string || '';

    return string
      .replace(/^\//, '')
      .replace(/(?:index|default).[a-zA-Z]{3,4}$/, '')
      .replace(/\/$/, '');
  };

  // default options
  $.fn.smoothScroll.defaults = defaults;

}));


/*!
 * SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global jQuery
		factory(jQuery);
	}
} (function($) {

	var menuTrees = [],
		mouse = false, // optimize for touch by default - we will detect for mouse input
		touchEvents = 'ontouchstart' in window, // we use this just to choose between toucn and pointer events, not for touch screen detection
		mouseDetectionEnabled = false,
		requestAnimationFrame = window.requestAnimationFrame || function(callback) { return setTimeout(callback, 1000 / 60); },
		cancelAnimationFrame = window.cancelAnimationFrame || function(id) { clearTimeout(id); },
		canAnimate = !!$.fn.animate;

	// Handle detection for mouse input (i.e. desktop browsers, tablets with a mouse, etc.)
	function initMouseDetection(disable) {
		var eNS = '.smartmenus_mouse';
		if (!mouseDetectionEnabled && !disable) {
			// if we get two consecutive mousemoves within 2 pixels from each other and within 300ms, we assume a real mouse/cursor is present
			// in practice, this seems like impossible to trick unintentianally with a real mouse and a pretty safe detection on touch devices (even with older browsers that do not support touch events)
			var firstTime = true,
				lastMove = null,
				events = {
					'mousemove': function(e) {
						var thisMove = { x: e.pageX, y: e.pageY, timeStamp: new Date().getTime() };
						if (lastMove) {
							var deltaX = Math.abs(lastMove.x - thisMove.x),
								deltaY = Math.abs(lastMove.y - thisMove.y);
		 					if ((deltaX > 0 || deltaY > 0) && deltaX <= 2 && deltaY <= 2 && thisMove.timeStamp - lastMove.timeStamp <= 300) {
								mouse = true;
								// if this is the first check after page load, check if we are not over some item by chance and call the mouseenter handler if yes
								if (firstTime) {
									var $a = $(e.target).closest('a');
									if ($a.is('a')) {
										$.each(menuTrees, function() {
											if ($.contains(this.$root[0], $a[0])) {
												this.itemEnter({ currentTarget: $a[0] });
												return false;
											}
										});
									}
									firstTime = false;
								}
							}
						}
						lastMove = thisMove;
					}
				};
			events[touchEvents ? 'touchstart' : 'pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut'] = function(e) {
				if (isTouchEvent(e.originalEvent)) {
					mouse = false;
				}
			};
			$(document).on(getEventsNS(events, eNS));
			mouseDetectionEnabled = true;
		} else if (mouseDetectionEnabled && disable) {
			$(document).off(eNS);
			mouseDetectionEnabled = false;
		}
	}

	function isTouchEvent(e) {
		return !/^(4|mouse)$/.test(e.pointerType);
	}

	// returns a jQuery on() ready object
	function getEventsNS(events, eNS) {
		if (!eNS) {
			eNS = '';
		}
		var eventsNS = {};
		for (var i in events) {
			eventsNS[i.split(' ').join(eNS + ' ') + eNS] = events[i];
		}
		return eventsNS;
	}

	$.SmartMenus = function(elm, options) {
		this.$root = $(elm);
		this.opts = options;
		this.rootId = ''; // internal
		this.accessIdPrefix = '';
		this.$subArrow = null;
		this.activatedItems = []; // stores last activated A's for each level
		this.visibleSubMenus = []; // stores visible sub menus UL's (might be in no particular order)
		this.showTimeout = 0;
		this.hideTimeout = 0;
		this.scrollTimeout = 0;
		this.clickActivated = false;
		this.focusActivated = false;
		this.zIndexInc = 0;
		this.idInc = 0;
		this.$firstLink = null; // we'll use these for some tests
		this.$firstSub = null; // at runtime so we'll cache them
		this.disabled = false;
		this.$disableOverlay = null;
		this.$touchScrollingSub = null;
		this.cssTransforms3d = 'perspective' in elm.style || 'webkitPerspective' in elm.style;
		this.wasCollapsible = false;
		this.init();
	};

	$.extend($.SmartMenus, {
		hideAll: function() {
			$.each(menuTrees, function() {
				this.menuHideAll();
			});
		},
		destroy: function() {
			while (menuTrees.length) {
				menuTrees[0].destroy();
			}
			initMouseDetection(true);
		},
		prototype: {
			init: function(refresh) {
				var self = this;

				if (!refresh) {
					menuTrees.push(this);

					this.rootId = (new Date().getTime() + Math.random() + '').replace(/\D/g, '');
					this.accessIdPrefix = 'sm-' + this.rootId + '-';

					if (this.$root.hasClass('sm-rtl')) {
						this.opts.rightToLeftSubMenus = true;
					}

					// init root (main menu)
					var eNS = '.smartmenus';
					this.$root
						.data('smartmenus', this)
						.attr('data-smartmenus-id', this.rootId)
						.dataSM('level', 1)
						.on(getEventsNS({
							'mouseover focusin': $.proxy(this.rootOver, this),
							'mouseout focusout': $.proxy(this.rootOut, this),
							'keydown': $.proxy(this.rootKeyDown, this)
						}, eNS))
						.on(getEventsNS({
							'mouseenter': $.proxy(this.itemEnter, this),
							'mouseleave': $.proxy(this.itemLeave, this),
							'mousedown': $.proxy(this.itemDown, this),
							'focus': $.proxy(this.itemFocus, this),
							'blur': $.proxy(this.itemBlur, this),
							'click': $.proxy(this.itemClick, this)
						}, eNS), 'a');

					// hide menus on tap or click outside the root UL
					eNS += this.rootId;
					if (this.opts.hideOnClick) {
						$(document).on(getEventsNS({
							'touchstart': $.proxy(this.docTouchStart, this),
							'touchmove': $.proxy(this.docTouchMove, this),
							'touchend': $.proxy(this.docTouchEnd, this),
							// for Opera Mobile < 11.5, webOS browser, etc. we'll check click too
							'click': $.proxy(this.docClick, this)
						}, eNS));
					}
					// hide sub menus on resize
					$(window).on(getEventsNS({ 'resize orientationchange': $.proxy(this.winResize, this) }, eNS));

					if (this.opts.subIndicators) {
						this.$subArrow = $('<span/>').addClass('sub-arrow');
						if (this.opts.subIndicatorsText) {
							this.$subArrow.html(this.opts.subIndicatorsText);
						}
					}

					// make sure mouse detection is enabled
					initMouseDetection();
				}

				// init sub menus
				this.$firstSub = this.$root.find('ul').each(function() { self.menuInit($(this)); }).eq(0);

				this.$firstLink = this.$root.find('a').eq(0);

				// find current item
				if (this.opts.markCurrentItem) {
					var reDefaultDoc = /(index|default)\.[^#\?\/]*/i,
						reHash = /#.*/,
						locHref = window.location.href.replace(reDefaultDoc, ''),
						locHrefNoHash = locHref.replace(reHash, '');
					this.$root.find('a').each(function() {
						var href = this.href.replace(reDefaultDoc, ''),
							$this = $(this);
						if (href == locHref || href == locHrefNoHash) {
							$this.addClass('current');
							if (self.opts.markCurrentTree) {
								$this.parentsUntil('[data-smartmenus-id]', 'ul').each(function() {
									$(this).dataSM('parent-a').addClass('current');
								});
							}
						}
					});
				}

				// save initial state
				this.wasCollapsible = this.isCollapsible();
			},
			destroy: function(refresh) {
				if (!refresh) {
					var eNS = '.smartmenus';
					this.$root
						.removeData('smartmenus')
						.removeAttr('data-smartmenus-id')
						.removeDataSM('level')
						.off(eNS);
					eNS += this.rootId;
					$(document).off(eNS);
					$(window).off(eNS);
					if (this.opts.subIndicators) {
						this.$subArrow = null;
					}
				}
				this.menuHideAll();
				var self = this;
				this.$root.find('ul').each(function() {
						var $this = $(this);
						if ($this.dataSM('scroll-arrows')) {
							$this.dataSM('scroll-arrows').remove();
						}
						if ($this.dataSM('shown-before')) {
							if (self.opts.subMenusMinWidth || self.opts.subMenusMaxWidth) {
								$this.css({ width: '', minWidth: '', maxWidth: '' }).removeClass('sm-nowrap');
							}
							if ($this.dataSM('scroll-arrows')) {
								$this.dataSM('scroll-arrows').remove();
							}
							$this.css({ zIndex: '', top: '', left: '', marginLeft: '', marginTop: '', display: '' });
						}
						if (($this.attr('id') || '').indexOf(self.accessIdPrefix) == 0) {
							$this.removeAttr('id');
						}
					})
					.removeDataSM('in-mega')
					.removeDataSM('shown-before')
					.removeDataSM('scroll-arrows')
					.removeDataSM('parent-a')
					.removeDataSM('level')
					.removeDataSM('beforefirstshowfired')
					.removeAttr('role')
					.removeAttr('aria-hidden')
					.removeAttr('aria-labelledby')
					.removeAttr('aria-expanded');
				this.$root.find('a.has-submenu').each(function() {
						var $this = $(this);
						if ($this.attr('id').indexOf(self.accessIdPrefix) == 0) {
							$this.removeAttr('id');
						}
					})
					.removeClass('has-submenu')
					.removeDataSM('sub')
					.removeAttr('aria-haspopup')
					.removeAttr('aria-controls')
					.removeAttr('aria-expanded')
					.closest('li').removeDataSM('sub');
				if (this.opts.subIndicators) {
					this.$root.find('span.sub-arrow').remove();
				}
				if (this.opts.markCurrentItem) {
					this.$root.find('a.current').removeClass('current');
				}
				if (!refresh) {
					this.$root = null;
					this.$firstLink = null;
					this.$firstSub = null;
					if (this.$disableOverlay) {
						this.$disableOverlay.remove();
						this.$disableOverlay = null;
					}
					menuTrees.splice($.inArray(this, menuTrees), 1);
				}
			},
			disable: function(noOverlay) {
				if (!this.disabled) {
					this.menuHideAll();
					// display overlay over the menu to prevent interaction
					if (!noOverlay && !this.opts.isPopup && this.$root.is(':visible')) {
						var pos = this.$root.offset();
						this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
							position: 'absolute',
							top: pos.top,
							left: pos.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight(),
							zIndex: this.getStartZIndex(true),
							opacity: 0
						}).appendTo(document.body);
					}
					this.disabled = true;
				}
			},
			docClick: function(e) {
				if (this.$touchScrollingSub) {
					this.$touchScrollingSub = null;
					return;
				}
				// hide on any click outside the menu or on a menu link
				if (this.visibleSubMenus.length && !$.contains(this.$root[0], e.target) || $(e.target).closest('a').length) {
					this.menuHideAll();
				}
			},
			docTouchEnd: function(e) {
				if (!this.lastTouch) {
					return;
				}
				if (this.visibleSubMenus.length && (this.lastTouch.x2 === undefined || this.lastTouch.x1 == this.lastTouch.x2) && (this.lastTouch.y2 === undefined || this.lastTouch.y1 == this.lastTouch.y2) && (!this.lastTouch.target || !$.contains(this.$root[0], this.lastTouch.target))) {
					if (this.hideTimeout) {
						clearTimeout(this.hideTimeout);
						this.hideTimeout = 0;
					}
					// hide with a delay to prevent triggering accidental unwanted click on some page element
					var self = this;
					this.hideTimeout = setTimeout(function() { self.menuHideAll(); }, 350);
				}
				this.lastTouch = null;
			},
			docTouchMove: function(e) {
				if (!this.lastTouch) {
					return;
				}
				var touchPoint = e.originalEvent.touches[0];
				this.lastTouch.x2 = touchPoint.pageX;
				this.lastTouch.y2 = touchPoint.pageY;
			},
			docTouchStart: function(e) {
				var touchPoint = e.originalEvent.touches[0];
				this.lastTouch = { x1: touchPoint.pageX, y1: touchPoint.pageY, target: touchPoint.target };
			},
			enable: function() {
				if (this.disabled) {
					if (this.$disableOverlay) {
						this.$disableOverlay.remove();
						this.$disableOverlay = null;
					}
					this.disabled = false;
				}
			},
			getClosestMenu: function(elm) {
				var $closestMenu = $(elm).closest('ul');
				while ($closestMenu.dataSM('in-mega')) {
					$closestMenu = $closestMenu.parent().closest('ul');
				}
				return $closestMenu[0] || null;
			},
			getHeight: function($elm) {
				return this.getOffset($elm, true);
			},
			// returns precise width/height float values
			getOffset: function($elm, height) {
				var old;
				if ($elm.css('display') == 'none') {
					old = { position: $elm[0].style.position, visibility: $elm[0].style.visibility };
					$elm.css({ position: 'absolute', visibility: 'hidden' }).show();
				}
				var box = $elm[0].getBoundingClientRect && $elm[0].getBoundingClientRect(),
					val = box && (height ? box.height || box.bottom - box.top : box.width || box.right - box.left);
				if (!val && val !== 0) {
					val = height ? $elm[0].offsetHeight : $elm[0].offsetWidth;
				}
				if (old) {
					$elm.hide().css(old);
				}
				return val;
			},
			getStartZIndex: function(root) {
				var zIndex = parseInt(this[root ? '$root' : '$firstSub'].css('z-index'));
				if (!root && isNaN(zIndex)) {
					zIndex = parseInt(this.$root.css('z-index'));
				}
				return !isNaN(zIndex) ? zIndex : 1;
			},
			getTouchPoint: function(e) {
				return e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e;
			},
			getViewport: function(height) {
				var name = height ? 'Height' : 'Width',
					val = document.documentElement['client' + name],
					val2 = window['inner' + name];
				if (val2) {
					val = Math.min(val, val2);
				}
				return val;
			},
			getViewportHeight: function() {
				return this.getViewport(true);
			},
			getViewportWidth: function() {
				return this.getViewport();
			},
			getWidth: function($elm) {
				return this.getOffset($elm);
			},
			handleEvents: function() {
				return !this.disabled && this.isCSSOn();
			},
			handleItemEvents: function($a) {
				return this.handleEvents() && !this.isLinkInMegaMenu($a);
			},
			isCollapsible: function() {
				return this.$firstSub.css('position') == 'static';
			},
			isCSSOn: function() {
				return this.$firstLink.css('display') != 'inline';
			},
			isFixed: function() {
				var isFixed = this.$root.css('position') == 'fixed';
				if (!isFixed) {
					this.$root.parentsUntil('body').each(function() {
						if ($(this).css('position') == 'fixed') {
							isFixed = true;
							return false;
						}
					});
				}
				return isFixed;
			},
			isLinkInMegaMenu: function($a) {
				return $(this.getClosestMenu($a[0])).hasClass('mega-menu');
			},
			isTouchMode: function() {
				return !mouse || this.opts.noMouseOver || this.isCollapsible();
			},
			itemActivate: function($a, hideDeeperSubs) {
				var $ul = $a.closest('ul'),
					level = $ul.dataSM('level');
				// if for some reason the parent item is not activated (e.g. this is an API call to activate the item), activate all parent items first
				if (level > 1 && (!this.activatedItems[level - 2] || this.activatedItems[level - 2][0] != $ul.dataSM('parent-a')[0])) {
					var self = this;
					$($ul.parentsUntil('[data-smartmenus-id]', 'ul').get().reverse()).add($ul).each(function() {
						self.itemActivate($(this).dataSM('parent-a'));
					});
				}
				// hide any visible deeper level sub menus
				if (!this.isCollapsible() || hideDeeperSubs) {
					this.menuHideSubMenus(!this.activatedItems[level - 1] || this.activatedItems[level - 1][0] != $a[0] ? level - 1 : level);
				}
				// save new active item for this level
				this.activatedItems[level - 1] = $a;
				if (this.$root.triggerHandler('activate.smapi', $a[0]) === false) {
					return;
				}
				// show the sub menu if this item has one
				var $sub = $a.dataSM('sub');
				if ($sub && (this.isTouchMode() || (!this.opts.showOnClick || this.clickActivated))) {
					this.menuShow($sub);
				}
			},
			itemBlur: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				this.$root.triggerHandler('blur.smapi', $a[0]);
			},
			itemClick: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (this.$touchScrollingSub && this.$touchScrollingSub[0] == $a.closest('ul')[0]) {
					this.$touchScrollingSub = null;
					e.stopPropagation();
					return false;
				}
				if (this.$root.triggerHandler('click.smapi', $a[0]) === false) {
					return false;
				}
				var subArrowClicked = $(e.target).is('.sub-arrow'),
					$sub = $a.dataSM('sub'),
					firstLevelSub = $sub ? $sub.dataSM('level') == 2 : false,
					collapsible = this.isCollapsible(),
					behaviorToggle = /toggle$/.test(this.opts.collapsibleBehavior),
					behaviorLink = /link$/.test(this.opts.collapsibleBehavior),
					behaviorAccordion = /^accordion/.test(this.opts.collapsibleBehavior);
				// if the sub is hidden, try to show it
				if ($sub && !$sub.is(':visible')) {
					if (!behaviorLink || !collapsible || subArrowClicked) {
						if (this.opts.showOnClick && firstLevelSub) {
							this.clickActivated = true;
						}
						// try to activate the item and show the sub
						this.itemActivate($a, behaviorAccordion);
						// if "itemActivate" showed the sub, prevent the click so that the link is not loaded
						// if it couldn't show it, then the sub menus are disabled with an !important declaration (e.g. via mobile styles) so let the link get loaded
						if ($sub.is(':visible')) {
							this.focusActivated = true;
							return false;
						}
					}
				// if the sub is visible and we are in collapsible mode
				} else if (collapsible && (behaviorToggle || subArrowClicked)) {
					this.itemActivate($a, behaviorAccordion);
					this.menuHide($sub);
					if (behaviorToggle) {
						this.focusActivated = false;
					}
					return false;
				}
				if (this.opts.showOnClick && firstLevelSub || $a.hasClass('disabled') || this.$root.triggerHandler('select.smapi', $a[0]) === false) {
					return false;
				}
			},
			itemDown: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				$a.dataSM('mousedown', true);
			},
			itemEnter: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (!this.isTouchMode()) {
					if (this.showTimeout) {
						clearTimeout(this.showTimeout);
						this.showTimeout = 0;
					}
					var self = this;
					this.showTimeout = setTimeout(function() { self.itemActivate($a); }, this.opts.showOnClick && $a.closest('ul').dataSM('level') == 1 ? 1 : this.opts.showTimeout);
				}
				this.$root.triggerHandler('mouseenter.smapi', $a[0]);
			},
			itemFocus: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				// fix (the mousedown check): in some browsers a tap/click produces consecutive focus + click events so we don't need to activate the item on focus
				if (this.focusActivated && (!this.isTouchMode() || !$a.dataSM('mousedown')) && (!this.activatedItems.length || this.activatedItems[this.activatedItems.length - 1][0] != $a[0])) {
					this.itemActivate($a, true);
				}
				this.$root.triggerHandler('focus.smapi', $a[0]);
			},
			itemLeave: function(e) {
				var $a = $(e.currentTarget);
				if (!this.handleItemEvents($a)) {
					return;
				}
				if (!this.isTouchMode()) {
					$a[0].blur();
					if (this.showTimeout) {
						clearTimeout(this.showTimeout);
						this.showTimeout = 0;
					}
				}
				$a.removeDataSM('mousedown');
				this.$root.triggerHandler('mouseleave.smapi', $a[0]);
			},
			menuHide: function($sub) {
				if (this.$root.triggerHandler('beforehide.smapi', $sub[0]) === false) {
					return;
				}
				if (canAnimate) {
					$sub.stop(true, true);
				}
				if ($sub.css('display') != 'none') {
					var complete = function() {
						// unset z-index
						$sub.css('z-index', '');
					};
					// if sub is collapsible (mobile view)
					if (this.isCollapsible()) {
						if (canAnimate && this.opts.collapsibleHideFunction) {
							this.opts.collapsibleHideFunction.call(this, $sub, complete);
						} else {
							$sub.hide(this.opts.collapsibleHideDuration, complete);
						}
					} else {
						if (canAnimate && this.opts.hideFunction) {
							this.opts.hideFunction.call(this, $sub, complete);
						} else {
							$sub.hide(this.opts.hideDuration, complete);
						}
					}
					// deactivate scrolling if it is activated for this sub
					if ($sub.dataSM('scroll')) {
						this.menuScrollStop($sub);
						$sub.css({ 'touch-action': '', '-ms-touch-action': '', '-webkit-transform': '', transform: '' })
							.off('.smartmenus_scroll').removeDataSM('scroll').dataSM('scroll-arrows').hide();
					}
					// unhighlight parent item + accessibility
					$sub.dataSM('parent-a').removeClass('highlighted').attr('aria-expanded', 'false');
					$sub.attr({
						'aria-expanded': 'false',
						'aria-hidden': 'true'
					});
					var level = $sub.dataSM('level');
					this.activatedItems.splice(level - 1, 1);
					this.visibleSubMenus.splice($.inArray($sub, this.visibleSubMenus), 1);
					this.$root.triggerHandler('hide.smapi', $sub[0]);
				}
			},
			menuHideAll: function() {
				if (this.showTimeout) {
					clearTimeout(this.showTimeout);
					this.showTimeout = 0;
				}
				// hide all subs
				// if it's a popup, this.visibleSubMenus[0] is the root UL
				var level = this.opts.isPopup ? 1 : 0;
				for (var i = this.visibleSubMenus.length - 1; i >= level; i--) {
					this.menuHide(this.visibleSubMenus[i]);
				}
				// hide root if it's popup
				if (this.opts.isPopup) {
					if (canAnimate) {
						this.$root.stop(true, true);
					}
					if (this.$root.is(':visible')) {
						if (canAnimate && this.opts.hideFunction) {
							this.opts.hideFunction.call(this, this.$root);
						} else {
							this.$root.hide(this.opts.hideDuration);
						}
					}
				}
				this.activatedItems = [];
				this.visibleSubMenus = [];
				this.clickActivated = false;
				this.focusActivated = false;
				// reset z-index increment
				this.zIndexInc = 0;
				this.$root.triggerHandler('hideAll.smapi');
			},
			menuHideSubMenus: function(level) {
				for (var i = this.activatedItems.length - 1; i >= level; i--) {
					var $sub = this.activatedItems[i].dataSM('sub');
					if ($sub) {
						this.menuHide($sub);
					}
				}
			},
			menuInit: function($ul) {
				if (!$ul.dataSM('in-mega')) {
					// mark UL's in mega drop downs (if any) so we can neglect them
					if ($ul.hasClass('mega-menu')) {
						$ul.find('ul').dataSM('in-mega', true);
					}
					// get level (much faster than, for example, using parentsUntil)
					var level = 2,
						par = $ul[0];
					while ((par = par.parentNode.parentNode) != this.$root[0]) {
						level++;
					}
					// cache stuff for quick access
					var $a = $ul.prevAll('a').eq(-1);
					// if the link is nested (e.g. in a heading)
					if (!$a.length) {
						$a = $ul.prevAll().find('a').eq(-1);
					}
					$a.addClass('has-submenu').dataSM('sub', $ul);
					$ul.dataSM('parent-a', $a)
						.dataSM('level', level)
						.parent().dataSM('sub', $ul);
					// accessibility
					var aId = $a.attr('id') || this.accessIdPrefix + (++this.idInc),
						ulId = $ul.attr('id') || this.accessIdPrefix + (++this.idInc);
					$a.attr({
						id: aId,
						'aria-haspopup': 'true',
						'aria-controls': ulId,
						'aria-expanded': 'false'
					});
					$ul.attr({
						id: ulId,
						'role': 'group',
						'aria-hidden': 'true',
						'aria-labelledby': aId,
						'aria-expanded': 'false'
					});
					// add sub indicator to parent item
					if (this.opts.subIndicators) {
						$a[this.opts.subIndicatorsPos](this.$subArrow.clone());
					}
				}
			},
			menuPosition: function($sub) {
				var $a = $sub.dataSM('parent-a'),
					$li = $a.closest('li'),
					$ul = $li.parent(),
					level = $sub.dataSM('level'),
					subW = this.getWidth($sub),
					subH = this.getHeight($sub),
					itemOffset = $a.offset(),
					itemX = itemOffset.left,
					itemY = itemOffset.top,
					itemW = this.getWidth($a),
					itemH = this.getHeight($a),
					$win = $(window),
					winX = $win.scrollLeft(),
					winY = $win.scrollTop(),
					winW = this.getViewportWidth(),
					winH = this.getViewportHeight(),
					horizontalParent = $ul.parent().is('[data-sm-horizontal-sub]') || level == 2 && !$ul.hasClass('sm-vertical'),
					rightToLeft = this.opts.rightToLeftSubMenus && !$li.is('[data-sm-reverse]') || !this.opts.rightToLeftSubMenus && $li.is('[data-sm-reverse]'),
					subOffsetX = level == 2 ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
					subOffsetY = level == 2 ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY,
					x, y;
				if (horizontalParent) {
					x = rightToLeft ? itemW - subW - subOffsetX : subOffsetX;
					y = this.opts.bottomToTopSubMenus ? -subH - subOffsetY : itemH + subOffsetY;
				} else {
					x = rightToLeft ? subOffsetX - subW : itemW - subOffsetX;
					y = this.opts.bottomToTopSubMenus ? itemH - subOffsetY - subH : subOffsetY;
				}
				if (this.opts.keepInViewport) {
					var absX = itemX + x,
						absY = itemY + y;
					if (rightToLeft && absX < winX) {
						x = horizontalParent ? winX - absX + x : itemW - subOffsetX;
					} else if (!rightToLeft && absX + subW > winX + winW) {
						x = horizontalParent ? winX + winW - subW - absX + x : subOffsetX - subW;
					}
					if (!horizontalParent) {
						if (subH < winH && absY + subH > winY + winH) {
							y += winY + winH - subH - absY;
						} else if (subH >= winH || absY < winY) {
							y += winY - absY;
						}
					}
					// do we need scrolling?
					// 0.49 used for better precision when dealing with float values
					if (horizontalParent && (absY + subH > winY + winH + 0.49 || absY < winY) || !horizontalParent && subH > winH + 0.49) {
						var self = this;
						if (!$sub.dataSM('scroll-arrows')) {
							$sub.dataSM('scroll-arrows', $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]])
								.on({
									mouseenter: function() {
										$sub.dataSM('scroll').up = $(this).hasClass('scroll-up');
										self.menuScroll($sub);
									},
									mouseleave: function(e) {
										self.menuScrollStop($sub);
										self.menuScrollOut($sub, e);
									},
									'mousewheel DOMMouseScroll': function(e) { e.preventDefault(); }
								})
								.insertAfter($sub)
							);
						}
						// bind scroll events and save scroll data for this sub
						var eNS = '.smartmenus_scroll';
						$sub.dataSM('scroll', {
								y: this.cssTransforms3d ? 0 : y - itemH,
								step: 1,
								// cache stuff for faster recalcs later
								itemH: itemH,
								subH: subH,
								arrowDownH: this.getHeight($sub.dataSM('scroll-arrows').eq(1))
							})
							.on(getEventsNS({
								'mouseover': function(e) { self.menuScrollOver($sub, e); },
								'mouseout': function(e) { self.menuScrollOut($sub, e); },
								'mousewheel DOMMouseScroll': function(e) { self.menuScrollMousewheel($sub, e); }
							}, eNS))
							.dataSM('scroll-arrows').css({ top: 'auto', left: '0', marginLeft: x + (parseInt($sub.css('border-left-width')) || 0), width: subW - (parseInt($sub.css('border-left-width')) || 0) - (parseInt($sub.css('border-right-width')) || 0), zIndex: $sub.css('z-index') })
								.eq(horizontalParent && this.opts.bottomToTopSubMenus ? 0 : 1).show();
						// when a menu tree is fixed positioned we allow scrolling via touch too
						// since there is no other way to access such long sub menus if no mouse is present
						if (this.isFixed()) {
							var events = {};
							events[touchEvents ? 'touchstart touchmove touchend' : 'pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp'] = function(e) {
								self.menuScrollTouch($sub, e);
							};
							$sub.css({ 'touch-action': 'none', '-ms-touch-action': 'none' }).on(getEventsNS(events, eNS));
						}
					}
				}
				$sub.css({ top: 'auto', left: '0', marginLeft: x, marginTop: y - itemH });
			},
			menuScroll: function($sub, once, step) {
				var data = $sub.dataSM('scroll'),
					$arrows = $sub.dataSM('scroll-arrows'),
					end = data.up ? data.upEnd : data.downEnd,
					diff;
				if (!once && data.momentum) {
					data.momentum *= 0.92;
					diff = data.momentum;
					if (diff < 0.5) {
						this.menuScrollStop($sub);
						return;
					}
				} else {
					diff = step || (once || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(data.step));
				}
				// hide any visible deeper level sub menus
				var level = $sub.dataSM('level');
				if (this.activatedItems[level - 1] && this.activatedItems[level - 1].dataSM('sub') && this.activatedItems[level - 1].dataSM('sub').is(':visible')) {
					this.menuHideSubMenus(level - 1);
				}
				data.y = data.up && end <= data.y || !data.up && end >= data.y ? data.y : (Math.abs(end - data.y) > diff ? data.y + (data.up ? diff : -diff) : end);
				$sub.css(this.cssTransforms3d ? { '-webkit-transform': 'translate3d(0, ' + data.y + 'px, 0)', transform: 'translate3d(0, ' + data.y + 'px, 0)' } : { marginTop: data.y });
				// show opposite arrow if appropriate
				if (mouse && (data.up && data.y > data.downEnd || !data.up && data.y < data.upEnd)) {
					$arrows.eq(data.up ? 1 : 0).show();
				}
				// if we've reached the end
				if (data.y == end) {
					if (mouse) {
						$arrows.eq(data.up ? 0 : 1).hide();
					}
					this.menuScrollStop($sub);
				} else if (!once) {
					if (this.opts.scrollAccelerate && data.step < this.opts.scrollStep) {
						data.step += 0.2;
					}
					var self = this;
					this.scrollTimeout = requestAnimationFrame(function() { self.menuScroll($sub); });
				}
			},
			menuScrollMousewheel: function($sub, e) {
				if (this.getClosestMenu(e.target) == $sub[0]) {
					e = e.originalEvent;
					var up = (e.wheelDelta || -e.detail) > 0;
					if ($sub.dataSM('scroll-arrows').eq(up ? 0 : 1).is(':visible')) {
						$sub.dataSM('scroll').up = up;
						this.menuScroll($sub, true);
					}
				}
				e.preventDefault();
			},
			menuScrollOut: function($sub, e) {
				if (mouse) {
					if (!/^scroll-(up|down)/.test((e.relatedTarget || '').className) && ($sub[0] != e.relatedTarget && !$.contains($sub[0], e.relatedTarget) || this.getClosestMenu(e.relatedTarget) != $sub[0])) {
						$sub.dataSM('scroll-arrows').css('visibility', 'hidden');
					}
				}
			},
			menuScrollOver: function($sub, e) {
				if (mouse) {
					if (!/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == $sub[0]) {
						this.menuScrollRefreshData($sub);
						var data = $sub.dataSM('scroll'),
							upEnd = $(window).scrollTop() - $sub.dataSM('parent-a').offset().top - data.itemH;
						$sub.dataSM('scroll-arrows').eq(0).css('margin-top', upEnd).end()
							.eq(1).css('margin-top', upEnd + this.getViewportHeight() - data.arrowDownH).end()
							.css('visibility', 'visible');
					}
				}
			},
			menuScrollRefreshData: function($sub) {
				var data = $sub.dataSM('scroll'),
					upEnd = $(window).scrollTop() - $sub.dataSM('parent-a').offset().top - data.itemH;
				if (this.cssTransforms3d) {
					upEnd = -(parseFloat($sub.css('margin-top')) - upEnd);
				}
				$.extend(data, {
					upEnd: upEnd,
					downEnd: upEnd + this.getViewportHeight() - data.subH
				});
			},
			menuScrollStop: function($sub) {
				if (this.scrollTimeout) {
					cancelAnimationFrame(this.scrollTimeout);
					this.scrollTimeout = 0;
					$sub.dataSM('scroll').step = 1;
					return true;
				}
			},
			menuScrollTouch: function($sub, e) {
				e = e.originalEvent;
				if (isTouchEvent(e)) {
					var touchPoint = this.getTouchPoint(e);
					// neglect event if we touched a visible deeper level sub menu
					if (this.getClosestMenu(touchPoint.target) == $sub[0]) {
						var data = $sub.dataSM('scroll');
						if (/(start|down)$/i.test(e.type)) {
							if (this.menuScrollStop($sub)) {
								// if we were scrolling, just stop and don't activate any link on the first touch
								e.preventDefault();
								this.$touchScrollingSub = $sub;
							} else {
								this.$touchScrollingSub = null;
							}
							// update scroll data since the user might have zoomed, etc.
							this.menuScrollRefreshData($sub);
							// extend it with the touch properties
							$.extend(data, {
								touchStartY: touchPoint.pageY,
								touchStartTime: e.timeStamp
							});
						} else if (/move$/i.test(e.type)) {
							var prevY = data.touchY !== undefined ? data.touchY : data.touchStartY;
							if (prevY !== undefined && prevY != touchPoint.pageY) {
								this.$touchScrollingSub = $sub;
								var up = prevY < touchPoint.pageY;
								// changed direction? reset...
								if (data.up !== undefined && data.up != up) {
									$.extend(data, {
										touchStartY: touchPoint.pageY,
										touchStartTime: e.timeStamp
									});
								}
								$.extend(data, {
									up: up,
									touchY: touchPoint.pageY
								});
								this.menuScroll($sub, true, Math.abs(touchPoint.pageY - prevY));
							}
							e.preventDefault();
						} else { // touchend/pointerup
							if (data.touchY !== undefined) {
								if (data.momentum = Math.pow(Math.abs(touchPoint.pageY - data.touchStartY) / (e.timeStamp - data.touchStartTime), 2) * 15) {
									this.menuScrollStop($sub);
									this.menuScroll($sub);
									e.preventDefault();
								}
								delete data.touchY;
							}
						}
					}
				}
			},
			menuShow: function($sub) {
				if (!$sub.dataSM('beforefirstshowfired')) {
					$sub.dataSM('beforefirstshowfired', true);
					if (this.$root.triggerHandler('beforefirstshow.smapi', $sub[0]) === false) {
						return;
					}
				}
				if (this.$root.triggerHandler('beforeshow.smapi', $sub[0]) === false) {
					return;
				}
				$sub.dataSM('shown-before', true);
				if (canAnimate) {
					$sub.stop(true, true);
				}
				if (!$sub.is(':visible')) {
					// highlight parent item
					var $a = $sub.dataSM('parent-a'),
						collapsible = this.isCollapsible();
					if (this.opts.keepHighlighted || collapsible) {
						$a.addClass('highlighted');
					}
					if (collapsible) {
						$sub.removeClass('sm-nowrap').css({ zIndex: '', width: 'auto', minWidth: '', maxWidth: '', top: '', left: '', marginLeft: '', marginTop: '' });
					} else {
						// set z-index
						$sub.css('z-index', this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1);
						// min/max-width fix - no way to rely purely on CSS as all UL's are nested
						if (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) {
							$sub.css({ width: 'auto', minWidth: '', maxWidth: '' }).addClass('sm-nowrap');
							if (this.opts.subMenusMinWidth) {
							 	$sub.css('min-width', this.opts.subMenusMinWidth);
							}
							if (this.opts.subMenusMaxWidth) {
							 	var noMaxWidth = this.getWidth($sub);
							 	$sub.css('max-width', this.opts.subMenusMaxWidth);
								if (noMaxWidth > this.getWidth($sub)) {
									$sub.removeClass('sm-nowrap').css('width', this.opts.subMenusMaxWidth);
								}
							}
						}
						this.menuPosition($sub);
					}
					var complete = function() {
						// fix: "overflow: hidden;" is not reset on animation complete in jQuery < 1.9.0 in Chrome when global "box-sizing: border-box;" is used
						$sub.css('overflow', '');
					};
					// if sub is collapsible (mobile view)
					if (collapsible) {
						if (canAnimate && this.opts.collapsibleShowFunction) {
							this.opts.collapsibleShowFunction.call(this, $sub, complete);
						} else {
							$sub.show(this.opts.collapsibleShowDuration, complete);
						}
					} else {
						if (canAnimate && this.opts.showFunction) {
							this.opts.showFunction.call(this, $sub, complete);
						} else {
							$sub.show(this.opts.showDuration, complete);
						}
					}
					// accessibility
					$a.attr('aria-expanded', 'true');
					$sub.attr({
						'aria-expanded': 'true',
						'aria-hidden': 'false'
					});
					// store sub menu in visible array
					this.visibleSubMenus.push($sub);
					this.$root.triggerHandler('show.smapi', $sub[0]);
				}
			},
			popupHide: function(noHideTimeout) {
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				var self = this;
				this.hideTimeout = setTimeout(function() {
					self.menuHideAll();
				}, noHideTimeout ? 1 : this.opts.hideTimeout);
			},
			popupShow: function(left, top) {
				if (!this.opts.isPopup) {
					alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.');
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				this.$root.dataSM('shown-before', true);
				if (canAnimate) {
					this.$root.stop(true, true);
				}
				if (!this.$root.is(':visible')) {
					this.$root.css({ left: left, top: top });
					// show menu
					var self = this,
						complete = function() {
							self.$root.css('overflow', '');
						};
					if (canAnimate && this.opts.showFunction) {
						this.opts.showFunction.call(this, this.$root, complete);
					} else {
						this.$root.show(this.opts.showDuration, complete);
					}
					this.visibleSubMenus[0] = this.$root;
				}
			},
			refresh: function() {
				this.destroy(true);
				this.init(true);
			},
			rootKeyDown: function(e) {
				if (!this.handleEvents()) {
					return;
				}
				switch (e.keyCode) {
					case 27: // reset on Esc
						var $activeTopItem = this.activatedItems[0];
						if ($activeTopItem) {
							this.menuHideAll();
							$activeTopItem[0].focus();
							var $sub = $activeTopItem.dataSM('sub');
							if ($sub) {
								this.menuHide($sub);
							}
						}
						break;
					case 32: // activate item's sub on Space
						var $target = $(e.target);
						if ($target.is('a') && this.handleItemEvents($target)) {
							var $sub = $target.dataSM('sub');
							if ($sub && !$sub.is(':visible')) {
								this.itemClick({ currentTarget: e.target });
								e.preventDefault();
							}
						}
						break;
				}
			},
			rootOut: function(e) {
				if (!this.handleEvents() || this.isTouchMode() || e.target == this.$root[0]) {
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
				if (!this.opts.showOnClick || !this.opts.hideOnClick) {
					var self = this;
					this.hideTimeout = setTimeout(function() { self.menuHideAll(); }, this.opts.hideTimeout);
				}
			},
			rootOver: function(e) {
				if (!this.handleEvents() || this.isTouchMode() || e.target == this.$root[0]) {
					return;
				}
				if (this.hideTimeout) {
					clearTimeout(this.hideTimeout);
					this.hideTimeout = 0;
				}
			},
			winResize: function(e) {
				if (!this.handleEvents()) {
					// we still need to resize the disable overlay if it's visible
					if (this.$disableOverlay) {
						var pos = this.$root.offset();
	 					this.$disableOverlay.css({
							top: pos.top,
							left: pos.left,
							width: this.$root.outerWidth(),
							height: this.$root.outerHeight()
						});
					}
					return;
				}
				// hide sub menus on resize - on mobile do it only on orientation change
				if (!('onorientationchange' in window) || e.type == 'orientationchange') {
					var collapsible = this.isCollapsible();
					// if it was collapsible before resize and still is, don't do it
					if (!(this.wasCollapsible && collapsible)) { 
						if (this.activatedItems.length) {
							this.activatedItems[this.activatedItems.length - 1][0].blur();
						}
						this.menuHideAll();
					}
					this.wasCollapsible = collapsible;
				}
			}
		}
	});

	$.fn.dataSM = function(key, val) {
		if (val) {
			return this.data(key + '_smartmenus', val);
		}
		return this.data(key + '_smartmenus');
	};

	$.fn.removeDataSM = function(key) {
		return this.removeData(key + '_smartmenus');
	};

	$.fn.smartmenus = function(options) {
		if (typeof options == 'string') {
			var args = arguments,
				method = options;
			Array.prototype.shift.call(args);
			return this.each(function() {
				var smartmenus = $(this).data('smartmenus');
				if (smartmenus && smartmenus[method]) {
					smartmenus[method].apply(smartmenus, args);
				}
			});
		}
		return this.each(function() {
			// [data-sm-options] attribute on the root UL
			var dataOpts = $(this).data('sm-options') || null;
			if (dataOpts) {
				try {
					dataOpts = eval('(' + dataOpts + ')');
				} catch(e) {
					dataOpts = null;
					alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.');
				};
			}
			new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts));
		});
	};

	// default settings
	$.fn.smartmenus.defaults = {
		isPopup:		false,		// is this a popup menu (can be shown via the popupShow/popupHide methods) or a permanent menu bar
		mainMenuSubOffsetX:	0,		// pixels offset from default position
		mainMenuSubOffsetY:	0,		// pixels offset from default position
		subMenusSubOffsetX:	0,		// pixels offset from default position
		subMenusSubOffsetY:	0,		// pixels offset from default position
		subMenusMinWidth:	'10em',		// min-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
		subMenusMaxWidth:	'20em',		// max-width for the sub menus (any CSS unit) - if set, the fixed width set in CSS will be ignored
		subIndicators: 		true,		// create sub menu indicators - creates a SPAN and inserts it in the A
		subIndicatorsPos: 	'append',	// position of the SPAN relative to the menu item content ('append', 'prepend')
		subIndicatorsText:	'',		// [optionally] add text in the SPAN (e.g. '+') (you may want to check the CSS for the sub indicators too)
		scrollStep: 		30,		// pixels step when scrolling long sub menus that do not fit in the viewport height
		scrollAccelerate:	true,		// accelerate scrolling or use a fixed step
		showTimeout:		250,		// timeout before showing the sub menus
		hideTimeout:		500,		// timeout before hiding the sub menus
		showDuration:		0,		// duration for show animation - set to 0 for no animation - matters only if showFunction:null
		showFunction:		null,		// custom function to use when showing a sub menu (the default is the jQuery 'show')
							// don't forget to call complete() at the end of whatever you do
							// e.g.: function($ul, complete) { $ul.fadeIn(250, complete); }
		hideDuration:		0,		// duration for hide animation - set to 0 for no animation - matters only if hideFunction:null
		hideFunction:		function($ul, complete) { $ul.fadeOut(200, complete); },	// custom function to use when hiding a sub menu (the default is the jQuery 'hide')
							// don't forget to call complete() at the end of whatever you do
							// e.g.: function($ul, complete) { $ul.fadeOut(250, complete); }
		collapsibleShowDuration:0,		// duration for show animation for collapsible sub menus - matters only if collapsibleShowFunction:null
		collapsibleShowFunction:function($ul, complete) { $ul.slideDown(200, complete); },	// custom function to use when showing a collapsible sub menu
							// (i.e. when mobile styles are used to make the sub menus collapsible)
		collapsibleHideDuration:0,		// duration for hide animation for collapsible sub menus - matters only if collapsibleHideFunction:null
		collapsibleHideFunction:function($ul, complete) { $ul.slideUp(200, complete); },	// custom function to use when hiding a collapsible sub menu
							// (i.e. when mobile styles are used to make the sub menus collapsible)
		showOnClick:		false,		// show the first-level sub menus onclick instead of onmouseover (i.e. mimic desktop app menus) (matters only for mouse input)
		hideOnClick:		true,		// hide the sub menus on click/tap anywhere on the page
		noMouseOver:		false,		// disable sub menus activation onmouseover (i.e. behave like in touch mode - use just mouse clicks) (matters only for mouse input)
		keepInViewport:		true,		// reposition the sub menus if needed to make sure they always appear inside the viewport
		keepHighlighted:	true,		// keep all ancestor items of the current sub menu highlighted (adds the 'highlighted' class to the A's)
		markCurrentItem:	false,		// automatically add the 'current' class to the A element of the item linking to the current URL
		markCurrentTree:	true,		// add the 'current' class also to the A elements of all ancestor items of the current item
		rightToLeftSubMenus:	false,		// right to left display of the sub menus (check the CSS for the sub indicators' position)
		bottomToTopSubMenus:	false,		// bottom to top display of the sub menus
		collapsibleBehavior:	'default'	// parent items behavior in collapsible (mobile) view ('default', 'toggle', 'link', 'accordion', 'accordion-toggle', 'accordion-link')
							// 'default' - first tap on parent item expands sub, second tap loads its link
							// 'toggle' - the whole parent item acts just as a toggle button for its sub menu (expands/collapses on each tap)
							// 'link' - the parent item acts as a regular item (first tap loads its link), the sub menu can be expanded only via the +/- button
							// 'accordion' - like 'default' but on expand also resets any visible sub menus from deeper levels or other branches
							// 'accordion-toggle' - like 'toggle' but on expand also resets any visible sub menus from deeper levels or other branches
							// 'accordion-link' - like 'link' but on expand also resets any visible sub menus from deeper levels or other branches
	};

	return $;
}));
/*!
 * SmartMenus jQuery Plugin Bootstrap Addon - v0.2.0 - June 1, 2015
 * http://www.smartmenus.org/
 *
 * Copyright 2015 Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function ($) {

  // init ondomready
  $(function () {

    // init all navbars that don't have the "data-sm-skip" attribute set
    var $navbars = $('ul.smartmenus:not([data-sm-skip])');
    $navbars.each(function () {
      var $this = $(this);
      $this.addClass('sm').smartmenus({

        // these are some good default options that should work for all
        // you can, of course, tweak these as you like
        subMenusSubOffsetX: 0,
        subMenusSubOffsetY: -7,
        mainMenuSubOffsetX: -8,
        subIndicators: false,
        hideOnClick: true,
        showOnClick: false,
        showTimeout: 100,
        collapsibleShowFunction: null,
        collapsibleHideFunction: null,
        subMenusMinWidth: '15em',
        subMenusMaxWidth: null,
        keepInViewport: false,  // false für mega menu
        keepHighlighted: false
        //rightToLeftSubMenus: $this.hasClass('navbar-right'),
        //bottomToTopSubMenus: $this.closest('.navbar').hasClass('navbar-fixed-bottom')
      });

      // keep Bootstrap's default behavior for parent items when the "data-sm-skip-collapsible-behavior" attribute is set to the ul.navbar-nav
      // i.e. use the whole item area just as a sub menu toggle and don't customize the carets
      var obj = $this.data('smartmenus');
      if ($this.is('[data-sm-skip-collapsible-behavior]')) {
        $this.bind({
          // click the parent item to toggle the sub menus (and reset deeper levels and other branches on click)
          'click.smapi': function (e, item) {
            if (obj.isCollapsible()) {
              var $item = $(item),
                $sub = $item.parent().dataSM('sub');
              if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
                obj.itemActivate($item);
                obj.menuHide($sub);
                return false;
              }
            }
          }
        });
      }

      var $carets = $this.find('.caret');

      // onresize detect when the navbar becomes collapsible and add it the "sm-collapsible" class
      var winW;

      function winResize() {
        var newW = obj.getViewportWidth();
        if (newW != winW) {
          if (obj.isCollapsible()) {
            $this.addClass('sm-collapsible');

          } else {
            $this.removeClass('sm-collapsible');
            if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
              $carets.removeClass('navbar-toggle sub-arrow');
            }
          }
          winW = newW;
        }
      };
      winResize();
      $(window).bind('resize.smartmenus' + obj.rootId, winResize);
    });

  });


})(jQuery);
// Source: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (
                    this.document || this.ownerDocument
                ).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function(arr) {
    arr.forEach(function(item) {
        if (item.hasOwnProperty('prepend')) {
            return;
        }
        Object.defineProperty(item, 'prepend', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function prepend() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function(argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(
                        isNode
                            ? argItem
                            : document.createTextNode(String(argItem))
                    );
                });

                this.insertBefore(docFrag, this.firstChild);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function(arr) {
    arr.forEach(function(item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function(argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(
                        isNode
                            ? argItem
                            : document.createTextNode(String(argItem))
                    );
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/before()/before().md
(function(arr) {
    arr.forEach(function(item) {
        if (item.hasOwnProperty('before')) {
            return;
        }
        Object.defineProperty(item, 'before', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function before() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function(argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(
                        isNode
                            ? argItem
                            : document.createTextNode(String(argItem))
                    );
                });

                this.parentNode.insertBefore(docFrag, this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function(arr) {
    arr.forEach(function(item) {
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                if (this.parentNode !== null) this.parentNode.removeChild(this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i={hooks:{},extensions:[],wrappers:[],navbar:{add:!0,sticky:!0,title:"Menu",titleLink:"parent"},onClick:{close:null,preventDefault:null,setSelected:!0},slidingSubmenus:!0},a={classNames:{inset:"Inset",nolistview:"NoListview",nopanel:"NoPanel",panel:"Panel",selected:"Selected",vertical:"Vertical"},language:null,openingInterval:25,panelNodetype:["ul","ol","div"],transitionDuration:400};function s(e,t){for(var n in"object"!=o(e)&&(e={}),"object"!=o(t)&&(t={}),t)t.hasOwnProperty(n)&&(void 0===e[n]?e[n]=t[n]:"object"==o(e[n])&&s(e[n],t[n]));return e}function o(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function r(e,t,n){if("function"==typeof t){var i=t.call(e);if(void 0!==i)return i}return null!==t&&"function"!=typeof t&&void 0!==t||void 0===n?t:n}function c(e,t,n){var i=!1,a=function(n){void 0!==n&&n.target!==e||(i||(e.removeEventListener("transitionend",a),e.removeEventListener("webkitTransitionEnd",a),t.call(e)),i=!0)};e.addEventListener("transitionend",a),e.addEventListener("webkitTransitionEnd",a),setTimeout(a,1.1*n)}function l(){return"mm-"+m++}var m=0;function d(e){return"mm-"==e.slice(0,3)?e.slice(3):e}var p={};function f(e,t){void 0===p[t]&&(p[t]={}),s(p[t],e)}var u={Menu:"منو"},h={Menu:"Menü"},v={Menu:"Меню"};function b(e){var t=e.split("."),n=document.createElement(t.shift());return t.forEach(function(e){n.classList.add(e)}),n}function g(e,t){return Array.prototype.slice.call(e.querySelectorAll(t))}function _(e,t){var n=Array.prototype.slice.call(e.children);return t?n.filter(function(e){return e.matches(t)}):n}function y(e,t){for(var n=[],i=e.parentElement;i;)n.push(i),i=i.parentElement;return t?n.filter(function(e){return e.matches(t)}):n}function L(e){return e.filter(function(e){return!e.matches(".mm-hidden")})}function w(e){var t=[];return L(e).forEach(function(e){t.push.apply(t,_(e,"a.mm-listitem__text"))}),t.filter(function(e){return!e.matches(".mm-btn_next")})}function E(e,t,n){e.matches("."+t)&&(e.classList.remove(t),e.classList.add(n))}var x={};function k(e,t,n){"number"==typeof e&&(e="(min-width: "+e+"px)"),x[e]=x[e]||[],x[e].push({yes:t,no:n})}function P(e,t){for(var n=t.matches?"yes":"no",i=0;i<x[e].length;i++)x[e][i][n]()}f({Menu:"Menu"},"nl"),f(u,"fa"),f(h,"de"),f(v,"ru");var S=function(){function e(t,n,i){return this.opts=s(n,e.options),this.conf=s(i,e.configs),this._api=["bind","initPanel","initListview","openPanel","closePanel","closeAllPanels","setSelected"],this.node={},this.vars={},this.hook={},this.clck=[],this.node.menu="string"==typeof t?document.querySelector(t):t,"function"==typeof this._deprecatedWarnings&&this._deprecatedWarnings(),this._initWrappers(),this._initAddons(),this._initExtensions(),this._initHooks(),this._initAPI(),this._initMenu(),this._initPanels(),this._initOpened(),this._initAnchors(),function(){var e=function(e){var t=window.matchMedia(e);P(e,t),t.onchange=function(n){P(e,t)}};for(var t in x)e(t)}(),this}return e.prototype.openPanel=function(e,t){var n=this;if(this.trigger("openPanel:before",[e]),e&&(e.matches(".mm-panel")||(e=e.closest(".mm-panel")),e)){if("boolean"!=typeof t&&(t=!0),e.parentElement.matches(".mm-listitem_vertical")){y(e,".mm-listitem_vertical").forEach(function(e){e.classList.add("mm-listitem_opened"),_(e,".mm-panel").forEach(function(e){e.classList.remove("mm-hidden")})});var i=y(e,".mm-panel").filter(function(e){return!e.parentElement.matches(".mm-listitem_vertical")});this.trigger("openPanel:start",[e]),i.length&&this.openPanel(i[0]),this.trigger("openPanel:finish",[e])}else{if(e.matches(".mm-panel_opened"))return;var a=_(this.node.pnls,".mm-panel"),s=_(this.node.pnls,".mm-panel_opened")[0];a.filter(function(t){return t!==e}).forEach(function(e){e.classList.remove("mm-panel_opened-parent")});for(var o=e.mmParent;o;)(o=o.closest(".mm-panel"))&&(o.parentElement.matches(".mm-listitem_vertical")||o.classList.add("mm-panel_opened-parent"),o=o.mmParent);a.forEach(function(e){e.classList.remove("mm-panel_highest")}),a.filter(function(e){return e!==s}).filter(function(t){return t!==e}).forEach(function(e){e.classList.add("mm-hidden")}),e.classList.remove("mm-hidden");var r=function(){s&&s.classList.remove("mm-panel_opened"),e.classList.add("mm-panel_opened"),e.matches(".mm-panel_opened-parent")?(s&&s.classList.add("mm-panel_highest"),e.classList.remove("mm-panel_opened-parent")):(s&&s.classList.add("mm-panel_opened-parent"),e.classList.add("mm-panel_highest")),n.trigger("openPanel:start",[e])},l=function(){s&&(s.classList.remove("mm-panel_highest"),s.classList.add("mm-hidden")),e.classList.remove("mm-panel_highest"),n.trigger("openPanel:finish",[e])};t&&!e.matches(".mm-panel_noanimation")?setTimeout(function(){c(e,function(){l()},n.conf.transitionDuration),r()},this.conf.openingInterval):(r(),l())}this.trigger("openPanel:after",[e])}},e.prototype.closePanel=function(e){this.trigger("closePanel:before",[e]);var t=e.parentElement;t.matches(".mm-listitem_vertical")&&(t.classList.remove("mm-listitem_opened"),e.classList.add("mm-hidden"),this.trigger("closePanel",[e])),this.trigger("closePanel:after",[e])},e.prototype.closeAllPanels=function(e){this.trigger("closeAllPanels:before"),this.node.pnls.querySelectorAll(".mm-listitem").forEach(function(e){e.classList.remove("mm-listitem_selected"),e.classList.remove("mm-listitem_opened")});var t=_(this.node.pnls,".mm-panel"),n=e||t[0];_(this.node.pnls,".mm-panel").forEach(function(e){e!==n&&(e.classList.remove("mm-panel_opened"),e.classList.remove("mm-panel_opened-parent"),e.classList.remove("mm-panel_highest"),e.classList.add("mm-hidden"))}),this.openPanel(n,!1),this.trigger("closeAllPanels:after")},e.prototype.togglePanel=function(e){var t=e.parentElement;t.matches(".mm-listitem_vertical")&&this[t.matches(".mm-listitem_opened")?"closePanel":"openPanel"](e)},e.prototype.setSelected=function(e){this.trigger("setSelected:before",[e]),g(this.node.menu,".mm-listitem_selected").forEach(function(e){e.classList.remove("mm-listitem_selected")}),e.classList.add("mm-listitem_selected"),this.trigger("setSelected:after",[e])},e.prototype.bind=function(e,t){this.hook[e]=this.hook[e]||[],this.hook[e].push(t)},e.prototype.trigger=function(e,t){if(this.hook[e])for(var n=0,i=this.hook[e].length;n<i;n++)this.hook[e][n].apply(this,t)},e.prototype._initAPI=function(){var e=this,t=this;this.API={},this._api.forEach(function(n){e.API[n]=function(){var e=t[n].apply(t,arguments);return void 0===e?t.API:e}}),this.node.menu.mmApi=this.API},e.prototype._initHooks=function(){for(var e in this.opts.hooks)this.bind(e,this.opts.hooks[e])},e.prototype._initWrappers=function(){this.trigger("initWrappers:before");for(var t=0;t<this.opts.wrappers.length;t++){var n=e.wrappers[this.opts.wrappers[t]];"function"==typeof n&&n.call(this)}this.trigger("initWrappers:after")},e.prototype._initAddons=function(){for(var t in this.trigger("initAddons:before"),e.addons)e.addons[t].call(this);this.trigger("initAddons:after")},e.prototype._initExtensions=function(){var e=this;this.trigger("initExtensions:before"),"array"==o(this.opts.extensions)&&(this.opts.extensions={all:this.opts.extensions}),Object.keys(this.opts.extensions).forEach(function(t){var n=e.opts.extensions[t].map(function(e){return"mm-menu_"+e});n.length&&k(t,function(){n.forEach(function(t){e.node.menu.classList.add(t)})},function(){n.forEach(function(t){e.node.menu.classList.remove(t)})})}),this.trigger("initExtensions:after")},e.prototype._initMenu=function(){var e=this;this.trigger("initMenu:before"),this.node.wrpr=this.node.wrpr||this.node.menu.parentElement,this.node.wrpr.classList.add("mm-wrapper"),this.node.menu.id=this.node.menu.id||l();var t=b("div.mm-panels");_(this.node.menu).forEach(function(n){e.conf.panelNodetype.indexOf(n.nodeName.toLowerCase())>-1&&t.append(n)}),this.node.menu.append(t),this.node.pnls=t,this.node.menu.classList.add("mm-menu"),this.trigger("initMenu:after")},e.prototype._initPanels=function(){var e=this;this.trigger("initPanels:before"),this.clck.push(function(t,n){if(n.inMenu){var i=t.getAttribute("href");if(i&&i.length>1&&"#"==i.slice(0,1))try{var a=g(e.node.menu,i)[0];if(a&&a.matches(".mm-panel"))return t.parentElement.matches(".mm-listitem_vertical")?e.togglePanel(a):e.openPanel(a),!0}catch(e){}}}),_(this.node.pnls).forEach(function(t){e.initPanel(t)}),this.trigger("initPanels:after")},e.prototype.initPanel=function(e){var t=this,n=this.conf.panelNodetype.join(", ");if(e.matches(n)&&(e.matches(".mm-panel")||(e=this._initPanel(e)),e)){var i=[];i.push.apply(i,_(e,"."+this.conf.classNames.panel)),_(e,".mm-listview").forEach(function(e){_(e,".mm-listitem").forEach(function(e){i.push.apply(i,_(e,n))})}),i.forEach(function(e){t.initPanel(e)})}},e.prototype._initPanel=function(e){var t=this;if(this.trigger("initPanel:before",[e]),E(e,this.conf.classNames.panel,"mm-panel"),E(e,this.conf.classNames.nopanel,"mm-nopanel"),E(e,this.conf.classNames.inset,"mm-listview_inset"),e.matches(".mm-listview_inset")&&e.classList.add("mm-nopanel"),e.matches(".mm-nopanel"))return null;var n=e.id||l(),i=e.matches("."+this.conf.classNames.vertical)||!this.opts.slidingSubmenus;if(e.classList.remove(this.conf.classNames.vertical),e.matches("ul, ol")){e.removeAttribute("id");var a=b("div");e.before(a),a.append(e),e=a}e.id=n,e.classList.add("mm-panel"),e.classList.add("mm-hidden");var s=[e.parentElement].filter(function(e){return e.matches("li")})[0];if(i?s&&s.classList.add("mm-listitem_vertical"):this.node.pnls.append(e),s&&(s.mmChild=e,e.mmParent=s,s&&s.matches(".mm-listitem")&&!_(s,".mm-btn").length)){var o=_(s,".mm-listitem__text")[0];if(o){var r=b("a.mm-btn.mm-btn_next.mm-listitem__btn");r.setAttribute("href","#"+e.id),o.matches("span")?(r.classList.add("mm-listitem__text"),r.innerHTML=o.innerHTML,s.insertBefore(r,o.nextElementSibling),o.remove()):s.insertBefore(r,_(s,".mm-panel")[0])}}return this._initNavbar(e),_(e,"ul, ol").forEach(function(e){t.initListview(e)}),this.trigger("initPanel:after",[e]),e},e.prototype._initNavbar=function(e){if(this.trigger("initNavbar:before",[e]),!_(e,".mm-navbar").length){var t=null,n=null;if(e.dataset.mmParent?n=g(this.node.pnls,e.dataset.mmParent)[0]:(t=e.mmParent)&&(n=t.closest(".mm-panel")),!t||!t.matches(".mm-listitem_vertical")){var i=b("div.mm-navbar");if(this.opts.navbar.add?this.opts.navbar.sticky&&i.classList.add("mm-navbar_sticky"):i.classList.add("mm-hidden"),n){var a=b("a.mm-btn.mm-btn_prev.mm-navbar__btn");a.setAttribute("href","#"+n.id),i.append(a)}var s=null;t?s=_(t,".mm-listitem__text")[0]:n&&(s=g(n,'a[href="#'+e.id+'"]')[0]);var o=b("a.mm-navbar__title");switch(o.innerHTML=e.dataset.mmTitle||(s?s.textContent:"")||this.i18n(this.opts.navbar.title)||this.i18n("Menu"),this.opts.navbar.titleLink){case"anchor":s&&o.setAttribute("href",s.getAttribute("href"));break;case"parent":n&&o.setAttribute("href","#"+n.id)}i.append(o),e.prepend(i),this.trigger("initNavbar:after",[e])}}},e.prototype.initListview=function(e){var t=this;this.trigger("initListview:before",[e]),E(e,this.conf.classNames.nolistview,"mm-nolistview"),e.matches(".mm-nolistview")||(e.classList.add("mm-listview"),_(e).forEach(function(e){e.classList.add("mm-listitem"),E(e,t.conf.classNames.selected,"mm-listitem_selected"),_(e,"a, span").forEach(function(e){e.matches(".mm-btn")||e.classList.add("mm-listitem__text")})})),this.trigger("initListview:after",[e])},e.prototype._initOpened=function(){this.trigger("initOpened:before");var e=this.node.pnls.querySelectorAll(".mm-listitem_selected"),t=null;e.forEach(function(e){t=e,e.classList.remove("mm-listitem_selected")}),t&&t.classList.add("mm-listitem_selected");var n=t?t.closest(".mm-panel"):_(this.node.pnls,".mm-panel")[0];this.openPanel(n,!1),this.trigger("initOpened:after")},e.prototype._initAnchors=function(){var e=this;this.trigger("initAnchors:before"),document.addEventListener("click",function(t){var n=t.target.closest("a[href]");if(n){for(var i={inMenu:n.closest(".mm-menu")===e.node.menu,inListview:n.matches(".mm-listitem > a"),toExternal:n.matches('[rel="external"]')||n.matches('[target="_blank"]')},a={close:null,setSelected:null,preventDefault:"#"==n.getAttribute("href").slice(0,1)},c=0;c<e.clck.length;c++){var l=e.clck[c].call(e,n,i);if(l){if("boolean"==typeof l)return void t.preventDefault();"object"==o(l)&&(a=s(l,a))}}i.inMenu&&i.inListview&&!i.toExternal&&(r(n,e.opts.onClick.setSelected,a.setSelected)&&e.setSelected(n.parentElement),r(n,e.opts.onClick.preventDefault,a.preventDefault)&&t.preventDefault(),r(n,e.opts.onClick.close,a.close)&&e.opts.offCanvas&&"function"==typeof e.close&&e.close())}},!0),this.trigger("initAnchors:after")},e.prototype.i18n=function(e){return function(e,t){return"string"==typeof t&&void 0!==p[t]&&p[t][e]||e}(e,this.conf.language)},e.version="8.4.1",e.options=i,e.configs=a,e.addons={},e.wrappers={},e.node={},e.vars={},e}(),M={blockUI:!0,moveBackground:!0};var A={clone:!1,menu:{insertMethod:"prepend",insertSelector:"body"},page:{nodetype:"div",selector:null,noSelector:[]}};function T(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function C(e,t,n){var i=t.split(".");e[t="mmEvent"+T(i[0])+T(i[1])]=e[t]||[],e[t].push(n),e.addEventListener(i[0],n)}function N(e,t){var n=t.split(".");t="mmEvent"+T(n[0])+T(n[1]),(e[t]||[]).forEach(function(t){e.removeEventListener(n[0],t)})}S.options.offCanvas=M,S.configs.offCanvas=A;S.prototype.open=function(){var e=this;this.trigger("open:before"),this.vars.opened||(this._openSetup(),setTimeout(function(){e._openStart()},this.conf.openingInterval),this.trigger("open:after"))},S.prototype._openSetup=function(){var e=this,t=this.opts.offCanvas;this.closeAllOthers(),S.node.page.mmStyle=S.node.page.getAttribute("style")||"",function(e,t,n){var i=t.split(".");(e[t="mmEvent"+T(i[0])+T(i[1])]||[]).forEach(function(e){e(n||{})})}(window,"resize.page",{force:!0});var n=["mm-wrapper_opened"];t.blockUI&&n.push("mm-wrapper_blocking"),"modal"==t.blockUI&&n.push("mm-wrapper_modal"),t.moveBackground&&n.push("mm-wrapper_background"),n.forEach(function(t){e.node.wrpr.classList.add(t)}),setTimeout(function(){e.vars.opened=!0},this.conf.openingInterval),this.node.menu.classList.add("mm-menu_opened")},S.prototype._openStart=function(){var e=this;c(S.node.page,function(){e.trigger("open:finish")},this.conf.transitionDuration),this.trigger("open:start"),this.node.wrpr.classList.add("mm-wrapper_opening")},S.prototype.close=function(){var e=this;this.trigger("close:before"),this.vars.opened&&(c(S.node.page,function(){e.node.menu.classList.remove("mm-menu_opened");["mm-wrapper_opened","mm-wrapper_blocking","mm-wrapper_modal","mm-wrapper_background"].forEach(function(t){e.node.wrpr.classList.remove(t)}),S.node.page.setAttribute("style",S.node.page.mmStyle),e.vars.opened=!1,e.trigger("close:finish")},this.conf.transitionDuration),this.trigger("close:start"),this.node.wrpr.classList.remove("mm-wrapper_opening"),this.trigger("close:after"))},S.prototype.closeAllOthers=function(){var e=this;g(document.body,".mm-menu_offcanvas").forEach(function(t){if(t!==e.node.menu){var n=t.mmApi;n&&n.close&&n.close()}})},S.prototype.setPage=function(e){this.trigger("setPage:before",[e]);var t=this.conf.offCanvas;if(!e){var n="string"==typeof t.page.selector?g(document.body,t.page.selector):_(document.body,t.page.nodetype);if(n=n.filter(function(e){return!e.matches(".mm-menu, .mm-wrapper__blocker")}),t.page.noSelector.length&&(n=n.filter(function(e){return!e.matches(t.page.noSelector.join(", "))})),n.length>1){var i=b("div");n[0].before(i),n.forEach(function(e){i.append(e)}),n=[i]}e=n[0]}e.classList.add("mm-page"),e.classList.add("mm-slideout"),e.id=e.id||l(),S.node.page=e,this.trigger("setPage:after",[e])};var H=function(){var e=this;N(document.body,"keydown.tabguard"),C(document.body,"keydown.tabguard",function(t){9==t.keyCode&&e.node.wrpr.matches(".mm-wrapper_opened")&&t.preventDefault()})},j=function(){var e=this;this.trigger("initBlocker:before");var t=this.opts.offCanvas,n=this.conf.offCanvas;if(t.blockUI){if(!S.node.blck){var i=b("div.mm-wrapper__blocker.mm-slideout");i.innerHTML="<a></a>",document.querySelector(n.menu.insertSelector).append(i),S.node.blck=i}var a=function(t){t.preventDefault(),t.stopPropagation(),e.node.wrpr.matches(".mm-wrapper_modal")||e.close()};S.node.blck.addEventListener("mousedown",a),S.node.blck.addEventListener("touchstart",a),S.node.blck.addEventListener("touchmove",a),this.trigger("initBlocker:after")}},D={aria:!0,text:!0};var O={text:{closeMenu:"Close menu",closeSubmenu:"Close submenu",openSubmenu:"Open submenu",toggleSubmenu:"Toggle submenu"}},I={"Close menu":"بستن منو","Close submenu":"بستن زیرمنو","Open submenu":"بازکردن زیرمنو","Toggle submenu":"سوییچ زیرمنو"},q={"Close menu":"Menü schließen","Close submenu":"Untermenü schließen","Open submenu":"Untermenü öffnen","Toggle submenu":"Untermenü wechseln"},B={"Close menu":"Закрыть меню","Close submenu":"Закрыть подменю","Open submenu":"Открыть подменю","Toggle submenu":"Переключить подменю"};f({"Close menu":"Menu sluiten","Close submenu":"Submenu sluiten","Open submenu":"Submenu openen","Toggle submenu":"Submenu wisselen"},"nl"),f(I,"fa"),f(q,"de"),f(B,"ru"),S.options.screenReader=D,S.configs.screenReader=O;var z;z=function(e,t,n){e[t]=n,n?e.setAttribute(t,n.toString()):e.removeAttribute(t)},S.sr_aria=function(e,t,n){z(e,"aria-"+t,n)},S.sr_role=function(e,t){z(e,"role",t)},S.sr_text=function(e){return'<span class="mm-sronly">'+e+"</span>"};var R={fix:!0};var U="ontouchstart"in window||!!navigator.msMaxTouchPoints||!1;S.options.scrollBugFix=R;var W={height:"default"};S.options.autoHeight=W;var Y={close:!1,open:!1};S.options.backButton=Y;var F={add:!1,visible:{min:1,max:3}};S.options.columns=F;var X={add:!1,addTo:"panels",count:!1};S.options.counters=X,S.configs.classNames.counters={counter:"Counter"};var V={add:!1,addTo:"panels"};S.options.dividers=V,S.configs.classNames.divider="Divider";var Z={open:!1,node:null};var G="ontouchstart"in window||!!navigator.msMaxTouchPoints||!1,K={top:0,right:0,bottom:0,left:0},Q={start:15,swipe:15},J={x:["Right","Left"],y:["Down","Up"]},$=0,ee=1,te=2,ne=function(e,t){return"string"==typeof e&&"%"==e.slice(-1)&&(e=t*((e=parseInt(e.slice(0,-1),10))/100)),e},ie=function(){function e(e,t,n){this.surface=e,this.area=s(t,K),this.treshold=s(n,Q),this.surface.mmHasDragEvents||(this.surface.addEventListener(G?"touchstart":"mousedown",this.start.bind(this)),this.surface.addEventListener(G?"touchend":"mouseup",this.stop.bind(this)),this.surface.addEventListener(G?"touchleave":"mouseleave",this.stop.bind(this)),this.surface.addEventListener(G?"touchmove":"mousemove",this.move.bind(this))),this.surface.mmHasDragEvents=!0}return e.prototype.start=function(e){var t=this.surface.clientWidth,n=this.surface.clientHeight,i=ne(this.area.top,n);if(!("number"==typeof i&&e.pageY<i)){var a=ne(this.area.right,t);if(!("number"==typeof a&&(a=t-a,e.pageX>a))){var s=ne(this.area.bottom,n);if(!("number"==typeof s&&(s=n-s,e.pageY>s))){var o=ne(this.area.left,t);"number"==typeof o&&e.pageX<o||(this.startPosition={x:e.pageX,y:e.pageY},this.state=ee)}}}},e.prototype.stop=function(e){if(this.state==te){var t=this._dragDirection(),n=this._eventDetail(t);if(this._dispatchEvents("drag*End",n),Math.abs(this.movement[this.axis])>this.treshold.swipe){var i=this._swipeDirection();n.direction=i,this._dispatchEvents("swipe*",n)}}this.state=$},e.prototype.move=function(e){switch(this.state){case ee:case te:this.movement={x:e.movementX,y:e.movementY},this.distance={x:e.pageX-this.startPosition.x,y:e.pageY-this.startPosition.y},this.axis=Math.abs(this.distance.x)>Math.abs(this.distance.y)?"x":"y";var t=this._dragDirection(),n=this._eventDetail(t);this.state==ee&&Math.abs(this.distance[this.axis])>this.treshold.start&&(this._dispatchEvents("drag*Start",n),this.state=te),this.state==te&&this._dispatchEvents("drag*Move",n)}},e.prototype._eventDetail=function(e){var t=this.distance.x,n=this.distance.y;return"x"==this.axis&&(t-=t>0?this.treshold.start:0-this.treshold.start),"y"==this.axis&&(n-=n>0?this.treshold.start:0-this.treshold.start),{axis:this.axis,direction:e,movementX:this.movement.x,movementY:this.movement.y,distanceX:t,distanceY:n}},e.prototype._dispatchEvents=function(e,t){var n=new CustomEvent(e.replace("*",""),{detail:t});this.surface.dispatchEvent(n);var i=new CustomEvent(e.replace("*",this.axis.toUpperCase()),{detail:t});this.surface.dispatchEvent(i);var a=new CustomEvent(e.replace("*",t.direction),{detail:t});this.surface.dispatchEvent(a)},e.prototype._dragDirection=function(){return J[this.axis][this.distance[this.axis]>0?0:1]},e.prototype._swipeDirection=function(){return J[this.axis][this.movement[this.axis]>0?0:1]},e}(),ae=null,se=null,oe=0,re=function(e,t,n){switch(e.position="left",e.zposition="back",["right","top","bottom"].forEach(function(n){t.indexOf("position-"+n)>-1&&(e.position=n)}),["front","top","bottom"].forEach(function(n){t.indexOf("position-"+n)>-1&&(e.zposition="front")}),ae.area={top:"bottom"==e.position?"75%":0,right:"left"==e.position?"75%":0,bottom:"top"==e.position?"75%":0,left:"right"==e.position?"75%":0},e.position){case"top":case"bottom":e.axis="y";break;default:e.axis="x"}switch(e.position){case"top":e.direction="Down";break;case"right":e.direction="Left";break;case"bottom":e.direction="Up";break;default:e.direction="Right"}switch(e.zposition){case"front":e.slideOutNodes=[n];break;default:e.slideOutNodes=g(document.body,".mm-slideout")}return e};S.options.drag=Z;var ce={drop:!1,fitViewport:!0,event:"click",position:{},tip:!0};var le={offset:{button:{x:-5,y:5},viewport:{x:20,y:20}},height:{max:880},width:{max:440}};S.options.dropdown=ce,S.configs.dropdown=le;var me={insertMethod:"append",insertSelector:"body"};S.configs.fixedElements=me,S.configs.classNames.fixedElements={fixed:"Fixed"};var de={use:!1,top:[],bottom:[],position:"left",type:"default"};S.options.iconbar=de;var pe={add:!1,blockPanel:!0,hideDivider:!1,hideNavbar:!0,visible:3};S.options.iconPanels=pe;var fe={enable:!1,enhance:!1};S.options.keyboardNavigation=fe;var ue=function(e){var t=this;N(document.body,"keydown.tabguard"),N(document.body,"focusin.tabguard"),C(document.body,"focusin.tabguard",function(e){if(t.node.wrpr.matches(".mm-wrapper_opened")){var n=e.target;if(n.matches(".mm-tabend")){var i=void 0;n.parentElement.matches(".mm-menu")&&S.node.blck&&(i=S.node.blck),n.parentElement.matches(".mm-wrapper__blocker")&&(i=g(document.body,".mm-menu_offcanvas.mm-menu_opened")[0]),i||(i=n.parentElement),i&&_(i,".mm-tabstart")[0].focus()}}}),N(document.body,"keydown.navigate"),C(document.body,"keydown.navigate",function(t){var n=t.target,i=n.closest(".mm-menu");if(i){i.mmApi;if(!n.matches("input, textarea"))switch(t.keyCode){case 13:(n.matches(".mm-toggle")||n.matches(".mm-check"))&&n.dispatchEvent(new Event("click"));break;case 32:case 37:case 38:case 39:case 40:t.preventDefault()}if(e)if(n.matches("input"))switch(t.keyCode){case 27:n.value=""}else{var a=i.mmApi;switch(t.keyCode){case 8:var s=g(i,".mm-panel_opened")[0].mmParent;s&&a.openPanel(s.closest(".mm-panel"));break;case 27:i.matches(".mm-menu_offcanvas")&&a.close()}}}})},he={load:!1};S.options.lazySubmenus=he;var ve=[];var be={breadcrumbs:{separator:"/",removeFirst:!1}};function ge(){var e=this,t=this.opts.navbars;if(void 0!==t){t instanceof Array||(t=[t]);var n={};t.length&&(t.forEach(function(t){if(!(t=function(e){return"boolean"==typeof e&&e&&(e={}),"object"!=typeof e&&(e={}),void 0===e.content&&(e.content=["prev","title"]),e.content instanceof Array||(e.content=[e.content]),void 0===e.use&&(e.use=!0),"boolean"==typeof e.use&&e.use&&(e.use=!0),e}(t)).use)return!1;var i=b("div.mm-navbar"),a=t.position;"bottom"!==a&&(a="top"),n[a]||(n[a]=b("div.mm-navbars_"+a)),n[a].append(i);for(var s=0,o=t.content.length;s<o;s++){var r,c=t.content[s];if("string"==typeof c)if("function"==typeof(r=ge.navbarContents[c]))r.call(e,i);else{var l=b("span");l.innerHTML=c;var m=_(l);1==m.length&&(l=m[0]),i.append(l)}else i.append(c)}"string"==typeof t.type&&("function"==typeof(r=ge.navbarTypes[t.type])&&r.call(e,i));"boolean"!=typeof t.use&&k(t.use,function(){i.classList.remove("mm-hidden"),S.sr_aria(i,"hidden",!1)},function(){i.classList.add("mm-hidden"),S.sr_aria(i,"hidden",!0)})}),this.bind("initMenu:after",function(){for(var t in n)e.node.menu["bottom"==t?"append":"prepend"](n[t])}))}}S.options.navbars=ve,S.configs.navbars=be,S.configs.classNames.navbars={panelNext:"Next",panelPrev:"Prev",panelTitle:"Title"},ge.navbarContents={breadcrumbs:function(e){var t=this,n=b("div.mm-navbar__breadcrumbs");e.append(n),this.bind("initNavbar:after",function(e){if(!e.querySelector(".mm-navbar__breadcrumbs")){_(e,".mm-navbar")[0].classList.add("mm-hidden");for(var n=[],i=b("span.mm-navbar__breadcrumbs"),a=e,s=!0;a;){if(!(a=a.closest(".mm-panel")).parentElement.matches(".mm-listitem_vertical")){var o=g(a,".mm-navbar__title")[0];if(o){var r=o.textContent;r.length&&n.unshift(s?"<span>"+r+"</span>":'<a href="#'+a.id+'">'+r+"</a>")}s=!1}a=a.mmParent}t.conf.navbars.breadcrumbs.removeFirst&&n.shift(),i.innerHTML=n.join('<span class="mm-separator">'+t.conf.navbars.breadcrumbs.separator+"</span>"),_(e,".mm-navbar")[0].append(i)}}),this.bind("openPanel:start",function(e){var t=e.querySelector(".mm-navbar__breadcrumbs");n.innerHTML=t?t.innerHTML:""}),this.bind("initNavbar:after:sr-aria",function(e){g(e,".mm-breadcrumbs a").forEach(function(e){S.sr_aria(e,"owns",e.getAttribute("href").slice(1))})})},close:function(e){var t=this,n=b("a.mm-btn.mm-btn_close.mm-navbar__btn");e.append(n),this.bind("setPage:after",function(e){n.setAttribute("href","#"+e.id)}),this.bind("setPage:after:sr-text",function(){n.innerHTML=S.sr_text(t.i18n(t.conf.screenReader.text.closeMenu)),S.sr_aria(n,"owns",n.getAttribute("href").slice(1))})},next:function(e){var t,n,i,a=this,s=b("a.mm-btn.mm-btn_next.mm-navbar__btn");e.append(s),this.bind("openPanel:start",function(e){t=e.querySelector("."+a.conf.classNames.navbars.panelNext),n=t?t.getAttribute("href"):"",i=t?t.innerHTML:"",n?s.setAttribute("href",n):s.removeAttribute("href"),s.classList[n||i?"remove":"add"]("mm-hidden"),s.innerHTML=i}),this.bind("openPanel:start:sr-aria",function(e){S.sr_aria(s,"hidden",s.matches("mm-hidden")),S.sr_aria(s,"owns",(s.getAttribute("href")||"").slice(1))})},prev:function(e){var t,n,i,a=this,s=b("a.mm-btn.mm-btn_prev.mm-navbar__btn");e.append(s),this.bind("initNavbar:after",function(e){_(e,".mm-navbar")[0].classList.add("mm-hidden")}),this.bind("openPanel:start",function(e){e.parentElement.matches(".mm-listitem_vertical")||((t=e.querySelector("."+a.conf.classNames.navbars.panelPrev))||(t=e.querySelector(".mm-navbar__btn.mm-btn_prev")),n=t?t.getAttribute("href"):"",i=t?t.innerHTML:"",n?s.setAttribute("href",n):s.removeAttribute("href"),s.classList[n||i?"remove":"add"]("mm-hidden"),s.innerHTML=i)}),this.bind("initNavbar:after:sr-aria",function(e){S.sr_aria(e.querySelector(".mm-navbar"),"hidden",!0)}),this.bind("openPanel:start:sr-aria",function(e){S.sr_aria(s,"hidden",s.matches(".mm-hidden")),S.sr_aria(s,"owns",(s.getAttribute("href")||"").slice(1))})},searchfield:function(e){"object"!=o(this.opts.searchfield)&&(this.opts.searchfield={});var t=b("div.mm-navbar__searchfield");e.append(t),this.opts.searchfield.add=!0,this.opts.searchfield.addTo=[t]},title:function(e){var t,n,i,a,s=this,o=b("a.mm-navbar__title");e.append(o),this.bind("openPanel:start",function(e){e.parentElement.matches(".mm-listitem_vertical")||((i=e.querySelector("."+s.conf.classNames.navbars.panelTitle))||(i=e.querySelector(".mm-navbar__title")),(t=i?i.getAttribute("href"):"")?o.setAttribute("href",t):o.removeAttribute("href"),n=i?i.innerHTML:"",o.innerHTML=n)}),this.bind("openPanel:start:sr-aria",function(e){if(s.opts.screenReader.text&&(a||_(s.node.menu,".mm-navbars_top, .mm-navbars_bottom").forEach(function(e){var t=e.querySelector(".mm-btn_prev");t&&(a=t)}),a)){var t=!0;"parent"==s.opts.navbar.titleLink&&(t=!a.matches(".mm-hidden")),S.sr_aria(o,"hidden",t)}})}},ge.navbarTypes={tabs:function(e){var t=this;e.classList.add("mm-navbar_tabs"),e.parentElement.classList.add("mm-navbars_has-tabs");var n=_(e,"a");e.addEventListener("click",function(e){var n=e.target;if(n.matches("a"))if(n.matches(".mm-navbar__tab_selected"))e.stopImmediatePropagation();else try{t.openPanel(t.node.menu.querySelector(n.getAttribute("href")),!1),e.stopImmediatePropagation()}catch(e){}}),this.bind("openPanel:start",function e(t){n.forEach(function(e){e.classList.remove("mm-navbar__tab_selected")});var i=n.filter(function(e){return e.matches('[href="#'+t.id+'"]')})[0];if(i)i.classList.add("mm-navbar__tab_selected");else{var a=t.mmParent;a&&e.call(this,a.closest(".mm-panel"))}})}};var _e={scroll:!1,update:!1};var ye={scrollOffset:0,updateOffset:50};S.options.pageScroll=_e,S.configs.pageScroll=ye;var Le={add:!1,addTo:"panels",cancel:!1,noResults:"No results found.",placeholder:"Search",panel:{add:!1,dividers:!0,fx:"none",id:null,splash:null,title:"Search"},search:!0,showTextItems:!1,showSubPanels:!0};var we={clear:!1,form:!1,input:!1,submit:!1},Ee={Search:"جستجو","No results found.":"نتیجه‌ای یافت نشد.",cancel:"انصراف"},xe={Search:"Suche","No results found.":"Keine Ergebnisse gefunden.",cancel:"beenden"},ke={Search:"Найти","No results found.":"Ничего не найдено.",cancel:"отменить"};f({Search:"Zoeken","No results found.":"Geen resultaten gevonden.",cancel:"annuleren"},"nl"),f(Ee,"fa"),f(xe,"de"),f(ke,"ru"),S.options.searchfield=Le,S.configs.searchfield=we;var Pe=function(){var e=this.opts.searchfield,t=(this.conf.searchfield,_(this.node.pnls,".mm-panel_search")[0]);if(t)return t;t=b("div.mm-panel.mm-panel_search.mm-hidden"),e.panel.id&&(t.id=e.panel.id),e.panel.title&&(t.dataset.mmTitle=e.panel.title);var n=b("ul");switch(t.append(n),this.node.pnls.append(t),this.initListview(n),this._initNavbar(t),e.panel.fx){case!1:break;case"none":t.classList.add("mm-panel_noanimation");break;default:t.classList.add("mm-panel_fx-"+e.panel.fx)}if(e.panel.splash){var i=b("div.mm-panel__content");i.innerHTML=e.panel.splash,t.append(i)}return t.classList.add("mm-panel"),t.classList.add("mm-hidden"),this.node.pnls.append(t),t},Se=function(e){var t=this.opts.searchfield,n=this.conf.searchfield;if(e.parentElement.matches(".mm-listitem_vertical"))return null;if(s=g(e,".mm-searchfield")[0])return s;function i(e,t){if(t)for(var n in t)e.setAttribute(n,t[n])}var a,s=b((n.form?"form":"div")+".mm-searchfield"),o=b("div.mm-searchfield__input"),r=b("input");(r.type="text",r.autocomplete="off",r.placeholder=this.i18n(t.placeholder),o.append(r),s.append(o),e.prepend(s),i(r,n.input),n.clear)&&((a=b("a.mm-btn.mm-btn_close.mm-searchfield__btn")).setAttribute("href","#"),o.append(a));(i(s,n.form),n.form&&n.submit&&!n.clear)&&((a=b("a.mm-btn.mm-btn_next.mm-searchfield__btn")).setAttribute("href","#"),o.append(a));t.cancel&&((a=b("a.mm-searchfield__cancel")).setAttribute("href","#"),a.textContent=this.i18n("cancel"),s.append(a));return s},Me=function(e){var t=this,n=this.opts.searchfield,i=(this.conf.searchfield,{});e.closest(".mm-panel_search")?(i.panels=g(this.node.pnls,".mm-panel"),i.noresults=[e.closest(".mm-panel")]):e.closest(".mm-panel")?(i.panels=[e.closest(".mm-panel")],i.noresults=i.panels):(i.panels=g(this.node.pnls,".mm-panel"),i.noresults=[this.node.menu]),i.panels=i.panels.filter(function(e){return!e.parentElement.matches(".mm-listitem_vertical")}),i.panels=i.panels.filter(function(e){return!e.matches(".mm-panel_search")}),i.listitems=[],i.dividers=[],i.panels.forEach(function(e){var t,n;(t=i.listitems).push.apply(t,g(e,".mm-listitem")),(n=i.dividers).push.apply(n,g(e,".mm-divider"))});var a=_(this.node.pnls,".mm-panel_search")[0],s=g(e,"input")[0],o=g(e,".mm-searchfield__cancel")[0];s.mmSearchfield=i,n.panel.add&&n.panel.splash&&(N(s,"focus.splash"),C(s,"focus.splash",function(e){t.openPanel(a)})),n.cancel&&(N(s,"focus.cancel"),C(s,"focus.cancel",function(e){o.classList.add("mm-searchfield__cancel-active")}),N(o,"click.splash"),C(o,"click.splash",function(e){if(e.preventDefault(),o.classList.remove("mm-searchfield__cancel-active"),a.matches(".mm-panel_opened")){var n=_(t.node.pnls,".mm-panel_opened-parent");n.length&&t.openPanel(n[n.length-1])}})),n.panel.add&&"panel"==n.addTo&&this.bind("openPanel:finish",function(e){e===a&&s.focus()}),N(s,"input.search"),C(s,"input.search",function(e){switch(e.keyCode){case 9:case 16:case 17:case 18:case 37:case 38:case 39:case 40:break;default:t.search(s)}}),this.search(s)},Ae=function(e){if(e){var t=this.opts.searchfield;this.conf.searchfield;if(e.closest(".mm-panel")||(e=_(this.node.pnls,".mm-panel")[0]),!_(e,".mm-panel__noresultsmsg").length){var n=b("div.mm-panel__noresultsmsg.mm-hidden");n.innerHTML=this.i18n(t.noResults),e.append(n)}}};S.prototype.search=function(e,t){var n,i=this,a=this.opts.searchfield;this.conf.searchfield;t=(t=t||""+e.value).toLowerCase().trim();var s=e.mmSearchfield,o=g(e.closest(".mm-searchfield"),".mm-btn"),r=_(this.node.pnls,".mm-panel_search")[0],c=s.panels,l=s.noresults,m=s.listitems,d=s.dividers;if(m.forEach(function(e){e.classList.remove("mm-listitem_nosubitems"),e.classList.remove("mm-listitem_onlysubitems"),e.classList.remove("mm-hidden")}),r&&(_(r,".mm-listview")[0].innerHTML=""),c.forEach(function(e){e.scrollTop=0}),t.length){d.forEach(function(e){e.classList.add("mm-hidden")}),m.forEach(function(e){var n,i=_(e,".mm-listitem__text")[0],s=!1;i&&(n=i,Array.prototype.slice.call(n.childNodes).filter(function(e){return 3==e.nodeType}).map(function(e){return e.textContent}).join(" ")).toLowerCase().indexOf(t)>-1&&(i.matches(".mm-listitem__btn")?a.showSubPanels&&(s=!0):i.matches("a")?s=!0:a.showTextItems&&(s=!0)),s||e.classList.add("mm-hidden")});var p=m.filter(function(e){return!e.matches(".mm-hidden")}).length;if(a.panel.add){var f=[];c.forEach(function(e){var t=L(g(e,".mm-listitem"));if((t=t.filter(function(e){return!e.matches(".mm-hidden")})).length){if(a.panel.dividers){var n=b("li.mm-divider"),i=g(e,".mm-navbar__title")[0];i&&(n.innerHTML=i.innerHTML,f.push(n))}t.forEach(function(e){f.push(e.cloneNode(!0))})}}),f.forEach(function(e){e.querySelectorAll(".mm-toggle, .mm-check").forEach(function(e){e.remove()})}),(n=_(r,".mm-listview")[0]).append.apply(n,f),this.openPanel(r)}else a.showSubPanels&&c.forEach(function(e){L(g(e,".mm-listitem")).forEach(function(e){var t=e.mmChild;t&&g(t,".mm-listitem").forEach(function(e){e.classList.remove("mm-hidden")})})}),c.slice().reverse().forEach(function(t,n){var a=t.mmParent;a&&(L(g(t,".mm-listitem")).length?(a.matches(".mm-hidden")&&a.classList.remove("mm-hidden"),a.classList.add("mm-listitem_onlysubitems")):e.closest(".mm-panel")||((t.matches(".mm-panel_opened")||t.matches(".mm-panel_opened-parent"))&&setTimeout(function(){i.openPanel(a.closest(".mm-panel"))},(n+1)*(1.5*i.conf.openingInterval)),a.classList.add("mm-listitem_nosubitems")))}),c.forEach(function(e){L(g(e,".mm-listitem")).forEach(function(e){var t=function(e,t){for(var n=[],i=e.previousElementSibling;i;)t&&!i.matches(t)||n.push(i),i=i.previousElementSibling;return n}(e,".mm-divider")[0];t&&t.classList.remove("mm-hidden")})});o.forEach(function(e){return e.classList.remove("mm-hidden")}),l.forEach(function(e){g(e,".mm-panel__noresultsmsg").forEach(function(e){return e.classList[p?"add":"remove"]("mm-hidden")})}),a.panel.add&&(a.panel.splash&&g(r,".mm-panel__content").forEach(function(e){return e.classList.add("mm-hidden")}),m.forEach(function(e){return e.classList.remove("mm-hidden")}),d.forEach(function(e){return e.classList.remove("mm-hidden")}))}else if(m.forEach(function(e){return e.classList.remove("mm-hidden")}),d.forEach(function(e){return e.classList.remove("mm-hidden")}),o.forEach(function(e){return e.classList.add("mm-hidden")}),l.forEach(function(e){g(e,".mm-panel__noresultsmsg").forEach(function(e){return e.classList.add("mm-hidden")})}),a.panel.add)if(a.panel.splash)g(r,".mm-panel__content").forEach(function(e){return e.classList.remove("mm-hidden")});else if(!e.closest(".mm-panel_search")){var u=_(this.node.pnls,".mm-panel_opened-parent");this.openPanel(u.slice(-1)[0])}this.trigger("updateListview")};var Te={add:!1,addTo:"panels"};S.options.sectionIndexer=Te;var Ce={current:!0,hover:!1,parent:!1};S.options.setSelected=Ce;var Ne={collapsed:{use:!1,blockMenu:!0,hideDivider:!1,hideNavbar:!0},expanded:{use:!1,initial:"open"}};S.options.sidebar=Ne;S.configs.classNames.toggles={toggle:"Toggle",check:"Check"};
/*!
 * mmenu.js
 * mmenujs.com
 *
 * Copyright (c) Fred Heusschen
 * frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
S.addons={offcanvas:function(){var e=this;if(this.opts.offCanvas){var t=function(e){return"object"!=typeof e&&(e={}),e}(this.opts.offCanvas);this.opts.offCanvas=s(t,S.options.offCanvas);var n=this.conf.offCanvas;this._api.push("open","close","setPage"),this.vars.opened=!1,this.bind("initMenu:before",function(){n.clone&&(e.node.menu=e.node.menu.cloneNode(!0),e.node.menu.id&&(e.node.menu.id="mm-"+e.node.menu.id),g(e.node.menu,"[id]").forEach(function(e){e.id="mm-"+e.id})),e.node.wrpr=document.body,document.querySelector(n.menu.insertSelector)[n.menu.insertMethod](e.node.menu)}),this.bind("initMenu:after",function(){j.call(e),e.setPage(S.node.page),H.call(e),e.node.menu.classList.add("mm-menu_offcanvas");var t=window.location.hash;if(t){var n=d(e.node.menu.id);n&&n==t.slice(1)&&setTimeout(function(){e.open()},1e3)}}),this.bind("setPage:after",function(e){S.node.blck&&_(S.node.blck,"a").forEach(function(t){t.setAttribute("href","#"+e.id)})}),this.bind("open:start:sr-aria",function(){S.sr_aria(e.node.menu,"hidden",!1)}),this.bind("close:finish:sr-aria",function(){S.sr_aria(e.node.menu,"hidden",!0)}),this.bind("initMenu:after:sr-aria",function(){S.sr_aria(e.node.menu,"hidden",!0)}),this.bind("initBlocker:after:sr-text",function(){_(S.node.blck,"a").forEach(function(t){t.innerHTML=S.sr_text(e.i18n(e.conf.screenReader.text.closeMenu))})}),this.clck.push(function(t,n){var i=d(e.node.menu.id);if(i&&t.matches('[href="#'+i+'"]')){if(n.inMenu)return e.open(),!0;var a=t.closest(".mm-menu");if(a){var s=a.mmApi;if(s&&s.close)return s.close(),c(a,function(){e.open()},e.conf.transitionDuration),!0}return e.open(),!0}if((i=S.node.page.id)&&t.matches('[href="#'+i+'"]'))return e.close(),!0})}},screenReader:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={aria:e,text:e}),"object"!=typeof e&&(e={}),e}(this.opts.screenReader);this.opts.screenReader=s(t,S.options.screenReader);var n=this.conf.screenReader;t.aria&&(this.bind("initAddons:after",function(){e.bind("initMenu:after",function(){this.trigger("initMenu:after:sr-aria",[].slice.call(arguments))}),e.bind("initNavbar:after",function(){this.trigger("initNavbar:after:sr-aria",[].slice.call(arguments))}),e.bind("openPanel:start",function(){this.trigger("openPanel:start:sr-aria",[].slice.call(arguments))}),e.bind("close:start",function(){this.trigger("close:start:sr-aria",[].slice.call(arguments))}),e.bind("close:finish",function(){this.trigger("close:finish:sr-aria",[].slice.call(arguments))}),e.bind("open:start",function(){this.trigger("open:start:sr-aria",[].slice.call(arguments))}),e.bind("initOpened:after",function(){this.trigger("initOpened:after:sr-aria",[].slice.call(arguments))})}),this.bind("updateListview",function(){e.node.pnls.querySelectorAll(".mm-listitem").forEach(function(e){S.sr_aria(e,"hidden",e.matches(".mm-hidden"))})}),this.bind("openPanel:start",function(t){var n=g(e.node.pnls,".mm-panel").filter(function(e){return e!==t}).filter(function(e){return!e.parentElement.matches(".mm-panel")}),i=[t];g(t,".mm-listitem_vertical .mm-listitem_opened").forEach(function(e){i.push.apply(i,_(e,".mm-panel"))}),n.forEach(function(e){S.sr_aria(e,"hidden",!0)}),i.forEach(function(e){S.sr_aria(e,"hidden",!1)})}),this.bind("closePanel",function(e){S.sr_aria(e,"hidden",!0)}),this.bind("initPanel:after",function(e){g(e,".mm-btn").forEach(function(e){S.sr_aria(e,"haspopup",!0);var t=e.getAttribute("href");t&&S.sr_aria(e,"owns",t.replace("#",""))})}),this.bind("initNavbar:after",function(e){var t=_(e,".mm-navbar")[0],n=t.matches(".mm-hidden");S.sr_aria(t,"hidden",n)}),t.text&&"parent"==this.opts.navbar.titleLink&&this.bind("initNavbar:after",function(e){var t=_(e,".mm-navbar")[0],n=!!t.querySelector(".mm-btn_prev");S.sr_aria(g(t,".mm-navbar__title")[0],"hidden",n)})),t.text&&(this.bind("initAddons:after",function(){e.bind("setPage:after",function(){this.trigger("setPage:after:sr-text",[].slice.call(arguments))}),e.bind("initBlocker:after",function(){this.trigger("initBlocker:after:sr-text",[].slice.call(arguments))})}),this.bind("initNavbar:after",function(t){var i=_(t,".mm-navbar")[0];if(i){var a=_(i,".mm-btn_prev")[0];a&&(a.innerHTML=S.sr_text(e.i18n(n.text.closeSubmenu)))}}),this.bind("initListview:after",function(t){var i=t.closest(".mm-panel").mmParent;if(i){var a=_(i,".mm-btn_next")[0];if(a){var s=e.i18n(n.text[a.parentElement.matches(".mm-listitem_vertical")?"toggleSubmenu":"openSubmenu"]);a.innerHTML+=S.sr_text(s)}}}))},scrollBugFix:function(){var e=this;if(U&&this.opts.offCanvas&&this.opts.offCanvas.blockUI){var t=function(e){return"boolean"==typeof e&&(e={fix:e}),"object"!=typeof e&&(e={}),e}(this.opts.scrollBugFix);if(this.opts.scrollBugFix=s(t,S.options.scrollBugFix),t.fix){var n,i,a=(n=this.node.menu,i="",n.addEventListener("touchmove",function(e){i="",e.movementY>0?i="down":e.movementY<0&&(i="up")}),{get:function(){return i}});this.node.menu.addEventListener("scroll",o,{passive:!1}),this.node.menu.addEventListener("touchmove",function(e){var t=e.target.closest(".mm-panel");t?t.scrollHeight===t.offsetHeight?o(e):(0==t.scrollTop&&"down"==a.get()||t.scrollHeight==t.scrollTop+t.offsetHeight&&"up"==a.get())&&o(e):o(e)},{passive:!1}),this.bind("open:start",function(){_(e.node.pnls,".mm-panel_opened")[0].scrollTop=0}),window.addEventListener("orientationchange",function(t){var n=_(e.node.pnls,".mm-panel_opened")[0];n.scrollTop=0,n.style["-webkit-overflow-scrolling"]="auto",n.style["-webkit-overflow-scrolling"]="touch"})}}function o(e){e.preventDefault(),e.stopPropagation()}},autoHeight:function(){var e=this,t=function(e){return"boolean"==typeof e&&e&&(e={height:"auto"}),"string"==typeof e&&(e={height:e}),"object"!=typeof e&&(e={}),e}(this.opts.autoHeight);if(this.opts.autoHeight=s(t,S.options.autoHeight),"auto"==t.height||"highest"==t.height){var n,i=(n=function(e){return e.parentElement.matches(".mm-listitem_vertical")&&(e=y(e,".mm-panel").filter(function(e){return!e.parentElement.matches(".mm-listitem_vertical")})[0]),e},function(){if(!e.opts.offCanvas||e.vars.opened){var i,a,s=0,o=e.node.menu.offsetHeight-e.node.pnls.offsetHeight;e.node.menu.classList.add("mm-menu_autoheight-measuring"),"auto"==t.height?((a=_(e.node.pnls,".mm-panel_opened")[0])&&(a=n(a)),a||(a=_(e.node.pnls,".mm-panel")[0]),s=a.scrollHeight):"highest"==t.height&&(i=0,_(e.node.pnls,".mm-panel").forEach(function(e){e=n(e),i=Math.max(i,e.scrollHeight)}),s=i),e.node.menu.style.height=s+o+"px",e.node.menu.classList.remove("mm-menu_autoheight-measuring")}});this.bind("initMenu:after",function(){e.node.menu.classList.add("mm-menu_autoheight")}),this.opts.offCanvas&&this.bind("open:start",i),"highest"==t.height&&this.bind("initPanels:after",i),"auto"==t.height&&(this.bind("updateListview",i),this.bind("openPanel:start",i))}},backButton:function(){var e=this;if(this.opts.offCanvas){var t=function(e){return"boolean"==typeof e&&(e={close:e}),"object"!=typeof e&&(e={}),e}(this.opts.backButton);this.opts.backButton=s(t,S.options.backButton);var n="#"+this.node.menu.id;if(t.close){var i=[],a=function(){i=[n],_(e.node.pnls,".mm-panel_opened, .mm-panel_opened-parent").forEach(function(e){i.push("#"+e.id)})};this.bind("open:finish",function(){history.pushState(null,document.title,n)}),this.bind("open:finish",a),this.bind("openPanel:finish",a),this.bind("close:finish",function(){i=[],history.back(),history.pushState(null,document.title,location.pathname+location.search)}),window.addEventListener("popstate",function(t){if(e.vars.opened&&i.length){var a=(i=i.slice(0,-1))[i.length-1];a==n?e.close():(e.openPanel(e.node.menu.querySelector(a)),history.pushState(null,document.title,n))}})}t.open&&window.addEventListener("popstate",function(t){e.vars.opened||location.hash!=n||e.open()})}},columns:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={add:e}),"number"==typeof e&&(e={add:!0,visible:e}),"object"!=typeof e&&(e={}),"number"==typeof e.visible&&(e.visible={min:e.visible,max:e.visible}),e}(this.opts.columns);if(this.opts.columns=s(t,S.options.columns),t.add){t.visible.min=Math.max(1,Math.min(6,t.visible.min)),t.visible.max=Math.max(t.visible.min,Math.min(6,t.visible.max));for(var n=[],i=[],a=["mm-panel_opened","mm-panel_opened-parent","mm-panel_highest"],o=0;o<=t.visible.max;o++)n.push("mm-menu_columns-"+o),i.push("mm-panel_columns-"+o);a.push.apply(a,i),this.bind("openPanel:before",function(t){var n;if(t&&(n=t.mmParent),n&&(n=n.closest(".mm-panel"))){var i=n.className;if(i.length&&(i=i.split("mm-panel_columns-")[1]))for(var s=parseInt(i.split(" ")[0],10)+1;s>0;){if(!(t=_(e.node.pnls,".mm-panel_columns-"+s)[0])){s=-1;break}s++,t.classList.add("mm-hidden"),a.forEach(function(e){t.classList.remove(e)})}}}),this.bind("openPanel:start",function(a){var s=_(e.node.pnls,".mm-panel_opened-parent").length;a.matches(".mm-panel_opened-parent")||s++,s=Math.min(t.visible.max,Math.max(t.visible.min,s)),n.forEach(function(t){e.node.menu.classList.remove(t)}),e.node.menu.classList.add("mm-menu_columns-"+s);var o=[];_(e.node.pnls,".mm-panel").forEach(function(e){i.forEach(function(t){e.classList.remove(t)}),e.matches(".mm-panel_opened-parent")&&o.push(e)}),o.push(a),o.slice(-t.visible.max).forEach(function(e,t){e.classList.add("mm-panel_columns-"+t)})})}},counters:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={add:e,addTo:"panels",count:e}),"object"!=typeof e&&(e={}),"panels"==e.addTo&&(e.addTo=".mm-listview"),e}(this.opts.counters);if(this.opts.counters=s(t,S.options.counters),this.bind("initListview:after",function(t){var n=e.conf.classNames.counters.counter;g(t,"."+n).forEach(function(e){E(e,n,"mm-counter")})}),t.add&&this.bind("initListview:after",function(e){if(e.matches(t.addTo)){var n=e.closest(".mm-panel").mmParent;if(n&&!g(n,".mm-counter").length){var i=_(n,".mm-btn")[0];i&&i.prepend(b("span.mm-counter"))}}}),t.count){var n=function(t){(t?[t.closest(".mm-panel")]:_(e.node.pnls,".mm-panel")).forEach(function(e){var t=e.mmParent;if(t){var n=g(t,".mm-counter")[0];if(n){var i=[];_(e,".mm-listview").forEach(function(e){i.push.apply(i,_(e))}),n.innerHTML=L(i).length.toString()}}})};this.bind("initListview:after",n),this.bind("updateListview",n)}},dividers:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={add:e}),"object"!=typeof e&&(e={}),"panels"==e.addTo&&(e.addTo=".mm-listview"),e}(this.opts.dividers);this.opts.dividers=s(t,S.options.dividers),this.bind("initListview:after",function(t){_(t).forEach(function(t){E(t,e.conf.classNames.divider,"mm-divider"),t.matches(".mm-divider")&&t.classList.remove("mm-listitem")})}),t.add&&this.bind("initListview:after",function(e){if(e.matches(t.addTo)){g(e,".mm-divider").forEach(function(e){e.remove()});var n="";L(_(e)).forEach(function(t){var i=_(t,".mm-listitem__text")[0].textContent.trim().toLowerCase()[0];if(i.length&&i!=n){n=i;var a=b("li.mm-divider");a.textContent=i,e.insertBefore(a,t)}})}})},drag:function(){var e=this;if(this.opts.offCanvas){var t=function(e){return"boolean"==typeof e&&(e={open:e}),"object"!=typeof e&&(e={}),e}(this.opts.drag);this.opts.drag=s(t,S.options.drag),t.open&&this.bind("setPage:after",function(n){(function(e){var t=this,n={},i=!1,a=function(){var e=Object.keys(t.opts.extensions);e.length?(k(e.join(", "),function(){},function(){n=re(n,[],t.node.menu)}),e.forEach(function(e){k(e,function(){n=re(n,t.opts.extensions[e],t.node.menu)},function(){})})):n=re(n,[],t.node.menu)};se&&(N(se,"dragStart"),N(se,"dragMove"),N(se,"dragEnd")),ae=new ie(se=e),a(),a=function(){},se&&(C(se,"dragStart",function(e){e.detail.direction==n.direction&&(i=!0,t.node.wrpr.classList.add("mm-wrapper_dragging"),t._openSetup(),t.trigger("open:start"),oe=t.node.menu["x"==n.axis?"clientWidth":"clientHeight"])}),C(se,"dragMove",function(e){if(e.detail.axis==n.axis&&i){var t=e.detail["distance"+n.axis.toUpperCase()];switch(n.position){case"right":case"bottom":t=Math.min(Math.max(t,-oe),0);break;default:t=Math.max(Math.min(t,oe),0)}if("front"==n.zposition)switch(n.position){case"right":case"bottom":t+=oe;break;default:t-=oe}n.slideOutNodes.forEach(function(e){e.style.transform="translate"+n.axis.toUpperCase()+"("+t+"px)"})}}),C(se,"dragEnd",function(e){if(e.detail.axis==n.axis&&i){i=!1,t.node.wrpr.classList.remove("mm-wrapper_dragging"),n.slideOutNodes.forEach(function(e){e.style.transform=""});var a=Math.abs(e.detail["distance"+n.axis.toUpperCase()])>=.75*oe;if(!a){var s=e.detail["movement"+n.axis.toUpperCase()];switch(n.position){case"right":case"bottom":a=s<=0;break;default:a=s>=0}}a?t._openStart():t.close()}}))}).call(e,t.node||n)})}},dropdown:function(){var e=this;if(this.opts.offCanvas){var t=function(e){return"boolean"==typeof e&&e&&(e={drop:e}),"object"!=typeof e&&(e={}),"string"==typeof e.position&&(e.position={of:e.position}),e}(this.opts.dropdown);this.opts.dropdown=s(t,S.options.dropdown);var n=this.conf.dropdown;if(t.drop){var i;this.bind("initMenu:after",function(){if(e.node.menu.classList.add("mm-menu_dropdown"),"string"!=typeof t.position.of){var n=d(e.node.menu.id);n&&(t.position.of='[href="#'+n+'"]')}if("string"==typeof t.position.of){i=g(document.body,t.position.of)[0];var a=t.event.split(" ");1==a.length&&(a[1]=a[0]),"hover"==a[0]&&i.addEventListener("mouseenter",function(){e.open()},{passive:!0}),"hover"==a[1]&&e.node.menu.addEventListener("mouseleave",function(){e.close()},{passive:!0})}}),this.bind("open:start",function(){e.node.menu.mmStyle=e.node.menu.getAttribute("style"),e.node.wrpr.classList.add("mm-wrapper_dropdown")}),this.bind("close:finish",function(){e.node.menu.setAttribute("style",e.node.menu.mmStyle),e.node.wrpr.classList.remove("mm-wrapper_dropdown")});var a=function(e,a){var s,o,r,c=a[0],l=a[1],m="x"==e?"offsetWidth":"offsetHeight",d="x"==e?"left":"top",p="x"==e?"right":"bottom",f="x"==e?"width":"height",u="x"==e?"innerWidth":"innerHeight",h="x"==e?"maxWidth":"maxHeight",v=null,b=(s=d,i.getBoundingClientRect()[s]+document.body["left"===s?"scrollLeft":"scrollTop"]),g=b+i[m],_=window[u],y=n.offset.button[e]+n.offset.viewport[e];if(t.position[e])switch(t.position[e]){case"left":case"bottom":v="after";break;case"right":case"top":v="before"}return null===v&&(v=b+(g-b)/2<_/2?"after":"before"),"after"==v?(r=_-((o="x"==e?b:g)+y),c[d]=o+n.offset.button[e]+"px",c[p]="auto",t.tip&&l.push("mm-menu_tip-"+("x"==e?"left":"top"))):(r=(o="x"==e?g:b)-y,c[p]="calc( 100% - "+(o-n.offset.button[e])+"px )",c[d]="auto",t.tip&&l.push("mm-menu_tip-"+("x"==e?"right":"bottom"))),t.fitViewport&&(c[h]=Math.min(n[f].max,r)+"px"),[c,l]};this.bind("open:start",o),window.addEventListener("resize",function(t){o.call(e)},{passive:!0}),this.opts.offCanvas.blockUI||window.addEventListener("scroll",function(t){o.call(e)},{passive:!0})}}function o(){var e=this;if(this.vars.opened){this.node.menu.setAttribute("style",this.node.menu.mmStyle);var n=[{},[]];for(var i in n=a.call(this,"y",n),(n=a.call(this,"x",n))[0])this.node.menu.style[i]=n[0][i];t.tip&&(["mm-menu_tip-left","mm-menu_tip-right","mm-menu_tip-top","mm-menu_tip-bottom"].forEach(function(t){e.node.menu.classList.remove(t)}),n[1].forEach(function(t){e.node.menu.classList.add(t)}))}}},fixedElements:function(){var e=this;if(this.opts.offCanvas){var t,n,i=this.conf.fixedElements;this.bind("setPage:after",function(a){t=e.conf.classNames.fixedElements.fixed,n=g(document,i.insertSelector)[0],g(a,"."+t).forEach(function(e){E(e,t,"mm-slideout"),n[i.insertMethod](e)})})}},iconbar:function(){var e,t=this,n=function(e){return"array"==o(e)&&(e={use:!0,top:e}),"object"!=o(e)&&(e={}),void 0===e.use&&(e.use=!0),"boolean"==typeof e.use&&e.use&&(e.use=!0),e}(this.opts.iconbar);if(this.opts.iconbar=s(n,S.options.iconbar),n.use&&(["top","bottom"].forEach(function(t,i){var a=n[t];"array"!=o(a)&&(a=[a]);for(var s=b("div.mm-iconbar__"+t),r=0,c=a.length;r<c;r++)"string"==typeof a[r]?s.innerHTML+=a[r]:s.append(a[r]);s.children.length&&(e||(e=b("div.mm-iconbar")),e.append(s))}),e)){this.bind("initMenu:after",function(){t.node.menu.prepend(e)});var i="mm-menu_iconbar-"+n.position,a=function(){t.node.menu.classList.add(i),S.sr_aria(e,"hidden",!1)};if("boolean"==typeof n.use?this.bind("initMenu:after",a):k(n.use,a,function(){t.node.menu.classList.remove(i),S.sr_aria(e,"hidden",!0)}),"tabs"==n.type){e.classList.add("mm-iconbar_tabs"),e.addEventListener("click",function(e){var n=e.target;if(n.matches("a"))if(n.matches(".mm-iconbar__tab_selected"))e.stopImmediatePropagation();else try{var i=t.node.menu.querySelector(n.getAttribute("href"))[0];i&&i.matches(".mm-panel")&&(e.preventDefault(),e.stopImmediatePropagation(),t.openPanel(i,!1))}catch(e){}});var r=function(t){g(e,"a").forEach(function(e){e.classList.remove("mm-iconbar__tab_selected")});var n=g(e,'[href="#'+t.id+'"]')[0];if(n)n.classList.add("mm-iconbar__tab_selected");else{var i=t.mmParent;i&&r(i.closest(".mm-panel"))}};this.bind("openPanel:start",r)}}},iconPanels:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={add:e}),"number"!=typeof e&&"string"!=typeof e||(e={add:!0,visible:e}),"object"!=typeof e&&(e={}),e}(this.opts.iconPanels);this.opts.iconPanels=s(t,S.options.iconPanels);var n=!1;if("first"==t.visible&&(n=!0,t.visible=1),t.visible=Math.min(3,Math.max(1,t.visible)),t.visible++,t.add){this.bind("initMenu:after",function(){var n=["mm-menu_iconpanel"];t.hideNavbar&&n.push("mm-menu_hidenavbar"),t.hideDivider&&n.push("mm-menu_hidedivider"),n.forEach(function(t){e.node.menu.classList.add(t)})});var i=[];if(!n)for(var a=0;a<=t.visible;a++)i.push("mm-panel_iconpanel-"+a);this.bind("openPanel:start",function(a){var s=_(e.node.pnls,".mm-panel");if(!(a=a||s[0]).parentElement.matches(".mm-listitem_vertical"))if(n)s.forEach(function(e,t){e.classList[0==t?"add":"remove"]("mm-panel_iconpanel-first")});else{s.forEach(function(e){i.forEach(function(t){e.classList.remove(t)})}),s=s.filter(function(e){return e.matches(".mm-panel_opened-parent")});var o=!1;s.forEach(function(e){a===e&&(o=!0)}),o||s.push(a),s.forEach(function(e){e.classList.remove("mm-hidden")}),(s=s.slice(-t.visible)).forEach(function(e,t){e.classList.add("mm-panel_iconpanel-"+t)})}}),this.bind("initPanel:after",function(e){if(t.blockPanel&&!e.parentElement.matches(".mm-listitem_vertical")&&!_(e,".mm-panel__blocker")[0]){var n=b("a.mm-panel__blocker");n.setAttribute("href","#"+e.closest(".mm-panel").id),e.prepend(n)}})}},keyboardNavigation:function(){var e=this;if(!U){var t=function(e){return"boolean"!=typeof e&&"string"!=typeof e||(e={enable:e}),"object"!=typeof e&&(e={}),e}(this.opts.keyboardNavigation);if(this.opts.keyboardNavigation=s(t,S.options.keyboardNavigation),t.enable){var n=b("button.mm-tabstart.mm-sronly"),i=b("button.mm-tabend.mm-sronly"),a=b("button.mm-tabend.mm-sronly");this.bind("initMenu:after",function(){t.enhance&&e.node.menu.classList.add("mm-menu_keyboardfocus"),ue.call(e,t.enhance)}),this.bind("initOpened:before",function(){e.node.menu.prepend(n),e.node.menu.append(i),_(e.node.menu,".mm-navbars-top, .mm-navbars-bottom").forEach(function(e){e.querySelectorAll(".mm-navbar__title").forEach(function(e){e.setAttribute("tabindex","-1")})})}),this.bind("initBlocker:after",function(){S.node.blck.append(a),_(S.node.blck,"a")[0].classList.add("mm-tabstart")});var o="input, select, textarea, button, label, a[href]",r=function(n){n=n||_(e.node.pnls,".mm-panel_opened")[0];var i=null,a=document.activeElement.closest(".mm-navbar");if(!a||a.closest(".mm-menu")!=e.node.menu){if("default"==t.enable&&((i=g(n,".mm-listview a[href]:not(.mm-hidden)")[0])||(i=g(n,o+":not(.mm-hidden)")[0]),!i)){var s=[];_(e.node.menu,".mm-navbars_top, .mm-navbars_bottom").forEach(function(e){s.push.apply(s,g(e,o+":not(.mm-hidden)"))}),i=s[0]}i||(i=_(e.node.menu,".mm-tabstart")[0]),i&&i.focus()}};this.bind("open:finish",r),this.bind("openPanel:finish",r),this.bind("initOpened:after:sr-aria",function(){[e.node.menu,S.node.blck].forEach(function(e){_(e,".mm-tabstart, .mm-tabend").forEach(function(e){S.sr_aria(e,"hidden",!0),S.sr_role(e,"presentation")})})})}}},lazySubmenus:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={load:e}),"object"!=typeof e&&(e={}),e}(this.opts.lazySubmenus);this.opts.lazySubmenus=s(t,S.options.lazySubmenus),t.load&&(this.bind("initMenu:after",function(){var t=[];g(e.node.pnls,"li").forEach(function(n){t.push.apply(t,_(n,e.conf.panelNodetype.join(", ")))}),t.filter(function(e){return!e.matches(".mm-listview_inset")}).filter(function(e){return!e.matches(".mm-nolistview")}).filter(function(e){return!e.matches(".mm-nopanel")}).forEach(function(e){["mm-panel_lazysubmenu","mm-nolistview","mm-nopanel"].forEach(function(t){e.classList.add(t)})})}),this.bind("initPanels:before",function(){_(e.node.pnls,e.conf.panelNodetype.join(", ")).forEach(function(e){var t=".mm-panel_lazysubmenu",n=g(e,t);e.matches(t)&&n.unshift(e),n.filter(function(e){return!e.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu")}).forEach(function(e){["mm-panel_lazysubmenu","mm-nolistview","mm-nopanel"].forEach(function(t){e.classList.remove(t)})})})}),this.bind("initOpened:before",function(){var t=[];g(e.node.pnls,"."+e.conf.classNames.selected).forEach(function(e){t.push.apply(t,y(e,".mm-panel_lazysubmenu"))}),t.length&&(t.forEach(function(e){["mm-panel_lazysubmenu","mm-nolistview","mm-nopanel"].forEach(function(t){e.classList.remove(t)})}),e.initPanel(t[t.length-1]))}),this.bind("openPanel:before",function(t){var n=".mm-panel_lazysubmenu",i=g(t,n);t.matches(n)&&i.unshift(t),(i=i.filter(function(e){return!e.matches(".mm-panel_lazysubmenu .mm-panel_lazysubmenu")})).forEach(function(t){e.initPanel(t)})}))},navbars:ge,pageScroll:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={scroll:e}),"object"!=typeof e&&(e={}),e}(this.opts.pageScroll);this.opts.pageScroll=s(t,S.options.pageScroll);var n,i=this.conf.pageScroll;function a(){n&&window.scrollTo({top:n.getBoundingClientRect().top+document.scrollingElement.scrollTop-i.scrollOffset,behavior:"smooth"}),n=null}function o(e){try{return"#"!=e&&"#"==e.slice(0,1)?S.node.page.querySelector(e):null}catch(e){return null}}if(t.scroll&&this.bind("close:finish",function(){a()}),this.opts.offCanvas&&t.scroll&&this.clck.push(function(t,i){if(n=null,i.inMenu){var s=t.getAttribute("href");if(n=o(s))return e.node.menu.matches(".mm-menu_sidebar-expanded")&&e.node.wrpr.matches(".mm-wrapper_sidebar-expanded")?void a():{close:!0}}}),t.update){var r=[];this.bind("initListview:after",function(e){w(_(e,".mm-listitem")).forEach(function(e){var t=o(e.getAttribute("href"));t&&r.unshift(t)})});var c=-1;window.addEventListener("scroll",function(t){for(var n=window.scrollY,a=0;a<r.length;a++)if(r[a].offsetTop<n+i.updateOffset){if(c!==a){c=a;var s=w(g(_(e.node.pnls,".mm-panel_opened")[0],".mm-listitem"));(s=s.filter(function(e){return e.matches('[href="#'+r[a].id+'"]')})).length&&e.setSelected(s[0].parentElement)}break}})}},searchfield:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={add:e}),"object"!=typeof e&&(e={}),"boolean"==typeof e.panel&&(e.panel={add:e.panel}),"object"!=typeof e.panel&&(e.panel={}),"panel"==e.addTo&&(e.panel.add=!0),e.panel.add&&(e.showSubPanels=!1,e.panel.splash&&(e.cancel=!0)),e}(this.opts.searchfield);this.opts.searchfield=s(t,S.options.searchfield);this.conf.searchfield;t.add&&(this.bind("close:start",function(){g(e.node.menu,".mm-searchfield").forEach(function(e){e.blur()})}),this.bind("initPanel:after",function(n){var i=null;t.panel.add&&(i=Pe.call(e));var a=null;switch(t.addTo){case"panels":a=[n];break;case"panel":a=[i];break;default:"string"==typeof t.addTo?a=g(e.node.menu,t.addTo):"array"==o(t.addTo)&&(a=t.addTo)}a.forEach(function(n){n=Se.call(e,n),t.search&&n&&Me.call(e,n)}),t.noResults&&Ae.call(e,t.panel.add?i:n)}),this.clck.push(function(t,n){if(n.inMenu&&t.matches(".mm-searchfield__btn")){if(t.matches(".mm-btn_close")){var i=g(a=t.closest(".mm-searchfield"),"input")[0];return i.value="",e.search(i),!0}var a;if(t.matches(".mm-btn_next"))return(a=t.closest("form"))&&a.submit(),!0}}))},sectionIndexer:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={add:e}),"object"!=typeof e&&(e={}),e}(this.opts.sectionIndexer);this.opts.sectionIndexer=s(t,S.options.sectionIndexer),t.add&&this.bind("initPanels:after",function(){if(!e.node.indx){var t="";"abcdefghijklmnopqrstuvwxyz".split("").forEach(function(e){t+='<a href="#">'+e+"</a>"});var n=b("div.mm-sectionindexer");n.innerHTML=t,e.node.pnls.prepend(n),e.node.indx=n,e.node.indx.addEventListener("click",function(e){e.target.matches("a")&&e.preventDefault()});var i=function(t){if(t.target.matches("a")){var n=t.target.textContent,i=_(e.node.pnls,".mm-panel_opened")[0],a=-1,s=i.scrollTop;i.scrollTop=0,g(i,".mm-divider").filter(function(e){return!e.matches(".mm-hidden")}).forEach(function(e){a<0&&n==e.textContent.trim().slice(0,1).toLowerCase()&&(a=e.offsetTop)}),i.scrollTop=a>-1?a:s}};U?(e.node.indx.addEventListener("touchstart",i),e.node.indx.addEventListener("touchmove",i)):e.node.indx.addEventListener("mouseover",i)}e.bind("openPanel:start",function(t){var n=g(t,".mm-divider").filter(function(e){return!e.matches(".mm-hidden")}).length;e.node.indx.classList[n?"add":"remove"]("mm-sectionindexer_active")})})},setSelected:function(){var e=this,t=function(e){return"boolean"==typeof e&&(e={hover:e,parent:e}),"object"!=typeof e&&(e={}),e}(this.opts.setSelected);if(this.opts.setSelected=s(t,S.options.setSelected),"detect"==t.current){var n=function(t){t=t.split("?")[0].split("#")[0];var i=e.node.menu.querySelector('a[href="'+t+'"], a[href="'+t+'/"]');if(i)e.setSelected(i.parentElement);else{var a=t.split("/").slice(0,-1);a.length&&n(a.join("/"))}};this.bind("initMenu:after",function(){n.call(e,window.location.href)})}else t.current||this.bind("initListview:after",function(e){_(e,".mm-listitem_selected").forEach(function(e){e.classList.remove("mm-listitem_selected")})});t.hover&&this.bind("initMenu:after",function(){e.node.menu.classList.add("mm-menu_selected-hover")}),t.parent&&(this.bind("openPanel:finish",function(t){g(e.node.pnls,".mm-listitem_selected-parent").forEach(function(e){e.classList.remove("mm-listitem_selected-parent")});for(var n=t.mmParent;n;)n.matches(".mm-listitem_vertical")||n.classList.add("mm-listitem_selected-parent"),n=(n=n.closest(".mm-panel")).mmParent}),this.bind("initMenu:after",function(){e.node.menu.classList.add("mm-menu_selected-parent")}))},sidebar:function(){var e=this;if(this.opts.offCanvas){var t=function(e){return("string"==typeof e||"boolean"==typeof e&&e||"number"==typeof e)&&(e={expanded:e}),"object"!=typeof e&&(e={}),"boolean"==typeof e.collapsed&&e.collapsed&&(e.collapsed={use:!0}),"string"!=typeof e.collapsed&&"number"!=typeof e.collapsed||(e.collapsed={use:e.collapsed}),"object"!=typeof e.collapsed&&(e.collapsed={}),"boolean"==typeof e.expanded&&e.expanded&&(e.expanded={use:!0}),"string"!=typeof e.expanded&&"number"!=typeof e.expanded||(e.expanded={use:e.expanded}),"object"!=typeof e.expanded&&(e.expanded={}),e}(this.opts.sidebar);if(this.opts.sidebar=s(t,S.options.sidebar),t.collapsed.use){this.bind("initMenu:after",function(){if(e.node.menu.classList.add("mm-menu_sidebar-collapsed"),t.collapsed.blockMenu&&e.opts.offCanvas&&!_(e.node.menu,".mm-menu__blocker")[0]){var n=b("a.mm-menu__blocker");n.setAttribute("href","#"+e.node.menu.id),e.node.menu.prepend(n)}t.collapsed.hideNavbar&&e.node.menu.classList.add("mm-menu_hidenavbar"),t.collapsed.hideDivider&&e.node.menu.classList.add("mm-menu_hidedivider")});var n=function(){e.node.wrpr.classList.add("mm-wrapper_sidebar-collapsed")},i=function(){e.node.wrpr.classList.remove("mm-wrapper_sidebar-collapsed")};"boolean"==typeof t.collapsed.use?this.bind("initMenu:after",n):k(t.collapsed.use,n,i)}if(t.expanded.use){this.bind("initMenu:after",function(){e.node.menu.classList.add("mm-menu_sidebar-expanded")}),n=function(){e.node.wrpr.classList.add("mm-wrapper_sidebar-expanded"),e.node.wrpr.matches(".mm-wrapper_sidebar-closed")||e.open()},i=function(){e.node.wrpr.classList.remove("mm-wrapper_sidebar-expanded"),e.close()},"boolean"==typeof t.expanded.use?this.bind("initMenu:after",n):k(t.expanded.use,n,i),this.bind("close:start",function(){e.node.wrpr.matches(".mm-wrapper_sidebar-expanded")&&(e.node.wrpr.classList.add("mm-wrapper_sidebar-closed"),"remember"==t.expanded.initial&&window.localStorage.setItem("mmenuExpandedState","closed"))}),this.bind("open:start",function(){e.node.wrpr.matches(".mm-wrapper_sidebar-expanded")&&(e.node.wrpr.classList.remove("mm-wrapper_sidebar-closed"),"remember"==t.expanded.initial&&window.localStorage.setItem("mmenuExpandedState","open"))});var a=t.expanded.initial;if("remember"==t.expanded.initial){var o=window.localStorage.getItem("mmenuExpandedState");switch(o){case"open":case"closed":a=o}}"closed"==a&&this.bind("initMenu:after",function(){e.node.wrpr.classList.add("mm-wrapper_sidebar-closed")}),this.clck.push(function(n,i){if(i.inMenu&&i.inListview&&e.node.wrpr.matches(".mm-wrapper_sidebar-expanded"))return{close:"closed"==t.expanded.initial}})}}},toggles:function(){var e=this;this.bind("initPanel:after",function(t){g(t,"input").forEach(function(t){E(t,e.conf.classNames.toggles.toggle,"mm-toggle"),E(t,e.conf.classNames.toggles.check,"mm-check")})})}},S.wrappers={angular:function(){this.opts.onClick={close:!0,preventDefault:!1,setSelected:!0}},bootstrap:function(){var e=this;if(this.node.menu.matches(".navbar-collapse")){this.conf.offCanvas&&(this.conf.offCanvas.clone=!1);var t=b("nav"),n=b("div");t.append(n),_(this.node.menu).forEach(function(t){switch(!0){case t.matches(".navbar-nav"):n.append((i=t,a=b("ul"),g(i,".nav-item").forEach(function(e){var t=b("li");if(e.matches(".active")&&t.classList.add("Selected"),!e.matches(".nav-link")){var n=_(e,".dropdown-menu")[0];n&&t.append(o(n)),e=_(e,".nav-link")[0]}t.prepend(s(e)),a.append(t)}),a));break;case t.matches(".dropdown-menu"):n.append(o(t));break;case t.matches(".form-inline"):e.conf.searchfield.form={action:t.getAttribute("action")||null,method:t.getAttribute("method")||null},e.conf.searchfield.input={name:t.querySelector("input").getAttribute("name")||null},e.conf.searchfield.clear=!1,e.conf.searchfield.submit=!0;break;default:n.append(t.cloneNode(!0))}var i,a}),this.bind("initMenu:before",function(){document.body.prepend(t),e.node.menu=t});var i=this.node.menu.parentElement;if(i){var a=i.querySelector(".navbar-toggler");a&&(delete a.dataset.target,a.removeAttribute("aria-controls"),a.outerHTML=a.outerHTML,(a=i.querySelector(".navbar-toggler")).addEventListener("click",function(t){t.preventDefault(),t.stopImmediatePropagation(),e[e.vars.opened?"close":"open"]()}))}}function s(e){for(var t=b(e.matches("a")?"a":"span"),n=["href","title","target"],i=0;i<n.length;i++)void 0!==e.getAttribute(n[i])&&t.setAttribute(n[i],e.getAttribute(n[i]));return t.innerHTML=e.innerHTML,g(t,".sr-only").forEach(function(e){e.remove()}),t}function o(e){var t=b("ul");return _(e).forEach(function(e){var n=b("li");e.matches(".dropdown-divider")?n.classList.add("Divider"):e.matches(".dropdown-item")&&n.append(s(e)),t.append(n)}),t}},olark:function(){this.conf.offCanvas.page.noSelector.push("#olark")},turbolinks:function(){var e;document.addEventListener("turbolinks:before-visit",function(t){e=document.querySelector(".mm-wrapper").className.split(" ").filter(function(e){return/mm-/.test(e)})}),document.addEventListener("turbolinks:load",function(t){void 0!==e&&(document.querySelector(".mm-wrapper").className=e)})},wordpress:function(){this.conf.classNames.selected="current-menu-item";var e=document.getElementById("wpadminbar");e&&(e.style.position="fixed",e.classList.add("mm-slideout"))}};var He;t.default=S;window.Mmenu=S,(He=window.jQuery||window.Zepto||null)&&(He.fn.mmenu=function(e,t){var n=He();return this.each(function(i,a){if(a.mmApi)return;let s=new S(a,e,t),o=He(s.node.menu);o.data("mmenu",s.API),n=n.add(o)}),n})}]);
/**
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = 'master';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});

var scrolltotop = {
    //startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control
    //scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).
    setting: {startline: 100, scrollto: 0, scrollduration: 1000, fadeduration: [500, 100]},
    controlHTML: '', //<img src="assets/img/up.png" style="width:51px; height:42px" /> //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
    controlattrs: {offsetx: 5, offsety: 5}, //offset of control relative to right/ bottom of window corner
    anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

    state: {isvisible: false, shouldvisible: false},

    scrollup: function () {
        if (!this.cssfixedsupport) //if control is positioned using JavaScript
            this.$control.css({opacity: 0}); //hide control immediately after clicking it
        var dest = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
        if (typeof dest === "string" && jQuery('#' + dest).length === 1) //check element set by string exists
            dest = jQuery('#' + dest).offset().top;
        else
            dest = 0;
        this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
    },

    keepfixed: function () {
        var $window = jQuery(window);
        var controlx = $window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
        var controly = $window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
        this.$control.css({left: controlx + 'px', top: controly + 'px'})
    },

    togglecontrol: function () {
        var scrolltop = jQuery(window).scrollTop();
        if (!this.cssfixedsupport)
            this.keepfixed();
        this.state.shouldvisible = (scrolltop >= this.setting.startline);
        if (this.state.shouldvisible && !this.state.isvisible) {
            this.$control.stop().animate({opacity: 1}, this.setting.fadeduration[0]);
            this.state.isvisible = true
        }
        else if (this.state.shouldvisible === false && this.state.isvisible) {
            this.$control.stop().animate({opacity: 0}, this.setting.fadeduration[1]);
            this.state.isvisible = false
        }
    },

    init: function () {
        jQuery(document).ready(function ($) {
            var mainobj = scrolltotop;
            var iebrws = document.all;
            mainobj.cssfixedsupport = !iebrws || iebrws && document.compatMode === "CSS1Compat" && window.XMLHttpRequest; //not IE or IE7+ browsers in standards mode
            mainobj.$body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            mainobj.$control = $('<div id="topcontrol">' + mainobj.controlHTML + '</div>')
                .css({
                    position: mainobj.cssfixedsupport ? 'fixed' : 'absolute',
                    bottom: mainobj.controlattrs.offsety,
                    right: mainobj.controlattrs.offsetx,
                    opacity: 0,
                    cursor: 'pointer'
                })
                .attr({title: 'Scroll Back to Top'})
                .click(function () {
                    mainobj.scrollup();
                    return false
                })
                .appendTo('body');
            if (document.all && !window.XMLHttpRequest && mainobj.$control.text() !== '') //loose check for IE6 and below, plus whether control contains any text
                mainobj.$control.css({width: mainobj.$control.width()}); //IE6- seems to require an explicit width on a DIV containing text
            mainobj.togglecontrol();
            $('a[href="' + mainobj.anchorkeyword + '"]').click(function () {
                mainobj.scrollup();
                return false
            });
            $(window).bind('scroll resize', function (e) {
                mainobj.togglecontrol()
            })
        })
    }
};

scrolltotop.init();
var App = function () {


    function initBootstrap() {

        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();


        if ($('.navbar-onepage').length > 0) {
            $('body').scrollspy({ target: $('.navbar-onepage'), offset: ($('#nav-primary').height()+21) });
        }

    }


    function initHeader() {
        if (jQuery('.navbar-user').length > 0 && jQuery('.fixed-top').height() > 0 && jQuery('.navbar-user').height() > 0) {
            jQuery(window).scroll(function () {
                if (jQuery(window).scrollTop() > 100) {
                    jQuery('#nav-primary').addClass('navbar-shrinked');
                } else {
                    jQuery('#nav-primary').removeClass('navbar-shrinked');
                }
            });
        }

        $('.hero video').each(function() {
            var video = this;
            video.oncanplaythrough = function() {
                video.muted = true;
                video.play();
            }
        });
    }

    function initEqualHeight() {

        $('.cooppartner').matchHeight({
            byRow: true,
            property: 'min-height'
        });

    }


    function initMmenu() {

        var pageId = $('body').attr('id').split('_')[1];
        $('#sidemenu #elem_'+pageId+'').addClass('current');

        var navTitle = document.head.querySelector("[name=navtitle]") ? document.head.querySelector("[name=navtitle]").content : '';

        $('#sidemenu').mmenu({
            extensions: ['position-left', 'pagedim-black'],
            navbar: {
                title: navTitle
            },
            navbars: [{
                position: 'bottom',
                height: 2,
                content: ['<div id="mobile-footer"></div>']
            }],
            hooks: {
                /* change fixed position while opening the mmenu */
                'open:before': function() {
                    var scrollTopPosition = $(window).scrollTop();
                    $('.fixed-top').css('position', 'absolute').css('top', scrollTopPosition + 'px');
                },
                'close:finish': function() {
                    $('.fixed-top').css('position', 'fixed').css('top', '0px');
                }
            }
        },{
        classNames: {
            selected: 'current'
        }
        });

        $('#mobile-footer').html($('#nav-mobile-footer').html());
    }



    function initSmoothScroll() {

        var navbarHeight = $('#nav-primary').height();
        if ($('.navbar-user').length > 0) {
            navbarHeight -= $('.navbar-user').height();
        }


        var hash = window.location.hash;
        if (hash && document.getElementById(hash.substr(1)) != null) {
            $.smoothScroll({offset: -(navbarHeight+20), scrollTarget: hash});

            let el = $(hash+'[data-toggle=collapse]');
            if (el.length === 1) {
                let target = el.attr('data-target');
                if (target !== null) {
                    $(target).collapse('show');
                }
            }
        }


        /* section index on same pages */
        $('a.this-page').on('click', function(event) {
            event.preventDefault();

            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top-(navbarHeight+20)
            }, 800, function(){
            });
        });


        /* from here on only for one pager */
        if ($('.navbar-onepage').length === 0) return;

        /* Add smooth scrolling on all links inside the navbar */
        $('#page a[href*="#"]').not('.sr-only').not('[data-parent]').not('[data-toggle]').not('[data-slide]').on('click', function(event) {

            event.preventDefault();
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top-(navbarHeight+20)
            }, 800, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                //window.location.hash = hash;
            });
        });

        /* one page: link on logo */
        $('.navbar-onepage .navbar-brand a').on('click', function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800, function(){

            });
        });

        $('.nav-onepage a').on('click', function(event) {
            $(this).closest('.navbar-collapse.show').collapse('hide');
        });

    }

    function initAjaxModals() {

        var modalTemplate = jQuery('<div class="modal fade" id="ajax-modal" tabindex="-1" role="dialog" aria-labelledby="ajaxModalLabel" aria-hidden="true">\n' +
          ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
          ' <span aria-hidden="true">&times;</span>\n' +
          ' </button>\n' +
          ' <div class="modal-dialog" role="document">\n' +
          ' <div class="modal-content">\n' +
          ' <div class="modal-header">\n' +
          ' <h5 class="modal-title" id="ajaxModalLabel"></h5>\n' +
          ' </div>\n' +
          ' <div class="modal-text"></div>\n' +
          ' <div class="modal-body">\n' +
          ' </div>\n' +
          ' </div>\n' +
          ' </div>\n' +
          '</div>').attr('id','modalContact');


        jQuery('body').append(modalTemplate);
        let modalBody = modalTemplate.find('.modal-body');

        let showContent = function(content) {

            modalBody.html(content);
            modalTemplate.find('.modal-title').html(modalBody.find('h2').html());
            modalBody.find('h2').remove();
            let form = modalTemplate.find('form');

            form.find('[type=submit]').on('click', function (e) {
                e.preventDefault();

                /* show spinner */


                let values = form.serialize();
                values = values += '&'+jQuery(e.target).attr('name')+'='+jQuery(e.target).attr('value');

                jQuery.ajax({
                    type: "POST",
                    url: form.attr('action'),
                    data: values,
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    },
                    dataType: 'html',
                    success: showContent
                });

            });

        };

        jQuery('.modal-ajax').on('click', function (e) {
            e.preventDefault();
            let url = jQuery(this).data('url');

            /* show spinner */

            jQuery.ajax({
                type: "POST",
                url: url,
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                dataType: 'html',
                success: function (content) {
                    showContent(content);
                    modalTemplate.modal('show');

                    /* hide spinner */

                }
            });
        });

    }

    function initAriaBar() {

        if (jQuery('.nav-aria').length === 0) return;

        jQuery('body').addClass('with-aria-bar');

        if ($.cookie('aria-high-contrast') == '1') {
            jQuery('body').addClass('high-ct-enabled');
            jQuery(this).addClass('active');
            jQuery('.btn-contrast').addClass('active');
        }

        jQuery('.btn-contrast').on('click',function (event) {
            event.preventDefault();
            if (jQuery(this).hasClass('active')) {
                jQuery('body').removeClass('high-ct-enabled');
                jQuery(this).removeClass('active');
                $.removeCookie('aria-high-contrast');
            } else {
                jQuery('body').addClass('high-ct-enabled');
                jQuery(this).addClass('active');
                $.cookie('aria-high-contrast', '1');
            }
        });

    }

    return {
        init: function () {

            initBootstrap();
            initHeader();
            initMmenu();
            initSmoothScroll();
            initAriaBar();
            initEqualHeight();

        }
    }
}();

var page = $('body').not('.page-onepage').find('#page');

page.css('padding-top', $('.fixed-top').height());

jQuery(document).ready(function () {

    /* Padding der Seite einstellen, damit das Menü den Inhalt nicht überlappt.  */
    page.animate({'padding-top': $('.fixed-top').height()});
    $(window).resize(function () {
        page.css('padding-top', $('.fixed-top').height());
    });

    App.init();
});


$(document).ready(function () {
    $('.opt-in-btn').on("click", function (e) {
        e.preventDefault();

        var targetIframe = $(this).closest('.opt-in-frame-wrapper').find('iframe');
        var targetIframeSrc = targetIframe.attr('data-src');

        targetIframe.removeAttr('data-src');
        targetIframe.attr('src', targetIframeSrc);

        $(this).closest('.opt-in-overlay-wrapper').animate(
            {"opacity": "0"},
            {
                duration: 1000, easing: 'linear',
                complete: function () {
                    $(this).css('display', 'none');
                    targetIframe.animate(
                        {"opacity": "1"},
                        {duration: 500, easing: 'linear'}
                    );
                }
            }
        );
    });
});
