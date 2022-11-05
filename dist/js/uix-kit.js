/*!
 * 
 * DO NOT OVERRIDE THIS FILE.
 * Generated with "npm run build"
 *
 * ## Project Name        :  Uix Kit 中文
 * ## Project Description :  一个快速网页设计和开发的偏视觉交互的免费开发工具包，与 Bootstrap v5 兼容。
 * ## Project URL         :  https://uix-kit.13aq.com/
 * ## Version             :  4.7.0
 * ## Based on            :  Uix Kit (https://github.com/huikeyun/uix-kit)
 * ## Last Update         :  November 5, 2022
 * ## Created by          :  UIUX Lab (https://uiux.cc) (uiuxlab@gmail.com)
 * ## Released under the MIT license.
 *
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 696:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ML": () => (/* binding */ _gsScope)
/* harmony export */ });
/* unused harmony exports TweenLite, globals, default, SimpleTimeline, Animation, Ease, Linear, Power0, Power1, Power2, Power3, Power4, TweenPlugin, EventDispatcher */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* module decorator */ module = __webpack_require__.hmd(module);

/*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */

/* ES6 changes:
	- declare and export _gsScope at top.
	- set var TweenLite = the result of the main function
	- export default TweenLite at the bottom
	- return TweenLite at the bottom of the main function
	- pass in _gsScope as the first parameter of the main function (which is actually at the bottom)
	- remove the "export to multiple environments" in Definition().
 */
var _gsScope = typeof window !== "undefined" ? window :  true && module.exports && typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : undefined || {};
var TweenLite = function (window) {
  "use strict";

  var _exports = {},
    _doc = window.document,
    _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
  if (_globals.TweenLite) {
    return _globals.TweenLite; //in case the core set of classes is already loaded, don't instantiate twice.
  }

  var _namespace = function _namespace(ns) {
      var a = ns.split("."),
        p = _globals,
        i;
      for (i = 0; i < a.length; i++) {
        p[a[i]] = p = p[a[i]] || {};
      }
      return p;
    },
    gs = _namespace("com.greensock"),
    _tinyNum = 0.00000001,
    _slice = function _slice(a) {
      //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
      var b = [],
        l = a.length,
        i;
      for (i = 0; i !== l; b.push(a[i++])) {}
      return b;
    },
    _emptyFunc = function _emptyFunc() {},
    _isArray = function () {
      //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
      var toString = Object.prototype.toString,
        array = toString.call([]);
      return function (obj) {
        return obj != null && (obj instanceof Array || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(obj) === "object" && !!obj.push && toString.call(obj) === array);
      };
    }(),
    a,
    i,
    p,
    _ticker,
    _tickerActive,
    _defLookup = {},
    /**
     * @constructor
     * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
     * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
     * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
     * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
     *
     * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
     * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
     * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
     * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
     * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
     * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
     * sandbox the banner one like:
     *
     * <script>
     *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
     * </script>
     * <script src="js/greensock/v1.7/TweenMax.js"></script>
     * <script>
     *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
     * </script>
     * <script src="js/greensock/v1.6/TweenMax.js"></script>
     * <script>
     *     gs.TweenLite.to(...); //would use v1.7
     *     TweenLite.to(...); //would use v1.6
     * </script>
     *
     * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
     * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
     * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
     * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
     */
    Definition = function Definition(ns, dependencies, func, global) {
      this.sc = _defLookup[ns] ? _defLookup[ns].sc : []; //subclasses
      _defLookup[ns] = this;
      this.gsClass = null;
      this.func = func;
      var _classes = [];
      this.check = function (init) {
        var i = dependencies.length,
          missing = i,
          cur,
          a,
          n,
          cl;
        while (--i > -1) {
          if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
            _classes[i] = cur.gsClass;
            missing--;
          } else if (init) {
            cur.sc.push(this);
          }
        }
        if (missing === 0 && func) {
          a = ("com.greensock." + ns).split(".");
          n = a.pop();
          cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

          //exports to multiple environments
          if (global) {
            _globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
            /*
            if (typeof(module) !== "undefined" && module.exports) { //node
            	if (ns === moduleName) {
            		module.exports = _exports[moduleName] = cl;
            		for (i in _exports) {
            			cl[i] = _exports[i];
            		}
            	} else if (_exports[moduleName]) {
            		_exports[moduleName][n] = cl;
            	}
            } else if (typeof(define) === "function" && define.amd){ //AMD
            	define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
            }
            */
          }

          for (i = 0; i < this.sc.length; i++) {
            this.sc[i].check();
          }
        }
      };
      this.check(true);
    },
    //used to create Definition instances (which basically registers a class that has dependencies).
    _gsDefine = window._gsDefine = function (ns, dependencies, func, global) {
      return new Definition(ns, dependencies, func, global);
    },
    //a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
    _class = gs._class = function (ns, func, global) {
      func = func || function () {};
      _gsDefine(ns, [], function () {
        return func;
      }, global);
      return func;
    };
  _gsDefine.globals = _globals;

  /*
   * ----------------------------------------------------------------
   * Ease
   * ----------------------------------------------------------------
   */
  var _baseParams = [0, 0, 1, 1],
    Ease = _class("easing.Ease", function (func, extraParams, type, power) {
      this._func = func;
      this._type = type || 0;
      this._power = power || 0;
      this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
    }, true),
    _easeMap = Ease.map = {},
    _easeReg = Ease.register = function (ease, names, types, create) {
      var na = names.split(","),
        i = na.length,
        ta = (types || "easeIn,easeOut,easeInOut").split(","),
        e,
        name,
        j,
        type;
      while (--i > -1) {
        name = na[i];
        e = create ? _class("easing." + name, null, true) : gs.easing[name] || {};
        j = ta.length;
        while (--j > -1) {
          type = ta[j];
          _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
        }
      }
    };
  p = Ease.prototype;
  p._calcEnd = false;
  p.getRatio = function (p) {
    if (this._func) {
      this._params[0] = p;
      return this._func.apply(null, this._params);
    }
    var t = this._type,
      pw = this._power,
      r = t === 1 ? 1 - p : t === 2 ? p : p < 0.5 ? p * 2 : (1 - p) * 2;
    if (pw === 1) {
      r *= r;
    } else if (pw === 2) {
      r *= r * r;
    } else if (pw === 3) {
      r *= r * r * r;
    } else if (pw === 4) {
      r *= r * r * r * r;
    }
    return t === 1 ? 1 - r : t === 2 ? r : p < 0.5 ? r / 2 : 1 - r / 2;
  };

  //create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
  a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
  i = a.length;
  while (--i > -1) {
    p = a[i] + ",Power" + i;
    _easeReg(new Ease(null, null, 1, i), p, "easeOut", true);
    _easeReg(new Ease(null, null, 2, i), p, "easeIn" + (i === 0 ? ",easeNone" : ""));
    _easeReg(new Ease(null, null, 3, i), p, "easeInOut");
  }
  _easeMap.linear = gs.easing.Linear.easeIn;
  _easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks

  /*
   * ----------------------------------------------------------------
   * EventDispatcher
   * ----------------------------------------------------------------
   */
  var EventDispatcher = _class("events.EventDispatcher", function (target) {
    this._listeners = {};
    this._eventTarget = target || this;
  });
  p = EventDispatcher.prototype;
  p.addEventListener = function (type, callback, scope, useParam, priority) {
    priority = priority || 0;
    var list = this._listeners[type],
      index = 0,
      listener,
      i;
    if (this === _ticker && !_tickerActive) {
      _ticker.wake();
    }
    if (list == null) {
      this._listeners[type] = list = [];
    }
    i = list.length;
    while (--i > -1) {
      listener = list[i];
      if (listener.c === callback && listener.s === scope) {
        list.splice(i, 1);
      } else if (index === 0 && listener.pr < priority) {
        index = i + 1;
      }
    }
    list.splice(index, 0, {
      c: callback,
      s: scope,
      up: useParam,
      pr: priority
    });
  };
  p.removeEventListener = function (type, callback) {
    var list = this._listeners[type],
      i;
    if (list) {
      i = list.length;
      while (--i > -1) {
        if (list[i].c === callback) {
          list.splice(i, 1);
          return;
        }
      }
    }
  };
  p.dispatchEvent = function (type) {
    var list = this._listeners[type],
      i,
      t,
      listener;
    if (list) {
      i = list.length;
      if (i > 1) {
        list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
      }

      t = this._eventTarget;
      while (--i > -1) {
        listener = list[i];
        if (listener) {
          if (listener.up) {
            listener.c.call(listener.s || t, {
              type: type,
              target: t
            });
          } else {
            listener.c.call(listener.s || t);
          }
        }
      }
    }
  };

  /*
   * ----------------------------------------------------------------
   * Ticker
   * ----------------------------------------------------------------
   */
  var _reqAnimFrame = window.requestAnimationFrame,
    _cancelAnimFrame = window.cancelAnimationFrame,
    _getTime = Date.now || function () {
      return new Date().getTime();
    },
    _lastUpdate = _getTime();

  //now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
  a = ["ms", "moz", "webkit", "o"];
  i = a.length;
  while (--i > -1 && !_reqAnimFrame) {
    _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
    _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
  }
  _class("Ticker", function (fps, useRAF) {
    var _self = this,
      _startTime = _getTime(),
      _useRAF = useRAF !== false && _reqAnimFrame ? "auto" : false,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _tickWord = "tick",
      //helps reduce gc burden
      _fps,
      _req,
      _id,
      _gap,
      _nextTime,
      _tick = function _tick(manual) {
        var elapsed = _getTime() - _lastUpdate,
          overlap,
          dispatch;
        if (elapsed > _lagThreshold) {
          _startTime += elapsed - _adjustedLag;
        }
        _lastUpdate += elapsed;
        _self.time = (_lastUpdate - _startTime) / 1000;
        overlap = _self.time - _nextTime;
        if (!_fps || overlap > 0 || manual === true) {
          _self.frame++;
          _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
          dispatch = true;
        }
        if (manual !== true) {
          //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
          _id = _req(_tick);
        }
        if (dispatch) {
          _self.dispatchEvent(_tickWord);
        }
      };
    EventDispatcher.call(_self);
    _self.time = _self.frame = 0;
    _self.tick = function () {
      _tick(true);
    };
    _self.lagSmoothing = function (threshold, adjustedLag) {
      if (!arguments.length) {
        //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
        return _lagThreshold < 1 / _tinyNum;
      }
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited
      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    };
    _self.sleep = function () {
      if (_id == null) {
        return;
      }
      if (!_useRAF || !_cancelAnimFrame) {
        clearTimeout(_id);
      } else {
        _cancelAnimFrame(_id);
      }
      _req = _emptyFunc;
      _id = null;
      if (_self === _ticker) {
        _tickerActive = false;
      }
    };
    _self.wake = function (seamless) {
      if (_id !== null) {
        _self.sleep();
      } else if (seamless) {
        _startTime += -_lastUpdate + (_lastUpdate = _getTime());
      } else if (_self.frame > 10) {
        //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
        _lastUpdate = _getTime() - _lagThreshold + 5;
      }
      _req = _fps === 0 ? _emptyFunc : !_useRAF || !_reqAnimFrame ? function (f) {
        return setTimeout(f, (_nextTime - _self.time) * 1000 + 1 | 0);
      } : _reqAnimFrame;
      if (_self === _ticker) {
        _tickerActive = true;
      }
      _tick(2);
    };
    _self.fps = function (value) {
      if (!arguments.length) {
        return _fps;
      }
      _fps = value;
      _gap = 1 / (_fps || 60);
      _nextTime = this.time + _gap;
      _self.wake();
    };
    _self.useRAF = function (value) {
      if (!arguments.length) {
        return _useRAF;
      }
      _self.sleep();
      _useRAF = value;
      _self.fps(_fps);
    };
    _self.fps(fps);

    //a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
    setTimeout(function () {
      if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
        _self.useRAF(false);
      }
    }, 1500);
  });
  p = gs.Ticker.prototype = new gs.events.EventDispatcher();
  p.constructor = gs.Ticker;

  /*
   * ----------------------------------------------------------------
   * Animation
   * ----------------------------------------------------------------
   */
  var Animation = _class("core.Animation", function (duration, vars) {
    this.vars = vars = vars || {};
    this._duration = this._totalDuration = duration || 0;
    this._delay = Number(vars.delay) || 0;
    this._timeScale = 1;
    this._active = !!vars.immediateRender;
    this.data = vars.data;
    this._reversed = !!vars.reversed;
    if (!_rootTimeline) {
      return;
    }
    if (!_tickerActive) {
      //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
      _ticker.wake();
    }
    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
    tl.add(this, tl._time);
    if (this.vars.paused) {
      this.paused(true);
    }
  });
  _ticker = Animation.ticker = new gs.Ticker();
  p = Animation.prototype;
  p._dirty = p._gc = p._initted = p._paused = false;
  p._totalTime = p._time = 0;
  p._rawPrevTime = -1;
  p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
  p._paused = false;

  //some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
  var _checkTimeout = function _checkTimeout() {
    if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) {
      //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
      _ticker.wake();
    }
    var t = setTimeout(_checkTimeout, 2000);
    if (t.unref) {
      // allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
      t.unref();
    }
  };
  _checkTimeout();
  p.play = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }
    return this.reversed(false).paused(false);
  };
  p.pause = function (atTime, suppressEvents) {
    if (atTime != null) {
      this.seek(atTime, suppressEvents);
    }
    return this.paused(true);
  };
  p.resume = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }
    return this.paused(false);
  };
  p.seek = function (time, suppressEvents) {
    return this.totalTime(Number(time), suppressEvents !== false);
  };
  p.restart = function (includeDelay, suppressEvents) {
    return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, suppressEvents !== false, true);
  };
  p.reverse = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from || this.totalDuration(), suppressEvents);
    }
    return this.reversed(true).paused(false);
  };
  p.render = function (time, suppressEvents, force) {
    //stub - we override this method in subclasses.
  };
  p.invalidate = function () {
    this._time = this._totalTime = 0;
    this._initted = this._gc = false;
    this._rawPrevTime = -1;
    if (this._gc || !this.timeline) {
      this._enabled(true);
    }
    return this;
  };
  p.isActive = function () {
    var tl = this._timeline,
      //the 2 root timelines won't have a _timeline; they're always active.
      startTime = this._startTime,
      rawTime;
    return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - _tinyNum;
  };
  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }
    this._gc = !enabled;
    this._active = this.isActive();
    if (ignoreTimeline !== true) {
      if (enabled && !this.timeline) {
        this._timeline.add(this, this._startTime - this._delay);
      } else if (!enabled && this.timeline) {
        this._timeline._remove(this, true);
      }
    }
    return false;
  };
  p._kill = function (vars, target) {
    return this._enabled(false, false);
  };
  p.kill = function (vars, target) {
    this._kill(vars, target);
    return this;
  };
  p._uncache = function (includeSelf) {
    var tween = includeSelf ? this : this.timeline;
    while (tween) {
      tween._dirty = true;
      tween = tween.timeline;
    }
    return this;
  };
  p._swapSelfInParams = function (params) {
    var i = params.length,
      copy = params.concat();
    while (--i > -1) {
      if (params[i] === "{self}") {
        copy[i] = this;
      }
    }
    return copy;
  };
  p._callback = function (type) {
    var v = this.vars,
      callback = v[type],
      params = v[type + "Params"],
      scope = v[type + "Scope"] || v.callbackScope || this,
      l = params ? params.length : 0;
    switch (l) {
      //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
      case 0:
        callback.call(scope);
        break;
      case 1:
        callback.call(scope, params[0]);
        break;
      case 2:
        callback.call(scope, params[0], params[1]);
        break;
      default:
        callback.apply(scope, params);
    }
  };

  //----Animation getters/setters --------------------------------------------------------

  p.eventCallback = function (type, callback, params, scope) {
    if ((type || "").substr(0, 2) === "on") {
      var v = this.vars;
      if (arguments.length === 1) {
        return v[type];
      }
      if (callback == null) {
        delete v[type];
      } else {
        v[type] = callback;
        v[type + "Params"] = _isArray(params) && params.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(params) : params;
        v[type + "Scope"] = scope;
      }
      if (type === "onUpdate") {
        this._onUpdate = callback;
      }
    }
    return this;
  };
  p.delay = function (value) {
    if (!arguments.length) {
      return this._delay;
    }
    if (this._timeline.smoothChildTiming) {
      this.startTime(this._startTime + value - this._delay);
    }
    this._delay = value;
    return this;
  };
  p.duration = function (value) {
    if (!arguments.length) {
      this._dirty = false;
      return this._duration;
    }
    this._duration = this._totalDuration = value;
    this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
    if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
      this.totalTime(this._totalTime * (value / this._duration), true);
    }
    return this;
  };
  p.totalDuration = function (value) {
    this._dirty = false;
    return !arguments.length ? this._totalDuration : this.duration(value);
  };
  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }
    if (this._dirty) {
      this.totalDuration();
    }
    return this.totalTime(value > this._duration ? this._duration : value, suppressEvents);
  };
  p.totalTime = function (time, suppressEvents, uncapped) {
    if (!_tickerActive) {
      _ticker.wake();
    }
    if (!arguments.length) {
      return this._totalTime;
    }
    if (this._timeline) {
      if (time < 0 && !uncapped) {
        time += this.totalDuration();
      }
      if (this._timeline.smoothChildTiming) {
        if (this._dirty) {
          this.totalDuration();
        }
        var totalDuration = this._totalDuration,
          tl = this._timeline;
        if (time > totalDuration && !uncapped) {
          time = totalDuration;
        }
        this._startTime = (this._paused ? this._pauseTime : tl._time) - (!this._reversed ? time : totalDuration - time) / this._timeScale;
        if (!tl._dirty) {
          //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
          this._uncache(false);
        }
        //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
        if (tl._timeline) {
          while (tl._timeline) {
            if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
              tl.totalTime(tl._totalTime, true);
            }
            tl = tl._timeline;
          }
        }
      }
      if (this._gc) {
        this._enabled(true, false);
      }
      if (this._totalTime !== time || this._duration === 0) {
        if (_lazyTweens.length) {
          _lazyRender();
        }
        this.render(time, suppressEvents, false);
        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
          _lazyRender();
        }
      }
    }
    return this;
  };
  p.progress = p.totalProgress = function (value, suppressEvents) {
    var duration = this.duration();
    return !arguments.length ? duration ? this._time / duration : this.ratio : this.totalTime(duration * value, suppressEvents);
  };
  p.startTime = function (value) {
    if (!arguments.length) {
      return this._startTime;
    }
    if (value !== this._startTime) {
      this._startTime = value;
      if (this.timeline) if (this.timeline._sortChildren) {
        this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
      }
    }

    return this;
  };
  p.endTime = function (includeRepeats) {
    return this._startTime + (includeRepeats != false ? this.totalDuration() : this.duration()) / this._timeScale;
  };
  p.timeScale = function (value) {
    if (!arguments.length) {
      return this._timeScale;
    }
    var pauseTime, t;
    value = value || _tinyNum; //can't allow zero because it'll throw the math off
    if (this._timeline && this._timeline.smoothChildTiming) {
      pauseTime = this._pauseTime;
      t = pauseTime || pauseTime === 0 ? pauseTime : this._timeline.totalTime();
      this._startTime = t - (t - this._startTime) * this._timeScale / value;
    }
    this._timeScale = value;
    t = this.timeline;
    while (t && t.timeline) {
      //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      t._dirty = true;
      t.totalDuration();
      t = t.timeline;
    }
    return this;
  };
  p.reversed = function (value) {
    if (!arguments.length) {
      return this._reversed;
    }
    if (value != this._reversed) {
      this._reversed = value;
      this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, true);
    }
    return this;
  };
  p.paused = function (value) {
    if (!arguments.length) {
      return this._paused;
    }
    var tl = this._timeline,
      raw,
      elapsed;
    if (value != this._paused) if (tl) {
      if (!_tickerActive && !value) {
        _ticker.wake();
      }
      raw = tl.rawTime();
      elapsed = raw - this._pauseTime;
      if (!value && tl.smoothChildTiming) {
        this._startTime += elapsed;
        this._uncache(false);
      }
      this._pauseTime = value ? raw : null;
      this._paused = value;
      this._active = this.isActive();
      if (!value && elapsed !== 0 && this._initted && this.duration()) {
        raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
        this.render(raw, raw === this._totalTime, true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
      }
    }

    if (this._gc && !value) {
      this._enabled(true, false);
    }
    return this;
  };

  /*
   * ----------------------------------------------------------------
   * SimpleTimeline
   * ----------------------------------------------------------------
   */
  var SimpleTimeline = _class("core.SimpleTimeline", function (vars) {
    Animation.call(this, 0, vars);
    this.autoRemoveChildren = this.smoothChildTiming = true;
  });
  p = SimpleTimeline.prototype = new Animation();
  p.constructor = SimpleTimeline;
  p.kill()._gc = false;
  p._first = p._last = p._recent = null;
  p._sortChildren = false;
  p.add = p.insert = function (child, position, align, stagger) {
    var prevTween, st;
    child._startTime = Number(position || 0) + child._delay;
    if (child._paused) if (this !== child._timeline) {
      //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
      child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
    }
    if (child.timeline) {
      child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
    }

    child.timeline = child._timeline = this;
    if (child._gc) {
      child._enabled(true, true);
    }
    prevTween = this._last;
    if (this._sortChildren) {
      st = child._startTime;
      while (prevTween && prevTween._startTime > st) {
        prevTween = prevTween._prev;
      }
    }
    if (prevTween) {
      child._next = prevTween._next;
      prevTween._next = child;
    } else {
      child._next = this._first;
      this._first = child;
    }
    if (child._next) {
      child._next._prev = child;
    } else {
      this._last = child;
    }
    child._prev = prevTween;
    this._recent = child;
    if (this._timeline) {
      this._uncache(true);
    }
    return this;
  };
  p._remove = function (tween, skipDisable) {
    if (tween.timeline === this) {
      if (!skipDisable) {
        tween._enabled(false, true);
      }
      if (tween._prev) {
        tween._prev._next = tween._next;
      } else if (this._first === tween) {
        this._first = tween._next;
      }
      if (tween._next) {
        tween._next._prev = tween._prev;
      } else if (this._last === tween) {
        this._last = tween._prev;
      }
      tween._next = tween._prev = tween.timeline = null;
      if (tween === this._recent) {
        this._recent = this._last;
      }
      if (this._timeline) {
        this._uncache(true);
      }
    }
    return this;
  };
  p.render = function (time, suppressEvents, force) {
    var tween = this._first,
      next;
    this._totalTime = this._time = this._rawPrevTime = time;
    while (tween) {
      next = tween._next; //record it here because the value could change after rendering...
      if (tween._active || time >= tween._startTime && !tween._paused && !tween._gc) {
        if (!tween._reversed) {
          tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
        } else {
          tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
        }
      }
      tween = next;
    }
  };
  p.rawTime = function () {
    if (!_tickerActive) {
      _ticker.wake();
    }
    return this._totalTime;
  };

  /*
   * ----------------------------------------------------------------
   * TweenLite
   * ----------------------------------------------------------------
   */
  var TweenLite = _class("TweenLite", function (target, duration, vars) {
      Animation.call(this, duration, vars);
      this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

      if (target == null) {
        throw "Cannot tween a null target.";
      }
      this.target = target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
      var isSelector = target.jquery || target.length && target !== window && target[0] && (target[0] === window || target[0].nodeType && target[0].style && !target.nodeType),
        overwrite = this.vars.overwrite,
        i,
        targ,
        targets;
      this._overwrite = overwrite = overwrite == null ? _overwriteLookup[TweenLite.defaultOverwrite] : typeof overwrite === "number" ? overwrite >> 0 : _overwriteLookup[overwrite];
      if ((isSelector || target instanceof Array || target.push && _isArray(target)) && typeof target[0] !== "number") {
        this._targets = targets = _slice(target); //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
        this._propLookup = [];
        this._siblings = [];
        for (i = 0; i < targets.length; i++) {
          targ = targets[i];
          if (!targ) {
            targets.splice(i--, 1);
            continue;
          } else if (typeof targ === "string") {
            targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
            if (typeof targ === "string") {
              targets.splice(i + 1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
            }

            continue;
          } else if (targ.length && targ !== window && targ[0] && (targ[0] === window || targ[0].nodeType && targ[0].style && !targ.nodeType)) {
            //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
            targets.splice(i--, 1);
            this._targets = targets = targets.concat(_slice(targ));
            continue;
          }
          this._siblings[i] = _register(targ, this, false);
          if (overwrite === 1) if (this._siblings[i].length > 1) {
            _applyOverwrite(targ, this, null, 1, this._siblings[i]);
          }
        }
      } else {
        this._propLookup = {};
        this._siblings = _register(target, this, false);
        if (overwrite === 1) if (this._siblings.length > 1) {
          _applyOverwrite(target, this, null, 1, this._siblings);
        }
      }
      if (this.vars.immediateRender || duration === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
        this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
        this.render(Math.min(0, -this._delay)); //in case delay is negative
      }
    }, true),
    _isSelector = function _isSelector(v) {
      return v && v.length && v !== window && v[0] && (v[0] === window || v[0].nodeType && v[0].style && !v.nodeType); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
    },
    _autoCSS = function _autoCSS(vars, target) {
      var css = {},
        p;
      for (p in vars) {
        if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || _plugins[p] && _plugins[p]._autoCSS)) {
          //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
          css[p] = vars[p];
          delete vars[p];
        }
      }
      vars.css = css;
    };
  p = TweenLite.prototype = new Animation();
  p.constructor = TweenLite;
  p.kill()._gc = false;

  //----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

  p.ratio = 0;
  p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
  p._notifyPluginsOfEnabled = p._lazy = false;
  TweenLite.version = "2.1.3";
  TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
  TweenLite.defaultOverwrite = "auto";
  TweenLite.ticker = _ticker;
  TweenLite.autoSleep = 120;
  TweenLite.lagSmoothing = function (threshold, adjustedLag) {
    _ticker.lagSmoothing(threshold, adjustedLag);
  };
  TweenLite.selector = window.$ || window.jQuery || function (e) {
    var selector = window.$ || window.jQuery;
    if (selector) {
      TweenLite.selector = selector;
      return selector(e);
    }
    if (!_doc) {
      //in some dev environments (like Angular 6), GSAP gets loaded before the document is defined! So re-query it here if/when necessary.
      _doc = window.document;
    }
    return !_doc ? e : _doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById(e.charAt(0) === "#" ? e.substr(1) : e);
  };
  var _lazyTweens = [],
    _lazyLookup = {},
    _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _relExp = /[\+-]=-?[\.\d]/,
    //_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
    _setRatio = function _setRatio(v) {
      var pt = this._firstPT,
        min = 0.000001,
        val;
      while (pt) {
        val = !pt.blob ? pt.c * v + pt.s : v === 1 && this.end != null ? this.end : v ? this.join("") : this.start;
        if (pt.m) {
          val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
        } else if (val < min) if (val > -min && !pt.blob) {
          //prevents issues with converting very small numbers to strings in the browser
          val = 0;
        }
        if (!pt.f) {
          pt.t[pt.p] = val;
        } else if (pt.fp) {
          pt.t[pt.p](pt.fp, val);
        } else {
          pt.t[pt.p](val);
        }
        pt = pt._next;
      }
    },
    _blobRound = function _blobRound(v) {
      return (v * 1000 | 0) / 1000 + "";
    },
    //compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
    _blobDif = function _blobDif(start, end, filter, pt) {
      var a = [],
        charIndex = 0,
        s = "",
        color = 0,
        startNums,
        endNums,
        num,
        i,
        l,
        nonNumbers,
        currentNum;
      a.start = start;
      a.end = end;
      start = a[0] = start + ""; //ensure values are strings
      end = a[1] = end + "";
      if (filter) {
        filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
        start = a[0];
        end = a[1];
      }
      a.length = 0;
      startNums = start.match(_numbersExp) || [];
      endNums = end.match(_numbersExp) || [];
      if (pt) {
        pt._next = null;
        pt.blob = 1;
        a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
      }

      l = endNums.length;
      for (i = 0; i < l; i++) {
        currentNum = endNums[i];
        nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
        s += nonNumbers || !i ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        charIndex += nonNumbers.length;
        if (color) {
          //sense rgba() values and round them.
          color = (color + 1) % 5;
        } else if (nonNumbers.substr(-5) === "rgba(") {
          color = 1;
        }
        if (currentNum === startNums[i] || startNums.length <= i) {
          s += currentNum;
        } else {
          if (s) {
            a.push(s);
            s = "";
          }
          num = parseFloat(startNums[i]);
          a.push(num);
          a._firstPT = {
            _next: a._firstPT,
            t: a,
            p: a.length - 1,
            s: num,
            c: (currentNum.charAt(1) === "=" ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0,
            f: 0,
            m: color && color < 4 ? Math.round : _blobRound
          }; //limiting to 3 decimal places and casting as a string can really help performance when array.join() is called!
          //note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
        }

        charIndex += currentNum.length;
      }
      s += end.substr(charIndex);
      if (s) {
        a.push(s);
      }
      a.setRatio = _setRatio;
      if (_relExp.test(end)) {
        //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
        a.end = null;
      }
      return a;
    },
    //note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
    _addPropTween = function _addPropTween(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
      if (typeof end === "function") {
        end = end(index || 0, target);
      }
      var type = (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(target[prop]),
        getterName = type !== "function" ? "" : prop.indexOf("set") || typeof target["get" + prop.substr(3)] !== "function" ? prop : "get" + prop.substr(3),
        s = start !== "get" ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
        isRelative = typeof end === "string" && end.charAt(1) === "=",
        pt = {
          t: target,
          p: prop,
          s: s,
          f: type === "function",
          pg: 0,
          n: overwriteProp || prop,
          m: !mod ? 0 : typeof mod === "function" ? mod : Math.round,
          pr: 0,
          c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0
        },
        blob;
      if (typeof s !== "number" || typeof end !== "number" && !isRelative) {
        if (funcParam || isNaN(s) || !isRelative && isNaN(end) || typeof s === "boolean" || typeof end === "boolean") {
          //a blob (string that has multiple numbers in it)
          pt.fp = funcParam;
          blob = _blobDif(s, isRelative ? parseFloat(pt.s) + pt.c + (pt.s + "").replace(/[0-9\-\.]/g, "") : end, stringFilter || TweenLite.defaultStringFilter, pt);
          pt = {
            t: blob,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 2,
            pg: 0,
            n: overwriteProp || prop,
            pr: 0,
            m: 0
          }; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
        } else {
          pt.s = parseFloat(s);
          if (!isRelative) {
            pt.c = parseFloat(end) - pt.s || 0;
          }
        }
      }
      if (pt.c) {
        //only add it to the linked list if there's a change.
        if (pt._next = this._firstPT) {
          pt._next._prev = pt;
        }
        this._firstPT = pt;
        return pt;
      }
    },
    _internals = TweenLite._internals = {
      isArray: _isArray,
      isSelector: _isSelector,
      lazyTweens: _lazyTweens,
      blobDif: _blobDif
    },
    //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
    _plugins = TweenLite._plugins = {},
    _tweenLookup = _internals.tweenLookup = {},
    _tweenLookupNum = 0,
    _reservedProps = _internals.reservedProps = {
      ease: 1,
      delay: 1,
      overwrite: 1,
      onComplete: 1,
      onCompleteParams: 1,
      onCompleteScope: 1,
      useFrames: 1,
      runBackwards: 1,
      startAt: 1,
      onUpdate: 1,
      onUpdateParams: 1,
      onUpdateScope: 1,
      onStart: 1,
      onStartParams: 1,
      onStartScope: 1,
      onReverseComplete: 1,
      onReverseCompleteParams: 1,
      onReverseCompleteScope: 1,
      onRepeat: 1,
      onRepeatParams: 1,
      onRepeatScope: 1,
      easeParams: 1,
      yoyo: 1,
      immediateRender: 1,
      repeat: 1,
      repeatDelay: 1,
      data: 1,
      paused: 1,
      reversed: 1,
      autoCSS: 1,
      lazy: 1,
      onOverwrite: 1,
      callbackScope: 1,
      stringFilter: 1,
      id: 1,
      yoyoEase: 1,
      stagger: 1
    },
    _overwriteLookup = {
      none: 0,
      all: 1,
      auto: 2,
      concurrent: 3,
      allOnStart: 4,
      preexisting: 5,
      "true": 1,
      "false": 0
    },
    _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
    _rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
    _nextGCFrame = 30,
    _lazyRender = _internals.lazyRender = function () {
      var l = _lazyTweens.length,
        i,
        tween;
      _lazyLookup = {};
      for (i = 0; i < l; i++) {
        tween = _lazyTweens[i];
        if (tween && tween._lazy !== false) {
          tween.render(tween._lazy[0], tween._lazy[1], true);
          tween._lazy = false;
        }
      }
      _lazyTweens.length = 0;
    };
  _rootTimeline._startTime = _ticker.time;
  _rootFramesTimeline._startTime = _ticker.frame;
  _rootTimeline._active = _rootFramesTimeline._active = true;
  setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

  Animation._updateRoot = TweenLite.render = function () {
    var i, a, p;
    if (_lazyTweens.length) {
      //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
      _lazyRender();
    }
    _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
    _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
    if (_lazyTweens.length) {
      _lazyRender();
    }
    if (_ticker.frame >= _nextGCFrame) {
      //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
      _nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
      for (p in _tweenLookup) {
        a = _tweenLookup[p].tweens;
        i = a.length;
        while (--i > -1) {
          if (a[i]._gc) {
            a.splice(i, 1);
          }
        }
        if (a.length === 0) {
          delete _tweenLookup[p];
        }
      }
      //if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
      p = _rootTimeline._first;
      if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
        while (p && p._paused) {
          p = p._next;
        }
        if (!p) {
          _ticker.sleep();
        }
      }
    }
  };
  _ticker.addEventListener("tick", Animation._updateRoot);
  var _register = function _register(target, tween, scrub) {
      var id = target._gsTweenID,
        a,
        i;
      if (!_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)]) {
        _tweenLookup[id] = {
          target: target,
          tweens: []
        };
      }
      if (tween) {
        a = _tweenLookup[id].tweens;
        a[i = a.length] = tween;
        if (scrub) {
          while (--i > -1) {
            if (a[i] === tween) {
              a.splice(i, 1);
            }
          }
        }
      }
      return _tweenLookup[id].tweens;
    },
    _onOverwrite = function _onOverwrite(overwrittenTween, overwritingTween, target, killedProps) {
      var func = overwrittenTween.vars.onOverwrite,
        r1,
        r2;
      if (func) {
        r1 = func(overwrittenTween, overwritingTween, target, killedProps);
      }
      func = TweenLite.onOverwrite;
      if (func) {
        r2 = func(overwrittenTween, overwritingTween, target, killedProps);
      }
      return r1 !== false && r2 !== false;
    },
    _applyOverwrite = function _applyOverwrite(target, tween, props, mode, siblings) {
      var i, changed, curTween, l;
      if (mode === 1 || mode >= 4) {
        l = siblings.length;
        for (i = 0; i < l; i++) {
          if ((curTween = siblings[i]) !== tween) {
            if (!curTween._gc) {
              if (curTween._kill(null, target, tween)) {
                changed = true;
              }
            }
          } else if (mode === 5) {
            break;
          }
        }
        return changed;
      }
      //NOTE: Add tiny amount to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
      var startTime = tween._startTime + _tinyNum,
        overlaps = [],
        oCount = 0,
        zeroDur = tween._duration === 0,
        globalStart;
      i = siblings.length;
      while (--i > -1) {
        if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
          //ignore
        } else if (curTween._timeline !== tween._timeline) {
          globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
          if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
            overlaps[oCount++] = curTween;
          }
        } else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= _tinyNum * 2)) {
          overlaps[oCount++] = curTween;
        }
      }
      i = oCount;
      while (--i > -1) {
        curTween = overlaps[i];
        l = curTween._firstPT; //we need to discern if there were property tweens originally; if they all get removed in the next line's _kill() call, the tween should be killed. See https://github.com/greensock/GreenSock-JS/issues/278
        if (mode === 2) if (curTween._kill(props, target, tween)) {
          changed = true;
        }
        if (mode !== 2 || !curTween._firstPT && curTween._initted && l) {
          if (mode !== 2 && !_onOverwrite(curTween, tween)) {
            continue;
          }
          if (curTween._enabled(false, false)) {
            //if all property tweens have been overwritten, kill the tween.
            changed = true;
          }
        }
      }
      return changed;
    },
    _checkOverlap = function _checkOverlap(tween, reference, zeroDur) {
      var tl = tween._timeline,
        ts = tl._timeScale,
        t = tween._startTime;
      while (tl._timeline) {
        t += tl._startTime;
        ts *= tl._timeScale;
        if (tl._paused) {
          return -100;
        }
        tl = tl._timeline;
      }
      t /= ts;
      return t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2 * _tinyNum ? _tinyNum : (t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum ? 0 : t - reference - _tinyNum;
    };

  //---- TweenLite instance methods -----------------------------------------------------------------------------

  p._init = function () {
    var v = this.vars,
      op = this._overwrittenProps,
      dur = this._duration,
      immediate = !!v.immediateRender,
      ease = v.ease,
      startAt = this._startAt,
      i,
      initPlugins,
      pt,
      p,
      startVars,
      l;
    if (v.startAt) {
      if (startAt) {
        startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
        startAt.kill();
      }
      startVars = {};
      for (p in v.startAt) {
        //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
        startVars[p] = v.startAt[p];
      }
      startVars.data = "isStart";
      startVars.overwrite = false;
      startVars.immediateRender = true;
      startVars.lazy = immediate && v.lazy !== false;
      startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
      startVars.onUpdate = v.onUpdate;
      startVars.onUpdateParams = v.onUpdateParams;
      startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
      this._startAt = TweenLite.to(this.target || {}, 0, startVars);
      if (immediate) {
        if (this._time > 0) {
          this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
        } else if (dur !== 0) {
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (v.runBackwards && dur !== 0) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (startAt) {
        startAt.render(-1, true);
        startAt.kill();
        this._startAt = null;
      } else {
        if (this._time !== 0) {
          //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
          immediate = false;
        }
        pt = {};
        for (p in v) {
          //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
          if (!_reservedProps[p] || p === "autoCSS") {
            pt[p] = v[p];
          }
        }
        pt.overwrite = 0;
        pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        pt.lazy = immediate && v.lazy !== false;
        pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        this._startAt = TweenLite.to(this.target, 0, pt);
        if (!immediate) {
          this._startAt._init(); //ensures that the initial values are recorded
          this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
          if (this.vars.immediateRender) {
            this._startAt = null;
          }
        } else if (this._time === 0) {
          return;
        }
      }
    }
    this._ease = ease = !ease ? TweenLite.defaultEase : ease instanceof Ease ? ease : typeof ease === "function" ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
    if (v.easeParams instanceof Array && ease.config) {
      this._ease = ease.config.apply(ease, v.easeParams);
    }
    this._easeType = this._ease._type;
    this._easePower = this._ease._power;
    this._firstPT = null;
    if (this._targets) {
      l = this._targets.length;
      for (i = 0; i < l; i++) {
        if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], op ? op[i] : null, i)) {
          initPlugins = true;
        }
      }
    } else {
      initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
    }
    if (initPlugins) {
      TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
    }

    if (op) if (!this._firstPT) if (typeof this.target !== "function") {
      //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
      this._enabled(false, false);
    }
    if (v.runBackwards) {
      pt = this._firstPT;
      while (pt) {
        pt.s += pt.c;
        pt.c = -pt.c;
        pt = pt._next;
      }
    }
    this._onUpdate = v.onUpdate;
    this._initted = true;
  };
  p._initProps = function (target, propLookup, siblings, overwrittenProps, index) {
    var p, i, initPlugins, plugin, pt, v;
    if (target == null) {
      return false;
    }
    if (_lazyLookup[target._gsTweenID]) {
      _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
    }

    if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) {
      //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
      _autoCSS(this.vars, target);
    }
    for (p in this.vars) {
      v = this.vars[p];
      if (_reservedProps[p]) {
        if (v) if (v instanceof Array || v.push && _isArray(v)) if (v.join("").indexOf("{self}") !== -1) {
          this.vars[p] = v = this._swapSelfInParams(v, this);
        }
      } else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {
        //t - target 		[object]
        //p - property 		[string]
        //s - start			[number]
        //c - change		[number]
        //f - isFunction	[boolean]
        //n - name			[string]
        //pg - isPlugin 	[boolean]
        //pr - priority		[number]
        //m - mod           [function | 0]
        this._firstPT = pt = {
          _next: this._firstPT,
          t: plugin,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 1,
          n: p,
          pg: 1,
          pr: plugin._priority,
          m: 0
        };
        i = plugin._overwriteProps.length;
        while (--i > -1) {
          propLookup[plugin._overwriteProps[i]] = this._firstPT;
        }
        if (plugin._priority || plugin._onInitAllProps) {
          initPlugins = true;
        }
        if (plugin._onDisable || plugin._onEnable) {
          this._notifyPluginsOfEnabled = true;
        }
        if (pt._next) {
          pt._next._prev = pt;
        }
      } else {
        propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
      }
    }
    if (overwrittenProps) if (this._kill(overwrittenProps, target)) {
      //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
      this._kill(propLookup, target);
      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._firstPT) if (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration) {
      //zero duration tweens don't lazy render by default; everything else does.
      _lazyLookup[target._gsTweenID] = true;
    }
    return initPlugins;
  };
  p.render = function (time, suppressEvents, force) {
    var self = this,
      prevTime = self._time,
      duration = self._duration,
      prevRawPrevTime = self._rawPrevTime,
      isComplete,
      callback,
      pt,
      rawPrevTime;
    if (time >= duration - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      self._totalTime = self._time = duration;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
      if (!self._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
      }

      if (duration === 0) if (self._initted || !self.vars.lazy || force) {
        //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
        if (self._startTime === self._timeline._duration) {
          //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
          time = 0;
        }
        if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && self.data !== "isPause") if (prevRawPrevTime !== time) {
          //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
          force = true;
          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
        self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
      }
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      self._totalTime = self._time = 0;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
      if (prevTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }
      if (time > -_tinyNum) {
        time = 0;
      } else if (time < 0) {
        self._active = false;
        if (duration === 0) if (self._initted || !self.vars.lazy || force) {
          //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
          if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && self.data === "isPause")) {
            force = true;
          }
          self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
        }
      }

      if (!self._initted || self._startAt && self._startAt.progress()) {
        //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
        force = true;
      }
    } else {
      self._totalTime = self._time = time;
      if (self._easeType) {
        var r = time / duration,
          type = self._easeType,
          pow = self._easePower;
        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }
        if (type === 3) {
          r *= 2;
        }
        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }
        self.ratio = type === 1 ? 1 - r : type === 2 ? r : time / duration < 0.5 ? r / 2 : 1 - r / 2;
      } else {
        self.ratio = self._ease.getRatio(time / duration);
      }
    }
    if (self._time === prevTime && !force) {
      return;
    } else if (!self._initted) {
      self._init();
      if (!self._initted || self._gc) {
        //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
        return;
      } else if (!force && self._firstPT && (self.vars.lazy !== false && self._duration || self.vars.lazy && !self._duration)) {
        self._time = self._totalTime = prevTime;
        self._rawPrevTime = prevRawPrevTime;
        _lazyTweens.push(self);
        self._lazy = [time, suppressEvents];
        return;
      }
      //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
      if (self._time && !isComplete) {
        self.ratio = self._ease.getRatio(self._time / duration);
      } else if (isComplete && self._ease._calcEnd) {
        self.ratio = self._ease.getRatio(self._time === 0 ? 0 : 1);
      }
    }
    if (self._lazy !== false) {
      //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
      self._lazy = false;
    }
    if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) {
      self._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
    }

    if (prevTime === 0) {
      if (self._startAt) {
        if (time >= 0) {
          self._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
        }
      }

      if (self.vars.onStart) if (self._time !== 0 || duration === 0) if (!suppressEvents) {
        self._callback("onStart");
      }
    }
    pt = self._firstPT;
    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * self.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * self.ratio + pt.s;
      }
      pt = pt._next;
    }
    if (self._onUpdate) {
      if (time < 0) if (self._startAt && time !== -0.0001) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        self._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
      }

      if (!suppressEvents) if (self._time !== prevTime || isComplete || force) {
        self._callback("onUpdate");
      }
    }
    if (callback) if (!self._gc || force) {
      //check _gc because there's a chance that kill() could be called in an onUpdate
      if (time < 0 && self._startAt && !self._onUpdate && time !== -0.0001) {
        //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
        self._startAt.render(time, true, force);
      }
      if (isComplete) {
        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }
        self._active = false;
      }
      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }
      if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
        //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
        self._rawPrevTime = 0;
      }
    }
  };
  p._kill = function (vars, target, overwritingTween) {
    if (vars === "all") {
      vars = null;
    }
    if (vars == null) if (target == null || target === this.target) {
      this._lazy = false;
      return this._enabled(false, false);
    }
    target = typeof target !== "string" ? target || this._targets || this.target : TweenLite.selector(target) || target;
    var simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline,
      firstPT = this._firstPT,
      i,
      overwrittenProps,
      p,
      pt,
      propLookup,
      changed,
      killProps,
      record,
      killed;
    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;
      while (--i > -1) {
        if (this._kill(vars, target[i], overwritingTween)) {
          changed = true;
        }
      }
    } else {
      if (this._targets) {
        i = this._targets.length;
        while (--i > -1) {
          if (target === this._targets[i]) {
            propLookup = this._propLookup[i] || {};
            this._overwrittenProps = this._overwrittenProps || [];
            overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
            break;
          }
        }
      } else if (target !== this.target) {
        return false;
      } else {
        propLookup = this._propLookup;
        overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
      }
      if (propLookup) {
        killProps = vars || propLookup;
        record = vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(vars) !== "object" || !vars._tempKill); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
        if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
          for (p in killProps) {
            if (propLookup[p]) {
              if (!killed) {
                killed = [];
              }
              killed.push(p);
            }
          }
          if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) {
            //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
            return false;
          }
        }
        for (p in killProps) {
          if (pt = propLookup[p]) {
            if (simultaneousOverwrite) {
              //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
              if (pt.f) {
                pt.t[pt.p](pt.s);
              } else {
                pt.t[pt.p] = pt.s;
              }
              changed = true;
            }
            if (pt.pg && pt.t._kill(killProps)) {
              changed = true; //some plugins need to be notified so they can perform cleanup tasks first
            }

            if (!pt.pg || pt.t._overwriteProps.length === 0) {
              if (pt._prev) {
                pt._prev._next = pt._next;
              } else if (pt === this._firstPT) {
                this._firstPT = pt._next;
              }
              if (pt._next) {
                pt._next._prev = pt._prev;
              }
              pt._next = pt._prev = null;
            }
            delete propLookup[p];
          }
          if (record) {
            overwrittenProps[p] = 1;
          }
        }
        if (!this._firstPT && this._initted && firstPT) {
          //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
          this._enabled(false, false);
        }
      }
    }
    return changed;
  };
  p.invalidate = function () {
    if (this._notifyPluginsOfEnabled) {
      TweenLite._onPluginEvent("_onDisable", this);
    }
    var t = this._time;
    this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
    this._notifyPluginsOfEnabled = this._active = this._lazy = false;
    this._propLookup = this._targets ? {} : [];
    Animation.prototype.invalidate.call(this);
    if (this.vars.immediateRender) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
      this.render(t, false, this.vars.lazy !== false);
    }
    return this;
  };
  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }
    if (enabled && this._gc) {
      var targets = this._targets,
        i;
      if (targets) {
        i = targets.length;
        while (--i > -1) {
          this._siblings[i] = _register(targets[i], this, true);
        }
      } else {
        this._siblings = _register(this.target, this, true);
      }
    }
    Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
    if (this._notifyPluginsOfEnabled) if (this._firstPT) {
      return TweenLite._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this);
    }
    return false;
  };

  //----TweenLite static methods -----------------------------------------------------

  TweenLite.to = function (target, duration, vars) {
    return new TweenLite(target, duration, vars);
  };
  TweenLite.from = function (target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenLite(target, duration, vars);
  };
  TweenLite.fromTo = function (target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenLite(target, duration, toVars);
  };
  TweenLite.delayedCall = function (delay, callback, params, scope, useFrames) {
    return new TweenLite(callback, 0, {
      delay: delay,
      onComplete: callback,
      onCompleteParams: params,
      callbackScope: scope,
      onReverseComplete: callback,
      onReverseCompleteParams: params,
      immediateRender: false,
      lazy: false,
      useFrames: useFrames,
      overwrite: 0
    });
  };
  TweenLite.set = function (target, vars) {
    return new TweenLite(target, 0, vars);
  };
  TweenLite.getTweensOf = function (target, onlyActive) {
    if (target == null) {
      return [];
    }
    target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
    var i, a, j, t;
    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;
      a = [];
      while (--i > -1) {
        a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
      }
      i = a.length;
      //now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
      while (--i > -1) {
        t = a[i];
        j = i;
        while (--j > -1) {
          if (t === a[j]) {
            a.splice(i, 1);
          }
        }
      }
    } else if (target._gsTweenID) {
      a = _register(target).concat();
      i = a.length;
      while (--i > -1) {
        if (a[i]._gc || onlyActive && !a[i].isActive()) {
          a.splice(i, 1);
        }
      }
    }
    return a || [];
  };
  TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function (target, onlyActive, vars) {
    if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(onlyActive) === "object") {
      vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
      onlyActive = false;
    }
    var a = TweenLite.getTweensOf(target, onlyActive),
      i = a.length;
    while (--i > -1) {
      a[i]._kill(vars, target);
    }
  };

  /*
   * ----------------------------------------------------------------
   * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
   * ----------------------------------------------------------------
   */
  var TweenPlugin = _class("plugins.TweenPlugin", function (props, priority) {
    this._overwriteProps = (props || "").split(",");
    this._propName = this._overwriteProps[0];
    this._priority = priority || 0;
    this._super = TweenPlugin.prototype;
  }, true);
  p = TweenPlugin.prototype;
  TweenPlugin.version = "1.19.0";
  TweenPlugin.API = 2;
  p._firstPT = null;
  p._addTween = _addPropTween;
  p.setRatio = _setRatio;
  p._kill = function (lookup) {
    var a = this._overwriteProps,
      pt = this._firstPT,
      i;
    if (lookup[this._propName] != null) {
      this._overwriteProps = [];
    } else {
      i = a.length;
      while (--i > -1) {
        if (lookup[a[i]] != null) {
          a.splice(i, 1);
        }
      }
    }
    while (pt) {
      if (lookup[pt.n] != null) {
        if (pt._next) {
          pt._next._prev = pt._prev;
        }
        if (pt._prev) {
          pt._prev._next = pt._next;
          pt._prev = null;
        } else if (this._firstPT === pt) {
          this._firstPT = pt._next;
        }
      }
      pt = pt._next;
    }
    return false;
  };
  p._mod = p._roundProps = function (lookup) {
    var pt = this._firstPT,
      val;
    while (pt) {
      val = lookup[this._propName] || pt.n != null && lookup[pt.n.split(this._propName + "_").join("")];
      if (val && typeof val === "function") {
        //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
        if (pt.f === 2) {
          pt.t._applyPT.m = val;
        } else {
          pt.m = val;
        }
      }
      pt = pt._next;
    }
  };
  TweenLite._onPluginEvent = function (type, tween) {
    var pt = tween._firstPT,
      changed,
      pt2,
      first,
      last,
      next;
    if (type === "_onInitAllProps") {
      //sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
      while (pt) {
        next = pt._next;
        pt2 = first;
        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }
        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }
        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }
        pt = next;
      }
      pt = tween._firstPT = first;
    }
    while (pt) {
      if (pt.pg) if (typeof pt.t[type] === "function") if (pt.t[type]()) {
        changed = true;
      }
      pt = pt._next;
    }
    return changed;
  };
  TweenPlugin.activate = function (plugins) {
    var i = plugins.length;
    while (--i > -1) {
      if (plugins[i].API === TweenPlugin.API) {
        _plugins[new plugins[i]()._propName] = plugins[i];
      }
    }
    return true;
  };

  //provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
  _gsDefine.plugin = function (config) {
    if (!config || !config.propName || !config.init || !config.API) {
      throw "illegal plugin definition.";
    }
    var propName = config.propName,
      priority = config.priority || 0,
      overwriteProps = config.overwriteProps,
      map = {
        init: "_onInitTween",
        set: "setRatio",
        kill: "_kill",
        round: "_mod",
        mod: "_mod",
        initAll: "_onInitAllProps"
      },
      Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", function () {
        TweenPlugin.call(this, propName, priority);
        this._overwriteProps = overwriteProps || [];
      }, config.global === true),
      p = Plugin.prototype = new TweenPlugin(propName),
      prop;
    p.constructor = Plugin;
    Plugin.API = config.API;
    for (prop in map) {
      if (typeof config[prop] === "function") {
        p[map[prop]] = config[prop];
      }
    }
    Plugin.version = config.version;
    TweenPlugin.activate([Plugin]);
    return Plugin;
  };

  //now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
  a = window._gsQueue;
  if (a) {
    for (i = 0; i < a.length; i++) {
      a[i]();
    }
    for (p in _defLookup) {
      if (!_defLookup[p].func) {
        window.console.log("GSAP encountered missing dependency: " + p);
      }
    }
  }
  _tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

  return TweenLite;
}(_gsScope, "TweenLite");
var globals = _gsScope.GreenSockGlobals;
var nonGlobals = globals.com.greensock;

var SimpleTimeline = nonGlobals.core.SimpleTimeline;
var Animation = nonGlobals.core.Animation;
var Ease = globals.Ease;
var Linear = globals.Linear;
var Power0 = (/* unused pure expression or super */ null && (Linear));
var Power1 = globals.Power1;
var Power2 = globals.Power2;
var Power3 = globals.Power3;
var Power4 = globals.Power4;
var TweenPlugin = globals.TweenPlugin;
var EventDispatcher = nonGlobals.events.EventDispatcher;

/***/ }),

/***/ 319:
/***/ (() => {

/* 
 *************************************
 * Get all attributes of an element using jQuery
 *
 * @return {array}                        - Returns a new array.
 * @usage:
 
	$( '#demo' ).attr();  // { "data-a": "1", "id": "b" }

 *************************************
 */
(function (old) {
  $.fn.attr = function () {
    if (arguments.length === 0) {
      if (this.length === 0) {
        return null;
      }
      var obj = {};
      $.each(this[0].attributes, function () {
        if (this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }
    return old.apply(this, arguments);
  };
})($.fn.attr);

/***/ }),

/***/ 111:
/***/ (() => {

/* 
 *************************************
 * Scroll Lock
 * @https://gist.github.com/barneycarroll/6550066
 * @return {Void}
 *************************************
 */
/*
	 // Locks the page
	$.scrollLock( true );
	
	// Unlocks the page
	$.scrollLock( false );
*/

(function ($) {
  'use strict';

  $.scrollLock = function scrollLockClosure() {
    var $html = $('html'),
      // State: unlocked by default
      locked = false,
      // State: scroll to revert to
      prevScroll = {
        scrollLeft: $(window).scrollLeft(),
        scrollTop: $(window).scrollTop()
      },
      // State: styles to revert to
      prevStyles = {},
      lockStyles = {
        'overflow-y': 'scroll',
        'position': 'fixed',
        'width': '100%'
      };

    // Instantiate cache in case someone tries to unlock before locking
    saveStyles();

    // Save context's inline styles in cache
    function saveStyles() {
      var styleAttr = $html.attr('style'),
        styleStrs = [],
        styleHash = {};
      if (!styleAttr) {
        return;
      }
      styleStrs = styleAttr.split(/;\s/);
      $.each(styleStrs, function serializeStyleProp(styleString) {
        if (!styleString) {
          return;
        }
        var keyValue = styleString.split(/\s:\s/);
        if (keyValue.length < 2) {
          return;
        }
        styleHash[keyValue[0]] = keyValue[1];
      });
      $.extend(prevStyles, styleHash);
    }
    function lock() {
      var appliedLock = {};

      // Duplicate execution will break DOM statefulness
      if (locked) {
        return;
      }

      // Save scroll state...
      prevScroll = {
        scrollLeft: $(window).scrollLeft(),
        scrollTop: $(window).scrollTop()
      };

      // ...and styles
      saveStyles();

      // Compose our applied CSS
      $.extend(appliedLock, lockStyles, {
        // And apply scroll state as styles
        'left': -prevScroll.scrollLeft + 'px',
        'top': -prevScroll.scrollTop + 'px'
      });

      // Then lock styles...
      $html.css(appliedLock);

      // ...and scroll state
      $(window).scrollLeft(0).scrollTop(0);
      locked = true;
    }
    function unlock() {
      // Duplicate execution will break DOM statefulness
      if (!locked) {
        return;
      }

      // Revert styles
      $html.attr('style', $('<x>').css(prevStyles).attr('style') || '');

      // Revert scroll values
      $(window).scrollLeft(prevScroll.scrollLeft).scrollTop(prevScroll.scrollTop);
      locked = false;
    }
    return function scrollLock(on) {
      // If an argument is passed, lock or unlock depending on truthiness
      if (arguments.length) {
        if (on) {
          lock();
        } else {
          unlock();
        }
      }
      // Otherwise, toggle
      else {
        if (locked) {
          unlock();
        } else {
          lock();
        }
      }
    };
  }();
})(jQuery);

/***/ }),

/***/ 798:
/***/ (() => {

/* 
 *************************************
 * Count To
 *
 * @param  {Number} fixed                - formats a number using fixed-point notation.
 * @param  {Number} from                 - the number the element should start at
 * @param  {Number} to                   - the number the element should end at
 * @param  {Number} speed                - how long it should take to count between the target numbers
 * @param  {Number} refreshInterval      - how often the element should be updated
 * @param  {Boolean} dilimiter           - the number of decimal places to show
 * @param  {Boolean} doubleDigits        - two digits are used by default
 * @param  {Function} onUpdate           - callback method for every time the element is updated
 * @param  {Function} onComplete         - callback method for when the element finishes updating,
 * @return {Void}
 *
 *************************************
 */
(function ($) {
  $.fn.UixCountTo = function (options) {
    options = options || {};
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.UixCountTo.defaults, {
        from: $(this).data('counter-start'),
        to: $(this).data('counter-number'),
        fixed: $(this).data('counter-fixed'),
        speed: $(this).data('counter-duration'),
        refreshInterval: $(this).data('counter-refresh-interval'),
        dilimiter: $(this).data('counter-dilimiter'),
        doubleDigits: $(this).data('counter-double-digits'),
        onUpdate: null,
        onComplete: null
      }, options);

      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('count-to') || {};
      $self.data('count-to', data);

      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // initialize the element with the starting value
      render(value);
      function updateTimer() {
        value += increment;
        loopCount++;
        render(value);
        if (typeof settings.onUpdate == 'function') {
          settings.onUpdate.call(self, value);
        }
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('count-to');
          clearInterval(data.interval);
          value = settings.to;
          if (typeof settings.onComplete == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      function render(value) {
        var formattedValue = Number(value).toFixed(settings.fixed);
        if (settings.dilimiter && formattedValue > 0) {
          formattedValue = formattedValue.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
        }
        if (settings.doubleDigits) {
          if (formattedValue < 10) {
            formattedValue = '0' + formattedValue;
          }
        }
        $self.html(formattedValue);
      }
    });
  };
  $.fn.UixCountTo.defaults = {
    from: 0,
    to: 0,
    fixed: 0,
    speed: 500,
    refreshInterval: 1,
    dilimiter: true,
    doubleDigits: false,
    onUpdate: null,
    onComplete: null
  };
})(jQuery);

/***/ }),

/***/ 260:
/***/ (() => {

/*
 * Disabled Controls
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderControlsDisable = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: 'input.is-disabled'
    }, options);
    this.each(function () {
      $(settings.controls).prop('disabled', true);
    });
  };
})(jQuery);

/***/ }),

/***/ 366:
/***/ (() => {

/*
 * Hover Effect
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderControlsHover = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.js-uix-float-label'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        var $this = $(this);

        // on focus add cladd active to label
        $this.on('focus', function () {
          $(this).closest('div').find('label, .uix-controls__bar').addClass('is-active');
        });

        //on blur check field and remove class if needed
        $this.on('blur change', function (e) {
          if ($this.val() === '' || $this.val() === 'blank') {
            $(this).closest('div').find('label').removeClass('is-active');
          }

          //----
          if ($this.val() === '' || $this.val() === 'blank' || $this.val() != '' && $this.val() != 'blank') {
            $(this).closest('div').find('.uix-controls__bar').removeClass('is-active');
          }
        });

        // if exist cookie value
        if ($this.val() != '' && $this.val() != 'blank') {
          $(this).closest('div').find('label').addClass('is-active');
        }
      });
    });
  };
})(jQuery);

/***/ }),

/***/ 283:
/***/ (() => {

/*
 * Render Custom File Dropzone
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomFileDropzone = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__file-field-container'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        var $dropZone = $(this).find('input[type="file"]');
        $(document).on('dragover', function (e) {
          var timeout = window.dropZoneTimeout;
          if (!timeout) {
            $dropZone.addClass('in');
          } else {
            clearTimeout(timeout);
          }
          var found = false,
            node = e.target;
          do {
            if (node === $dropZone[0]) {
              found = true;
              break;
            }
            node = node.parentNode;
          } while (node != null);
          if (found) {
            $dropZone.addClass('hover');
          } else {
            $dropZone.removeClass('hover');
          }
          window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            $dropZone.removeClass('in hover');
          }, 100);
        });
        $dropZone.on('change', function (e) {
          var input = $(this)[0];
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              var imgData = e.target.result;
              var imgName = input.files[0].name;
              input.setAttribute('data-title', imgName);
              //console.log(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
          }
        });
      });
    });
  };
})(jQuery);

/***/ }),

/***/ 433:
/***/ (() => {

/*
 * Render Custom File Type
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderCustomFile = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__file-container'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        var $fileInput = $(this).find('input[type="file"]'),
          $fileBtn = $(this).find('.uix-controls__file-trigger'),
          $filePath = $(this).next('.uix-controls__file-return');
        $fileBtn.off('click').on('click', function () {
          $fileInput.focusin();
        });
        $fileInput.on('change', function () {
          $filePath.text($(this).val());
        });
      });
    });
  };
})(jQuery);

/***/ }),

/***/ 126:
/***/ (() => {

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function ($) {
  var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
    toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
    slice = Array.prototype.slice,
    nullLowestDeltaTimeout,
    lowestDelta;
  if ($.event.fixHooks) {
    for (var i = toFix.length; i;) {
      $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    }
  }
  var special = $.event.special.mousewheel = {
    version: '3.1.12',
    setup: function setup() {
      if (this.addEventListener) {
        for (var i = toBind.length; i;) {
          this.addEventListener(toBind[--i], handler, false);
        }
      } else {
        this.onmousewheel = handler;
      }
      // Store the line height and page height for this particular element
      $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
      $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
    },
    teardown: function teardown() {
      if (this.removeEventListener) {
        for (var i = toBind.length; i;) {
          this.removeEventListener(toBind[--i], handler, false);
        }
      } else {
        this.onmousewheel = null;
      }
      // Clean up the data we added to the element
      $.removeData(this, 'mousewheel-line-height');
      $.removeData(this, 'mousewheel-page-height');
    },
    getLineHeight: function getLineHeight(elem) {
      var $elem = $(elem),
        $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
      if (!$parent.length) {
        $parent = $('body');
      }
      return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
    },
    getPageHeight: function getPageHeight(elem) {
      return $(elem).height();
    },
    settings: {
      adjustOldDeltas: true,
      // see shouldAdjustOldDeltas() below
      normalizeOffset: true // calls getBoundingClientRect for each event
    }
  };

  $.fn.extend({
    mousewheel: function mousewheel(fn) {
      return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
    },
    unmousewheel: function unmousewheel(fn) {
      return this.unbind('mousewheel', fn);
    }
  });
  function handler(event) {
    var orgEvent = event || window.event,
      args = slice.call(arguments, 1),
      delta = 0,
      deltaX = 0,
      deltaY = 0,
      absDelta = 0,
      offsetX = 0,
      offsetY = 0;
    event = $.event.fix(orgEvent);
    event.type = 'mousewheel';

    // Old school scrollwheel delta
    if ('detail' in orgEvent) {
      deltaY = orgEvent.detail * -1;
    }
    if ('wheelDelta' in orgEvent) {
      deltaY = orgEvent.wheelDelta;
    }
    if ('wheelDeltaY' in orgEvent) {
      deltaY = orgEvent.wheelDeltaY;
    }
    if ('wheelDeltaX' in orgEvent) {
      deltaX = orgEvent.wheelDeltaX * -1;
    }

    // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
    if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
      deltaX = deltaY * -1;
      deltaY = 0;
    }

    // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
    delta = deltaY === 0 ? deltaX : deltaY;

    // New school wheel delta (wheel event)
    if ('deltaY' in orgEvent) {
      deltaY = orgEvent.deltaY * -1;
      delta = deltaY;
    }
    if ('deltaX' in orgEvent) {
      deltaX = orgEvent.deltaX;
      if (deltaY === 0) {
        delta = deltaX * -1;
      }
    }

    // No change actually happened, no reason to go any further
    if (deltaY === 0 && deltaX === 0) {
      return;
    }

    // Need to convert lines and pages to pixels if we aren't already in pixels
    // There are three delta modes:
    //   * deltaMode 0 is by pixels, nothing to do
    //   * deltaMode 1 is by lines
    //   * deltaMode 2 is by pages
    if (orgEvent.deltaMode === 1) {
      var lineHeight = $.data(this, 'mousewheel-line-height');
      delta *= lineHeight;
      deltaY *= lineHeight;
      deltaX *= lineHeight;
    } else if (orgEvent.deltaMode === 2) {
      var pageHeight = $.data(this, 'mousewheel-page-height');
      delta *= pageHeight;
      deltaY *= pageHeight;
      deltaX *= pageHeight;
    }

    // Store lowest absolute delta to normalize the delta values
    absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
    if (!lowestDelta || absDelta < lowestDelta) {
      lowestDelta = absDelta;

      // Adjust older deltas if necessary
      if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
        lowestDelta /= 40;
      }
    }

    // Adjust older deltas if necessary
    if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
      // Divide all the things by 40!
      delta /= 40;
      deltaX /= 40;
      deltaY /= 40;
    }

    // Get a whole, normalized value for the deltas
    delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
    deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
    deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

    // Normalise offsetX and offsetY properties
    if (special.settings.normalizeOffset && this.getBoundingClientRect) {
      var boundingRect = this.getBoundingClientRect();
      offsetX = event.clientX - boundingRect.left;
      offsetY = event.clientY - boundingRect.top;
    }

    // Add information to the event object
    event.deltaX = deltaX;
    event.deltaY = deltaY;
    event.deltaFactor = lowestDelta;
    event.offsetX = offsetX;
    event.offsetY = offsetY;
    // Go ahead and set deltaMode to 0 since we converted to pixels
    // Although this is a little odd since we overwrite the deltaX/Y
    // properties with normalized deltas.
    event.deltaMode = 0;

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    // Clearout lowestDelta after sometime to better
    // handle multiple device types that give different
    // a different lowestDelta
    // Ex: trackpad = 3 and mouse wheel = 120
    if (nullLowestDeltaTimeout) {
      clearTimeout(nullLowestDeltaTimeout);
    }
    nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
    return ($.event.dispatch || $.event.handle).apply(this, args);
  }
  function nullLowestDelta() {
    lowestDelta = null;
  }
  function shouldAdjustOldDeltas(orgEvent, absDelta) {
    // If this is an older event and the delta is divisable by 120,
    // then we are assuming that the browser is treating this as an
    // older mouse wheel event and that we should divide the deltas
    // by 40 to try and get a more usable deltaFactor.
    // Side note, this actually impacts the reported scroll distance
    // in older browsers and can cause scrolling to be slower than native.
    // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
    return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
  }
})(jQuery);

/***/ }),

/***/ 782:
/***/ (() => {

/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = function () {
  var sort = [].sort;
  return function (comparator, getSortable) {
    getSortable = getSortable || function () {
      return this;
    };
    var placements = this.map(function () {
      var sortElement = getSortable.call(this),
        parentNode = sortElement.parentNode,
        // Since the element itself will change position, we have
        // to have some way of storing it's original position in
        // the DOM. The easiest way is to have a 'flag' node:
        nextSibling = parentNode.insertBefore(document.createTextNode(''), sortElement.nextSibling);
      return function () {
        if (parentNode === this) {
          throw new Error("You can't sort elements if any one is a descendant of another.");
        }

        // Insert before flag:
        parentNode.insertBefore(this, nextSibling);
        // Remove flag:
        parentNode.removeChild(nextSibling);
      };
    });
    return sort.call(this, comparator).each(function (i) {
      placements[i].call(getSortable.call(this));
    });
  };
}();

/***/ }),

/***/ 2:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(2);
;// CONCATENATED MODULE: ./src/components/_global/js/index.js

/**

	TABLE OF CONTENTS
	---------------------------


	1.Base
    2.Body And Header
    3.Common Height
    4.Get all custom attributes of an element like "data-*"
    5.Loader
    6.Mega Menu
    7.Mobile Menu
    8.Navigation
    9.Specify a background image
    10.Videos
    11.Theme Scripts
    12.Accordion Background Images
    13.Accordion
    14.Advanced Slider (Basic)
    15.Advanced Slider (Special Effects)
    16.Ajax Push Content
    17.Ajax Page Loader (Loading A Page via Ajax Into Div)
    18.Back to Top
    19.Circle Layout
    20.Counter
    21.Dropdown Menu
    22.Dropdown Menu 2 (Multi-level drop-down navigation)
    23.Cascading DropDown List
    24.Flexslider (Third-party plugin)
    25.Floating Side Element
    26.Form Progress
    27.Form
    28.Gallery
    29.Hybrid Content Slider
    30.Hover Delay Interaction
    31.Image Shapes
    32.Infinite Scrolling Element
    33.Lava-Lamp Style Menu
    34.Custom Lightbox
    35.Bulleted List
    36.Posts List With Ajax
    37.Full Width Column to Edge
    38.Login Templates
    39.Modal Dialog
    40.Mousewheel Interaction
    41.Multiple Items Carousel
    42.Full Page/One Page Transition
    43.Full Page/One Page Transition 2
    44.Parallax
    45.Periodical Scroll
    46.Pricing
    47.Progress Bar
    48.Progress Line
    49.Retina Graphics for Website
    50.Rotating Elements
    51.Scroll Reveal
    52.Scrollspy Animate
    53.Show More Less
    54.Skew Based On Velocity of Scroll
    55.Smooth Scrolling When Clicking An Anchor Link
    56.Smooth Scrolling Page
    57.Sticky Elements
    58.SVG Map (China)
    59.SVG Map (World)
    60.SVG Mask Slider
    61.Swiper
    62.3D Background 1 with three.js
    63.3D Background 2 with three.js
    64.3D Background 3 with three.js
    65.3D Background
    66.3D Carousel
    67.3D Gallery with three.js
    68.3D Image Transition with three.js
    69.3D Model
    70.3D Pages
    71.3D Particle Effect
    72.3D Sphere Rotation
    73.3D Object Anim When Click
    74.3D Mouse Interaction with three.js
    75.3D Mouse Interaction with three.js
    76.3D Shatter Slider
    77.3D Explosive Particle Slider
    78.3D Liquid Scrollspy Slider
    79.3D Filmic Effects
    80.Simulate HTML Layout with threejs
    81.Responsive Table
    82.Table Sorter
    83.Tabs
    84.Team Focus
    85.Text effect
    86.Timeline
    87.Vertical Menu
    88.WordPress Core Scripts


*/

/*
 *************************************
 * <!-- Base -->
 *************************************
 */
/* !!! To build a table of contents (TOC), you need to import this scss file into JS */


/*
 * Global variables from front pages
 *
 * @private
 */
var
  //If the file is in the root directory, you can leave it empty.
  //If in another directory, you can write: "/blog"
  templateUrl,
  //Eg. https://uiux.cc
  homeUrl,
  //Eg. https://uiux.cc/wp-admin/admin-ajax.php
  ajaxUrl;
if (typeof APP_ROOTPATH === 'undefined') {
  templateUrl = '';
  homeUrl = '';
  ajaxUrl = '';
} else {
  templateUrl = APP_ROOTPATH.templateUrl.replace(/\/\s*$/, '');
  homeUrl = APP_ROOTPATH.homeUrl.replace(/\/\s*$/, '');
  ajaxUrl = APP_ROOTPATH.ajaxUrl.replace(/\/\s*$/, '');
}

/*
 * Determine whether it is a special browser
 *
 * @private
 */
// Add feature test for passive event listener support
var supportsPassive = false;
try {
  document.addEventListener("test", null, {
    get passive() {
      supportsPassive = true;
    }
  });
} catch (e) {}
var browser = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isAndroid: /(android)/i.test(navigator.userAgent),
  isPC: !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
  isSafari: !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
  /*Test to 9, 10. */
  isIE: !!window.ActiveXObject || "ActiveXObject" in window,
  /*Test to 6 ~ 11 (not edge) */
  supportsPassive: supportsPassive
};

/*
 * Core scripts for current site
 *
 * @private
 * @description Used for all modules from ./src/components/[__]/js
 * @requires ./examples/assets/js/min/jquery.waitforimages.min.js
 * @requires ./examples/assets/js/min/video.min.js
 * @requires ./examples/assets/js/min/TweenMax.min.js
 */
var UixModuleInstance = function ($, window, document) {
  var _APP = {},
    components = {
      documentReady: [],
      pageLoaded: []
    };
  if ($('img').length == 0) {
    $('body').prepend('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">');
  }
  if ($.isFunction($.fn.waitForImages)) {
    $('body').waitForImages(pageLoaded);
  } else {
    $(window).on('load', pageLoaded);
  }
  $(document).ready(documentReady);
  function documentReady(context) {
    context = (0,esm_typeof/* default */.Z)(context) == ( true ? "undefined" : 0) ? $ : context;
    components.documentReady.forEach(function (component) {
      component(context);
    });
  }
  function pageLoaded(context) {
    context = (0,esm_typeof/* default */.Z)(context) == "object" ? $ : context;
    components.pageLoaded.forEach(function (component) {
      component(context);
    });
  }
  _APP.setContext = function (contextSelector) {
    var context = $;
    if ((0,esm_typeof/* default */.Z)(contextSelector) !== ( true ? "undefined" : 0)) {
      return function (selector) {
        return $(contextSelector).find(selector);
      };
    }
    return context;
  };
  _APP.components = components;
  _APP.documentReady = documentReady;
  _APP.pageLoaded = pageLoaded;
  return _APP;
}($, window, document);

/*
 * Create GUID / UUID
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}                        - The globally-unique identifiers.
 */
var UixGUID = UixGUID || function () {
  function t() {}
  return t.version = "0.0.1", t.create = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  //
  t;
}();

/*
 * Evaluating a string as a mathematical expression in JavaScript
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @return {String}            - New calculation result.
 */
var UixMath = UixMath || function () {
  function t() {}
  return t.version = "0.0.1", t.evaluate = function (s) {
    var chars = s.replace(/\s/g, '').split("");
    var n = [],
      op = [],
      index = 0,
      oplast = true;
    n[index] = "";

    // Parse the expression
    for (var c = 0; c < chars.length; c++) {
      if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
        op[index] = chars[c];
        index++;
        n[index] = "";
        oplast = true;
      } else {
        n[index] += chars[c];
        oplast = false;
      }
    }

    // Calculate the expression
    s = parseFloat(n[0]);
    for (var o = 0; o < op.length; o++) {
      var num = parseFloat(n[o + 1]);
      switch (op[o]) {
        case "+":
          s = s + num;
          break;
        case "-":
          s = s - num;
          break;
        case "*":
          s = s * num;
          break;
        case "/":
          s = s / num;
          break;
      }
    }
    return s;
  },
  //
  t;
}();

/*
 * Get the CSS property
 *
 * @private
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {!Element} el     - The Element for which to get the computed style. Using class name or ID to locate.
 * @return {String|Object}   - The value of property.
 */
var UixCssProperty = UixCssProperty || function () {
  function t() {}
  return t.version = "0.0.1", t.getTransitionDuration = function (el) {
    if ((0,esm_typeof/* default */.Z)(el) === ( true ? "undefined" : 0)) {
      return 0;
    }
    var style = window.getComputedStyle(el),
      duration = style.webkitTransitionDuration,
      delay = style.webkitTransitionDelay;
    if ((0,esm_typeof/* default */.Z)(duration) != ( true ? "undefined" : 0)) {
      // fix miliseconds vs seconds
      duration = duration.indexOf("ms") > -1 ? parseFloat(duration) : parseFloat(duration) * 1000;
      delay = delay.indexOf("ms") > -1 ? parseFloat(delay) : parseFloat(delay) * 1000;
      return duration;
    } else {
      return 0;
    }
  },
  //
  t.getAbsoluteCoordinates = function (el) {
    var windowWidth = window.innerWidth,
      leftPos = null,
      topPos = null;
    if (!document.getElementsByTagName('body')[0].className.match(/rtl/)) {
      leftPos = el.offsetLeft == 0 ? el.parentElement.offsetLeft : el.offsetLeft;
      topPos = el.offsetTop == 0 ? el.parentElement.offsetTop : el.offsetTop;
    } else {
      // width and height in pixels, including padding and border
      // Corresponds to jQuery outerWidth(), outerHeight()
      leftPos = el.offsetLeft == 0 ? windowWidth - (el.parentElement.offsetLeft + el.parentElement.offsetWidth) : windowWidth - (el.offsetLeft + el.offsetWidth);
      topPos = el.offsetTop == 0 ? windowWidth - (el.parentElement.offsetTop + el.parentElement.offsetHeight) : windowWidth - (el.offsetTop + el.offsetHeight);
    }
    return {
      'left': leftPos,
      'top': topPos
    };
  },
  //
  t;
}();

/*
* Throttle
*
* @param  {Function} fn    - A function to be executed within the time limit.
* @param  {Number} limit   - Waiting time.
* @return {Void}    
*/
var UixThrottle = function UixThrottle(fn) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var waiting = false;
  return function () {
    if (!waiting) {
      fn.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
};

/*
* Debounce
*
* @param  {Function} fn    - A function to be executed within the time limit.
* @param  {Number} limit   - Waiting time.
* @return {Void}    
*/
var UixDebounce = function UixDebounce(fn) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var timer;
  return function () {
    //Every time this returned function is called, the timer is cleared to ensure that fn is not executed
    clearTimeout(timer);

    // When the returned function is called for the last time (that is the user stops a continuous operation)
    // Execute fn after another delay milliseconds
    timer = setTimeout(function () {
      fn.apply(this, arguments);
    }, limit);
  };
};
;// CONCATENATED MODULE: ./src/components/_global/js/fn/UixModuleFilter.js

/*
 * Method of deleting or adding a module
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean|String} destroy       - If it is a string, it means destroying this module from UixModuleInstance
 * @param  {Object} add                     - New module data via JSON.
 * @param  {String} add.moduleName        - The name of the module (the default is all uppercase).
 * @param  {Boolean} add.pageLoaded       - Window loading module method. If true or 1, the module will execute after the page is loaded.
 * @param  {Number} add.version           - The new module version number.
 * @param  {Function} add.callback        - The new module script of function.
 * @return {Void}      
 *
 * @Usage:
 * !!! The code is to be inserted in front of the uix-kit core script.
	
	
<script>
window.MAIN = null;
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixModuleFilter( { 
		   'destroy' : 'MAIN',
		   'add'     : {
							moduleName    : 'YOUR_MODULE_NAME',
							pageLoaded    : true,
							version       : '0.0.1',
							callback      : function() {
								//the module will execute after the page is loaded.

							}
						}
		} );
    } );
} ) ( jQuery );
</script>

 *
 * 
 */


(function ($) {
  'use strict';

  $.fn.UixModuleFilter = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      destroy: false,
      add: {
        moduleName: 'OLD_MODULE_NAME',
        pageLoaded: false,
        version: '0.0.1',
        callback: function callback() {}
      }
    }, options);
    this.each(function () {
      //remove a module
      //-------------------------------------	
      if (settings.destroy && Object.prototype.toString.call(settings.destroy) == '[object String]') {
        var moduleName = settings.destroy;
        if ((0,esm_typeof/* default */.Z)(UixModuleInstance[moduleName]) != ( true ? "undefined" : 0)) {
          delete UixModuleInstance[moduleName];
        }
      }

      //add or replace a module
      //-------------------------------------	
      if (settings.add && Object.prototype.toString.call(settings.add) == '[object Object]' && settings.add.hasOwnProperty('pageLoaded')) {
        var _moduleName2 = settings.add.moduleName;

        //delete the old module if exist
        if ((0,esm_typeof/* default */.Z)(UixModuleInstance[_moduleName2]) != ( true ? "undefined" : 0)) {
          console.log('The module already exists, please destroy the old module or change the new module name.');
        } else {
          //loading mode "documentReady"
          if (!settings.add.pageLoaded || settings.add.pageLoaded == 0) {
            var _moduleName = function (module, $, window, document) {
              module[_moduleName2] = module[_moduleName2] || {};
              module[_moduleName2].version = settings.add.version;
              module[_moduleName2].documentReady = function ($) {
                settings.add.callback();
              };
              module.components.documentReady.push(module[_moduleName2].documentReady);
              return _moduleName;
            }(UixModuleInstance, jQuery, window, document);
            UixModuleInstance[_moduleName2].documentReady($);
          }

          //loading mode "pageLoaded"
          if (settings.add.pageLoaded || settings.add.pageLoaded == 1) {
            var _moduleName3 = function (module, $, window, document) {
              module[_moduleName2] = module[_moduleName2] || {};
              module[_moduleName2].version = settings.add.version;
              module[_moduleName2].pageLoaded = function () {
                settings.add.callback();
              };
              module.components.pageLoaded.push(module[_moduleName2].pageLoaded);
              return _moduleName3;
            }(UixModuleInstance, jQuery, window, document);
            UixModuleInstance[_moduleName2].pageLoaded();
          }
        }
      }
    });
  };
})(jQuery);
;// CONCATENATED MODULE: ./src/components/_global/js/fn/UixApplyAsyncScripts.js
/*
 * Apply some asynchronism scripts
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean} scrollReveal          - Run script of module "Scroll Reveal". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxPostList          - Run script of module "Posts List With Ajax". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxDDList            - Run script of module "Cascading DropDown List".
 * @param  {Boolean} counterAnim           - Run script of module "Counter".
 * @return {Void}
 *
 * @Usage:
    
	
<script>
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixApplyAsyncScripts({
			scrollReveal    : true,
			ajaxPostList    : true,
			ajaxDDList      : true,
			counterAnim     : true,
			lightBox        : true 
		});
    } );
} ) ( jQuery );
</script>

 

 *
 * 
 */

(function ($) {
  'use strict';

  $.fn.UixApplyAsyncScripts = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      scrollReveal: true,
      // @from ./src/components/scroll-reveal
      ajaxPostList: true,
      // @from ./src/components/list-posts
      ajaxDDList: true,
      // @from ./src/components/cascading-dropdown-list
      counterAnim: true,
      // @from ./src/components/counter
      lightBox: true // @from ./src/components/lightbox
    }, options);
    this.each(function () {
      //----
      if (UixModuleInstance.MAIN) UixModuleInstance.MAIN.pageLoaded(); //Theme Scripts
      if (UixModuleInstance.COMMON_HEIGHT) UixModuleInstance.COMMON_HEIGHT.pageLoaded(); //Common Height
      if (UixModuleInstance.ADVANCED_SLIDER) UixModuleInstance.ADVANCED_SLIDER.pageLoaded(); //Advanced Slider (Basic)
      if (UixModuleInstance.ADVANCED_SLIDER_FILTER) UixModuleInstance.ADVANCED_SLIDER_FILTER.pageLoaded(); //Advanced Slider
      if (UixModuleInstance.FULL_WIDTH_COLUMN_TO_EDGE) UixModuleInstance.FULL_WIDTH_COLUMN_TO_EDGE.pageLoaded(); //Full Width Column to Edge
      if (UixModuleInstance.STICKY_EL) UixModuleInstance.STICKY_EL.pageLoaded(); //Sticky Elements
      if (UixModuleInstance.TEXT_EFFECT) UixModuleInstance.TEXT_EFFECT.pageLoaded(); //Text effect
      if (UixModuleInstance.TIMELINE) UixModuleInstance.TIMELINE.pageLoaded(); //Timeline
      if (UixModuleInstance.HYBRID_CONTENT_SLIDER) UixModuleInstance.HYBRID_CONTENT_SLIDER.pageLoaded(); //Hybrid Content Slider

      //----
      if (UixModuleInstance.MAIN) UixModuleInstance.MAIN.documentReady($); //Theme Scripts
      if (UixModuleInstance.TABLE) UixModuleInstance.TABLE.documentReady($); //Responsive Table
      if (UixModuleInstance.TABLE_SORTER) UixModuleInstance.TABLE_SORTER.documentReady($); //Table Sorter
      if (UixModuleInstance.MODAL_DIALOG) UixModuleInstance.MODAL_DIALOG.documentReady($); //Modal Dialog
      if (UixModuleInstance.PARALLAX) UixModuleInstance.PARALLAX.documentReady($); //Parallax
      if (UixModuleInstance.VIDEOS) UixModuleInstance.VIDEOS.documentReady($); //Videos
      if (UixModuleInstance.BODY_AND_HEADER) UixModuleInstance.BODY_AND_HEADER.documentReady($); //Header Area
      if (UixModuleInstance.SET_BG) UixModuleInstance.SET_BG.documentReady($); //Specify a background image
      if (UixModuleInstance.GET_CUSTOM_ATTRS) UixModuleInstance.GET_CUSTOM_ATTRS.documentReady($); //Get all custom attributes of an element like "data-*"
      if (UixModuleInstance.PAGINATION) UixModuleInstance.PAGINATION.documentReady($); //Pagination
      if (UixModuleInstance.FORM) UixModuleInstance.FORM.documentReady($); //Form
      if (UixModuleInstance.FLEXSLIDER) UixModuleInstance.FLEXSLIDER.documentReady($); //Flexslider (Third-party plugin)
      if (UixModuleInstance.RETINA) UixModuleInstance.RETINA.documentReady($); //Retina Graphics for Website
      if (UixModuleInstance.SHOW_MORELESS) UixModuleInstance.SHOW_MORELESS.documentReady($); //Show More Less
      if (UixModuleInstance.DROPDOWN_MENU) UixModuleInstance.DROPDOWN_MENU.documentReady($); //Dropdown Menu
      if (UixModuleInstance.DROPDOWN_MENU2) UixModuleInstance.DROPDOWN_MENU2.documentReady($); //Dropdown Menu2
      if (UixModuleInstance.ACCORDION) UixModuleInstance.ACCORDION.documentReady($); //Accordion
      if (UixModuleInstance.GALLERY) UixModuleInstance.GALLERY.documentReady($); //Gallery
      if (UixModuleInstance.IMAGE_SHAPES) UixModuleInstance.IMAGE_SHAPES.documentReady($); //Image Shapes
      if (UixModuleInstance.PERIODICAL_SCROLL) UixModuleInstance.PERIODICAL_SCROLL.documentReady($); //Periodical Scroll
      if (UixModuleInstance.PRICING) UixModuleInstance.PRICING.documentReady($); //Pricing
      if (UixModuleInstance.PROGRESS_BAR) UixModuleInstance.PROGRESS_BAR.documentReady($); //Progress Bar
      if (UixModuleInstance.PROGRESS_LINE) UixModuleInstance.PROGRESS_LINE.documentReady($); //Progress Line
      if (UixModuleInstance.ROTATING_EL) UixModuleInstance.ROTATING_EL.documentReady($); //Rotating Elements
      if (UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK) UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK.documentReady($); //Smooth Scrolling When Clicking An Anchor Link
      if (UixModuleInstance.SWIPER) UixModuleInstance.SWIPER.documentReady($); //SWIPER (Third-party plugin)
      if (UixModuleInstance.TABS) UixModuleInstance.TABS.documentReady($); //Tabs
      if (UixModuleInstance.TEAM_FOCUS) UixModuleInstance.TEAM_FOCUS.documentReady($); //Team Focus
      if (UixModuleInstance.LAVA_LAMP_STYLE_MENU) UixModuleInstance.LAVA_LAMP_STYLE_MENU.documentReady($); //Lava-Lamp Style Menu
      if (UixModuleInstance.CIRCLE_LAYOUT) UixModuleInstance.CIRCLE_LAYOUT.documentReady($); //Circle Layout
      if (UixModuleInstance.MULTI_ITEMS_CAROUSEL) UixModuleInstance.MULTI_ITEMS_CAROUSEL.documentReady($); //Multiple Items Carousel
      if (UixModuleInstance.THREE_BACKGROUND) UixModuleInstance.THREE_BACKGROUND.documentReady($); //3D Background
      if (UixModuleInstance.THREE_CAROUSEL) UixModuleInstance.THREE_CAROUSEL.documentReady($); //3D Carousel
      if (UixModuleInstance.THREE_LIQUID_SCROLLSPY_SLIDER) UixModuleInstance.THREE_LIQUID_SCROLLSPY_SLIDER.documentReady($); //3D Liquid Scrollspy Slider

      //---- Prevent overlay clicks on asynchronous requests
      //---- Commonly used for AJAX modules that are clicked by button
      //Scroll Reveal
      if (settings.scrollReveal) {
        if (UixModuleInstance.SCROLL_REVEAL) UixModuleInstance.SCROLL_REVEAL.documentReady($);
      }

      //Posts List With Ajax
      if (settings.ajaxPostList) {
        if (UixModuleInstance.POST_LIST_AJAX) UixModuleInstance.POST_LIST_AJAX.documentReady($);
      }

      //Cascading DropDown List
      if (settings.ajaxDDList) {
        if (UixModuleInstance.CASCADING_DD_LIST) UixModuleInstance.CASCADING_DD_LIST.documentReady($);
      }

      //Counter
      if (settings.counterAnim) {
        if (UixModuleInstance.COUNTER) UixModuleInstance.COUNTER.documentReady($);
      }

      //Custom Lightbox
      if (settings.lightBox) {
        if (UixModuleInstance.LIGHTBOX) UixModuleInstance.LIGHTBOX.pageLoaded();
      }

      //----Uix Shortcodes (WordPress Plugin)
      if ($.isFunction($.uix_sc_init)) {
        $.uix_sc_init();
      }
    });
  };
})(jQuery);
;// CONCATENATED MODULE: ./src/components/_global/js/fn/UixApplyAsyncAllScripts.js
/*
 * Apply all the asynchronism scripts
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean} runAll          - Run all module scripts.
 * @return {Void}
 *
 * @Usage:
    
<script>
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixApplyAsyncAllScripts();
    } );
} ) ( jQuery );
</script>
	

 *
 * 
 */

(function ($) {
  'use strict';

  $.fn.UixApplyAsyncAllScripts = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      runAll: true
    }, options);
    this.each(function () {
      var scipts_pageLoaded = UixModuleInstance.components.pageLoaded,
        scipts_documentReady = UixModuleInstance.components.documentReady;
      if (settings.runAll) {
        for (var i = 0; i < scipts_pageLoaded.length; i++) {
          scipts_pageLoaded[i]();
        }
        for (var j = 0; j < scipts_documentReady.length; j++) {
          scipts_documentReady[j]($);
        }
      }

      //Uix Shortcodes
      if ($.isFunction($.uix_sc_init)) {
        $.uix_sc_init();
      }
    });
  };
})(jQuery);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./src/components/_global/js/modules/body-and-header.js


/* 
 *************************************
 * <!-- Body And Header -->
 *************************************
 */

var BODY_AND_HEADER = function (module, $, window, document) {
  if (window.BODY_AND_HEADER === null) return false;
  module.BODY_AND_HEADER = module.BODY_AND_HEADER || {};
  module.BODY_AND_HEADER.version = '0.0.8';
  module.BODY_AND_HEADER.documentReady = function ($) {
    //Prevent this module from loading in other pages
    if ($('body').hasClass('onepage')) return false;
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    //-------- Header initialize
    headerInit(windowWidth);
    function headerInit(w) {
      var $headerPlaceholder = $('.uix-header__placeholder.js-uix-header__placeholder-autoheight');
      if (w > 768) {
        $headerPlaceholder.css('height', $('.uix-header__container').outerHeight(true) + 'px');
        $('body').removeClass('is-mobile');
      } else {
        $headerPlaceholder.css('height', 0);
        $('body').addClass('is-mobile');
      }
    }
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        headerInit(windowWidth);
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);

    //-------- Sticky header area
    var $el = $('.uix-header__container, .uix-header__placeholder');
    function scrollUpdate() {
      var scrolled = $(window).scrollTop(),
        spyTop = 220;
      if (scrolled >= spyTop) {
        $el.addClass('is-fixed');
      } else {
        $el.removeClass('is-fixed');
      }
    }

    // Add function to the element that should be used as the scrollable area.
    var throttleFunc = UixThrottle(scrollUpdate, 5);
    window.removeEventListener('scroll', throttleFunc);
    window.removeEventListener('touchmove', throttleFunc);
    window.addEventListener('scroll', throttleFunc);
    window.addEventListener('touchmove', throttleFunc);
    throttleFunc();
  };
  module.components.documentReady.push(module.BODY_AND_HEADER.documentReady);
  return /*#__PURE__*/_createClass(function BODY_AND_HEADER() {
    _classCallCheck(this, BODY_AND_HEADER);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/common-height.js


/* 
 *************************************
 * <!-- Common Height -->
 
 *
 * Note: 
 *
 * Automatically sets the div height of the grid system to the height of the 
 * outer container when ".js-uix-common-height" class on ".row" or ".uix-core-grid__row" div.
 *
 *************************************
 */

var COMMON_HEIGHT = function (module, $, window, document) {
  if (window.COMMON_HEIGHT === null) return false;
  module.COMMON_HEIGHT = module.COMMON_HEIGHT || {};
  module.COMMON_HEIGHT.version = '0.0.4';
  module.COMMON_HEIGHT.pageLoaded = function () {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    commonHeightInit(windowWidth);
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        commonHeightInit(windowWidth);
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);
    function commonHeightInit(w) {
      $('.js-uix-common-height').each(function () {
        var $this = $(this);
        var element = $this;
        var selectors = '[class*=col-], [class*=uix-core-grid__col-]'; //Bootstrap grid system and Custom uix grid system
        var maxHeight = 0;

        // Select and loop the elements you want to equalise
        element.children(selectors).each(function () {
          var element = $(this);

          //Solve the problem that the image cannot be read accurately
          element.find('img').each(function () {
            var imgOuter = $(this).parent('a').css('display');
            if (imgOuter == 'inline') {
              $(this).parent('a').css('display', 'inline-block');
            }
          });
          if (element.hasClass('max-height')) {
            // if has max-height
            maxHeight = element.outerHeight();
          } else {
            // if this box is higher than the cached highest then store it
            if (element.height() > maxHeight) {
              maxHeight = element.outerHeight();
            }
          }
        });

        // Set the height of all those children to whichever was highest 
        if (w > 768) {
          element.children(selectors).each(function () {
            $(this).css('height', maxHeight);
          });
        } else {
          element.children(selectors).each(function () {
            $(this).css('height', 'auto');
          });
        }
      });
    }
  };
  module.components.pageLoaded.push(module.COMMON_HEIGHT.pageLoaded);
  return /*#__PURE__*/_createClass(function COMMON_HEIGHT() {
    _classCallCheck(this, COMMON_HEIGHT);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/_third-party-plugins/Miscellaneous/attrExt.js
var attrExt = __webpack_require__(319);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/custom-data-attrs.js


/* 
 *************************************
 * <!-- Get all custom attributes of an element like "data-*" -->
 *************************************
 */


var GET_CUSTOM_ATTRS = function (module, $, window, document) {
  if (window.GET_CUSTOM_ATTRS === null) return false;
  module.GET_CUSTOM_ATTRS = module.GET_CUSTOM_ATTRS || {};
  module.GET_CUSTOM_ATTRS.version = '0.0.1';
  module.GET_CUSTOM_ATTRS.documentReady = function ($) {
    $('[data-my-custom-datas]').each(function () {
      var $this = $(this);

      //Get all attributes of an element and push the new attributes like "data-*"
      var curAttrs = $this.attr(),
        customPostData = '';
      $.each(curAttrs, function (i, val) {
        if (i.indexOf('data-custom-field-') >= 0) {
          customPostData += '"' + i.replace('data-custom-field-', '') + '": ' + '"' + val + '", ';
        }
      });
      customPostData = customPostData.replace(/,\s*$/, '');
    });
  };
  module.components.documentReady.push(module.GET_CUSTOM_ATTRS.documentReady);
  return /*#__PURE__*/_createClass(function GET_CUSTOM_ATTRS() {
    _classCallCheck(this, GET_CUSTOM_ATTRS);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/loader.js



/* 
 *************************************
 * <!-- Loader -->
 *************************************
 */

var LOADER = function (module, $, window, document) {
  if (window.LOADER === null) return false;
  module.LOADER = module.LOADER || {};
  module.LOADER.version = '0.0.5';
  module.LOADER.documentReady = function ($) {
    // Disable devices scaling
    //-------------------------------------	
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    // Loader Process
    //-------------------------------------	

    // Detect if video.load is successful or not 
    var videos = [];
    var videosTotal = 0;
    var videosLoaded = 0;
    $('.uix-video__slider > video').each(function () {
      videos.push($(this));
    });
    videosTotal = videos.length;
    console.log('videosTotal: ' + videosTotal + ', videosLoaded: ' + videosLoaded);

    // Loading progress event
    var loadedPercent = 0;
    var imgTotal = 0;
    var loadingAnim = function loadingAnim(per) {
      $('.uix-loader-progress > span').text($('.uix-loader-progress').data('txt').replace(/\{progress\}/g, per));
      TweenMax.to('.uix-loader-progress__line', 0.3, {
        width: per / 100.0 * window.innerWidth
      });
    };
    $('body').waitForImages().progress(function (loaded, count, success) {
      imgTotal = count;
      var per = parseInt(loaded / (count - (1 - videosTotal)) * 100);

      //
      if ($('img').length <= 1) {
        per = 100;
      }

      //
      if (isNaN(per)) per = 100;

      //
      loadedPercent = per;

      //animation classes for loader
      for (var i = 1; i < 10; i++) {
        if (per < i * 10) $('body').addClass('loaded' + i);
      }

      //loading animation
      loadingAnim(per);
    }).done(function () {
      //Event after loading is complete
      // Main scene
      console.log('loadedPercent: ' + loadedPercent + ', imageTotal: ' + imgTotal);
      mainObjLoader(loadedPercent, imgTotal);
    });

    /*
     * Main Object Loader
     *
     * @param  {Number} loadedPercent  - The percentage value after the page loads the image.
     * @param  {Number} imgTotal       - The total number of imags.
     * @return {Void}
     */
    function mainObjLoader(loadedPercent, imgTotal) {
      var remainedPercentComplete = 0;
      var loadedFun = function loadedFun() {
        //loading animation
        loadingAnim(100);

        //animation classes for loader
        $('body').addClass('loaded10');

        // Remove loader
        TweenMax.to('.uix-loader, .uix-loader-progress, .uix-loader-progress__line', 0.5, {
          css: {
            opacity: 0,
            display: 'none'
          }
        });

        //page animation when elements loaded
        //...
      };

      //
      if (loadedPercent < 100) {
        videos.forEach(function (element) {
          var _src = element.find('source:first').attr('src');
          if ((0,esm_typeof/* default */.Z)(_src) === ( true ? "undefined" : 0)) _src = element.attr('src');
          var video = document.getElementById(element.attr('id')),
            videoURL = _src;
          video.addEventListener('loadedmetadata', function (e) {
            //Video has started loading successfully
            videosLoaded++;

            //get remained percent
            remainedPercentComplete = (1 - videosLoaded / videosTotal) * (100 - loadedPercent);

            //current percent
            var currentPercent = loadedPercent + (100 - loadedPercent - remainedPercentComplete);

            //loading animation
            loadingAnim(currentPercent);

            // All videos loaded
            if (currentPercent == 100) {
              loadedFun();
            }

            //debug
            console.log('remainedPercentComplete: ' + remainedPercentComplete + ', currentPercent: ' + currentPercent);
            console.log('videosTotal: ' + videosTotal + ', videosLoaded: ' + videosLoaded);
          }, false);
          video.src = videoURL;
        });
      } else {
        // All videos loaded
        if (remainedPercentComplete == 0) {
          loadedFun();
        }
      }
    }
  };
  module.components.documentReady.push(module.LOADER.documentReady);
  return /*#__PURE__*/_createClass(function LOADER() {
    _classCallCheck(this, LOADER);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/mega-menu.js


/* 
 *************************************
 * <!-- Mega Menu -->
 *************************************
 */

var MEGA_MENU = function (module, $, window, document) {
  if (window.MEGA_MENU === null) return false;
  module.MEGA_MENU = module.MEGA_MENU || {};
  module.MEGA_MENU.version = '0.0.5';
  module.MEGA_MENU.pageLoaded = function () {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    // Using delay is for more accurate calculation
    setTimeout(function () {
      megaMenuInit(windowWidth);
    }, 500);
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        megaMenuInit(windowWidth);
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);

    // Initialize mega menu
    function megaMenuInit(w) {
      var $menuWrap = $('.uix-menu__container:not(.is-mobile)'),
        maxWidth = 1140,
        //The maximum width of the mega menu wrapper

        //This value is equal to the $nav-mega-li-w variable in the SCSS
        perDefaultW = 270; //Default width of each column

      //New XL container for Bootstrap 5.x
      if (w > 1430) maxWidth = 1278;

      //Full width container
      maxWidth = windowWidth - 15;

      // Remove the html tag for mega menu item
      $menuWrap.find('li.multi-column  > ul .multi-column-title').each(function () {
        var megaOldItem = $(this).html();
        if (megaOldItem != '') {
          $(this).html(megaOldItem.replace(/<[^>]+>/g, ''));
        }
      });
      if (w > 768) {
        $menuWrap.find('li.multi-column').each(function (index) {
          var $rootLi = $(this),
            colTotal = $rootLi.find('> ul > li').length,
            itemWidth = $rootLi.find('> ul > li').first().width(),
            $megaDiv = $rootLi.find('> ul.sub-menu');
          var megaPerWidth = null,
            rootLiLeft = null;

          // Get width or other style data of element when Not Visible (Display: None)
          var megaDivWidth = $megaDiv.width();

          // Add mega arrow
          if ($rootLi.find('.uix-menu__arrow-mega').length < 1) $rootLi.prepend('<span class="uix-menu__arrow-mega"></span>');

          // Detecting if the right or left of the div is touching the browser window edge.
          if (colTotal > 0) {
            rootLiLeft = UixCssProperty.getAbsoluteCoordinates($megaDiv[0]).left;

            //Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
            if (maxWidth > w) maxWidth = w;
            if (megaDivWidth + 20 > maxWidth) {
              megaDivWidth = maxWidth;
              megaPerWidth = maxWidth / colTotal - 2.888;

              //Resetting the width of each column
              $megaDiv.find('> li').css({
                'width': megaPerWidth + 'px'
              });

              //Resetting the width of each <li> tag
              $megaDiv.find('> li ul li').css({
                'width': megaPerWidth + 'px'
              });
              if (!$('body').hasClass('rtl')) {
                $megaDiv.css({
                  'margin-left': -rootLiLeft + (w - megaDivWidth) / 2 + 'px'
                });
              } else {
                $megaDiv.css({
                  'margin-right': -rootLiLeft + (w - megaDivWidth) / 2 + 'px'
                });
              }
            } else {
              //Resetting the width of each column
              $megaDiv.find('> li').css({
                'width': perDefaultW + 'px'
              });

              //Resetting the width of each <li> tag
              $megaDiv.find('> li ul li').css({
                'width': perDefaultW + 'px'
              });
              var chkWidth = rootLiLeft + megaDivWidth;
              if (chkWidth > w) {
                if (!$('body').hasClass('rtl')) {
                  $megaDiv.css({
                    'margin-left': -(chkWidth - w) + 'px'
                  });
                } else {
                  $megaDiv.css({
                    'margin-right': -(chkWidth - w) + 'px'
                  });
                }

                //If the CSS sets the offset of ul::before
                //								const $megaDiv_offset = megaDivWidth/2 - 0;
                //								
                //								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
                //									$megaDiv.css( {
                //										'margin-left' : - ( chkWidth - w ) + $megaDiv_offset + 'px'
                //									} );
                //								} else {
                //									$megaDiv.css( {
                //										'margin-right' : - ( chkWidth - w ) + $megaDiv_offset + 'px'
                //									} );
                //								}	
              }
            }
          }
        });
      }
    }
  };

  module.components.pageLoaded.push(module.MEGA_MENU.pageLoaded);
  return /*#__PURE__*/_createClass(function MEGA_MENU() {
    _classCallCheck(this, MEGA_MENU);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/mobile-menu.js



/* 
 *************************************
 * <!-- Mobile Menu -->
 *************************************
 */

var MOBILE_MENU = function (module, $, window, document) {
  if (window.MOBILE_MENU === null) return false;
  module.MOBILE_MENU = module.MOBILE_MENU || {};
  module.MOBILE_MENU.version = '0.0.9';
  module.MOBILE_MENU.documentReady = function ($) {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    //-------- Show Toolbar when viewing site for WordPress
    var $el = $('.admin-bar .uix-menu-mobile__toggle');
    function scrollUpdate() {
      var scrolled = $(window).scrollTop(),
        spyTop = 46;
      if (scrolled >= spyTop) {
        $el.addClass('is-fixed');
      } else {
        $el.removeClass('is-fixed');
      }
    }

    // Add function to the element that should be used as the scrollable area.
    var throttleFunc = UixThrottle(scrollUpdate, 5);
    window.removeEventListener('scroll', throttleFunc);
    window.removeEventListener('touchmove', throttleFunc);
    window.addEventListener('scroll', throttleFunc);
    window.addEventListener('touchmove', throttleFunc);
    throttleFunc();

    //-------- Mobile Menu
    var $toggle = $('.uix-menu-mobile__toggle'),
      $toggleBody = $('body');

    //-------- Add mobile menu to your website
    $('nav.uix-menu__container').clone().addClass('is-mobile').appendTo('body');
    //Wait until previous .appendTo() is complete
    $.when($('.uix-menu__container.is-mobile').length > 0).then(function () {
      $toggle.on('touchstart click', function (e) {
        e.preventDefault();

        //Prevents further propagation of the current event in the capturing and bubbling phases.
        e.stopPropagation();
        $(this).toggleClass('is-active');
        if ($(this).hasClass('is-active')) {
          //Add mobile brand
          var logoURL = $('.uix-brand--mobile img').attr('src');
          if ((0,esm_typeof/* default */.Z)(logoURL) !== ( true ? "undefined" : 0) && logoURL != '') {
            if (logoURL.indexOf('blank.gif') >= 0) $('.mobile-inner').css('margin-top', '-70px');
          }

          //Toggle effect
          $toggleBody.addClass('js-uix-menu-opened');
        } else {
          $toggleBody.removeClass('js-uix-menu-opened');
        }
      });

      //Mobile menu mask event
      $('.uix-menu-mobile__mask').on('click', function () {
        $toggle.removeClass('is-active');
        $toggleBody.removeClass('js-uix-menu-opened');
      });

      // Fires drop-menu event 
      var $drMenuLi = $('.uix-menu__container.is-mobile ul li');
      $drMenuLi.find('> a').on('click', function (e) {
        var arrowText = $(this).find('.uix-menu__arrow-mobile').text().replace(/(.).*\1/g, "$1"),
          $sub = $(this).next('ul');
        if ($sub.length > 0) {
          e.preventDefault();

          //Its value is not a boolean but a string
          var expanded = $(this).attr('aria-expanded') == 'true' ? false : true;
          if (expanded) {
            //Hide other all sibling <ul> of the selected element
            var $e = $(this).parent('li').siblings().find('> a');
            $e.removeClass('is-opened').attr('aria-expanded', false);
            $e.parent('li').find('.uix-menu__arrow-mobile').removeClass('is-opened');
            $e.parent('li').removeClass('is-opened');
            $(this).addClass('is-opened').attr('aria-expanded', true);
            $(this).parent('li').find('.uix-menu__arrow-mobile').addClass('is-opened');
            $(this).parent('li').addClass('is-opened');
            TweenMax.to($e.next('ul'), 0.5, {
              height: 0
            });

            //to open
            // - temporarilty set height:auto
            // - tween from height:0
            TweenMax.set($sub, {
              height: 'auto'
            });
            TweenMax.from($sub, 0.5, {
              height: 0
            });
          } else {
            $(this).removeClass('is-opened').attr('aria-expanded', false);
            $(this).parent('li').find('.uix-menu__arrow-mobile').removeClass('is-opened');
            $(this).parent('li').removeClass('is-opened');

            //to close
            TweenMax.to($sub, 0.5, {
              height: 0
            });
          }
          return false;
        }
      });
      mobileMenuInit(windowWidth);
      function windowUpdate() {
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if (window.innerWidth != windowWidth) {
          // Update the window width for next time
          windowWidth = window.innerWidth;

          // Do stuff here
          $toggleBody.removeClass('js-uix-menu-opened');
          $toggle.removeClass('is-active');
          mobileMenuInit(windowWidth);
        }
      }

      // Add function to the window that should be resized
      var debounceFuncWindow = UixDebounce(windowUpdate, 50);
      window.removeEventListener('resize', debounceFuncWindow);
      window.addEventListener('resize', debounceFuncWindow);
    });

    /*
     * Initialize mobile menu
     *
     * @param  {Number} w                  - Returns width of browser viewport.
     * @return {Void}
     */
    function mobileMenuInit(w) {
      if (w <= 768) {
        $('.uix-menu__container.is-mobile .uix-menu > li').each(function () {
          if ($(this).find('ul').length > 0) {
            if ($(this).find('.uix-menu__arrow-mobile').length < 1) $(this).prepend('<em class="uix-menu__arrow-mobile"></em>');
            $(this).find('ul ul').addClass('sub-sub');
            $(this).find(' > a').attr('href', 'javascript:void(0);');
          }
        });
      }
    }
  };
  module.components.documentReady.push(module.MOBILE_MENU.documentReady);
  return /*#__PURE__*/_createClass(function MOBILE_MENU() {
    _classCallCheck(this, MOBILE_MENU);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/navigation.js



/* 
 *************************************
 * <!-- Navigation -->
 *************************************
 */

var NAVIGATION = function (module, $, window, document) {
  if (window.NAVIGATION === null) return false;
  module.NAVIGATION = module.NAVIGATION || {};
  module.NAVIGATION.version = '0.1.0';
  module.NAVIGATION.documentReady = function ($) {
    var ulForDesktop = '.uix-menu__container:not(.is-mobile) ul.uix-menu';

    //-------- Menu selected (if it exists "data-current" property in <ul>)
    var curMenuIndex = $(ulForDesktop).data('current');
    if ((0,esm_typeof/* default */.Z)(curMenuIndex) !== ( true ? "undefined" : 0)) {
      $(ulForDesktop + ' > li:eq(' + curMenuIndex + ')').addClass('is-active');
    }

    //-------- Menu Hover
    var mTop = 15;
    $(ulForDesktop + ' > li.multi-column > ul li ul').addClass('multi');
    $(ulForDesktop + ' > li:not(.multi-column) ul, .uix-menu__container:not(.is-mobile) li.multi-column > ul.sub-menu > li > ul, ' + ulForDesktop + ' li.multi-column > ul').css('margin-top', mTop + 'px');
    $(ulForDesktop + ' li').on('mouseenter', function () {
      TweenMax.set($(this).find(' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega'), {
        css: {
          opacity: 0,
          display: 'block',
          marginTop: mTop + 'px'
        },
        onComplete: function onComplete() {
          TweenMax.to(this.target, 0.3, {
            css: {
              opacity: 1,
              marginTop: 0
            },
            ease: Power2.easeOut
          });
        }
      });
    }).on('mouseleave', function () {
      TweenMax.to($(this).find(' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega'), 0.3, {
        css: {
          opacity: 0,
          marginTop: mTop + 'px'
        },
        onComplete: function onComplete() {
          TweenMax.set(this.target, {
            css: {
              display: 'none'
            }
          });
        }
      });
    });

    //-------- Add Sub-menu Arrow
    $(ulForDesktop + ' li').each(function () {
      if ($(this).find('ul').length > 0) {
        $(this).prepend('<span class="uix-menu__arrow"></span>');
      }
    });

    //-------- Sticky primary navigation
    var $el = $('.uix-menu__container:not(.is-mobile)');
    function scrollUpdate() {
      var scrolled = $(window).scrollTop(),
        spyTop = 220;
      if (scrolled >= spyTop) {
        $el.addClass('is-fixed');
      } else {
        $el.removeClass('is-fixed');
      }
    }

    // Add function to the element that should be used as the scrollable area.
    var throttleFunc = UixThrottle(scrollUpdate, 5);
    window.removeEventListener('scroll', throttleFunc);
    window.removeEventListener('touchmove', throttleFunc);
    window.addEventListener('scroll', throttleFunc);
    window.addEventListener('touchmove', throttleFunc);
    throttleFunc();
  };
  module.components.documentReady.push(module.NAVIGATION.documentReady);
  return /*#__PURE__*/_createClass(function NAVIGATION() {
    _classCallCheck(this, NAVIGATION);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_global/js/fn/UixParallax.js
/* 
 *************************************
 * Parallax Effect
 *
 * @param  {Number} speed       - The speed of movement between elements.
 * @param  {String} transition  - Transition time can simulate easing effect.
 * @param  {Object} bg            - Specify the background display. Default value: { enable: true, xPos: '50%' }
 * @return {Void}
 *
 *************************************
 */

(function ($) {
  'use strict';

  $.fn.UixParallax = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      speed: 0.25,
      offsetTop: 0,
      transition: 'all 0.4s cubic-bezier(0, 0, 0.34, 0.96) 0s',
      bg: {
        enable: true,
        xPos: '50%'
      }
    }, options);
    this.each(function () {
      var bgEff = settings.bg,
        $this = $(this),
        bgXpos = '50%',
        offsetTop = parseFloat(settings.offsetTop),
        speed = -parseFloat(settings.speed);
      if (bgEff) {
        bgEff = settings.bg.enable;
        bgXpos = settings.bg.xPos;
      }

      //Prohibit transition delay
      $this.css({
        'transition': 'none'
      });

      //Initialize the position of the background
      if (bgEff) {
        //background parallax
        TweenMax.set($this, {
          backgroundPosition: bgXpos + ' ' + (-$this[0].getBoundingClientRect().top * speed + -offsetTop) + 'px'
        });
      } else {
        //element parallax
        TweenMax.set($this, {
          y: 0
        });
      }
      function scrollUpdate() {
        var spyTop = $this[0].getBoundingClientRect().top;
        if (bgEff) {
          //background parallax
          TweenMax.set($this, {
            css: {
              'background-position': bgXpos + ' ' + (0 - (spyTop * speed + offsetTop)) + 'px',
              'transition': settings.transition
            }
          });
        } else {
          //element parallax
          TweenMax.set($this, {
            css: {
              'transform': 'matrix(1, 0, 0, 1, 0, ' + (0 - (spyTop * speed + offsetTop)) + ')',
              'transition': settings.transition
            }
          });
        }
      }

      // Add function to the element that should be used as the scrollable area.
      var throttleFunc = UixThrottle(scrollUpdate, 5);
      window.removeEventListener('scroll', throttleFunc);
      window.removeEventListener('touchmove', throttleFunc);
      window.addEventListener('scroll', throttleFunc);
      window.addEventListener('touchmove', throttleFunc);

      // Prevent calculation errors caused by unloaded completion
      if (document.readyState != 'loading') {
        throttleFunc();
      } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', throttleFunc);
      } else {
        document.attachEvent('onreadystatechange', function () {
          if (document.readyState != 'loading') throttleFunc();
        });
      }
    });
  };
})(jQuery);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/set-background.js



/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */


var SET_BG = function (module, $, window, document) {
  if (window.SET_BG === null) return false;
  module.SET_BG = module.SET_BG || {};
  module.SET_BG.version = '0.0.8';
  module.SET_BG.documentReady = function ($) {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    //  Initialize
    setBGInit();
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        setBGInit();
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);

    /*
     * Initialize background using "data-bg" attribute.
     *
     * @return {Void}
     */
    function setBGInit() {
      $('[data-bg]').each(function () {
        var $this = $(this);
        var config = $this.data('bg');
        if ((0,esm_typeof/* default */.Z)(config) === ( true ? "undefined" : 0)) {
          config = {
            "src": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            "position": "top left",
            "size": "cover",
            "repeat": "no-repeat",
            "offsetTop": 0,
            "fill": false,
            "parallax": 0,
            "transition": "none 0s ease 0s",
            "move": false // {"dir":"left","duration":"10s","easing":"linear","loop":true}
          };
        }

        if (config) {
          var dataImg = config.src,
            dataPos = config.position,
            dataSize = config.size,
            dataRepeat = config.repeat,
            dataEasing = config.transition,
            dataOffsetTop = config.offsetTop,
            dataParallax = config.parallax,
            dataMove = config.move;
          if ((0,esm_typeof/* default */.Z)(dataPos) === ( true ? "undefined" : 0)) dataPos = 'top left';
          if ((0,esm_typeof/* default */.Z)(dataSize) === ( true ? "undefined" : 0)) dataSize = 'cover';
          if ((0,esm_typeof/* default */.Z)(dataRepeat) === ( true ? "undefined" : 0)) dataRepeat = 'no-repeat';
          if ((0,esm_typeof/* default */.Z)(dataOffsetTop) === ( true ? "undefined" : 0)) dataOffsetTop = 0;
          if ((0,esm_typeof/* default */.Z)(dataEasing) === ( true ? "undefined" : 0)) dataEasing = 'none 0s ease 0s';
          if ((0,esm_typeof/* default */.Z)(dataMove) === ( true ? "undefined" : 0)) dataMove = false;

          //Using parallax
          if (dataParallax && (0,esm_typeof/* default */.Z)(dataParallax) != ( true ? "undefined" : 0) && dataParallax != 0) {
            dataPos = dataPos.replace('top', '50%');
          }

          //background animation
          var moveAnim = 'none',
            moveAnimLoop = 'infinite',
            moveEasing = 'linear',
            moveKeyframesTop = '@keyframes js-uix-cssanim--move-t{from{background-position:0 0;}to{background-position:0 -19999px;}',
            moveKeyframesBottom = '@keyframes js-uix-cssanim--move-b{from{background-position:0 0;}to{background-position:0 19999px;}',
            moveKeyframesLeft = '@keyframes js-uix-cssanim--move-l{from{background-position:0 0;}to{background-position:-19999px 0;}',
            moveKeyframesRight = '@keyframes js-uix-cssanim--move-r{from{background-position:0 0;}to{background-position:19999px 0;}';
          if (dataMove && Object.prototype.toString.call(dataMove) == '[object Object]') {
            if (!dataMove.loop) moveAnimLoop = '1 forwards';
            dataPos = '0 0';
            switch (dataMove.dir) {
              case 'top':
                moveAnim = 'js-uix-cssanim--move-t ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;
              case 'bottom':
                moveAnim = 'js-uix-cssanim--move-b ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;
              case 'left':
                moveAnim = 'js-uix-cssanim--move-l ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;
              case 'right':
                moveAnim = 'js-uix-cssanim--move-r ' + parseInt(dataMove.speed) + 's ' + moveEasing + ' ' + moveAnimLoop;
                break;
            }

            //  CSS3 animation keyframe attributes inline
            if ($('#js-uix-cssanim--move-t').length == 0) {
              $('<style id="js-uix-cssanim--move-t">').text(moveKeyframesTop).appendTo('head');
            }
            if ($('#js-uix-cssanim--move-b').length == 0) {
              $('<style id="js-uix-cssanim--move-b">').text(moveKeyframesBottom).appendTo('head');
            }
            if ($('#js-uix-cssanim--move-l').length == 0) {
              $('<style id="js-uix-cssanim--move-l">').text(moveKeyframesLeft).appendTo('head');
            }
            if ($('#js-uix-cssanim--move-r').length == 0) {
              $('<style id="js-uix-cssanim--move-r">').text(moveKeyframesRight).appendTo('head');
            }
          }

          //-----
          if ((0,esm_typeof/* default */.Z)(dataImg) != ( true ? "undefined" : 0) && dataImg != '') {
            if (config.fill) {
              //Show Image Under Text
              if (Modernizr.cssanimations) {
                $this.css({
                  'background': 'url(' + dataImg + ') ' + dataRepeat + '',
                  'background-size': dataSize,
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent',
                  'animation': moveAnim
                });
              }
            } else {
              $this.css({
                'background-image': 'url(' + dataImg + ')',
                'background-position': dataPos,
                'background-size': dataSize,
                'background-repeat': dataRepeat,
                'animation': moveAnim
              });
            }

            //Using parallax
            if (dataParallax && (0,esm_typeof/* default */.Z)(dataParallax) != ( true ? "undefined" : 0) && dataParallax != 0) {
              $this.UixParallax({
                'speed': dataParallax,
                'transition': dataEasing,
                'offsetTop': dataOffsetTop,
                'bg': {
                  enable: true,
                  xPos: '50%'
                }
              });
            }
          }
        }
      });
    }
  };
  module.components.documentReady.push(module.SET_BG.documentReady);
  return /*#__PURE__*/_createClass(function SET_BG() {
    _classCallCheck(this, SET_BG);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_global/js/modules/videos.js



/* 
 *************************************
 * <!-- Videos -->
 *************************************
 */

var VIDEOS = function (module, $, window, document) {
  if (window.VIDEOS === null) return false;
  module.VIDEOS = module.VIDEOS || {};
  module.VIDEOS.version = '0.1.3';
  module.VIDEOS.documentReady = function ($) {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    /* 
     ---------------------------
     Video Embed
     ---------------------------
     */
    $('.uix-video').each(function () {
      var $this = $(this);
      var curVideoID = $this.find('video').attr('id'),
        coverPlayBtnID = 'videocover-' + curVideoID,
        videoWrapperW = $this.closest('[data-embed-video-wrapper]').width();
      var dataAuto = $this.data('embed-video-autoplay'),
        dataLoop = $this.data('embed-video-loop'),
        dataControls = $this.data('embed-video-controls'),
        dataW = $this.data('embed-video-width'),
        dataH = $this.data('embed-video-height');

      //Push a new ID to video
      //Solve the problem that ajax asynchronous loading does not play
      $this.find('.video-js').attr('id', curVideoID);
      if ((0,esm_typeof/* default */.Z)(dataAuto) === ( true ? "undefined" : 0)) {
        dataAuto = true;
      }
      if ((0,esm_typeof/* default */.Z)(dataLoop) === ( true ? "undefined" : 0)) {
        dataLoop = true;
      }
      if ((0,esm_typeof/* default */.Z)(dataControls) === ( true ? "undefined" : 0)) {
        dataControls = false;
      }
      if ((0,esm_typeof/* default */.Z)(dataW) === ( true ? "undefined" : 0) || dataW == 'auto') {
        dataW = videoWrapperW;
      }
      if ((0,esm_typeof/* default */.Z)(dataH) === ( true ? "undefined" : 0) || dataH == 'auto') {
        dataH = videoWrapperW / 1.77777777777778;
      }

      //Display cover and play buttons when some mobile device browsers cannot automatically play video
      if ($('#' + coverPlayBtnID).length == 0) {
        $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
        var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
        $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
          e.preventDefault();
          myPlayer.play();
          $('#' + coverPlayBtnID).hide();
        });

        //Prevent some devices from automatically playing video and trigger with buttons
        if (!dataAuto || browser.isAndroid) {
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
        }
      }

      /* ---------  HTML5 video autoplay on mobile revisited  */
      if (windowWidth <= 768) {
        $this.find('.video-js').attr({
          'playsinline': 'true'
        });
      }
      var myPlayer = videojs(curVideoID, {
        width: dataW,
        height: dataH,
        loop: dataLoop,
        autoplay: dataAuto
      }, function onPlayerReady() {
        var initVideo = function initVideo(obj) {
          //Get Video Dimensions
          var curW = obj.videoWidth(),
            curH = obj.videoHeight(),
            newW = curW,
            newH = curH;
          newW = videoWrapperW;

          //Scaled/Proportional Content 
          newH = curH * (newW / curW);
          if (!isNaN(newW) && !isNaN(newH)) {
            obj.height(newH);
            obj.width(newW);
          }

          //Show this video wrapper
          $this.css('visibility', 'visible');

          //Hide loading effect
          $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
        };
        initVideo(this);

        /* ---------  Video initialize */
        this.on('loadedmetadata', function () {
          initVideo(this);
        });

        /* ---------  Set, tell the player it's in fullscreen  */
        if (dataAuto) {
          this.muted(true); //Fix an error of Video auto play is not working in browser
          this.play();
        }

        /* ---------  Disable control bar play button click */
        if (!dataControls) {
          this.controls(false);
        }

        /* ---------  Determine if the video is auto played from mobile devices  */
        var autoPlayOK = false;
        this.on('timeupdate', function () {
          var duration = this.duration();
          if (duration > 0) {
            autoPlayOK = true;
            if (this.currentTime() > 0) {
              autoPlayOK = true;
              this.off('timeupdate');

              //Hide cover and play buttons when the video automatically played
              $('#' + coverPlayBtnID).hide();
            }
          }
        });
      });
    });

    /* 
     ---------------------------
     Video Popup Interaction
     ---------------------------
     */
    var modalDialogTrigger = '[data-video-win]';

    //Add video container
    $(modalDialogTrigger).each(function () {
      var $this = $(this);
      var videoSrcIfm = '',
        videoSrcMp4 = $this.data('video-mp4'),
        videoSrcWebm = $this.data('video-webm'),
        videoSrcOgv = $this.data('video-ogv'),
        videoPoster = $this.data('video-poster'),
        videoContainerMid = $this.data('modal-id'),
        videoContainerVid = videoContainerMid + '--videopush';
      if ((0,esm_typeof/* default */.Z)(videoSrcMp4) === ( true ? "undefined" : 0)) {
        videoSrcMp4 = '';
      }
      if ((0,esm_typeof/* default */.Z)(videoSrcWebm) === ( true ? "undefined" : 0)) {
        videoSrcWebm = '';
      }
      if ((0,esm_typeof/* default */.Z)(videoSrcOgv) === ( true ? "undefined" : 0)) {
        videoSrcOgv = '';
      }
      if ($this.find('[data-video-iframe]').length > 0) {
        videoSrcIfm = $this.find('[data-video-iframe]').html();
      }

      //Add modal dialog
      if ($('#' + videoContainerMid).length == 0) {
        var v = '',
          vmp4 = '',
          vwebm = '',
          vogv = '';
        if (videoSrcMp4 != '') {
          vmp4 = '<source src="' + videoSrcMp4 + '" type="video/mp4">';
        }
        if (videoSrcWebm != '') {
          vwebm = '<source src="' + videoSrcWebm + '" type="video/webm">';
        }
        if (videoSrcOgv != '') {
          vogv = '<source src="' + videoSrcOgv + '" type="video/ogv">';
        }
        v += '<div class="uix-modal-box is-fullscreen is-video" role="dialog" tabindex="-1" aria-hidden="true" id="' + videoContainerMid + '">';
        v += '<button type="button" class="uix-modal-box__close" data-modal-close-trigger="true"></button>';
        v += '<div class="uix-modal-box__content" role="document">';
        v += '<div class="uix-modal-box__video-waiting"></div><div class="uix-modal-box__video-container" data-video-player-init="0">';
        if ($this.find('[data-video-iframe]').length > 0 && videoSrcIfm != '') {
          //If iframe
          v += '<div id="' + videoContainerVid + '" class="ratio ratio-16x9">';
          v += videoSrcIfm;
          v += '</div>';
        } else {
          //If local video
          v += '<video id="' + videoContainerVid + '" class="video-js vjs-default-skin" controls poster="' + videoPoster + '">';
          v += vmp4 + vwebm + vogv;
          v += '</video>';
        }
        v += '</div>';
        v += '</div>';
        v += '</div>';

        //Wait until previous .append() is complete
        $(v).appendTo('body');
      }
    });

    //Check out: http://docs.videojs.com/tutorial-player-workflows.html
    $(document).off('click.VIDEOS').on('click.VIDEOS', modalDialogTrigger, function () {
      var vid = $(this).data('modal-id') + '--videopush',
        newMaxW = windowWidth - 80,
        newMaxH = windowHeight - 80,
        $vContainer = $('#' + vid).closest('.uix-modal-box__video-container'),
        $vLoader = $vContainer.prev('.uix-modal-box__video-waiting'),
        myPlayerInit = $vContainer.data('video-player-init');
      var $ifm = false;

      //----- Hidden/Display the wrapper of video
      var displayVC = function displayVC() {
        TweenMax.set($vContainer, {
          alpha: 1
        });
        $vLoader.removeClass('is-active');
      };
      var hiddenVC = function hiddenVC() {
        TweenMax.set($vContainer, {
          alpha: 0
        });
        $vLoader.addClass('is-active');
      };

      //----- Embed iframe
      if ($('#' + vid).find('iframe').length > 0) {
        $ifm = $('#' + vid).find('iframe');
      } else {
        hiddenVC();
      }
      if ($ifm && (0,esm_typeof/* default */.Z)($ifm) === 'object') {
        if ($ifm.length > 0) {
          var curW = $ifm.width(),
            curH = $ifm.height(),
            newW = curW,
            newH = curH;
          if (curH > newMaxH) {
            newH = newMaxH;

            //Scaled/Proportional Content 
            newW = curW * (newH / curH);
          }
          if (newW > newMaxW) {
            newW = newMaxW;

            //Scaled/Proportional Content 
            newH = curH * (newW / curW);
          }
          $ifm.css({
            'left': (newMaxW - newW) / 2 + 'px',
            'top': (newMaxH - newH) / 2 + 'px',
            'height': newH + 'px',
            'width': newW + 'px'
          });
          if (windowWidth <= 768) {
            $ifm.css({
              'top': 0
            }).parent('.ratio').css({
              'top': (newMaxH - newH) / 2 + 'px'
            });
          }
        }
        return false;
      }

      //----- HTML5 video autoplay on mobile revisited
      if (windowWidth <= 768) {
        $('#' + vid).attr({
          'playsinline': 'true'
        });
      }

      //----- Embed local video
      var myPlayer = videojs(vid, {
        width: 1,
        height: 1,
        autoplay: true,
        loop: true
      }, function onPlayerReady() {
        var initVideo = function initVideo(obj) {
          //Get Video Dimensions
          var curW = obj.videoWidth(),
            curH = obj.videoHeight(),
            newW = curW,
            newH = curH;

          //Resise modal
          if (curH > newMaxH) {
            newH = newMaxH;

            //Scaled/Proportional Content 
            newW = curW * (newH / curH);
          }
          if (newW > newMaxW) {
            newW = newMaxW;

            //Scaled/Proportional Content 
            newH = curH * (newW / curW);
          }
          obj.height(newH);
          obj.width(newW);

          //In order to allow CSS to support video centering
          $vContainer.find(' > div.video-js').css({
            'width': newW + 'px'
          });

          //Vertically center the video area
          var mt = parseFloat(windowHeight - newH) / 2 - 50;
          $vContainer.css({
            'transform': 'translateY(' + mt + 'px)'
          });

          //Display the wrapper of video
          displayVC();
        };
        initVideo(this);

        /* ---------  Video Modal initialize */
        this.on('loadedmetadata', function () {
          initVideo(this);

          //If a player instance has already been created for this variable.
          $vContainer.data('video-player-init', 1);
        });

        /* ---------  Set, tell the player it's in fullscreen  */
        //this.exitFullscreen();
        //this.requestFullscreen();
        this.play();

        /* ---------  Disable control bar play button click */
        //this.controls( false );

        /* ---------  Display video playback progress  */
        this.on('timeupdate', function () {
          var duration = this.duration(),
            progressAmount = '0%';
          if (duration > 0) {
            progressAmount = this.currentTime() / duration * 100 + "%";
          }

          //console.log( progressAmount );
        });

        /* ---------  Callback for when a video has ended */
        this.on('ended', function () {
          //console.log( 'video is done!' );
        });
      });

      /* ---------  Display the wrapper of video  */
      if (myPlayerInit === 1) {
        displayVC();
      }

      /* ---------  Close the modal  */
      $(document).off('click.VIDEOS_CLOSE').on('click.VIDEOS_CLOSE', '.uix-modal-box [data-modal-close-trigger], .uix-modal-mask:not(.js-uix-disabled)', function () {
        myPlayer.ready(function () {
          this.pause();
        });
      });
    });
  };
  module.components.documentReady.push(module.VIDEOS.documentReady);
  return /*#__PURE__*/_createClass(function VIDEOS() {
    _classCallCheck(this, VIDEOS);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_main/js/index.js


/* 
 *************************************
 * <!-- Theme Scripts  -->
 *************************************
 */



var MAIN = function (module, $, window, document) {
  if (window.MAIN === null) return false;
  module.MAIN = module.MAIN || {};
  module.MAIN.version = '0.0.1';
  module.MAIN.documentReady = function ($) {

    /* 
     ---------------------------
     Function Here
     ---------------------------
     */
    //your code here...
  };
  module.MAIN.pageLoaded = function () {

    /* 
     ---------------------------
     Function Here
     ---------------------------
     */
    //your code here...
  };
  module.components.documentReady.push(module.MAIN.documentReady);
  module.components.pageLoaded.push(module.MAIN.pageLoaded);
  return /*#__PURE__*/_createClass(function MAIN() {
    _classCallCheck(this, MAIN);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/accordion-img/js/index.js



/* 
 *************************************
 * <!-- Accordion Background Images -->
 *************************************
 */


var ACCORDION_BG = function (module, $, window, document) {
  if (window.ACCORDION_BG === null) return false;
  module.ACCORDION_BG = module.ACCORDION_BG || {};
  module.ACCORDION_BG.version = '0.0.7';
  module.ACCORDION_BG.documentReady = function ($) {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    if (windowWidth <= 768) return false;
    $('.uix-accordion-img').each(function () {
      var $this = $(this);
      var aEvent = $this.data('event'),
        outReset = $this.data('out-reset'),
        activeIndex = $this.data('actived-item'),
        offsetVal = $this.data('offset'),
        dir = $this.data('direction'),
        closeBtn = $this.data('close-btn'),
        $li = $this.find('> ul').children('li'),
        total = $li.length;
      if ((0,esm_typeof/* default */.Z)(activeIndex) === ( true ? "undefined" : 0)) {
        activeIndex = false;
      }
      if ((0,esm_typeof/* default */.Z)(aEvent) === ( true ? "undefined" : 0)) {
        aEvent = 'click';
      }
      if ((0,esm_typeof/* default */.Z)(outReset) === ( true ? "undefined" : 0)) {
        outReset = true;
      }
      if ((0,esm_typeof/* default */.Z)(offsetVal) === ( true ? "undefined" : 0)) {
        offsetVal = '60%';
      }

      //Initialize the width or height of each item
      itemInit();
      $li.on(aEvent, function (e) {
        //Prevents further propagation of the current event in the capturing and bubbling phases.
        e.stopPropagation();

        //Apply click method to outer div but not inner div
        if (e.target.className == 'uix-accordion-img__content__info' || e.target.className == 'uix-accordion-img__content') {
          if ($(this).hasClass('is-active')) {
            $(this).addClass('is-active');
          } else {
            $li.addClass('active-sub');
            $(this).addClass('is-active');
            $(this).siblings().removeClass('is-active');
            if (dir == 'verticle') {
              $li.css('height', (100 - parseFloat(offsetVal)) / (total - 1) + '%');
              $(this).css('height', offsetVal);
            } else {
              $li.css('width', (100 - parseFloat(offsetVal)) / (total - 1) + '%');
              $(this).css('width', offsetVal);
            }
          }
        }
      });
      if (outReset) {
        $this.on('mouseleave', function (e) {
          itemInit();
        });
      }
      if ((0,esm_typeof/* default */.Z)(closeBtn) != ( true ? "undefined" : 0) && closeBtn != false && closeBtn != '') {
        $(closeBtn).off('click').on('click', function (e) {
          e.preventDefault();
          itemInit();
        });
      }

      /*
       * Active the target item
       *
          * @param  {Number} index     - The index value of the item to be activated.
       * @return {Void}
       */
      function itemActiveItem(index) {
        if (index >= 0) {
          if (dir == 'verticle') {
            $li.css('height', (100 - parseFloat(offsetVal)) / (total - 1) + '%');
            $li.eq(index).css('height', offsetVal).addClass('is-active');
          } else {
            $li.css('width', (100 - parseFloat(offsetVal)) / (total - 1) + '%');
            $li.eq(index).css('width', offsetVal).addClass('is-active');
          }
        }
      }
      itemActiveItem(parseFloat(activeIndex));

      /*
       * Initialize the width or height of each item
       *
       * @return {Void}
       */
      function itemInit() {
        if (dir == 'verticle') {
          $li.removeClass('is-active active-sub').css('height', 100 / total + '%');
        } else {
          $li.removeClass('is-active active-sub').css('width', 100 / total + '%');
        }
      }
    });
  };
  module.components.documentReady.push(module.ACCORDION_BG.documentReady);
  return /*#__PURE__*/_createClass(function ACCORDION_BG() {
    _classCallCheck(this, ACCORDION_BG);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/accordion/js/index.js



/* 
 *************************************
 * <!-- Accordion -->
 *************************************
 */


var ACCORDION = function (module, $, window, document) {
  if (window.ACCORDION === null) return false;
  module.ACCORDION = module.ACCORDION || {};
  module.ACCORDION.version = '0.0.3';
  module.ACCORDION.documentReady = function ($) {
    $('.uix-accordion').each(function () {
      var $this = $(this);
      var $li = $this.children('dl'),
        $titlebox = $this.find('dt');
      var aEvent = $this.data('event'),
        firstShow = $this.data('first-show');
      var openItem = function openItem(obj) {
        //to open
        // - temporarilty set height:auto
        // - tween from height:0
        TweenMax.set(obj, {
          height: 'auto'
        });
        TweenMax.from(obj, 0.5, {
          height: 0
        });
      };
      if ((0,esm_typeof/* default */.Z)(aEvent) === ( true ? "undefined" : 0)) {
        aEvent = 'click';
      }
      if ((0,esm_typeof/* default */.Z)(firstShow) === ( true ? "undefined" : 0)) {
        firstShow = false;
      }
      if (firstShow) {
        $li.first().addClass('is-active').attr('aria-expanded', true);
        openItem($li.first().find('dd'));
      }
      $li.off(aEvent).on(aEvent, function (e) {
        //Prevents further propagation of the current event in the capturing and bubbling phases.
        e.stopPropagation();

        //Its value is not a boolean but a string
        var expanded = $(this).attr('aria-expanded') == 'true' ? false : true,
          $content = $(this).find('dd');
        if (expanded) {
          //Hide other all sibling <dt> of the selected element
          var $e = $(this).siblings();
          $e.removeClass('is-active').attr('aria-expanded', false);
          $(this).addClass('is-active').attr('aria-expanded', true);
          TweenMax.to($e.find('dd'), 0.5, {
            height: 0
          });

          //to open
          openItem($content);
        } else {
          if (e.type == 'click') {
            $(this).removeClass('is-active').attr('aria-expanded', false);

            //to close
            TweenMax.to($content, 0.5, {
              height: 0
            });
          }
        }
      });
    });
  };
  module.components.documentReady.push(module.ACCORDION.documentReady);
  return /*#__PURE__*/_createClass(function ACCORDION() {
    _classCallCheck(this, ACCORDION);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/advanced-slider/js/basic.js



/* 
 *************************************
 * <!-- Advanced Slider (Basic) -->
 *************************************
 */


var ADVANCED_SLIDER = function (module, $, window, document) {
  if (window.ADVANCED_SLIDER === null) return false;
  module.ADVANCED_SLIDER = module.ADVANCED_SLIDER || {};
  module.ADVANCED_SLIDER.version = '0.2.7';
  module.ADVANCED_SLIDER.pageLoaded = function () {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    var animDelay = 0;
    var $sliderWrapper = $('.uix-advanced-slider');
    sliderInit(false);
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        sliderInit(true);
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);

    /*
     * Initialize slideshow
     *
     * @param  {Boolean} resize            - Determine whether the window size changes.
     * @return {Void}
     */
    function sliderInit(resize) {
      $sliderWrapper.each(function () {
        var $this = $(this);
        var $items = $this.find('.uix-advanced-slider__item'),
          $first = $items.first(),
          activated = $this.data('activated');
        var nativeItemW, nativeItemH;
        if ((0,esm_typeof/* default */.Z)(activated) === ( true ? "undefined" : 0) || activated === 0) {
          //Get parameter configuration from the data-* attribute of HTML
          var dataControlsPagination = $this.data('controls-pagination'),
            dataControlsArrows = $this.data('controls-arrows'),
            dataDraggable = $this.data('draggable'),
            dataDraggableCursor = $this.data('draggable-cursor'),
            dataCountTotal = $this.data('count-total'),
            dataCountCur = $this.data('count-now');
          if ((0,esm_typeof/* default */.Z)(dataControlsPagination) === ( true ? "undefined" : 0)) dataControlsPagination = '.uix-advanced-slider__pagination';
          if ((0,esm_typeof/* default */.Z)(dataControlsArrows) === ( true ? "undefined" : 0) || dataControlsArrows == false) dataControlsArrows = '.uix-advanced-slider__arrows';
          if ((0,esm_typeof/* default */.Z)(dataDraggable) === ( true ? "undefined" : 0)) dataDraggable = false;
          if ((0,esm_typeof/* default */.Z)(dataDraggableCursor) === ( true ? "undefined" : 0) || dataDraggableCursor == false) dataDraggableCursor = 'move';
          if ((0,esm_typeof/* default */.Z)(dataCountTotal) === ( true ? "undefined" : 0)) dataCountTotal = 'p.count em.count';
          if ((0,esm_typeof/* default */.Z)(dataCountCur) === ( true ? "undefined" : 0)) dataCountCur = 'p.count em.current';

          //Autoplay parameters
          var dataAuto = $this.data('auto'),
            dataTiming = $this.data('timing'),
            dataLoop = $this.data('loop');
          if ((0,esm_typeof/* default */.Z)(dataAuto) === ( true ? "undefined" : 0)) dataAuto = false;
          if ((0,esm_typeof/* default */.Z)(dataTiming) === ( true ? "undefined" : 0)) dataTiming = 10000;
          if ((0,esm_typeof/* default */.Z)(dataLoop) === ( true ? "undefined" : 0)) dataLoop = false;

          //Autoplay times
          var playTimes;
          //A function called "timer" once every second (like a digital watch).
          $this[0].animatedSlides;

          //Get the duration of the animation from CSS/SCSS
          //-------------------------------------	
          animDelay = UixCssProperty.getTransitionDuration($first[0]);

          //Initialize the properties of each Item
          //-------------------------------------	
          $items.each(function (index) {
            var _item = $(this);
            _item.delay(animDelay * index).queue('fx', function () {
              $(this).addClass('is-loaded').dequeue();
            });
          });

          //Initialize the first item container
          //-------------------------------------		
          $items.addClass('next');
          setTimeout(function () {
            $first.addClass('is-active');
          }, animDelay);
          if ($first.find('video').length > 0) {
            //Returns the dimensions (intrinsic height and width ) of the video
            var video = document.getElementById($first.find('video').attr('id'));
            var videoURL = $first.find('source:first').attr('src');
            if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $first.attr('src');
            video.addEventListener('loadedmetadata', function (e) {
              $this.css('height', this.videoHeight * ($this.width() / this.videoWidth) + 'px');
              nativeItemW = this.videoWidth;
              nativeItemH = this.videoHeight;

              //Initialize all the items to the stage
              addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur);
            }, false);
            video.src = videoURL;
          } else {
            var imgURL = $first.find('img').attr('src');
            if ((0,esm_typeof/* default */.Z)(imgURL) != ( true ? "undefined" : 0)) {
              var img = new Image();
              img.onload = function () {
                $this.css('height', $this.width() * (this.height / this.width) + 'px');
                nativeItemW = this.width;
                nativeItemH = this.height;

                //Initialize all the items to the stage
                addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur);
              };
              img.src = imgURL;
            }
          }

          //Autoplay Slider
          //-------------------------------------		
          if (!resize) {
            if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
              sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              var autoplayEnter = function autoplayEnter() {
                clearInterval($this[0].animatedSlides);
              };
              var autoplayLeave = function autoplayLeave() {
                sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              };

              // Do not use the `off()` method, otherwise it will cause the second mouseenter to be invalid
              $this.on('mouseenter', autoplayEnter);
              $this.on('mouseleave', autoplayLeave);

              // To determine if it is a touch screen.
              if (Modernizr.touchevents) {
                $this.on('pointerenter', autoplayEnter);
                $this.on('pointerleave', autoplayLeave);
              }
            }
          }

          //Prevents front-end javascripts that are activated with AJAX to repeat loading.
          $this.data('activated', 1);
        } //endif activated
      });
    }

    /*
    * Trigger slider autoplay
    *
    * @param  {Function} playTimes            - Number of times.
    * @param  {Number} timing                 - Autoplay interval.
    * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
    * @param  {Element} slider                 - Selector of the slider .
     * @param  {String} countTotalID           - Total number ID or class of counter.
     * @param  {String} countCurID             - Current number ID or class of counter.
     * @param  {String} paginationID           - Navigation ID for paging control of each slide.
     * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
    * @return {Void}                          - The constructor.
    */
    function sliderAutoPlay(playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID) {
      var items = slider.find('.uix-advanced-slider__item'),
        total = items.length;
      slider[0].animatedSlides = setInterval(function () {
        playTimes = parseFloat(items.filter('.is-active').index());
        playTimes++;
        if (!loop) {
          if (playTimes < total && playTimes >= 0) sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
        } else {
          if (playTimes == total) playTimes = 0;
          if (playTimes < 0) playTimes = total - 1;
          sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
        }
      }, timing);
    }

    /*
    * Initialize all the items to the stage
    *
    * @param  {Element} slider                 - Current selector of each slider.
    * @param  {Number} nativeItemW            - Returns the intrinsic width of the image/video.
    * @param  {Number} nativeItemH            - Returns the intrinsic height of the image/video.
     * @param  {String} paginationID           - Navigation ID for paging control of each slide.
     * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
     * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop. 
     * @param  {Boolean} draggable             - Allow drag and drop on the slider.
     * @param  {String} draggableCursor        - Drag & Drop Change icon/cursor while dragging.
     * @param  {String} countTotalID           - Total number ID or class of counter.
     * @param  {String} countCurID             - Current number ID or class of counter.
    * @return {Void}
    */
    function addItemsToStage(slider, nativeItemW, nativeItemH, paginationID, arrowsID, loop, draggable, draggableCursor, countTotalID, countCurID) {
      var $this = slider,
        $items = $this.find('.uix-advanced-slider__item'),
        $first = $items.first(),
        itemsTotal = $items.length;

      //If arrows does not exist on the page, it will be added by default, 
      //and the drag and drop function will be activated.
      if ($(arrowsID).length == 0) {
        $('body').prepend('<div style="display:none;" class="uix-advanced-slider__arrows ' + arrowsID.replace('#', '').replace('.', '') + '"><a href="#" class="uix-advanced-slider__arrows--prev"></a><a href="#" class="uix-advanced-slider__arrows--next"></a></div>');
      }

      //Add identifiers for the first and last items
      $items.last().addClass('last');
      $items.first().addClass('first');

      //Prevent bubbling
      if (itemsTotal == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
      }

      // Fires local videos asynchronously with slider switch.
      //-------------------------------------
      normalSliderVideoInit($items, false);

      //Pagination dots 
      //-------------------------------------	
      var _dot = '',
        _dotActive = '';
      _dot += '<ul>';
      for (var i = 0; i < itemsTotal; i++) {
        _dotActive = i == 0 ? 'class="is-active"' : '';
        _dot += '<li><a ' + _dotActive + ' data-index="' + i + '" href="javascript:"></a></li>';
      }
      _dot += '</ul>';
      if ($(paginationID).html() == '') $(paginationID).html(_dot);
      $(paginationID).find('li a').off('click').on('click', function (e) {
        e.preventDefault();

        //Prevent buttons' events from firing multiple times
        var $btn = $(this);
        if ($btn.attr('aria-disabled') == 'true') return false;
        $(paginationID).find('li a').attr('aria-disabled', 'true');
        $(paginationID).find('li a').delay(animDelay).queue(function (next) {
          $(paginationID).find('li a').attr('aria-disabled', 'false');
          next();
        });

        //
        if (!$(this).hasClass('is-active')) {
          //Determine the direction
          var curDir = 'prev';
          if ($(this).attr('data-index') > parseFloat($items.filter('.is-active').index())) {
            curDir = 'next';
          }
          sliderUpdates($(this).attr('data-index'), $this, curDir, countTotalID, countCurID, paginationID, arrowsID, loop);

          //Pause the auto play event
          clearInterval($this[0].animatedSlides);
        }
      });

      //Next/Prev buttons
      //-------------------------------------		
      var _prev = $(arrowsID).find('.uix-advanced-slider__arrows--prev'),
        _next = $(arrowsID).find('.uix-advanced-slider__arrows--next');
      $(arrowsID).find('a').attr('href', 'javascript:');
      $(arrowsID).find('a').removeClass('is-disabled');
      if (!loop) {
        _prev.addClass('is-disabled');
      }
      _prev.off('click').on('click', function (e) {
        e.preventDefault();

        //Pause the auto play event
        clearInterval($this[0].animatedSlides);

        //Move animation
        prevMove();
      });
      _next.off('click').on('click', function (e) {
        e.preventDefault();

        //Pause the auto play event
        clearInterval($this[0].animatedSlides);

        //Move animation
        nextMove();
      });
      function prevMove() {
        //Prevent buttons' events from firing multiple times
        if (_prev.attr('aria-disabled') == 'true') return false;
        _prev.attr('aria-disabled', 'true');
        _prev.delay(animDelay).queue(function (next) {
          _prev.attr('aria-disabled', 'false');
          next();
        });

        //
        if (_prev.hasClass('is-disabled')) return false;

        //
        sliderUpdates(parseFloat($items.filter('.is-active').index()) - 1, $this, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop);
      }
      function nextMove() {
        //Prevent buttons' events from firing multiple times
        if (_next.attr('aria-disabled') == 'true') return false;
        _next.attr('aria-disabled', 'true');
        _next.delay(animDelay).queue(function (next) {
          _next.attr('aria-disabled', 'false');
          next();
        });

        //
        if (_next.hasClass('is-disabled')) return false;

        //
        sliderUpdates(parseFloat($items.filter('.is-active').index()) + 1, $this, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
      }

      //Added touch method to mobile device and desktop
      //-------------------------------------	
      var $dragTrigger = $this.find('.uix-advanced-slider__inner');
      var mouseX, mouseY;
      var isMoving = false;

      //Avoid images causing mouseup to fail
      $dragTrigger.find('img').css({
        'pointer-events': 'none',
        'user-select': 'none'
      });

      //Make the cursor a move icon when a user hovers over an item
      if (draggable && draggableCursor != '' && draggableCursor != false) $dragTrigger.css('cursor', draggableCursor);

      //draggable for touch devices
      if (Modernizr.touchevents) draggable = true;
      if (draggable) {
        $dragTrigger[0].removeEventListener('mousedown', dragStart);
        document.removeEventListener('mouseup', dragEnd);
        $dragTrigger[0].removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);

        //
        $dragTrigger[0].addEventListener('mousedown', dragStart);
        $dragTrigger[0].addEventListener('touchstart', dragStart);
      }
      function dragStart(e) {
        //Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android
        var touches = e.touches;
        if (touches && touches.length) {
          mouseX = touches[0].clientX;
          mouseY = touches[0].clientY;
        } else {
          mouseX = e.clientX;
          mouseY = e.clientY;
        }
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', dragProcess);
        document.addEventListener('touchend', dragEnd);
        document.addEventListener('touchmove', dragProcess);
      }
      function dragProcess(e) {
        var touches = e.touches;
        var offsetX, offsetY;
        if (touches && touches.length) {
          offsetX = mouseX - touches[0].clientX, offsetY = mouseY - touches[0].clientY;
        } else {
          offsetX = mouseX - e.clientX, offsetY = mouseY - e.clientY;
        }

        //--- left
        if (offsetX >= 50) {
          if (!isMoving) {
            isMoving = true;
            nextMove();
          }
        }

        //--- right
        if (offsetX <= -50) {
          if (!isMoving) {
            isMoving = true;
            prevMove();
          }
        }

        //--- up
        if (offsetY >= 50) {}

        //--- down
        if (offsetY <= -50) {}
      }
      function dragEnd(e) {
        document.removeEventListener('mousemove', dragProcess);
        document.removeEventListener('touchmove', dragProcess);

        //restore move action status
        setTimeout(function () {
          isMoving = false;
        }, animDelay);
      }
    }

    /*
     * Transition Between Slides
     *
     * @param  {Number} elementIndex           - Index of current slider.
     * @param  {Element} slider                 - Selector of the slider .
     * @param  {String} dir                    - Switching direction indicator.
           * @param  {String} countTotalID           - Total number ID or class of counter.
           * @param  {String} countCurID             - Current number ID or class of counter.
           * @param  {String} paginationID           - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
           * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
     * @return {Void}
     */
    function sliderUpdates(elementIndex, slider, dir, countTotalID, countCurID, paginationID, arrowsID, loop) {
      var $items = slider.find('.uix-advanced-slider__item'),
        total = $items.length;

      //Prevent bubbling
      if (total == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
        return false;
      }

      //Transition Interception
      //-------------------------------------
      if (loop) {
        if (elementIndex == total) elementIndex = 0;
        if (elementIndex < 0) elementIndex = total - 1;
      } else {
        $(arrowsID).find('a').removeClass('is-disabled');
        if (elementIndex == total - 1) $(arrowsID).find('.uix-advanced-slider__arrows--next').addClass('is-disabled');
        if (elementIndex == 0) $(arrowsID).find('.uix-advanced-slider__arrows--prev').addClass('is-disabled');
      }

      // To determine if it is a touch screen.
      if (Modernizr.touchevents) {
        if (elementIndex == total) elementIndex = total - 1;
        if (elementIndex < 0) elementIndex = 0;

        //Prevent bubbling
        if (!loop) {
          //first item
          if (elementIndex == 0) {
            $(arrowsID).find('.uix-advanced-slider__arrows--prev').addClass('is-disabled');
          }

          //last item
          if (elementIndex == total - 1) {
            $(arrowsID).find('.uix-advanced-slider__arrows--next').addClass('is-disabled');
          }
        }
      }

      // call the current item
      //-------------------------------------
      var $current = $items.eq(elementIndex);

      //Determine the direction and add class to switching direction indicator.
      var dirIndicatorClass = '';
      if (dir == 'prev') dirIndicatorClass = 'prev';
      if (dir == 'next') dirIndicatorClass = 'next';

      //Add transition class to Controls Pagination
      $(paginationID).find('li a').removeClass('leave');
      $(paginationID).find('li a.is-active').removeClass('is-active').addClass('leave');
      $(paginationID).find('li a[data-index="' + elementIndex + '"]').addClass('is-active').removeClass('leave');

      //Add transition class to each item
      $items.removeClass('leave prev next');
      $items.addClass(dirIndicatorClass);
      slider.find('.uix-advanced-slider__item.is-active').removeClass('is-active').addClass('leave ' + dirIndicatorClass);
      $current.addClass('is-active ' + dirIndicatorClass).removeClass('leave');

      //Display counter
      //-------------------------------------
      $(countTotalID).text(total);
      $(countCurID).text(parseFloat(elementIndex) + 1);

      // Fires local videos asynchronously with slider switch.
      //-------------------------------------
      normalSliderVideoInit($items, false);
      normalSliderVideoInit($current, true);

      //Reset the default height of item
      //-------------------------------------	
      itemDefaultInit(slider, $current);
    }

    /*
     * Initialize the default height of item
     *
           * @param  {Element} slider                 - Selector of the slider .
     * @param  {Element} currentLlement         - Current selector of each slider.
     * @return {Void}
     */
    function itemDefaultInit(slider, currentLlement) {
      if (currentLlement.find('video').length > 0) {
        //Returns the dimensions (intrinsic height and width ) of the video
        var video = document.getElementById(currentLlement.find('video').attr('id'));
        var videoURL = currentLlement.find('source:first').attr('src');
        if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = currentLlement.attr('src');
        video.addEventListener('loadedmetadata', function (e) {
          slider.css('height', this.videoHeight * (currentLlement.closest('.uix-advanced-slider__outline').width() / this.videoWidth) + 'px');
        }, false);
        video.src = videoURL;
      } else {
        var imgURL = currentLlement.find('img').attr('src');
        if ((0,esm_typeof/* default */.Z)(imgURL) != ( true ? "undefined" : 0)) {
          var img = new Image();
          img.onload = function () {
            slider.css('height', currentLlement.closest('.uix-advanced-slider__outline').width() * (this.height / this.width) + 'px');
          };
          img.src = imgURL;
        }
      }
    }

    /*
     * Initialize embedded local video.
     *
     * @param  {Element} wrapper          - The outermost video container, which can contain multiple videos
     * @param  {Boolean} play            - Forced to trigger pause or play events.
     * @return {Void}
     */
    function normalSliderVideoInit(wrapper, play) {
      wrapper.find('.uix-video__slider').each(function () {
        var $this = $(this);
        var videoWrapperW = $this.closest('.uix-advanced-slider__outline').width(),
          curVideoID = $this.find('video').attr('id') + '-slider-videopush',
          coverPlayBtnID = 'videocover-' + curVideoID,
          $replayBtn = $('#' + curVideoID + '-replay-btn');
        var dataControls = $this.data('embed-video-controls'),
          dataAuto = $this.data('embed-video-autoplay'),
          dataLoop = $this.data('embed-video-loop'),
          dataW = $this.data('embed-video-width'),
          dataH = $this.data('embed-video-height');

        //Push a new ID to video
        //Solve the problem that ajax asynchronous loading does not play
        $this.find('.video-js').attr('id', curVideoID);
        if ((0,esm_typeof/* default */.Z)(dataAuto) === ( true ? "undefined" : 0)) {
          dataAuto = true;
        }
        if ((0,esm_typeof/* default */.Z)(dataLoop) === ( true ? "undefined" : 0)) {
          dataLoop = true;
        }
        if ((0,esm_typeof/* default */.Z)(dataControls) === ( true ? "undefined" : 0)) {
          dataControls = false;
        }
        if ((0,esm_typeof/* default */.Z)(dataW) === ( true ? "undefined" : 0) || dataW == 'auto') {
          dataW = videoWrapperW;
        }
        if ((0,esm_typeof/* default */.Z)(dataH) === ( true ? "undefined" : 0) || dataH == 'auto') {
          dataH = videoWrapperW / 1.77777777777778;
        }

        //Display cover and play buttons when some mobile device browsers cannot automatically play video
        if ($('#' + coverPlayBtnID).length == 0) {
          $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
          var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
            e.preventDefault();
            myPlayer.play();
            $('#' + coverPlayBtnID).hide();
          });
        }

        //Add replay button to video 
        if ($replayBtn.length == 0) {
          $this.after('<span class="uix-video__btn-play" id="' + curVideoID + '-replay-btn"></span>');
        }

        //HTML5 video autoplay on mobile revisited
        if (dataAuto && windowWidth <= 768) {
          $this.find('.video-js').attr({
            'autoplay': 'true',
            'muted': 'true',
            'playsinline': 'true'
          });
        }
        var myPlayer = videojs(curVideoID, {
          width: dataW,
          height: dataH,
          loop: dataLoop,
          autoplay: dataAuto
        }, function onPlayerReady() {
          var initVideo = function initVideo(obj) {
            //Get Video Dimensions
            var curW = obj.videoWidth(),
              curH = obj.videoHeight(),
              newW = curW,
              newH = curH;
            newW = videoWrapperW;

            //Scaled/Proportional Content 
            newH = curH * (newW / curW);
            if (!isNaN(newW) && !isNaN(newH)) {
              obj.height(newH);
              obj.width(newW);
              $this.css('height', newH);
            }

            //Show this video wrapper
            $this.css('visibility', 'visible');

            //Hide loading effect
            $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
          };

          /* ---------  Video initialize */
          this.on('loadedmetadata', function () {
            initVideo(this);
          });

          /* ---------  Display the play button  */
          if (!dataAuto) $this.find('.vjs-big-play-button').show();
          $this.find('.vjs-big-play-button').off('click').on('click', function () {
            $(this).hide();
          });

          /* ---------  Set, tell the player it's in fullscreen  */
          if (dataAuto) {
            //Fix an error of Video auto play is not working in browser
            this.muted(true);

            //Prevent autoplay error: Uncaught (in promise) DOMException
            var promise = this.play();
            if (promise !== undefined) {
              promise.then(function () {
                // Autoplay started!
              })["catch"](function (error) {
                // Autoplay was prevented.
                $('#' + coverPlayBtnID).show();
                $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                console.log('Autoplay was prevented.');
              });
            }
          }

          /* ---------  Disable control bar play button click */
          if (!dataControls) {
            this.controls(false);
          }

          /* ---------  Determine if the video is auto played from mobile devices  */
          var autoPlayOK = false;
          this.on('timeupdate', function () {
            var duration = this.duration();
            if (duration > 0) {
              autoPlayOK = true;
              if (this.currentTime() > 0) {
                autoPlayOK = true;
                this.off('timeupdate');

                //Hide cover and play buttons when the video automatically played
                $('#' + coverPlayBtnID).hide();
              }
            }
          });

          /* ---------  Pause the video when it is not current slider  */
          if (!play) {
            this.pause();
            this.currentTime(0);
          } else {
            //Unmute, because there is interaction, you can turn on the audio.
            this.muted(false);
            if (dataAuto) {
              this.currentTime(0);

              //Prevent autoplay error: Uncaught (in promise) DOMException
              var _promise = this.play();
              if (_promise !== undefined) {
                _promise.then(function () {
                  // Autoplay started!
                })["catch"](function (error) {
                  // Autoplay was prevented.
                  $('#' + coverPlayBtnID).show();
                  $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                  console.log('Autoplay was prevented.');
                });
              }

              //Hidden replay button
              $replayBtn.hide();

              //Should the video go to the beginning when it ends
              this.on('ended', function () {
                if (dataLoop) {
                  this.currentTime(0);
                  this.play();
                } else {
                  //Replay this video
                  this.currentTime(0);
                  $replayBtn.show().off('click').on('click', function (e) {
                    e.preventDefault();
                    this.play();
                    $replayBtn.hide();
                  });
                }
              });
            }
          }
        });
      });
    }
  };
  module.components.pageLoaded.push(module.ADVANCED_SLIDER.pageLoaded);
  return /*#__PURE__*/_createClass(function ADVANCED_SLIDER() {
    _classCallCheck(this, ADVANCED_SLIDER);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/_third-party-plugins/GSAP/esm/TweenLite.js
var esm_TweenLite = __webpack_require__(696);
;// CONCATENATED MODULE: ./src/components/_third-party-plugins/GSAP/esm/PixiPlugin.js
/*!
 * VERSION: 0.3.0
 * DATE: 2019-05-13
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * PixiPlugin is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */


var _numExp = /(\d|\.)+/g,
  _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
  _colorLookup = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    fuchsia: [255, 0, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
  },
  _hue = function _hue(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255 + 0.5 | 0;
  },
  /**
   * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if "format" parameter is "hsl", it will populate the array with hue, saturation, and lightness values. Or if "format" is "number", it'll return a number like 0xFF0000 instead of an array. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
   * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
   * @param {(string)} format If "hsl", an hsl() or hsla() value will be returned instead of rgb() or rgba(). Or if "number", then a numeric value will be returned, like 0xFF0000. Default is rgb.
   * @return {(array|number)} An array containing red, green, and blue (and optionally alpha) in that order, or if the format parameter was "hsl", the array will contain hue, saturation and lightness (and optionally alpha) in that order. Or if "format" is defined as "number", it'll return a number like 0xFF0000. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and "format" is "hsl".
   */
  _parseColor = function _parseColor(v, format) {
    var toHSL = format === "hsl",
      a,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;
    if (!v) {
      a = _colorLookup.black;
    } else if (typeof v === "number") {
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else {
      if (v.charAt(v.length - 1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }
      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length === 4) {
          //for shorthand like #9F0
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b;
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & 255, v & 255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_numExp);
        if (!toHSL) {
          h = Number(a[0]) % 360 / 360;
          s = Number(a[1]) / 100;
          l = Number(a[2]) / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          if (a.length > 3) {
            a[3] = Number(v[3]);
          }
          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (v.indexOf("=") !== -1) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          return v.match(_relNumExp);
        }
      } else {
        a = v.match(_numExp) || _colorLookup.transparent;
      }
      a[0] = Number(a[0]);
      a[1] = Number(a[1]);
      a[2] = Number(a[2]);
      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
    }
    if (toHSL && !wasHSL) {
      r = a[0] / 255;
      g = a[1] / 255;
      b = a[2] / 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }
      a[0] = h + 0.5 | 0;
      a[1] = s * 100 + 0.5 | 0;
      a[2] = l * 100 + 0.5 | 0;
    }
    return format === "number" ? a[0] << 16 | a[1] << 8 | a[2] : a;
  },
  _formatColors = function _formatColors(s, toHSL) {
    var colors = (s + "").match(_colorExp) || [],
      charIndex = 0,
      parsed = "",
      i,
      color,
      temp;
    if (!colors.length) {
      return s;
    }
    for (i = 0; i < colors.length; i++) {
      color = colors[i];
      temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
      charIndex += temp.length + color.length;
      color = _parseColor(color, toHSL ? "hsl" : "rgb");
      if (color.length === 3) {
        color.push(1);
      }
      parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
    }
    return parsed + s.substr(charIndex);
  },
  _colorStringFilter,
  PixiPlugin_TweenLite = (esm_TweenLite/* _gsScope.GreenSockGlobals */.ML.GreenSockGlobals || esm_TweenLite/* _gsScope */.ML).TweenLite,
  _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
  //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

  _idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  _lumR = 0.212671,
  _lumG = 0.715160,
  _lumB = 0.072169,
  _applyMatrix = function _applyMatrix(m, m2) {
    var temp = [],
      i = 0,
      z = 0,
      y,
      x;
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 5; x++) {
        z = x === 4 ? m[i + 4] : 0;
        temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
      }
      i += 5;
    }
    return temp;
  },
  _setSaturation = function _setSaturation(m, n) {
    var inv = 1 - n,
      r = inv * _lumR,
      g = inv * _lumG,
      b = inv * _lumB;
    return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
  },
  _colorize = function _colorize(m, color, amount) {
    var c = _parseColor(color),
      r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255,
      inv = 1 - amount;
    return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
  },
  _setHue = function _setHue(m, n) {
    n *= Math.PI / 180;
    var c = Math.cos(n),
      s = Math.sin(n);
    return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
  },
  _setContrast = function _setContrast(m, n) {
    return _applyMatrix([n, 0, 0, 0, 0.5 * (1 - n), 0, n, 0, 0, 0.5 * (1 - n), 0, 0, n, 0, 0.5 * (1 - n), 0, 0, 0, 1, 0], m);
  },
  _getFilter = function _getFilter(t, type) {
    var filterClass = esm_TweenLite/* _gsScope.PIXI.filters */.ML.PIXI.filters[type],
      filters = t.filters || [],
      i = filters.length,
      filter;
    if (!filterClass) {
      throw "PixiPlugin error: " + type + " isn't present.";
    }
    while (--i > -1) {
      if (filters[i] instanceof filterClass) {
        return filters[i];
      }
    }
    filter = new filterClass();
    if (type === "BlurFilter") {
      filter.blur = 0;
    }
    filters.push(filter);
    t.filters = filters;
    return filter;
  },
  _addColorMatrixFilterCacheTween = function _addColorMatrixFilterCacheTween(p, pg, cache, vars) {
    //we cache the ColorMatrixFilter components in a _gsColorMatrixFilter object attached to the target object so that it's easy to grab the current value at any time.
    pg._addTween(cache, p, cache[p], vars[p], p);
    pg._overwriteProps.push(p);
  },
  _applyBrightnessToMatrix = function _applyBrightnessToMatrix(brightness, matrix) {
    var temp = new esm_TweenLite/* _gsScope.PIXI.filters.ColorMatrixFilter */.ML.PIXI.filters.ColorMatrixFilter();
    temp.matrix = matrix;
    temp.brightness(brightness, true);
    return temp.matrix;
  },
  _CMFdefaults = {
    contrast: 1,
    saturation: 1,
    colorizeAmount: 0,
    colorize: "rgb(255,255,255)",
    hue: 0,
    brightness: 1
  },
  _parseColorMatrixFilter = function _parseColorMatrixFilter(t, v, pg) {
    var filter = _getFilter(t, "ColorMatrixFilter"),
      cache = t._gsColorMatrixFilter = t._gsColorMatrixFilter || {
        contrast: 1,
        saturation: 1,
        colorizeAmount: 0,
        colorize: "rgb(255,255,255)",
        hue: 0,
        brightness: 1
      },
      combine = v.combineCMF && !("colorMatrixFilter" in v && !v.colorMatrixFilter),
      i,
      matrix,
      startMatrix;
    startMatrix = filter.matrix;
    if (v.resolution) {
      filter.resolution = v.resolution;
    }
    if (v.matrix && v.matrix.length === startMatrix.length) {
      matrix = v.matrix;
      if (cache.contrast !== 1) {
        _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
      }
      if (cache.hue) {
        _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
      }
      if (cache.brightness !== 1) {
        _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
      }
      if (cache.colorizeAmount) {
        _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
        _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
      }
      if (cache.saturation !== 1) {
        _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
      }
    } else {
      matrix = _idMatrix.slice();
      if (v.contrast != null) {
        matrix = _setContrast(matrix, Number(v.contrast));
        _addColorMatrixFilterCacheTween("contrast", pg, cache, v);
      } else if (cache.contrast !== 1) {
        if (combine) {
          matrix = _setContrast(matrix, cache.contrast);
        } else {
          _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
        }
      }
      if (v.hue != null) {
        matrix = _setHue(matrix, Number(v.hue));
        _addColorMatrixFilterCacheTween("hue", pg, cache, v);
      } else if (cache.hue) {
        if (combine) {
          matrix = _setHue(matrix, cache.hue);
        } else {
          _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
        }
      }
      if (v.brightness != null) {
        matrix = _applyBrightnessToMatrix(Number(v.brightness), matrix);
        _addColorMatrixFilterCacheTween("brightness", pg, cache, v);
      } else if (cache.brightness !== 1) {
        if (combine) {
          matrix = _applyBrightnessToMatrix(cache.brightness, matrix);
        } else {
          _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
        }
      }
      if (v.colorize != null) {
        v.colorizeAmount = "colorizeAmount" in v ? Number(v.colorizeAmount) : 1;
        matrix = _colorize(matrix, v.colorize, v.colorizeAmount);
        _addColorMatrixFilterCacheTween("colorize", pg, cache, v);
        _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, v);
      } else if (cache.colorizeAmount) {
        if (combine) {
          matrix = _colorize(matrix, cache.colorize, cache.colorizeAmount);
        } else {
          _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
          _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
        }
      }
      if (v.saturation != null) {
        matrix = _setSaturation(matrix, Number(v.saturation));
        _addColorMatrixFilterCacheTween("saturation", pg, cache, v);
      } else if (cache.saturation !== 1) {
        if (combine) {
          matrix = _setSaturation(matrix, cache.saturation);
        } else {
          _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
        }
      }
    }
    i = matrix.length;
    while (--i > -1) {
      if (matrix[i] !== startMatrix[i]) {
        pg._addTween(startMatrix, i, startMatrix[i], matrix[i], "colorMatrixFilter");
      }
    }
    pg._overwriteProps.push("colorMatrixFilter");
  },
  _addColorTween = function _addColorTween(target, p, value, colorSetter, plugin) {
    var pt = colorSetter._firstPT = {
      _next: colorSetter._firstPT,
      t: target,
      p: p,
      proxy: {},
      f: typeof target[p] === "function"
    };
    pt.proxy[p] = "rgb(" + _parseColor(!pt.f ? target[p] : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]()).join(",") + ")";
    plugin._addTween(pt.proxy, p, "get", typeof value === "number" ? "rgb(" + _parseColor(value, false).join(",") + ")" : value, p, null, null, _colorStringFilter);
  },
  //to improve performance, when a color is sensed, we hijack the setRatio() method of the plugin instance with a new function that this method spits back. This is a special method that handles parsing color values on-the-fly and turns them into numeric values which PixiJS requires. In other words, instead of "rgb(255, 0, 0)", PixiJS wants 0xFF0000. This also works with hsl() values.
  _buildColorSetter = function _buildColorSetter(tween, plugin) {
    var setRatio = plugin.setRatio,
      //save the original (super) setRatio() function
      func = function func(v) {
        var pt = func._firstPT,
          val;
        setRatio.call(plugin, v);
        while (pt) {
          val = _parseColor(pt.proxy[pt.p], "number");
          if (pt.f) {
            pt.t[pt.p](val);
          } else {
            pt.t[pt.p] = val;
          }
          pt = pt._next;
        }
        if (func.graphics) {
          //in order for PixiJS to actually redraw GraphicsData, we've gotta increment the "dirty" and "clearDirty" values. If we don't do this, the values will be tween properly, but not rendered.
          func.graphics.dirty++;
          func.graphics.clearDirty++;
        }
      };
    plugin.setRatio = func;
    return func;
  },
  _colorProps = {
    tint: 1,
    lineColor: 1,
    fillColor: 1
  },
  _xyContexts = "position,scale,skew,pivot,anchor,tilePosition,tileScale".split(","),
  _contexts = {
    x: "position",
    y: "position",
    tileX: "tilePosition",
    tileY: "tilePosition"
  },
  _colorMatrixFilterProps = {
    colorMatrixFilter: 1,
    saturation: 1,
    contrast: 1,
    hue: 1,
    colorize: 1,
    colorizeAmount: 1,
    brightness: 1,
    combineCMF: 1
  },
  _DEG2RAD = Math.PI / 180,
  _degreesToRadians = function _degreesToRadians(value) {
    return typeof value === "string" && value.charAt(1) === "=" ? value.substr(0, 2) + parseFloat(value.substr(2)) * _DEG2RAD : value * _DEG2RAD;
  },
  i,
  p;

//context setup...
for (i = 0; i < _xyContexts.length; i++) {
  p = _xyContexts[i];
  _contexts[p + "X"] = p;
  _contexts[p + "Y"] = p;
}

//color parsing setup...
for (p in _colorLookup) {
  _colorExp += "|" + p + "\\b";
}
_colorExp = new RegExp(_colorExp + ")", "gi");
_colorStringFilter = function _colorStringFilter(a) {
  var combined = a[0] + " " + a[1],
    toHSL;
  _colorExp.lastIndex = 0;
  if (_colorExp.test(combined)) {
    toHSL = combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1;
    a[0] = _formatColors(a[0], toHSL);
    a[1] = _formatColors(a[1], toHSL);
  }
};
if (!PixiPlugin_TweenLite.defaultStringFilter) {
  PixiPlugin_TweenLite.defaultStringFilter = _colorStringFilter;
}
var PixiPlugin = esm_TweenLite/* _gsScope._gsDefine.plugin */.ML._gsDefine.plugin({
  propName: "pixi",
  priority: 0,
  API: 2,
  global: true,
  version: "0.3.0",
  init: function init(target, values, tween, index) {
    if (!target instanceof esm_TweenLite/* _gsScope.PIXI.DisplayObject */.ML.PIXI.DisplayObject) {
      return false;
    }
    var isV4 = esm_TweenLite/* _gsScope.PIXI.VERSION.charAt */.ML.PIXI.VERSION.charAt(0) === "4",
      context,
      axis,
      value,
      colorMatrix,
      filter,
      p,
      padding,
      colorSetter,
      i,
      data,
      pt;
    for (p in values) {
      context = _contexts[p];
      value = values[p];
      if (typeof value === "function") {
        value = value(index || 0, target);
      }
      if (context) {
        axis = p.charAt(p.length - 1).toLowerCase().indexOf("x") !== -1 ? "x" : "y";
        this._addTween(target[context], axis, target[context][axis], context === "skew" ? _degreesToRadians(value) : value, p);
      } else if (p === "scale" || p === "anchor" || p === "pivot" || p === "tileScale") {
        this._addTween(target[p], "x", target[p].x, value, p + "X");
        this._addTween(target[p], "y", target[p].y, value, p + "Y");
      } else if (p === "rotation") {
        //PIXI expects rotation in radians, but as a convenience we let folks define it in degrees and we do the conversion.
        this._addTween(target, p, target.rotation, _degreesToRadians(value), p);
      } else if (_colorMatrixFilterProps[p]) {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, values.colorMatrixFilter || values, this);
          colorMatrix = true;
        }
      } else if (p === "blur" || p === "blurX" || p === "blurY" || p === "blurPadding") {
        filter = _getFilter(target, "BlurFilter");
        this._addTween(filter, p, filter[p], value, p);
        if (values.blurPadding !== 0) {
          padding = values.blurPadding || Math.max(filter[p], value) * 2;
          i = target.filters.length;
          while (--i > -1) {
            target.filters[i].padding = Math.max(target.filters[i].padding, padding); //if we don't expand the padding on all the filters, it can look clipped.
          }
        }
      } else if (_colorProps[p]) {
        if (!colorSetter) {
          colorSetter = _buildColorSetter(tween, this);
        }
        if ((p === "lineColor" || p === "fillColor") && target instanceof esm_TweenLite/* _gsScope.PIXI.Graphics */.ML.PIXI.Graphics) {
          data = (target.geometry || target).graphicsData; //"geometry" was introduced in PIXI version 5
          i = data.length;
          while (--i > -1) {
            _addColorTween(isV4 ? data[i] : data[i][p.substr(0, 4) + "Style"], isV4 ? p : "color", value, colorSetter, this);
          }
          colorSetter.graphics = target.geometry || target;
        } else {
          _addColorTween(target, p, value, colorSetter, this);
        }
      } else if (p === "autoAlpha") {
        this._firstPT = pt = {
          t: {
            setRatio: function setRatio() {
              target.visible = !!target.alpha;
            }
          },
          p: "setRatio",
          s: 0,
          c: 1,
          f: 1,
          pg: 0,
          n: "visible",
          pr: 0,
          m: 0,
          _next: this._firstPT
        };
        if (pt._next) {
          pt._next._prev = pt;
        }
        this._addTween(target, "alpha", target.alpha, value, "alpha");
        this._overwriteProps.push("alpha", "visible");
      } else {
        this._addTween(target, p, target[p], value, p);
      }
      this._overwriteProps.push(p);
    }
    return true;
  }
});
PixiPlugin.colorProps = _colorProps;
PixiPlugin.parseColor = _parseColor;
PixiPlugin.formatColors = _formatColors;
PixiPlugin.colorStringFilter = _colorStringFilter;
PixiPlugin.registerPIXI = function (PIXI) {
  esm_TweenLite/* _gsScope.PIXI */.ML.PIXI = PIXI;
};

;// CONCATENATED MODULE: ./src/components/advanced-slider/js/special.js



/* 
 *************************************
 * <!-- Advanced Slider (Special Effects) -->
 *************************************
 */



var ADVANCED_SLIDER_FILTER = function (module, $, window, document) {
  if (window.ADVANCED_SLIDER_FILTER === null) return false;
  module.ADVANCED_SLIDER_FILTER = module.ADVANCED_SLIDER_FILTER || {};
  module.ADVANCED_SLIDER_FILTER.version = '0.3.6';
  module.ADVANCED_SLIDER_FILTER.pageLoaded = function () {
    // Remove pixi.js banner from the console
    PIXI.utils.skipHello();
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    var animSpeed = 1000;
    var $sliderWrapper = $('.uix-advanced-slider-sp');
    var
      //Save different canvas heights as an array
      canvasHeights = [],
      //Basic webGL renderers 
      rendererOuterID = 'uix-advanced-slider-sp__canvas-container',
      rendererCanvasID = 'uix-advanced-slider-sp__canvas',
      renderer,
      //PIXI
      renderer__filter,
      rendererCanvasID__filter = rendererCanvasID,
      stage__filter,
      container__items,
      displacementSprite,
      displacementFilter;
    sliderInit(false);
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        sliderInit(true);
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);

    /*
     * Initialize slideshow
     *
     * @param  {Boolean} resize            - Determine whether the window size changes.
     * @return {Void}
     */
    function sliderInit(resize) {
      $sliderWrapper.each(function () {
        var $this = $(this);
        var $items = $this.find('.uix-advanced-slider-sp__item'),
          $first = $items.first(),
          activated = $this.data('activated');
        var nativeItemW, nativeItemH;
        if ((0,esm_typeof/* default */.Z)(activated) === ( true ? "undefined" : 0) || activated === 0) {
          //Get parameter configuration from the data-* attribute of HTML
          var dataControlsPagination = $this.data('controls-pagination'),
            dataControlsArrows = $this.data('controls-arrows'),
            dataDraggable = $this.data('draggable'),
            dataDraggableCursor = $this.data('draggable-cursor'),
            dataCountTotal = $this.data('count-total'),
            dataCountCur = $this.data('count-now'),
            dataSpeed = $this.data('speed'),
            dataFilterTexture = $this.data('filter-texture');
          if ((0,esm_typeof/* default */.Z)(dataControlsPagination) === ( true ? "undefined" : 0)) dataControlsPagination = '.uix-advanced-slider-sp__pagination';
          if ((0,esm_typeof/* default */.Z)(dataControlsArrows) === ( true ? "undefined" : 0) || dataControlsArrows == false) dataControlsArrows = '.uix-advanced-slider-sp__arrows';
          if ((0,esm_typeof/* default */.Z)(dataDraggable) === ( true ? "undefined" : 0)) dataDraggable = false;
          if ((0,esm_typeof/* default */.Z)(dataDraggableCursor) === ( true ? "undefined" : 0) || dataDraggableCursor == false) dataDraggableCursor = 'move';
          if ((0,esm_typeof/* default */.Z)(dataCountTotal) === ( true ? "undefined" : 0)) dataCountTotal = 'p.count em.count';
          if ((0,esm_typeof/* default */.Z)(dataCountCur) === ( true ? "undefined" : 0)) dataCountCur = 'p.count em.current';
          if ((0,esm_typeof/* default */.Z)(dataFilterTexture) === ( true ? "undefined" : 0) || !dataFilterTexture || dataFilterTexture == '') dataFilterTexture = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

          //Autoplay parameters
          var dataAuto = $this.data('auto'),
            dataTiming = $this.data('timing'),
            dataLoop = $this.data('loop');
          if ((0,esm_typeof/* default */.Z)(dataAuto) === ( true ? "undefined" : 0)) dataAuto = false;
          if ((0,esm_typeof/* default */.Z)(dataTiming) === ( true ? "undefined" : 0)) dataTiming = 10000;
          if ((0,esm_typeof/* default */.Z)(dataLoop) === ( true ? "undefined" : 0)) dataLoop = false;

          //Autoplay times
          var playTimes;
          //A function called "timer" once every second (like a digital watch).
          $this[0].animatedSlides;

          //Get the animation speed
          //-------------------------------------	
          if ((0,esm_typeof/* default */.Z)(dataSpeed) != ( true ? "undefined" : 0) && dataSpeed != false) {
            animSpeed = dataSpeed;
          }

          //Display all images
          //-------------------------------------	
          if (!Modernizr.webgl) {
            $this.find('img').css('visibility', 'visible');
          }

          //Initialize the first item container
          //-------------------------------------		
          $items.addClass('next');
          $first.addClass('is-active');
          TweenMax.set($items, {
            alpha: 0,
            onComplete: function onComplete() {
              TweenMax.to($first, animSpeed / 1000, {
                alpha: 1,
                delay: animSpeed / 1000
              });
            }
          });
          if ($first.find('video').length > 0) {
            //Returns the dimensions (intrinsic height and width ) of the video
            var video = document.getElementById($first.find('video').attr('id'));
            var videoURL = $first.find('source:first').attr('src');
            if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $first.attr('src');
            if ((0,esm_typeof/* default */.Z)(videoURL) != ( true ? "undefined" : 0)) {
              video.addEventListener('loadedmetadata', function (e) {
                $this.css('height', this.videoHeight * ($this.width() / this.videoWidth) + 'px');
                nativeItemW = this.videoWidth;
                nativeItemH = this.videoHeight;

                //Initialize all the items to the stage
                addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur, dataFilterTexture);
              }, false);
              video.src = videoURL;
            }
          } else {
            var imgURL = $first.find('img').attr('src');
            if ((0,esm_typeof/* default */.Z)(imgURL) != ( true ? "undefined" : 0)) {
              var img = new Image();
              img.onload = function () {
                $this.css('height', $this.width() * (this.height / this.width) + 'px');
                nativeItemW = this.width;
                nativeItemH = this.height;

                //Initialize all the items to the stage
                addItemsToStage($this, nativeItemW, nativeItemH, dataControlsPagination, dataControlsArrows, dataLoop, dataDraggable, dataDraggableCursor, dataCountTotal, dataCountCur, dataFilterTexture);
              };
              img.src = imgURL;
            }
          }

          //Autoplay Slider
          //-------------------------------------		
          if (!resize) {
            if (dataAuto && !isNaN(parseFloat(dataTiming)) && isFinite(dataTiming)) {
              sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              var autoplayEnter = function autoplayEnter() {
                clearInterval($this[0].animatedSlides);
              };
              var autoplayLeave = function autoplayLeave() {
                sliderAutoPlay(playTimes, dataTiming, dataLoop, $this, dataCountTotal, dataCountCur, dataControlsPagination, dataControlsArrows);
              };

              // Do not use the `off()` method, otherwise it will cause the second mouseenter to be invalid
              $this.on('mouseenter', autoplayEnter);
              $this.on('mouseleave', autoplayLeave);

              // To determine if it is a touch screen.
              if (Modernizr.touchevents) {
                $this.on('pointerenter', autoplayEnter);
                $this.on('pointerleave', autoplayLeave);
              }
            }
          }

          //Prevents front-end javascripts that are activated with AJAX to repeat loading.
          $this.data('activated', 1);
        } //endif activated
      });
    }

    /*
    * Trigger slider autoplay
    *
    * @param  {Function} playTimes            - Number of times.
    * @param  {Number} timing                 - Autoplay interval.
    * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
    * @param  {Element} slider                 - Selector of the slider .
    * @param  {String} countTotalID           - Total number ID or class of counter.
    * @param  {String} countCurID             - Current number ID or class of counter.
    * @param  {String} paginationID           - Navigation ID for paging control of each slide.
    * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
    * @return {Void}                          - The constructor.
    */
    function sliderAutoPlay(playTimes, timing, loop, slider, countTotalID, countCurID, paginationID, arrowsID) {
      var items = slider.find('.uix-advanced-slider-sp__item'),
        total = items.length;
      slider[0].animatedSlides = setInterval(function () {
        playTimes = parseFloat(items.filter('.is-active').index());
        playTimes++;
        if (!loop) {
          if (playTimes < total && playTimes >= 0) sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
        } else {
          if (playTimes == total) playTimes = 0;
          if (playTimes < 0) playTimes = total - 1;

          //Prevent problems with styles when switching in positive order
          if (playTimes == 0) {
            sliderUpdates(playTimes, slider, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop);
          } else {
            sliderUpdates(playTimes, slider, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
          }
        }
      }, timing);
    }

    /*
     * Initialize all the items to the stage
     *
     * @param  {Element} slider                 - Current selector of each slider.
     * @param  {Number} nativeItemW            - Returns the intrinsic width of the image/video.
     * @param  {Number} nativeItemH            - Returns the intrinsic height of the image/video.
           * @param  {String} paginationID           - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
           * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop. 
           * @param  {Boolean} draggable             - Allow drag and drop on the slider.
           * @param  {String} draggableCursor        - Drag & Drop Change icon/cursor while dragging.
           * @param  {String} countTotalID           - Total number ID or class of counter.
           * @param  {String} countCurID             - Current number ID or class of counter.
           * @param  {String} filterTexture          - The texture used for the displacement map.
     * @return {Void}
     */
    function addItemsToStage(slider, nativeItemW, nativeItemH, paginationID, arrowsID, loop, draggable, draggableCursor, countTotalID, countCurID, filterTexture) {
      var $this = slider,
        $items = $this.find('.uix-advanced-slider-sp__item'),
        $first = $items.first(),
        itemsTotal = $items.length;

      //If arrows does not exist on the page, it will be added by default, 
      //and the drag and drop function will be activated.
      if ($(arrowsID).length == 0) {
        $('body').prepend('<div style="display:none;" class="uix-advanced-slider-sp__arrows ' + arrowsID.replace('#', '').replace('.', '') + '"><a href="#" class="uix-advanced-slider-sp__arrows--prev"></a><a href="#" class="uix-advanced-slider-sp__arrows--next"></a></div>');
      }

      //Add identifiers for the first and last items
      $items.last().addClass('last');
      $items.first().addClass('first');

      //Prevent bubbling
      if (itemsTotal == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
      }
      if (Modernizr.webgl) {
        //Load slides to canvas
        //-------------------------------------	
        if ($('#' + rendererCanvasID).length == 0) {
          $this.prepend('<div id="' + rendererOuterID + '" class="uix-advanced-slider-sp__canvas-container"><canvas id="' + rendererCanvasID + '"></canvas></div>');
        }

        //Save different canvas heights as an array
        //-------------------------------------	
        $this.find('.uix-advanced-slider-sp__item').each(function (index) {
          var $thisItem = $(this);
          if ($thisItem.find('video').length > 0) {
            //Returns the dimensions (intrinsic height and width ) of the video
            var video = document.getElementById($thisItem.find('video').attr('id'));
            var videoURL = $thisItem.find('video source:first').attr('src');
            if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $thisItem.attr('src');
            video.addEventListener('loadedmetadata', function (e) {
              var curW = this.videoWidth,
                curH = this.videoHeight,
                newW = curW,
                newH = curH;
              newW = $this.width();

              //Scaled/Proportional Content 
              newH = curH * (newW / curW);

              //Save different canvas heights as an array
              if (canvasHeights.length < itemsTotal) {
                canvasHeights.push(newH);
              }
            }, false);
            video.src = videoURL;
          } else {
            var imgURL = $thisItem.find('img').attr('src'),
              imgCur = new Image();
            imgCur.onload = function () {
              var curW_img = this.width,
                curH_img = this.height,
                newW_img = curW_img,
                newH_img = curH_img;
              newW_img = $this.width();

              //Scaled/Proportional Content 
              newH_img = curH_img * (newW_img / curW_img);

              //Save different canvas heights as an array
              if (canvasHeights.length < itemsTotal) {
                canvasHeights.push(newH_img);
              }
            };
            imgCur.src = imgURL;
          }
        }); //$this.find( '.uix-advanced-slider-sp__item' ).each

        //Basic webGL renderers 
        //-------------------------------------
        renderer = new PIXI.Application({
          width: $this.width(),
          height: $this.height(),
          transparent: true,
          antialias: true,
          autoResize: true,
          view: document.getElementById(rendererCanvasID)
        });
        renderer__filter = new PIXI.autoDetectRenderer({
          width: $this.width(),
          height: $this.height(),
          transparent: true,
          view: document.getElementById(rendererCanvasID__filter)
        });

        //
        //
        stage__filter = new PIXI.Container();
        container__items = new PIXI.Container();
        displacementSprite = /^.*\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)/.test(filterTexture) ? new PIXI.Sprite(PIXI.Texture.from(filterTexture)) : new PIXI.Sprite.from(filterTexture);
        displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

        //----------------------------------------------------------------------------------
        //--------------------------------- Brightness Effect -------------------------------	
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: renderer.stage.children[index]
        if ($this.hasClass('uix-advanced-slider-sp--eff-brightness')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this);

            //Load sprite from each slider to canvas
            //-------------------------------------
            var curSprite;
            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture);

              // pause the video
              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true;

              //Returns the dimensions (intrinsic height and width ) of the video
              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);
              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };
              imgCur.src = imgURL;
            }

            // center the sprite's anchor point
            curSprite.anchor.set(0);

            // sprite size
            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height;

            //Avoid error texture rendering errors ***!Important***
            TweenMax.set(curSprite, {
              alpha: 0
            });

            //Render updated scene
            //-------------------------------------   
            renderer.stage.addChild(curSprite);
          });

          //Initialize the default height of canvas
          //-------------------------------------	
          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect -----------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]
        if ($this.hasClass('uix-advanced-slider-sp--eff-liquid')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this);

            //Load sprite from each slider to canvas
            //-------------------------------------
            var curSprite,
              canvasRatio = $this.width() / nativeItemW;
            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture);

              // pause the video
              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true;

              //Returns the dimensions (intrinsic height and width ) of the video
              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);
              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };
              imgCur.src = imgURL;
            }

            // center the sprite's anchor point
            curSprite.anchor.set(0);

            // sprite size
            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height;

            //Need to scale according to the screen
            curSprite.scale.set(canvasRatio);

            //Render updated scene
            //-------------------------------------   
            container__items.addChild(curSprite);

            //Add child container to the main container 
            //-------------------------------------
            stage__filter.addChild(container__items);
            // Enable Interactions
            stage__filter.interactive = true;

            //Set the filter to stage and set some default values for the animation
            //-------------------------------------

            //A texture stores the information that represents an image
            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            stage__filter.filters = [displacementFilter];

            //Add filter container to the main container
            //-------------------------------------				
            displacementSprite.anchor.set(0.5);
            displacementSprite.x = renderer__filter.width / 2;
            displacementSprite.y = renderer__filter.height / 2;
            displacementSprite.scale.x = 1;
            displacementSprite.scale.y = 1;

            // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
            displacementFilter.autoFit = false;
            stage__filter.addChild(displacementSprite);

            //Animation Effects
            //-------------------------------------
            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              // Render updated scene
              renderer__filter.render(stage__filter);
            });
          });

          //Initialize the default height of canvas
          //-------------------------------------	
          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 2 -----------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]
        if ($this.hasClass('uix-advanced-slider-sp--eff-liquid2')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this);

            //Load sprite from each slider to canvas
            //-------------------------------------
            var curSprite,
              canvasRatio = $this.width() / nativeItemW;
            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture);

              // pause the video
              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true;

              //Returns the dimensions (intrinsic height and width ) of the video
              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);
              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };
              imgCur.src = imgURL;
            }

            // center the sprite's anchor point
            curSprite.anchor.set(0);

            // sprite size
            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height;

            //Need to scale according to the screen
            curSprite.scale.set(canvasRatio);

            //Avoid error texture rendering errors ***!Important***
            TweenMax.set(curSprite, {
              alpha: 0
            });

            //Render updated scene
            //-------------------------------------   
            container__items.addChild(curSprite);

            //Add child container to the main container 
            //-------------------------------------
            stage__filter.addChild(container__items);
            // Enable Interactions
            stage__filter.interactive = true;

            //Set the filter to stage and set some default values for the animation
            //-------------------------------------

            //A texture stores the information that represents an image
            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
            stage__filter.filters = [displacementFilter];

            //Add filter container to the main container
            //-------------------------------------				
            displacementSprite.anchor.set(0.5);
            displacementSprite.x = renderer__filter.width / 2;
            displacementSprite.y = renderer__filter.height / 2;

            // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
            displacementFilter.autoFit = false;
            stage__filter.addChild(displacementSprite);

            //Animation Effects
            //-------------------------------------
            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              // Render updated scene
              renderer__filter.render(stage__filter);
            });
          });

          //Initialize the default height of canvas
          //-------------------------------------	
          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 3 -----------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]
        if ($this.hasClass('uix-advanced-slider-sp--eff-liquid3')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this);

            //Load sprite from each slider to canvas
            //-------------------------------------
            var curSprite,
              canvasRatio = $this.width() / nativeItemW;
            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture);

              // pause the video
              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true;

              //Returns the dimensions (intrinsic height and width ) of the video
              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);
              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };
              imgCur.src = imgURL;
            }

            // center the sprite's anchor point
            curSprite.anchor.set(0);

            // sprite size
            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height;

            //Need to scale according to the screen
            curSprite.scale.set(canvasRatio);

            //Avoid error texture rendering errors ***!Important***
            TweenMax.set(curSprite, {
              alpha: 0
            });

            //Render updated scene
            //-------------------------------------   
            container__items.addChild(curSprite);

            //Add child container to the main container 
            //-------------------------------------
            stage__filter.addChild(container__items);
            // Enable Interactions
            stage__filter.interactive = true;

            //Set the filter to stage and set some default values for the animation
            //-------------------------------------

            //A texture stores the information that represents an image
            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            stage__filter.filters = [displacementFilter];

            //Add filter container to the main container
            //-------------------------------------				
            displacementSprite.anchor.set(0.5);
            displacementSprite.x = renderer__filter.width / 2;
            displacementSprite.y = renderer__filter.height / 2;

            // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
            displacementFilter.autoFit = false;
            stage__filter.addChild(displacementSprite);

            //Animation Effects
            //-------------------------------------
            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              //Need the displacementSprite.texture.baseTexture.wrapMode is "PIXI.WRAP_MODES.REPEAT"
              displacementSprite.x += 1 * delta;
              displacementSprite.y += 0.3;

              // Render updated scene
              renderer__filter.render(stage__filter);
            });
          });

          //Initialize the default height of canvas
          //-------------------------------------	
          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Parallax Effect -------------------------------
        //----------------------------------------------------------------------------------
        //Usage of returning sprite object: container__items.children[index]
        if ($this.hasClass('uix-advanced-slider-sp--eff-parallax')) {
          $this.find('.uix-advanced-slider-sp__item').each(function (index) {
            var $thisItem = $(this);

            //Load sprite from each slider to canvas
            //-------------------------------------
            var curSprite,
              canvasRatio = $this.width() / nativeItemW;
            if ($thisItem.find('video').length > 0) {
              // create a video texture from a path
              var videoURL = $thisItem.find('source:first').attr('src');
              if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = $thisItem.attr('src');
              var texture = PIXI.Texture.from(videoURL);
              curSprite = new PIXI.Sprite(texture);

              // pause the video
              var videoSource = texture.baseTexture.resource.source;
              videoSource.autoplay = false;
              videoSource.pause();
              videoSource.currentTime = 0;
              videoSource.muted = true;

              //Returns the dimensions (intrinsic height and width ) of the video
              var video = document.getElementById($thisItem.find('video').attr('id'));
              video.addEventListener('loadedmetadata', function (e) {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              }, false);
              video.src = videoURL;
            } else {
              var imgURL = $thisItem.find('img').attr('src'),
                imgCur = new Image();
              curSprite = new PIXI.Sprite.from(imgURL);
              imgCur.onload = function () {
                //At the same time change the height of the canvas
                renderer.view.style.width = $this.width() + 'px';
                renderer.view.style.height = canvasHeights[index] + 'px';
              };
              imgCur.src = imgURL;
            }

            // center the sprite's anchor point
            curSprite.anchor.set(0);

            // sprite size
            curSprite.width = renderer.view.width;
            curSprite.height = renderer.view.height;

            //Need to scale according to the screen
            curSprite.scale.set(canvasRatio);

            //Avoid error texture rendering errors ***!Important***
            TweenMax.set(curSprite, {
              alpha: 0
            });

            //Render updated scene
            //-------------------------------------   
            container__items.addChild(curSprite);

            //Add child container to the main container 
            //-------------------------------------
            stage__filter.addChild(container__items);
            // Enable Interactions
            stage__filter.interactive = true;

            // Create mask
            //-------------------------------------
            //current mask
            var curSpriteMask = new PIXI.Graphics();
            curSpriteMask.lineStyle(0);
            curSpriteMask.beginFill(0xFFFFFF);
            curSpriteMask.moveTo(0, 0);
            curSpriteMask.lineTo(renderer.view.width, 0);
            curSpriteMask.lineTo(renderer.view.width, renderer.view.height);
            curSpriteMask.lineTo(0, renderer.view.height);
            curSpriteMask.endFill();
            curSpriteMask.position.x = 0;
            curSpriteMask.position.y = 0;
            curSprite.mask = curSpriteMask;
            stage__filter.addChild(curSpriteMask); //Do not add to the container

            //Animation Effects
            //-------------------------------------
            var ticker = new PIXI.Ticker();
            ticker.autoStart = true;
            ticker.add(function (delta) {
              // Render updated scene
              renderer__filter.render(stage__filter);
            });
          });

          //Initialize the default height of canvas
          //-------------------------------------	
          setTimeout(function () {
            canvasDefaultInit($this, $first);
          }, animSpeed);
        } // end effect

        //Canvas Interactions
        //-------------------------------------
        transitionInteractions(0, itemsTotal - 1, $this, 'in', 'next');
      }

      // Fires local videos asynchronously with slider switch.
      //-------------------------------------
      if (!Modernizr.webgl) normalSliderVideoInit($items, false);

      //Pagination dots 
      //-------------------------------------	
      var _dot = '',
        _dotActive = '';
      _dot += '<ul>';
      for (var i = 0; i < itemsTotal; i++) {
        _dotActive = i == 0 ? 'class="is-active"' : '';
        _dot += '<li><a ' + _dotActive + ' data-index="' + i + '" href="javascript:"></a></li>';
      }
      _dot += '</ul>';
      if ($(paginationID).html() == '') $(paginationID).html(_dot);
      $(paginationID).find('li a').off('click').on('click', function (e) {
        e.preventDefault();

        //Prevent buttons' events from firing multiple times
        var $btn = $(this);
        if ($btn.attr('aria-disabled') == 'true') return false;
        $(paginationID).find('li a').attr('aria-disabled', 'true');
        $(paginationID).find('li a').delay(animSpeed).queue(function (next) {
          $(paginationID).find('li a').attr('aria-disabled', 'false');
          next();
        });

        //
        if (!$(this).hasClass('is-active')) {
          //Determine the direction
          var curDir = 'prev';
          if ($(this).attr('data-index') > parseFloat($items.filter('.is-active').index())) {
            curDir = 'next';
          }

          //Canvas Interactions
          transitionInteractions($items.filter('.is-active').index(), $items.filter('.leave').index(), $this, 'out', curDir);

          //Update the current and previous/next items
          sliderUpdates($(this).attr('data-index'), $this, curDir, countTotalID, countCurID, paginationID, arrowsID, loop);

          //Pause the auto play event
          clearInterval($this[0].animatedSlides);
        }
      });

      //Next/Prev buttons
      //-------------------------------------		
      var _prev = $(arrowsID).find('.uix-advanced-slider-sp__arrows--prev'),
        _next = $(arrowsID).find('.uix-advanced-slider-sp__arrows--next');
      $(arrowsID).find('a').attr('href', 'javascript:');
      $(arrowsID).find('a').removeClass('is-disabled');
      if (!loop) {
        _prev.addClass('is-disabled');
      }
      _prev.off('click').on('click', function (e) {
        e.preventDefault();

        //Pause the auto play event
        clearInterval($this[0].animatedSlides);

        //Move animation
        prevMove();
      });
      _next.off('click').on('click', function (e) {
        e.preventDefault();

        //Pause the auto play event
        clearInterval($this[0].animatedSlides);

        //Move animation
        nextMove();
      });
      function prevMove() {
        //Prevent buttons' events from firing multiple times
        if (_prev.attr('aria-disabled') == 'true') return false;
        _prev.attr('aria-disabled', 'true');
        _prev.delay(animSpeed).queue(function (next) {
          _prev.attr('aria-disabled', 'false');
          next();
        });

        //
        if (_prev.hasClass('is-disabled')) return false;

        //Canvas Interactions
        transitionInteractions($items.filter('.is-active').index(), $items.filter('.leave').index(), $this, 'out', 'prev');

        //Update the current and previous items
        sliderUpdates(parseFloat($items.filter('.is-active').index()) - 1, $this, 'prev', countTotalID, countCurID, paginationID, arrowsID, loop);
      }
      function nextMove() {
        //Prevent buttons' events from firing multiple times
        if (_next.attr('aria-disabled') == 'true') return false;
        _next.attr('aria-disabled', 'true');
        _next.delay(animSpeed).queue(function (next) {
          _next.attr('aria-disabled', 'false');
          next();
        });

        //
        if (_next.hasClass('is-disabled')) return false;

        //Canvas Interactions
        transitionInteractions($items.filter('.is-active').index(), $items.filter('.leave').index(), $this, 'out', 'next');

        //Update the current and next items
        sliderUpdates(parseFloat($items.filter('.is-active').index()) + 1, $this, 'next', countTotalID, countCurID, paginationID, arrowsID, loop);
      }

      //Added touch method to mobile device and desktop
      //-------------------------------------	
      var $dragTrigger = $this.find('.uix-advanced-slider-sp__inner');
      var mouseX, mouseY;
      var isMoving = false;

      //Avoid images causing mouseup to fail
      $dragTrigger.find('img').css({
        'pointer-events': 'none',
        'user-select': 'none'
      });

      //Make the cursor a move icon when a user hovers over an item
      if (draggable && draggableCursor != '' && draggableCursor != false) $dragTrigger.css('cursor', draggableCursor);

      //draggable for touch devices
      if (Modernizr.touchevents) draggable = true;
      if (draggable) {
        $dragTrigger[0].removeEventListener('mousedown', dragStart);
        document.removeEventListener('mouseup', dragEnd);
        $dragTrigger[0].removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);

        //
        $dragTrigger[0].addEventListener('mousedown', dragStart);
        $dragTrigger[0].addEventListener('touchstart', dragStart);
      }
      function dragStart(e) {
        //Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android
        var touches = e.touches;
        if (touches && touches.length) {
          mouseX = touches[0].clientX;
          mouseY = touches[0].clientY;
        } else {
          mouseX = e.clientX;
          mouseY = e.clientY;
        }
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', dragProcess);
        document.addEventListener('touchend', dragEnd);
        document.addEventListener('touchmove', dragProcess);
      }
      function dragProcess(e) {
        var touches = e.touches;
        var offsetX, offsetY;
        if (touches && touches.length) {
          offsetX = mouseX - touches[0].clientX, offsetY = mouseY - touches[0].clientY;
        } else {
          offsetX = mouseX - e.clientX, offsetY = mouseY - e.clientY;
        }

        //--- left
        if (offsetX >= 50) {
          if (!isMoving) {
            isMoving = true;
            nextMove();
          }
        }

        //--- right
        if (offsetX <= -50) {
          if (!isMoving) {
            isMoving = true;
            prevMove();
          }
        }

        //--- up
        if (offsetY >= 50) {}

        //--- down
        if (offsetY <= -50) {}
      }
      function dragEnd(e) {
        document.removeEventListener('mousemove', dragProcess);
        document.removeEventListener('touchmove', dragProcess);

        //restore move action status
        setTimeout(function () {
          isMoving = false;
        }, animSpeed);
      }
    }

    /*
     * Transition Between Slides
     *
     * @param  {Number} elementIndex           - Index of current slider.
     * @param  {Element} slider                 - Selector of the slider .
     * @param  {String} dir                    - Switching direction indicator.
           * @param  {String} countTotalID           - Total number ID or class of counter.
           * @param  {String} countCurID             - Current number ID or class of counter.
           * @param  {String} paginationID           - Navigation ID for paging control of each slide.
           * @param  {String} arrowsID               - Previous/Next arrow navigation ID.
           * @param  {Boolean} loop                  - Gives the slider a seamless infinite loop.
     * @return {Void}
     */
    function sliderUpdates(elementIndex, slider, dir, countTotalID, countCurID, paginationID, arrowsID, loop) {
      var $items = slider.find('.uix-advanced-slider-sp__item'),
        total = $items.length;

      //Prevent bubbling
      if (total == 1) {
        $(paginationID).hide();
        $(arrowsID).hide();
        return false;
      }

      //Transition Interception
      //-------------------------------------
      if (loop) {
        if (elementIndex == total) elementIndex = 0;
        if (elementIndex < 0) elementIndex = total - 1;
      } else {
        $(arrowsID).find('a').removeClass('is-disabled');
        if (elementIndex == total - 1) $(arrowsID).find('.uix-advanced-slider-sp__arrows--next').addClass('is-disabled');
        if (elementIndex == 0) $(arrowsID).find('.uix-advanced-slider-sp__arrows--prev').addClass('is-disabled');
      }

      // To determine if it is a touch screen.
      //-------------------------------------
      if (Modernizr.touchevents) {
        if (elementIndex == total) elementIndex = total - 1;
        if (elementIndex < 0) elementIndex = 0;

        //Prevent bubbling
        if (!loop) {
          //first item
          if (elementIndex == 0) {
            $(arrowsID).find('.uix-advanced-slider-sp__arrows--prev').addClass('is-disabled');
          }

          //last item
          if (elementIndex == total - 1) {
            $(arrowsID).find('.uix-advanced-slider-sp__arrows--next').addClass('is-disabled');
          }
        }
      }

      // call the current item
      //-------------------------------------
      var $current = $items.eq(elementIndex);

      //Determine the direction and add class to switching direction indicator.
      //-------------------------------------
      var dirIndicatorClass = '';
      if (dir == 'prev') dirIndicatorClass = 'prev';
      if (dir == 'next') dirIndicatorClass = 'next';

      //Add transition class to Controls Pagination
      //-------------------------------------
      $(paginationID).find('li a').removeClass('leave');
      $(paginationID).find('li a.is-active').removeClass('is-active').addClass('leave');
      $(paginationID).find('li a[data-index="' + elementIndex + '"]').addClass('is-active').removeClass('leave');

      //Add transition class to each item
      //-------------------------------------	
      $items.removeClass('leave prev next');
      $items.addClass(dirIndicatorClass);
      slider.find('.uix-advanced-slider-sp__item.is-active').removeClass('is-active').addClass('leave ' + dirIndicatorClass);
      $current.addClass('is-active ' + dirIndicatorClass).removeClass('leave');

      //Display counter
      //-------------------------------------
      $(countTotalID).text(total);
      $(countCurID).text(parseFloat(elementIndex) + 1);

      // Fires local videos asynchronously with slider switch.
      //-------------------------------------
      if (!Modernizr.webgl) {
        normalSliderVideoInit($items, false);
        normalSliderVideoInit($current, true);
      }

      //Reset the default height of canvas
      //-------------------------------------	
      setTimeout(function () {
        canvasDefaultInit(slider, $current);
      }, animSpeed);

      //Canvas Interactions
      //-------------------------------------

      //-- Brightness Effect
      if (slider.hasClass('uix-advanced-slider-sp--eff-brightness')) {}

      //-- Liquid Distortion Effect
      if (slider.hasClass('uix-advanced-slider-sp--eff-liquid')) {}

      //-- Liquid Distortion Effect 2
      if (slider.hasClass('uix-advanced-slider-sp--eff-liquid2')) {}

      //-- Liquid Distortion Effect 3
      if (slider.hasClass('uix-advanced-slider-sp--eff-liquid3')) {}

      //-- Parallax Effect 
      if (slider.hasClass('uix-advanced-slider-sp--eff-parallax')) {
        if (loop) {
          if (elementIndex == 0) dir = 'prev';
        }
      }
      transitionInteractions(elementIndex, $items.filter('.leave').index(), slider, 'in', dir);
    }

    /*
     * Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
     *
     * @param  {Number} w                - The width that the canvas will be set.
     * @param  {Number} h                - The height that the canvas will be set.
     * @return {Void}
     */
    function fixCanvasTagSize(w, h) {
      TweenMax.to(['#' + rendererCanvasID, '.uix-advanced-slider-sp__wrapper', '.uix-advanced-slider-sp__inner', '.uix-advanced-slider-sp__canvas-container'], animSpeed / 1000, {
        width: w,
        height: h
      });
    }

    /*
     * Initialize the default height of canvas
     *
           * @param  {Element} slider                 - Selector of the slider .
     * @param  {Element} currentLlement         - Current selector of each slider.
     * @return {Void}
     */
    function canvasDefaultInit(slider, currentLlement) {
      if (currentLlement.find('video').length > 0) {
        //Returns the dimensions (intrinsic height and width ) of the video
        var video = document.getElementById(currentLlement.find('video').attr('id'));
        var videoURL = currentLlement.find('source:first').attr('src');
        if ((0,esm_typeof/* default */.Z)(videoURL) === ( true ? "undefined" : 0)) videoURL = currentLlement.attr('src');
        video.addEventListener('loadedmetadata', function (e) {
          //At the same time change the height of the canvas and slider container
          var h = this.videoHeight * (currentLlement.closest('.uix-advanced-slider__outline').width() / this.videoWidth);
          if (Modernizr.webgl) {
            renderer.view.style.height = h + 'px';
          }

          //---
          slider.css('height', h + 'px');
        }, false);
        video.src = videoURL;
      } else {
        var imgURL = currentLlement.find('img').attr('src');
        if ((0,esm_typeof/* default */.Z)(imgURL) != ( true ? "undefined" : 0)) {
          var img = new Image();
          img.onload = function () {
            if (Modernizr.webgl) {
              renderer.view.style.height = currentLlement.find('img').height() + 'px';
            }
            //---
            slider.css('height', currentLlement.closest('.uix-advanced-slider__outline').width() * (this.height / this.width) + 'px');
          };
          img.src = imgURL;
        }
      }
    }

    /*
     * Canvas Transition Interactions
     * @http://pixijs.download/dev/docs/index.html
     *
     * @param  {Number} elementIndex           - Index of current slider.
     * @param  {Number} prevElementIndex       - Index of previous slider.
     * @param  {Element} slider                 - Selector of the slider.
     * @param  {String} goType                 - The type of entry and exit between two items.  
                                                 Optional values: in, out
     * @param  {String} dir                    - Switching direction indicator.	 
     * @return {Void}
     */
    function transitionInteractions(elementIndex, prevElementIndex, slider, goType, dir) {
      if (Modernizr.webgl) {
        var $myRenderer = $('#' + rendererOuterID),
          $current = slider.find('.uix-advanced-slider-sp__item').eq(elementIndex),
          $allItems = slider.find('.uix-advanced-slider-sp__item'),
          imgSel = $current.find('img'),
          curImgURL = imgSel.attr('src'),
          stageW = slider.width(),
          stageH = slider.height(),
          spTotal = slider.find('.uix-advanced-slider-sp__item').length;
        elementIndex = parseFloat(elementIndex);
        prevElementIndex = parseFloat(prevElementIndex);

        //----------------------------------------------------------------------------------
        //--------------------------------- Brightness Effect -------------------------------	
        //----------------------------------------------------------------------------------
        if (slider.hasClass('uix-advanced-slider-sp--eff-brightness')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          });

          //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	
          if (goType == 'out') {
            //Current item leaving action

            TweenMax.to(renderer.stage.children[elementIndex], animSpeed / 1000, {
              pixi: {
                brightness: 5
              },
              alpha: 1
            });
          } else {
            //Current item entry action
            TweenMax.to($myRenderer, animSpeed / 1000, {
              alpha: 0,
              onComplete: function onComplete() {
                var curSp = renderer.stage.children[elementIndex];
                TweenMax.to(this.target, animSpeed / 1000, {
                  alpha: 1
                });

                //display the current item
                for (var k = 0; k < spTotal; k++) {
                  var obj = renderer.stage.children[k];
                  TweenMax.set(obj, {
                    alpha: 0
                  });

                  //pause all videos
                  if (obj._texture.baseTexture.imageType == null) {
                    var videoSource = obj.texture.baseTexture.resource.source;

                    // play the video
                    videoSource.currentTime = 0;
                    videoSource.autoplay = false;
                    if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                    videoSource.muted = true;
                  }
                }

                //play current video
                if (curSp._texture.baseTexture.imageType == null) {
                  var videoSource2 = curSp.texture.baseTexture.resource.source;

                  // play the video
                  videoSource2.currentTime = 0;
                  videoSource2.autoplay = true;
                  if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                  videoSource2.muted = false;
                }

                //Reset the height of the canvas when each item is switched
                //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
                //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
                fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]);

                //display filters
                TweenMax.set(curSp, {
                  pixi: {
                    brightness: 5
                  },
                  alpha: 1,
                  onComplete: function onComplete() {
                    TweenMax.to(this.target, animSpeed / 1000, {
                      pixi: {
                        brightness: 1
                      }
                    });
                    TweenMax.to($current, animSpeed / 1000, {
                      alpha: 1
                    });
                  }
                });
              }
            });
          }
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect -----------------------
        //----------------------------------------------------------------------------------
        if (slider.hasClass('uix-advanced-slider-sp--eff-liquid')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          });
          var curSp = container__items.children[elementIndex],
            prevSp = container__items.children[prevElementIndex];

          //Display the current item
          //-------------------------------------
          if (!slider.hasClass('js-init-ok')) {
            for (var k = 0; k < spTotal; k++) {
              var obj = container__items.children[k];
              TweenMax.set(obj, {
                alpha: 0
              });
            }

            //Avoid repeated initialization
            slider.addClass('js-init-ok');
          }

          //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	
          if (goType == 'out') {
            //Current item leaving action
          } else {
            //Video sprite initialization
            //Need to ensure that the video tag exists
            setTimeout(function () {
              for (var _k = 0; _k < spTotal; _k++) {
                var _obj = container__items.children[_k];

                //pause all videos
                if (_obj._texture.baseTexture.imageType == null) {
                  var videoSource = _obj.texture.baseTexture.resource.source;

                  // play the video
                  videoSource.currentTime = 0;
                  videoSource.autoplay = false;
                  if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                  videoSource.muted = true;
                }
              }

              //play current video
              if (curSp._texture.baseTexture.imageType == null) {
                var videoSource2 = curSp.texture.baseTexture.resource.source;

                // play the video
                videoSource2.currentTime = 0;
                videoSource2.autoplay = true;
                if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                videoSource2.muted = false;
              }

              //Reset the height of the canvas when each item is switched
              //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
              //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
              fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]);
            }, 100);

            //Current item entry action
            var baseTimeline = new TimelineMax({
              onComplete: function onComplete() {
                displacementSprite.scale.set(1);
              },
              onUpdate: function onUpdate() {
                displacementSprite.rotation += baseTimeline.progress() * 0.02;
                displacementSprite.scale.set(baseTimeline.progress() * 3);
              }
            });
            baseTimeline.clear();
            if (baseTimeline.isActive()) {
              return;
            }
            baseTimeline.to(displacementFilter.scale, animSpeed / 1000, {
              x: 300,
              y: 300,
              ease: Power1.easeOut
            }).to(prevSp, animSpeed / 2 / 1000, {
              alpha: 0,
              ease: Power2.easeOut
            }, animSpeed / 3 / 1000).to(curSp, animSpeed / 2 / 1000, {
              alpha: 1,
              ease: Power2.easeOut
            }, animSpeed / 2 / 1000).to(displacementFilter.scale, animSpeed / 1000, {
              x: 0,
              y: 0,
              ease: Power2.easeOut
            }, animSpeed / 2 / 1000).to($current, animSpeed / 1000, {
              alpha: 1,
              ease: Power2.easeOut
            }, 'final');

            //Add new ripple each time mouse
            //-------------------------------------
            slider[0].addEventListener("mousedown", function (e) {
              TweenMax.to(displacementFilter.scale, 1, {
                x: "+=" + Math.sin(e.pageX) * 100 + "",
                y: "+=" + Math.cos(e.pageY) * 100 + ""
              });
              rotateSpite();
            });
            slider[0].addEventListener("mouseup", function (e) {
              TweenMax.to(displacementFilter.scale, 1, {
                x: 0,
                y: 0
              });
            });
            var rotateSpite = function rotateSpite() {
              displacementFilter.rotation += 0.001;
            };
          }
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 2 -----------------------
        //----------------------------------------------------------------------------------
        if (slider.hasClass('uix-advanced-slider-sp--eff-liquid2')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          });

          //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	
          if (goType == 'out') {
            //Current item leaving action

            TweenMax.to(displacementSprite.scale, 1, {
              x: 10
            });
          } else {
            //Current item entry action
            TweenMax.to($myRenderer, animSpeed / 1000, {
              alpha: 0,
              onComplete: function onComplete() {
                var curSp = container__items.children[elementIndex];
                TweenMax.to(this.target, animSpeed / 1000, {
                  alpha: 1
                });

                //display the current item
                for (var _k2 = 0; _k2 < spTotal; _k2++) {
                  var _obj2 = container__items.children[_k2];
                  TweenMax.set(_obj2, {
                    alpha: 0
                  });

                  //pause all videos
                  if (_obj2._texture.baseTexture.imageType == null) {
                    var videoSource = _obj2.texture.baseTexture.resource.source;

                    // play the video
                    videoSource.currentTime = 0;
                    videoSource.autoplay = false;
                    if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                    videoSource.muted = true;
                  }
                }

                //play current video
                if (curSp._texture.baseTexture.imageType == null) {
                  var videoSource2 = curSp.texture.baseTexture.resource.source;

                  // play the video
                  videoSource2.currentTime = 0;
                  videoSource2.autoplay = true;
                  if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                  videoSource2.muted = false;
                }

                //Reset the height of the canvas when each item is switched
                //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
                //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
                fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]);

                //display filters

                //sprite
                var baseTimeline = new TimelineMax({
                  delay: 0,
                  paused: false,
                  repeat: 0,
                  onRepeat: function onRepeat() {},
                  onComplete: function onComplete() {
                    TweenMax.to(displacementSprite.scale, 1, {
                      x: 1,
                      y: 1
                    });
                    TweenMax.to(displacementSprite, 1, {
                      rotation: 0
                    });
                  },
                  onUpdate: function onUpdate() {
                    displacementSprite.scale.set(baseTimeline.progress() * 13);
                    displacementSprite.rotation += baseTimeline.progress() * 0.02;
                  }
                });
                baseTimeline.clear();

                //filter
                baseTimeline.to(displacementFilter.scale, animSpeed / 1000, {
                  y: "+=" + 200 + "",
                  ease: Power3.easeOut
                }).to(curSp, animSpeed / 2 / 1000, {
                  alpha: 1,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to(displacementFilter.scale, animSpeed / 1000, {
                  y: 0,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to($current, animSpeed / 1000, {
                  alpha: 1,
                  ease: Power2.easeOut
                }, 'final');
              }
            });

            //Add new ripple each time mouse is clicked/mousemoved
            //-------------------------------------
            document.addEventListener("mousemove", function (e) {
              TweenMax.to(displacementFilter.scale, 1, {
                x: e.pageX / 2 + ""
              });
            });
          }
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Liquid Distortion Effect 3 -----------------------
        //----------------------------------------------------------------------------------
        if (slider.hasClass('uix-advanced-slider-sp--eff-liquid3')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          });

          //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	
          if (goType == 'out') {
            //Current item leaving action

            TweenMax.to(displacementSprite, 1, {
              x: 23,
              y: 10
            });
          } else {
            //Current item entry action
            TweenMax.to($myRenderer, animSpeed / 1000, {
              alpha: 0,
              onComplete: function onComplete() {
                var curSp = container__items.children[elementIndex];
                TweenMax.to(this.target, animSpeed / 1000, {
                  alpha: 1
                });

                //display the current item
                for (var _k3 = 0; _k3 < spTotal; _k3++) {
                  var _obj3 = container__items.children[_k3];
                  TweenMax.set(_obj3, {
                    alpha: 0
                  });

                  //pause all videos
                  if (_obj3._texture.baseTexture.imageType == null) {
                    var videoSource = _obj3.texture.baseTexture.resource.source;

                    // play the video
                    videoSource.currentTime = 0;
                    videoSource.autoplay = false;
                    if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                    videoSource.muted = true;
                  }
                }

                //play current video
                if (curSp._texture.baseTexture.imageType == null) {
                  var videoSource2 = curSp.texture.baseTexture.resource.source;

                  // play the video
                  videoSource2.currentTime = 0;
                  videoSource2.autoplay = true;
                  if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                  videoSource2.muted = false;
                }

                //Reset the height of the canvas when each item is switched
                //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
                //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
                fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]);

                //display filters

                //sprite
                var baseTimeline = new TimelineMax({
                  delay: 0,
                  paused: false,
                  repeat: 0,
                  onRepeat: function onRepeat() {},
                  onComplete: function onComplete() {},
                  onUpdate: function onUpdate() {}
                });
                baseTimeline.clear();

                //filter
                baseTimeline.to(displacementFilter.scale, animSpeed / 1000, {
                  y: "+=" + 50 + "",
                  ease: Power3.easeOut
                }).to(curSp, animSpeed / 2 / 1000, {
                  alpha: 1,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to(displacementFilter.scale, animSpeed / 1000, {
                  y: 0,
                  ease: Power3.easeOut
                }, animSpeed / 2 / 1000).to($current, animSpeed / 1000, {
                  alpha: 1,
                  ease: Power2.easeOut
                }, 'final');
              }
            });
          }
        } // end effect

        //----------------------------------------------------------------------------------
        //--------------------------------- Parallax Effect -----------------------------
        //----------------------------------------------------------------------------------
        if (slider.hasClass('uix-advanced-slider-sp--eff-parallax')) {
          //Hide description container of item
          //-------------------------------------
          TweenMax.to($allItems, animSpeed / 1000, {
            alpha: 0
          });

          //Prevent text overlap when switching quickly
          $allItems.attr('data-text-eff-enable', 0);
          $current.attr('data-text-eff-enable', 1);
          var curSpParallax = container__items.children[elementIndex],
            prevSpParallax = container__items.children[prevElementIndex];

          //Display the current item
          //-------------------------------------
          if (!slider.hasClass('js-init-ok')) {
            for (var m = 0; m < spTotal; m++) {
              var objParallax = container__items.children[m];
              TweenMax.set(objParallax.mask, {
                x: renderer.view.width
              });
            }

            //Avoid repeated initialization
            slider.addClass('js-init-ok');
          }

          //Display wrapper of canvas (transitions between slides)
          //-------------------------------------	
          if (goType == 'out') {
            //Current item leaving action
          } else {
            //Video sprite initialization
            //Need to ensure that the video tag exists
            setTimeout(function () {
              for (var _m = 0; _m < spTotal; _m++) {
                var _obj4 = container__items.children[_m];

                //pause all videos
                if (_obj4._texture.baseTexture.imageType == null) {
                  var videoSource = _obj4.texture.baseTexture.resource.source;

                  // play the video
                  videoSource.currentTime = 0;
                  videoSource.autoplay = false;
                  if (Object.prototype.toString.call(videoSource.pause) == '[object Function]') videoSource.pause();
                  videoSource.muted = true;
                }
              }

              //play current video
              if (curSpParallax._texture.baseTexture.imageType == null) {
                var videoSource2 = curSpParallax.texture.baseTexture.resource.source;

                // play the video
                videoSource2.currentTime = 0;
                videoSource2.autoplay = true;
                if (Object.prototype.toString.call(videoSource2.play) == '[object Function]') videoSource2.play();
                videoSource2.muted = false;
              }

              //Reset the height of the canvas when each item is switched
              //Fixed image width adaptation problem for Advanced Slider (on HTML tag <canvas>)
              //console.log( 'width: ' + windowWidth + ' | height: ' + canvasHeights[ elementIndex ] + ' | index: ' + elementIndex );
              fixCanvasTagSize(windowWidth, canvasHeights[elementIndex]);
            }, 100);

            //Current item entry action
            var restoreX,
              offsetX = renderer.view.width / 6,
              parallaxSpeed = animSpeed / 1000,
              restoreItems = function restoreItems() {
                //restore other items besides the current item
                for (var n = 0; n < spTotal; n++) {
                  var _objParallax = container__items.children[n];
                  if (elementIndex != n) _objParallax.mask.x = restoreX;
                }
              },
              goNextItem = function goNextItem() {
                // Paralax effect on current slide
                TweenMax.set(curSpParallax, {
                  alpha: 1,
                  //Avoid error texture rendering errors ***!Important***
                  onComplete: function onComplete() {
                    TweenMax.to(this.target, parallaxSpeed, {
                      x: 0,
                      ease: Power2.easeInOut
                    });
                  }
                });

                // Current Mask animation
                TweenMax.to(curSpParallax.mask, parallaxSpeed, {
                  x: 0,
                  ease: Power4.easeInOut,
                  onComplete: function onComplete() {
                    restoreItems();
                  }
                });
                setTimeout(function () {
                  //text effect
                  if ($.isFunction($.fn.UixTextEff)) {
                    $current.find('[data-text-eff]').each(function (index) {
                      $(document).UixTextEff({
                        selectors: '[data-text-eff="' + $(this).data('text-eff') + '"]',
                        scrollSpy: false
                      });
                    });
                  }

                  //Prevent text overlap when switching quickly
                  $allItems.each(function () {
                    if ($(this).attr('data-text-eff-enable') == 1) {
                      TweenMax.to($(this), parallaxSpeed, {
                        alpha: 1,
                        delay: parallaxSpeed / 2
                      });
                    } else {
                      TweenMax.to($(this), parallaxSpeed, {
                        alpha: 0,
                        delay: parallaxSpeed / 2
                      });
                    }
                  });
                }, parallaxSpeed * 1000 / 2);
              };

            // Direction handler
            if (dir == 'next') {
              curSpParallax.x = offsetX;
              curSpParallax.mask.x = renderer.view.width;
              restoreX = renderer.view.width;

              // Paralax effect on current slide
              TweenMax.to(prevSpParallax, parallaxSpeed, {
                x: -offsetX,
                ease: Power2.easeInOut
              });
            } else {
              curSpParallax.x = -offsetX;
              curSpParallax.mask.x = -(renderer.view.width + curSpParallax.x);
              restoreX = -renderer.view.width;

              // Paralax effect on previous slide
              TweenMax.to(prevSpParallax, parallaxSpeed, {
                x: offsetX,
                ease: Power2.easeInOut
              });

              // Previous Mask animation
              TweenMax.to(prevSpParallax.mask, parallaxSpeed, {
                x: renderer.view.width,
                ease: Power4.easeInOut
              });
            }
            goNextItem();
          }
        } // end effect		
      } else {
        slider.find('.uix-advanced-slider-sp__item canvas').hide();
      }
    }

    /*
     * Initialize embedded local video.
     *
     * @param  {Element} wrapper          - The outermost video container, which can contain multiple videos
     * @param  {Boolean} play            - Forced to trigger pause or play events.
     * @return {Void}
     */
    function normalSliderVideoInit(wrapper, play) {
      wrapper.find('.uix-video__slider').each(function () {
        var $this = $(this);
        var videoWrapperW = $this.closest('.uix-advanced-slider__outline').width(),
          curVideoID = $this.find('video').attr('id') + '-slider-videopush',
          coverPlayBtnID = 'videocover-' + curVideoID,
          $replayBtn = $('#' + curVideoID + '-replay-btn');
        var dataControls = $this.data('embed-video-controls'),
          dataAuto = $this.data('embed-video-autoplay'),
          dataLoop = $this.data('embed-video-loop'),
          dataW = $this.data('embed-video-width'),
          dataH = $this.data('embed-video-height');

        //Push a new ID to video
        //Solve the problem that ajax asynchronous loading does not play
        $this.find('.video-js').attr('id', curVideoID);
        if ((0,esm_typeof/* default */.Z)(dataAuto) === ( true ? "undefined" : 0)) {
          dataAuto = true;
        }
        if ((0,esm_typeof/* default */.Z)(dataLoop) === ( true ? "undefined" : 0)) {
          dataLoop = true;
        }
        if ((0,esm_typeof/* default */.Z)(dataControls) === ( true ? "undefined" : 0)) {
          dataControls = false;
        }
        if ((0,esm_typeof/* default */.Z)(dataW) === ( true ? "undefined" : 0) || dataW == 'auto') {
          dataW = videoWrapperW;
        }
        if ((0,esm_typeof/* default */.Z)(dataH) === ( true ? "undefined" : 0) || dataH == 'auto') {
          dataH = videoWrapperW / 1.77777777777778;
        }

        //Display cover and play buttons when some mobile device browsers cannot automatically play video
        if ($('#' + coverPlayBtnID).length == 0) {
          $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
          var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
            e.preventDefault();
            myPlayer.play();
            $('#' + coverPlayBtnID).hide();
          });
        }

        //Add replay button to video 
        if ($replayBtn.length == 0) {
          $this.after('<span class="uix-video__btn-play" id="' + curVideoID + '-replay-btn"></span>');
        }

        //HTML5 video autoplay on mobile revisited
        if (dataAuto && windowWidth <= 768) {
          $this.find('.video-js').attr({
            'autoplay': 'true',
            'muted': 'true',
            'playsinline': 'true'
          });
        }
        var myPlayer = videojs(curVideoID, {
          width: dataW,
          height: dataH,
          loop: dataLoop,
          autoplay: dataAuto
        }, function onPlayerReady() {
          var initVideo = function initVideo(obj) {
            //Get Video Dimensions
            var curW = obj.videoWidth(),
              curH = obj.videoHeight(),
              newW = curW,
              newH = curH;
            newW = videoWrapperW;

            //Scaled/Proportional Content 
            newH = curH * (newW / curW);
            if (!isNaN(newW) && !isNaN(newH)) {
              obj.height(newH);
              obj.width(newW);
              $this.css('height', newH);
            }

            //Show this video wrapper
            $this.css('visibility', 'visible');

            //Hide loading effect
            $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
          };

          /* ---------  Video initialize */
          this.on('loadedmetadata', function () {
            initVideo(this);
          });

          /* ---------  Display the play button  */
          if (!dataAuto) $this.find('.vjs-big-play-button').show();
          $this.find('.vjs-big-play-button').off('click').on('click', function () {
            $(this).hide();
          });

          /* ---------  Set, tell the player it's in fullscreen  */
          if (dataAuto) {
            //Fix an error of Video auto play is not working in browser
            this.muted(true);

            //Prevent autoplay error: Uncaught (in promise) DOMException
            var promise = this.play();
            if (promise !== undefined) {
              promise.then(function () {
                // Autoplay started!
              })["catch"](function (error) {
                // Autoplay was prevented.
                $('#' + coverPlayBtnID).show();
                $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                console.log('Autoplay was prevented.');
              });
            }
          }

          /* ---------  Disable control bar play button click */
          if (!dataControls) {
            this.controls(false);
          }

          /* ---------  Determine if the video is auto played from mobile devices  */
          var autoPlayOK = false;
          this.on('timeupdate', function () {
            var duration = this.duration();
            if (duration > 0) {
              autoPlayOK = true;
              if (this.currentTime() > 0) {
                autoPlayOK = true;
                this.off('timeupdate');

                //Hide cover and play buttons when the video automatically played
                $('#' + coverPlayBtnID).hide();
              }
            }
          });

          /* ---------  Pause the video when it is not current slider  */
          if (!play) {
            this.pause();
            this.currentTime(0);
          } else {
            //Unmute, because there is interaction, you can turn on the audio.
            this.muted(false);
            if (dataAuto) {
              this.currentTime(0);

              //Prevent autoplay error: Uncaught (in promise) DOMException
              var _promise = this.play();
              if (_promise !== undefined) {
                _promise.then(function () {
                  // Autoplay started!
                })["catch"](function (error) {
                  // Autoplay was prevented.
                  $('#' + coverPlayBtnID).show();
                  $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                  console.log('Autoplay was prevented.');
                });
              }

              //Hidden replay button
              $replayBtn.hide();

              //Should the video go to the beginning when it ends
              this.on('ended', function () {
                if (dataLoop) {
                  this.currentTime(0);
                  this.play();
                } else {
                  //Replay this video
                  this.currentTime(0);
                  $replayBtn.show().off('click').on('click', function (e) {
                    e.preventDefault();
                    this.play();
                    $replayBtn.hide();
                  });
                }
              });
            }
          }
        });
      });
    }
  };
  module.components.pageLoaded.push(module.ADVANCED_SLIDER_FILTER.pageLoaded);
  return /*#__PURE__*/_createClass(function ADVANCED_SLIDER_FILTER() {
    _classCallCheck(this, ADVANCED_SLIDER_FILTER);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/AJAX-push/js/index.js



/* 
 *************************************
 * <!-- Ajax Push Content  -->
 *************************************
 */


var AJAX_PUSH_CONTENT = function (module, $, window, document) {
  if (window.AJAX_PUSH_CONTENT === null) return false;
  module.AJAX_PUSH_CONTENT = module.AJAX_PUSH_CONTENT || {};
  module.AJAX_PUSH_CONTENT.version = '0.1.9';
  module.AJAX_PUSH_CONTENT.documentReady = function ($) {
    // trigger of AJAX request
    var AJAXPageLinks = '[data-ajax-push-content]';

    //all images from pages
    var sources = [];

    //Added timer to prevent page loading errors for a long time
    var timeClockInit;

    /* Need to set it as a global variable for history */
    var ajaxConfig = {
        "container": "#my-ajax-demo-push-container",
        "target": "#my-ajax-demo-target-container",
        "loading": "<div class=\"my-loader\"><span><i class=\"fa fa-spinner fa-spin\"></i> loading <em id=\"app-loading\" data-txt=\"{progress}%\"></em>...</span></div>",
        "method": "POST"
      },
      thisPageTitle = document.title;

    // The progress of each page load, using global variables to accurately determine
    var loadedProgress = 0;

    //loading animation
    var loadingAnim = function loadingAnim(per) {
      $('#app-loading').text($('#app-loading').data('txt').replace(/\{progress\}/g, per));
    };

    //Click event
    $(document).off('click.AJAX_PUSH_CONTENT').on('click.AJAX_PUSH_CONTENT', AJAXPageLinks, function (event) {
      event.preventDefault();

      // The progress of each page load
      loadedProgress = 0;

      //
      var $this = $(this);
      var curURL = $this.attr('href'),
        config = $this.data('ajax-push-content');
      if ((0,esm_typeof/* default */.Z)(config) == ( true ? "undefined" : 0)) {
        config = ajaxConfig;
      }

      //The currently URL of link
      if ((0,esm_typeof/* default */.Z)(curURL) === ( true ? "undefined" : 0)) {
        curURL = $this.closest('a').attr('href');
      }

      //Prevent multiple request on click
      if ($this.data('request-running')) {
        return;
      }
      $this.data('request-running', true);

      // Modify the URL without reloading the page
      if (history.pushState) {
        history.pushState(null, null, curURL);
      } else {
        location.hash = curURL;
      }

      //Click on this link element using an AJAX request
      pushAction($(config.container), config.target, config.loading, curURL, config.method, $this);
      return false;
    });

    //Detect URL change & Fire click event
    window.addEventListener('popstate', function (e) {
      var eleTarget = null,
        goURL = location.href;
      $(AJAXPageLinks).each(function () {
        //don't use $( this ).attr( 'href' )
        if (this.href === location.href) {
          eleTarget = this;
          goURL = this.href;
        }
      });

      //Empty content that does not exist
      if (eleTarget == null) {
        $(AJAXPageLinks).each(function () {
          var curConfig = $(this).data('ajax-push-content');
          if ((0,esm_typeof/* default */.Z)(curConfig) != ( true ? "undefined" : 0)) {
            $(curConfig.container).html('');
          }
        });
      }

      //Push new content to target container
      var backConfig = $(eleTarget).data('ajax-push-content');
      if ((0,esm_typeof/* default */.Z)(backConfig) != ( true ? "undefined" : 0)) {
        pushAction($(backConfig.container), backConfig.target, backConfig.loading, goURL, backConfig.method, $(eleTarget));
      }

      // Output history button
      //console.log(  $( eleTarget ).data( 'ajax-push-content' ) );
    });

    /*
     * Move Animation
     *
     * @param  {Element} container       - The target container to which the content will be added.
     * @param  {String|Boolean} target  - The instance ID or class name returned from the callback data. If it is "false", the push content is empty.
     * @param  {String} loading         - Content of loading area.
     * @param  {String} url             - The target URL via AJAX. 
     * @param  {String} method          - The HTTP method to use for the request (e.g. "POST", "GET", "PUT")
     * @param  {?Element|Boolean} btn     - Current trigger button. Avoid button events if "false".
     * @return {Void}
     */
    function pushAction(container, target, loading, url, method, btn) {
      if (container.length == 0) return false;
      if ((0,esm_typeof/* default */.Z)(method) === ( true ? "undefined" : 0) || method == '') {
        method = 'POST';
      }

      // Add a request or response interceptor
      var axiosInterceptor = axios.interceptors.request.use(function (config) {
        // Do something before request is sent

        //Display loader
        showLoader(container, loading);

        //
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

      // To send data in the application/x-www-form-urlencoded format instead
      var formData = new FormData();
      var defaultPostData = {
        action: 'load_singlepages_ajax_content'
      };
      for (var k in defaultPostData) {
        formData.append(k, defaultPostData[k]);
      }

      // Create a request event
      axios({
        timeout: 15000,
        method: method,
        url: url,
        data: formData,
        responseType: 'text'
      }).then(function (response) {
        var htmlCode = response.data;

        //A function to be called if the request succeeds
        var pushContent = !target ? '' : $(htmlCode).find(target).html();

        //Display loading image when AJAX call is in progress

        //Remove existing images
        sources = [];

        //Push all images from page
        $(htmlCode).find('img').each(function () {
          sources.push({
            "url": this.src,
            "id": 'img-' + UixGUID.create(),
            "type": 'img'
          });
        });

        //Push all videos from page
        $(htmlCode).find('.uix-video__slider > video').each(function () {
          var _src = $(this).find('source:first').attr('src');
          if ((0,esm_typeof/* default */.Z)(_src) === ( true ? "undefined" : 0)) _src = $(this).attr('src');
          sources.push({
            "url": _src,
            "id": 'video-' + UixGUID.create(),
            "type": 'video'
          });
        });

        //Execute after all images have loaded
        var per;
        var perInit = 1;
        if (sources.length == 0) {
          per = 100;

          //loading animation
          loadingAnim(per);

          //Remove loader
          hideLoader(container, $(htmlCode).filter('title').text(), btn, htmlCode);
        }
        var loadImages = function loadImages() {
          var promises = [];
          var _loop = function _loop(i) {
            if (sources[i].type == 'img') {
              ///////////
              // IMAGE //
              ///////////   

              promises.push(new Promise(function (resolve, reject) {
                var img = document.createElement("img");
                img.src = sources[i].url;
                img.onload = function (image) {
                  //Compatible with safari and firefox
                  if ((0,esm_typeof/* default */.Z)(image.path) === ( true ? "undefined" : 0)) {
                    return resolve(image.target.currentSrc);
                  } else {
                    return resolve(image.path[0].currentSrc);
                  }
                };
              }).then(textureLoaded));
            } else {
              ///////////
              // VIDEO //
              ///////////    

              promises.push(new Promise(function (resolve, reject) {
                $('#' + sources[i].id).one('loadedmetadata', resolve);
                return resolve(sources[i].url);
              }).then(textureLoaded));
            }
          };
          for (var i = 0; i < sources.length; i++) {
            _loop(i);
          }
          return Promise.all(promises);
        };
        var textureLoaded = function textureLoaded(url) {
          //loading
          per = parseInt(100 * (perInit / sources.length));
          console.log('progress: ' + per + '%');
          if (isNaN(per)) per = 100;

          // The progress of each page load
          loadedProgress = per;

          //loading animation
          loadingAnim(per);
          var texture = null;
          perInit++;
          return per;
        };
        var func = function func() {
          ajaxSucceeds(container, pushContent, $(htmlCode).filter('title').text(), btn);
        };

        //images loaded
        //Must be placed behind the loadImages()
        loadImages().then(function (images) {
          clearInterval(timeClockInit);
          func();
        });

        //Calculating page load time
        var timeLimit = 10,
          timeStart = new Date().getTime();

        //Prevent duplicate runs when returning to this page
        if (timeClockInit) {
          clearInterval(timeClockInit);
        }
        timeClockInit = setInterval(function () {
          //Converting milliseconds to minutes and seconds
          var _time = (new Date().getTime() - timeStart) / 1000;
          if (_time >= timeLimit) {
            console.log('Page load timeout!');

            //Remove loader
            if (htmlCode.indexOf('<body') >= 0) {
              window.location.href = location.href;
            } else {
              hideLoader(container, $(htmlCode).filter('title').text(), btn, htmlCode);
            }

            // clear loader event
            clearInterval(timeClockInit);
            func();
          }
        }, 500);
      })["catch"](function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          var status = error.response.status;
          console.log(status);
          if (status == 404 || status == 405) window.location.href = url;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);

          //
          window.location.href = url;
        } else {
          // If there was a problem, we need to
          // dispatch the error condition
          console.log(error.message);
        }
      });

      // Remove an interceptor later
      axios.interceptors.request.eject(axiosInterceptor);
    }

    /*
     * A function to be called if the request succeeds
     *
     * @param  {String} container    - The target container to which the content will be added.
     * @param  {String} content      - The data returned from the server
     * @param  {String} title        - The title of a requested page.
     * @param  {?Element} btn          - Current trigger button.
     * @return {Void}
     */
    function ajaxSucceeds(container, content, title, btn) {
      //If the page resource is not loaded, then the following code is not executed
      if (loadedProgress < 100) return false;

      //Remove loader
      hideLoader(container, title, btn, content);
    }

    /*
     * Remove loader
     *
           * @param  {Element} container - The instance returned from the request succeeds
           * @param  {String} title      - The title of a requested page.
     * @param  {?Element} btn      - Current trigger button.
           * @param  {String} content    - The data returned from the server
     * @return {Void}
     */
    function hideLoader(container, title, btn, content) {
      TweenMax.to(container.find('.ajax-content-loader'), 0.5, {
        alpha: 0,
        onComplete: function onComplete() {
          TweenMax.set(this.target, {
            css: {
              'display': 'none'
            }
          });

          //The data returned from the server
          container.html(content).promise().done(function () {
            // Apply some asynchronism scripts
            $(document).UixApplyAsyncScripts();

            //Change the page title
            if (title) {
              document.title = title;
            }

            //Prevent multiple request on click
            if (btn) {
              btn.data('request-running', false);
            }
          });
        },
        //Determine the direction of a jQuery scroll event
        //Fix an issue for mousewheel event is too fast.
        delay: 0.5
      });
    }

    /*
     * Display loader
     *
     * @param  {Element} container       - The target container to which the content will be added.
     * @param  {String} loading         - Content of loading area.
     * @return {Void}
     */
    function showLoader(container, loading) {
      TweenMax.to(container.find('.ajax-content-loader'), 0.3, {
        css: {
          opacity: 1
        },
        ease: Power2.easeOut
      });
      container.html('<div class="ajax-content-loader">' + loading + '</div>').promise().done(function () {
        //loading animation
        loadingAnim(0);

        //loader effect from AJAX request
        TweenMax.set(container.find('.ajax-content-loader'), {
          css: {
            'display': 'block'
          },
          onComplete: function onComplete() {
            TweenMax.to(this.target, 0.5, {
              alpha: 1
            });
          }
        });
      });
    }
  };
  module.components.documentReady.push(module.AJAX_PUSH_CONTENT.documentReady);
  return /*#__PURE__*/_createClass(function AJAX_PUSH_CONTENT() {
    _classCallCheck(this, AJAX_PUSH_CONTENT);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/AJAX/js/index.js



/* 
 *************************************
 * <!-- Ajax Page Loader (Loading A Page via Ajax Into Div)  -->
 *************************************
 */



var AJAX_PAGE_LOADER = function (module, $, window, document) {
  if (window.AJAX_PAGE_LOADER === null) return false;
  module.AJAX_PAGE_LOADER = module.AJAX_PAGE_LOADER || {};
  module.AJAX_PAGE_LOADER.version = '0.2.1';
  module.AJAX_PAGE_LOADER.documentReady = function ($) {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    //all images from pages
    var sources = [];

    //Added timer to prevent page loading errors for a long time
    var timeClockInit;

    //Determine the direction of a jQuery scroll event
    //Fix an issue for mousewheel event is too fast.
    var quietPeriod = 500,
      //Do not change it
      animationTime = 1000,
      //According to page transition animation changes
      loaderRemoveDelay = 500,
      AJAXPageLinks = '[data-ajax-page]',
      $navs = $(AJAXPageLinks).parent().parent().find('li'),
      total = $navs.length,
      $sectionsContainer = $('.uix-ajax-load__fullpage-container'),
      ajaxContainer = '.ajax-container',
      curAjaxPageID = $(ajaxContainer).data('ajax-page-id');
    var lastAnimation = 0;

    // The progress of each page load, using global variables to accurately determine
    var loadedProgress = 0;

    //loading animation
    var loadingAnim = function loadingAnim(per) {
      $('#app-loading').text($('#app-loading').data('txt').replace(/\{progress\}/g, per));
    };

    //Prevent this module from loading in other pages
    if ($sectionsContainer.length == 0) return false;

    /* 
     ====================================================
     *  Navigation Interaction
     ====================================================
     */

    //Activate the first item
    if ($('.js-uix-ajax-load__container').length == 0) {
      moveTo($(ajaxContainer), false, 'down', 0, false);
    } else {
      //Activate navigation from AJAX request
      if ((0,esm_typeof/* default */.Z)(curAjaxPageID) != ( true ? "undefined" : 0)) $navs.eq(curAjaxPageID).addClass('is-active');
    }

    /* 
     ====================================================
     *  AJAX Interaction
     ====================================================
     */
    /*
     * Initialize the clickable ajax links
     *
     * @return {Void}
     */
    function ajaxInit() {
      if (windowWidth <= 768) {
        $(AJAXPageLinks).data('mobile-running', true);
      } else {
        $(AJAXPageLinks).data('mobile-running', false);
      }
    }
    ajaxInit();
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        ajaxInit();
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);

    /*
     * Call AJAX on click event for "single pages links"
     *
     */
    $(document).off('click.AJAX_PAGE_LOADER').on('click.AJAX_PAGE_LOADER', AJAXPageLinks, function (e) {
      //Prevents third-party plug-ins from triggering
      if ($(this).data('mobile-running')) {
        return;
      }
      e.preventDefault();

      // The progress of each page load
      loadedProgress = 0;

      //
      var $this = $(this);
      var curIndex = $this.attr('data-index');
      var curURL = $this.attr('href');

      //The currently URL of link
      if ((0,esm_typeof/* default */.Z)(curURL) === ( true ? "undefined" : 0)) {
        curURL = $this.closest('a').attr('href');
      }

      //Prevent multiple request on click
      if ($(AJAXPageLinks).data('request-running')) {
        return;
      }
      $(AJAXPageLinks).data('request-running', true);

      // Modify the URL without reloading the page
      if (history.pushState) {
        history.pushState(null, null, curURL);
      } else {
        location.hash = curURL;
      }

      //Click on this link element using an AJAX request
      var dir = $navs.filter('.is-active').find('> a').attr('data-index') > curIndex ? 'up' : 'down';
      moveTo($(ajaxContainer), curURL, dir, curIndex, false);
      return false;
    });

    //Detect URL change & Fire click event
    window.addEventListener('popstate', function (e) {
      var eleTarget = null,
        goURL = location.href;
      $(AJAXPageLinks).each(function () {
        //don't use $( this ).attr( 'href' )

        if (this.href === location.href) {
          eleTarget = this;
          goURL = this.href;
        }
      });

      //Empty content that does not exist
      if (eleTarget == null) {
        moveTo($(ajaxContainer), false, 'down', 0, false);
      }

      //Push new content to target container
      var pageIndex = $(eleTarget).data('index');

      //Push new content to target container
      if ((0,esm_typeof/* default */.Z)(pageIndex) != ( true ? "undefined" : 0)) {
        moveTo($(ajaxContainer), goURL, 'down', pageIndex, false);
      }

      // Output history button
      //console.log(  $( eleTarget ).data( 'index' ) );
    });

    /*
     * Scroll initialize
     *
     * @param  {Event} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
     * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
     * @return {Void}
     */
    function scrollMoveInit(event, dir) {
      var timeNow = new Date().getTime();
      // Cancel scroll if currently animating or within quiet period
      if (timeNow - lastAnimation < quietPeriod + animationTime) {
        return;
      }
      if (dir == 'down') {
        //scroll down
        moveTo($(ajaxContainer), false, 'down', false, true);
      } else {
        //scroll up
        moveTo($(ajaxContainer), false, 'up', false, true);
      }
      lastAnimation = timeNow;
    }

    /*
     * Move Animation
     *
     * @param  {Element} container    - The instance returned from the request succeeds 
     * @param  {String} url          - The target URL via AJAX.
     * @param  {String} dir          - Rolling direction indicator.
     * @param  {Number} customIndex  - User-specified index value, located on the corresponding AJAX hyperlink.
     * @param  {Boolean} wheel       - Whether to enable mouse wheel control.
     * @return {Void}
     */
    function moveTo(container, url, dir, customIndex, wheel) {
      var index = parseFloat($navs.filter('.is-active').find('> a').attr('data-index'));
      var isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
      var nextIndex = null;

      //If there is a custom index, it is enabled first
      if (isNumeric.test(customIndex)) {
        nextIndex = customIndex;
      } else {
        if (dir == 'down' || dir === false) {
          nextIndex = index + 1;
        } else {
          nextIndex = index - 1;
        }
      }
      if (nextIndex <= parseFloat(total - 1) && nextIndex >= 0) {
        if (nextIndex > parseFloat(total - 1)) nextIndex = parseFloat(total - 1);
        if (nextIndex < 0) nextIndex = 0;

        //Prevents third-party plug-ins from triggering
        if ($navs.eq(nextIndex).find('> a').data('mobile-running')) {
          return;
        }

        //Activate navigation from AJAX request
        $navs.removeClass('is-active');
        $navs.eq(nextIndex).addClass('is-active');

        //Use automatic indexing when no URLs come in.
        if (!url || (0,esm_typeof/* default */.Z)(url) === ( true ? "undefined" : 0)) {
          url = $navs.eq(nextIndex).find('> a').attr('href');
        }

        // Modify the URL without reloading the page when mouse wheel
        if (wheel) {
          var turl = $navs.eq(nextIndex).find('> a').attr('href');
          if (history.pushState) {
            history.pushState(null, null, url);
          } else {
            location.hash = turl;
          }
        }

        //Click on this link element using an AJAX request
        // Add a request or response interceptor
        var axiosInterceptor = axios.interceptors.request.use(function (config) {
          // Do something before request is sent

          //Display loader
          showLoader();

          //
          return config;
        }, function (error) {
          return Promise.reject(error);
        });

        // To send data in the application/x-www-form-urlencoded format instead
        var formData = new FormData();
        var defaultPostData = {
          action: 'load_singlepages_ajax_content'
        };
        for (var k in defaultPostData) {
          formData.append(k, defaultPostData[k]);
        }

        /*
        // For multiple form fields data acquisition
        const formData = new FormData();
        const oldFormData = $this.serializeArray();
        oldFormData.forEach(function(item){
            formData.append(item.name, item.value);
        });
        formData.append('action', 'load_singlepages_ajax_content');
        */

        // Create a request event
        axios({
          timeout: 15000,
          method: (0,esm_typeof/* default */.Z)(container.data('ajax-method')) === ( true ? "undefined" : 0) ? 'POST' : container.data('ajax-method'),
          url: url,
          data: formData,
          responseType: 'text'
        }).then(function (response) {
          var htmlCode = response.data;

          //A function to be called if the request succeeds
          //Display loading image when AJAX call is in progress

          //Remove existing images
          sources = [];

          //Push all images from page
          $(htmlCode).find('img').each(function () {
            sources.push({
              "url": this.src,
              "id": 'img-' + UixGUID.create(),
              "type": 'img'
            });
          });

          //Push all videos from page
          $(htmlCode).find('.uix-video__slider > video').each(function () {
            var _src = $(this).find('source:first').attr('src');
            if ((0,esm_typeof/* default */.Z)(_src) === ( true ? "undefined" : 0)) _src = $(this).attr('src');
            sources.push({
              "url": _src,
              "id": 'video-' + UixGUID.create(),
              "type": 'video'
            });
          });

          //Execute after all images have loaded
          var per;
          var perInit = 1;
          if (sources.length == 0) {
            per = 100;

            //loading animation
            loadingAnim(per);

            //Remove loader
            var oldContent = container.html();
            hideLoader(container, $(htmlCode).filter('title').text(), dir, oldContent, htmlCode);
          }
          var loadImages = function loadImages() {
            var promises = [];
            var _loop = function _loop(i) {
              if (sources[i].type == 'img') {
                ///////////
                // IMAGE //
                ///////////   

                promises.push(new Promise(function (resolve, reject) {
                  var img = document.createElement("img");
                  img.src = sources[i].url;
                  img.onload = function (image) {
                    //Compatible with safari and firefox
                    if ((0,esm_typeof/* default */.Z)(image.path) === ( true ? "undefined" : 0)) {
                      return resolve(image.target.currentSrc);
                    } else {
                      return resolve(image.path[0].currentSrc);
                    }
                  };
                }).then(textureLoaded));
              } else {
                ///////////
                // VIDEO //
                ///////////    

                promises.push(new Promise(function (resolve, reject) {
                  $('#' + sources[i].id).one('loadedmetadata', resolve);
                  return resolve(sources[i].url);
                }).then(textureLoaded));
              }
            };
            for (var i = 0; i < sources.length; i++) {
              _loop(i);
            }
            return Promise.all(promises);
          };
          var textureLoaded = function textureLoaded(url) {
            //loading
            per = parseInt(100 * (perInit / sources.length));
            console.log('progress: ' + per + '%');
            if (isNaN(per)) per = 100;

            // The progress of each page load
            loadedProgress = per;

            //loading animation
            loadingAnim(per);
            var texture = null;
            perInit++;
            return per;
          };
          var func = function func() {
            ajaxSucceeds(dir, container, $(htmlCode).find('.js-uix-ajax-load__container').html(), $(htmlCode).filter('title').text());
          };

          //images loaded
          //Must be placed behind the loadImages()
          loadImages().then(function (images) {
            clearInterval(timeClockInit);
            func();
          });

          //Calculating page load time
          var timeLimit = 10,
            timeStart = new Date().getTime();

          //Prevent duplicate runs when returning to this page
          if (timeClockInit) {
            clearInterval(timeClockInit);
          }
          timeClockInit = setInterval(function () {
            //Converting milliseconds to minutes and seconds
            var _time = (new Date().getTime() - timeStart) / 1000;
            if (_time >= timeLimit) {
              console.log('Page load timeout!');

              //Remove loader
              if (htmlCode.indexOf('<body') >= 0) {
                window.location.href = location.href;
              } else {
                var _oldContent = container.html();
                hideLoader(container, $(htmlCode).filter('title').text(), dir, _oldContent, htmlCode);
              }

              // clear loader event
              clearInterval(timeClockInit);
              func();
            }
          }, 500);
        })["catch"](function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            var status = error.response.status;
            console.log(status);
            if (status == 404 || status == 405) window.location.href = url;
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);

            //
            window.location.href = url;
          } else {
            // If there was a problem, we need to
            // dispatch the error condition
            console.log(error.message);
          }
        });

        // Remove an interceptor later
        axios.interceptors.request.eject(axiosInterceptor);
      }
    }

    /*
     * A function to be called if the request succeeds
     *
     * @param  {String} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
     * @param  {Element} container - The instance returned from the request succeeds
     * @param  {String} content   - The data returned from the server
     * @param  {String} title        - The title of a requested page.
     * @return {Void}
     */
    function ajaxSucceeds(dir, container, content, title) {
      //If the page resource is not loaded, then the following code is not executed
      if (loadedProgress < 100) return false;

      //Remove loader
      var oldContent = container.html();
      hideLoader(container, title, dir, oldContent, content);
    }

    /*
     * Remove loader
     *
           * @param  {Element} container - The instance returned from the request succeeds
           * @param  {String} title     - The title of a requested page.
     * @param  {String} dir       - Gets a value that indicates the amount that the mouse wheel has changed.
     * @param  {String} oldContent   - The old data returned from the server
           * @param  {String} content   - The data returned from the server
     * @return {Void}
     */
    function hideLoader(container, title, dir, oldContent, content) {
      TweenMax.to('.uix-ajax-load__loader', 0.5, {
        alpha: 0,
        onComplete: function onComplete() {
          TweenMax.set(this.target, {
            css: {
              'display': 'none'
            }
          });

          //The data returned from the server
          container.html(content).promise().done(function () {
            //Transition effect between two elements.
            eleTransitionEff(dir, oldContent, content);

            //Change the page title
            if (title) {
              document.title = title;
            }

            //Prevent multiple request on click
            $(AJAXPageLinks).data('request-running', false);
          });
        },
        delay: loaderRemoveDelay / 1000
      });
    }

    /*
     * Display loader
     *
     * @return {Void}
     */
    function showLoader() {
      //loading animation
      loadingAnim(0);

      //loader effect from AJAX request
      TweenMax.set('.uix-ajax-load__loader', {
        css: {
          'display': 'block'
        },
        onComplete: function onComplete() {
          TweenMax.to(this.target, 0.5, {
            alpha: 1
          });
        }
      });
    }

    /*
     * Transition effect between two elements.
     *
     * @param  {String} dir            - Gets a value that indicates the amount that the mouse wheel has changed.
     * @param  {String} oldContent     - A string of HTML to set as the content of matched old element.
     * @param  {String} newContent     - A string of HTML to set as the content of matched new element.
     * @return {Void}
     */
    function eleTransitionEff(dir, oldContent, newContent) {
      var $originalItem = $sectionsContainer.find('> section'),
        $cloneItem = $originalItem.clone();

      //Reset the original element
      $originalItem.css({
        'z-index': 1
      });

      //Clone the last element to the first position
      $cloneItem.prependTo($sectionsContainer).css({
        'z-index': 2,
        'transform': 'translateY(' + (dir == 'down' || dir === false ? windowHeight : -windowHeight) + 'px)'
      })
      //Add the latest content to the new container
      .find(ajaxContainer).html(newContent);
      $originalItem.first().find(ajaxContainer).html(oldContent).promise().done(function () {
        TweenMax.to($originalItem.first(), animationTime / 1000, {
          y: dir == 'down' || dir === false ? -windowHeight / 2 : windowHeight / 2,
          ease: Power2.easeOut
        });
        TweenMax.to($cloneItem, animationTime / 1000, {
          y: 0,
          ease: Power2.easeOut,
          onComplete: function onComplete() {
            //Remove duplicate elements
            $originalItem.first().remove();

            // Apply some asynchronism scripts
            $(document).UixApplyAsyncScripts();
          }
        });
      });
    }

    /* 
     ====================================================
     *  Mouse Wheel Method
     ====================================================
     */
    var startY = 0;
    var onTouchStart = function onTouchStart(e) {
      var touches = e.touches;
      if (touches && touches.length) {
        startY = touches[0].pageY;
      }
    };
    var onDeviceWheel = function onDeviceWheel(e) {
      //Gets a value that indicates the amount that the mouse wheel has changed.
      var dir,
        delta,
        mobileDeltaY = null;
      var touches = e.touches;
      if (touches && touches.length) {
        mobileDeltaY = startY - touches[0].pageY;
      } else {
        delta = Math.max(-1, Math.min(1, -e.deltaY));
      }
      if (mobileDeltaY != null) {
        if (mobileDeltaY >= 50) {
          //--- swipe up
          dir = 'up';
        }
        if (mobileDeltaY <= -50) {
          //--- swipe down
          dir = 'down';
        }
      } else {
        if (delta < 0) {
          //scroll down
          dir = 'down';
        } else {
          //scroll up
          dir = 'up';
        }
      }
      scrollMoveInit(e, dir);
    };
    window.addEventListener('wheel', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchstart', onTouchStart, browser.supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('touchmove', onDeviceWheel, browser.supportsPassive ? {
      passive: true
    } : false);
  };
  module.components.documentReady.push(module.AJAX_PAGE_LOADER.documentReady);
  return /*#__PURE__*/_createClass(function AJAX_PAGE_LOADER() {
    _classCallCheck(this, AJAX_PAGE_LOADER);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/_third-party-plugins/GSAP/esm/ScrollToPlugin.js

/*!
 * VERSION: 1.9.2
 * DATE: 2019-02-07
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
/* eslint-disable */


var _doc = (esm_TweenLite/* _gsScope.document */.ML.document || {}).documentElement,
  _window = esm_TweenLite/* _gsScope */.ML,
  _max = function _max(element, axis) {
    var dim = axis === "x" ? "Width" : "Height",
      scroll = "scroll" + dim,
      client = "client" + dim,
      body = document.body;
    return element === _window || element === _doc || element === body ? Math.max(_doc[scroll], body[scroll]) - (_window["inner" + dim] || _doc[client] || body[client]) : element[scroll] - element["offset" + dim];
  },
  _unwrapElement = function _unwrapElement(value) {
    if (typeof value === "string") {
      value = TweenLite.selector(value);
    }
    if (value.length && value !== _window && value[0] && value[0].style && !value.nodeType) {
      value = value[0];
    }
    return value === _window || value.nodeType && value.style ? value : null;
  },
  _buildGetter = function _buildGetter(e, axis) {
    //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
    var p = "scroll" + (axis === "x" ? "Left" : "Top");
    if (e === _window) {
      if (e.pageXOffset != null) {
        p = "page" + axis.toUpperCase() + "Offset";
      } else if (_doc[p] != null) {
        e = _doc;
      } else {
        e = document.body;
      }
    }
    return function () {
      return e[p];
    };
  },
  _getOffset = function _getOffset(element, container) {
    var rect = _unwrapElement(element).getBoundingClientRect(),
      b = document.body,
      isRoot = !container || container === _window || container === b,
      cRect = isRoot ? {
        top: _doc.clientTop - (window.pageYOffset || _doc.scrollTop || b.scrollTop || 0),
        left: _doc.clientLeft - (window.pageXOffset || _doc.scrollLeft || b.scrollLeft || 0)
      } : container.getBoundingClientRect(),
      offsets = {
        x: rect.left - cRect.left,
        y: rect.top - cRect.top
      };
    if (!isRoot && container) {
      //only add the current scroll position if it's not the window/body.
      offsets.x += _buildGetter(container, "x")();
      offsets.y += _buildGetter(container, "y")();
    }
    return offsets;
    /*	PREVIOUS
    var rect = _unwrapElement(element).getBoundingClientRect(),
    	isRoot = (!container || container === _window || container === document.body),
    	cRect = (isRoot ? _doc : container).getBoundingClientRect(),
    	offsets = {x: rect.left - cRect.left, y: rect.top - cRect.top};
    if (!isRoot && container) { //only add the current scroll position if it's not the window/body.
    	offsets.x += _buildGetter(container, "x")();
    	offsets.y += _buildGetter(container, "y")();
    }
    return offsets;
    */
  },
  _parseVal = function _parseVal(value, target, axis, currentVal) {
    var type = (0,esm_typeof/* default */.Z)(value);
    return !isNaN(value) ? parseFloat(value) : type === "string" && value.charAt(1) === "=" ? parseInt(value.charAt(0) + "1", 10) * parseFloat(value.substr(2)) + currentVal : value === "max" ? _max(target, axis) : Math.min(_max(target, axis), _getOffset(value, target)[axis]);
  },
  ScrollToPlugin = esm_TweenLite/* _gsScope._gsDefine.plugin */.ML._gsDefine.plugin({
    propName: "scrollTo",
    API: 2,
    global: true,
    version: "1.9.2",
    //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
    init: function init(target, value, tween) {
      this._wdw = target === _window;
      this._target = target;
      this._tween = tween;
      if ((0,esm_typeof/* default */.Z)(value) !== "object") {
        value = {
          y: value
        }; //if we don't receive an object as the parameter, assume the user intends "y".
        if (typeof value.y === "string" && value.y !== "max" && value.y.charAt(1) !== "=") {
          value.x = value.y;
        }
      } else if (value.nodeType) {
        value = {
          y: value,
          x: value
        };
      }
      this.vars = value;
      this._autoKill = value.autoKill !== false;
      this.getX = _buildGetter(target, "x");
      this.getY = _buildGetter(target, "y");
      this.x = this.xPrev = this.getX();
      this.y = this.yPrev = this.getY();
      if (value.x != null) {
        this._addTween(this, "x", this.x, _parseVal(value.x, target, "x", this.x) - (value.offsetX || 0), "scrollTo_x", true);
        this._overwriteProps.push("scrollTo_x");
      } else {
        this.skipX = true;
      }
      if (value.y != null) {
        this._addTween(this, "y", this.y, _parseVal(value.y, target, "y", this.y) - (value.offsetY || 0), "scrollTo_y", true);
        this._overwriteProps.push("scrollTo_y");
      } else {
        this.skipY = true;
      }
      return true;
    },
    //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
    set: function set(v) {
      this._super.setRatio.call(this, v);
      var x = this._wdw || !this.skipX ? this.getX() : this.xPrev,
        y = this._wdw || !this.skipY ? this.getY() : this.yPrev,
        yDif = y - this.yPrev,
        xDif = x - this.xPrev,
        threshold = ScrollToPlugin.autoKillThreshold;
      if (this.x < 0) {
        //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
        this.x = 0;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this._autoKill) {
        //note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
        if (!this.skipX && (xDif > threshold || xDif < -threshold) && x < _max(this._target, "x")) {
          this.skipX = true; //if the user scrolls separately, we should stop tweening!
        }

        if (!this.skipY && (yDif > threshold || yDif < -threshold) && y < _max(this._target, "y")) {
          this.skipY = true; //if the user scrolls separately, we should stop tweening!
        }

        if (this.skipX && this.skipY) {
          this._tween.kill();
          if (this.vars.onAutoKill) {
            this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []);
          }
        }
      }
      if (this._wdw) {
        _window.scrollTo(!this.skipX ? this.x : x, !this.skipY ? this.y : y);
      } else {
        if (!this.skipY) {
          this._target.scrollTop = this.y;
        }
        if (!this.skipX) {
          this._target.scrollLeft = this.x;
        }
      }
      this.xPrev = this.x;
      this.yPrev = this.y;
    }
  }),
  ScrollToPlugin_p = ScrollToPlugin.prototype;
ScrollToPlugin.max = _max;
ScrollToPlugin.getOffset = _getOffset;
ScrollToPlugin.buildGetter = _buildGetter;
ScrollToPlugin.autoKillThreshold = 7;
ScrollToPlugin_p._kill = function (lookup) {
  if (lookup.scrollTo_x) {
    this.skipX = true;
  }
  if (lookup.scrollTo_y) {
    this.skipY = true;
  }
  return this._super._kill.call(this, lookup);
};

;// CONCATENATED MODULE: ./src/components/back-to-top/js/index.js


/* 
 *************************************
 * <!-- Back to Top -->
 *************************************
 */



var BACK_TO_TOP = function (module, $, window, document) {
  if (window.BACK_TO_TOP === null) return false;
  module.BACK_TO_TOP = module.BACK_TO_TOP || {};
  module.BACK_TO_TOP.version = '0.1.0';
  module.BACK_TO_TOP.documentReady = function ($) {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    $('<a href="#" id="uix-to-top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>').appendTo('body');
    $.when($('#uix-to-top').length > 0).then(function () {
      //-------- Sticky button of back to top 
      var $el = $('#uix-to-top');
      function scrollUpdate() {
        var scrolled = $(window).scrollTop(),
          spyTop = windowHeight / 2;
        if (scrolled >= spyTop) {
          $el.addClass('is-active');
        } else {
          $el.removeClass('is-active');
        }
      }

      // Add function to the element that should be used as the scrollable area.
      var throttleFunc = UixThrottle(scrollUpdate, 5);
      window.removeEventListener('scroll', throttleFunc);
      window.removeEventListener('touchmove', throttleFunc);
      window.addEventListener('scroll', throttleFunc);
      window.addEventListener('touchmove', throttleFunc);
      throttleFunc();

      //-------- Click event of back button
      $el.off('click').on('click', function (e) {
        e.preventDefault();
        TweenMax.to(window, 0.5, {
          scrollTo: {
            y: 0,
            //y: "max" --> vertical scroll to bottom
            autoKill: false
          },
          ease: Power2.easeOut
        });
        return false;
      });
    });
  };
  module.components.documentReady.push(module.BACK_TO_TOP.documentReady);
  return /*#__PURE__*/_createClass(function BACK_TO_TOP() {
    _classCallCheck(this, BACK_TO_TOP);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/circle-layout/js/index.js



/* 
 *************************************
 * <!-- Circle Layout -->
 *************************************
 */


var CIRCLE_LAYOUT = function (module, $, window, document) {
  if (window.CIRCLE_LAYOUT === null) return false;
  module.CIRCLE_LAYOUT = module.CIRCLE_LAYOUT || {};
  module.CIRCLE_LAYOUT.version = '0.0.1';
  module.CIRCLE_LAYOUT.documentReady = function ($) {
    $('.js-uix-circle-layout').each(function (id) {
      var $this = $(this);
      var $ul = $this.find('> ul'),
        $li = $ul.find('> li'),
        liWidth = $li.first().outerWidth(),
        liHeight = $li.first().outerHeight();
      var display = $this.data('circle-layout-display'),
        radius = $this.data('circle-layout-radius'),
        radius2 = $this.data('circle-layout-radius-c'),
        rotation = $this.data('circle-layout-rotation');
      if ((0,esm_typeof/* default */.Z)(display) === ( true ? "undefined" : 0)) {
        display = 5;
      }
      if ((0,esm_typeof/* default */.Z)(radius) === ( true ? "undefined" : 0)) {
        radius = 180;
      }
      if ((0,esm_typeof/* default */.Z)(radius2) === ( true ? "undefined" : 0)) {
        radius2 = 110;
      }
      if ((0,esm_typeof/* default */.Z)(rotation) === ( true ? "undefined" : 0)) {
        rotation = 0;
      }
      $this.css({
        'width': radius * 2 + 'px'
      });
      $ul.css({
        'width': radius * 2 + 'px',
        'height': radius * 2 + 'px',
        'transform': 'rotate(' + parseFloat(rotation) + 'deg)'
      });
      $ul.next('div').css({
        'width': radius2 * 2 + 'px',
        'height': radius2 * 2 + 'px'
      });

      //Layout components in a circle layout
      var step = 2 * Math.PI / display,
        pad = $ul.width();
      var angle = 0,
        transitionDelay = 0;
      $li.each(function () {
        //Can'nt use arrow function here!!!
        // 'this' works differently with arrow fucntions
        var el = $(this),
          x = radius * Math.cos(angle) - liWidth / 2,
          y = radius * Math.sin(angle) - liHeight / 2;
        el.css({
          'transform': 'translate(' + parseFloat(x + liWidth / 2) + 'px,' + parseFloat(pad / 2 + y + liHeight / 2) + 'px)',
          'transition-delay': transitionDelay + "s"
        }).find('> a').css({
          'transform': 'rotate(' + parseFloat(-rotation) + 'deg)'
        });
        angle += step;
        transitionDelay += 0.15;
      });
    });
  };
  module.components.documentReady.push(module.CIRCLE_LAYOUT.documentReady);
  return /*#__PURE__*/_createClass(function CIRCLE_LAYOUT() {
    _classCallCheck(this, CIRCLE_LAYOUT);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
// EXTERNAL MODULE: ./src/components/counter/js/fn/count-to.js
var count_to = __webpack_require__(798);
;// CONCATENATED MODULE: ./src/components/counter/js/index.js



/* 
 *************************************
 * <!-- Counter -->
 *************************************
 */


var COUNTER = function (module, $, window, document) {
  if (window.COUNTER === null) return false;
  module.COUNTER = module.COUNTER || {};
  module.COUNTER.version = '0.0.6';
  module.COUNTER.documentReady = function ($) {
    var $scrollElements = $('[data-counter-number]');
    $scrollElements.each(function () {
      var viewport = 1;
      var $el = $(this);

      //
      var scrollUpdate = function scrollUpdate() {
        var spyTop = $el[0].getBoundingClientRect().top;

        //Prevent asynchronous loading of repeated calls
        var actived = $el.data('activated');
        if (spyTop < window.innerHeight * viewport) {
          if ((0,esm_typeof/* default */.Z)(actived) === ( true ? "undefined" : 0)) {
            $el.UixCountTo();

            //Prevents front-end javascripts that are activated in the background to repeat loading.
            $el.data('activated', 1);
          } //endif actived
        }
      };

      // Add function to the element that should be used as the scrollable area.
      var throttleFunc = UixThrottle(scrollUpdate, 5);
      window.removeEventListener('scroll', throttleFunc);
      window.removeEventListener('touchmove', throttleFunc);
      window.addEventListener('scroll', throttleFunc);
      window.addEventListener('touchmove', throttleFunc);
      throttleFunc();
    }); //end each        
  };

  module.components.documentReady.push(module.COUNTER.documentReady);
  return /*#__PURE__*/_createClass(function COUNTER() {
    _classCallCheck(this, COUNTER);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/dropdown-menu/js/index.js



/* 
 *************************************
 * <!-- Dropdown Menu -->
 *************************************
 */


var DROPDOWN_MENU = function (module, $, window, document) {
  if (window.DROPDOWN_MENU === null) return false;
  module.DROPDOWN_MENU = module.DROPDOWN_MENU || {};
  module.DROPDOWN_MENU.version = '0.0.7';
  module.DROPDOWN_MENU.documentReady = function ($) {
    //Initialize option status
    $('.uix-dropdown-menu').each(function () {
      var v = $(this).find('input[type="hidden"]').val(),
        selectedIndex = $(this).find('ul > li > a[data-value="' + v + '"]').parent().index(),
        $li = $(this).find('ul > li');
      $li.removeClass('is-active');
      $li.eq(selectedIndex).addClass('is-active');
      $(this).find('> summary > span').html($li.eq(selectedIndex).find('> a').data('display-text'));
    });

    //Create a trigger of Dropdown Menu on Click
    //Use $( document ) to support other click events for ajax
    $(document).off('click.DROPDOWN_MENU').on('click.DROPDOWN_MENU', '.uix-dropdown-menu > summary', function (e) {
      // stop propagation of this event, it will never reach body in bubbling phase.
      e.stopPropagation();
      var $this = $(this).parent('.uix-dropdown-menu');
      $this.toggleClass('is-opened');
    });
    $(document).off('click.DROPDOWN_MENU_LINK').on('click.DROPDOWN_MENU_LINK', '.uix-dropdown-menu li a', function (e) {
      // stop propagation of this event, it will never reach body in bubbling phase.
      e.stopPropagation();
      var $this = $(this).closest('.uix-dropdown-menu');
      if ($this.hasClass('is-opened')) {
        $this.removeAttr('open').removeClass('is-opened');
      }
      if ((0,esm_typeof/* default */.Z)($(this).attr('data-value')) != ( true ? "undefined" : 0) && $(this).attr('data-value') != '') {
        $this.find('input[type="hidden"]').val($(this).attr('data-value'));
      }
      if ((0,esm_typeof/* default */.Z)($(this).data('display-text')) != ( true ? "undefined" : 0) && $(this).data('display-text') != '') {
        $this.find('> summary > span').html($(this).data('display-text'));
      }

      // update active status
      $this.find('li').removeClass('is-active');
      $(this).parent().addClass('is-active');
    });

    //Close the target
    //Do not add off() to this
    $(document.body).on('click', function (e) {
      //Apply click method to outer div but not inner div
      if (!$(e.target.offsetParent).hasClass('uix-dropdown-menu')) {
        $('.uix-dropdown-menu').removeAttr('open').removeClass('is-opened');
      }
    });
  };
  module.components.documentReady.push(module.DROPDOWN_MENU.documentReady);
  return /*#__PURE__*/_createClass(function DROPDOWN_MENU() {
    _classCallCheck(this, DROPDOWN_MENU);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/dropdown-menu2/js/index.js


/* 
 *************************************
 * <!-- Dropdown Menu 2 (Multi-level drop-down navigation) -->
 *************************************
 */


var DROPDOWN_MENU2 = function (module, $, window, document) {
  if (window.DROPDOWN_MENU2 === null) return false;
  module.DROPDOWN_MENU2 = module.DROPDOWN_MENU2 || {};
  module.DROPDOWN_MENU2.version = '0.0.5';
  module.DROPDOWN_MENU2.documentReady = function ($) {
    var $verticalMenuLi = $('.uix-vertical-menu li');
    $verticalMenuLi.find('> a').off('click').on('click', function (e) {
      var $sub = $(this).next('ul');
      if ($sub.length > 0) {
        e.preventDefault();

        //Its value is not a boolean but a string
        var expanded = $(this).attr('aria-expanded') == 'true' ? false : true;
        if (expanded) {
          //Hide other all sibling <ul> of the selected element
          var $e = $(this).parent('li').siblings().find('> a');
          $e.removeClass('is-active').attr('aria-expanded', false);
          $(this).addClass('is-active').attr('aria-expanded', true);
          TweenMax.to($e.next('ul'), 0.5, {
            height: 0
          });

          //to open
          // - temporarilty set height:auto
          // - tween from height:0
          TweenMax.set($sub, {
            height: 'auto'
          });
          TweenMax.from($sub, 0.5, {
            height: 0
          });
        } else {
          $(this).removeClass('is-active').attr('aria-expanded', false);

          //to close
          TweenMax.to($sub, 0.5, {
            height: 0
          });
        }
        return false;
      }
    });

    //Add multilevel indicator arrow
    if ($verticalMenuLi.find('> a .uix-vertical-menu__arrow').length == 0) {
      $verticalMenuLi.find('> a').append('<span class="uix-vertical-menu__arrow"></span>');
    }
    $verticalMenuLi.each(function () {
      var len = $(this).find('ul').length;
      if (len == 0) {
        $(this).children('a').children('.uix-vertical-menu__arrow').hide();
      }
    });
  };
  module.components.documentReady.push(module.DROPDOWN_MENU2.documentReady);
  return /*#__PURE__*/_createClass(function DROPDOWN_MENU2() {
    _classCallCheck(this, DROPDOWN_MENU2);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/cascading-dropdown-list/js/index.js



/* 
 *************************************
 * <!-- Cascading DropDown List -->
 *************************************
 */


var CASCADING_DD_LIST = function (module, $, window, document) {
  if (window.CASCADING_DD_LIST === null) return false;
  module.CASCADING_DD_LIST = module.CASCADING_DD_LIST || {};
  module.CASCADING_DD_LIST.version = '0.2.1';
  module.CASCADING_DD_LIST.documentReady = function ($) {
    var curControls = '.uix-cascading-dropdown-list';
    var wrapperDepth = $(curControls).length === 0 ? 1 : $(curControls).length + 1;
    $(curControls).each(function () {
      wrapperDepth--;
      var cid = UixGUID.create();
      var $control = $(this);
      var actived = $control.data('activated');
      $control.attr('id', 'app-' + cid);

      //
      var ajaxURL = $control.data('cascading-dd-json'),
        ajaxMethod = $control.data('cascading-dd-method'),
        loadingTmpl = $control.data('cascading-dd-loading-tmpl');
      if ((0,esm_typeof/* default */.Z)(ajaxURL) === ( true ? "undefined" : 0)) ajaxURL = '';
      if ((0,esm_typeof/* default */.Z)(ajaxMethod) === ( true ? "undefined" : 0)) ajaxMethod = 'POST';
      if ((0,esm_typeof/* default */.Z)(loadingTmpl) === ( true ? "undefined" : 0)) loadingTmpl = '<div>loading...</div>';
      if ((0,esm_typeof/* default */.Z)(actived) === ( true ? "undefined" : 0)) {
        // Methods
        //------------------------------------------
        var loadingAnim = function loadingAnim() {
          var $loadingWrapper = $control.find('.uix-cascading-dropdown-list__loading__wrapper');
          if ($control.data('loading')) {
            $loadingWrapper.html(loadingTmpl);
          } else {
            $loadingWrapper.html('');
          }
        }; //
        var handleInitControl = function handleInitControl() {
          var firstLevelItems = [];
          $control.data('ajaxOptions').forEach(function (item) {
            firstLevelItems.push({
              "id": item.id,
              "name": item.name
            });
          });

          //
          $control.data({
            'data': [$control.data('ajaxOptions')],
            'firstLevelItems': [firstLevelItems]
          });

          // update result to input
          $resInput.val('');
        }; //
        var queryResultOfJSON = function queryResultOfJSON(data, targetVal, returnType) {
          var callbackValueNested = [];
          var lastFirstLevelName = '';
          var loop = true;
          var resDepth = 0;
          var getIndexOf = function getIndexOf(arr, val) {
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].id.toString() === val.toString()) {
                return i;
              }
            }
            return -1;
          };
          var searchJsonStr = function searchJsonStr(list, depth) {
            // `depth` is very important, it is used to accurately judge the final result
            if (typeof depth === 'undefined') {
              depth = 0;
            } else {
              depth++;
            }

            //    
            for (var i = 0; i < list.length; i++) {
              var row = list[i];
              var callbackValue = returnType === 'key' ? row.id.toString() : row.name.toString();
              if (loop) {
                // get first-level item
                if (getIndexOf(data, row.id) !== -1) {
                  callbackValueNested.push(callbackValue);
                  lastFirstLevelName = callbackValue;
                }

                // get child-level item
                if (row.children) {
                  callbackValueNested.push(callbackValue);
                }
              }

              //check the value
              if (row.id.toString() === targetVal.toString()) {
                callbackValueNested.push(callbackValue);
                loop = false;
                resDepth = depth;
                break;
              }

              // Note: Recursion must be placed here
              if (loop) {
                if (row.children) {
                  searchJsonStr(row.children, depth);
                }
              }
            }
          };
          searchJsonStr(data);

          // (1) Remove duplicate values
          //------------------------------------------
          callbackValueNested = callbackValueNested.filter(function (item, index, arr) {
            return arr.indexOf(item, 0) === index;
          });

          // (2) Delete needless first-level
          //------------------------------------------
          var resAll = callbackValueNested.slice(callbackValueNested.indexOf(lastFirstLevelName), callbackValueNested.length);

          // (3) Returns result
          //------------------------------------------
          if (resAll.length > 1) {
            // Get first-level item
            resAll.splice(1);

            // Get child-level item
            var resChild = callbackValueNested.slice(-resDepth); // Get the last elements in reverse

            // Combine
            resAll = resAll.concat(resChild);
          }
          return resAll;
        }; //
        var setValue = function setValue(arr, targetVal) {
          // update result to input
          $resInput.val(targetVal);

          //search JSON key that contains specific string
          $control.data({
            'selectedData': {
              labels: queryResultOfJSON(arr, targetVal, 'value'),
              values: queryResultOfJSON(arr, targetVal, 'key')
            }
          });
        }; //
        var handleClickItem = function handleClickItem(resValue, index, level) {
          console.log('resValue: ', resValue, ' | index: ', index, ' | level: ', level);

          // update value
          setValue($control.data('ajaxOptions'), resValue.id);

          // active the selected item
          var markCurrent = function markCurrent(arr, index) {
            for (var i = 0; i < arr.length; i++) {
              if (i === index) {
                arr[i].current = true;
              } else {
                arr[i].current = false;
              }
            }
          };

          // deactivate all items
          var markAllItems = function markAllItems(arr) {
            for (var i = 0; i < arr.length; i++) {
              arr[i].current = false;
            }
          };

          //
          var newData = $control.data('data'); // such as: [Array(6), Array(3)]
          //console.log( 'newData: ', newData );

          // All the elements from start(array.length - start) to the end of the array will be deleted.
          newData.splice(level + 1);
          if (resValue.children) {
            var childList = resValue.children;
            markAllItems(childList);
            newData[level + 1] = childList;
          }

          //
          $control.data({
            'data': newData
          });
          markCurrent(newData[level], index);
        }; //
        var handleDisplayOptions = function handleDisplayOptions(e) {
          e.preventDefault();
          $control.data({
            'isShow': !$control.data('isShow')
          });
        }; // If clicked on outside of element
        var handleClickOutside = function handleClickOutside(event) {
          if (event.target.className != '' && event.target.className.indexOf('uix-cascading-dropdown-list__trigger') < 0 && event.target.className.indexOf('uix-cascading-dropdown-list__items') < 0 && event.target.className.indexOf('uix-cascading-dropdown-list__opt') < 0) {
            $control.data({
              'isShow': false
            });
          }
        }; // Rendering component
        var render = function render() {
          var isShow = $control.data('isShow');
          var data = $control.data('data');

          //for wrapper
          if (isShow) {
            var items = '';
            data.map(function (item, level) {
              var options = '';
              item.map(function (option, optionIndex) {
                options += '<div class="' + (option.current ? 'uix-cascading-dropdown-list__opt is-active' : 'uix-cascading-dropdown-list__opt') + '" data-level="' + level + '" data-value=\'' + JSON.stringify(option) + '\' data-index="' + optionIndex + '">' + option.name + '</div>';
              });
              items += '<li>' + options + '</li>';
            });
            $listWrapper.html("\n                        <div class=\"uix-cascading-dropdown-list__items\">\n                            <ul>\n                                " + items + "\n                            </ul>\n            \n                        </div>\n                        ");
          } else {
            $listWrapper.html('');
          }

          //for options
          var selectedData = $control.data('selectedData');
          var displayInfo = '';
          if (selectedData.labels) {
            selectedData.labels.map(function (item, i, arr) {
              var _input = '<input name="' + fieldName + '-node[]" type="hidden" value="' + selectedData.values[i] + '"/>';
              if (arr.length - 1 === i) {
                displayInfo += '<span>' + item + '' + _input + '</span>';
              } else {
                displayInfo += '<span>' + item + '' + _input + '</span><svg viewBox="0 0 22 22" width="8"><path d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373" transform="matrix(.03541-.00013.00013.03541 2.98 3.02)" fill="#a5a5a5"/></svg>';
              }
            });
          }
          $eachResWrapper.html(displayInfo);
        }; // Initialize status
        //------------------------------------------
        //Initialize HTML structure
        $control.append("\n                    <em class=\"uix-cascading-dropdown-list__result\"></em>\n                    <span class=\"uix-cascading-dropdown-list__items__wrapper\"></span>\n                    <span class=\"uix-cascading-dropdown-list__loading__wrapper\"></span>    \n                ");

        //
        var $listWrapper = $control.find('.uix-cascading-dropdown-list__items__wrapper');
        var $resInput = $control.find('input.uix-cascading-dropdown-list__res');
        var $eachResWrapper = $control.find('.uix-cascading-dropdown-list__result');
        var fieldName = typeof $resInput.attr('name') === 'undefined' ? 'auto-name-' + cid : $resInput.attr('name');
        var defaultVal = $resInput.val(); //the default value is STRING

        /*
        // If the final result is a comma separated string, like this: `value1,value2`
        if (defaultVal) {
            defaultVal.trim().replace(/^\,|\,$/g, '').split(',').forEach((item, index) => {
                 // do something
            });
        }
        */

        //init data
        $control.data({
          'ajaxOptions': [],
          'firstLevelItems': [],
          'loading': true,
          //for variable field
          'data': [],
          'selectedData': {
            labels: [],
            values: []
          },
          'isShow': false
        });

        //loading
        loadingAnim();

        //Initialize input
        $resInput.attr({
          'type': 'hidden',
          'name': fieldName
        });

        //Initialize wrapper depth
        $control.css('z-index', wrapperDepth);

        // Get data of asynchronous request
        //------------------------------------------
        var req = ajaxMethod.toLowerCase() === 'get' ? axios.get(ajaxURL) : axios.post(ajaxURL);
        var allData = null;
        req.then(function (res) {
          allData = res.data;
          $control.data({
            'loading': false
          });

          //loading
          loadingAnim();
          if (allData !== undefined) {
            $control.data({
              'ajaxOptions': allData
            });

            //Initialize options 
            handleInitControl();

            //Set a default value
            if (defaultVal) setValue(allData, defaultVal);

            //Rendering component
            render();
          }
        });

        // Mouse Events
        //------------------------------------------
        //Trigger event 
        $(document).off('click.CASCADING_DROPDOWNLIST_TRIGGER' + cid).on('click.CASCADING_DROPDOWNLIST_TRIGGER' + cid, "#".concat('app-' + cid, " .uix-cascading-dropdown-list__trigger"), function (e) {
          handleDisplayOptions(e);

          //Rendering component
          render();
        });

        //Options event
        $(document).off('click.CASCADING_DROPDOWNLIST_OPTIONS_OPEN' + cid).on('click.CASCADING_DROPDOWNLIST_OPTIONS_OPEN' + cid, "#".concat('app-' + cid, " .uix-cascading-dropdown-list__opt"), function (e) {
          var _level = $(this).data('level');
          var _value = $(this).data('value');
          var _index = $(this).data('index');
          handleClickItem(_value, _index, _level);

          //Rendering component
          render();
        });

        //Hide options event
        //Do not add off() to this
        $(document).on('click.CASCADING_DROPDOWNLIST_CLOSE', function (e) {
          handleClickOutside(e);

          //Rendering component
          render();
        });

        //------------------------------------------

        //Prevents front-end javascripts that are activated in the background to repeat loading.
        $control.data('activated', 1);
      } //endif actived			
    });
  };

  module.components.documentReady.push(module.CASCADING_DD_LIST.documentReady);
  return /*#__PURE__*/_createClass(function CASCADING_DD_LIST() {
    _classCallCheck(this, CASCADING_DD_LIST);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/flexslider/js/third-party/jquery.flexslider.js

/*
 * jQuery FlexSlider v2.7.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
(function ($) {
  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function (el, options) {
    var slider = $(el);

    // making variables public

    //if rtl value was not passed and html is in rtl..enable it by default.
    if (typeof options.rtl == 'undefined' && $('html').attr('dir') == 'rtl') {
      options.rtl = true;
    }
    slider.vars = $.extend({}, $.flexslider.defaults, options);
    var namespace = slider.vars.namespace,
      msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      touch = ("ontouchstart" in window || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
      // deprecating this idea, as devices are being released with both of these events
      eventType = "click touchend MSPointerUp keyup",
      watchedEvent = "",
      watchedEventClearTimer,
      vertical = slider.vars.direction === "vertical",
      reverse = slider.vars.reverse,
      carousel = slider.vars.itemWidth > 0,
      fade = slider.vars.animation === "fade",
      asNav = slider.vars.asNavFor !== "",
      methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function init() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt(slider.vars.startAt ? slider.vars.startAt : 0, 10);
        if (isNaN(slider.currentSlide)) {
          slider.currentSlide = 0;
        }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = slider.currentSlide === 0 || slider.currentSlide === slider.last;
        slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") {
          slider.vars.animation = "swing";
        }
        slider.prop = vertical ? "top" : slider.vars.rtl ? "marginRight" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && function () {
          var obj = document.createElement('div'),
            props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if (obj.style[props[i]] !== undefined) {
              slider.pfx = props[i].replace('Perspective', '').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }();
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function () {
            return Math.round(Math.random()) - 0.5;
          });
          slider.container.empty().append(slider.slides);
        }
        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) {
          methods.controlNav.setup();
        }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) {
          methods.directionNav.setup();
        }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function (event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = slider.vars.rtl ? keycode === 37 ? slider.getTarget('next') : keycode === 39 ? slider.getTarget('prev') : false : keycode === 39 ? slider.getTarget('next') : keycode === 37 ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function (event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = delta < 0 ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) {
          methods.pausePlay.setup();
        }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) {
          methods.pauseInvisible.init();
        }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function () {
              if (!slider.manualPlay && !slider.manualPause) {
                slider.pause();
              }
            }, function () {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {
                slider.play();
              }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            slider.vars.initDelay > 0 ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) {
          methods.asNav.setup();
        }

        // TOUCH
        if (touch && slider.vars.touch) {
          methods.touch();
        }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || fade && slider.vars.smoothHeight) {
          $(window).bind("resize orientationchange focus", methods.resize);
        }
        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function () {
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function setup() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if (!msGesture) {
            slider.slides.on(eventType, function (e) {
              e.preventDefault();
              var $slide = $(this),
                target = $slide.index();
              var posFromX;
              if (slider.vars.rtl) {
                posFromX = -1 * ($slide.offset().right - $(slider).scrollLeft()); // Find position of slide relative to right of slider container
              } else {
                posFromX = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
              }

              if (posFromX <= 0 && $slide.hasClass(namespace + 'active-slide')) {
                slider.flexAnimate(slider.getTarget("prev"), true);
              } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                slider.direction = slider.currentItem < target ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
              }
            });
          } else {
            el._slider = slider;
            slider.slides.each(function () {
              var that = this;
              that._gesture = new MSGesture();
              that._gesture.target = that;
              that.addEventListener("MSPointerDown", function (e) {
                e.preventDefault();
                if (e.currentTarget._gesture) {
                  e.currentTarget._gesture.addPointer(e.pointerId);
                }
              }, false);
              that.addEventListener("MSGestureTap", function (e) {
                e.preventDefault();
                var $slide = $(this),
                  target = $slide.index();
                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                  slider.direction = slider.currentItem < target ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
            });
          }
        }
      },
      controlNav: {
        setup: function setup() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else {
            // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function setupPaging() {
          var type = slider.vars.controlNav === "thumbnails" ? 'control-thumbs' : 'control-paging',
            j = 1,
            item,
            slide;
          slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');
          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              if (undefined === slide.attr('data-thumb-alt')) {
                slide.attr('data-thumb-alt', '');
              }
              var altText = '' !== slide.attr('data-thumb-alt') ? altText = ' alt="' + slide.attr('data-thumb-alt') + '"' : '';
              item = slider.vars.controlNav === "thumbnails" ? '<img src="' + slide.attr('data-thumb') + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
              if ('thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions) {
                var captn = slide.attr('data-thumbcaption');
                if ('' !== captn && undefined !== captn) {
                  item += '<span class="' + namespace + 'caption">' + captn + '</span>';
                }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          slider.controlsContainer ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();
          methods.controlNav.active();
          slider.controlNavScaffold.delegate('a, img', eventType, function (event) {
            event.preventDefault();
            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                target = slider.controlNav.index($this);
              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = target > slider.currentSlide ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        setupManual: function setupManual() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();
          slider.controlNav.bind(eventType, function (event) {
            event.preventDefault();
            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                target = slider.controlNav.index($this);
              if (!$this.hasClass(namespace + 'active')) {
                target > slider.currentSlide ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function set() {
          var selector = slider.vars.controlNav === "thumbnails" ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, slider.controlsContainer ? slider.controlsContainer : slider);
        },
        active: function active() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function update(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function setup() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
            // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }
          methods.directionNav.update();
          slider.directionNav.bind(eventType, function (event) {
            event.preventDefault();
            var target;
            if (watchedEvent === "" || watchedEvent === event.type) {
              target = $(this).hasClass(namespace + 'next') ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function update() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function setup() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }
          methods.pausePlay.update(slider.vars.slideshow ? namespace + 'pause' : namespace + 'play');
          slider.pausePlay.bind(eventType, function (event) {
            event.preventDefault();
            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function update(state) {
          state === "play" ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function touch() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          _onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;
        if (!msGesture) {
          onTouchStart = function onTouchStart(e) {
            if (slider.animating) {
              e.preventDefault();
            } else if (window.navigator.msPointerEnabled || e.touches.length === 1) {
              slider.pause();
              // CAROUSEL:
              cwidth = vertical ? slider.h : slider.w;
              startT = Number(new Date());
              // CAROUSEL:

              // Local vars for X and Y points.
              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;
              offset = carousel && reverse && slider.animatingTo === slider.last ? 0 : carousel && reverse ? slider.limit - (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo : carousel && slider.currentSlide === slider.last ? slider.limit : carousel ? (slider.itemW + slider.vars.itemMargin) * slider.move * slider.currentSlide : reverse ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
              startX = vertical ? localY : localX;
              startY = vertical ? localX : localY;
              el.addEventListener('touchmove', onTouchMove, false);
              el.addEventListener('touchend', _onTouchEnd, false);
            }
          };
          onTouchMove = function onTouchMove(e) {
            // Local vars for X and Y points.

            localX = e.touches[0].pageX;
            localY = e.touches[0].pageY;
            dx = vertical ? startX - localY : (slider.vars.rtl ? -1 : 1) * (startX - localX);
            scrolling = vertical ? Math.abs(dx) < Math.abs(localX - startY) : Math.abs(dx) < Math.abs(localY - startY);
            var fxms = 500;
            if (!scrolling || Number(new Date()) - startT > fxms) {
              e.preventDefault();
              if (!fade && slider.transitions) {
                if (!slider.vars.animationLoop) {
                  dx = dx / (slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0 ? Math.abs(dx) / cwidth + 2 : 1);
                }
                slider.setProps(offset + dx, "setTouch");
              }
            }
          };
          _onTouchEnd = function onTouchEnd(e) {
            // finish the touch by undoing the touch session
            el.removeEventListener('touchmove', onTouchMove, false);
            if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
              var updateDx = reverse ? -dx : dx,
                target = updateDx > 0 ? slider.getTarget('next') : slider.getTarget('prev');
              if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              } else {
                if (!fade) {
                  slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
            }
            el.removeEventListener('touchend', _onTouchEnd, false);
            startX = null;
            startY = null;
            dx = null;
            offset = null;
          };
          el.addEventListener('touchstart', onTouchStart, false);
        } else {
          var onMSPointerDown = function onMSPointerDown(e) {
            e.stopPropagation();
            if (slider.animating) {
              e.preventDefault();
            } else {
              slider.pause();
              el._gesture.addPointer(e.pointerId);
              accDx = 0;
              cwidth = vertical ? slider.h : slider.w;
              startT = Number(new Date());
              // CAROUSEL:

              offset = carousel && reverse && slider.animatingTo === slider.last ? 0 : carousel && reverse ? slider.limit - (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo : carousel && slider.currentSlide === slider.last ? slider.limit : carousel ? (slider.itemW + slider.vars.itemMargin) * slider.move * slider.currentSlide : reverse ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
            }
          };
          var onMSGestureChange = function onMSGestureChange(e) {
            e.stopPropagation();
            var slider = e.target._slider;
            if (!slider) {
              return;
            }
            var transX = -e.translationX,
              transY = -e.translationY;

            //Accumulate translations.
            accDx = accDx + (vertical ? transY : transX);
            dx = (slider.vars.rtl ? -1 : 1) * accDx;
            scrolling = vertical ? Math.abs(accDx) < Math.abs(-transX) : Math.abs(accDx) < Math.abs(-transY);
            if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
              setImmediate(function () {
                el._gesture.stop();
              });
              return;
            }
            if (!scrolling || Number(new Date()) - startT > 500) {
              e.preventDefault();
              if (!fade && slider.transitions) {
                if (!slider.vars.animationLoop) {
                  dx = accDx / (slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0 ? Math.abs(accDx) / cwidth + 2 : 1);
                }
                slider.setProps(offset + dx, "setTouch");
              }
            }
          };
          var onMSGestureEnd = function onMSGestureEnd(e) {
            e.stopPropagation();
            var slider = e.target._slider;
            if (!slider) {
              return;
            }
            if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
              var updateDx = reverse ? -dx : dx,
                target = updateDx > 0 ? slider.getTarget('next') : slider.getTarget('prev');
              if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              } else {
                if (!fade) {
                  slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
            }
            startX = null;
            startY = null;
            dx = null;
            offset = null;
            accDx = 0;
          };
          el.style.msTouchAction = "none";
          el._gesture = new MSGesture();
          el._gesture.target = el;
          el.addEventListener("MSPointerDown", onMSPointerDown, false);
          el._slider = slider;
          el.addEventListener("MSGestureChange", onMSGestureChange, false);
          el.addEventListener("MSGestureEnd", onMSGestureEnd, false);
        }
      },
      resize: function resize() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) {
            slider.doMath();
          }
          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) {
            //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          } else if (vertical) {
            //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) {
              methods.smoothHeight();
            }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function smoothHeight(dur) {
        if (!vertical || fade) {
          var $obj = fade ? slider : slider.viewport;
          dur ? $obj.animate({
            "height": slider.slides.eq(slider.animatingTo).innerHeight()
          }, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
        }
      },
      sync: function sync(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
          target = slider.animatingTo;
        switch (action) {
          case "animate":
            $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true);
            break;
          case "play":
            if (!$obj.playing && !$obj.asNav) {
              $obj.play();
            }
            break;
          case "pause":
            $obj.pause();
            break;
        }
      },
      uniqueID: function uniqueID($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter('[id]').add($clone.find('[id]')).each(function () {
          var $this = $(this);
          $this.attr('id', $this.attr('id') + '_clone');
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function init() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
            document.addEventListener(evtname, function () {
              if (methods.pauseInvisible.isHidden()) {
                if (slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              } else {
                if (slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },

        isHidden: function isHidden() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function getHiddenProp() {
          var prefixes = ['webkit', 'moz', 'ms', 'o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for (var i = 0; i < prefixes.length; i++) {
            if (prefixes[i] + 'Hidden' in document) {
              return prefixes[i] + 'Hidden';
            }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function setToClearWatchedEvent() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function () {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function (target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = target > slider.currentSlide ? "next" : "prev";
      }
      if (asNav && slider.pagingCount === 1) slider.direction = slider.currentItem < target ? "next" : "prev";
      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = slider.currentItem < target ? "next" : "prev";
          master.direction = slider.direction;
          if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target / slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }
        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) {
          slider.pause();
        }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) {
          methods.sync("animate");
        }

        // CONTROLNAV
        if (slider.vars.controlNav) {
          methods.controlNav.active();
        }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) {
          slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
        }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) {
          methods.directionNav.update();
        }
        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) {
            slider.pause();
          }
        }

        // SLIDE:
        if (!fade) {
          var dimension = vertical ? slider.slides.filter(':first').height() : slider.computedW,
            margin,
            slideString,
            calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = (slider.itemW + margin) * slider.move * slider.animatingTo;
            slideString = calcNext > slider.limit && slider.visible !== 1 ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = reverse ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = reverse ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = reverse ? (slider.count - 1 - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function () {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function () {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);
          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function () {
              slider.wrapup(dimension);
            });
          }
        } else {
          // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).css({
              "zIndex": 1
            }).animate({
              "opacity": 0
            }, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({
              "zIndex": 2
            }).animate({
              "opacity": 1
            }, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({
              "opacity": 0,
              "zIndex": 1
            });
            slider.slides.eq(target).css({
              "opacity": 1,
              "zIndex": 2
            });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) {
          methods.smoothHeight(slider.vars.animationSpeed);
        }
      }
    };
    slider.wrapup = function (dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function () {
      if (!slider.animating && focused) {
        slider.flexAnimate(slider.getTarget("next"));
      }
    };
    // SLIDESHOW:
    slider.pause = function () {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) {
        methods.pausePlay.update("play");
      }
      // SYNC:
      if (slider.syncExists) {
        methods.sync("pause");
      }
    };
    // SLIDESHOW:
    slider.play = function () {
      if (slider.playing) {
        clearInterval(slider.animatedSlides);
      }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) {
        methods.pausePlay.update("pause");
      }
      // SYNC:
      if (slider.syncExists) {
        methods.sync("play");
      }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function (target, fromNav) {
      // ASNAV:
      var last = asNav ? slider.pagingCount - 1 : slider.last;
      return fromNav ? true : asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev" ? true : asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next" ? false : target === slider.currentSlide && !asNav ? false : slider.vars.animationLoop ? true : slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next" ? false : slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next" ? false : true;
    };
    slider.getTarget = function (dir) {
      slider.direction = dir;
      if (dir === "next") {
        return slider.currentSlide === slider.last ? 0 : slider.currentSlide + 1;
      } else {
        return slider.currentSlide === 0 ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function (pos, special, dur) {
      var target = function () {
        var posCheck = pos ? pos : (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo,
          posCalc = function () {
            if (carousel) {
              return special === "setTouch" ? pos : reverse && slider.animatingTo === slider.last ? 0 : reverse ? slider.limit - (slider.itemW + slider.vars.itemMargin) * slider.move * slider.animatingTo : slider.animatingTo === slider.last ? slider.limit : posCheck;
            } else {
              switch (special) {
                case "setTotal":
                  return reverse ? (slider.count - 1 - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                case "setTouch":
                  return reverse ? pos : pos;
                case "jumpEnd":
                  return reverse ? pos : slider.count * pos;
                case "jumpStart":
                  return reverse ? slider.count * pos : pos;
                default:
                  return pos;
              }
            }
          }();
        return posCalc * (slider.vars.rtl ? 1 : -1) + "px";
      }();
      if (slider.transitions) {
        target = vertical ? "translate3d(0," + target + ",0)" : "translate3d(" + ((slider.vars.rtl ? -1 : 1) * parseInt(target) + 'px') + ",0,0)";
        dur = dur !== undefined ? dur / 1000 + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
        slider.container.css("transition-duration", dur);
      }
      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) {
        slider.container.css(slider.args);
      }
      slider.container.css('transform', target);
    };
    slider.setup = function (type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;
        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
            "overflow": "hidden",
            "position": "relative"
          }).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") {
            slider.container.find('.clone').remove();
          }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true')).prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);
        sliderOffset = reverse ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function () {
            slider.newSlides.css({
              "display": "block"
            });
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, type === "init" ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function () {
            slider.doMath();
            if (slider.vars.rtl) {
              slider.newSlides.css({
                "width": slider.computedW,
                "marginRight": slider.computedM,
                "float": "left",
                "display": "block"
              });
            } else {
              slider.newSlides.css({
                "width": slider.computedW,
                "marginRight": slider.computedM,
                "float": "left",
                "display": "block"
              });
            }
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) {
              methods.smoothHeight();
            }
          }, type === "init" ? 100 : 0);
        }
      } else {
        // FADE:
        if (slider.vars.rtl) {
          slider.slides.css({
            "width": "100%",
            "float": 'right',
            "marginLeft": "-100%",
            "position": "relative"
          });
        } else {
          slider.slides.css({
            "width": "100%",
            "float": 'left',
            "marginRight": "-100%",
            "position": "relative"
          });
        }
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({
                "opacity": 0,
                "display": "block",
                "zIndex": 1
              }).eq(slider.currentSlide).css({
                "zIndex": 2
              }).css({
                "opacity": 1
              });
            } else {
              slider.slides.css({
                "opacity": 0,
                "display": "block",
                "zIndex": 1
              }).eq(slider.currentSlide).css({
                "zIndex": 2
              }).animate({
                "opacity": 1
              }, slider.vars.animationSpeed, slider.vars.easing);
            }
          } else {
            slider.slides.css({
              "opacity": 0,
              "display": "block",
              "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease",
              "zIndex": 1
            }).eq(slider.currentSlide).css({
              "opacity": 1,
              "zIndex": 2
            });
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) {
          methods.smoothHeight();
        }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) {
        slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
      }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };
    slider.doMath = function () {
      var slide = slider.slides.first(),
        slideMargin = slider.vars.itemMargin,
        minItems = slider.vars.minItems,
        maxItems = slider.vars.maxItems;
      slider.w = slider.viewport === undefined ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = minItems ? minItems * slider.itemT : slider.w;
        slider.maxW = maxItems ? maxItems * slider.itemT - slideMargin : slider.w;
        slider.itemW = slider.minW > slider.w ? (slider.w - slideMargin * (minItems - 1)) / minItems : slider.maxW < slider.w ? (slider.w - slideMargin * (maxItems - 1)) / maxItems : slider.vars.itemWidth > slider.w ? slider.w : slider.vars.itemWidth;
        slider.visible = Math.floor(slider.w / slider.itemW);
        slider.move = slider.vars.move > 0 && slider.vars.move < slider.visible ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil((slider.count - slider.visible) / slider.move + 1);
        slider.last = slider.pagingCount - 1;
        slider.limit = slider.pagingCount === 1 ? 0 : slider.vars.itemWidth > slider.w ? slider.itemW * (slider.count - 1) + slideMargin * (slider.count - 1) : (slider.itemW + slideMargin) * slider.count - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };
    slider.update = function (pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if (action === "add" && !carousel || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if (action === "remove" && !carousel || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) {
        methods.directionNav.update();
      }
    };
    slider.addSlide = function (obj, pos) {
      var $obj = $(obj);
      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        pos !== undefined ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        pos !== undefined ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function (obj) {
      var pos = isNaN(obj) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        vertical && reverse ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $(window).blur(function (e) {
    focused = false;
  }).focus(function (e) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",
    //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",
    //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",
    //String: Select your animation type, "fade" or "slide"
    easing: "swing",
    //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",
    //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,
    //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,
    //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,
    //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,
    //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,
    //Boolean: Animate slider automatically
    slideshowSpeed: 7000,
    //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,
    //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,
    //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,
    //Boolean: Randomize slide order
    fadeFirstSlide: true,
    //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,
    //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,
    //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,
    //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,
    //{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,
    //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,
    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,
    //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,
    //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,
    //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",
    //String: Set the text for the "previous" directionNav item
    nextText: "Next",
    //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,
    //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,
    //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,
    //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,
    //Boolean: Create pause/play dynamic element
    pauseText: "Pause",
    //String: Set the text for the "pause" pausePlay item
    playText: "Play",
    //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",
    //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",
    //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",
    //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",
    //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",
    //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,
    //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,
    //{NEW} Integer: Margin between carousel items.
    minItems: 1,
    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,
    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,
    //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,
    //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function start() {},
    //Callback: function(slider) - Fires when the slider loads the first slide
    before: function before() {},
    //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function after() {},
    //Callback: function(slider) - Fires after each slider animation completes
    end: function end() {},
    //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function added() {},
    //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function removed() {},
    //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function init() {},
    //{NEW} Callback: function(slider) - Fires after the slider is initially setup
    rtl: false //{NEW} Boolean: Whether or not to enable RTL mode
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function (options) {
    if (options === undefined) {
      options = {};
    }
    if ((0,esm_typeof/* default */.Z)(options) === "object") {
      return this.each(function () {
        var $this = $(this),
          selector = options.selector ? options.selector : ".slides > li",
          $slides = $this.find(selector);
        if ($slides.length === 1 && options.allowOneSlide === false || $slides.length === 0) {
          $slides.fadeIn(400);
          if (options.start) {
            options.start($this);
          }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play":
          $slider.play();
          break;
        case "pause":
          $slider.pause();
          break;
        case "stop":
          $slider.stop();
          break;
        case "next":
          $slider.flexAnimate($slider.getTarget("next"), true);
          break;
        case "prev":
        case "previous":
          $slider.flexAnimate($slider.getTarget("prev"), true);
          break;
        default:
          if (typeof options === "number") {
            $slider.flexAnimate(options, true);
          }
      }
    }
  };
})(jQuery);
;// CONCATENATED MODULE: ./src/components/flexslider/js/index.js



/* 
 *************************************
 * <!-- Flexslider (Third-party plugin) -->
 *************************************
 */



var FLEXSLIDER = function (module, $, window, document) {
  if (window.FLEXSLIDER === null) return false;
  module.FLEXSLIDER = module.FLEXSLIDER || {};
  module.FLEXSLIDER.version = '0.2.1';
  module.FLEXSLIDER.documentReady = function ($) {
    var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
    var flexslider = {
      vars: {}
    };
    var pluginNamespace = 'uix-flexslider__';

    /*
     * Tiny helper function to add breakpoints.
     *
     * @param  {Number} number           - Number of carousel items that should be visible.
     * @return {Void}
     */
    function getGridSize(number) {
      return window.innerWidth <= 768 ? 1 : number;
    }

    /*
     * Return an event from callback function to each slider.
     *
     * @param  {Element} thisSlider             - The current slider.
     * @param  {Element} sliderWrapper          - The current slider wrapper.
     * @param  {String} fireState              - State of fire asynchronously.
     * @return {Number}                        - Index of current slider .
     */
    function initslides(sliderWrapper, thisSlider, fireState) {
      if (thisSlider.find('.' + pluginNamespace + 'item').length == 0) return false;
      var curIndex = thisSlider.currentSlide,
        count = thisSlider.count,
        activeClass = pluginNamespace + 'item--active',
        prevClass = activeClass + '-prev',
        nextClass = activeClass + '-next',
        $items = thisSlider.find('.' + pluginNamespace + 'item'),
        $current = thisSlider.slides.eq(curIndex),
        $prev = thisSlider.slides.eq(curIndex - 1),
        $next = thisSlider.slides.eq(thisSlider.animatingTo),
        $first = thisSlider.slides.eq(0),
        curHeight = $current.height(),
        dataNhumbs = thisSlider.data('my-nav-thumbs'),
        dataPNThumbs = thisSlider.data('my-prev-next-thumbs'),
        dataTimeline = thisSlider.data('my-nav-timeline'),
        dataCountTotal = thisSlider.data('my-count-total'),
        dataCountCur = thisSlider.data('my-count-now'),
        dataShowItems = thisSlider.data('my-multiple-items'),
        dataShowItemsMove = thisSlider.data('my-multiple-items-move'),
        dataParallax = thisSlider.data('my-parallax'),
        dataCustomConID = thisSlider.data('my-controls');
      if ((0,esm_typeof/* default */.Z)(dataPNThumbs) === ( true ? "undefined" : 0)) dataPNThumbs = false;
      if ((0,esm_typeof/* default */.Z)(dataTimeline) === ( true ? "undefined" : 0)) dataTimeline = false;
      if ((0,esm_typeof/* default */.Z)(dataCountTotal) === ( true ? "undefined" : 0)) dataCountTotal = false;
      if ((0,esm_typeof/* default */.Z)(dataCountCur) === ( true ? "undefined" : 0)) dataCountCur = false;
      if ((0,esm_typeof/* default */.Z)(dataParallax) === ( true ? "undefined" : 0)) dataParallax = false;
      if ((0,esm_typeof/* default */.Z)(dataShowItemsMove) === ( true ? "undefined" : 0)) dataShowItemsMove = 1;

      //Add disabled class to custom navigation 
      if ((0,esm_typeof/* default */.Z)(dataCustomConID) != ( true ? "undefined" : 0) && dataCustomConID != '' && dataCustomConID != false) {
        var myCustomDirectionNav = $('.uix-flexslider__mycontrols' + dataCustomConID + ' a');
        var disabledClass = pluginNamespace + 'disabled';
        if (thisSlider.pagingCount === 1) {
          myCustomDirectionNav.addClass(disabledClass).attr('tabindex', '-1');
        } else if (!thisSlider.vars.animationLoop) {
          if (thisSlider.animatingTo === 0) {
            myCustomDirectionNav.removeClass(disabledClass);
            myCustomDirectionNav.first().addClass(disabledClass).attr('tabindex', '-1');
          } else if (thisSlider.animatingTo === thisSlider.last) {
            myCustomDirectionNav.removeClass(disabledClass);
            myCustomDirectionNav.last().addClass(disabledClass).attr('tabindex', '-1');
          } else {
            myCustomDirectionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        } else {
          myCustomDirectionNav.removeClass(disabledClass).removeAttr('tabindex');
        }
      }

      //Total counter selector
      //Current counter selector.
      var countTotalSelector = dataCountTotal ? $(dataCountTotal) : $('.uix-flexslider__mycontrols__count em.count'),
        countCurSelector = dataCountCur ? $(dataCountCur) : $('.uix-flexslider__mycontrols__count em.current');

      // Fires when the slider loads the first slide.
      // Fires after each slider animation completes.
      if (fireState == 'start' || fireState == 'after') {
        //Remove the slider loading
        //-------------------------------------
        thisSlider.removeClass(pluginNamespace + '-flexslider-loading');

        //With Timeline
        //-------------------------------------	
        if (dataTimeline && dataTimeline != '') {
          var curPerMinWidth = curIndex / count * 100 + '%',
            curPerMaxWidth = (curIndex + 1) / count * 100 + '%',
            curTotalWidth = $(dataTimeline).width();

          //Fires animation effect of an element width.
          $(dataTimeline).find('> span').css({
            'width': curTotalWidth,
            'transition': 'all ' + parseFloat(thisSlider.vars.slideshowSpeed - thisSlider.vars.animationSpeed) + 'ms linear'
          });
        }

        //Display Next/Prev image thumbnail in navigation
        //-------------------------------------		
        if (dataPNThumbs && dataPNThumbs != '') {
          var prevIndex = curIndex - 1,
            nextIndex = thisSlider.animatingTo + 1,
            pimg = '',
            nimg = '',
            $plink = $(dataPNThumbs + '> a'),
            $plinkPrev = $plink.filter('.uix-flexslider__mycontrols--thumb__prev'),
            $plinkNext = $plink.filter('.uix-flexslider__mycontrols--thumb__next');
          $plinkPrev.removeClass('is-disabled');
          $plinkNext.removeClass('is-disabled');
          if (!thisSlider.vars.animationLoop) {
            if (prevIndex === -1) $plinkPrev.addClass('is-disabled');
            if (nextIndex === thisSlider.last + 1) $plinkNext.addClass('is-disabled');
          } else {
            if (prevIndex === -1) prevIndex = thisSlider.last;
            if (nextIndex === thisSlider.last + 1) nextIndex = 0;
          }

          //Get images URL
          pimg = thisSlider.slides.eq(prevIndex).find('img').attr('src');
          nimg = thisSlider.slides.eq(nextIndex).find('img').attr('src');
          if ($(dataPNThumbs).length > 0) {
            $plink.attr('href', 'javascript:void(0);');
            if ((0,esm_typeof/* default */.Z)(pimg) != ( true ? "undefined" : 0)) $plinkPrev.attr('data-goto', prevIndex).find('> span').html('<img src="' + pimg + '" alt="">');
            if ((0,esm_typeof/* default */.Z)(nimg) != ( true ? "undefined" : 0)) $plinkNext.attr('data-goto', nextIndex).find('> span').html('<img src="' + nimg + '" alt="">');
            $plink.off('click').on('click', function (e) {
              e.preventDefault();
              thisSlider.flexslider(parseInt($(this).attr('data-goto')));
            });
          }
        }

        // Fires local videos asynchronously with slider switch.
        //-------------------------------------
        videoEmbedInit($items, false);
        videoEmbedInit($current, true);

        //Auto-restart player if paused after action
        //-------------------------------------
        if (thisSlider.vars.slideshow) {
          if (!thisSlider.playing) {
            thisSlider.play();
          }
        }

        //Prevent to <a> of page transitions
        //-------------------------------------
        $('a').each(function () {
          var attr = $(this).attr('href');
          if ((0,esm_typeof/* default */.Z)(attr) === ( true ? "undefined" : 0)) {
            $(this).attr('href', '#');
          }
        });

        //Thumbnail ControlNav Pattern
        //-------------------------------------
        if (dataNhumbs && dataNhumbs != '') {
          $('.uix-flexslider__thumbs' + dataNhumbs + ' > ul > li').removeClass('is-active');
          $('.uix-flexslider__thumbs' + dataNhumbs + ' > ul > li').eq(curIndex).addClass('is-active');
        }

        //Initialize items background of the slider
        //-------------------------------------
        thisSlider.find('[data-slider-bg]').each(function () {
          $(this).css('background-image', 'url(' + $(this).data('slider-bg') + ')');
        });

        //Enable "prettyPhoto" plugin
        //-------------------------------------
        if ($.isFunction($.fn.lightbox)) {
          thisSlider.slides.find("a[rel^='theme-slider-prettyPhoto']").lightbox();
        }

        //Return an event from callback function to each slider 
        //with dynamic min/max ranges.
        //-------------------------------------

        if ((0,esm_typeof/* default */.Z)(dataShowItems) != ( true ? "undefined" : 0) && dataShowItems != '' && dataShowItems != 0) {
          if (dataShowItemsMove == 1) {
            $items.removeClass(activeClass);
            $items.removeClass(prevClass);
            $items.removeClass(nextClass);
            if (windowWidth <= 768) {
              //Focus slider
              $items.eq(parseFloat(curIndex)).addClass(activeClass);
            } else {
              //Focus slider
              $items.eq(parseFloat(curIndex + 1)).addClass(activeClass);

              //Previous slider
              $items.eq(parseFloat(curIndex)).addClass(prevClass);

              //Next slider
              $items.eq(parseFloat(curIndex + 2)).addClass(nextClass);
            }
          } else {
            $items.addClass(activeClass);
          }
        }

        //Display counter
        //-------------------------------------
        if (sliderWrapper.find('.uix-flexslider__mycontrols__count').length == 0) {
          if (sliderWrapper.closest('section').find('.uix-flexslider__mycontrols__count').length > 0) {
            var showCountTotal = count,
              showCountCur = curIndex + 1;
            if (showCountTotal < 10) showCountTotal = '0' + showCountTotal;
            if (showCountCur < 10) showCountCur = '0' + showCountCur;
            countTotalSelector.text(showCountTotal);
            countCurSelector.text(showCountCur);
          }
        }
      }

      // Fires asynchronously with each slider animation.
      if (fireState == 'before') {
        //Common images style
        //-------------------------------------	
        $next.find('img').addClass('is-active');
        $current.find('img').removeClass('is-active');
        $prev.find('img').removeClass('is-active');
        $first.find('img').removeClass('is-active');

        //With Timeline
        //-------------------------------------	
        if (dataTimeline && dataTimeline != '') {
          //Fires animation effect of an element width.
          $(dataTimeline).find('> span').css({
            'width': 0,
            'transition': 'all 100ms linear'
          });
        }
      }

      // Fires when the slider reaches the last slide (asynchronous).
      if (fireState == 'end') {
        //Common images style
        //-------------------------------------	
        $first.find('img').addClass('is-active');
      }

      // Fires asynchronously with each slider animation.
      // Fires when the slider loads the first slide.
      if (fireState == 'before' || fireState == 'start') {
        //Return an event from callback function to each slider to make parallax effect.
        //-------------------------------------
        if (dataParallax) {
          var dir = 'uix-flexslider__item--left';
          $.each(thisSlider.slides, function (i, item) {
            var el = $(item);
            el.removeClass('uix-flexslider__item--right uix-flexslider__item--left');
            if (i >= thisSlider.animatingTo && dir !== 'uix-flexslider__item--right') {
              dir = 'uix-flexslider__item--right';
            } else {
              el.addClass(dir);
            }
          });
        }
      }
      return curIndex;
    }

    /*
     * Initialize embedded local video.
     *
     * @param  {Element} wrapper          - The outermost video container, which can contain multiple videos
     * @param  {Boolean} play            - Forced to trigger pause or play events.
     * @return {Void}
     */
    function videoEmbedInit(wrapper, play) {
      wrapper.find('.uix-video__slider').each(function () {
        var $this = $(this);
        var videoWrapperW = $this.closest('[data-embed-video-wrapper]').width(),
          curVideoID = $this.find('video').attr('id') + '-slider-videopush',
          coverPlayBtnID = 'videocover-' + curVideoID,
          $replayBtn = $('#' + curVideoID + '-replay-btn');
        var dataControls = $this.data('embed-video-controls'),
          dataAuto = $this.data('embed-video-autoplay'),
          dataLoop = $this.data('embed-video-loop'),
          dataW = $this.data('embed-video-width'),
          dataH = $this.data('embed-video-height');

        //Push a new ID to video
        //Solve the problem that ajax asynchronous loading does not play
        $this.find('.video-js').attr('id', curVideoID);
        if ((0,esm_typeof/* default */.Z)(dataAuto) === ( true ? "undefined" : 0)) {
          dataAuto = true;
        }
        if ((0,esm_typeof/* default */.Z)(dataLoop) === ( true ? "undefined" : 0)) {
          dataLoop = true;
        }
        if ((0,esm_typeof/* default */.Z)(dataControls) === ( true ? "undefined" : 0)) {
          dataControls = false;
        }
        if ((0,esm_typeof/* default */.Z)(dataW) === ( true ? "undefined" : 0) || dataW == 'auto') {
          dataW = videoWrapperW;
        }
        if ((0,esm_typeof/* default */.Z)(dataH) === ( true ? "undefined" : 0) || dataH == 'auto') {
          dataH = videoWrapperW / 1.77777777777778;
        }

        //Display cover and play buttons when some mobile device browsers cannot automatically play video
        if ($('#' + coverPlayBtnID).length == 0) {
          $('<div id="' + coverPlayBtnID + '" class="uix-video__cover"><span class="uix-video__cover__placeholder" style="background-image:url(' + $this.find('video').attr('poster') + ')"></span><span class="uix-video__cover__playbtn"></span></div>').insertBefore($this);
          var btnEv = Modernizr.touchevents ? 'touchstart' : 'click';
          $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').on(btnEv, function (e) {
            e.preventDefault();
            myPlayer.play();
            $('#' + coverPlayBtnID).hide();
          });
        }

        //Add replay button to video 
        if ($replayBtn.length == 0) {
          $this.after('<span class="uix-video__btn-play" id="' + curVideoID + '-replay-btn"></span>');
        }

        //HTML5 video autoplay on mobile revisited
        if (dataAuto && windowWidth <= 768) {
          $this.find('.video-js').attr({
            'autoplay': 'true',
            'muted': 'true',
            'playsinline': 'true'
          });
        }
        var myPlayer = videojs(curVideoID, {
          width: dataW,
          height: dataH,
          loop: dataLoop,
          autoplay: dataAuto
        }, function onPlayerReady() {
          var initVideo = function initVideo(obj) {
            //Get Video Dimensions
            var curW = obj.videoWidth(),
              curH = obj.videoHeight(),
              newW = curW,
              newH = curH;
            newW = videoWrapperW;

            //Scaled/Proportional Content 
            newH = curH * (newW / curW);
            if (!isNaN(newW) && !isNaN(newH)) {
              obj.height(newH);
              obj.width(newW);
              $this.css('height', newH);
            }

            //Show this video wrapper
            $this.css('visibility', 'visible');

            //Hide loading effect
            $this.find('.vjs-loading-spinner, .vjs-big-play-button').hide();
          };

          /* ---------  Video initialize */
          this.on('loadedmetadata', function () {
            initVideo(this);
          });

          /* ---------  Display the play button  */
          if (!dataAuto) $this.find('.vjs-big-play-button').show();
          $this.find('.vjs-big-play-button').off('click').on('click', function () {
            $(this).hide();
          });

          /* ---------  Set, tell the player it's in fullscreen  */
          if (dataAuto) {
            //Fix an error of Video auto play is not working in browser
            //this.muted( true ); 

            //Prevent autoplay error: Uncaught (in promise) DOMException
            var promise = this.play();
            if (promise !== undefined) {
              promise.then(function () {
                // Autoplay started!
              })["catch"](function (error) {
                // Autoplay was prevented.
                $('#' + coverPlayBtnID).show();
                $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                console.log('Autoplay was prevented.');
              });
            }
          }

          /* ---------  Disable control bar play button click */
          if (!dataControls) {
            this.controls(false);
          }

          /* ---------  Determine if the video is auto played from mobile devices  */
          var autoPlayOK = false;
          this.on('timeupdate', function () {
            var duration = this.duration();
            if (duration > 0) {
              autoPlayOK = true;
              if (this.currentTime() > 0) {
                autoPlayOK = true;
                this.off('timeupdate');

                //Hide cover and play buttons when the video automatically played
                $('#' + coverPlayBtnID).hide();
              }
            }
          });

          /* ---------  Pause the video when it is not current slider  */
          if (!play) {
            this.pause();
            this.currentTime(0);
          } else {
            if (dataAuto) {
              this.currentTime(0);

              //Prevent autoplay error: Uncaught (in promise) DOMException
              var _promise = this.play();
              if (_promise !== undefined) {
                _promise.then(function () {
                  // Autoplay started!
                })["catch"](function (error) {
                  // Autoplay was prevented.
                  $('#' + coverPlayBtnID).show();
                  $('#' + coverPlayBtnID + ' .uix-video__cover__playbtn').show();
                  console.log('Autoplay was prevented.');
                });
              }

              //Hidden replay button
              $replayBtn.hide();

              //Should the video go to the beginning when it ends
              this.on('ended', function () {
                if (dataLoop) {
                  this.currentTime(0);
                  this.play();
                } else {
                  //Replay this video
                  this.currentTime(0);
                  $replayBtn.show().off('click').on('click', function (e) {
                    e.preventDefault();
                    this.play();
                    $replayBtn.hide();
                  });
                }
              });
            }
          }
        });
      });
    }

    /*
     * Make slider image draggable 
     *
     * @param  {Element} $obj             - The current FlexSlider setup using custom selector.
     * @return {Void}
     */
    function slidesExDraggable($obj, animDelay) {
      function prevMove() {
        $obj.flexslider('prev');
      }
      function nextMove() {
        $obj.flexslider('next');
      }

      //Added touch method to mobile device and desktop
      //-------------------------------------	
      var $dragTrigger = $obj.find('.uix-flexslider__inner');
      var mouseX, mouseY;
      var isMoving = false;

      //Avoid images causing mouseup to fail
      $dragTrigger.find('img').css({
        'pointer-events': 'none',
        'user-select': 'none'
      });

      //Make the cursor a move icon when a user hovers over an item
      $dragTrigger.css('cursor', 'move');
      $dragTrigger[0].removeEventListener('mousedown', dragStart);
      document.removeEventListener('mouseup', dragEnd);

      //
      $dragTrigger[0].addEventListener('mousedown', dragStart);
      function dragStart(e) {
        if ($obj.data('flexslider').animating) {
          return;
        }

        //Do not use "e.preventDefault()" to avoid prevention page scroll on drag in IOS and Android
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', dragProcess);
      }
      function dragProcess(e) {
        var offsetX, offsetY;
        offsetX = mouseX - e.clientX, offsetY = mouseY - e.clientY;
        if ('horizontal' === $obj.data('flexslider').vars.direction) {
          //--- left
          if (offsetX >= 50) {
            if (!isMoving) {
              isMoving = true;
              nextMove();
            }
          }

          //--- right
          if (offsetX <= -50) {
            if (!isMoving) {
              isMoving = true;
              prevMove();
            }
          }
        } else {
          //--- up
          if (offsetY >= 50) {
            if (!isMoving) {
              isMoving = true;
              nextMove();
            }
          }

          //--- down
          if (offsetY <= -50) {
            if (!isMoving) {
              isMoving = true;
              prevMove();
            }
          }
        }
      }
      function dragEnd(e) {
        document.removeEventListener('mousemove', dragProcess);

        //restore move action status
        setTimeout(function () {
          isMoving = false;
        }, animDelay);
      }
    }

    /*
     *  Scroll The Slider With Mousewheel
     *
     * @param  {Element} $obj            - The current FlexSlider setup using custom selector.
     * @return {Void}
     */
    function slidesExMousewheel($obj) {
      var timer = null,
        wheeling = false;
      $obj[0].addEventListener('wheel', function (e) {
        //Gets a value that indicates the amount that the mouse wheel has changed.
        var delta = Math.max(-1, Math.min(1, -e.deltaY));
        if (timer) {
          clearTimeout(timer);
        }
        if (!wheeling) {
          if (delta < 0) {
            //scroll down
            $obj.flexslider('next');
          } else {
            //scroll up
            $obj.flexslider('prev');
          }
        }
        wheeling = true;
        timer = setTimeout(function () {
          wheeling = false;
        }, 60);
      }, browser.supportsPassive ? {
        passive: true
      } : false);
    }

    /*
     * Slider With Thumbnail ControlNav Pattern
     *
     * @param  {Element} slider           - The current slider.
     * @param  {String} navThumbClass    - Class name of thumbnail controlNav.
     * @return {Void}
     */
    function initslidesWithNavThumb(slider, navThumbClass) {
      $('.uix-flexslider__thumbs' + navThumbClass + ' > ul > li').off('click').on('click', function () {
        $('.uix-flexslider__thumbs' + navThumbClass + ' > ul > li').removeClass('is-active');
        $(this).addClass('is-active');
        slider.flexslider($(this).index());
      });
    }

    /*
    * Method that updates children slides
    * fortunately, since all the children are not animating,
    * they will only update if the main flexslider updates. 
     *
     * @param  {Number} slideNumber          - The current slider index.
     * @param  {Element} childrenSlidesObj    - Target slider.
     * @param  {Boolean} loop                - Gives the slider a seamless infinite loop.
     * @param  {Number} speed                - Set the speed of animations, in milliseconds.
     * @param  {Number} timing               - Set the speed of the slideshow cycling, in milliseconds.
     * @return {Void}
     */
    function updateChildrenSlides(slideNumber, childrenSlidesObj, loop, speed, timing) {
      /** 
      * Create the children flexsliders. Must be array of jquery objects with the
      * flexslider data. Easiest way is to place selector group in a var.
      */
      var childrenSlides = $(childrenSlidesObj).flexslider({
        slideshow: false,
        // Remove the animations
        controlNav: false,
        // Remove the controls
        animationLoop: loop,
        animationSpeed: speed,
        slideshowSpeed: timing
      });

      // Iterate through the children slides but not past the max
      for (var i = 0; i < childrenSlides.length; i++) {
        // Run the animate method on the child slide
        $(childrenSlides[i]).data('flexslider').flexAnimate(slideNumber);
      }
    }

    /*! 
     ---------------------------
           Initialize slideshow
     ---------------------------
     */
    var $sliderDefault = $('.uix-flexslider');
    $sliderDefault.each(function () {
      var $this = $(this);
      var dataSpeed = $this.data('speed'),
        dataDrag = $this.data('draggable'),
        dataWheel = $this.data('wheel'),
        dataTiming = $this.data('timing'),
        dataLoop = $this.data('loop'),
        dataPrev = $this.data('prev'),
        dataNext = $this.data('next'),
        dataAnim = $this.data('animation'),
        dataPaging = $this.data('paging'),
        dataArrows = $this.data('arrows'),
        dataAuto = $this.data('auto'),
        dataNhumbs = $this.data('my-nav-thumbs'),
        dataPNThumbs = $this.data('my-prev-next-thumbs'),
        dataTimeline = $this.data('my-nav-timeline'),
        dataCountTotal = $this.data('my-count-total'),
        dataCountCur = $this.data('my-count-now'),
        customConID = $this.data('my-controls'),
        dataShowItems = $this.data('my-multiple-items'),
        dataShowItemsMove = $this.data('my-multiple-items-move'),
        dataParallax = $this.data('my-parallax'),
        dataSync = $this.data('my-sync');

      //Fires local videos asynchronously with slider switch.
      videoEmbedInit($this.find('.uix-flexslider__item'), false);

      // Custom Controls
      var myControlsContainer, myCustomDirectionNav;
      if ((0,esm_typeof/* default */.Z)(customConID) === ( true ? "undefined" : 0) || customConID == '' || customConID == false) {
        myControlsContainer = '';
        myCustomDirectionNav = '';
      } else {
        myControlsContainer = $('.uix-flexslider__mycontrols' + customConID + ' .uix-flexslider__mycontrols__control-paging');
        myCustomDirectionNav = $('.uix-flexslider__mycontrols' + customConID + ' a');

        //Change the class naming of the page up and down buttons to support trigger events
        myCustomDirectionNav.first().addClass(pluginNamespace + 'prev');
        myCustomDirectionNav.last().addClass(pluginNamespace + 'next');
      }

      // If there is no data-xxx, save current source to it
      if ((0,esm_typeof/* default */.Z)(dataSpeed) === ( true ? "undefined" : 0)) dataSpeed = 600;
      if ((0,esm_typeof/* default */.Z)(dataTiming) === ( true ? "undefined" : 0)) dataTiming = 10000;
      if ((0,esm_typeof/* default */.Z)(dataLoop) === ( true ? "undefined" : 0)) dataLoop = true;
      if ((0,esm_typeof/* default */.Z)(dataPrev) === ( true ? "undefined" : 0)) dataPrev = "<i class='fa fa-chevron-left'></i>";
      if ((0,esm_typeof/* default */.Z)(dataNext) === ( true ? "undefined" : 0)) dataNext = "<i class='fa fa-chevron-right'></i>";
      if ((0,esm_typeof/* default */.Z)(dataAnim) === ( true ? "undefined" : 0)) dataAnim = 'slide';
      if ((0,esm_typeof/* default */.Z)(dataPaging) === ( true ? "undefined" : 0)) dataPaging = true;
      if ((0,esm_typeof/* default */.Z)(dataArrows) === ( true ? "undefined" : 0)) dataArrows = true;
      if ((0,esm_typeof/* default */.Z)(dataAuto) === ( true ? "undefined" : 0)) dataAuto = true;
      if ((0,esm_typeof/* default */.Z)(dataDrag) === ( true ? "undefined" : 0)) dataDrag = false;
      if ((0,esm_typeof/* default */.Z)(dataWheel) === ( true ? "undefined" : 0)) dataWheel = false;
      if ((0,esm_typeof/* default */.Z)(dataNhumbs) === ( true ? "undefined" : 0)) dataNhumbs = false;
      if ((0,esm_typeof/* default */.Z)(dataPNThumbs) === ( true ? "undefined" : 0)) dataPNThumbs = false;
      if ((0,esm_typeof/* default */.Z)(dataTimeline) === ( true ? "undefined" : 0)) dataTimeline = false;
      if ((0,esm_typeof/* default */.Z)(dataCountTotal) === ( true ? "undefined" : 0)) dataCountTotal = false;
      if ((0,esm_typeof/* default */.Z)(dataCountCur) === ( true ? "undefined" : 0)) dataCountCur = false;
      if ((0,esm_typeof/* default */.Z)(dataParallax) === ( true ? "undefined" : 0)) dataParallax = false;
      if ((0,esm_typeof/* default */.Z)(dataShowItemsMove) === ( true ? "undefined" : 0)) dataShowItemsMove = 1;

      //Make slider image draggable 
      if (dataDrag) slidesExDraggable($this, dataSpeed);

      //Scroll The Slider With Mousewheel
      if (dataWheel) slidesExMousewheel($this);

      //With Thumbnail ControlNav Pattern
      if (dataNhumbs) {
        initslidesWithNavThumb($this, dataNhumbs);
        //Prevent index error
        dataLoop = false;
      }

      //Show number of items
      var my_itemWidth = 0,
        my_move = dataShowItemsMove,
        my_minItems = 0,
        my_maxItems = 0;
      if ((0,esm_typeof/* default */.Z)(dataShowItems) != ( true ? "undefined" : 0) && dataShowItems != '' && dataShowItems != 0) {
        my_itemWidth = 1;
        my_minItems = getGridSize(dataShowItems);
        my_maxItems = getGridSize(dataShowItems);
      }

      // Determine if this slider is added with a synchronization event
      $('[data-my-sync]').each(function () {
        var curSync = $(this).data('my-sync');
        var thisSliderID = $this.attr('id');
        if ((0,esm_typeof/* default */.Z)(curSync) != ( true ? "undefined" : 0)) {
          curSync = curSync.toString().replace('#', '').replace('.', '');
        }
        if ((0,esm_typeof/* default */.Z)(thisSliderID) != ( true ? "undefined" : 0) && thisSliderID == curSync) {
          dataAuto = false; //Set it not to scroll automatically
          dataPaging = false;

          // break out of jQuery each Loop
          return false;
        }
      });
      $this.flexslider({
        namespace: pluginNamespace,
        animation: dataAnim,
        selector: '.uix-flexslider__inner > div.uix-flexslider__item',
        controlNav: dataPaging,
        smoothHeight: true,
        prevText: dataPrev,
        nextText: dataNext,
        animationSpeed: dataSpeed,
        slideshowSpeed: dataTiming,
        slideshow: dataAuto,
        animationLoop: dataLoop,
        directionNav: dataArrows,
        itemWidth: my_itemWidth,
        move: my_move,
        // Number of carousel items that should move on animation.
        minItems: my_minItems,
        // use function to pull in initial value
        maxItems: my_maxItems,
        // use function to pull in initial value
        controlsContainer: myControlsContainer,
        customDirectionNav: myCustomDirectionNav,
        //Fires when the slider loads the first slide.
        start: function start(slider) {
          //set slider instance to flexslider variable
          if ((0,esm_typeof/* default */.Z)(dataShowItems) != ( true ? "undefined" : 0) && dataShowItems != '' && dataShowItems != 0) {
            flexslider = slider;
          }
          initslides($this, slider, 'start');
        },
        //Fires asynchronously with each slider animation.
        before: function before(slider) {
          initslides($this, slider, 'before');

          // Call the updateChildrenSlides which itterates through all children slides 
          if ((0,esm_typeof/* default */.Z)(dataSync) != ( true ? "undefined" : 0) && dataSync != '' && dataSync != 0) {
            updateChildrenSlides(slider.animatingTo, dataSync, dataLoop, dataSpeed, dataTiming);
          }
        },
        //Fires after each slider animation completes.
        after: function after(slider) {
          initslides($this, slider, 'after');
        },
        //Fires when the slider reaches the last slide (asynchronous).
        end: function end(slider) {
          initslides($this, slider, 'end');
        }
      });
    });

    /*! 
     ---------------------------
           Check grid size on resize event
     ---------------------------
     */
    function windowUpdate() {
      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != windowWidth) {
        // Update the window width for next time
        windowWidth = window.innerWidth;

        // Do stuff here
        $sliderDefault.each(function () {
          if ($(this).length > 0) {
            // check grid size on resize event
            var dataShowItems = $(this).data('my-multiple-items');
            if ((0,esm_typeof/* default */.Z)(dataShowItems) != ( true ? "undefined" : 0) && dataShowItems != '' && dataShowItems != 0) {
              var gridSize = getGridSize(dataShowItems);
              flexslider.vars.minItems = gridSize;
              flexslider.vars.maxItems = gridSize;
            }
            $(this).data('flexslider').setup();
          }
        });
      }
    }

    // Add function to the window that should be resized
    var debounceFuncWindow = UixDebounce(windowUpdate, 50);
    window.removeEventListener('resize', debounceFuncWindow);
    window.addEventListener('resize', debounceFuncWindow);
  };
  module.components.documentReady.push(module.FLEXSLIDER.documentReady);
  return /*#__PURE__*/_createClass(function FLEXSLIDER() {
    _classCallCheck(this, FLEXSLIDER);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/floating-side-element/js/index.js


/* 
 *************************************
 * <!-- Floating Side Element -->
 *************************************
 */


var FLOATING_SIDE_EL = function (module, $, window, document) {
  if (window.FLOATING_SIDE_EL === null) return false;
  module.FLOATING_SIDE_EL = module.FLOATING_SIDE_EL || {};
  module.FLOATING_SIDE_EL.version = '0.0.7';
  module.FLOATING_SIDE_EL.documentReady = function ($) {
    var documentHeight = 0,
      $floatingSideEl = $('.uix-floating-side-el'),
      floatingOffset = $floatingSideEl.offset();

    //Prevent this module from loading in other pages
    if ($floatingSideEl.length == 0) return false;
    documentHeight = $(document).height();

    //Init position
    TweenMax.to($floatingSideEl, 0.3, {
      css: {
        marginTop: -floatingOffset.top + ($(window).height() - $floatingSideEl.height()) / 2
      }
    });
    function scrollUpdate() {
      var sideBarHeight = $floatingSideEl.height(),
        scrolled = $(window).scrollTop();
      documentHeight = $(document).height();
      if (scrolled > floatingOffset.top) {
        var newPosition = scrolled - floatingOffset.top,
          maxPosition = documentHeight - sideBarHeight;
        if (newPosition > maxPosition) {
          newPosition = maxPosition;
        }
        TweenMax.to($floatingSideEl, 0.3, {
          css: {
            marginTop: newPosition + (window.innerHeight - sideBarHeight) / 2
          }
        });
      } else {
        TweenMax.to($floatingSideEl, 0.3, {
          css: {
            marginTop: 0
          }
        });
      }
    }

    // Add function to the element that should be used as the scrollable area.
    var throttleFunc = UixThrottle(scrollUpdate, 5);
    window.removeEventListener('scroll', throttleFunc);
    window.removeEventListener('touchmove', throttleFunc);
    window.addEventListener('scroll', throttleFunc);
    window.addEventListener('touchmove', throttleFunc);
    throttleFunc();
  };
  module.components.documentReady.push(module.FLOATING_SIDE_EL.documentReady);
  return /*#__PURE__*/_createClass(function FLOATING_SIDE_EL() {
    _classCallCheck(this, FLOATING_SIDE_EL);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/form-progress/js/fn/form-progress-to-next.js

/*
 * Shows the next form.
 *
 * @param  {Element} selector        - Each target forms selector.
 * @param  {Element} formTarget      - Wrapper of target forms selector.
 * @param  {String} indicator       - Indicator of timeline.
 * @param  {Number} index           - Default index for initialization.
 * 									  0 => step one, 
 * 									  1 => step two
 * 									  2 => step three
 * 									  3 => step four
 * 									  4 => step five
 * 									  ...
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixFormProgressToNext = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      selector: $('.uix-form-progress__target .uix-form-progress__target__step'),
      formTarget: $('.uix-form-progress__target'),
      indicator: '.uix-form-progress .uix-form-progress__indicator',
      index: 0
    }, options);
    this.each(function () {
      var $this = $(this);
      var transitionEnd = 'webkitTransitionEnd transitionend',
        $sections = settings.selector,
        $formTarget = settings.formTarget,
        $indicator = $(settings.indicator),
        allStep = $indicator.length,
        stepPerValue = 100 / (allStep - 1);
      var value = 0,
        tarIndex,
        curIndex;
      if ($indicator.length == 0) return false;

      //Returns current index
      if (settings.index > allStep - 1) {
        curIndex = allStep - 1;
      } else {
        curIndex = settings.index;
      }
      tarIndex = curIndex - 1;

      // Returns current index
      if (tarIndex > allStep - 2) {
        value = stepPerValue * (allStep - 2);
        curIndex = allStep - 2;
      } else {
        curIndex = tarIndex;
      }

      // Increment value (based on 4 steps 0 - 100)
      value = stepPerValue * curIndex;

      //Get form transition speed
      var dur = $formTarget.data('anime-speed');
      if ((0,esm_typeof/* default */.Z)(dur) === ( true ? "undefined" : 0)) {
        dur = '0.5s';
      }
      var durString = dur.toString().toLowerCase(),
        isMS = durString.indexOf('ms') >= 0,
        numberNum = durString.replace('ms', '').replace('s', ''),
        animeSpeed = isMS ? numberNum : numberNum * 1000;
      var currentFormStep = parseInt($sections.eq(tarIndex).attr('data-step')) || false,
        $nextForm = $formTarget.find('.uix-form-progress__target__step[data-step="' + (currentFormStep + 1) + '"]');
      var currentFormIndex = $nextForm.attr('data-step') - 1;
      if (isNaN(currentFormIndex)) currentFormIndex = 0;

      // Activate other unused modules
      if (currentFormIndex > 0) {
        for (var i = 0; i < curIndex; i++) {
          $sections.eq(i).addClass('leaving');
          $indicator.eq(i).addClass('is-active');
        }
        $indicator.eq(curIndex).addClass('is-active');
      }

      // Hide current form fields
      $sections.eq(tarIndex).addClass('leaving');
      setTimeout(function () {
        $indicator.eq(currentFormIndex).addClass('is-active');
      }, animeSpeed);

      // Show next form fields
      $nextForm.addClass('coming').one(transitionEnd, function () {
        $nextForm.removeClass('coming waiting');
      });

      // Active next form fields
      $sections.removeClass('is-active');
      $sections.eq(currentFormIndex).addClass('is-active');

      // Increment value (based on 4 steps 0 - 100)
      value += stepPerValue;

      //console.log( currentFormIndex );

      //Initialize pointer and form location data
      if (currentFormIndex == 0) {
        //Avoid initialization to always cover other same events
        $('body').addClass('form-progress-initok');

        //so something
        $indicator.removeClass('is-active');
        $indicator.each(function (index) {
          $(this).css('left', index * stepPerValue + '%');
          $formTarget.find('.uix-form-progress__target__step:eq(' + index + ')').attr('data-step', index + 1);
        });
        setTimeout(function () {
          $formTarget.addClass('js-uix-show');
        }, animeSpeed);
        $formTarget.find('.uix-form-progress__target__step').removeClass('left leaving').css({
          'position': 'absolute'
        }).not(':eq(0)').addClass('waiting');
      }

      //Set wrapper height
      var currentContentH = $formTarget.find('.uix-form-progress__target__step:eq(' + currentFormIndex + ') > .uix-form-progress__content').height() + 100;
      $formTarget.css('height', currentContentH + 'px');
      var curText = $('.uix-form-progress .uix-form-progress__indicator:eq(' + currentFormIndex + ') > span').html();
      $('#app-form-progress-text').text(curText);

      //The current indicator class
      $indicator.removeClass('current');
      $indicator.eq(currentFormIndex).addClass('current');

      // Reset if we've reached the end
      if (value >= 100) {
        $formTarget.find('.uix-form-progress__target__step').addClass('leaving').last().removeClass('coming waiting leaving');
      } else {
        $('.uix-form-progress').find('.uix-form-progress__indicator.is-active').next('.uix-form-progress__indicator').addClass('is-active');
      }

      // Set progress bar value
      $('.uix-form-progress .uix-form-progress__line span').css('width', value + '%');
      return false;
    });
  };
})(jQuery);
;// CONCATENATED MODULE: ./src/components/form-progress/js/index.js



/* 
 *************************************
 * <!-- Form Progress -->
 *************************************
 */

/*
    Note:
	
	If you want to initialize the indicator to a location when the page is first run,
	you need to call the following function:
	
	$( 'body' ).waitForImages().done(function() {
		$( document ).UixFormProgressToNext({ 
			'selector'         : $( '.uix-form-progress__target .uix-form-progress__target__step' ),
			'formTarget'       : $( '.uix-form-progress__target' ),
			'indicator'        : '.uix-form-progress .uix-form-progress__indicator',
			'index'            : 0
		});
	});


*/





var FORM_PROGRESS = function (module, $, window, document) {
  if (window.FORM_PROGRESS === null) return false;
  module.FORM_PROGRESS = module.FORM_PROGRESS || {};
  module.FORM_PROGRESS.version = '0.0.5';
  module.FORM_PROGRESS.pageLoaded = function () {
    var $progressBar = $('.uix-form-progress progress'),
      $formTarget = $('.uix-form-progress__target'),
      $indicator = $('.uix-form-progress .uix-form-progress__indicator'),
      formAreaH = $formTarget.height(),
      allStep = $indicator.length,
      stepPerValue = 100 / (allStep - 1),
      value = 0,
      transitionEnd = 'webkitTransitionEnd transitionend';

    //Get form transition speed
    var dur = $formTarget.data('anime-speed');
    if ((0,esm_typeof/* default */.Z)(dur) === ( true ? "undefined" : 0)) {
      dur = '0.5s';
    }
    var durString = dur.toString().toLowerCase(),
      isMS = durString.indexOf('ms') >= 0,
      numberNum = durString.replace('ms', '').replace('s', ''),
      animeSpeed = isMS ? numberNum : numberNum * 1000;

    //Gets the party started.
    formReset();

    //Display the target
    setTimeout(function () {
      $formTarget.addClass('is-active');
    }, parseFloat(dur) * 1000);

    // Show next form on continue click
    $(document).off('click.FORM_PROGRESS').on('click.FORM_PROGRESS', '.uix-form-progress__target .go-step:not(.disable)', function (e) {
      e.preventDefault();
      var $sections = $(this).parents('.uix-form-progress__target__step');
      $(document).UixFormProgressToNext({
        'selector': $('.uix-form-progress__target .uix-form-progress__target__step'),
        'formTarget': $formTarget,
        'indicator': '.uix-form-progress .uix-form-progress__indicator',
        'index': $sections.index() + 1
      });

      //Scroll Top
      TweenMax.to(window, 0.5, {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        ease: Power2.easeOut
      });
    });

    // Reset form on reset button click
    $(document).off('click.FORM_PROGRESS_RESET').on('click.FORM_PROGRESS_RESET', '.uix-form-progress__target .go-reset', function (e) {
      e.preventDefault();
      formReset();
    });

    /*
     * Resets the form back to the default state.
     *
     * @return {Void}
     */
    function formReset() {
      $(document).UixFormProgressToNext({
        'selector': $('.uix-form-progress__target .uix-form-progress__target__step'),
        'formTarget': $('.uix-form-progress__target'),
        'indicator': '.uix-form-progress .uix-form-progress__indicator',
        'index': 0
      });
    }
  };
  module.components.pageLoaded.push(module.FORM_PROGRESS.pageLoaded);
  return /*#__PURE__*/_createClass(function FORM_PROGRESS() {
    _classCallCheck(this, FORM_PROGRESS);
    this.module = module;
  });
}(UixModuleInstance, jQuery, window, document);
;// CONCATENATED MODULE: ./src/components/form/js/fn/normal-radio.js

/*
 * Render Normal Radio
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
(function ($) {
  'use strict';

  $.fn.UixRenderNormalRadio = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({
      controls: '.uix-controls__radio'
    }, options);
    this.each(function () {
      $(settings.controls).each(function () {
        var $this = $(this);

        // Initialize status
        //------------------------------------------
        $this.find('> label').each(function () {
          var targetID = '#' + $(this).parent().attr("data-targetid");
          var switchIDs = '';

          //add switch IDs
          $(this).parent().find('> label').each(function () {
            if ((0,esm_typeof/* default */.Z)($(this).data("switchid")) != ( true ? "undefined" : 0)) {
              switchIDs += $(this).data("switchid") + ',';
            }
          });
          $(this).parent().attr("data-switchids", switchIDs.replace(/,\s*$/, ''));

          //Set actived style from their values
          if ((0,esm_typeof/* default */.Z)($(this).data('value')) != ( true ? "undefined" : 0)) {
            if ($(targetID).val() == $(this).data('value')) {
              $(this).addClass('is-active').find('[type="radio"]').prop('checked', true);
            } else {
              $(this).removeClass('is-active').find('[type="radio"]').prop('checked', false);
            }
          }
        });

        // Mouse events
        //------------------------------------------
        var normalRadioItem = settings.controls + ' > label';

        /*
        * Initialize single switch
        *
        * @param  {Element} obj                 - Radio controls. 
        * @return {Void}
        */
        var hideAllNormalRadioItems = function hideAllNormalRadioItems(obj) {
          obj.each(function (index) {
            var $sel = $(this),
              defaultValue = $('#' + $sel.attr("data-targetid")).val(),
              deffaultSwitchIndex = 0;

            //get default selected switch index
            $sel.find('> label').each(function (index) {
              if (defaultValue == $(this).data('value')) {
                deffaultSwitchIndex = index;
              }
            });
            if ((0,esm_typeof/* default */.Z)($sel.data('switchids')) != ( true ? "undefined" : 0) && $sel.data('switchids') != '') {
              var _switchIDsArr = $sel.data('switchids').split(',');
              _switchIDsArr.forEach(function (element, index) {
                if (deffaultSwitchIndex != index) {
                  $('#' + element).hide();
                } else {
                  $('#' + element).show();
                }
              });
            }
          });
        };
        hideAllNormalRadioItems($(settings.controls));
        $(document).off('click.FORM_NORMAL_RADIO').on('click.FORM_NORMAL_RADIO', normalRadioItem, function (e) {
          var $selector = $(this).parent(),
            $option = $(this),
            targetID = '#' + $selector.data("targetid"),
            switchID = '#' + $option.data("switchid"),
            curVal = $option.data('value');

          //Radio Selector
          $selector.find('> label').removeClass('is-active').find('[type="radio"]').prop('checked', false);
          $(targetID).val(curVal);
          $option.addClass('is-active').find('[type="radio"]').prop('checked', true);

          //Switch some options
          if ((0,esm_typeof/* default */.Z)($option.data("switchid")) != ( true ? "undefined" : 0)) {
            hideAllNormalRadioItems($selector);
            $(switchID).show();
          }

          //Dynamic listening for the latest value
          $(targetID).focus().blur();
        });
      });
    });
  };
})(jQuery);
// EXTERNAL MODULE: ./src/components/form/js/third-party/jquery.mousewheel.esm.js
var jquery_mousewheel_esm = __webpack_require__(126);
;// CONCATENATED MODULE: ./src/components/form/js/third-party/jquery.datetimepicker.esm.js



/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2016
 * @version 1.3.4
 *
 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
 * @see http://php.net/manual/en/function.date.php
 *
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
var DateFormatter;
!function () {
  "use strict";

  var t, _e, _r, n, a, u, i;
  u = 864e5, i = 3600, t = function t(_t, e) {
    return "string" == typeof _t && "string" == typeof e && _t.toLowerCase() === e.toLowerCase();
  }, _e = function e(t, r, n) {
    var a = n || "0",
      u = t.toString();
    return u.length < r ? _e(a + u, r) : u;
  }, _r = function r(t) {
    var e, n;
    for (t = t || {}, e = 1; e < arguments.length; e++) {
      if (n = arguments[e]) for (var a in n) {
        n.hasOwnProperty(a) && ("object" == (0,esm_typeof/* default */.Z)(n[a]) ? _r(t[a], n[a]) : t[a] = n[a]);
      }
    }
    return t;
  }, n = function n(t, e) {
    for (var r = 0; r < e.length; r++) {
      if (e[r].toLowerCase() === t.toLowerCase()) return r;
    }
    return -1;
  }, a = {
    dateSettings: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      meridiem: ["AM", "PM"],
      ordinal: function ordinal(t) {
        var e = t % 10,
          r = {
            1: "st",
            2: "nd",
            3: "rd"
          };
        return 1 !== Math.floor(t % 100 / 10) && r[e] ? r[e] : "th";
      }
    },
    separators: /[ \-+\/\.T:@]/g,
    validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,
    intParts: /[djwNzmnyYhHgGis]/g,
    tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    tzClip: /[^-+\dA-Z]/g
  }, DateFormatter = function DateFormatter(t) {
    var e = this,
      n = _r(a, t);
    e.dateSettings = n.dateSettings, e.separators = n.separators, e.validParts = n.validParts, e.intParts = n.intParts, e.tzParts = n.tzParts, e.tzClip = n.tzClip;
  }, DateFormatter.prototype = {
    constructor: DateFormatter,
    getMonth: function getMonth(t) {
      var e,
        r = this;
      return e = n(t, r.dateSettings.monthsShort) + 1, 0 === e && (e = n(t, r.dateSettings.months) + 1), e;
    },
    parseDate: function parseDate(e, r) {
      var n,
        a,
        u,
        i,
        s,
        o,
        c,
        f,
        l,
        h,
        d = this,
        g = !1,
        m = !1,
        p = d.dateSettings,
        y = {
          date: null,
          year: null,
          month: null,
          day: null,
          hour: 0,
          min: 0,
          sec: 0
        };
      if (!e) return null;
      if (e instanceof Date) return e;
      if ("U" === r) return u = parseInt(e), u ? new Date(1e3 * u) : e;
      switch ((0,esm_typeof/* default */.Z)(e)) {
        case "number":
          return new Date(e);
        case "string":
          break;
        default:
          return null;
      }
      if (n = r.match(d.validParts), !n || 0 === n.length) throw new Error("Invalid date format definition.");
      for (a = e.replace(d.separators, "\x00").split("\x00"), u = 0; u < a.length; u++) {
        switch (i = a[u], s = parseInt(i), n[u]) {
          case "y":
          case "Y":
            if (!s) return null;
            l = i.length, y.year = 2 === l ? parseInt((70 > s ? "20" : "19") + i) : s, g = !0;
            break;
          case "m":
          case "n":
          case "M":
          case "F":
            if (isNaN(s)) {
              if (o = d.getMonth(i), !(o > 0)) return null;
              y.month = o;
            } else {
              if (!(s >= 1 && 12 >= s)) return null;
              y.month = s;
            }
            g = !0;
            break;
          case "d":
          case "j":
            if (!(s >= 1 && 31 >= s)) return null;
            y.day = s, g = !0;
            break;
          case "g":
          case "h":
            if (c = n.indexOf("a") > -1 ? n.indexOf("a") : n.indexOf("A") > -1 ? n.indexOf("A") : -1, h = a[c], c > -1) f = t(h, p.meridiem[0]) ? 0 : t(h, p.meridiem[1]) ? 12 : -1, s >= 1 && 12 >= s && f > -1 ? y.hour = s + f - 1 : s >= 0 && 23 >= s && (y.hour = s);else {
              if (!(s >= 0 && 23 >= s)) return null;
              y.hour = s;
            }
            m = !0;
            break;
          case "G":
          case "H":
            if (!(s >= 0 && 23 >= s)) return null;
            y.hour = s, m = !0;
            break;
          case "i":
            if (!(s >= 0 && 59 >= s)) return null;
            y.min = s, m = !0;
            break;
          case "s":
            if (!(s >= 0 && 59 >= s)) return null;
            y.sec = s, m = !0;
        }
      }
      if (g === !0 && y.year && y.month && y.day) y.date = new Date(y.year, y.month - 1, y.day, y.hour, y.min, y.sec, 0);else {
        if (m !== !0) return null;
        y.date = new Date(0, 0, 0, y.hour, y.min, y.sec, 0);
      }
      return y.date;
    },
    guessDate: function guessDate(t, e) {
      if ("string" != typeof t) return t;
      var r,
        n,
        a,
        u,
        i,
        s,
        o = this,
        c = t.replace(o.separators, "\x00").split("\x00"),
        f = /^[djmn]/g,
        l = e.match(o.validParts),
        h = new Date(),
        d = 0;
      if (!f.test(l[0])) return t;
      for (a = 0; a < c.length; a++) {
        if (d = 2, i = c[a], s = parseInt(i.substr(0, 2)), isNaN(s)) return null;
        switch (a) {
          case 0:
            "m" === l[0] || "n" === l[0] ? h.setMonth(s - 1) : h.setDate(s);
            break;
          case 1:
            "m" === l[0] || "n" === l[0] ? h.setDate(s) : h.setMonth(s - 1);
            break;
          case 2:
            if (n = h.getFullYear(), r = i.length, d = 4 > r ? r : 4, n = parseInt(4 > r ? n.toString().substr(0, 4 - r) + i : i.substr(0, 4)), !n) return null;
            h.setFullYear(n);
            break;
          case 3:
            h.setHours(s);
            break;
          case 4:
            h.setMinutes(s);
            break;
          case 5:
            h.setSeconds(s);
        }
        u = i.substr(d), u.length > 0 && c.splice(a + 1, 0, u);
      }
      return h;
    },
    parseFormat: function parseFormat(t, r) {
      var n,
        a = this,
        s = a.dateSettings,
        o = /\\?(.?)/gi,
        _c = function c(t, e) {
          return n[t] ? n[t]() : e;
        };
      return n = {
        d: function d() {
          return _e(n.j(), 2);
        },
        D: function D() {
          return s.daysShort[n.w()];
        },
        j: function j() {
          return r.getDate();
        },
        l: function l() {
          return s.days[n.w()];
        },
        N: function N() {
          return n.w() || 7;
        },
        w: function w() {
          return r.getDay();
        },
        z: function z() {
          var t = new Date(n.Y(), n.n() - 1, n.j()),
            e = new Date(n.Y(), 0, 1);
          return Math.round((t - e) / u);
        },
        W: function W() {
          var t = new Date(n.Y(), n.n() - 1, n.j() - n.N() + 3),
            r = new Date(t.getFullYear(), 0, 4);
          return _e(1 + Math.round((t - r) / u / 7), 2);
        },
        F: function F() {
          return s.months[r.getMonth()];
        },
        m: function m() {
          return _e(n.n(), 2);
        },
        M: function M() {
          return s.monthsShort[r.getMonth()];
        },
        n: function n() {
          return r.getMonth() + 1;
        },
        t: function t() {
          return new Date(n.Y(), n.n(), 0).getDate();
        },
        L: function L() {
          var t = n.Y();
          return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0 ? 1 : 0;
        },
        o: function o() {
          var t = n.n(),
            e = n.W(),
            r = n.Y();
          return r + (12 === t && 9 > e ? 1 : 1 === t && e > 9 ? -1 : 0);
        },
        Y: function Y() {
          return r.getFullYear();
        },
        y: function y() {
          return n.Y().toString().slice(-2);
        },
        a: function a() {
          return n.A().toLowerCase();
        },
        A: function A() {
          var t = n.G() < 12 ? 0 : 1;
          return s.meridiem[t];
        },
        B: function B() {
          var t = r.getUTCHours() * i,
            n = 60 * r.getUTCMinutes(),
            a = r.getUTCSeconds();
          return _e(Math.floor((t + n + a + i) / 86.4) % 1e3, 3);
        },
        g: function g() {
          return n.G() % 12 || 12;
        },
        G: function G() {
          return r.getHours();
        },
        h: function h() {
          return _e(n.g(), 2);
        },
        H: function H() {
          return _e(n.G(), 2);
        },
        i: function i() {
          return _e(r.getMinutes(), 2);
        },
        s: function s() {
          return _e(r.getSeconds(), 2);
        },
        u: function u() {
          return _e(1e3 * r.getMilliseconds(), 6);
        },
        e: function e() {
          var t = /\((.*)\)/.exec(String(r))[1];
          return t || "Coordinated Universal Time";
        },
        I: function I() {
          var t = new Date(n.Y(), 0),
            e = Date.UTC(n.Y(), 0),
            r = new Date(n.Y(), 6),
            a = Date.UTC(n.Y(), 6);
          return t - e !== r - a ? 1 : 0;
        },
        O: function O() {
          var t = r.getTimezoneOffset(),
            n = Math.abs(t);
          return (t > 0 ? "-" : "+") + _e(100 * Math.floor(n / 60) + n % 60, 4);
        },
        P: function P() {
          var t = n.O();
          return t.substr(0, 3) + ":" + t.substr(3, 2);
        },
        T: function T() {
          var t = (String(r).match(a.tzParts) || [""]).pop().replace(a.tzClip, "");
          return t || "UTC";
        },
        Z: function Z() {
          return 60 * -r.getTimezoneOffset();
        },
        c: function c() {
          return "Y-m-d\\TH:i:sP".replace(o, _c);
        },
        r: function r() {
          return "D, d M Y H:i:s O".replace(o, _c);
        },
        U: function U() {
          return r.getTime() / 1e3 || 0;
        }
      }, _c(t, t);
    },
    formatDate: function formatDate(t, e) {
      var r,
        n,
        a,
        u,
        i,
        s = this,
        o = "",
        c = "\\";
      if ("string" == typeof t && (t = s.parseDate(t, e), !t)) return null;
      if (t instanceof Date) {
        for (a = e.length, r = 0; a > r; r++) {
          i = e.charAt(r), "S" !== i && i !== c && (r > 0 && e.charAt(r - 1) === c ? o += i : (u = s.parseFormat(i, t), r !== a - 1 && s.intParts.test(i) && "S" === e.charAt(r + 1) && (n = parseInt(u) || 0, u += s.dateSettings.ordinal(n)), o += u));
        }
        return o;
      }
      return "";
    }
  };
}(); /**
     * @preserve jQuery DateTimePicker
     * @homepage http://xdsoft.net/jqplugins/datetimepicker/
     * @author Chupurnov Valeriy (<chupurnov@gmail.com>)
     */

(function ($) {
  'use strict';

  var default_options = {
    i18n: {
      ar: {
        // Arabic
        months: ["كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
        dayOfWeekShort: ["ن", "ث", "ع", "خ", "ج", "س", "ح"],
        dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
      },
      ro: {
        // Romanian
        months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
        dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
        dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
      },
      id: {
        // Indonesian
        months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        dayOfWeekShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
        dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
      },
     