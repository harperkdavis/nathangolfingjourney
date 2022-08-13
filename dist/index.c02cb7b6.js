/** [p5.sound]  Version: 1.0.1 - 2021-05-25 */ !function(n1) {
    var i1 = {};
    function r(t) {
        if (i1[t]) return i1[t].exports;
        var e = i1[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n1[t].call(e.exports, e, e.exports, r), e.l = !0, e.exports;
    }
    r.m = n1, r.c = i1, r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        });
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, r.t = function(e, t1) {
        if (1 & t1 && (e = r(e)), 8 & t1) return e;
        if (4 & t1 && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t1 && "string" != typeof e) for(var i in e)r.d(n, i, (function(t) {
            return e[t];
        }).bind(null, i));
        return n;
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return r.d(e, "a", e), e;
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 40);
}([
    function(t2, e1, n2) {
        var i2;
        void 0 === (i2 = (function() {
            "use strict";
            function l(t, e) {
                this.isUndef(t) || 1 === t ? this.input = this.context.createGain() : 1 < t && (this.input = new Array(t)), this.isUndef(e) || 1 === e ? this.output = this.context.createGain() : 1 < e && (this.output = new Array(t));
            }
            var e2;
            return l.prototype.set = function(t, e, n) {
                if (this.isObject(t)) n = e;
                else if (this.isString(t)) {
                    var i = {};
                    i[t] = e, t = i;
                }
                t: for(var r in t){
                    e = t[r];
                    var o = this;
                    if (-1 !== r.indexOf(".")) {
                        for(var s = r.split("."), a = 0; a < s.length - 1; a++)if ((o = o[s[a]]) instanceof l) {
                            s.splice(0, a + 1);
                            var u = s.join(".");
                            o.set(u, e);
                            continue t;
                        }
                        r = s[s.length - 1];
                    }
                    var c = o[r];
                    this.isUndef(c) || (l.Signal && c instanceof l.Signal || l.Param && c instanceof l.Param ? c.value !== e && (this.isUndef(n) ? c.value = e : c.rampTo(e, n)) : c instanceof AudioParam ? c.value !== e && (c.value = e) : c instanceof l ? c.set(e) : c !== e && (o[r] = e));
                }
                return this;
            }, l.prototype.get = function(t) {
                this.isUndef(t) ? t = this._collectDefaults(this.constructor) : this.isString(t) && (t = [
                    t
                ]);
                for(var e = {}, n = 0; n < t.length; n++){
                    var i = t[n], r = this, o = e;
                    if (-1 !== i.indexOf(".")) {
                        for(var s = i.split("."), a = 0; a < s.length - 1; a++){
                            var u = s[a];
                            o[u] = o[u] || {}, o = o[u], r = r[u];
                        }
                        i = s[s.length - 1];
                    }
                    var c = r[i];
                    this.isObject(t[i]) ? o[i] = c.get() : l.Signal && c instanceof l.Signal ? o[i] = c.value : l.Param && c instanceof l.Param ? o[i] = c.value : c instanceof AudioParam ? o[i] = c.value : c instanceof l ? o[i] = c.get() : this.isFunction(c) || this.isUndef(c) || (o[i] = c);
                }
                return e;
            }, l.prototype._collectDefaults = function(t) {
                var e = [];
                if (this.isUndef(t.defaults) || (e = Object.keys(t.defaults)), !this.isUndef(t._super)) for(var n = this._collectDefaults(t._super), i = 0; i < n.length; i++)-1 === e.indexOf(n[i]) && e.push(n[i]);
                return e;
            }, l.prototype.toString = function() {
                for(var t in l){
                    var e = t[0].match(/^[A-Z]$/), n = l[t] === this.constructor;
                    if (this.isFunction(l[t]) && e && n) return t;
                }
                return "Tone";
            }, Object.defineProperty(l.prototype, "numberOfInputs", {
                get: function() {
                    return this.input ? this.isArray(this.input) ? this.input.length : 1 : 0;
                }
            }), Object.defineProperty(l.prototype, "numberOfOutputs", {
                get: function() {
                    return this.output ? this.isArray(this.output) ? this.output.length : 1 : 0;
                }
            }), l.prototype.dispose = function() {
                return this.isUndef(this.input) || (this.input instanceof AudioNode && this.input.disconnect(), this.input = null), this.isUndef(this.output) || (this.output instanceof AudioNode && this.output.disconnect(), this.output = null), this;
            }, l.prototype.connect = function(t, e, n) {
                return Array.isArray(this.output) ? (e = this.defaultArg(e, 0), this.output[e].connect(t, 0, n)) : this.output.connect(t, e, n), this;
            }, l.prototype.disconnect = function(t, e, n) {
                this.isArray(this.output) ? this.isNumber(t) ? this.output[t].disconnect() : (e = this.defaultArg(e, 0), this.output[e].disconnect(t, 0, n)) : this.output.disconnect.apply(this.output, arguments);
            }, l.prototype.connectSeries = function() {
                if (1 < arguments.length) for(var t = arguments[0], e = 1; e < arguments.length; e++){
                    var n = arguments[e];
                    t.connect(n), t = n;
                }
                return this;
            }, l.prototype.chain = function() {
                if (0 < arguments.length) for(var t = this, e = 0; e < arguments.length; e++){
                    var n = arguments[e];
                    t.connect(n), t = n;
                }
                return this;
            }, l.prototype.fan = function() {
                if (0 < arguments.length) for(var t = 0; t < arguments.length; t++)this.connect(arguments[t]);
                return this;
            }, AudioNode.prototype.chain = l.prototype.chain, AudioNode.prototype.fan = l.prototype.fan, l.prototype.defaultArg = function(t, e) {
                if (this.isObject(t) && this.isObject(e)) {
                    var n = {};
                    for(var i in t)n[i] = this.defaultArg(e[i], t[i]);
                    for(var r in e)n[r] = this.defaultArg(t[r], e[r]);
                    return n;
                }
                return this.isUndef(t) ? e : t;
            }, l.prototype.optionsObject = function(t, e, n) {
                var i = {};
                if (1 === t.length && this.isObject(t[0])) i = t[0];
                else for(var r = 0; r < e.length; r++)i[e[r]] = t[r];
                return this.isUndef(n) ? i : this.defaultArg(i, n);
            }, l.prototype.isUndef = function(t) {
                return void 0 === t;
            }, l.prototype.isFunction = function(t) {
                return "function" == typeof t;
            }, l.prototype.isNumber = function(t) {
                return "number" == typeof t;
            }, l.prototype.isObject = function(t) {
                return "[object Object]" === Object.prototype.toString.call(t) && t.constructor === Object;
            }, l.prototype.isBoolean = function(t) {
                return "boolean" == typeof t;
            }, l.prototype.isArray = function(t) {
                return Array.isArray(t);
            }, l.prototype.isString = function(t) {
                return "string" == typeof t;
            }, l.noOp = function() {}, l.prototype._readOnly = function(t) {
                if (Array.isArray(t)) for(var e = 0; e < t.length; e++)this._readOnly(t[e]);
                else Object.defineProperty(this, t, {
                    writable: !1,
                    enumerable: !0
                });
            }, l.prototype._writable = function(t) {
                if (Array.isArray(t)) for(var e = 0; e < t.length; e++)this._writable(t[e]);
                else Object.defineProperty(this, t, {
                    writable: !0
                });
            }, l.State = {
                Started: "started",
                Stopped: "stopped",
                Paused: "paused"
            }, l.prototype.equalPowerScale = function(t) {
                var e = .5 * Math.PI;
                return Math.sin(t * e);
            }, l.prototype.dbToGain = function(t) {
                return Math.pow(2, t / 6);
            }, l.prototype.gainToDb = function(t) {
                return Math.log(t) / Math.LN10 * 20;
            }, l.prototype.intervalToFrequencyRatio = function(t) {
                return Math.pow(2, t / 12);
            }, l.prototype.now = function() {
                return l.context.now();
            }, l.now = function() {
                return l.context.now();
            }, l.extend = function(t, e) {
                function n() {}
                l.prototype.isUndef(e) && (e = l), n.prototype = e.prototype, t.prototype = new n, (t.prototype.constructor = t)._super = e;
            }, Object.defineProperty(l, "context", {
                get: function() {
                    return e2;
                },
                set: function(t) {
                    e2 = l.Context && t instanceof l.Context ? t : new l.Context(t), l.Context && l.Context.emit("init", e2);
                }
            }), Object.defineProperty(l.prototype, "context", {
                get: function() {
                    return l.context;
                }
            }), l.setContext = function(t) {
                l.context = t;
            }, Object.defineProperty(l.prototype, "blockTime", {
                get: function() {
                    return 128 / this.context.sampleRate;
                }
            }), Object.defineProperty(l.prototype, "sampleTime", {
                get: function() {
                    return 1 / this.context.sampleRate;
                }
            }), Object.defineProperty(l, "supported", {
                get: function() {
                    var t = window.hasOwnProperty("AudioContext") || window.hasOwnProperty("webkitAudioContext"), e = window.hasOwnProperty("Promise"), n = window.hasOwnProperty("Worker");
                    return t && e && n;
                }
            }), l.version = "r10", window.TONE_SILENCE_VERSION_LOGGING, l;
        }).call(e1, n2, e1, t2)) || (t2.exports = i2);
    },
    function(t3, e3, n) {
        var i, r;
        i = [
            n(0),
            n(2),
            n(10)
        ], void 0 === (r = (function(e) {
            "use strict";
            return e.Multiply = function(t) {
                this.createInsOuts(2, 0), this._mult = this.input[0] = this.output = new e.Gain, this._param = this.input[1] = this.output.gain, this._param.value = this.defaultArg(t, 0);
            }, e.extend(e.Multiply, e.Signal), e.Multiply.prototype.dispose = function() {
                return e.prototype.dispose.call(this), this._mult.dispose(), this._mult = null, this._param = null, this;
            }, e.Multiply;
        }).apply(e3, i)) || (t3.exports = r);
    },
    function(t4, e4, n) {
        var i, r;
        i = [
            n(0),
            n(6),
            n(9),
            n(18),
            n(10)
        ], void 0 === (r = (function(e) {
            "use strict";
            return e.Signal = function() {
                var t = this.optionsObject(arguments, [
                    "value",
                    "units"
                ], e.Signal.defaults);
                this.output = this._gain = this.context.createGain(), t.param = this._gain.gain, e.Param.call(this, t), this.input = this._param = this._gain.gain, this.context.getConstant(1).chain(this._gain);
            }, e.extend(e.Signal, e.Param), e.Signal.defaults = {
                value: 0,
                units: e.Type.Default,
                convert: !0
            }, e.Signal.prototype.connect = e.SignalBase.prototype.connect, e.Signal.prototype.dispose = function() {
                return e.Param.prototype.dispose.call(this), this._param = null, this._gain.disconnect(), this._gain = null, this;
            }, e.Signal;
        }).apply(e4, i)) || (t4.exports = r);
    },
    function(t5, u, c) {
        "use strict";
        (function(t6) {
            c.d(u, "b", function() {
                return s;
            }), c.d(u, "c", function() {
                return a;
            });
            var e5 = c(22), i = c.n(e5), n3 = c(0), r = c.n(n3);
            c(12);
            t6.TONE_SILENCE_VERSION_LOGGING = !0;
            var o = new window.AudioContext;
            function s() {
                return o;
            }
            function a(t7, e) {
                var n = t7;
                return t7 instanceof p5.Element ? n = t7.elt : t7 instanceof Array && t7[0] instanceof p5.Element && (n = t7.map(function(t) {
                    return t.elt;
                })), i()(o, n, e);
            }
            r.a.setContext(o), u.a = o;
        }).call(this, c(26));
    },
    function(t8, e6, n) {
        var i, r;
        i = [
            n(0),
            n(2),
            n(10)
        ], void 0 === (r = (function(e) {
            "use strict";
            return e.Add = function(t) {
                this.createInsOuts(2, 0), this._sum = this.input[0] = this.input[1] = this.output = new e.Gain, this._param = this.input[1] = new e.Signal(t), this._param.connect(this._sum);
            }, e.extend(e.Add, e.Signal), e.Add.prototype.dispose = function() {
                return e.prototype.dispose.call(this), this._sum.dispose(), this._sum = null, this._param.dispose(), this._param = null, this;
            }, e.Add;
        }).apply(e6, i)) || (t8.exports = r);
    },
    function(t, e) {
        t.exports = {
            recorderProcessor: "recorder-processor",
            soundFileProcessor: "sound-file-processor",
            amplitudeProcessor: "amplitude-processor"
        };
    },
    function(t9, e7, n4) {
        var i3, r;
        i3 = [
            n4(0),
            n4(15)
        ], void 0 === (r = (function(t10) {
            "use strict";
            return t10.WaveShaper = function(t, e) {
                this._shaper = this.input = this.output = this.context.createWaveShaper(), this._curve = null, Array.isArray(t) ? this.curve = t : isFinite(t) || this.isUndef(t) ? this._curve = new Float32Array(this.defaultArg(t, 1024)) : this.isFunction(t) && (this._curve = new Float32Array(this.defaultArg(e, 1024)), this.setMap(t));
            }, t10.extend(t10.WaveShaper, t10.SignalBase), t10.WaveShaper.prototype.setMap = function(t) {
                for(var e = 0, n = this._curve.length; e < n; e++){
                    var i = e / (n - 1) * 2 - 1;
                    this._curve[e] = t(i, e);
                }
                return this._shaper.curve = this._curve, this;
            }, Object.defineProperty(t10.WaveShaper.prototype, "curve", {
                get: function() {
                    return this._shaper.curve;
                },
                set: function(t) {
                    this._curve = new Float32Array(t), this._shaper.curve = this._curve;
                }
            }), Object.defineProperty(t10.WaveShaper.prototype, "oversample", {
                get: function() {
                    return this._shaper.oversample;
                },
                set: function(t) {
                    if (-1 === [
                        "none",
                        "2x",
                        "4x"
                    ].indexOf(t)) throw new RangeError("Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'");
                    this._shaper.oversample = t;
                }
            }), t10.WaveShaper.prototype.dispose = function() {
                return t10.prototype.dispose.call(this), this._shaper.disconnect(), this._shaper = null, this._curve = null, this;
            }, t10.WaveShaper;
        }).apply(e7, i3)) || (t9.exports = r);
    },
    function(t11, e8, n5) {
        var i4, r1;
        i4 = [
            n5(0),
            n5(2),
            n5(19)
        ], void 0 === (r1 = (function(u1) {
            "use strict";
            return u1.TimelineSignal = function() {
                var t = this.optionsObject(arguments, [
                    "value",
                    "units"
                ], u1.Signal.defaults);
                this._events = new u1.Timeline(10), u1.Signal.apply(this, t), t.param = this._param, u1.Param.call(this, t), this._initial = this._fromUnits(this._param.value);
            }, u1.extend(u1.TimelineSignal, u1.Param), u1.TimelineSignal.Type = {
                Linear: "linear",
                Exponential: "exponential",
                Target: "target",
                Curve: "curve",
                Set: "set"
            }, Object.defineProperty(u1.TimelineSignal.prototype, "value", {
                get: function() {
                    var t = this.now(), e = this.getValueAtTime(t);
                    return this._toUnits(e);
                },
                set: function(t) {
                    var e = this._fromUnits(t);
                    this._initial = e, this.cancelScheduledValues(), this._param.value = e;
                }
            }), u1.TimelineSignal.prototype.setValueAtTime = function(t, e) {
                return t = this._fromUnits(t), e = this.toSeconds(e), this._events.add({
                    type: u1.TimelineSignal.Type.Set,
                    value: t,
                    time: e
                }), this._param.setValueAtTime(t, e), this;
            }, u1.TimelineSignal.prototype.linearRampToValueAtTime = function(t, e) {
                return t = this._fromUnits(t), e = this.toSeconds(e), this._events.add({
                    type: u1.TimelineSignal.Type.Linear,
                    value: t,
                    time: e
                }), this._param.linearRampToValueAtTime(t, e), this;
            }, u1.TimelineSignal.prototype.exponentialRampToValueAtTime = function(t, e) {
                e = this.toSeconds(e);
                var n = this._searchBefore(e);
                n && 0 === n.value && this.setValueAtTime(this._minOutput, n.time), t = this._fromUnits(t);
                var i = Math.max(t, this._minOutput);
                return this._events.add({
                    type: u1.TimelineSignal.Type.Exponential,
                    value: i,
                    time: e
                }), t < this._minOutput ? (this._param.exponentialRampToValueAtTime(this._minOutput, e - this.sampleTime), this.setValueAtTime(0, e)) : this._param.exponentialRampToValueAtTime(t, e), this;
            }, u1.TimelineSignal.prototype.setTargetAtTime = function(t, e, n) {
                return t = this._fromUnits(t), t = Math.max(this._minOutput, t), n = Math.max(this._minOutput, n), e = this.toSeconds(e), this._events.add({
                    type: u1.TimelineSignal.Type.Target,
                    value: t,
                    time: e,
                    constant: n
                }), this._param.setTargetAtTime(t, e, n), this;
            }, u1.TimelineSignal.prototype.setValueCurveAtTime = function(t, e, n, i) {
                i = this.defaultArg(i, 1);
                for(var r = new Array(t.length), o = 0; o < r.length; o++)r[o] = this._fromUnits(t[o]) * i;
                e = this.toSeconds(e), n = this.toSeconds(n), this._events.add({
                    type: u1.TimelineSignal.Type.Curve,
                    value: r,
                    time: e,
                    duration: n
                }), this._param.setValueAtTime(r[0], e);
                for(var s = 1; s < r.length; s++){
                    var a = e + s / (r.length - 1) * n;
                    this._param.linearRampToValueAtTime(r[s], a);
                }
                return this;
            }, u1.TimelineSignal.prototype.cancelScheduledValues = function(t) {
                return t = this.toSeconds(t), this._events.cancel(t), this._param.cancelScheduledValues(t), this;
            }, u1.TimelineSignal.prototype.setRampPoint = function(t) {
                t = this.toSeconds(t);
                var e = this._toUnits(this.getValueAtTime(t)), n = this._searchBefore(t);
                if (n && n.time === t) this.cancelScheduledValues(t + this.sampleTime);
                else if (n && n.type === u1.TimelineSignal.Type.Curve && n.time + n.duration > t) this.cancelScheduledValues(t), this.linearRampToValueAtTime(e, t);
                else {
                    var i = this._searchAfter(t);
                    i && (this.cancelScheduledValues(t), i.type === u1.TimelineSignal.Type.Linear ? this.linearRampToValueAtTime(e, t) : i.type === u1.TimelineSignal.Type.Exponential && this.exponentialRampToValueAtTime(e, t)), this.setValueAtTime(e, t);
                }
                return this;
            }, u1.TimelineSignal.prototype.linearRampToValueBetween = function(t, e, n) {
                return this.setRampPoint(e), this.linearRampToValueAtTime(t, n), this;
            }, u1.TimelineSignal.prototype.exponentialRampToValueBetween = function(t, e, n) {
                return this.setRampPoint(e), this.exponentialRampToValueAtTime(t, n), this;
            }, u1.TimelineSignal.prototype._searchBefore = function(t) {
                return this._events.get(t);
            }, u1.TimelineSignal.prototype._searchAfter = function(t) {
                return this._events.getAfter(t);
            }, u1.TimelineSignal.prototype.getValueAtTime = function(t) {
                t = this.toSeconds(t);
                var e = this._searchAfter(t), n = this._searchBefore(t), i = this._initial;
                if (null === n) i = this._initial;
                else if (n.type === u1.TimelineSignal.Type.Target) {
                    var r, o = this._events.getBefore(n.time);
                    r = null === o ? this._initial : o.value, i = this._exponentialApproach(n.time, r, n.value, n.constant, t);
                } else i = n.type === u1.TimelineSignal.Type.Curve ? this._curveInterpolate(n.time, n.value, n.duration, t) : null === e ? n.value : e.type === u1.TimelineSignal.Type.Linear ? this._linearInterpolate(n.time, n.value, e.time, e.value, t) : e.type === u1.TimelineSignal.Type.Exponential ? this._exponentialInterpolate(n.time, n.value, e.time, e.value, t) : n.value;
                return i;
            }, u1.TimelineSignal.prototype.connect = u1.SignalBase.prototype.connect, u1.TimelineSignal.prototype._exponentialApproach = function(t, e, n, i, r) {
                return n + (e - n) * Math.exp(-(r - t) / i);
            }, u1.TimelineSignal.prototype._linearInterpolate = function(t, e, n, i, r) {
                return e + (r - t) / (n - t) * (i - e);
            }, u1.TimelineSignal.prototype._exponentialInterpolate = function(t, e, n, i, r) {
                return (e = Math.max(this._minOutput, e)) * Math.pow(i / e, (r - t) / (n - t));
            }, u1.TimelineSignal.prototype._curveInterpolate = function(t, e, n, i) {
                var r = e.length;
                if (t + n <= i) return e[r - 1];
                if (i <= t) return e[0];
                var o = (i - t) / n, s = Math.floor((r - 1) * o), a = Math.ceil((r - 1) * o), u = e[s], c = e[a];
                return a === s ? u : this._linearInterpolate(s, u, a, c, o * (r - 1));
            }, u1.TimelineSignal.prototype.dispose = function() {
                u1.Signal.prototype.dispose.call(this), u1.Param.prototype.dispose.call(this), this._events.dispose(), this._events = null;
            }, u1.TimelineSignal;
        }).apply(e8, i4)) || (t11.exports = r1);
    },
    function(t12, e9, n6) {
        var i, r;
        i = [
            n6(0),
            n6(4),
            n6(1),
            n6(2)
        ], void 0 === (r = (function(n) {
            "use strict";
            return n.Scale = function(t, e) {
                this._outputMin = this.defaultArg(t, 0), this._outputMax = this.defaultArg(e, 1), this._scale = this.input = new n.Multiply(1), this._add = this.output = new n.Add(0), this._scale.connect(this._add), this._setRange();
            }, n.extend(n.Scale, n.SignalBase), Object.defineProperty(n.Scale.prototype, "min", {
                get: function() {
                    return this._outputMin;
                },
                set: function(t) {
                    this._outputMin = t, this._setRange();
                }
            }), Object.defineProperty(n.Scale.prototype, "max", {
                get: function() {
                    return this._outputMax;
                },
                set: function(t) {
                    this._outputMax = t, this._setRange();
                }
            }), n.Scale.prototype._setRange = function() {
                this._add.value = this._outputMin, this._scale.value = this._outputMax - this._outputMin;
            }, n.Scale.prototype.dispose = function() {
                return n.prototype.dispose.call(this), this._add.dispose(), this._add = null, this._scale.dispose(), this._scale = null, this;
            }, n.Scale;
        }).apply(e9, i)) || (t12.exports = r);
    },
    function(t13, e10, n) {
        var i, r;
        i = [
            n(0),
            n(16),
            n(30),
            n(31),
            n(12)
        ], void 0 === (r = (function(e) {
            return e.Type = {
                Default: "number",
                Time: "time",
                Frequency: "frequency",
                TransportTime: "transportTime",
                Ticks: "ticks",
                NormalRange: "normalRange",
                AudioRange: "audioRange",
                Decibels: "db",
                Interval: "interval",
                BPM: "bpm",
                Positive: "positive",
                Cents: "cents",
                Degrees: "degrees",
                MIDI: "midi",
                BarsBeatsSixteenths: "barsBeatsSixteenths",
                Samples: "samples",
                Hertz: "hertz",
                Note: "note",
                Milliseconds: "milliseconds",
                Seconds: "seconds",
                Notation: "notation"
            }, e.prototype.toSeconds = function(t) {
                return this.isNumber(t) ? t : this.isUndef(t) ? this.now() : this.isString(t) ? new e.Time(t).toSeconds() : t instanceof e.TimeBase ? t.toSeconds() : void 0;
            }, e.prototype.toFrequency = function(t) {
                return this.isNumber(t) ? t : this.isString(t) || this.isUndef(t) ? new e.Frequency(t).valueOf() : t instanceof e.TimeBase ? t.toFrequency() : void 0;
            }, e.prototype.toTicks = function(t) {
                return this.isNumber(t) || this.isString(t) ? new e.TransportTime(t).toTicks() : this.isUndef(t) ? e.Transport.ticks : t instanceof e.TimeBase ? t.toTicks() : void 0;
            }, e;
        }).apply(e10, i)) || (t13.exports = r);
    },
    function(t14, e11, n7) {
        var i, r;
        i = [
            n7(0),
            n7(18),
            n7(9)
        ], void 0 === (r = (function(n) {
            "use strict";
            return window.GainNode && !AudioContext.prototype.createGain && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode), n.Gain = function() {
                var t = this.optionsObject(arguments, [
                    "gain",
                    "units"
                ], n.Gain.defaults);
                this.input = this.output = this._gainNode = this.context.createGain(), this.gain = new n.Param({
                    param: this._gainNode.gain,
                    units: t.units,
                    value: t.gain,
                    convert: t.convert
                }), this._readOnly("gain");
            }, n.extend(n.Gain), n.Gain.defaults = {
                gain: 1,
                convert: !0
            }, n.Gain.prototype.dispose = function() {
                n.Param.prototype.dispose.call(this), this._gainNode.disconnect(), this._gainNode = null, this._writable("gain"), this.gain.dispose(), this.gain = null;
            }, n.prototype.createInsOuts = function(t, e) {
                1 === t ? this.input = new n.Gain : 1 < t && (this.input = new Array(t)), 1 === e ? this.output = new n.Gain : 1 < e && (this.output = new Array(t));
            }, n.Gain;
        }).apply(e11, i)) || (t14.exports = r);
    },
    function(t15, e12, n8) {
        var i5, r2;
        i5 = [
            n8(0),
            n8(7),
            n8(39),
            n8(14),
            n8(12)
        ], void 0 === (r2 = (function(r) {
            "use strict";
            return r.Clock = function() {
                r.Emitter.call(this);
                var t = this.optionsObject(arguments, [
                    "callback",
                    "frequency"
                ], r.Clock.defaults);
                this.callback = t.callback, this._nextTick = 0, this._lastState = r.State.Stopped, this.frequency = new r.TimelineSignal(t.frequency, r.Type.Frequency), this._readOnly("frequency"), this.ticks = 0, this._state = new r.TimelineState(r.State.Stopped), this._boundLoop = this._loop.bind(this), this.context.on("tick", this._boundLoop);
            }, r.extend(r.Clock, r.Emitter), r.Clock.defaults = {
                callback: r.noOp,
                frequency: 1,
                lookAhead: "auto"
            }, Object.defineProperty(r.Clock.prototype, "state", {
                get: function() {
                    return this._state.getValueAtTime(this.now());
                }
            }), r.Clock.prototype.start = function(t, e) {
                return t = this.toSeconds(t), this._state.getValueAtTime(t) !== r.State.Started && this._state.add({
                    state: r.State.Started,
                    time: t,
                    offset: e
                }), this;
            }, r.Clock.prototype.stop = function(t) {
                return t = this.toSeconds(t), this._state.cancel(t), this._state.setStateAtTime(r.State.Stopped, t), this;
            }, r.Clock.prototype.pause = function(t) {
                return t = this.toSeconds(t), this._state.getValueAtTime(t) === r.State.Started && this._state.setStateAtTime(r.State.Paused, t), this;
            }, r.Clock.prototype._loop = function() {
                for(var t = this.now() + this.context.lookAhead + this.context.updateInterval + 2 * this.context.lag; t > this._nextTick && this._state;){
                    var e = this._state.getValueAtTime(this._nextTick);
                    if (e !== this._lastState) {
                        this._lastState = e;
                        var n = this._state.get(this._nextTick);
                        e === r.State.Started ? (this._nextTick = n.time, this.isUndef(n.offset) || (this.ticks = n.offset), this.emit("start", n.time, this.ticks)) : e === r.State.Stopped ? (this.ticks = 0, this.emit("stop", n.time)) : e === r.State.Paused && this.emit("pause", n.time);
                    }
                    var i = this._nextTick;
                    this.frequency && (this._nextTick += 1 / this.frequency.getValueAtTime(this._nextTick), e === r.State.Started && (this.callback(i), this.ticks++));
                }
            }, r.Clock.prototype.getStateAtTime = function(t) {
                return t = this.toSeconds(t), this._state.getValueAtTime(t);
            }, r.Clock.prototype.dispose = function() {
                r.Emitter.prototype.dispose.call(this), this.context.off("tick", this._boundLoop), this._writable("frequency"), this.frequency.dispose(), this.frequency = null, this._boundLoop = null, this._nextTick = 1 / 0, this.callback = null, this._state.dispose(), this._state = null;
            }, r.Clock;
        }).apply(e12, i5)) || (t15.exports = r2);
    },
    function(t16, e13, n9) {
        var i6, r3;
        i6 = [
            n9(0),
            n9(14)
        ], void 0 === (r3 = (function(i7) {
            function t17(t, e, n) {
                if (t.input) Array.isArray(t.input) ? (i7.prototype.isUndef(n) && (n = 0), this.connect(t.input[n])) : this.connect(t.input, e, n);
                else try {
                    t instanceof AudioNode ? r4.call(this, t, e, n) : r4.call(this, t, e);
                } catch (e14) {
                    throw new Error("error connecting to node: " + t + "\n" + e14);
                }
            }
            var r4, o;
            return !window.hasOwnProperty("AudioContext") && window.hasOwnProperty("webkitAudioContext") && (window.AudioContext = window.webkitAudioContext), i7.Context = function(t) {
                for(var e in i7.Emitter.call(this), t = t || new window.AudioContext, this._context = t, this._context)this._defineProperty(this._context, e);
                this._latencyHint = "interactive", this._lookAhead = .1, this._updateInterval = this._lookAhead / 3, this._computedUpdateInterval = 0, this._worker = this._createWorker(), this._constants = {};
            }, i7.extend(i7.Context, i7.Emitter), i7.Emitter.mixin(i7.Context), i7.Context.prototype._defineProperty = function(e, n) {
                this.isUndef(this[n]) && Object.defineProperty(this, n, {
                    get: function() {
                        return "function" == typeof e[n] ? e[n].bind(e) : e[n];
                    },
                    set: function(t) {
                        e[n] = t;
                    }
                });
            }, i7.Context.prototype.now = function() {
                return this._context.currentTime;
            }, i7.Context.prototype._createWorker = function() {
                window.URL = window.URL || window.webkitURL;
                var t18 = new Blob([
                    "var timeoutTime = " + (1e3 * this._updateInterval).toFixed(1) + ";self.onmessage = function(msg){	timeoutTime = parseInt(msg.data);};function tick(){	setTimeout(tick, timeoutTime);	self.postMessage('tick');}tick();"
                ]), e15 = URL.createObjectURL(t18), n = new Worker(e15);
                return n.addEventListener("message", (function() {
                    this.emit("tick");
                }).bind(this)), n.addEventListener("message", (function() {
                    var t = this.now();
                    if (this.isNumber(this._lastUpdate)) {
                        var e = t - this._lastUpdate;
                        this._computedUpdateInterval = Math.max(e, .97 * this._computedUpdateInterval);
                    }
                    this._lastUpdate = t;
                }).bind(this)), n;
            }, i7.Context.prototype.getConstant = function(t) {
                if (this._constants[t]) return this._constants[t];
                for(var e = this._context.createBuffer(1, 128, this._context.sampleRate), n = e.getChannelData(0), i = 0; i < n.length; i++)n[i] = t;
                var r = this._context.createBufferSource();
                return r.channelCount = 1, r.channelCountMode = "explicit", r.buffer = e, r.loop = !0, r.start(0), this._constants[t] = r;
            }, Object.defineProperty(i7.Context.prototype, "lag", {
                get: function() {
                    var t = this._computedUpdateInterval - this._updateInterval;
                    return Math.max(t, 0);
                }
            }), Object.defineProperty(i7.Context.prototype, "lookAhead", {
                get: function() {
                    return this._lookAhead;
                },
                set: function(t) {
                    this._lookAhead = t;
                }
            }), Object.defineProperty(i7.Context.prototype, "updateInterval", {
                get: function() {
                    return this._updateInterval;
                },
                set: function(t) {
                    this._updateInterval = Math.max(t, i7.prototype.blockTime), this._worker.postMessage(Math.max(1e3 * t, 1));
                }
            }), Object.defineProperty(i7.Context.prototype, "latencyHint", {
                get: function() {
                    return this._latencyHint;
                },
                set: function(t) {
                    var e = t;
                    if (this._latencyHint = t, this.isString(t)) switch(t){
                        case "interactive":
                            e = .1, this._context.latencyHint = t;
                            break;
                        case "playback":
                            e = .8, this._context.latencyHint = t;
                            break;
                        case "balanced":
                            e = .25, this._context.latencyHint = t;
                            break;
                        case "fastest":
                            e = .01;
                    }
                    this.lookAhead = e, this.updateInterval = e / 3;
                }
            }), i7.supported && (r4 = AudioNode.prototype.connect, o = AudioNode.prototype.disconnect, AudioNode.prototype.connect !== t17 && (AudioNode.prototype.connect = t17, AudioNode.prototype.disconnect = function(t, e, n) {
                if (t && t.input && Array.isArray(t.input)) i7.prototype.isUndef(n) && (n = 0), this.disconnect(t.input[n], e, n);
                else if (t && t.input) this.disconnect(t.input, e, n);
                else try {
                    o.apply(this, arguments);
                } catch (e16) {
                    throw new Error("error disconnecting node: " + t + "\n" + e16);
                }
            }), i7.context = new i7.Context), i7.Context;
        }).apply(e13, i6)) || (t16.exports = r3);
    },
    function(t19, e17, n) {
        var i, r;
        i = [
            n(0),
            n(4),
            n(20),
            n(2),
            n(10)
        ], void 0 === (r = (function(e) {
            "use strict";
            return e.Subtract = function(t) {
                this.createInsOuts(2, 0), this._sum = this.input[0] = this.output = new e.Gain, this._neg = new e.Negate, this._param = this.input[1] = new e.Signal(t), this._param.chain(this._neg, this._sum);
            }, e.extend(e.Subtract, e.Signal), e.Subtract.prototype.dispose = function() {
                return e.prototype.dispose.call(this), this._neg.dispose(), this._neg = null, this._sum.disconnect(), this._sum = null, this._param.dispose(), this._param = null, this;
            }, e.Subtract;
        }).apply(e17, i)) || (t19.exports = r);
    },
    function(t20, e18, n10) {
        var i8, r5;
        i8 = [
            n10(0)
        ], void 0 === (r5 = (function(s) {
            "use strict";
            return s.Emitter = function() {
                this._events = {};
            }, s.extend(s.Emitter), s.Emitter.prototype.on = function(t, e) {
                for(var n = t.split(/\W+/), i = 0; i < n.length; i++){
                    var r = n[i];
                    this._events.hasOwnProperty(r) || (this._events[r] = []), this._events[r].push(e);
                }
                return this;
            }, s.Emitter.prototype.off = function(t, e) {
                for(var n = t.split(/\W+/), i = 0; i < n.length; i++)if (t = n[i], this._events.hasOwnProperty(t)) {
                    if (s.prototype.isUndef(e)) this._events[t] = [];
                    else for(var r = this._events[t], o = 0; o < r.length; o++)r[o] === e && r.splice(o, 1);
                }
                return this;
            }, s.Emitter.prototype.emit = function(t) {
                if (this._events) {
                    var e = Array.apply(null, arguments).slice(1);
                    if (this._events.hasOwnProperty(t)) for(var n = this._events[t], i = 0, r = n.length; i < r; i++)n[i].apply(this, e);
                }
                return this;
            }, s.Emitter.mixin = function(t) {
                var e = [
                    "on",
                    "off",
                    "emit"
                ];
                t._events = {};
                for(var n = 0; n < e.length; n++){
                    var i = e[n], r = s.Emitter.prototype[i];
                    t[i] = r;
                }
            }, s.Emitter.prototype.dispose = function() {
                return s.prototype.dispose.call(this), this._events = null, this;
            }, s.Emitter;
        }).apply(e18, i8)) || (t20.exports = r5);
    },
    function(t21, e19, n11) {
        var i9, r;
        i9 = [
            n11(0)
        ], void 0 === (r = (function(i) {
            "use strict";
            return i.SignalBase = function() {}, i.extend(i.SignalBase), i.SignalBase.prototype.connect = function(t, e, n) {
                return i.Signal && i.Signal === t.constructor || i.Param && i.Param === t.constructor || i.TimelineSignal && i.TimelineSignal === t.constructor ? (t._param.cancelScheduledValues(0), t._param.value = 0, t.overridden = !0) : t instanceof AudioParam && (t.cancelScheduledValues(0), t.value = 0), i.prototype.connect.call(this, t, e, n), this;
            }, i.SignalBase;
        }).apply(e19, i9)) || (t21.exports = r);
    },
    function(t22, e20, n12) {
        var i10, r6;
        i10 = [
            n12(0),
            n12(17)
        ], void 0 === (r6 = (function(n13) {
            return n13.Time = function(t, e) {
                if (!(this instanceof n13.Time)) return new n13.Time(t, e);
                this._plusNow = !1, n13.TimeBase.call(this, t, e);
            }, n13.extend(n13.Time, n13.TimeBase), n13.Time.prototype._unaryExpressions = Object.create(n13.TimeBase.prototype._unaryExpressions), n13.Time.prototype._unaryExpressions.quantize = {
                regexp: /^@/,
                method: function(t) {
                    return n13.Transport.nextSubdivision(t());
                }
            }, n13.Time.prototype._unaryExpressions.now = {
                regexp: /^\+/,
                method: function(t) {
                    return this._plusNow = !0, t();
                }
            }, n13.Time.prototype.quantize = function(t23, e21) {
                return e21 = this.defaultArg(e21, 1), this._expr = (function(t, e, n) {
                    return t = t(), e = e.toSeconds(), t + (Math.round(t / e) * e - t) * n;
                }).bind(this, this._expr, new this.constructor(t23), e21), this;
            }, n13.Time.prototype.addNow = function() {
                return this._plusNow = !0, this;
            }, n13.Time.prototype._defaultExpr = function() {
                return this._plusNow = !0, this._noOp;
            }, n13.Time.prototype.copy = function(t) {
                return n13.TimeBase.prototype.copy.call(this, t), this._plusNow = t._plusNow, this;
            }, n13.Time.prototype.toNotation = function() {
                var t = this.toSeconds(), e = this._toNotationHelper(t, [
                    "1m",
                    "2n",
                    "4n",
                    "8n",
                    "16n",
                    "32n",
                    "64n",
                    "128n"
                ]), n = this._toNotationHelper(t, [
                    "1m",
                    "2n",
                    "2t",
                    "4n",
                    "4t",
                    "8n",
                    "8t",
                    "16n",
                    "16t",
                    "32n",
                    "32t",
                    "64n",
                    "64t",
                    "128n"
                ]);
                return n.split("+").length < e.split("+").length ? n : e;
            }, n13.Time.prototype._toNotationHelper = function(t, e) {
                for(var n = this._notationToUnits(e[e.length - 1]), i = "", r = 0; r < e.length; r++){
                    var o = this._notationToUnits(e[r]), s = t / o;
                    if (1 - s % 1 < 1e-6 && (s += 1e-6), 0 < (s = Math.floor(s))) {
                        if (i += 1 === s ? e[r] : s.toString() + "*" + e[r], (t -= s * o) < n) break;
                        i += " + ";
                    }
                }
                return "" === i && (i = "0"), i;
            }, n13.Time.prototype._notationToUnits = function(t) {
                for(var e = this._primaryExpressions, n = [
                    e.n,
                    e.t,
                    e.m
                ], i = 0; i < n.length; i++){
                    var r = n[i], o = t.match(r.regexp);
                    if (o) return r.method.call(this, o[1]);
                }
            }, n13.Time.prototype.toBarsBeatsSixteenths = function() {
                var t = this._beatsToUnits(1), e = this.toSeconds() / t, n = Math.floor(e / this._timeSignature()), i = e % 1 * 4;
                return e = Math.floor(e) % this._timeSignature(), 3 < (i = i.toString()).length && (i = parseFloat(i).toFixed(3)), [
                    n,
                    e,
                    i
                ].join(":");
            }, n13.Time.prototype.toTicks = function() {
                var t = this._beatsToUnits(1), e = this.valueOf() / t;
                return Math.floor(e * n13.Transport.PPQ);
            }, n13.Time.prototype.toSamples = function() {
                return this.toSeconds() * this.context.sampleRate;
            }, n13.Time.prototype.toFrequency = function() {
                return 1 / this.toSeconds();
            }, n13.Time.prototype.toSeconds = function() {
                return this.valueOf();
            }, n13.Time.prototype.toMilliseconds = function() {
                return 1e3 * this.toSeconds();
            }, n13.Time.prototype.valueOf = function() {
                return this._expr() + (this._plusNow ? this.now() : 0);
            }, n13.Time;
        }).apply(e20, i10)) || (t22.exports = r6);
    },
    function(t24, e22, n14) {
        var i11, r7;
        i11 = [
            n14(0)
        ], void 0 === (r7 = (function(i12) {
            return i12.TimeBase = function(t, e) {
                if (!(this instanceof i12.TimeBase)) return new i12.TimeBase(t, e);
                if (this._expr = this._noOp, t instanceof i12.TimeBase) this.copy(t);
                else if (!this.isUndef(e) || this.isNumber(t)) {
                    e = this.defaultArg(e, this._defaultUnits);
                    var n = this._primaryExpressions[e].method;
                    this._expr = n.bind(this, t);
                } else this.isString(t) ? this.set(t) : this.isUndef(t) && (this._expr = this._defaultExpr());
            }, i12.extend(i12.TimeBase), i12.TimeBase.prototype.set = function(t) {
                return this._expr = this._parseExprString(t), this;
            }, i12.TimeBase.prototype.clone = function() {
                var t = new this.constructor;
                return t.copy(this), t;
            }, i12.TimeBase.prototype.copy = function(t) {
                var e = t._expr();
                return this.set(e);
            }, i12.TimeBase.prototype._primaryExpressions = {
                n: {
                    regexp: /^(\d+)n/i,
                    method: function(t) {
                        return 1 === (t = parseInt(t)) ? this._beatsToUnits(this._timeSignature()) : this._beatsToUnits(4 / t);
                    }
                },
                t: {
                    regexp: /^(\d+)t/i,
                    method: function(t) {
                        return t = parseInt(t), this._beatsToUnits(8 / (3 * parseInt(t)));
                    }
                },
                m: {
                    regexp: /^(\d+)m/i,
                    method: function(t) {
                        return this._beatsToUnits(parseInt(t) * this._timeSignature());
                    }
                },
                i: {
                    regexp: /^(\d+)i/i,
                    method: function(t) {
                        return this._ticksToUnits(parseInt(t));
                    }
                },
                hz: {
                    regexp: /^(\d+(?:\.\d+)?)hz/i,
                    method: function(t) {
                        return this._frequencyToUnits(parseFloat(t));
                    }
                },
                tr: {
                    regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
                    method: function(t, e, n) {
                        var i = 0;
                        return t && "0" !== t && (i += this._beatsToUnits(this._timeSignature() * parseFloat(t))), e && "0" !== e && (i += this._beatsToUnits(parseFloat(e))), n && "0" !== n && (i += this._beatsToUnits(parseFloat(n) / 4)), i;
                    }
                },
                s: {
                    regexp: /^(\d+(?:\.\d+)?s)/,
                    method: function(t) {
                        return this._secondsToUnits(parseFloat(t));
                    }
                },
                samples: {
                    regexp: /^(\d+)samples/,
                    method: function(t) {
                        return parseInt(t) / this.context.sampleRate;
                    }
                },
                default: {
                    regexp: /^(\d+(?:\.\d+)?)/,
                    method: function(t) {
                        return this._primaryExpressions[this._defaultUnits].method.call(this, t);
                    }
                }
            }, i12.TimeBase.prototype._binaryExpressions = {
                "+": {
                    regexp: /^\+/,
                    precedence: 2,
                    method: function(t, e) {
                        return t() + e();
                    }
                },
                "-": {
                    regexp: /^\-/,
                    precedence: 2,
                    method: function(t, e) {
                        return t() - e();
                    }
                },
                "*": {
                    regexp: /^\*/,
                    precedence: 1,
                    method: function(t, e) {
                        return t() * e();
                    }
                },
                "/": {
                    regexp: /^\//,
                    precedence: 1,
                    method: function(t, e) {
                        return t() / e();
                    }
                }
            }, i12.TimeBase.prototype._unaryExpressions = {
                neg: {
                    regexp: /^\-/,
                    method: function(t) {
                        return -t();
                    }
                }
            }, i12.TimeBase.prototype._syntaxGlue = {
                "(": {
                    regexp: /^\(/
                },
                ")": {
                    regexp: /^\)/
                }
            }, i12.TimeBase.prototype._tokenize = function(t25) {
                for(var e23 = -1, n15 = []; 0 < t25.length;){
                    var i = r8(t25 = t25.trim(), this);
                    n15.push(i), t25 = t25.substr(i.value.length);
                }
                function r8(t, e) {
                    for(var n = [
                        "_binaryExpressions",
                        "_unaryExpressions",
                        "_primaryExpressions",
                        "_syntaxGlue"
                    ], i = 0; i < n.length; i++){
                        var r = e[n[i]];
                        for(var o in r){
                            var s = r[o], a = s.regexp, u = t.match(a);
                            if (null !== u) return {
                                method: s.method,
                                precedence: s.precedence,
                                regexp: s.regexp,
                                value: u[0]
                            };
                        }
                    }
                    throw new SyntaxError("Tone.TimeBase: Unexpected token " + t);
                }
                return {
                    next: function() {
                        return n15[++e23];
                    },
                    peek: function() {
                        return n15[e23 + 1];
                    }
                };
            }, i12.TimeBase.prototype._matchGroup = function(t, e, n) {
                if (!this.isUndef(t)) for(var i in e){
                    var r = e[i];
                    if (r.regexp.test(t.value)) {
                        if (this.isUndef(n)) return r;
                        if (r.precedence === n) return r;
                    }
                }
                return !1;
            }, i12.TimeBase.prototype._parseBinary = function(t, e) {
                var n;
                this.isUndef(e) && (e = 2), n = e < 0 ? this._parseUnary(t) : this._parseBinary(t, e - 1);
                for(var i = t.peek(); i && this._matchGroup(i, this._binaryExpressions, e);)n = (i = t.next()).method.bind(this, n, this._parseBinary(t, e - 1)), i = t.peek();
                return n;
            }, i12.TimeBase.prototype._parseUnary = function(t) {
                var e, n;
                e = t.peek();
                var i = this._matchGroup(e, this._unaryExpressions);
                return i ? (e = t.next(), n = this._parseUnary(t), i.method.bind(this, n)) : this._parsePrimary(t);
            }, i12.TimeBase.prototype._parsePrimary = function(t) {
                var e, n;
                if (e = t.peek(), this.isUndef(e)) throw new SyntaxError("Tone.TimeBase: Unexpected end of expression");
                if (this._matchGroup(e, this._primaryExpressions)) {
                    var i = (e = t.next()).value.match(e.regexp);
                    return e.method.bind(this, i[1], i[2], i[3]);
                }
                if (e && "(" === e.value) {
                    if (t.next(), n = this._parseBinary(t), !(e = t.next()) || ")" !== e.value) throw new SyntaxError("Expected )");
                    return n;
                }
                throw new SyntaxError("Tone.TimeBase: Cannot process token " + e.value);
            }, i12.TimeBase.prototype._parseExprString = function(t) {
                this.isString(t) || (t = t.toString());
                var e = this._tokenize(t);
                return this._parseBinary(e);
            }, i12.TimeBase.prototype._noOp = function() {
                return 0;
            }, i12.TimeBase.prototype._defaultExpr = function() {
                return this._noOp;
            }, i12.TimeBase.prototype._defaultUnits = "s", i12.TimeBase.prototype._frequencyToUnits = function(t) {
                return 1 / t;
            }, i12.TimeBase.prototype._beatsToUnits = function(t) {
                return 60 / i12.Transport.bpm.value * t;
            }, i12.TimeBase.prototype._secondsToUnits = function(t) {
                return t;
            }, i12.TimeBase.prototype._ticksToUnits = function(t) {
                return t * (this._beatsToUnits(1) / i12.Transport.PPQ);
            }, i12.TimeBase.prototype._timeSignature = function() {
                return i12.Transport.timeSignature;
            }, i12.TimeBase.prototype._pushExpr = function(t, e, n) {
                return t instanceof i12.TimeBase || (t = new this.constructor(t, n)), this._expr = this._binaryExpressions[e].method.bind(this, this._expr, t._expr), this;
            }, i12.TimeBase.prototype.add = function(t, e) {
                return this._pushExpr(t, "+", e);
            }, i12.TimeBase.prototype.sub = function(t, e) {
                return this._pushExpr(t, "-", e);
            }, i12.TimeBase.prototype.mult = function(t, e) {
                return this._pushExpr(t, "*", e);
            }, i12.TimeBase.prototype.div = function(t, e) {
                return this._pushExpr(t, "/", e);
            }, i12.TimeBase.prototype.valueOf = function() {
                return this._expr();
            }, i12.TimeBase.prototype.dispose = function() {
                this._expr = null;
            }, i12.TimeBase;
        }).apply(e22, i11)) || (t24.exports = r7);
    },
    function(t26, e24, n16) {
        var i13, r;
        i13 = [
            n16(0),
            n16(9)
        ], void 0 === (r = (function(i14) {
            "use strict";
            return i14.Param = function() {
                var t = this.optionsObject(arguments, [
                    "param",
                    "units",
                    "convert"
                ], i14.Param.defaults);
                this._param = this.input = t.param, this.units = t.units, this.convert = t.convert, this.overridden = !1, this._lfo = null, this.isObject(t.lfo) ? this.value = t.lfo : this.isUndef(t.value) || (this.value = t.value);
            }, i14.extend(i14.Param), i14.Param.defaults = {
                units: i14.Type.Default,
                convert: !0,
                param: void 0
            }, Object.defineProperty(i14.Param.prototype, "value", {
                get: function() {
                    return this._toUnits(this._param.value);
                },
                set: function(t) {
                    if (this.isObject(t)) {
                        if (this.isUndef(i14.LFO)) throw new Error("Include 'Tone.LFO' to use an LFO as a Param value.");
                        this._lfo && this._lfo.dispose(), this._lfo = new i14.LFO(t).start(), this._lfo.connect(this.input);
                    } else {
                        var e = this._fromUnits(t);
                        this._param.cancelScheduledValues(0), this._param.value = e;
                    }
                }
            }), i14.Param.prototype._fromUnits = function(t) {
                if (!this.convert && !this.isUndef(this.convert)) return t;
                switch(this.units){
                    case i14.Type.Time:
                        return this.toSeconds(t);
                    case i14.Type.Frequency:
                        return this.toFrequency(t);
                    case i14.Type.Decibels:
                        return this.dbToGain(t);
                    case i14.Type.NormalRange:
                        return Math.min(Math.max(t, 0), 1);
                    case i14.Type.AudioRange:
                        return Math.min(Math.max(t, -1), 1);
                    case i14.Type.Positive:
                        return Math.max(t, 0);
                    default:
                        return t;
                }
            }, i14.Param.prototype._toUnits = function(t) {
                if (!this.convert && !this.isUndef(this.convert)) return t;
                switch(this.units){
                    case i14.Type.Decibels:
                        return this.gainToDb(t);
                    default:
                        return t;
                }
            }, i14.Param.prototype._minOutput = 1e-5, i14.Param.prototype.setValueAtTime = function(t, e) {
                return t = this._fromUnits(t), (e = this.toSeconds(e)) <= this.now() + this.blockTime ? this._param.value = t : this._param.setValueAtTime(t, e), this;
            }, i14.Param.prototype.setRampPoint = function(t) {
                t = this.defaultArg(t, this.now());
                var e = this._param.value;
                return 0 === e && (e = this._minOutput), this._param.setValueAtTime(e, t), this;
            }, i14.Param.prototype.linearRampToValueAtTime = function(t, e) {
                return t = this._fromUnits(t), this._param.linearRampToValueAtTime(t, this.toSeconds(e)), this;
            }, i14.Param.prototype.exponentialRampToValueAtTime = function(t, e) {
                return t = this._fromUnits(t), t = Math.max(this._minOutput, t), this._param.exponentialRampToValueAtTime(t, this.toSeconds(e)), this;
            }, i14.Param.prototype.exponentialRampToValue = function(t, e, n) {
                return n = this.toSeconds(n), this.setRampPoint(n), this.exponentialRampToValueAtTime(t, n + this.toSeconds(e)), this;
            }, i14.Param.prototype.linearRampToValue = function(t, e, n) {
                return n = this.toSeconds(n), this.setRampPoint(n), this.linearRampToValueAtTime(t, n + this.toSeconds(e)), this;
            }, i14.Param.prototype.setTargetAtTime = function(t, e, n) {
                return t = this._fromUnits(t), t = Math.max(this._minOutput, t), n = Math.max(this._minOutput, n), this._param.setTargetAtTime(t, this.toSeconds(e), n), this;
            }, i14.Param.prototype.setValueCurveAtTime = function(t, e, n) {
                for(var i = 0; i < t.length; i++)t[i] = this._fromUnits(t[i]);
                return this._param.setValueCurveAtTime(t, this.toSeconds(e), this.toSeconds(n)), this;
            }, i14.Param.prototype.cancelScheduledValues = function(t) {
                return this._param.cancelScheduledValues(this.toSeconds(t)), this;
            }, i14.Param.prototype.rampTo = function(t, e, n) {
                return e = this.defaultArg(e, 0), this.units === i14.Type.Frequency || this.units === i14.Type.BPM || this.units === i14.Type.Decibels ? this.exponentialRampToValue(t, e, n) : this.linearRampToValue(t, e, n), this;
            }, Object.defineProperty(i14.Param.prototype, "lfo", {
                get: function() {
                    return this._lfo;
                }
            }), i14.Param.prototype.dispose = function() {
                return i14.prototype.dispose.call(this), this._param = null, this._lfo && (this._lfo.dispose(), this._lfo = null), this;
            }, i14.Param;
        }).apply(e24, i13)) || (t26.exports = r);
    },
    function(t27, e25, n17) {
        var i15, r9;
        i15 = [
            n17(0),
            n17(9)
        ], void 0 === (r9 = (function(e26) {
            "use strict";
            return e26.Timeline = function() {
                var t = this.optionsObject(arguments, [
                    "memory"
                ], e26.Timeline.defaults);
                this._timeline = [], this._toRemove = [], this._iterating = !1, this.memory = t.memory;
            }, e26.extend(e26.Timeline), e26.Timeline.defaults = {
                memory: 1 / 0
            }, Object.defineProperty(e26.Timeline.prototype, "length", {
                get: function() {
                    return this._timeline.length;
                }
            }), e26.Timeline.prototype.add = function(t) {
                if (this.isUndef(t.time)) throw new Error("Tone.Timeline: events must have a time attribute");
                if (this._timeline.length) {
                    var e = this._search(t.time);
                    this._timeline.splice(e + 1, 0, t);
                } else this._timeline.push(t);
                if (this.length > this.memory) {
                    var n = this.length - this.memory;
                    this._timeline.splice(0, n);
                }
                return this;
            }, e26.Timeline.prototype.remove = function(t) {
                if (this._iterating) this._toRemove.push(t);
                else {
                    var e = this._timeline.indexOf(t);
                    -1 !== e && this._timeline.splice(e, 1);
                }
                return this;
            }, e26.Timeline.prototype.get = function(t) {
                var e = this._search(t);
                return -1 !== e ? this._timeline[e] : null;
            }, e26.Timeline.prototype.peek = function() {
                return this._timeline[0];
            }, e26.Timeline.prototype.shift = function() {
                return this._timeline.shift();
            }, e26.Timeline.prototype.getAfter = function(t) {
                var e = this._search(t);
                return e + 1 < this._timeline.length ? this._timeline[e + 1] : null;
            }, e26.Timeline.prototype.getBefore = function(t) {
                var e = this._timeline.length;
                if (0 < e && this._timeline[e - 1].time < t) return this._timeline[e - 1];
                var n = this._search(t);
                return 0 <= n - 1 ? this._timeline[n - 1] : null;
            }, e26.Timeline.prototype.cancel = function(t) {
                if (1 < this._timeline.length) {
                    var e = this._search(t);
                    if (0 <= e) {
                        if (this._timeline[e].time === t) {
                            for(var n = e; 0 <= n && this._timeline[n].time === t; n--)e = n;
                            this._timeline = this._timeline.slice(0, e);
                        } else this._timeline = this._timeline.slice(0, e + 1);
                    } else this._timeline = [];
                } else 1 === this._timeline.length && this._timeline[0].time >= t && (this._timeline = []);
                return this;
            }, e26.Timeline.prototype.cancelBefore = function(t) {
                if (this._timeline.length) {
                    var e = this._search(t);
                    0 <= e && (this._timeline = this._timeline.slice(e + 1));
                }
                return this;
            }, e26.Timeline.prototype._search = function(t) {
                var e = 0, n = this._timeline.length, i = n;
                if (0 < n && this._timeline[n - 1].time <= t) return n - 1;
                for(; e < i;){
                    var r = Math.floor(e + (i - e) / 2), o = this._timeline[r], s = this._timeline[r + 1];
                    if (o.time === t) {
                        for(var a = r; a < this._timeline.length; a++)this._timeline[a].time === t && (r = a);
                        return r;
                    }
                    if (o.time < t && s.time > t) return r;
                    o.time > t ? i = r : o.time < t && (e = r + 1);
                }
                return -1;
            }, e26.Timeline.prototype._iterate = function(t, e, n) {
                this._iterating = !0, e = this.defaultArg(e, 0), n = this.defaultArg(n, this._timeline.length - 1);
                for(var i = e; i <= n; i++)t(this._timeline[i]);
                if (this._iterating = !1, 0 < this._toRemove.length) {
                    for(var r = 0; r < this._toRemove.length; r++){
                        var o = this._timeline.indexOf(this._toRemove[r]);
                        -1 !== o && this._timeline.splice(o, 1);
                    }
                    this._toRemove = [];
                }
            }, e26.Timeline.prototype.forEach = function(t) {
                return this._iterate(t), this;
            }, e26.Timeline.prototype.forEachBefore = function(t, e) {
                var n = this._search(t);
                return -1 !== n && this._iterate(e, 0, n), this;
            }, e26.Timeline.prototype.forEachAfter = function(t, e) {
                var n = this._search(t);
                return this._iterate(e, n + 1), this;
            }, e26.Timeline.prototype.forEachFrom = function(t, e) {
                for(var n = this._search(t); 0 <= n && this._timeline[n].time >= t;)n--;
                return this._iterate(e, n + 1), this;
            }, e26.Timeline.prototype.forEachAtTime = function(e, n) {
                var t28 = this._search(e);
                return -1 !== t28 && this._iterate(function(t) {
                    t.time === e && n(t);
                }, 0, t28), this;
            }, e26.Timeline.prototype.dispose = function() {
                e26.prototype.dispose.call(this), this._timeline = null, this._toRemove = null;
            }, e26.Timeline;
        }).apply(e25, i15)) || (t27.exports = r9);
    },
    function(t29, e, n) {
        var i, r;
        i = [
            n(0),
            n(1),
            n(2)
        ], void 0 === (r = (function(t) {
            "use strict";
            return t.Negate = function() {
                this._multiply = this.input = this.output = new t.Multiply(-1);
            }, t.extend(t.Negate, t.SignalBase), t.Negate.prototype.dispose = function() {
                return t.prototype.dispose.call(this), this._multiply.dispose(), this._multiply = null, this;
            }, t.Negate;
        }).apply(e, i)) || (t29.exports = r);
    },
    function(t30, e, n) {
        var i, r;
        i = [
            n(0),
            n(2),
            n(1),
            n(6)
        ], void 0 === (r = (function(t31) {
            "use strict";
            return t31.GreaterThanZero = function() {
                this._thresh = this.output = new t31.WaveShaper(function(t) {
                    return t <= 0 ? 0 : 1;
                }, 127), this._scale = this.input = new t31.Multiply(1e4), this._scale.connect(this._thresh);
            }, t31.extend(t31.GreaterThanZero, t31.SignalBase), t31.GreaterThanZero.prototype.dispose = function() {
                return t31.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._thresh.dispose(), this._thresh = null, this;
            }, t31.GreaterThanZero;
        }).apply(e, i)) || (t30.exports = r);
    },
    function(t32, e27, n18) {
        var i16, r10, o1;
        r10 = [], void 0 === (o1 = "function" == typeof (i16 = function() {
            var s = function(t, e) {
                this._dragged = !1, this._element = t, this._bindedMove = this._moved.bind(this), this._bindedEnd = this._ended.bind(this, e), t.addEventListener("touchstart", this._bindedEnd), t.addEventListener("touchmove", this._bindedMove), t.addEventListener("touchend", this._bindedEnd), t.addEventListener("mouseup", this._bindedEnd);
            };
            function o2(t) {
                return "running" === t.state;
            }
            return s.prototype._moved = function(t) {
                this._dragged = !0;
            }, s.prototype._ended = function(t33) {
                this._dragged || function(t) {
                    var e = t.createBuffer(1, 1, t.sampleRate), n = t.createBufferSource();
                    n.buffer = e, n.connect(t.destination), n.start(0), t.resume && t.resume();
                }(t33), this._dragged = !1;
            }, s.prototype.dispose = function() {
                this._element.removeEventListener("touchstart", this._bindedEnd), this._element.removeEventListener("touchmove", this._bindedMove), this._element.removeEventListener("touchend", this._bindedEnd), this._element.removeEventListener("mouseup", this._bindedEnd), this._bindedMove = null, this._bindedEnd = null, this._element = null;
            }, function(e28, t34, n19) {
                var i17 = new Promise(function(t35) {
                    !function(e, n) {
                        o2(e) ? n() : function t() {
                            o2(e) ? n() : (requestAnimationFrame(t), e.resume && e.resume());
                        }();
                    }(e28, t35);
                }), r11 = [];
                return function t(e, n, i) {
                    if (Array.isArray(e) || NodeList && e instanceof NodeList) for(var r = 0; r < e.length; r++)t(e[r], n, i);
                    else if ("string" == typeof e) t(document.querySelectorAll(e), n, i);
                    else if (e.jquery && "function" == typeof e.toArray) t(e.toArray(), n, i);
                    else if (Element && e instanceof Element) {
                        var o = new s(e, i);
                        n.push(o);
                    }
                }(t34 = t34 || document.body, r11, e28), i17.then(function() {
                    for(var t = 0; t < r11.length; t++)r11[t].dispose();
                    r11 = null, n19 && n19();
                }), i17;
            };
        }) ? i16.apply(e27, r10) : i16) || (t32.exports = o1);
    },
    function(t36, e29, n) {
        var i, r;
        i = [
            n(0),
            n(2),
            n(32),
            n(38),
            n(10)
        ], void 0 === (r = (function(e) {
            "use strict";
            return e.CrossFade = function(t) {
                this.createInsOuts(2, 1), this.a = this.input[0] = new e.Gain, this.b = this.input[1] = new e.Gain, this.fade = new e.Signal(this.defaultArg(t, .5), e.Type.NormalRange), this._equalPowerA = new e.EqualPowerGain, this._equalPowerB = new e.EqualPowerGain, this._invert = new e.Expr("1 - $0"), this.a.connect(this.output), this.b.connect(this.output), this.fade.chain(this._equalPowerB, this.b.gain), this.fade.chain(this._invert, this._equalPowerA, this.a.gain), this._readOnly("fade");
            }, e.extend(e.CrossFade), e.CrossFade.prototype.dispose = function() {
                return e.prototype.dispose.call(this), this._writable("fade"), this._equalPowerA.dispose(), this._equalPowerA = null, this._equalPowerB.dispose(), this._equalPowerB = null, this.fade.dispose(), this.fade = null, this._invert.dispose(), this._invert = null, this.a.dispose(), this.a = null, this.b.dispose(), this.b = null, this;
            }, e.CrossFade;
        }).apply(e29, i)) || (t36.exports = r);
    },
    function(t37, e30) {
        function l(t38) {
            var i = this, r = {}, o = -1;
            this.parameters.forEach(function(t, e) {
                var n = a1[++o] || (a1[o] = new Float32Array(i.bufferSize));
                n.fill(t.value), r[e] = n;
            }), this.processor.realm.exec("self.sampleRate=sampleRate=" + this.context.sampleRate + ";self.currentTime=currentTime=" + this.context.currentTime);
            var e31 = s1(t38.inputBuffer), n21 = s1(t38.outputBuffer);
            this.instance.process([
                e31
            ], [
                n21
            ], r);
        }
        function s1(t) {
            for(var e = [], n = 0; n < t.numberOfChannels; n++)e[n] = t.getChannelData(n);
            return e;
        }
        function h(t) {
            return t.$$processors || (t.$$processors = {});
        }
        function n20(t) {
            this.$$context = t;
        }
        var p, a1;
        a1 = [], "function" != typeof AudioWorkletNode && (self.AudioWorkletNode = function(t, e, n) {
            var i = h(t)[e], r = t.createScriptProcessor(void 0, 2, n && n.outputChannelCount ? n.outputChannelCount[0] : 2);
            if (r.parameters = new Map, i.properties) for(var o = 0; o < i.properties.length; o++){
                var s = i.properties[o], a = t.createGain().gain;
                a.value = s.defaultValue, r.parameters.set(s.name, a);
            }
            var u = new MessageChannel;
            p = u.port2;
            var c = new i.Processor(n || {});
            return p = null, r.port = u.port1, r.processor = i, r.instance = c, r.onaudioprocess = l, r;
        }, Object.defineProperty((self.AudioContext || self.webkitAudioContext).prototype, "audioWorklet", {
            get: function() {
                return this.$$audioWorklet || (this.$$audioWorklet = new self.AudioWorklet(this));
            }
        }), self.AudioWorklet = (n20.prototype.addModule = function(t39, e32) {
            var r12 = this;
            return fetch(t39).then(function(t) {
                if (!t.ok) throw Error(t.status);
                return t.text();
            }).then(function(t40) {
                var n22 = {
                    sampleRate: 0,
                    currentTime: 0,
                    AudioWorkletProcessor: function() {
                        this.port = p;
                    },
                    registerProcessor: function(t, e) {
                        h(r12.$$context)[t] = {
                            realm: i18,
                            context: n22,
                            Processor: e,
                            properties: e.parameterDescriptors || []
                        };
                    }
                }, i18 = new function(t, e) {
                    var n = document.createElement("iframe");
                    n.style.cssText = "position:absolute;left:0;top:-999px;width:1px;height:1px;", e.appendChild(n);
                    var i = n.contentWindow, r = i.document, o = "var window,$hook";
                    for(var s in i)s in t || "eval" === s || (o += ",", o += s);
                    for(var a in t)o += ",", o += a, o += "=self.", o += a;
                    var u = r.createElement("script");
                    u.appendChild(r.createTextNode('function $hook(self,console) {"use strict";\n        ' + o + ";return function() {return eval(arguments[0])}}")), r.body.appendChild(u), this.exec = i.$hook(t, console);
                }(n22.self = n22, document.documentElement);
                return i18.exec((e32 && e32.transpile || String)(t40)), null;
            });
        }, n20));
    },
    function(t41, e33) {
        function n23(t) {
            t && (t.setTargetAtTime || (t.setTargetAtTime = t.setTargetValueAtTime));
        }
        window, window.hasOwnProperty("webkitAudioContext") && !window.hasOwnProperty("AudioContext") && (window.AudioContext = window.webkitAudioContext, "function" != typeof AudioContext.prototype.createGain && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode), "function" != typeof AudioContext.prototype.createDelay && (AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode), "function" != typeof AudioContext.prototype.createScriptProcessor && (AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode), "function" != typeof AudioContext.prototype.createPeriodicWave && (AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable), AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain, AudioContext.prototype.createGain = function() {
            var t = this.internal_createGain();
            return n23(t.gain), t;
        }, AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay, AudioContext.prototype.createDelay = function(t) {
            var e = t ? this.internal_createDelay(t) : this.internal_createDelay();
            return n23(e.delayTime), e;
        }, AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource, AudioContext.prototype.createBufferSource = function() {
            var i = this.internal_createBufferSource();
            return i.start ? (i.internal_start = i.start, i.start = function(t, e, n) {
                void 0 !== n ? i.internal_start(t || 0, e, n) : i.internal_start(t || 0, e || 0);
            }) : i.start = function(t, e, n) {
                e || n ? this.noteGrainOn(t || 0, e, n) : this.noteOn(t || 0);
            }, i.stop ? (i.internal_stop = i.stop, i.stop = function(t) {
                i.internal_stop(t || 0);
            }) : i.stop = function(t) {
                this.noteOff(t || 0);
            }, n23(i.playbackRate), i;
        }, AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor, AudioContext.prototype.createDynamicsCompressor = function() {
            var t = this.internal_createDynamicsCompressor();
            return n23(t.threshold), n23(t.knee), n23(t.ratio), n23(t.reduction), n23(t.attack), n23(t.release), t;
        }, AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter, AudioContext.prototype.createBiquadFilter = function() {
            var t = this.internal_createBiquadFilter();
            return n23(t.frequency), n23(t.detune), n23(t.Q), n23(t.gain), t;
        }, "function" != typeof AudioContext.prototype.createOscillator && (AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator, AudioContext.prototype.createOscillator = function() {
            var e = this.internal_createOscillator();
            return e.start ? (e.internal_start = e.start, e.start = function(t) {
                e.internal_start(t || 0);
            }) : e.start = function(t) {
                this.noteOn(t || 0);
            }, e.stop ? (e.internal_stop = e.stop, e.stop = function(t) {
                e.internal_stop(t || 0);
            }) : e.stop = function(t) {
                this.noteOff(t || 0);
            }, e.setPeriodicWave || (e.setPeriodicWave = e.setWaveTable), n23(e.frequency), n23(e.detune), e;
        })), window.hasOwnProperty("webkitOfflineAudioContext") && !window.hasOwnProperty("OfflineAudioContext") && (window.OfflineAudioContext = window.webkitOfflineAudioContext), navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        var i19 = document.createElement("audio");
        p5.prototype.isSupported = function() {
            return !!i19.canPlayType;
        };
        p5.prototype.isFileSupported = function(t) {
            switch(t.toLowerCase()){
                case "mp3":
                    return !!i19.canPlayType && i19.canPlayType("audio/mpeg;");
                case "wav":
                    return !!i19.canPlayType && i19.canPlayType('audio/wav; codecs="1"');
                case "ogg":
                    return !!i19.canPlayType && i19.canPlayType('audio/ogg; codecs="vorbis"');
                case "aac":
                case "m4a":
                case "mp4":
                    return !!i19.canPlayType && (i19.canPlayType("audio/x-m4a;") || i19.canPlayType("audio/aac;"));
                case "aif":
                case "aiff":
                    return !!i19.canPlayType && i19.canPlayType("audio/x-aiff;");
                default:
                    return !1;
            }
        };
    },
    function(t, e) {
        var n;
        n = function() {
            return this;
        }();
        try {
            n = n || new Function("return this")();
        } catch (t42) {
            "object" == typeof window && (n = window);
        }
        t.exports = n;
    },
    function(t, e, n) {
        "use strict";
        n.r(e), e.default = 'function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import dependencies via preval.require so that they\'re available as values at compile time\nvar processorNames = {\n  "recorderProcessor": "recorder-processor",\n  "soundFileProcessor": "sound-file-processor",\n  "amplitudeProcessor": "amplitude-processor"\n};\nvar RingBuffer = {\n  "default":\n  /*#__PURE__*/\n  function () {\n    /**\n     * @constructor\n     * @param  {number} length Buffer length in frames.\n     * @param  {number} channelCount Buffer channel count.\n     */\n    function RingBuffer(length, channelCount) {\n      _classCallCheck(this, RingBuffer);\n\n      this._readIndex = 0;\n      this._writeIndex = 0;\n      this._framesAvailable = 0;\n      this._channelCount = channelCount;\n      this._length = length;\n      this._channelData = [];\n\n      for (var i = 0; i < this._channelCount; ++i) {\n        this._channelData[i] = new Float32Array(length);\n      }\n    }\n    /**\n     * Getter for Available frames in buffer.\n     *\n     * @return {number} Available frames in buffer.\n     */\n\n\n    _createClass(RingBuffer, [{\n      key: "push",\n\n      /**\n       * Push a sequence of Float32Arrays to buffer.\n       *\n       * @param  {array} arraySequence A sequence of Float32Arrays.\n       */\n      value: function push(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // Transfer data from the |arraySequence| storage to the internal buffer.\n        var sourceLength = arraySequence[0] ? arraySequence[0].length : 0;\n\n        for (var i = 0; i < sourceLength; ++i) {\n          var writeIndex = (this._writeIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            this._channelData[channel][writeIndex] = arraySequence[channel][i];\n          }\n        }\n\n        this._writeIndex += sourceLength;\n\n        if (this._writeIndex >= this._length) {\n          this._writeIndex = 0;\n        } // For excessive frames, the buffer will be overwritten.\n\n\n        this._framesAvailable += sourceLength;\n\n        if (this._framesAvailable > this._length) {\n          this._framesAvailable = this._length;\n        }\n      }\n      /**\n       * Pull data out of buffer and fill a given sequence of Float32Arrays.\n       *\n       * @param  {array} arraySequence An array of Float32Arrays.\n       */\n\n    }, {\n      key: "pull",\n      value: function pull(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // If the FIFO is completely empty, do nothing.\n        if (this._framesAvailable === 0) {\n          return;\n        }\n\n        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.\n\n        for (var i = 0; i < destinationLength; ++i) {\n          var readIndex = (this._readIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            arraySequence[channel][i] = this._channelData[channel][readIndex];\n          }\n        }\n\n        this._readIndex += destinationLength;\n\n        if (this._readIndex >= this._length) {\n          this._readIndex = 0;\n        }\n\n        this._framesAvailable -= destinationLength;\n\n        if (this._framesAvailable < 0) {\n          this._framesAvailable = 0;\n        }\n      }\n    }, {\n      key: "framesAvailable",\n      get: function get() {\n        return this._framesAvailable;\n      }\n    }]);\n\n    return RingBuffer;\n  }()\n}["default"];\n\nvar RecorderProcessor =\n/*#__PURE__*/\nfunction (_AudioWorkletProcesso) {\n  _inherits(RecorderProcessor, _AudioWorkletProcesso);\n\n  function RecorderProcessor(options) {\n    var _this;\n\n    _classCallCheck(this, RecorderProcessor);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(RecorderProcessor).call(this));\n    var processorOptions = options.processorOptions || {};\n    _this.numOutputChannels = options.outputChannelCount || 2;\n    _this.numInputChannels = processorOptions.numInputChannels || 2;\n    _this.bufferSize = processorOptions.bufferSize || 1024;\n    _this.recording = false;\n\n    _this.clear();\n\n    _this.port.onmessage = function (event) {\n      var data = event.data;\n\n      if (data.name === \'start\') {\n        _this.record(data.duration);\n      } else if (data.name === \'stop\') {\n        _this.stop();\n      }\n    };\n\n    return _this;\n  }\n\n  _createClass(RecorderProcessor, [{\n    key: "process",\n    value: function process(inputs) {\n      if (!this.recording) {\n        return true;\n      } else if (this.sampleLimit && this.recordedSamples >= this.sampleLimit) {\n        this.stop();\n        return true;\n      }\n\n      var input = inputs[0];\n      this.inputRingBuffer.push(input);\n\n      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {\n        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);\n\n        for (var channel = 0; channel < this.numOutputChannels; ++channel) {\n          var inputChannelCopy = this.inputRingBufferArraySequence[channel].slice();\n\n          if (channel === 0) {\n            this.leftBuffers.push(inputChannelCopy);\n\n            if (this.numInputChannels === 1) {\n              this.rightBuffers.push(inputChannelCopy);\n            }\n          } else if (channel === 1 && this.numInputChannels > 1) {\n            this.rightBuffers.push(inputChannelCopy);\n          }\n        }\n\n        this.recordedSamples += this.bufferSize;\n      }\n\n      return true;\n    }\n  }, {\n    key: "record",\n    value: function record(duration) {\n      if (duration) {\n        this.sampleLimit = Math.round(duration * sampleRate);\n      }\n\n      this.recording = true;\n    }\n  }, {\n    key: "stop",\n    value: function stop() {\n      this.recording = false;\n      var buffers = this.getBuffers();\n      var leftBuffer = buffers[0].buffer;\n      var rightBuffer = buffers[1].buffer;\n      this.port.postMessage({\n        name: \'buffers\',\n        leftBuffer: leftBuffer,\n        rightBuffer: rightBuffer\n      }, [leftBuffer, rightBuffer]);\n      this.clear();\n    }\n  }, {\n    key: "getBuffers",\n    value: function getBuffers() {\n      var buffers = [];\n      buffers.push(this.mergeBuffers(this.leftBuffers));\n      buffers.push(this.mergeBuffers(this.rightBuffers));\n      return buffers;\n    }\n  }, {\n    key: "mergeBuffers",\n    value: function mergeBuffers(channelBuffer) {\n      var result = new Float32Array(this.recordedSamples);\n      var offset = 0;\n      var lng = channelBuffer.length;\n\n      for (var i = 0; i < lng; i++) {\n        var buffer = channelBuffer[i];\n        result.set(buffer, offset);\n        offset += buffer.length;\n      }\n\n      return result;\n    }\n  }, {\n    key: "clear",\n    value: function clear() {\n      var _this2 = this;\n\n      this.leftBuffers = [];\n      this.rightBuffers = [];\n      this.inputRingBuffer = new RingBuffer(this.bufferSize, this.numInputChannels);\n      this.inputRingBufferArraySequence = new Array(this.numInputChannels).fill(null).map(function () {\n        return new Float32Array(_this2.bufferSize);\n      });\n      this.recordedSamples = 0;\n      this.sampleLimit = null;\n    }\n  }]);\n\n  return RecorderProcessor;\n}(_wrapNativeSuper(AudioWorkletProcessor));\n\nregisterProcessor(processorNames.recorderProcessor, RecorderProcessor);';
    },
    function(t, e, n) {
        "use strict";
        n.r(e), e.default = 'function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import dependencies via preval.require so that they\'re available as values at compile time\nvar processorNames = {\n  "recorderProcessor": "recorder-processor",\n  "soundFileProcessor": "sound-file-processor",\n  "amplitudeProcessor": "amplitude-processor"\n};\nvar RingBuffer = {\n  "default":\n  /*#__PURE__*/\n  function () {\n    /**\n     * @constructor\n     * @param  {number} length Buffer length in frames.\n     * @param  {number} channelCount Buffer channel count.\n     */\n    function RingBuffer(length, channelCount) {\n      _classCallCheck(this, RingBuffer);\n\n      this._readIndex = 0;\n      this._writeIndex = 0;\n      this._framesAvailable = 0;\n      this._channelCount = channelCount;\n      this._length = length;\n      this._channelData = [];\n\n      for (var i = 0; i < this._channelCount; ++i) {\n        this._channelData[i] = new Float32Array(length);\n      }\n    }\n    /**\n     * Getter for Available frames in buffer.\n     *\n     * @return {number} Available frames in buffer.\n     */\n\n\n    _createClass(RingBuffer, [{\n      key: "push",\n\n      /**\n       * Push a sequence of Float32Arrays to buffer.\n       *\n       * @param  {array} arraySequence A sequence of Float32Arrays.\n       */\n      value: function push(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // Transfer data from the |arraySequence| storage to the internal buffer.\n        var sourceLength = arraySequence[0] ? arraySequence[0].length : 0;\n\n        for (var i = 0; i < sourceLength; ++i) {\n          var writeIndex = (this._writeIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            this._channelData[channel][writeIndex] = arraySequence[channel][i];\n          }\n        }\n\n        this._writeIndex += sourceLength;\n\n        if (this._writeIndex >= this._length) {\n          this._writeIndex = 0;\n        } // For excessive frames, the buffer will be overwritten.\n\n\n        this._framesAvailable += sourceLength;\n\n        if (this._framesAvailable > this._length) {\n          this._framesAvailable = this._length;\n        }\n      }\n      /**\n       * Pull data out of buffer and fill a given sequence of Float32Arrays.\n       *\n       * @param  {array} arraySequence An array of Float32Arrays.\n       */\n\n    }, {\n      key: "pull",\n      value: function pull(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // If the FIFO is completely empty, do nothing.\n        if (this._framesAvailable === 0) {\n          return;\n        }\n\n        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.\n\n        for (var i = 0; i < destinationLength; ++i) {\n          var readIndex = (this._readIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            arraySequence[channel][i] = this._channelData[channel][readIndex];\n          }\n        }\n\n        this._readIndex += destinationLength;\n\n        if (this._readIndex >= this._length) {\n          this._readIndex = 0;\n        }\n\n        this._framesAvailable -= destinationLength;\n\n        if (this._framesAvailable < 0) {\n          this._framesAvailable = 0;\n        }\n      }\n    }, {\n      key: "framesAvailable",\n      get: function get() {\n        return this._framesAvailable;\n      }\n    }]);\n\n    return RingBuffer;\n  }()\n}["default"];\n\nvar SoundFileProcessor =\n/*#__PURE__*/\nfunction (_AudioWorkletProcesso) {\n  _inherits(SoundFileProcessor, _AudioWorkletProcesso);\n\n  function SoundFileProcessor(options) {\n    var _this;\n\n    _classCallCheck(this, SoundFileProcessor);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(SoundFileProcessor).call(this));\n    var processorOptions = options.processorOptions || {};\n    _this.bufferSize = processorOptions.bufferSize || 256;\n    _this.inputRingBuffer = new RingBuffer(_this.bufferSize, 1);\n    _this.inputRingBufferArraySequence = [new Float32Array(_this.bufferSize)];\n    return _this;\n  }\n\n  _createClass(SoundFileProcessor, [{\n    key: "process",\n    value: function process(inputs) {\n      var input = inputs[0]; // we only care about the first input channel, because that contains the position data\n\n      this.inputRingBuffer.push([input[0]]);\n\n      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {\n        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);\n        var inputChannel = this.inputRingBufferArraySequence[0];\n        var position = inputChannel[inputChannel.length - 1] || 0;\n        this.port.postMessage({\n          name: \'position\',\n          position: position\n        });\n      }\n\n      return true;\n    }\n  }]);\n\n  return SoundFileProcessor;\n}(_wrapNativeSuper(AudioWorkletProcessor));\n\nregisterProcessor(processorNames.soundFileProcessor, SoundFileProcessor);';
    },
    function(t, e, n) {
        "use strict";
        n.r(e), e.default = 'function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import dependencies via preval.require so that they\'re available as values at compile time\nvar processorNames = {\n  "recorderProcessor": "recorder-processor",\n  "soundFileProcessor": "sound-file-processor",\n  "amplitudeProcessor": "amplitude-processor"\n};\nvar RingBuffer = {\n  "default":\n  /*#__PURE__*/\n  function () {\n    /**\n     * @constructor\n     * @param  {number} length Buffer length in frames.\n     * @param  {number} channelCount Buffer channel count.\n     */\n    function RingBuffer(length, channelCount) {\n      _classCallCheck(this, RingBuffer);\n\n      this._readIndex = 0;\n      this._writeIndex = 0;\n      this._framesAvailable = 0;\n      this._channelCount = channelCount;\n      this._length = length;\n      this._channelData = [];\n\n      for (var i = 0; i < this._channelCount; ++i) {\n        this._channelData[i] = new Float32Array(length);\n      }\n    }\n    /**\n     * Getter for Available frames in buffer.\n     *\n     * @return {number} Available frames in buffer.\n     */\n\n\n    _createClass(RingBuffer, [{\n      key: "push",\n\n      /**\n       * Push a sequence of Float32Arrays to buffer.\n       *\n       * @param  {array} arraySequence A sequence of Float32Arrays.\n       */\n      value: function push(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // Transfer data from the |arraySequence| storage to the internal buffer.\n        var sourceLength = arraySequence[0] ? arraySequence[0].length : 0;\n\n        for (var i = 0; i < sourceLength; ++i) {\n          var writeIndex = (this._writeIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            this._channelData[channel][writeIndex] = arraySequence[channel][i];\n          }\n        }\n\n        this._writeIndex += sourceLength;\n\n        if (this._writeIndex >= this._length) {\n          this._writeIndex = 0;\n        } // For excessive frames, the buffer will be overwritten.\n\n\n        this._framesAvailable += sourceLength;\n\n        if (this._framesAvailable > this._length) {\n          this._framesAvailable = this._length;\n        }\n      }\n      /**\n       * Pull data out of buffer and fill a given sequence of Float32Arrays.\n       *\n       * @param  {array} arraySequence An array of Float32Arrays.\n       */\n\n    }, {\n      key: "pull",\n      value: function pull(arraySequence) {\n        // The channel count of arraySequence and the length of each channel must\n        // match with this buffer obejct.\n        // If the FIFO is completely empty, do nothing.\n        if (this._framesAvailable === 0) {\n          return;\n        }\n\n        var destinationLength = arraySequence[0].length; // Transfer data from the internal buffer to the |arraySequence| storage.\n\n        for (var i = 0; i < destinationLength; ++i) {\n          var readIndex = (this._readIndex + i) % this._length;\n\n          for (var channel = 0; channel < this._channelCount; ++channel) {\n            arraySequence[channel][i] = this._channelData[channel][readIndex];\n          }\n        }\n\n        this._readIndex += destinationLength;\n\n        if (this._readIndex >= this._length) {\n          this._readIndex = 0;\n        }\n\n        this._framesAvailable -= destinationLength;\n\n        if (this._framesAvailable < 0) {\n          this._framesAvailable = 0;\n        }\n      }\n    }, {\n      key: "framesAvailable",\n      get: function get() {\n        return this._framesAvailable;\n      }\n    }]);\n\n    return RingBuffer;\n  }()\n}["default"];\n\nvar AmplitudeProcessor =\n/*#__PURE__*/\nfunction (_AudioWorkletProcesso) {\n  _inherits(AmplitudeProcessor, _AudioWorkletProcesso);\n\n  function AmplitudeProcessor(options) {\n    var _this;\n\n    _classCallCheck(this, AmplitudeProcessor);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(AmplitudeProcessor).call(this));\n    var processorOptions = options.processorOptions || {};\n    _this.numOutputChannels = options.outputChannelCount || 1;\n    _this.numInputChannels = processorOptions.numInputChannels || 2;\n    _this.normalize = processorOptions.normalize || false;\n    _this.smoothing = processorOptions.smoothing || 0;\n    _this.bufferSize = processorOptions.bufferSize || 2048;\n    _this.inputRingBuffer = new RingBuffer(_this.bufferSize, _this.numInputChannels);\n    _this.outputRingBuffer = new RingBuffer(_this.bufferSize, _this.numOutputChannels);\n    _this.inputRingBufferArraySequence = new Array(_this.numInputChannels).fill(null).map(function () {\n      return new Float32Array(_this.bufferSize);\n    });\n    _this.stereoVol = [0, 0];\n    _this.stereoVolNorm = [0, 0];\n    _this.volMax = 0.001;\n\n    _this.port.onmessage = function (event) {\n      var data = event.data;\n\n      if (data.name === \'toggleNormalize\') {\n        _this.normalize = data.normalize;\n      } else if (data.name === \'smoothing\') {\n        _this.smoothing = Math.max(0, Math.min(1, data.smoothing));\n      }\n    };\n\n    return _this;\n  } // TO DO make this stereo / dependent on # of audio channels\n\n\n  _createClass(AmplitudeProcessor, [{\n    key: "process",\n    value: function process(inputs, outputs) {\n      var input = inputs[0];\n      var output = outputs[0];\n      var smoothing = this.smoothing;\n      this.inputRingBuffer.push(input);\n\n      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) {\n        this.inputRingBuffer.pull(this.inputRingBufferArraySequence);\n\n        for (var channel = 0; channel < this.numInputChannels; ++channel) {\n          var inputBuffer = this.inputRingBufferArraySequence[channel];\n          var bufLength = inputBuffer.length;\n          var sum = 0;\n\n          for (var i = 0; i < bufLength; i++) {\n            var x = inputBuffer[i];\n\n            if (this.normalize) {\n              sum += Math.max(Math.min(x / this.volMax, 1), -1) * Math.max(Math.min(x / this.volMax, 1), -1);\n            } else {\n              sum += x * x;\n            }\n          } // ... then take the square root of the sum.\n\n\n          var rms = Math.sqrt(sum / bufLength);\n          this.stereoVol[channel] = Math.max(rms, this.stereoVol[channel] * smoothing);\n          this.volMax = Math.max(this.stereoVol[channel], this.volMax);\n        } // calculate stero normalized volume and add volume from all channels together\n\n\n        var volSum = 0;\n\n        for (var index = 0; index < this.stereoVol.length; index++) {\n          this.stereoVolNorm[index] = Math.max(Math.min(this.stereoVol[index] / this.volMax, 1), 0);\n          volSum += this.stereoVol[index];\n        } // volume is average of channels\n\n\n        var volume = volSum / this.stereoVol.length; // normalized value\n\n        var volNorm = Math.max(Math.min(volume / this.volMax, 1), 0);\n        this.port.postMessage({\n          name: \'amplitude\',\n          volume: volume,\n          volNorm: volNorm,\n          stereoVol: this.stereoVol,\n          stereoVolNorm: this.stereoVolNorm\n        }); // pass input through to output\n\n        this.outputRingBuffer.push(this.inputRingBufferArraySequence);\n      } // pull 128 frames out of the ring buffer\n      // if the ring buffer does not have enough frames, the output will be silent\n\n\n      this.outputRingBuffer.pull(output);\n      return true;\n    }\n  }]);\n\n  return AmplitudeProcessor;\n}(_wrapNativeSuper(AudioWorkletProcessor));\n\nregisterProcessor(processorNames.amplitudeProcessor, AmplitudeProcessor);';
    },
    function(t43, e34, n24) {
        var i20, r13;
        i20 = [
            n24(0),
            n24(17)
        ], void 0 === (r13 = (function(r14) {
            r14.Frequency = function(t, e) {
                if (!(this instanceof r14.Frequency)) return new r14.Frequency(t, e);
                r14.TimeBase.call(this, t, e);
            }, r14.extend(r14.Frequency, r14.TimeBase), r14.Frequency.prototype._primaryExpressions = Object.create(r14.TimeBase.prototype._primaryExpressions), r14.Frequency.prototype._primaryExpressions.midi = {
                regexp: /^(\d+(?:\.\d+)?midi)/,
                method: function(t) {
                    return this.midiToFrequency(t);
                }
            }, r14.Frequency.prototype._primaryExpressions.note = {
                regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
                method: function(t, e) {
                    var n = i21[t.toLowerCase()] + 12 * (parseInt(e) + 1);
                    return this.midiToFrequency(n);
                }
            }, r14.Frequency.prototype._primaryExpressions.tr = {
                regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
                method: function(t, e, n) {
                    var i = 1;
                    return t && "0" !== t && (i *= this._beatsToUnits(this._timeSignature() * parseFloat(t))), e && "0" !== e && (i *= this._beatsToUnits(parseFloat(e))), n && "0" !== n && (i *= this._beatsToUnits(parseFloat(n) / 4)), i;
                }
            }, r14.Frequency.prototype.transpose = function(t44) {
                return this._expr = (function(t, e) {
                    return t() * this.intervalToFrequencyRatio(e);
                }).bind(this, this._expr, t44), this;
            }, r14.Frequency.prototype.harmonize = function(t45) {
                return this._expr = (function(t, e) {
                    for(var n = t(), i = [], r = 0; r < e.length; r++)i[r] = n * this.intervalToFrequencyRatio(e[r]);
                    return i;
                }).bind(this, this._expr, t45), this;
            }, r14.Frequency.prototype.toMidi = function() {
                return this.frequencyToMidi(this.valueOf());
            }, r14.Frequency.prototype.toNote = function() {
                var t = this.valueOf(), e = Math.log(t / r14.Frequency.A4) / Math.LN2, n = Math.round(12 * e) + 57, i = Math.floor(n / 12);
                return i < 0 && (n += -12 * i), o[n % 12] + i.toString();
            }, r14.Frequency.prototype.toSeconds = function() {
                return 1 / this.valueOf();
            }, r14.Frequency.prototype.toFrequency = function() {
                return this.valueOf();
            }, r14.Frequency.prototype.toTicks = function() {
                var t = this._beatsToUnits(1), e = this.valueOf() / t;
                return Math.floor(e * r14.Transport.PPQ);
            }, r14.Frequency.prototype._frequencyToUnits = function(t) {
                return t;
            }, r14.Frequency.prototype._ticksToUnits = function(t) {
                return 1 / (60 * t / (r14.Transport.bpm.value * r14.Transport.PPQ));
            }, r14.Frequency.prototype._beatsToUnits = function(t) {
                return 1 / r14.TimeBase.prototype._beatsToUnits.call(this, t);
            }, r14.Frequency.prototype._secondsToUnits = function(t) {
                return 1 / t;
            }, r14.Frequency.prototype._defaultUnits = "hz";
            var i21 = {
                cbb: -2,
                cb: -1,
                c: 0,
                "c#": 1,
                cx: 2,
                dbb: 0,
                db: 1,
                d: 2,
                "d#": 3,
                dx: 4,
                ebb: 2,
                eb: 3,
                e: 4,
                "e#": 5,
                ex: 6,
                fbb: 3,
                fb: 4,
                f: 5,
                "f#": 6,
                fx: 7,
                gbb: 5,
                gb: 6,
                g: 7,
                "g#": 8,
                gx: 9,
                abb: 7,
                ab: 8,
                a: 9,
                "a#": 10,
                ax: 11,
                bbb: 9,
                bb: 10,
                b: 11,
                "b#": 12,
                bx: 13
            }, o = [
                "C",
                "C#",
                "D",
                "D#",
                "E",
                "F",
                "F#",
                "G",
                "G#",
                "A",
                "A#",
                "B"
            ];
            return r14.Frequency.A4 = 440, r14.Frequency.prototype.midiToFrequency = function(t) {
                return r14.Frequency.A4 * Math.pow(2, (t - 69) / 12);
            }, r14.Frequency.prototype.frequencyToMidi = function(t) {
                return 69 + 12 * Math.log(t / r14.Frequency.A4) / Math.LN2;
            }, r14.Frequency;
        }).apply(e34, i20)) || (t43.exports = r13);
    },
    function(t46, e35, n25) {
        var i22, r;
        i22 = [
            n25(0),
            n25(16)
        ], void 0 === (r = (function(i) {
            return i.TransportTime = function(t, e) {
                if (!(this instanceof i.TransportTime)) return new i.TransportTime(t, e);
                i.Time.call(this, t, e);
            }, i.extend(i.TransportTime, i.Time), i.TransportTime.prototype._unaryExpressions = Object.create(i.Time.prototype._unaryExpressions), i.TransportTime.prototype._unaryExpressions.quantize = {
                regexp: /^@/,
                method: function(t) {
                    var e = this._secondsToTicks(t()), n = Math.ceil(i.Transport.ticks / e);
                    return this._ticksToUnits(n * e);
                }
            }, i.TransportTime.prototype._secondsToTicks = function(t) {
                var e = t / this._beatsToUnits(1);
                return Math.round(e * i.Transport.PPQ);
            }, i.TransportTime.prototype.valueOf = function() {
                return this._secondsToTicks(this._expr()) + (this._plusNow ? i.Transport.ticks : 0);
            }, i.TransportTime.prototype.toTicks = function() {
                return this.valueOf();
            }, i.TransportTime.prototype.toSeconds = function() {
                return this._expr() + (this._plusNow ? i.Transport.seconds : 0);
            }, i.TransportTime.prototype.toFrequency = function() {
                return 1 / this.toSeconds();
            }, i.TransportTime;
        }).apply(e35, i22)) || (t46.exports = r);
    },
    function(t47, e36, n26) {
        var i23, r15;
        i23 = [
            n26(0),
            n26(4),
            n26(13),
            n26(1),
            n26(33),
            n26(21),
            n26(34),
            n26(20),
            n26(35),
            n26(36),
            n26(37)
        ], void 0 === (r15 = (function(u) {
            "use strict";
            function n27(t, e, n) {
                var i = new t;
                return n._eval(e[0]).connect(i, 0, 0), n._eval(e[1]).connect(i, 0, 1), i;
            }
            function i24(t, e, n) {
                var i = new t;
                return n._eval(e[0]).connect(i, 0, 0), i;
            }
            function r16(t) {
                return t ? parseFloat(t) : void 0;
            }
            function o3(t) {
                return t && t.args ? parseFloat(t.args) : void 0;
            }
            return u.Expr = function() {
                var t = this._replacements(Array.prototype.slice.call(arguments)), e = this._parseInputs(t);
                this._nodes = [], this.input = new Array(e);
                for(var n = 0; n < e; n++)this.input[n] = this.context.createGain();
                var i, r = this._parseTree(t);
                try {
                    i = this._eval(r);
                } catch (e37) {
                    throw this._disposeNodes(), new Error("Tone.Expr: Could evaluate expression: " + t);
                }
                this.output = i;
            }, u.extend(u.Expr, u.SignalBase), u.Expr._Expressions = {
                value: {
                    signal: {
                        regexp: /^\d+\.\d+|^\d+/,
                        method: function(t) {
                            return new u.Signal(r16(t));
                        }
                    },
                    input: {
                        regexp: /^\$\d/,
                        method: function(t, e) {
                            return e.input[r16(t.substr(1))];
                        }
                    }
                },
                glue: {
                    "(": {
                        regexp: /^\(/
                    },
                    ")": {
                        regexp: /^\)/
                    },
                    ",": {
                        regexp: /^,/
                    }
                },
                func: {
                    abs: {
                        regexp: /^abs/,
                        method: i24.bind(this, u.Abs)
                    },
                    mod: {
                        regexp: /^mod/,
                        method: function(t, e) {
                            var n = o3(t[1]), i = new u.Modulo(n);
                            return e._eval(t[0]).connect(i), i;
                        }
                    },
                    pow: {
                        regexp: /^pow/,
                        method: function(t, e) {
                            var n = o3(t[1]), i = new u.Pow(n);
                            return e._eval(t[0]).connect(i), i;
                        }
                    },
                    a2g: {
                        regexp: /^a2g/,
                        method: function(t, e) {
                            var n = new u.AudioToGain;
                            return e._eval(t[0]).connect(n), n;
                        }
                    }
                },
                binary: {
                    "+": {
                        regexp: /^\+/,
                        precedence: 1,
                        method: n27.bind(this, u.Add)
                    },
                    "-": {
                        regexp: /^\-/,
                        precedence: 1,
                        method: function(t, e) {
                            return 1 === t.length ? i24(u.Negate, t, e) : n27(u.Subtract, t, e);
                        }
                    },
                    "*": {
                        regexp: /^\*/,
                        precedence: 0,
                        method: n27.bind(this, u.Multiply)
                    }
                },
                unary: {
                    "-": {
                        regexp: /^\-/,
                        method: i24.bind(this, u.Negate)
                    },
                    "!": {
                        regexp: /^\!/,
                        method: i24.bind(this, u.NOT)
                    }
                }
            }, u.Expr.prototype._parseInputs = function(t) {
                var e = t.match(/\$\d/g), n = 0;
                if (null !== e) for(var i = 0; i < e.length; i++){
                    var r = parseInt(e[i].substr(1)) + 1;
                    n = Math.max(n, r);
                }
                return n;
            }, u.Expr.prototype._replacements = function(t) {
                for(var e = t.shift(), n = 0; n < t.length; n++)e = e.replace(/\%/i, t[n]);
                return e;
            }, u.Expr.prototype._tokenize = function(t48) {
                for(var e38 = -1, n28 = []; 0 < t48.length;){
                    var i = r17(t48 = t48.trim());
                    n28.push(i), t48 = t48.substr(i.value.length);
                }
                function r17(t) {
                    for(var e in u.Expr._Expressions){
                        var n = u.Expr._Expressions[e];
                        for(var i in n){
                            var r = n[i], o = r.regexp, s = t.match(o);
                            if (null !== s) return {
                                type: e,
                                value: s[0],
                                method: r.method
                            };
                        }
                    }
                    throw new SyntaxError("Tone.Expr: Unexpected token " + t);
                }
                return {
                    next: function() {
                        return n28[++e38];
                    },
                    peek: function() {
                        return n28[e38 + 1];
                    }
                };
            }, u.Expr.prototype._parseTree = function(t49) {
                var i25 = this._tokenize(t49), s = this.isUndef.bind(this);
                function r18(t, e) {
                    return !s(t) && "glue" === t.type && t.value === e;
                }
                function o4(t, e, n) {
                    var i = u.Expr._Expressions[e];
                    if (!s(t)) for(var r in i){
                        var o = i[r];
                        if (o.regexp.test(t.value)) {
                            if (s(n)) return !0;
                            if (o.precedence === n) return !0;
                        }
                    }
                    return !1;
                }
                function a(t50) {
                    var e39;
                    s(t50) && (t50 = 5), e39 = t50 < 0 ? function t51() {
                        var e40, n;
                        return o4(e40 = i25.peek(), "unary") ? (e40 = i25.next(), n = t51(), {
                            operator: e40.value,
                            method: e40.method,
                            args: [
                                n
                            ]
                        }) : function() {
                            var t52, e41;
                            if (t52 = i25.peek(), s(t52)) throw new SyntaxError("Tone.Expr: Unexpected termination of expression");
                            if ("func" === t52.type) return function(t53) {
                                var e42 = [];
                                if (!r18(i25.next(), "(")) throw new SyntaxError('Tone.Expr: Expected ( in a function call "' + t53.value + '"');
                                if (r18(i25.peek(), ")") || (e42 = function() {
                                    for(var t, e = []; t = a(), !s(t) && (e.push(t), r18(i25.peek(), ","));)i25.next();
                                    return e;
                                }()), r18(i25.next(), ")")) return {
                                    method: t53.method,
                                    args: e42,
                                    name: name
                                };
                                throw new SyntaxError('Tone.Expr: Expected ) in a function call "' + t53.value + '"');
                            }(t52 = i25.next());
                            if ("value" === t52.type) return {
                                method: (t52 = i25.next()).method,
                                args: t52.value
                            };
                            if (r18(t52, "(")) {
                                if (i25.next(), e41 = a(), !r18(t52 = i25.next(), ")")) throw new SyntaxError("Expected )");
                                return e41;
                            }
                            throw new SyntaxError("Tone.Expr: Parse error, cannot process token " + t52.value);
                        }();
                    }() : a(t50 - 1);
                    for(var n29 = i25.peek(); o4(n29, "binary", t50);)e39 = {
                        operator: (n29 = i25.next()).value,
                        method: n29.method,
                        args: [
                            e39,
                            a(t50 - 1)
                        ]
                    }, n29 = i25.peek();
                    return e39;
                }
                return a();
            }, u.Expr.prototype._eval = function(t) {
                if (!this.isUndef(t)) {
                    var e = t.method(t.args, this);
                    return this._nodes.push(e), e;
                }
            }, u.Expr.prototype._disposeNodes = function() {
                for(var t = 0; t < this._nodes.length; t++){
                    var e = this._nodes[t];
                    this.isFunction(e.dispose) ? e.dispose() : this.isFunction(e.disconnect) && e.disconnect(), e = null, this._nodes[t] = null;
                }
                this._nodes = null;
            }, u.Expr.prototype.dispose = function() {
                u.prototype.dispose.call(this), this._disposeNodes();
            }, u.Expr;
        }).apply(e36, i23)) || (t47.exports = r15);
    },
    function(t54, e43, n) {
        var i, r;
        i = [
            n(0),
            n(21),
            n(13),
            n(2)
        ], void 0 === (r = (function(e) {
            "use strict";
            return e.GreaterThan = function(t) {
                this.createInsOuts(2, 0), this._param = this.input[0] = new e.Subtract(t), this.input[1] = this._param.input[1], this._gtz = this.output = new e.GreaterThanZero, this._param.connect(this._gtz);
            }, e.extend(e.GreaterThan, e.Signal), e.GreaterThan.prototype.dispose = function() {
                return e.prototype.dispose.call(this), this._param.dispose(), this._param = null, this._gtz.dispose(), this._gtz = null, this;
            }, e.GreaterThan;
        }).apply(e43, i)) || (t54.exports = r);
    },
    function(t55, e, n) {
        var i, r;
        i = [
            n(0),
            n(6),
            n(15)
        ], void 0 === (r = (function(t56) {
            "use strict";
            return t56.Abs = function() {
                this._abs = this.input = this.output = new t56.WaveShaper(function(t) {
                    return 0 === t ? 0 : Math.abs(t);
                }, 127);
            }, t56.extend(t56.Abs, t56.SignalBase), t56.Abs.prototype.dispose = function() {
                return t56.prototype.dispose.call(this), this._abs.dispose(), this._abs = null, this;
            }, t56.Abs;
        }).apply(e, i)) || (t55.exports = r);
    },
    function(t57, e44, n) {
        var i, r;
        i = [
            n(0),
            n(6),
            n(1),
            n(13)
        ], void 0 === (r = (function(e45) {
            "use strict";
            return e45.Modulo = function(t) {
                this.createInsOuts(1, 0), this._shaper = new e45.WaveShaper(Math.pow(2, 16)), this._multiply = new e45.Multiply, this._subtract = this.output = new e45.Subtract, this._modSignal = new e45.Signal(t), this.input.fan(this._shaper, this._subtract), this._modSignal.connect(this._multiply, 0, 0), this._shaper.connect(this._multiply, 0, 1), this._multiply.connect(this._subtract, 0, 1), this._setWaveShaper(t);
            }, e45.extend(e45.Modulo, e45.SignalBase), e45.Modulo.prototype._setWaveShaper = function(e) {
                this._shaper.setMap(function(t) {
                    return Math.floor((t + 1e-4) / e);
                });
            }, Object.defineProperty(e45.Modulo.prototype, "value", {
                get: function() {
                    return this._modSignal.value;
                },
                set: function(t) {
                    this._modSignal.value = t, this._setWaveShaper(t);
                }
            }), e45.Modulo.prototype.dispose = function() {
                return e45.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null, this._multiply.dispose(), this._multiply = null, this._subtract.dispose(), this._subtract = null, this._modSignal.dispose(), this._modSignal = null, this;
            }, e45.Modulo;
        }).apply(e44, i)) || (t57.exports = r);
    },
    function(t58, e46, n) {
        var i, r;
        i = [
            n(0),
            n(6)
        ], void 0 === (r = (function(e47) {
            "use strict";
            return e47.Pow = function(t) {
                this._exp = this.defaultArg(t, 1), this._expScaler = this.input = this.output = new e47.WaveShaper(this._expFunc(this._exp), 8192);
            }, e47.extend(e47.Pow, e47.SignalBase), Object.defineProperty(e47.Pow.prototype, "value", {
                get: function() {
                    return this._exp;
                },
                set: function(t) {
                    this._exp = t, this._expScaler.setMap(this._expFunc(this._exp));
                }
            }), e47.Pow.prototype._expFunc = function(e) {
                return function(t) {
                    return Math.pow(Math.abs(t), e);
                };
            }, e47.Pow.prototype.dispose = function() {
                return e47.prototype.dispose.call(this), this._expScaler.dispose(), this._expScaler = null, this;
            }, e47.Pow;
        }).apply(e46, i)) || (t58.exports = r);
    },
    function(t59, e, n) {
        var i, r;
        i = [
            n(0),
            n(6),
            n(2)
        ], void 0 === (r = (function(t60) {
            "use strict";
            return t60.AudioToGain = function() {
                this._norm = this.input = this.output = new t60.WaveShaper(function(t) {
                    return (t + 1) / 2;
                });
            }, t60.extend(t60.AudioToGain, t60.SignalBase), t60.AudioToGain.prototype.dispose = function() {
                return t60.prototype.dispose.call(this), this._norm.dispose(), this._norm = null, this;
            }, t60.AudioToGain;
        }).apply(e, i)) || (t59.exports = r);
    },
    function(t61, e, n) {
        var i, r;
        i = [
            n(0),
            n(6)
        ], void 0 === (r = (function(t62) {
            "use strict";
            return t62.EqualPowerGain = function() {
                this._eqPower = this.input = this.output = new t62.WaveShaper((function(t) {
                    return Math.abs(t) < .001 ? 0 : this.equalPowerScale(t);
                }).bind(this), 4096);
            }, t62.extend(t62.EqualPowerGain, t62.SignalBase), t62.EqualPowerGain.prototype.dispose = function() {
                return t62.prototype.dispose.call(this), this._eqPower.dispose(), this._eqPower = null, this;
            }, t62.EqualPowerGain;
        }).apply(e, i)) || (t61.exports = r);
    },
    function(t63, e48, n) {
        var i, r;
        i = [
            n(0),
            n(19),
            n(9)
        ], void 0 === (r = (function(e49) {
            "use strict";
            return e49.TimelineState = function(t) {
                e49.Timeline.call(this), this._initial = t;
            }, e49.extend(e49.TimelineState, e49.Timeline), e49.TimelineState.prototype.getValueAtTime = function(t) {
                var e = this.get(t);
                return null !== e ? e.state : this._initial;
            }, e49.TimelineState.prototype.setStateAtTime = function(t, e) {
                this.add({
                    state: t,
                    time: e
                });
            }, e49.TimelineState;
        }).apply(e48, i)) || (t63.exports = r);
    },
    function(t64, e50, n30) {
        "use strict";
        n30.r(e50);
        n30(24), n30(25);
        var c1 = n30(3);
        var o5 = new function t65() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t65), this.input = c1.a.createGain(), this.output = c1.a.createGain(), this.limiter = c1.a.createDynamicsCompressor(), this.limiter.threshold.value = -3, this.limiter.ratio.value = 20, this.limiter.knee.value = 1, this.audiocontext = c1.a, this.output.disconnect(), this.input.connect(this.limiter), this.limiter.connect(this.output), this.meter = c1.a.createGain(), this.fftMeter = c1.a.createGain(), this.output.connect(this.meter), this.output.connect(this.fftMeter), this.output.connect(this.audiocontext.destination), this.soundArray = [], this.parts = [], this.extensions = [];
        };
        p5.prototype.getOutputVolume = function() {
            return o5.output.gain.value;
        }, p5.prototype.outputVolume = function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
            if ("number" == typeof t) {
                var i = o5.audiocontext.currentTime, r = o5.output.gain.value;
                o5.output.gain.cancelScheduledValues(i + n), o5.output.gain.linearRampToValueAtTime(r, i + n), o5.output.gain.linearRampToValueAtTime(t, i + n + e);
            } else {
                if (!t) return o5.output.gain;
                t.connect(o5.output.gain);
            }
        }, p5.prototype.soundOut = p5.soundOut = o5, p5.soundOut._silentNode = o5.audiocontext.createGain(), p5.soundOut._silentNode.gain.value = 0, p5.soundOut._silentNode.connect(o5.audiocontext.destination);
        var p1 = o5, i26 = n30(5), s2 = n30.n(i26);
        function f1(t66) {
            return (f1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t66);
        }
        function l1(t) {
            var e = Math.log(t / 440) / Math.log(2);
            return Math.round(12 * e) + 69;
        }
        function r19(t) {
            return 440 * Math.pow(2, (t - 69) / 12);
        }
        function h1(t) {
            if ("string" != typeof t) return t;
            var e = {
                A: 21,
                B: 23,
                C: 24,
                D: 26,
                E: 28,
                F: 29,
                G: 31
            }[t[0].toUpperCase()];
            switch(e += 12 * (~~t.slice(-1) - 1), t[1]){
                case "#":
                    e += 1;
                    break;
                case "b":
                    e -= 1;
            }
            return r19(e);
        }
        function a2(t) {
            var e, n = u2(e = t.getChannelData(0), 1 < t.numberOfChannels ? t.getChannelData(1) : e), i = new window.ArrayBuffer(44 + 2 * n.length), r = new window.DataView(i);
            d(r, 0, "RIFF"), r.setUint32(4, 36 + 2 * n.length, !0), d(r, 8, "WAVE"), d(r, 12, "fmt "), r.setUint32(16, 16, !0), r.setUint16(20, 1, !0), r.setUint16(22, 2, !0), r.setUint32(24, p1.audiocontext.sampleRate, !0), r.setUint32(28, 4 * p1.audiocontext.sampleRate, !0), r.setUint16(32, 4, !0), r.setUint16(34, 16, !0), d(r, 36, "data"), r.setUint32(40, 2 * n.length, !0);
            for(var o = n.length, s = 44, a = 0; a < o; a++)r.setInt16(s, 32767 * n[a], !0), s += 2;
            return r;
        }
        function u2(t, e) {
            for(var n = t.length + e.length, i = new Float32Array(n), r = 0, o = 0; o < n;)i[o++] = t[r], i[o++] = e[r], r++;
            return i;
        }
        function d(t, e, n) {
            for(var i = n.length, r = 0; r < i; r++)t.setUint8(e + r, n.charCodeAt(r));
        }
        function y(t) {
            var e = t, n = new AudioWorkletNode(p1.audiocontext, s2.a.soundFileProcessor);
            return n instanceof ScriptProcessorNode && (e = n.bufferSize), n.disconnect(), n = null, e;
        }
        var m = function(t67, e, n) {
            var i, r, o = new Error;
            return o.name = t67, o.originalStack = o.stack + e, i = o.stack + e, o.failedPath = n, r = i.split("\n").filter(function(t) {
                return !t.match(/(p5.|native code|globalInit)/g);
            }), o.stack = r.join("\n"), o;
        }, v = [
            n30(27).default,
            n30(28).default,
            n30(29).default
        ], _ = p1.audiocontext, g = !1;
        function b(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function T(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function w(t, e, n) {
            return e && T(t.prototype, e), n && T(t, n), t;
        }
        p5.prototype.registerMethod("init", function() {
            if (!g) {
                this.preload || window.preload || (this.preload = function() {}), this._incrementPreload();
                var t68 = (function() {
                    g = !0, this._decrementPreload();
                }).bind(this);
                Promise.all(v.map(function(t) {
                    var e = new Blob([
                        t
                    ], {
                        type: "application/javascript"
                    }), n = URL.createObjectURL(e);
                    return _.audioWorklet.addModule(n);
                })).then(t68);
            }
        });
        var x, S = p1.audiocontext;
        void 0 !== S.createStereoPanner ? x = function() {
            function n31(t, e) {
                b(this, n31), this.stereoPanner = this.input = S.createStereoPanner(), t.connect(this.stereoPanner), this.stereoPanner.connect(e);
            }
            return w(n31, [
                {
                    key: "pan",
                    value: function(t, e) {
                        var n = e || 0, i = S.currentTime + n;
                        this.stereoPanner.pan.linearRampToValueAtTime(t, i);
                    }
                },
                {
                    key: "inputChannels",
                    value: function() {}
                },
                {
                    key: "connect",
                    value: function(t) {
                        this.stereoPanner.connect(t);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.stereoPanner && this.stereoPanner.disconnect();
                    }
                }
            ]), n31;
        }() : x = function() {
            function i27(t, e, n) {
                b(this, i27), this.input = S.createGain(), t.connect(this.input), this.left = S.createGain(), this.right = S.createGain(), this.left.channelInterpretation = "discrete", this.right.channelInterpretation = "discrete", 1 < n ? (this.splitter = S.createChannelSplitter(2), this.input.connect(this.splitter), this.splitter.connect(this.left, 1), this.splitter.connect(this.right, 0)) : (this.input.connect(this.left), this.input.connect(this.right)), this.output = S.createChannelMerger(2), this.left.connect(this.output, 0, 1), this.right.connect(this.output, 0, 0), this.output.connect(e);
            }
            return w(i27, [
                {
                    key: "pan",
                    value: function(t, e) {
                        var n = e || 0, i = S.currentTime + n, r = (t + 1) / 2, o = Math.cos(r * Math.PI / 2), s = Math.sin(r * Math.PI / 2);
                        this.left.gain.linearRampToValueAtTime(s, i), this.right.gain.linearRampToValueAtTime(o, i);
                    }
                },
                {
                    key: "inputChannels",
                    value: function(t) {
                        1 === t ? (this.input.disconnect(), this.input.connect(this.left), this.input.connect(this.right)) : 2 === t && (void 0 === this.splitter && (this.splitter = S.createChannelSplitter(2)), this.input.disconnect(), this.input.connect(this.splitter), this.splitter.connect(this.left, 1), this.splitter.connect(this.right, 0));
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        this.output.connect(t);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && this.output.disconnect();
                    }
                }
            ]), i27;
        }();
        var k = x;
        function P(t70) {
            return (P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t70);
        }
        function A(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function O(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function C(t, e, n, i) {
            O(this, C), this.callback = t, this.time = e, this.id = n, this.val = i;
        }
        var R = p1.audiocontext;
        var q = function() {
            function o6(t71, e51, n32, i) {
                if (O(this, o6), void 0 !== t71) {
                    if ("string" == typeof t71 || "string" == typeof t71[0]) {
                        var r = p5.prototype._checkFileFormats(t71);
                        this.url = r;
                    } else if ("object" === P(t71) && !(window.File && window.FileReader && window.FileList && window.Blob)) throw "Unable to load file because the File API is not supported";
                    t71.file && (t71 = t71.file), this.file = t71;
                }
                this._onended = function() {}, this._looping = !1, this._playing = !1, this._paused = !1, this._pauseTime = 0, this._cues = [], this._cueIDCounter = 0, this._lastPos = 0, this._counterNode = null, this._workletNode = null, this.bufferSourceNodes = [], this.bufferSourceNode = null, this.buffer = null, this.playbackRate = 1, this.input = p1.audiocontext.createGain(), this.output = p1.audiocontext.createGain(), this.reversed = !1, this.startTime = 0, this.endTime = null, this.pauseTime = 0, this.mode = "sustain", this.startMillis = null, this.panPosition = 0, this.panner = new k(this.output, p1.input, 2), (this.url || this.file) && this.load(e51, n32), p1.soundArray.push(this), this._whileLoading = "function" == typeof i ? i : function() {}, this._clearOnEnd = (function(t72) {
                    var e52 = t72.target, n = this;
                    e52._playing = !1, e52.removeEventListener("ended", n._clearOnEnd), n._onended(n), n.bufferSourceNodes.map(function(t, e) {
                        return e;
                    }).reverse().forEach(function(t) {
                        !1 === n.bufferSourceNodes[t]._playing && n.bufferSourceNodes.splice(t, 1);
                    }), 0 === n.bufferSourceNodes.length && (n._playing = !1);
                }).bind(this), this.amp = this.setVolume, this.fade = this.setVolume;
            }
            return function(t, e, n) {
                e && A(t.prototype, e), n && A(t, n);
            }(o6, [
                {
                    key: "load",
                    value: function(n, i) {
                        var r = this, o = (new Error).stack;
                        if (void 0 !== this.url && "" !== this.url) {
                            var s = new XMLHttpRequest;
                            s.addEventListener("progress", function(t) {
                                r._updateProgress(t);
                            }, !1), s.open("GET", this.url, !0), s.responseType = "arraybuffer", s.onload = function() {
                                if (200 === s.status) {
                                    if (!r.panner) return;
                                    R.decodeAudioData(s.response, function(t) {
                                        r.panner && (r.buffer = t, r.panner.inputChannels(t.numberOfChannels), n && n(r));
                                    }, function() {
                                        if (r.panner) {
                                            var t = new m("decodeAudioData", o, r.url), e = "AudioContext error at decodeAudioData for " + r.url;
                                            i && (t.msg = e, i(t));
                                        }
                                    });
                                } else {
                                    if (!r.panner) return;
                                    var t74 = new m("loadSound", o, r.url), e53 = "Unable to load " + r.url + ". The request status was: " + s.status + " (" + s.statusText + ")";
                                    i && (t74.message = e53, i(t74));
                                }
                            }, s.onerror = function() {
                                var t = new m("loadSound", o, r.url), e = "There was no response from the server at " + r.url + ". Check the url and internet connectivity.";
                                i && (t.message = e, i(t));
                            }, s.send();
                        } else if (void 0 !== this.file) {
                            var t73 = new FileReader;
                            t73.onload = function() {
                                r.panner && R.decodeAudioData(t73.result, function(t) {
                                    r.panner && (r.buffer = t, r.panner.inputChannels(t.numberOfChannels), n && n(r));
                                });
                            }, t73.onerror = function(t) {
                                r.panner && onerror && onerror(t);
                            }, t73.readAsArrayBuffer(this.file);
                        }
                    }
                },
                {
                    key: "_updateProgress",
                    value: function(t) {
                        if (t.lengthComputable) {
                            var e = t.loaded / t.total * .99;
                            this._whileLoading(e, t);
                        } else this._whileLoading("size unknown");
                    }
                },
                {
                    key: "isLoaded",
                    value: function() {
                        return !!this.buffer;
                    }
                },
                {
                    key: "play",
                    value: function(t, e, n, i, r) {
                        if (this.output) {
                            var o, s, a = t || 0;
                            if (a < 0 && (a = 0), a += p1.audiocontext.currentTime, void 0 !== e && this.rate(e), void 0 !== n && this.setVolume(n), !this.buffer) throw "not ready to play file, buffer has yet to load. Try preload()";
                            if (this._pauseTime = 0, "restart" === this.mode && this.buffer && this.bufferSourceNode && (this.bufferSourceNode.stop(a), this._counterNode.stop(a)), "untildone" !== this.mode || !this.isPlaying()) {
                                if (this.bufferSourceNode = this._initSourceNode(), delete this._counterNode, this._counterNode = this._initCounterNode(), i) {
                                    if (!(0 <= i && i < this.buffer.duration)) throw "start time out of range";
                                    o = i;
                                } else o = 0;
                                r = r && (r <= this.buffer.duration - o ? r : this.buffer.duration), this._paused ? (this.bufferSourceNode.start(a, this.pauseTime, r), this._counterNode.start(a, this.pauseTime, r)) : (this.bufferSourceNode.start(a, o, r), this._counterNode.start(a, o, r)), this._playing = !0, this._paused = !1, this.bufferSourceNodes.push(this.bufferSourceNode), this.bufferSourceNode._arrayIndex = this.bufferSourceNodes.length - 1, this.bufferSourceNode.addEventListener("ended", this._clearOnEnd), this.bufferSourceNode.loop = this._looping, this._counterNode.loop = this._looping, !0 === this._looping && (s = r || o - 1e-15, this.bufferSourceNode.loopStart = o, this.bufferSourceNode.loopEnd = s, this._counterNode.loopStart = o, this._counterNode.loopEnd = s);
                            }
                        }
                    }
                },
                {
                    key: "playMode",
                    value: function(t) {
                        var e = t.toLowerCase();
                        if ("restart" === e && this.buffer && this.bufferSourceNode) for(var n = 0; n < this.bufferSourceNodes.length - 1; n++){
                            var i = p1.audiocontext.currentTime;
                            this.bufferSourceNodes[n].stop(i);
                        }
                        if ("restart" !== e && "sustain" !== e && "untildone" !== e) throw 'Invalid play mode. Must be either "restart" or "sustain"';
                        this.mode = e;
                    }
                },
                {
                    key: "pause",
                    value: function(t) {
                        var e = (t || 0) + p1.audiocontext.currentTime;
                        this.isPlaying() && this.buffer && this.bufferSourceNode ? (this._paused = !0, this._playing = !1, this.pauseTime = this.currentTime(), this.bufferSourceNode.stop(e), this._counterNode.stop(e), this._pauseTime = this.currentTime()) : this._pauseTime = 0;
                    }
                },
                {
                    key: "loop",
                    value: function(t, e, n, i, r) {
                        this._looping = !0, this.play(t, e, n, i, r);
                    }
                },
                {
                    key: "setLoop",
                    value: function(t) {
                        if (!0 === t) this._looping = !0;
                        else {
                            if (!1 !== t) throw "Error: setLoop accepts either true or false";
                            this._looping = !1;
                        }
                        this.bufferSourceNode && (this.bufferSourceNode.loop = this._looping, this._counterNode.loop = this._looping);
                    }
                },
                {
                    key: "isLooping",
                    value: function() {
                        return !!this.bufferSourceNode && !0 === this._looping && !0 === this.isPlaying();
                    }
                },
                {
                    key: "isPlaying",
                    value: function() {
                        return this._playing;
                    }
                },
                {
                    key: "isPaused",
                    value: function() {
                        return this._paused;
                    }
                },
                {
                    key: "stop",
                    value: function(t) {
                        var e = t || 0;
                        if ("sustain" === this.mode || "untildone" === this.mode) this.stopAll(e), this._playing = !1, this.pauseTime = 0, this._paused = !1;
                        else if (this.buffer && this.bufferSourceNode) {
                            var n = p1.audiocontext.currentTime, i = e || 0;
                            this.pauseTime = 0, this.bufferSourceNode.stop(n + i), this._counterNode.stop(n + i), this._playing = !1, this._paused = !1;
                        }
                    }
                },
                {
                    key: "stopAll",
                    value: function(t) {
                        var e = p1.audiocontext.currentTime, n = t || 0;
                        if (this.buffer && this.bufferSourceNode) {
                            for(var i in this.bufferSourceNodes){
                                var r = this.bufferSourceNodes[i];
                                if (r) try {
                                    r.stop(e + n);
                                } catch (t) {}
                            }
                            this._counterNode.stop(e + n);
                        }
                    }
                },
                {
                    key: "getVolume",
                    value: function() {
                        return this.output.gain.value;
                    }
                },
                {
                    key: "pan",
                    value: function(t, e) {
                        this.panPosition = t, this.panner.pan(t, e);
                    }
                },
                {
                    key: "getPan",
                    value: function() {
                        return this.panPosition;
                    }
                },
                {
                    key: "rate",
                    value: function(t) {
                        var e = !1;
                        if (void 0 === t) return this.playbackRate;
                        if (0 === (this.playbackRate = t) ? t = 1e-13 : t < 0 && !this.reversed ? (t = Math.abs(t), e = !0) : 0 < t && this.reversed && (e = !0), this.bufferSourceNode) {
                            var n = p1.audiocontext.currentTime;
                            this.bufferSourceNode.playbackRate.cancelScheduledValues(n), this.bufferSourceNode.playbackRate.linearRampToValueAtTime(Math.abs(t), n), this._counterNode.playbackRate.cancelScheduledValues(n), this._counterNode.playbackRate.linearRampToValueAtTime(Math.abs(t), n);
                        }
                        return e && this.reverseBuffer(), this.playbackRate;
                    }
                },
                {
                    key: "setPitch",
                    value: function(t) {
                        var e = r19(t) / r19(60);
                        this.rate(e);
                    }
                },
                {
                    key: "getPlaybackRate",
                    value: function() {
                        return this.playbackRate;
                    }
                },
                {
                    key: "setVolume",
                    value: function(t, e, n) {
                        if ("number" == typeof t) {
                            var i = e || 0, r = n || 0, o = p1.audiocontext.currentTime, s = this.output.gain.value;
                            this.output.gain.cancelScheduledValues(o + r), this.output.gain.linearRampToValueAtTime(s, o + r), this.output.gain.linearRampToValueAtTime(t, o + r + i);
                        } else {
                            if (!t) return this.output.gain;
                            t.connect(this.output.gain);
                        }
                    }
                },
                {
                    key: "duration",
                    value: function() {
                        return this.buffer ? this.buffer.duration : 0;
                    }
                },
                {
                    key: "currentTime",
                    value: function() {
                        return this.reversed ? Math.abs(this._lastPos - this.buffer.length) / R.sampleRate : this._lastPos / R.sampleRate;
                    }
                },
                {
                    key: "jump",
                    value: function(t, e) {
                        if (t < 0 || t > this.buffer.duration) throw "jump time out of range";
                        if (e > this.buffer.duration - t) throw "end time out of range";
                        var n = t || 0, i = e || void 0;
                        this.isPlaying() && (this.stop(0), this.play(0, this.playbackRate, this.output.gain.value, n, i));
                    }
                },
                {
                    key: "channels",
                    value: function() {
                        return this.buffer.numberOfChannels;
                    }
                },
                {
                    key: "sampleRate",
                    value: function() {
                        return this.buffer.sampleRate;
                    }
                },
                {
                    key: "frames",
                    value: function() {
                        return this.buffer.length;
                    }
                },
                {
                    key: "getPeaks",
                    value: function(t) {
                        if (!this.buffer) throw "Cannot load peaks yet, buffer is not loaded";
                        if (t = t || 5 * window.width, this.buffer) {
                            for(var e = this.buffer, n = e.length / t, i = ~~(n / 10) || 1, r = e.numberOfChannels, o = new Float32Array(Math.round(t)), s = 0; s < r; s++)for(var a = e.getChannelData(s), u = 0; u < t; u++){
                                for(var c = ~~(u * n), l = ~~(c + n), h = 0, p = c; p < l; p += i){
                                    var f = a[p];
                                    h < f ? h = f : h < -f && (h = f);
                                }
                                (0 === s || Math.abs(h) > o[u]) && (o[u] = h);
                            }
                            return o;
                        }
                    }
                },
                {
                    key: "reverseBuffer",
                    value: function() {
                        if (!this.buffer) throw "SoundFile is not done loading";
                        var t = this._lastPos / R.sampleRate, e = this.getVolume();
                        this.setVolume(0, .001);
                        for(var n = this.buffer.numberOfChannels, i = 0; i < n; i++)this.buffer.getChannelData(i).reverse();
                        this.reversed = !this.reversed, this.isPlaying() && t && this.jump(this.duration() - t), this.setVolume(e, .001);
                    }
                },
                {
                    key: "onended",
                    value: function(t) {
                        return this._onended = t, this;
                    }
                },
                {
                    key: "add",
                    value: function() {}
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.audiocontext.currentTime, e = p1.soundArray.indexOf(this);
                        if (p1.soundArray.splice(e, 1), this.stop(t), this.buffer && this.bufferSourceNode) {
                            for(var n = 0; n < this.bufferSourceNodes.length - 1; n++)if (null !== this.bufferSourceNodes[n]) {
                                this.bufferSourceNodes[n].disconnect();
                                try {
                                    this.bufferSourceNodes[n].stop(t);
                                } catch (t) {}
                                this.bufferSourceNodes[n] = null;
                            }
                            if (this.isPlaying()) {
                                try {
                                    this._counterNode.stop(t);
                                } catch (t) {}
                                this._counterNode = null;
                            }
                        }
                        this.output && (this.output.disconnect(), this.output = null), this.panner && (this.panner.disconnect(), this.panner = null);
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        t ? t.hasOwnProperty("input") ? this.panner.connect(t.input) : this.panner.connect(t) : this.panner.connect(p1.input);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.panner && this.panner.disconnect();
                    }
                },
                {
                    key: "getLevel",
                    value: function() {}
                },
                {
                    key: "setPath",
                    value: function(t, e) {
                        var n = p5.prototype._checkFileFormats(t);
                        this.url = n, this.load(e);
                    }
                },
                {
                    key: "setBuffer",
                    value: function(t) {
                        var e = t.length, n = t[0].length, i = R.createBuffer(e, n, R.sampleRate);
                        t[0] instanceof Float32Array || (t[0] = new Float32Array(t[0]));
                        for(var r = 0; r < e; r++)i.getChannelData(r).set(t[r]);
                        this.buffer = i, this.panner.inputChannels(e);
                    }
                },
                {
                    key: "_initCounterNode",
                    value: function() {
                        var e54 = this, n33 = this, t75 = R.currentTime, i28 = R.createBufferSource(), r20 = y(256);
                        return n33._workletNode && (n33._workletNode.disconnect(), delete n33._workletNode), n33._workletNode = new AudioWorkletNode(R, s2.a.soundFileProcessor, {
                            processorOptions: {
                                bufferSize: r20
                            }
                        }), n33._workletNode.port.onmessage = function(t) {
                            if ("position" === t.data.name) {
                                if (0 === t.data.position) return;
                                e54._lastPos = t.data.position, e54._onTimeUpdate(n33._lastPos);
                            }
                        }, i28.buffer = function(t) {
                            for(var e = t.length, n = R.createBuffer(1, t.length, R.sampleRate), i = n.getChannelData(0), r = 0; r < e; r++)i[r] = r;
                            return n;
                        }(n33.buffer), i28.playbackRate.setValueAtTime(n33.playbackRate, t75), i28.connect(n33._workletNode), n33._workletNode.connect(p5.soundOut._silentNode), i28;
                    }
                },
                {
                    key: "_initSourceNode",
                    value: function() {
                        var t = R.createBufferSource();
                        return t.buffer = this.buffer, t.playbackRate.value = this.playbackRate, t.connect(this.output), t;
                    }
                },
                {
                    key: "processPeaks",
                    value: function(t, e, n, i) {}
                },
                {
                    key: "addCue",
                    value: function(t, e, n) {
                        var i = this._cueIDCounter++, r = new C(e, t, i, n);
                        return this._cues.push(r), i;
                    }
                },
                {
                    key: "removeCue",
                    value: function(t) {
                        for(var e = this._cues.length, n = 0; n < e; n++)if (this._cues[n].id === t) {
                            this._cues.splice(n, 1);
                            break;
                        }
                        this._cues.length;
                    }
                },
                {
                    key: "clearCues",
                    value: function() {
                        this._cues = [];
                    }
                },
                {
                    key: "_onTimeUpdate",
                    value: function(t) {
                        for(var e = t / this.buffer.sampleRate, n = this._cues.length, i = 0; i < n; i++){
                            var r = this._cues[i], o = r.time, s = r.val;
                            (this._prevUpdateTime || 0) <= o && o <= e && r.callback(s);
                        }
                        this._prevUpdateTime = e;
                    }
                },
                {
                    key: "save",
                    value: function(t) {
                        p5.prototype.saveSound(this, t, "wav");
                    }
                },
                {
                    key: "getBlob",
                    value: function() {
                        var t = a2(this.buffer);
                        return new Blob([
                            t
                        ], {
                            type: "audio/wav"
                        });
                    }
                }
            ]), o6;
        }();
        var E = q;
        function N(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var B = function() {
            function e55(t76) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e55), this.bufferSize = y(2048), this.audiocontext = p1.audiocontext, this._workletNode = new AudioWorkletNode(this.audiocontext, s2.a.amplitudeProcessor, {
                    outputChannelCount: [
                        1
                    ],
                    parameterData: {
                        smoothing: t76 || 0
                    },
                    processorOptions: {
                        normalize: !1,
                        smoothing: t76 || 0,
                        numInputChannels: 2,
                        bufferSize: this.bufferSize
                    }
                }), this._workletNode.port.onmessage = (function(t) {
                    "amplitude" === t.data.name && (this.volume = t.data.volume, this.volNorm = t.data.volNorm, this.stereoVol = t.data.stereoVol, this.stereoVolNorm = t.data.stereoVolNorm);
                }).bind(this), this.input = this._workletNode, this.output = this.audiocontext.createGain(), this.volume = 0, this.volNorm = 0, this.stereoVol = [
                    0,
                    0
                ], this.stereoVolNorm = [
                    0,
                    0
                ], this.normalize = !1, this._workletNode.connect(this.output), this.output.gain.value = 0, this.output.connect(this.audiocontext.destination), p1.meter.connect(this._workletNode), p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && N(t.prototype, e), n && N(t, n);
            }(e55, [
                {
                    key: "setInput",
                    value: function(t, e) {
                        p1.meter.disconnect(), e && (this._workletNode.parameters.get("smoothing").value = e), null == t ? p1.meter.connect(this._workletNode) : t ? (t.connect(this._workletNode), this._workletNode.disconnect(), this._workletNode.connect(this.output)) : p1.meter.connect(this._workletNode);
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        t ? t.hasOwnProperty("input") ? this.output.connect(t.input) : this.output.connect(t) : this.output.connect(this.panner.connect(p1.input));
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && this.output.disconnect();
                    }
                },
                {
                    key: "getLevel",
                    value: function(t) {
                        return void 0 !== t ? this.normalize ? this.stereoVolNorm[t] : this.stereoVol[t] : this.normalize ? this.volNorm : this.volume;
                    }
                },
                {
                    key: "toggleNormalize",
                    value: function(t) {
                        this.normalize = "boolean" == typeof t ? t : !this.normalize, this._workletNode.port.postMessage({
                            name: "toggleNormalize",
                            normalize: this.normalize
                        });
                    }
                },
                {
                    key: "smooth",
                    value: function(t) {
                        0 <= t && t < 1 && this._workletNode.port.postMessage({
                            name: "smoothing",
                            smoothing: t
                        });
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(t, 1), this.input && (this.input.disconnect(), delete this.input), this.output && (this.output.disconnect(), delete this.output), this._workletNode.disconnect(), delete this._workletNode;
                    }
                }
            ]), e55;
        }();
        function V(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var j = function() {
            function n34(t77, e56) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, n34), this.input = this.analyser = p1.audiocontext.createAnalyser(), Object.defineProperties(this, {
                    bins: {
                        get: function() {
                            return this.analyser.fftSize / 2;
                        },
                        set: function(t) {
                            this.analyser.fftSize = 2 * t;
                        },
                        configurable: !0,
                        enumerable: !0
                    },
                    smoothing: {
                        get: function() {
                            return this.analyser.smoothingTimeConstant;
                        },
                        set: function(t) {
                            this.analyser.smoothingTimeConstant = t;
                        },
                        configurable: !0,
                        enumerable: !0
                    }
                }), this.smooth(t77), this.bins = e56 || 1024, p1.fftMeter.connect(this.analyser), this.freqDomain = new Uint8Array(this.analyser.frequencyBinCount), this.timeDomain = new Uint8Array(this.analyser.frequencyBinCount), this.bass = [
                    20,
                    140
                ], this.lowMid = [
                    140,
                    400
                ], this.mid = [
                    400,
                    2600
                ], this.highMid = [
                    2600,
                    5200
                ], this.treble = [
                    5200,
                    14e3
                ], p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && V(t.prototype, e), n && V(t, n);
            }(n34, [
                {
                    key: "setInput",
                    value: function(t) {
                        t ? (t.output ? t.output.connect(this.analyser) : t.connect && t.connect(this.analyser), p1.fftMeter.disconnect()) : p1.fftMeter.connect(this.analyser);
                    }
                },
                {
                    key: "waveform",
                    value: function() {
                        for(var t78, e, n = new Array, i = 0; i < arguments.length; i++)"number" == typeof arguments[i] && (t78 = arguments[i], this.analyser.fftSize = 2 * t78), "string" == typeof arguments[i] && (e = arguments[i]);
                        if (e && !p5.prototype._isSafari()) return function(t) {
                            t.timeDomain instanceof Float32Array == !1 && (t.timeDomain = new Float32Array(t.analyser.frequencyBinCount));
                        }(this, this.timeDomain), this.analyser.getFloatTimeDomainData(this.timeDomain), this.timeDomain;
                        !function(t) {
                            t.timeDomain instanceof Uint8Array == !1 && (t.timeDomain = new Uint8Array(t.analyser.frequencyBinCount));
                        }(this, this.timeDomain), this.analyser.getByteTimeDomainData(this.timeDomain);
                        for(var r = 0; r < this.timeDomain.length; r++){
                            var o = p5.prototype.map(this.timeDomain[r], 0, 255, -1, 1);
                            n.push(o);
                        }
                        return n;
                    }
                },
                {
                    key: "analyze",
                    value: function() {
                        for(var t79, e = 0; e < arguments.length; e++)"number" == typeof arguments[e] && (this.bins = arguments[e], this.analyser.fftSize = 2 * this.bins), "string" == typeof arguments[e] && (t79 = arguments[e]);
                        return t79 && "db" === t79.toLowerCase() ? (function(t) {
                            t.freqDomain instanceof Float32Array == !1 && (t.freqDomain = new Float32Array(t.analyser.frequencyBinCount));
                        }(this), this.analyser.getFloatFrequencyData(this.freqDomain), this.freqDomain) : (function(t) {
                            t.freqDomain instanceof Uint8Array == !1 && (t.freqDomain = new Uint8Array(t.analyser.frequencyBinCount));
                        }(this, this.freqDomain), this.analyser.getByteFrequencyData(this.freqDomain), Array.apply([], this.freqDomain));
                    }
                },
                {
                    key: "getEnergy",
                    value: function(t, e) {
                        var n = p1.audiocontext.sampleRate / 2;
                        if ("bass" === t ? (t = this.bass[0], e = this.bass[1]) : "lowMid" === t ? (t = this.lowMid[0], e = this.lowMid[1]) : "mid" === t ? (t = this.mid[0], e = this.mid[1]) : "highMid" === t ? (t = this.highMid[0], e = this.highMid[1]) : "treble" === t && (t = this.treble[0], e = this.treble[1]), "number" != typeof t) throw "invalid input for getEnergy()";
                        if (e) {
                            if (t && e) {
                                if (e < t) {
                                    var i = e;
                                    e = t, t = i;
                                }
                                for(var r = Math.round(t / n * this.freqDomain.length), o = Math.round(e / n * this.freqDomain.length), s = 0, a = 0, u = r; u <= o; u++)s += this.freqDomain[u], a += 1;
                                return s / a;
                            }
                            throw "invalid input for getEnergy()";
                        }
                        var c = Math.round(t / n * this.freqDomain.length);
                        return this.freqDomain[c];
                    }
                },
                {
                    key: "getFreq",
                    value: function(t, e) {
                        return this.getEnergy(t, e);
                    }
                },
                {
                    key: "getCentroid",
                    value: function() {
                        for(var t = p1.audiocontext.sampleRate / 2, e = 0, n = 0, i = 0; i < this.freqDomain.length; i++)e += i * this.freqDomain[i], n += this.freqDomain[i];
                        var r = 0;
                        return 0 !== n && (r = e / n), r * (t / this.freqDomain.length);
                    }
                },
                {
                    key: "smooth",
                    value: function(t) {
                        return void 0 !== t && (this.smoothing = t), this.smoothing;
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(t, 1), this.analyser && (this.analyser.disconnect(), delete this.analyser);
                    }
                },
                {
                    key: "linAverages",
                    value: function(t) {
                        for(var e = t || 16, n = this.freqDomain, i = n.length, r = Math.floor(i / e), o = new Array(e), s = 0, a = 0; a < i; a++)o[s] = void 0 !== o[s] ? (o[s] + n[a]) / 2 : n[a], a % r == r - 1 && s++;
                        return o;
                    }
                },
                {
                    key: "logAverages",
                    value: function(t) {
                        for(var e = p1.audiocontext.sampleRate / 2, n = this.freqDomain, i = n.length, r = new Array(t.length), o = 0, s = 0; s < i; s++)Math.round(s * e / this.freqDomain.length) > t[o].hi && o++, r[o] = void 0 !== r[o] ? (r[o] + n[s]) / 2 : n[s];
                        return r;
                    }
                },
                {
                    key: "getOctaveBands",
                    value: function(t, e) {
                        var n = t || 3, i = e || 15.625, r = [], o = {
                            lo: i / Math.pow(2, 1 / (2 * n)),
                            ctr: i,
                            hi: i * Math.pow(2, 1 / (2 * n))
                        };
                        r.push(o);
                        for(var s = p1.audiocontext.sampleRate / 2; o.hi < s;){
                            var a = {};
                            a.lo = o.hi, a.ctr = o.ctr * Math.pow(2, 1 / n), a.hi = a.ctr * Math.pow(2, 1 / (2 * n)), r.push(a), o = a;
                        }
                        return r;
                    }
                }
            ]), n34;
        }(), M = n30(4), F = n30.n(M), D = n30(1), I = n30.n(D), U = n30(8), G = n30.n(U);
        function L(t80) {
            return (L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t80);
        }
        function z(t81, e) {
            return !e || "object" !== L(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t81) : e;
        }
        function W(t82) {
            return (W = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t82);
        }
        function Z(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && X(t, e);
        }
        function X(t83, e57) {
            return (X = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t83, e57);
        }
        function Y(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function H(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function $(t, e, n, i, r) {
            var o = t.oscillator;
            for(var s in t.mathOps)t.mathOps[s] instanceof r && (o.disconnect(), t.mathOps[s].dispose(), (n = s) < t.mathOps.length - 2 && (i = t.mathOps[s + 1]));
            return n === t.mathOps.length - 1 && t.mathOps.push(i), 0 < s && (o = t.mathOps[s - 1]), o.disconnect(), o.connect(e), e.connect(i), t.mathOps[n] = e, t;
        }
        var Q = function() {
            function r21(t, e) {
                if (Y(this, r21), "string" == typeof t) {
                    var n = e;
                    e = t, t = n;
                }
                if ("number" == typeof e) {
                    var i = e;
                    e = t, t = i;
                }
                this.started = !1, this.phaseAmount = void 0, this.oscillator = p1.audiocontext.createOscillator(), this.f = t || 440, this.oscillator.type = e || "sine", this.oscillator.frequency.setValueAtTime(this.f, p1.audiocontext.currentTime), this.output = p1.audiocontext.createGain(), this._freqMods = [], this.output.gain.value = .5, this.output.gain.setValueAtTime(.5, p1.audiocontext.currentTime), this.oscillator.connect(this.output), this.panPosition = 0, this.connection = p1.input, this.panner = new k(this.output, this.connection, 1), this.mathOps = [
                    this.output
                ], p1.soundArray.push(this), this.fade = this.amp;
            }
            return function(t, e, n) {
                e && H(t.prototype, e), n && H(t, n);
            }(r21, [
                {
                    key: "start",
                    value: function(t, e) {
                        if (this.started) {
                            var n = p1.audiocontext.currentTime;
                            this.stop(n);
                        }
                        if (!this.started) {
                            var i = e || this.f, r = this.oscillator.type;
                            for(var o in this.oscillator && (this.oscillator.disconnect(), delete this.oscillator), this.oscillator = p1.audiocontext.createOscillator(), this.oscillator.frequency.value = Math.abs(i), this.oscillator.type = r, this.oscillator.connect(this.output), t = t || 0, this.oscillator.start(t + p1.audiocontext.currentTime), this.freqNode = this.oscillator.frequency, this._freqMods)void 0 !== this._freqMods[o].connect && this._freqMods[o].connect(this.oscillator.frequency);
                            this.started = !0;
                        }
                    }
                },
                {
                    key: "stop",
                    value: function(t) {
                        if (this.started) {
                            var e = t || 0, n = p1.audiocontext.currentTime;
                            this.oscillator.stop(e + n), this.started = !1;
                        }
                    }
                },
                {
                    key: "amp",
                    value: function(t, e, n) {
                        var i = 1 < arguments.length && void 0 !== e ? e : 0, r = 2 < arguments.length && void 0 !== n ? n : 0;
                        if ("number" == typeof t) {
                            var o = p1.audiocontext.currentTime;
                            this.output.gain.linearRampToValueAtTime(t, o + r + i);
                        } else {
                            if (!t) return this.output.gain;
                            t.connect(this.output.gain);
                        }
                    }
                },
                {
                    key: "getAmp",
                    value: function() {
                        return this.output.gain.value;
                    }
                },
                {
                    key: "freq",
                    value: function(t, e, n) {
                        var i = 1 < arguments.length && void 0 !== e ? e : 0, r = 2 < arguments.length && void 0 !== n ? n : 0;
                        if ("number" != typeof t || isNaN(t)) {
                            if (!t) return this.oscillator.frequency;
                            t.output && (t = t.output), t.connect(this.oscillator.frequency), this._freqMods.push(t);
                        } else {
                            this.f = t;
                            var o = p1.audiocontext.currentTime;
                            0 === i ? this.oscillator.frequency.setValueAtTime(t, r + o) : 0 < t ? this.oscillator.frequency.exponentialRampToValueAtTime(t, r + i + o) : this.oscillator.frequency.linearRampToValueAtTime(t, r + i + o), this.phaseAmount && this.phase(this.phaseAmount);
                        }
                    }
                },
                {
                    key: "getFreq",
                    value: function() {
                        return this.oscillator.frequency.value;
                    }
                },
                {
                    key: "setType",
                    value: function(t) {
                        this.oscillator.type = t;
                    }
                },
                {
                    key: "getType",
                    value: function() {
                        return this.oscillator.type;
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        t ? t.hasOwnProperty("input") ? (this.panner.connect(t.input), this.connection = t.input) : (this.panner.connect(t), this.connection = t) : this.panner.connect(p1.input);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && this.output.disconnect(), this.panner && (this.panner.disconnect(), this.output && this.output.connect(this.panner)), this.oscMods = [];
                    }
                },
                {
                    key: "pan",
                    value: function(t, e) {
                        this.panPosition = t, this.panner.pan(t, e);
                    }
                },
                {
                    key: "getPan",
                    value: function() {
                        return this.panPosition;
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        if (p1.soundArray.splice(t, 1), this.oscillator) {
                            var e = p1.audiocontext.currentTime;
                            this.stop(e), this.disconnect(), this.panner = null, this.oscillator = null;
                        }
                        this.osc2 && this.osc2.dispose();
                    }
                },
                {
                    key: "phase",
                    value: function(t) {
                        var e = p5.prototype.map(t, 0, 1, 0, 1 / this.f), n = p1.audiocontext.currentTime;
                        this.phaseAmount = t, this.dNode || (this.dNode = p1.audiocontext.createDelay(), this.oscillator.disconnect(), this.oscillator.connect(this.dNode), this.dNode.connect(this.output)), this.dNode.delayTime.setValueAtTime(e, n);
                    }
                },
                {
                    key: "add",
                    value: function(t) {
                        var e = new F.a(t);
                        return $(this, e, this.mathOps.length - 1, this.output, F.a);
                    }
                },
                {
                    key: "mult",
                    value: function(t) {
                        var e = new I.a(t);
                        return $(this, e, this.mathOps.length - 1, this.output, I.a);
                    }
                },
                {
                    key: "scale",
                    value: function(t, e, n, i) {
                        var r, o;
                        o = 4 === arguments.length ? (r = p5.prototype.map(n, t, e, 0, 1) - .5, p5.prototype.map(i, t, e, 0, 1) - .5) : (r = t, e);
                        var s = new G.a(r, o);
                        return $(this, s, this.mathOps.length - 1, this.output, G.a);
                    }
                }
            ]), r21;
        }(), J = function() {
            function e(t) {
                return Y(this, e), z(this, W(e).call(this, t, "sine"));
            }
            return Z(e, Q), e;
        }(), K = function() {
            function e(t) {
                return Y(this, e), z(this, W(e).call(this, t, "triangle"));
            }
            return Z(e, Q), e;
        }(), tt = function() {
            function e(t) {
                return Y(this, e), z(this, W(e).call(this, t, "sawtooth"));
            }
            return Z(e, Q), e;
        }(), et = function() {
            function e(t) {
                return Y(this, e), z(this, W(e).call(this, t, "square"));
            }
            return Z(e, Q), e;
        }(), nt = Q, it = n30(7), rt = n30.n(it);
        p5.Envelope = function(t, e, n, i, r, o) {
            this.aTime = t || .1, this.aLevel = e || 1, this.dTime = n || .5, this.dLevel = i || 0, this.rTime = r || 0, this.rLevel = o || 0, this._rampHighPercentage = .98, this._rampLowPercentage = .02, this.output = p1.audiocontext.createGain(), this.control = new rt.a, this._init(), this.control.connect(this.output), this.connection = null, this.mathOps = [
                this.control
            ], this.isExponential = !1, this.sourceToClear = null, this.wasTriggered = !1, p1.soundArray.push(this);
        }, p5.Envelope.prototype._init = function() {
            var t = p1.audiocontext.currentTime;
            this.control.setTargetAtTime(1e-5, t, .001), this._setRampAD(this.aTime, this.dTime);
        }, p5.Envelope.prototype.set = function(t, e, n, i, r, o) {
            this.aTime = t, this.aLevel = e, this.dTime = n || 0, this.dLevel = i || 0, this.rTime = r || 0, this.rLevel = o || 0, this._setRampAD(t, n);
        }, p5.Envelope.prototype.setADSR = function(t, e, n, i) {
            this.aTime = t, this.dTime = e || 0, this.sPercent = n || 0, this.dLevel = void 0 !== n ? n * (this.aLevel - this.rLevel) + this.rLevel : 0, this.rTime = i || 0, this._setRampAD(t, e);
        }, p5.Envelope.prototype.setRange = function(t, e) {
            this.aLevel = t || 1, this.rLevel = e || 0;
        }, p5.Envelope.prototype._setRampAD = function(t, e) {
            this._rampAttackTime = this.checkExpInput(t), this._rampDecayTime = this.checkExpInput(e);
            var n = 1;
            n = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage)), this._rampAttackTC = t / this.checkExpInput(n), n = Math.log(1 / this._rampLowPercentage), this._rampDecayTC = e / this.checkExpInput(n);
        }, p5.Envelope.prototype.setRampPercentages = function(t, e) {
            this._rampHighPercentage = this.checkExpInput(t), this._rampLowPercentage = this.checkExpInput(e);
            var n = 1;
            n = Math.log(1 / this.checkExpInput(1 - this._rampHighPercentage)), this._rampAttackTC = this._rampAttackTime / this.checkExpInput(n), n = Math.log(1 / this._rampLowPercentage), this._rampDecayTC = this._rampDecayTime / this.checkExpInput(n);
        }, p5.Envelope.prototype.setInput = function() {
            for(var t = 0; t < arguments.length; t++)this.connect(arguments[t]);
        }, p5.Envelope.prototype.setExp = function(t) {
            this.isExponential = t;
        }, p5.Envelope.prototype.checkExpInput = function(t) {
            return t <= 0 && (t = 1e-8), t;
        }, p5.Envelope.prototype.play = function(t, e, n) {
            var i = e || 0;
            t && this.connection !== t && this.connect(t), this.triggerAttack(t, i), this.triggerRelease(t, i + this.aTime + this.dTime + ~~n);
        }, p5.Envelope.prototype.triggerAttack = function(t, e) {
            var n = p1.audiocontext.currentTime + (e || 0);
            this.lastAttack = n, this.wasTriggered = !0, t && this.connection !== t && this.connect(t);
            var i = this.control.getValueAtTime(n);
            !0 === this.isExponential ? this.control.exponentialRampToValueAtTime(this.checkExpInput(i), n) : this.control.linearRampToValueAtTime(i, n), n += this.aTime, !0 === this.isExponential ? (this.control.exponentialRampToValueAtTime(this.checkExpInput(this.aLevel), n), i = this.checkExpInput(this.control.getValueAtTime(n)), this.control.cancelScheduledValues(n), this.control.exponentialRampToValueAtTime(i, n)) : (this.control.linearRampToValueAtTime(this.aLevel, n), i = this.control.getValueAtTime(n), this.control.cancelScheduledValues(n), this.control.linearRampToValueAtTime(i, n)), n += this.dTime, !0 === this.isExponential ? (this.control.exponentialRampToValueAtTime(this.checkExpInput(this.dLevel), n), i = this.checkExpInput(this.control.getValueAtTime(n)), this.control.cancelScheduledValues(n), this.control.exponentialRampToValueAtTime(i, n)) : (this.control.linearRampToValueAtTime(this.dLevel, n), i = this.control.getValueAtTime(n), this.control.cancelScheduledValues(n), this.control.linearRampToValueAtTime(i, n));
        }, p5.Envelope.prototype.triggerRelease = function(t, e) {
            if (this.wasTriggered) {
                var n = p1.audiocontext.currentTime + (e || 0);
                t && this.connection !== t && this.connect(t);
                var i = this.control.getValueAtTime(n);
                !0 === this.isExponential ? this.control.exponentialRampToValueAtTime(this.checkExpInput(i), n) : this.control.linearRampToValueAtTime(i, n), n += this.rTime, !0 === this.isExponential ? (this.control.exponentialRampToValueAtTime(this.checkExpInput(this.rLevel), n), i = this.checkExpInput(this.control.getValueAtTime(n)), this.control.cancelScheduledValues(n), this.control.exponentialRampToValueAtTime(i, n)) : (this.control.linearRampToValueAtTime(this.rLevel, n), i = this.control.getValueAtTime(n), this.control.cancelScheduledValues(n), this.control.linearRampToValueAtTime(i, n)), this.wasTriggered = !1;
            }
        }, p5.Envelope.prototype.ramp = function(t, e, n, i) {
            var r = p1.audiocontext.currentTime + (e || 0), o = this.checkExpInput(n), s = void 0 !== i ? this.checkExpInput(i) : void 0;
            t && this.connection !== t && this.connect(t);
            var a = this.checkExpInput(this.control.getValueAtTime(r));
            a < o ? (this.control.setTargetAtTime(o, r, this._rampAttackTC), r += this._rampAttackTime) : o < a && (this.control.setTargetAtTime(o, r, this._rampDecayTC), r += this._rampDecayTime), void 0 !== s && (o < s ? this.control.setTargetAtTime(s, r, this._rampAttackTC) : s < o && this.control.setTargetAtTime(s, r, this._rampDecayTC));
        }, p5.Envelope.prototype.connect = function(t) {
            ((this.connection = t) instanceof p5.Oscillator || t instanceof p5.SoundFile || t instanceof p5.AudioIn || t instanceof p5.Reverb || t instanceof p5.Noise || t instanceof p5.Filter || t instanceof p5.Delay) && (t = t.output.gain), t instanceof AudioParam && t.setValueAtTime(0, p1.audiocontext.currentTime), this.output.connect(t);
        }, p5.Envelope.prototype.disconnect = function() {
            this.output && this.output.disconnect();
        }, p5.Envelope.prototype.add = function(t) {
            var e = new F.a(t), n = this.mathOps.length, i = this.output;
            return p5.prototype._mathChain(this, e, n, i, F.a);
        }, p5.Envelope.prototype.mult = function(t) {
            var e = new I.a(t), n = this.mathOps.length, i = this.output;
            return p5.prototype._mathChain(this, e, n, i, I.a);
        }, p5.Envelope.prototype.scale = function(t, e, n, i) {
            var r = new G.a(t, e, n, i), o = this.mathOps.length, s = this.output;
            return p5.prototype._mathChain(this, r, o, s, G.a);
        }, p5.Envelope.prototype.dispose = function() {
            var t = p1.soundArray.indexOf(this);
            p1.soundArray.splice(t, 1), this.disconnect(), this.control && (this.control.dispose(), this.control = null);
            for(var e = 1; e < this.mathOps.length; e++)this.mathOps[e].dispose();
        }, p5.Env = function(t, e, n, i, r, o) {
            p5.Envelope.call(this, t, e, n, i, r, o);
        }, p5.Env.prototype = Object.create(p5.Envelope.prototype);
        var ot = p5.Envelope;
        function st(t84) {
            return (st = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t84);
        }
        function at(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function ut(t85, e) {
            return !e || "object" !== st(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t85) : e;
        }
        function ct(t86) {
            return (ct = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t86);
        }
        function lt(t87, e58) {
            return (lt = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t87, e58);
        }
        var ht = function() {
            for(var t = 2 * p1.audiocontext.sampleRate, e = p1.audiocontext.createBuffer(1, t, p1.audiocontext.sampleRate), n = e.getChannelData(0), i = 0; i < t; i++)n[i] = 2 * Math.random() - 1;
            return e.type = "white", e;
        }(), pt = function() {
            var t, e, n, i, r, o, s, a = 2 * p1.audiocontext.sampleRate, u = p1.audiocontext.createBuffer(1, a, p1.audiocontext.sampleRate), c = u.getChannelData(0);
            t = e = n = i = r = o = s = 0;
            for(var l = 0; l < a; l++){
                var h = 2 * Math.random() - 1;
                t = .99886 * t + .0555179 * h, e = .99332 * e + .0750759 * h, n = .969 * n + .153852 * h, i = .8665 * i + .3104856 * h, r = .55 * r + .5329522 * h, o = -0.7616 * o - .016898 * h, c[l] = t + e + n + i + r + o + s + .5362 * h, c[l] *= .11, s = .115926 * h;
            }
            return u.type = "pink", u;
        }(), ft = function() {
            for(var t = 2 * p1.audiocontext.sampleRate, e = p1.audiocontext.createBuffer(1, t, p1.audiocontext.sampleRate), n = e.getChannelData(0), i = 0, r = 0; r < t; r++){
                var o = 2 * Math.random() - 1;
                n[r] = (i + .02 * o) / 1.02, i = n[r], n[r] *= 3.5;
            }
            return e.type = "brown", e;
        }(), dt = function() {
            function i(t88) {
                var e59, n;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, i), delete (e59 = ut(this, ct(i).call(this))).f, delete e59.freq, delete e59.oscillator, n = "brown" === t88 ? ft : "pink" === t88 ? pt : ht, e59.buffer = n, e59;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && lt(t, e);
            }(i, nt), function(t, e, n) {
                e && at(t.prototype, e), n && at(t, n);
            }(i, [
                {
                    key: "setType",
                    value: function(t) {
                        switch(t){
                            case "white":
                                this.buffer = ht;
                                break;
                            case "pink":
                                this.buffer = pt;
                                break;
                            case "brown":
                                this.buffer = ft;
                                break;
                            default:
                                this.buffer = ht;
                        }
                        if (this.started) {
                            var e = p1.audiocontext.currentTime;
                            this.stop(e), this.start(e + .01);
                        }
                    }
                },
                {
                    key: "getType",
                    value: function() {
                        return this.buffer.type;
                    }
                },
                {
                    key: "start",
                    value: function() {
                        this.started && this.stop(), this.noise = p1.audiocontext.createBufferSource(), this.noise.buffer = this.buffer, this.noise.loop = !0, this.noise.connect(this.output);
                        var t = p1.audiocontext.currentTime;
                        this.noise.start(t), this.started = !0;
                    }
                },
                {
                    key: "stop",
                    value: function() {
                        var t = p1.audiocontext.currentTime;
                        this.noise && (this.noise.stop(t), this.started = !1);
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.audiocontext.currentTime, e = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(e, 1), this.noise && (this.noise.disconnect(), this.stop(t)), this.output && this.output.disconnect(), this.panner && this.panner.disconnect(), this.output = null, this.panner = null, this.buffer = null, this.noise = null;
                    }
                }
            ]), i;
        }(), yt = n30(2), mt = n30.n(yt);
        function vt(t89) {
            return (vt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t89);
        }
        function _t(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function gt(t90, e) {
            return !e || "object" !== vt(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t90) : e;
        }
        function bt(t91) {
            return (bt = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t91);
        }
        function Tt(t92, e60) {
            return (Tt = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t92, e60);
        }
        function wt() {
            for(var t = p1.audiocontext, e = t.createBuffer(1, 2048, t.sampleRate), n = e.getChannelData(0), i = 0; i < 2048; i++)n[i] = 1;
            var r = t.createBufferSource();
            return r.buffer = e, r.loop = !0, r;
        }
        var xt = function() {
            function r22(t93, e61) {
                var n;
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, r22), (n = gt(this, bt(r22).call(this, t93, "sawtooth"))).w = e61 || 0, n.osc2 = new tt(t93), n.dNode = p1.audiocontext.createDelay(), n.dcOffset = wt(), n.dcGain = p1.audiocontext.createGain(), n.dcOffset.connect(n.dcGain), n.dcGain.connect(n.output), n.f = t93 || 440;
                var i = n.w / n.oscillator.frequency.value;
                return n.dNode.delayTime.value = i, n.dcGain.gain.value = 1.7 * (.5 - n.w), n.osc2.disconnect(), n.osc2.panner.disconnect(), n.osc2.amp(-1), n.osc2.output.connect(n.dNode), n.dNode.connect(n.output), n.output.gain.value = 1, n.output.connect(n.panner), n;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && Tt(t, e);
            }(r22, nt), function(t, e, n) {
                e && _t(t.prototype, e), n && _t(t, n);
            }(r22, [
                {
                    key: "width",
                    value: function(t) {
                        if ("number" == typeof t) {
                            if (t <= 1 && 0 <= t) {
                                this.w = t;
                                var e = this.w / this.oscillator.frequency.value;
                                this.dNode.delayTime.value = e;
                            }
                            this.dcGain.gain.value = 1.7 * (.5 - this.w);
                        } else {
                            t.connect(this.dNode.delayTime);
                            var n = new mt.a(-0.5);
                            t.connect(n);
                            var i = new I.a(-1), r = new I.a(1.7);
                            (n = n.connect(i).connect(r)).connect(this.dcGain.gain);
                        }
                    }
                },
                {
                    key: "start",
                    value: function(t, e) {
                        var n = p1.audiocontext.currentTime, i = e || 0;
                        if (!this.started) {
                            var r = t || this.f, o = this.oscillator.type;
                            this.oscillator = p1.audiocontext.createOscillator(), this.oscillator.frequency.setValueAtTime(r, n), this.oscillator.type = o, this.oscillator.connect(this.output), this.oscillator.start(i + n), this.osc2.oscillator = p1.audiocontext.createOscillator(), this.osc2.oscillator.frequency.setValueAtTime(r, i + n), this.osc2.oscillator.type = o, this.osc2.oscillator.connect(this.osc2.output), this.osc2.start(i + n), this.freqNode = [
                                this.oscillator.frequency,
                                this.osc2.oscillator.frequency
                            ], this.dcOffset = wt(), this.dcOffset.connect(this.dcGain), this.dcOffset.start(i + n), void 0 !== this.mods && void 0 !== this.mods.frequency && (this.mods.frequency.connect(this.freqNode[0]), this.mods.frequency.connect(this.freqNode[1])), this.started = !0, this.osc2.started = !0;
                        }
                    }
                },
                {
                    key: "stop",
                    value: function(t) {
                        if (this.started) {
                            var e = t || 0, n = p1.audiocontext.currentTime;
                            this.oscillator.stop(e + n), this.osc2.oscillator && this.osc2.oscillator.stop(e + n), this.dcOffset.stop(e + n), this.started = !1, this.osc2.started = !1;
                        }
                    }
                },
                {
                    key: "freq",
                    value: function(t, e, n) {
                        var i = 1 < arguments.length && void 0 !== e ? e : 0, r = 2 < arguments.length && void 0 !== n ? n : 0;
                        if ("number" == typeof t) {
                            this.f = t;
                            var o = p1.audiocontext.currentTime, s = this.oscillator.frequency.value;
                            this.oscillator.frequency.cancelScheduledValues(o), this.oscillator.frequency.setValueAtTime(s, o + r), this.oscillator.frequency.exponentialRampToValueAtTime(t, r + i + o), this.osc2.oscillator.frequency.cancelScheduledValues(o), this.osc2.oscillator.frequency.setValueAtTime(s, o + r), this.osc2.oscillator.frequency.exponentialRampToValueAtTime(t, r + i + o), this.freqMod && (this.freqMod.output.disconnect(), this.freqMod = null);
                        } else t.output && (t.output.disconnect(), t.output.connect(this.oscillator.frequency), t.output.connect(this.osc2.oscillator.frequency), this.freqMod = t);
                    }
                }
            ]), r22;
        }();
        function St(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        p1.inputSources = [];
        var kt = function() {
            function e62(t94) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e62), this.input = p1.audiocontext.createGain(), this.output = p1.audiocontext.createGain(), this.stream = null, this.mediaStream = null, this.currentSource = null, this.enabled = !1, this.amplitude = new B, this.output.connect(this.amplitude.input), window.MediaStreamTrack && window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia || (t94 ? t94() : window.alert("This browser does not support MediaStreamTrack and mediaDevices")), p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && St(t.prototype, e), n && St(t, n);
            }(e62, [
                {
                    key: "start",
                    value: function(e, n) {
                        var i = this;
                        this.stream && this.stop();
                        var t95 = p1.inputSources[i.currentSource], r = {
                            audio: {
                                sampleRate: p1.audiocontext.sampleRate,
                                echoCancellation: !1
                            }
                        };
                        p1.inputSources[this.currentSource] && (r.audio.deviceId = t95.deviceId), window.navigator.mediaDevices.getUserMedia(r).then(function(t) {
                            i.stream = t, i.enabled = !0, i.mediaStream = p1.audiocontext.createMediaStreamSource(t), i.mediaStream.connect(i.output), i.amplitude.setInput(i.output), e && e();
                        }).catch(function(t) {
                            n && n(t);
                        });
                    }
                },
                {
                    key: "stop",
                    value: function() {
                        this.stream && (this.stream.getTracks().forEach(function(t) {
                            t.stop();
                        }), this.mediaStream.disconnect(), delete this.mediaStream, delete this.stream);
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        t ? t.hasOwnProperty("input") ? this.output.connect(t.input) : t.hasOwnProperty("analyser") ? this.output.connect(t.analyser) : this.output.connect(t) : this.output.connect(p1.input);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && (this.output.disconnect(), this.output.connect(this.amplitude.input));
                    }
                },
                {
                    key: "getLevel",
                    value: function(t) {
                        return t && (this.amplitude.smoothing = t), this.amplitude.getLevel();
                    }
                },
                {
                    key: "amp",
                    value: function(t, e) {
                        if (e) {
                            var n = e || 0, i = this.output.gain.value;
                            this.output.gain.cancelScheduledValues(p1.audiocontext.currentTime), this.output.gain.setValueAtTime(i, p1.audiocontext.currentTime), this.output.gain.linearRampToValueAtTime(t, n + p1.audiocontext.currentTime);
                        } else this.output.gain.cancelScheduledValues(p1.audiocontext.currentTime), this.output.gain.setValueAtTime(t, p1.audiocontext.currentTime);
                    }
                },
                {
                    key: "getSources",
                    value: function(i, r) {
                        return new Promise(function(e, n) {
                            window.navigator.mediaDevices.enumerateDevices().then(function(t96) {
                                p1.inputSources = t96.filter(function(t) {
                                    return "audioinput" === t.kind;
                                }), e(p1.inputSources), i && i(p1.inputSources);
                            }).catch(function(t) {
                                n(t), r && r(t);
                            });
                        });
                    }
                },
                {
                    key: "setSource",
                    value: function(t) {
                        0 < p1.inputSources.length && t < p1.inputSources.length && (this.currentSource = t), this.stream && this.stream.active && this.start();
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(t, 1), this.stop(), this.output && this.output.disconnect(), this.amplitude && this.amplitude.disconnect(), delete this.amplitude, delete this.output;
                    }
                }
            ]), e62;
        }(), Pt = n30(23), At = n30.n(Pt);
        function Ot(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var Ct = function() {
            function t97() {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, t97), this.ac = p1.audiocontext, this.input = this.ac.createGain(), this.output = this.ac.createGain(), this._drywet = new At.a(1), this.wet = this.ac.createGain(), this.input.connect(this._drywet.a), this.wet.connect(this._drywet.b), this._drywet.connect(this.output), this.connect(), p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && Ot(t.prototype, e), n && Ot(t, n);
            }(t97, [
                {
                    key: "amp",
                    value: function(t, e, n) {
                        var i = 1 < arguments.length && void 0 !== e ? e : 0, r = 2 < arguments.length && void 0 !== n ? n : 0, o = p1.audiocontext.currentTime, s = o + r, a = s + i + .001, u = this.output.gain.value;
                        this.output.gain.cancelScheduledValues(o), this.output.gain.linearRampToValueAtTime(u, s + .001), this.output.gain.linearRampToValueAtTime(t, a);
                    }
                },
                {
                    key: "chain",
                    value: function(t) {
                        if (0 < arguments.length) {
                            this.connect(t);
                            for(var e = 1; e < arguments.length; e += 1)arguments[e - 1].connect(arguments[e]);
                        }
                        return this;
                    }
                },
                {
                    key: "drywet",
                    value: function(t) {
                        return void 0 !== t && (this._drywet.fade.value = t), this._drywet.fade.value;
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        var e = t || p5.soundOut.input;
                        this.output.connect(e.input ? e.input : e);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && this.output.disconnect();
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(t, 1), this.input && (this.input.disconnect(), delete this.input), this.output && (this.output.disconnect(), delete this.output), this._drywet && (this._drywet.disconnect(), delete this._drywet), this.wet && (this.wet.disconnect(), delete this.wet), this.ac = void 0;
                    }
                }
            ]), t97;
        }();
        function Rt(t98) {
            return (Rt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t98);
        }
        function qt(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function Et(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function Nt(t99, e) {
            return !e || "object" !== Rt(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t99) : e;
        }
        function Bt(t100, e63, n35) {
            return (Bt = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t101, e64, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Vt(t)););
                    return t;
                }(t101, e64);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e64);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t100, e63, n35 || t100);
        }
        function Vt(t102) {
            return (Vt = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t102);
        }
        function jt(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && Mt(t, e);
        }
        function Mt(t103, e65) {
            return (Mt = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t103, e65);
        }
        var Ft = function() {
            function n36(t) {
                var e;
                return qt(this, n36), (e = Nt(this, Vt(n36).call(this))).biquad = e.ac.createBiquadFilter(), e.input.connect(e.biquad), e.biquad.connect(e.wet), t && e.setType(t), e._on = !0, e._untoggledType = e.biquad.type, e;
            }
            return jt(n36, Ct), function(t, e, n) {
                e && Et(t.prototype, e), n && Et(t, n);
            }(n36, [
                {
                    key: "process",
                    value: function(t, e, n, i) {
                        t.connect(this.input), this.set(e, n, i);
                    }
                },
                {
                    key: "set",
                    value: function(t, e, n) {
                        t && this.freq(t, n), e && this.res(e, n);
                    }
                },
                {
                    key: "freq",
                    value: function(t, e) {
                        var n = e || 0;
                        return t <= 0 && (t = 1), "number" == typeof t ? (this.biquad.frequency.cancelScheduledValues(this.ac.currentTime + .01 + n), this.biquad.frequency.exponentialRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.biquad.frequency), this.biquad.frequency.value;
                    }
                },
                {
                    key: "res",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.biquad.Q.value = t, this.biquad.Q.cancelScheduledValues(this.ac.currentTime + .01 + n), this.biquad.Q.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.biquad.Q), this.biquad.Q.value;
                    }
                },
                {
                    key: "gain",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.biquad.gain.value = t, this.biquad.gain.cancelScheduledValues(this.ac.currentTime + .01 + n), this.biquad.gain.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.biquad.gain), this.biquad.gain.value;
                    }
                },
                {
                    key: "toggle",
                    value: function() {
                        return this._on = !this._on, !0 === this._on ? this.biquad.type = this._untoggledType : !1 === this._on && (this.biquad.type = "allpass"), this._on;
                    }
                },
                {
                    key: "setType",
                    value: function(t) {
                        this.biquad.type = t, this._untoggledType = this.biquad.type;
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        Bt(Vt(n36.prototype), "dispose", this).call(this), this.biquad && (this.biquad.disconnect(), delete this.biquad);
                    }
                }
            ]), n36;
        }(), Dt = function() {
            function t() {
                return qt(this, t), Nt(this, Vt(t).call(this, "lowpass"));
            }
            return jt(t, Ft), t;
        }(), It = function() {
            function t() {
                return qt(this, t), Nt(this, Vt(t).call(this, "highpass"));
            }
            return jt(t, Ft), t;
        }(), Ut = function() {
            function t() {
                return qt(this, t), Nt(this, Vt(t).call(this, "bandpass"));
            }
            return jt(t, Ft), t;
        }(), Gt = Ft;
        function Lt(t104) {
            return (Lt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t104);
        }
        function zt(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function Wt(t105, e) {
            return !e || "object" !== Lt(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t105) : e;
        }
        function Zt(t106) {
            return (Zt = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t106);
        }
        function Xt(t107, e66) {
            return (Xt = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t107, e66);
        }
        var Yt = function() {
            function i(t108, e67) {
                var n;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, i), (n = Wt(this, Zt(i).call(this, "peaking"))).disconnect(), n.set(t108, e67), n.biquad.gain.value = 0, delete n.input, delete n.output, delete n._drywet, delete n.wet, n;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && Xt(t, e);
            }(i, Gt), function(t, e, n) {
                e && zt(t.prototype, e), n && zt(t, n);
            }(i, [
                {
                    key: "amp",
                    value: function() {}
                },
                {
                    key: "drywet",
                    value: function() {}
                },
                {
                    key: "connect",
                    value: function(t) {
                        var e = t || p5.soundOut.input;
                        this.biquad ? this.biquad.connect(e.input ? e.input : e) : this.output.connect(e.input ? e.input : e);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.biquad && this.biquad.disconnect();
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(t, 1), this.disconnect(), delete this.biquad;
                    }
                }
            ]), i;
        }();
        function Ht(t109) {
            return (Ht = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t109);
        }
        function $t(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function Qt(t110, e) {
            return !e || "object" !== Ht(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t110) : e;
        }
        function Jt(t111, e68, n37) {
            return (Jt = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t112, e69, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Kt(t)););
                    return t;
                }(t112, e69);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e69);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t111, e68, n37 || t111);
        }
        function Kt(t113) {
            return (Kt = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t113);
        }
        function te(t114, e70) {
            return (te = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t114, e70);
        }
        var ee = function() {
            function s(t115) {
                var e71, n, i, r;
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, s), e71 = Qt(this, Kt(s).call(this)), n = 3 === (t115 = 3 === t115 || 8 === t115 ? t115 : 3) ? Math.pow(2, 3) : 2, e71.bands = [];
                for(var o = 0; o < t115; o++)r = o === t115 - 1 ? (i = 21e3, .01) : 0 === o ? (i = 100, .1) : (i = 1 === o ? 3 === t115 ? 360 * n : 360 : e71.bands[o - 1].freq() * n, 1), e71.bands[o] = e71._newBand(i, r), 0 < o ? e71.bands[o - 1].connect(e71.bands[o].biquad) : e71.input.connect(e71.bands[o].biquad);
                return e71.bands[t115 - 1].connect(e71.output), e71;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && te(t, e);
            }(s, Ct), function(t, e, n) {
                e && $t(t.prototype, e), n && $t(t, n);
            }(s, [
                {
                    key: "process",
                    value: function(t) {
                        t.connect(this.input);
                    }
                },
                {
                    key: "set",
                    value: function() {
                        if (arguments.length === 2 * this.bands.length) for(var t = 0; t < arguments.length; t += 2)this.bands[t / 2].freq(arguments[t]), this.bands[t / 2].gain(arguments[t + 1]);
                    }
                },
                {
                    key: "_newBand",
                    value: function(t, e) {
                        return new Yt(t, e);
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        if (Jt(Kt(s.prototype), "dispose", this).call(this), this.bands) {
                            for(; 0 < this.bands.length;)this.bands.pop().dispose();
                            delete this.bands;
                        }
                    }
                }
            ]), s;
        }();
        function ne(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var ie = function() {
            function e72(t116) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e72), this.ac = p1.audiocontext, this.listener = this.ac.listener;
            }
            return function(t, e, n) {
                e && ne(t.prototype, e), n && ne(t, n);
            }(e72, [
                {
                    key: "process",
                    value: function(t) {
                        t.connect(this.input);
                    }
                },
                {
                    key: "position",
                    value: function(t, e, n, i) {
                        return this.positionX(t, i), this.positionY(e, i), this.positionZ(n, i), [
                            this.listener.positionX.value,
                            this.listener.positionY.value,
                            this.listener.positionZ.value
                        ];
                    }
                },
                {
                    key: "positionX",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.positionX.value = t, this.listener.positionX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.positionX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.positionX), this.listener.positionX.value;
                    }
                },
                {
                    key: "positionY",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.positionY.value = t, this.listener.positionY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.positionY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.positionY), this.listener.positionY.value;
                    }
                },
                {
                    key: "positionZ",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.positionZ.value = t, this.listener.positionZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.positionZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.positionZ), this.listener.positionZ.value;
                    }
                },
                {
                    key: "orient",
                    value: function(t, e, n, i, r, o, s) {
                        return 3 === arguments.length || 4 === arguments.length ? (s = i, this.orientForward(t, e, n, s)) : 6 !== arguments.length && 7 !== arguments || (this.orientForward(t, e, n), this.orientUp(i, r, o, s)), [
                            this.listener.forwardX.value,
                            this.listener.forwardY.value,
                            this.listener.forwardZ.value,
                            this.listener.upX.value,
                            this.listener.upY.value,
                            this.listener.upZ.value
                        ];
                    }
                },
                {
                    key: "orientForward",
                    value: function(t, e, n, i) {
                        return this.forwardX(t, i), this.forwardY(e, i), this.forwardZ(n, i), [
                            this.listener.forwardX,
                            this.listener.forwardY,
                            this.listener.forwardZ
                        ];
                    }
                },
                {
                    key: "orientUp",
                    value: function(t, e, n, i) {
                        return this.upX(t, i), this.upY(e, i), this.upZ(n, i), [
                            this.listener.upX,
                            this.listener.upY,
                            this.listener.upZ
                        ];
                    }
                },
                {
                    key: "forwardX",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.forwardX.value = t, this.listener.forwardX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.forwardX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.forwardX), this.listener.forwardX.value;
                    }
                },
                {
                    key: "forwardY",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.forwardY.value = t, this.listener.forwardY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.forwardY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.forwardY), this.listener.forwardY.value;
                    }
                },
                {
                    key: "forwardZ",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.forwardZ.value = t, this.listener.forwardZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.forwardZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.forwardZ), this.listener.forwardZ.value;
                    }
                },
                {
                    key: "upX",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.upX.value = t, this.listener.upX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.upX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.upX), this.listener.upX.value;
                    }
                },
                {
                    key: "upY",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.upY.value = t, this.listener.upY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.upY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.upY), this.listener.upY.value;
                    }
                },
                {
                    key: "upZ",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.listener.upZ.value = t, this.listener.upZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.listener.upZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.listener.upZ), this.listener.upZ.value;
                    }
                }
            ]), e72;
        }();
        function re(t117) {
            return (re = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t117);
        }
        function oe(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function se(t118, e) {
            return !e || "object" !== re(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t118) : e;
        }
        function ae(t119, e73, n38) {
            return (ae = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t120, e74, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = ue(t)););
                    return t;
                }(t120, e74);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e74);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t119, e73, n38 || t119);
        }
        function ue(t121) {
            return (ue = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t121);
        }
        function ce(t122, e75) {
            return (ce = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t122, e75);
        }
        var le = function() {
            function e76() {
                var t123;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e76), (t123 = se(this, ue(e76).call(this))).panner = t123.ac.createPanner(), t123.panner.panningModel = "HRTF", t123.panner.distanceModel = "linear", t123.panner.connect(t123.output), t123.input.connect(t123.panner), t123;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && ce(t, e);
            }(e76, Ct), function(t, e, n) {
                e && oe(t.prototype, e), n && oe(t, n);
            }(e76, [
                {
                    key: "process",
                    value: function(t) {
                        t.connect(this.input);
                    }
                },
                {
                    key: "set",
                    value: function(t, e, n, i) {
                        return this.positionX(t, i), this.positionY(e, i), this.positionZ(n, i), [
                            this.panner.positionX.value,
                            this.panner.positionY.value,
                            this.panner.positionZ.value
                        ];
                    }
                },
                {
                    key: "positionX",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.panner.positionX.value = t, this.panner.positionX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.positionX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.positionX), this.panner.positionX.value;
                    }
                },
                {
                    key: "positionY",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.panner.positionY.value = t, this.panner.positionY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.positionY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.positionY), this.panner.positionY.value;
                    }
                },
                {
                    key: "positionZ",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.panner.positionZ.value = t, this.panner.positionZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.positionZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.positionZ), this.panner.positionZ.value;
                    }
                },
                {
                    key: "orient",
                    value: function(t, e, n, i) {
                        return this.orientX(t, i), this.orientY(e, i), this.orientZ(n, i), [
                            this.panner.orientationX.value,
                            this.panner.orientationY.value,
                            this.panner.orientationZ.value
                        ];
                    }
                },
                {
                    key: "orientX",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.panner.orientationX.value = t, this.panner.orientationX.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.orientationX.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.orientationX), this.panner.orientationX.value;
                    }
                },
                {
                    key: "orientY",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.panner.orientationY.value = t, this.panner.orientationY.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.orientationY.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.orientationY), this.panner.orientationY.value;
                    }
                },
                {
                    key: "orientZ",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.panner.orientationZ.value = t, this.panner.orientationZ.cancelScheduledValues(this.ac.currentTime + .01 + n), this.panner.orientationZ.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : t && t.connect(this.panner.orientationZ), this.panner.orientationZ.value;
                    }
                },
                {
                    key: "setFalloff",
                    value: function(t, e) {
                        this.maxDist(t), this.rolloff(e);
                    }
                },
                {
                    key: "maxDist",
                    value: function(t) {
                        return "number" == typeof t && (this.panner.maxDistance = t), this.panner.maxDistance;
                    }
                },
                {
                    key: "rolloff",
                    value: function(t) {
                        return "number" == typeof t && (this.panner.rolloffFactor = t), this.panner.rolloffFactor;
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        ae(ue(e76.prototype), "dispose", this).call(this), this.panner && (this.panner.disconnect(), delete this.panner);
                    }
                }
            ]), e76;
        }();
        function he(t124) {
            return (he = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t124);
        }
        function pe(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function fe(t125, e) {
            return !e || "object" !== he(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t125) : e;
        }
        function de(t126, e77, n39) {
            return (de = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t127, e78, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = ye(t)););
                    return t;
                }(t127, e78);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e78);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t126, e77, n39 || t126);
        }
        function ye(t128) {
            return (ye = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t128);
        }
        function me(t129, e79) {
            return (me = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t129, e79);
        }
        var ve = function() {
            function e80() {
                var t130;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e80), (t130 = fe(this, ye(e80).call(this)))._split = t130.ac.createChannelSplitter(2), t130._merge = t130.ac.createChannelMerger(2), t130._leftGain = t130.ac.createGain(), t130._rightGain = t130.ac.createGain(), t130.leftDelay = t130.ac.createDelay(), t130.rightDelay = t130.ac.createDelay(), t130._leftFilter = new Gt, t130._rightFilter = new Gt, t130._leftFilter.disconnect(), t130._rightFilter.disconnect(), t130._leftFilter.biquad.frequency.setValueAtTime(1200, t130.ac.currentTime), t130._rightFilter.biquad.frequency.setValueAtTime(1200, t130.ac.currentTime), t130._leftFilter.biquad.Q.setValueAtTime(.3, t130.ac.currentTime), t130._rightFilter.biquad.Q.setValueAtTime(.3, t130.ac.currentTime), t130.input.connect(t130._split), t130.leftDelay.connect(t130._leftGain), t130.rightDelay.connect(t130._rightGain), t130._leftGain.connect(t130._leftFilter.input), t130._rightGain.connect(t130._rightFilter.input), t130._merge.connect(t130.wet), t130._leftFilter.biquad.gain.setValueAtTime(1, t130.ac.currentTime), t130._rightFilter.biquad.gain.setValueAtTime(1, t130.ac.currentTime), t130.setType(0), t130._maxDelay = t130.leftDelay.delayTime.maxValue, t130.feedback(.5), t130;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && me(t, e);
            }(e80, Ct), function(t, e, n) {
                e && pe(t.prototype, e), n && pe(t, n);
            }(e80, [
                {
                    key: "process",
                    value: function(t, e, n, i) {
                        var r = n || 0, o = e || 0;
                        if (1 <= r) throw new Error("Feedback value will force a positive feedback loop.");
                        if (o >= this._maxDelay) throw new Error("Delay Time exceeds maximum delay time of " + this._maxDelay + " second.");
                        t.connect(this.input), this.leftDelay.delayTime.setValueAtTime(o, this.ac.currentTime), this.rightDelay.delayTime.setValueAtTime(o, this.ac.currentTime), this._leftGain.gain.value = r, this._rightGain.gain.value = r, i && (this._leftFilter.freq(i), this._rightFilter.freq(i));
                    }
                },
                {
                    key: "delayTime",
                    value: function(t) {
                        "number" != typeof t ? (t.connect(this.leftDelay.delayTime), t.connect(this.rightDelay.delayTime)) : (this.leftDelay.delayTime.cancelScheduledValues(this.ac.currentTime), this.rightDelay.delayTime.cancelScheduledValues(this.ac.currentTime), this.leftDelay.delayTime.linearRampToValueAtTime(t, this.ac.currentTime), this.rightDelay.delayTime.linearRampToValueAtTime(t, this.ac.currentTime));
                    }
                },
                {
                    key: "feedback",
                    value: function(t) {
                        if (t && "number" != typeof t) t.connect(this._leftGain.gain), t.connect(this._rightGain.gain);
                        else {
                            if (1 <= t) throw new Error("Feedback value will force a positive feedback loop.");
                            "number" == typeof t && (this._leftGain.gain.value = t, this._rightGain.gain.value = t);
                        }
                        return this._leftGain.gain.value;
                    }
                },
                {
                    key: "filter",
                    value: function(t, e) {
                        this._leftFilter.set(t, e), this._rightFilter.set(t, e);
                    }
                },
                {
                    key: "setType",
                    value: function(t) {
                        switch(1 === t && (t = "pingPong"), this._split.disconnect(), this._leftFilter.disconnect(), this._rightFilter.disconnect(), this._split.connect(this.leftDelay, 0), this._split.connect(this.rightDelay, 1), t){
                            case "pingPong":
                                this._rightFilter.setType(this._leftFilter.biquad.type), this._leftFilter.output.connect(this._merge, 0, 0), this._rightFilter.output.connect(this._merge, 0, 1), this._leftFilter.output.connect(this.rightDelay), this._rightFilter.output.connect(this.leftDelay);
                                break;
                            default:
                                this._leftFilter.output.connect(this._merge, 0, 0), this._rightFilter.output.connect(this._merge, 0, 1), this._leftFilter.output.connect(this.leftDelay), this._rightFilter.output.connect(this.rightDelay);
                        }
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        de(ye(e80.prototype), "dispose", this).call(this), this._split.disconnect(), this._leftFilter.dispose(), this._rightFilter.dispose(), this._merge.disconnect(), this._leftGain.disconnect(), this._rightGain.disconnect(), this.leftDelay.disconnect(), this.rightDelay.disconnect(), this._split = void 0, this._leftFilter = void 0, this._rightFilter = void 0, this._merge = void 0, this._leftGain = void 0, this._rightGain = void 0, this.leftDelay = void 0, this.rightDelay = void 0;
                    }
                }
            ]), e80;
        }();
        function _e(t131) {
            return (_e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t131);
        }
        function ge(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function be(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function Te(t, e, n) {
            return e && be(t.prototype, e), n && be(t, n), t;
        }
        function we(t132, e) {
            return !e || "object" !== _e(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t132) : e;
        }
        function xe(t133, e81, n40) {
            return (xe = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t134, e82, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Se(t)););
                    return t;
                }(t134, e82);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e82);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t133, e81, n40 || t133);
        }
        function Se(t135) {
            return (Se = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t135);
        }
        function ke(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), e && Pe(t, e);
        }
        function Pe(t136, e83) {
            return (Pe = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t136, e83);
        }
        var Ae = function() {
            function e84() {
                var t;
                return ge(this, e84), (t = we(this, Se(e84).call(this)))._initConvolverNode(), t.input.gain.value = .5, t._seconds = 3, t._decay = 2, t._reverse = !1, t._buildImpulse(), t;
            }
            return ke(e84, Ct), Te(e84, [
                {
                    key: "_initConvolverNode",
                    value: function() {
                        this.convolverNode = this.ac.createConvolver(), this.input.connect(this.convolverNode), this.convolverNode.connect(this.wet);
                    }
                },
                {
                    key: "_teardownConvolverNode",
                    value: function() {
                        this.convolverNode && (this.convolverNode.disconnect(), delete this.convolverNode);
                    }
                },
                {
                    key: "_setBuffer",
                    value: function(t) {
                        this._teardownConvolverNode(), this._initConvolverNode(), this.convolverNode.buffer = t;
                    }
                },
                {
                    key: "process",
                    value: function(t, e, n, i) {
                        t.connect(this.input);
                        var r = !1;
                        e && (this._seconds = e, r = !0), n && (this._decay = n), i && (this._reverse = i), r && this._buildImpulse();
                    }
                },
                {
                    key: "set",
                    value: function(t, e, n) {
                        var i = !1;
                        t && (this._seconds = t, i = !0), e && (this._decay = e), n && (this._reverse = n), i && this._buildImpulse();
                    }
                },
                {
                    key: "_buildImpulse",
                    value: function() {
                        var t, e, n = this.ac.sampleRate, i = n * this._seconds, r = this._decay, o = this.ac.createBuffer(2, i, n), s = o.getChannelData(0), a = o.getChannelData(1);
                        for(e = 0; e < i; e++)t = this._reverse ? i - e : e, s[e] = (2 * Math.random() - 1) * Math.pow(1 - t / i, r), a[e] = (2 * Math.random() - 1) * Math.pow(1 - t / i, r);
                        this._setBuffer(o);
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        xe(Se(e84.prototype), "dispose", this).call(this), this._teardownConvolverNode();
                    }
                }
            ]), e84;
        }(), Oe = function() {
            function r23(t, e, n) {
                var i;
                return ge(this, r23), (i = we(this, Se(r23).call(this)))._initConvolverNode(), i.input.gain.value = .5, t ? (i.impulses = [], i._loadBuffer(t, e, n)) : (i._seconds = 3, i._decay = 2, i._reverse = !1, i._buildImpulse()), i.impulses = [], i.set = null, i;
            }
            return ke(r23, Ae), Te(r23, [
                {
                    key: "_loadBuffer",
                    value: function(t137, i, n41) {
                        var r = p5.prototype._checkFileFormats(t137), o = this, s = (new Error).stack, a = Object(c1.b)(), u = new XMLHttpRequest;
                        u.open("GET", r, !0), u.responseType = "arraybuffer", u.onload = function() {
                            if (200 === u.status) a.decodeAudioData(u.response, function(t) {
                                var e = {}, n = r.split("/");
                                e.name = n[n.length - 1], e.audioBuffer = t, o.impulses.push(e), o._setBuffer(e.audioBuffer), i && i(e);
                            }, function() {
                                var t = new m("decodeAudioData", s, o.url), e = "AudioContext error at decodeAudioData for " + o.url;
                                n41 && (t.msg = e, n41(t));
                            });
                            else {
                                var t138 = new m("loadConvolver", s, o.url), e85 = "Unable to load " + o.url + ". The request status was: " + u.status + " (" + u.statusText + ")";
                                n41 && (t138.message = e85, n41(t138));
                            }
                        }, u.onerror = function() {
                            var t = new m("loadConvolver", s, o.url), e = "There was no response from the server at " + o.url + ". Check the url and internet connectivity.";
                            n41 && (t.message = e, n41(t));
                        }, u.send();
                    }
                },
                {
                    key: "process",
                    value: function(t) {
                        t.connect(this.input);
                    }
                },
                {
                    key: "addImpulse",
                    value: function(t, e, n) {
                        -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS"), this._loadBuffer(t, e, n);
                    }
                },
                {
                    key: "resetImpulse",
                    value: function(t, e, n) {
                        -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS"), this.impulses = [], this._loadBuffer(t, e, n);
                    }
                },
                {
                    key: "toggleImpulse",
                    value: function(t) {
                        if ("number" == typeof t && t < this.impulses.length && this._setBuffer(this.impulses[t].audioBuffer), "string" == typeof t) {
                            for(var e = 0; e < this.impulses.length; e++)if (this.impulses[e].name === t) {
                                this._setBuffer(this.impulses[e].audioBuffer);
                                break;
                            }
                        }
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        for(var t in xe(Se(r23.prototype), "dispose", this).call(this), this.impulses)this.impulses[t] && (this.impulses[t] = null);
                    }
                }
            ]), r23;
        }();
        var Ce = n30(11), Re = n30.n(Ce);
        function qe(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var Ee = function() {
            function t139() {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, t139), this.clock = new Re.a({
                    callback: this.ontick.bind(this)
                }), this.syncedParts = [], this.bpm = 120, this._init(), this.prevTick = 0, this.tatumTime = 0, this.tickCallback = function() {};
            }
            return function(t, e, n) {
                e && qe(t.prototype, e), n && qe(t, n);
            }(t139, [
                {
                    key: "ontick",
                    value: function(t140) {
                        var e86 = t140 - this.prevTick, i = t140 - p1.audiocontext.currentTime;
                        if (!(e86 - this.tatumTime <= -0.02)) {
                            this.prevTick = t140;
                            var r = this;
                            this.syncedParts.forEach(function(t141) {
                                t141.isPlaying && (t141.incrementStep(i), t141.phrases.forEach(function(t) {
                                    var e = t.sequence, n = r.metroTicks % e.length;
                                    0 !== e[n] && (r.metroTicks < e.length || !t.looping) && t.callback(i, e[n]);
                                }));
                            }), this.metroTicks += 1, this.tickCallback(i);
                        }
                    }
                },
                {
                    key: "setBPM",
                    value: function(t, e) {
                        var n = 1 < arguments.length && void 0 !== e ? e : 0, i = 60 / (t * this.tatums), r = p1.audiocontext.currentTime;
                        this.tatumTime = i, this.clock.frequency.setValueAtTime(this.clock.frequency.value, r), this.clock.frequency.linearRampToValueAtTime(t, r + n), this.bpm = t;
                    }
                },
                {
                    key: "getBPM",
                    value: function() {
                        return this.clock.getRate() / this.tatums * 60;
                    }
                },
                {
                    key: "_init",
                    value: function() {
                        this.metroTicks = 0;
                    }
                },
                {
                    key: "resetSync",
                    value: function(t) {
                        this.syncedParts = [
                            t
                        ];
                    }
                },
                {
                    key: "pushSync",
                    value: function(t) {
                        this.syncedParts.push(t);
                    }
                },
                {
                    key: "start",
                    value: function(t) {
                        var e = t || 0, n = p1.audiocontext.currentTime;
                        this.clock.start(n + e), this.setBPM(this.bpm);
                    }
                },
                {
                    key: "stop",
                    value: function(t) {
                        var e = t || 0, n = p1.audiocontext.currentTime;
                        this.clock.stop(n + e);
                    }
                },
                {
                    key: "beatLength",
                    value: function(t) {
                        this.tatums = 1 / t / 4;
                    }
                }
            ]), t139;
        }();
        function Ne(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function Be(t, e, n) {
            return e && Ne(t.prototype, e), n && Ne(t, n), t;
        }
        function Ve(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        var je = 120;
        p5.prototype.setBPM = function(t, e) {
            for(var n in je = t, p1.parts)p1.parts[n] && p1.parts[n].setBPM(t, e);
        };
        function Me(t, e, n) {
            Ve(this, Me), this.phraseStep = 0, this.name = t, this.callback = e, this.sequence = n;
        }
        var Fe = function() {
            function n42(t, e) {
                Ve(this, n42), this.length = t || 0, this.partStep = 0, this.phrases = [], this.isPlaying = !1, this.noLoop(), this.tatums = e || .0625, this.metro = new Ee, this.metro._init(), this.metro.beatLength(this.tatums), this.metro.setBPM(je), p1.parts.push(this), this.callback = function() {};
            }
            return Be(n42, [
                {
                    key: "setBPM",
                    value: function(t, e) {
                        this.metro.setBPM(t, e);
                    }
                },
                {
                    key: "getBPM",
                    value: function() {
                        return this.metro.getBPM();
                    }
                },
                {
                    key: "start",
                    value: function(t) {
                        if (!this.isPlaying) {
                            this.isPlaying = !0, this.metro.resetSync(this);
                            var e = t || 0;
                            this.metro.start(e);
                        }
                    }
                },
                {
                    key: "loop",
                    value: function(t) {
                        this.looping = !0, this.onended = function() {
                            this.partStep = 0;
                        };
                        var e = t || 0;
                        this.start(e);
                    }
                },
                {
                    key: "noLoop",
                    value: function() {
                        this.looping = !1, this.onended = function() {
                            this.stop();
                        };
                    }
                },
                {
                    key: "stop",
                    value: function(t) {
                        this.partStep = 0, this.pause(t);
                    }
                },
                {
                    key: "pause",
                    value: function(t) {
                        this.isPlaying = !1;
                        var e = t || 0;
                        this.metro.stop(e);
                    }
                },
                {
                    key: "addPhrase",
                    value: function(t, e, n) {
                        var i;
                        if (3 === arguments.length) i = new Me(t, e, n);
                        else {
                            if (!(t instanceof Me)) throw "invalid input. addPhrase accepts name, callback, array or a p5.Phrase";
                            i = t;
                        }
                        this.phrases.push(i), i.sequence.length > this.length && (this.length = i.sequence.length);
                    }
                },
                {
                    key: "removePhrase",
                    value: function(t) {
                        for(var e in this.phrases)this.phrases[e].name === t && this.phrases.splice(e, 1);
                    }
                },
                {
                    key: "getPhrase",
                    value: function(t) {
                        for(var e in this.phrases)if (this.phrases[e].name === t) return this.phrases[e];
                    }
                },
                {
                    key: "replaceSequence",
                    value: function(t, e) {
                        for(var n in this.phrases)this.phrases[n].name === t && (this.phrases[n].sequence = e);
                    }
                },
                {
                    key: "incrementStep",
                    value: function(t) {
                        this.partStep < this.length - 1 ? (this.callback(t), this.partStep += 1) : this.looping || this.partStep !== this.length - 1 || this.onended();
                    }
                },
                {
                    key: "onStep",
                    value: function(t) {
                        this.callback = t;
                    }
                }
            ]), n42;
        }(), De = function() {
            function n43() {
                Ve(this, n43), this.parts = [], this.currentPart = new Array(arguments.length);
                var t = this;
                for(var e in arguments)this.parts[e] = arguments[e], this.parts[e].nextPart = this.parts[e + 1], this.parts[e].onended = function() {
                    t.resetPart(e), Ie(t);
                };
                this.looping = !1;
            }
            return Be(n43, [
                {
                    key: "onended",
                    value: function() {
                        this.looping ? this.parts[0].start() : this.parts[this.parts.length - 1].onended = function() {
                            this.stop(), this.resetParts();
                        }, this.currentPart = 0;
                    }
                },
                {
                    key: "start",
                    value: function() {
                        this.parts[this.currentPart].start(), this.scoreStep = 0;
                    }
                },
                {
                    key: "stop",
                    value: function() {
                        this.parts[this.currentPart].stop(), this.currentPart = 0, this.scoreStep = 0;
                    }
                },
                {
                    key: "pause",
                    value: function() {
                        this.parts[this.currentPart].stop();
                    }
                },
                {
                    key: "loop",
                    value: function() {
                        this.looping = !0, this.start();
                    }
                },
                {
                    key: "noLoop",
                    value: function() {
                        this.looping = !1;
                    }
                },
                {
                    key: "resetParts",
                    value: function() {
                        var e = this;
                        this.parts.forEach(function(t) {
                            e.resetParts[t];
                        });
                    }
                },
                {
                    key: "resetPart",
                    value: function(t) {
                        for(var e in this.parts[t].stop(), this.parts[t].partStep = 0, this.parts[t].phrases)this.parts[t] && (this.parts[t].phrases[e].phraseStep = 0);
                    }
                },
                {
                    key: "setBPM",
                    value: function(t, e) {
                        for(var n in this.parts)this.parts[n] && this.parts[n].setBPM(t, e);
                    }
                }
            ]), n43;
        }();
        function Ie(t) {
            t.currentPart++, t.currentPart >= t.parts.length ? (t.scoreStep = 0, t.onended()) : (t.scoreStep = 0, t.parts[t.currentPart - 1].stop(), t.parts[t.currentPart].start());
        }
        function Ue(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var Ge = function() {
            function i29(t142, e87) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, i29), Object.defineProperty(this, "bpm", {
                    get: function() {
                        return this._bpm;
                    },
                    set: function(t) {
                        this.musicalTimeMode, this._bpm = t, this._update();
                    }
                }), Object.defineProperty(this, "timeSignature", {
                    get: function() {
                        return this._timeSignature;
                    },
                    set: function(t) {
                        this.musicalTimeMode, this._timeSignature = t, this._update();
                    }
                }), Object.defineProperty(this, "interval", {
                    get: function() {
                        return this._interval;
                    },
                    set: function(t) {
                        this.musicalTimeMode = "number" != typeof t, this._interval = t, this._update();
                    }
                }), Object.defineProperty(this, "iterations", {
                    get: function() {
                        return this.clock.ticks;
                    }
                }), this.callback = t142, this.musicalTimeMode = "number" != typeof this._interval, this._interval = e87 || 1, this._timeSignature = 4, this._bpm = 60, this.isPlaying = !1, this.maxIterations = 1 / 0;
                var n = this;
                this.clock = new Re.a({
                    callback: function(t) {
                        var e = t - p1.audiocontext.currentTime;
                        0 < e && n.iterations <= n.maxIterations && n.callback(e);
                    },
                    frequency: this._calcFreq()
                });
            }
            return function(t, e, n) {
                e && Ue(t.prototype, e), n && Ue(t, n);
            }(i29, [
                {
                    key: "start",
                    value: function(t) {
                        var e = t || 0, n = p1.audiocontext.currentTime;
                        this.isPlaying || (this.clock.start(n + e), this.isPlaying = !0);
                    }
                },
                {
                    key: "stop",
                    value: function(t) {
                        var e = t || 0, n = p1.audiocontext.currentTime;
                        this.isPlaying && (this.clock.stop(n + e), this.isPlaying = !1);
                    }
                },
                {
                    key: "pause",
                    value: function(t) {
                        var e = t || 0, n = p1.audiocontext.currentTime;
                        this.isPlaying && (this.clock.pause(n + e), this.isPlaying = !1);
                    }
                },
                {
                    key: "syncedStart",
                    value: function(t, e) {
                        var n = e || 0, i = p1.audiocontext.currentTime;
                        if (t.isPlaying) {
                            if (t.isPlaying) {
                                var r = t.clock._nextTick - p1.audiocontext.currentTime;
                                this.clock.start(i + r), this.isPlaying = !0;
                            }
                        } else t.clock.start(i + n), t.isPlaying = !0, this.clock.start(i + n), this.isPlaying = !0;
                    }
                },
                {
                    key: "_update",
                    value: function() {
                        this.clock.frequency.value = this._calcFreq();
                    }
                },
                {
                    key: "_calcFreq",
                    value: function() {
                        return "number" == typeof this._interval ? (this.musicalTimeMode = !1, 1 / this._interval) : "string" == typeof this._interval ? (this.musicalTimeMode = !0, this._bpm / 60 / this._convertNotation(this._interval) * (this._timeSignature / 4)) : void 0;
                    }
                },
                {
                    key: "_convertNotation",
                    value: function(t) {
                        var e = t.slice(-1);
                        switch(t = Number(t.slice(0, -1)), e){
                            case "m":
                                return this._measure(t);
                            case "n":
                                return this._note(t);
                        }
                    }
                },
                {
                    key: "_measure",
                    value: function(t) {
                        return t * this._timeSignature;
                    }
                },
                {
                    key: "_note",
                    value: function(t) {
                        return this._timeSignature / t;
                    }
                }
            ]), i29;
        }();
        function Le(t143) {
            return (Le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t143);
        }
        function ze(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function We(t144, e) {
            return !e || "object" !== Le(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t144) : e;
        }
        function Ze(t145, e88, n44) {
            return (Ze = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t146, e89, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Xe(t)););
                    return t;
                }(t146, e89);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e89);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t145, e88, n44 || t145);
        }
        function Xe(t147) {
            return (Xe = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t147);
        }
        function Ye(t148, e90) {
            return (Ye = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t148, e90);
        }
        var He = function() {
            function e91() {
                var t149;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e91), (t149 = We(this, Xe(e91).call(this))).compressor = t149.ac.createDynamicsCompressor(), t149.input.connect(t149.compressor), t149.compressor.connect(t149.wet), t149;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && Ye(t, e);
            }(e91, Ct), function(t, e, n) {
                e && ze(t.prototype, e), n && ze(t, n);
            }(e91, [
                {
                    key: "process",
                    value: function(t, e, n, i, r, o) {
                        t.connect(this.input), this.set(e, n, i, r, o);
                    }
                },
                {
                    key: "set",
                    value: function(t, e, n, i, r) {
                        void 0 !== t && this.attack(t), void 0 !== e && this.knee(e), void 0 !== n && this.ratio(n), void 0 !== i && this.threshold(i), void 0 !== r && this.release(r);
                    }
                },
                {
                    key: "attack",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.compressor.attack.value = t, this.compressor.attack.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.attack.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.attack), this.compressor.attack.value;
                    }
                },
                {
                    key: "knee",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.compressor.knee.value = t, this.compressor.knee.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.knee.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.knee), this.compressor.knee.value;
                    }
                },
                {
                    key: "ratio",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.compressor.ratio.value = t, this.compressor.ratio.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.ratio.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.ratio), this.compressor.ratio.value;
                    }
                },
                {
                    key: "threshold",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.compressor.threshold.value = t, this.compressor.threshold.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.threshold.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : void 0 !== t && t.connect(this.compressor.threshold), this.compressor.threshold.value;
                    }
                },
                {
                    key: "release",
                    value: function(t, e) {
                        var n = e || 0;
                        return "number" == typeof t ? (this.compressor.release.value = t, this.compressor.release.cancelScheduledValues(this.ac.currentTime + .01 + n), this.compressor.release.linearRampToValueAtTime(t, this.ac.currentTime + .02 + n)) : "undefined" != typeof number && t.connect(this.compressor.release), this.compressor.release.value;
                    }
                },
                {
                    key: "reduction",
                    value: function() {
                        return this.compressor.reduction.value;
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        Ze(Xe(e91.prototype), "dispose", this).call(this), this.compressor && (this.compressor.disconnect(), delete this.compressor);
                    }
                }
            ]), e91;
        }();
        function $e(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var Qe = function() {
            function r(t150, e92, n, i) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, r), this.framesPerPeak = i || 20, this.framesSinceLastPeak = 0, this.decayRate = .95, this.threshold = n || .35, this.cutoff = 0, this.cutoffMult = 1.5, this.energy = 0, this.penergy = 0, this.currentValue = 0, this.isDetected = !1, this.f1 = t150 || 40, this.f2 = e92 || 2e4, this._onPeak = function() {};
            }
            return function(t, e, n) {
                e && $e(t.prototype, e), n && $e(t, n);
            }(r, [
                {
                    key: "update",
                    value: function(t) {
                        var e = this.energy = t.getEnergy(this.f1, this.f2) / 255;
                        e > this.cutoff && e > this.threshold && 0 < e - this.penergy ? (this._onPeak(), this.isDetected = !0, this.cutoff = e * this.cutoffMult, this.framesSinceLastPeak = 0) : (this.isDetected = !1, this.framesSinceLastPeak <= this.framesPerPeak ? this.framesSinceLastPeak++ : (this.cutoff *= this.decayRate, this.cutoff = Math.max(this.cutoff, this.threshold))), this.currentValue = e, this.penergy = e;
                    }
                },
                {
                    key: "onPeak",
                    value: function(t, e) {
                        var n = this;
                        n._onPeak = function() {
                            t(n.energy, e);
                        };
                    }
                }
            ]), r;
        }();
        function Je(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var Ke = p1.audiocontext, tn = function() {
            function e93() {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e93), this.input = Ke.createGain(), this.output = Ke.createGain(), this._inputChannels = 2, this._outputChannels = 2;
                var t151 = y(1024);
                this._workletNode = new AudioWorkletNode(Ke, s2.a.recorderProcessor, {
                    outputChannelCount: [
                        this._outputChannels
                    ],
                    processorOptions: {
                        numInputChannels: this._inputChannels,
                        bufferSize: t151
                    }
                }), this._workletNode.port.onmessage = (function(t) {
                    if ("buffers" === t.data.name) {
                        var e = [
                            new Float32Array(t.data.leftBuffer),
                            new Float32Array(t.data.rightBuffer)
                        ];
                        this._callback(e);
                    }
                }).bind(this), this._callback = function() {}, this._workletNode.connect(p5.soundOut._silentNode), this.setInput(), p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && Je(t.prototype, e), n && Je(t, n);
            }(e93, [
                {
                    key: "setInput",
                    value: function(t) {
                        this.input.disconnect(), this.input = null, this.input = Ke.createGain(), this.input.connect(this._workletNode), this.input.connect(this.output), t ? t.connect(this.input) : p5.soundOut.output.connect(this.input);
                    }
                },
                {
                    key: "record",
                    value: function(e, t152, n) {
                        this._workletNode.port.postMessage({
                            name: "start",
                            duration: t152
                        }), e && n ? this._callback = function(t) {
                            e.setBuffer(t), n();
                        } : e && (this._callback = function(t) {
                            e.setBuffer(t);
                        });
                    }
                },
                {
                    key: "stop",
                    value: function() {
                        this._workletNode.port.postMessage({
                            name: "stop"
                        });
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(t, 1), this._callback = function() {}, this.input && this.input.disconnect(), this.input = null, this._workletNode = null;
                    }
                }
            ]), e93;
        }();
        function en(t153) {
            return (en = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t153);
        }
        function nn(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function rn(t154, e) {
            return !e || "object" !== en(e) && "function" != typeof e ? function(t) {
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(t154) : e;
        }
        function on(t155, e94, n45) {
            return (on = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t156, e95, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = sn(t)););
                    return t;
                }(t156, e95);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e95);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t155, e94, n45 || t155);
        }
        function sn(t157) {
            return (sn = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t157);
        }
        function an(t158, e96) {
            return (an = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t158, e96);
        }
        function un(t) {
            for(var e, n = "number" == typeof t ? t : 50, i = new Float32Array(44100), r = Math.PI / 180, o = 0; o < 44100; ++o)e = 2 * o / 44100 - 1, i[o] = (3 + n) * e * 20 * r / (Math.PI + n * Math.abs(e));
            return i;
        }
        var cn = function() {
            function r(t159, e97) {
                var n;
                if (function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, r), n = rn(this, sn(r).call(this)), void 0 === t159 && (t159 = .25), "number" != typeof t159) throw new Error("amount must be a number");
                if (void 0 === e97 && (e97 = "2x"), "string" != typeof e97) throw new Error("oversample must be a String");
                var i = p5.prototype.map(t159, 0, 1, 0, 2e3);
                return n.waveShaperNode = n.ac.createWaveShaper(), n.amount = i, n.waveShaperNode.curve = un(i), n.waveShaperNode.oversample = e97, n.input.connect(n.waveShaperNode), n.waveShaperNode.connect(n.wet), n;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && an(t, e);
            }(r, Ct), function(t, e, n) {
                e && nn(t.prototype, e), n && nn(t, n);
            }(r, [
                {
                    key: "process",
                    value: function(t, e, n) {
                        t.connect(this.input), this.set(e, n);
                    }
                },
                {
                    key: "set",
                    value: function(t, e) {
                        if (t) {
                            var n = p5.prototype.map(t, 0, 1, 0, 2e3);
                            this.amount = n, this.waveShaperNode.curve = un(n);
                        }
                        e && (this.waveShaperNode.oversample = e);
                    }
                },
                {
                    key: "getAmount",
                    value: function() {
                        return this.amount;
                    }
                },
                {
                    key: "getOversample",
                    value: function() {
                        return this.waveShaperNode.oversample;
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        on(sn(r.prototype), "dispose", this).call(this), this.waveShaperNode && (this.waveShaperNode.disconnect(), this.waveShaperNode = null);
                    }
                }
            ]), r;
        }();
        function ln(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var hn = function() {
            function t160() {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, t160), this.ac = p1.audiocontext, this.input = this.ac.createGain(), this.output = this.ac.createGain(), this.input.gain.value = .5, this.input.connect(this.output), p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && ln(t.prototype, e), n && ln(t, n);
            }(t160, [
                {
                    key: "setInput",
                    value: function(t) {
                        t.connect(this.input);
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        var e = t || p5.soundOut.input;
                        this.output.connect(e.input ? e.input : e);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && this.output.disconnect();
                    }
                },
                {
                    key: "amp",
                    value: function(t, e, n) {
                        var i = 1 < arguments.length && void 0 !== e ? e : 0, r = 2 < arguments.length && void 0 !== n ? n : 0, o = p1.audiocontext.currentTime, s = this.output.gain.value;
                        this.output.gain.cancelScheduledValues(o), this.output.gain.linearRampToValueAtTime(s, o + r), this.output.gain.linearRampToValueAtTime(t, o + r + i);
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        var t = p1.soundArray.indexOf(this);
                        p1.soundArray.splice(t, 1), this.output && (this.output.disconnect(), delete this.output), this.input && (this.input.disconnect(), delete this.input);
                    }
                }
            ]), t160;
        }();
        function pn(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var fn = function() {
            function t161() {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, t161), this.ac = p1.audiocontext, this.output = this.ac.createGain(), this.connect(), p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && pn(t.prototype, e), n && pn(t, n);
            }(t161, [
                {
                    key: "play",
                    value: function(t, e, n, i) {}
                },
                {
                    key: "triggerAttack",
                    value: function(t, e, n) {}
                },
                {
                    key: "triggerRelease",
                    value: function(t) {}
                },
                {
                    key: "amp",
                    value: function(t, e) {}
                },
                {
                    key: "connect",
                    value: function(t) {
                        var e = t || p1.input;
                        this.output.connect(e.input ? e.input : e);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output.disconnect();
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        this.output && (this.output.disconnect(), delete this.output);
                    }
                }
            ]), t161;
        }();
        function dn(t162) {
            return (dn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            })(t162);
        }
        function yn(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function mn(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }
        function vn(t163, e98, n46) {
            return (vn = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t164, e99, n) {
                var i = function(t, e) {
                    for(; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = _n(t)););
                    return t;
                }(t164, e99);
                if (i) {
                    var r = Object.getOwnPropertyDescriptor(i, e99);
                    return r.get ? r.get.call(n) : r.value;
                }
            })(t163, e98, n46 || t163);
        }
        function _n(t165) {
            return (_n = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            })(t165);
        }
        function gn(t166, e100) {
            return (gn = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t;
            })(t166, e100);
        }
        var bn = function() {
            function e101() {
                var t167;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, e101), (t167 = function(t, e) {
                    return !e || "object" !== dn(e) && "function" != typeof e ? mn(t) : e;
                }(this, _n(e101).call(this))).oscillator = new nt, t167.env = new ot, t167.env.setRange(1, 0), t167.env.setExp(!0), t167.setADSR(.02, .25, .05, .35), t167.oscillator.disconnect(), t167.oscillator.connect(t167.output), t167.env.disconnect(), t167.env.setInput(t167.output.gain), t167.oscillator.output.gain.value = 1, t167.oscillator.start(), t167.connect(), p1.soundArray.push(mn(t167)), Object.defineProperties(mn(t167), {
                    attack: {
                        get: function() {
                            return this.env.aTime;
                        },
                        set: function(t) {
                            this.env.setADSR(t, this.env.dTime, this.env.sPercent, this.env.rTime);
                        }
                    },
                    decay: {
                        get: function() {
                            return this.env.dTime;
                        },
                        set: function(t) {
                            this.env.setADSR(this.env.aTime, t, this.env.sPercent, this.env.rTime);
                        }
                    },
                    sustain: {
                        get: function() {
                            return this.env.sPercent;
                        },
                        set: function(t) {
                            this.env.setADSR(this.env.aTime, this.env.dTime, t, this.env.rTime);
                        }
                    },
                    release: {
                        get: function() {
                            return this.env.rTime;
                        },
                        set: function(t) {
                            this.env.setADSR(this.env.aTime, this.env.dTime, this.env.sPercent, t);
                        }
                    }
                }), t167;
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && gn(t, e);
            }(e101, fn), function(t, e, n) {
                e && yn(t.prototype, e), n && yn(t, n);
            }(e101, [
                {
                    key: "play",
                    value: function(t, e, n, i) {
                        this.triggerAttack(t, e, ~~n), this.triggerRelease(~~n + (i || .15));
                    }
                },
                {
                    key: "triggerAttack",
                    value: function(t, e, n) {
                        var i = 2 < arguments.length && void 0 !== n ? n : 0, r = h1(t), o = e || .1;
                        this.oscillator.freq(r, 0, i), this.env.ramp(this.output.gain, i, o);
                    }
                },
                {
                    key: "triggerRelease",
                    value: function(t) {
                        var e = 0 < arguments.length && void 0 !== t ? t : 0;
                        this.env.ramp(this.output.gain, e, 0);
                    }
                },
                {
                    key: "setADSR",
                    value: function(t, e, n, i) {
                        this.env.setADSR(t, e, n, i);
                    }
                },
                {
                    key: "amp",
                    value: function(t, e) {
                        var n = e || 0;
                        return void 0 !== t && this.oscillator.amp(t, n), this.oscillator.amp().value;
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        var e = t || p1.input;
                        this.output.connect(e.input ? e.input : e);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && this.output.disconnect();
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        vn(_n(e101.prototype), "dispose", this).call(this), this.env && this.env.dispose(), this.oscillator && this.oscillator.dispose();
                    }
                }
            ]), e101;
        }();
        function Tn(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var wn = function() {
            function r(t168, e102, n, i) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, r), this.isDetected = !1, this.freqLow = t168, this.freqHigh = e102, this.treshold = n, this.energy = 0, this.penergy = 0, this.sensitivity = 500, this.callback = i;
            }
            return function(t, e, n) {
                e && Tn(t.prototype, e), n && Tn(t, n);
            }(r, [
                {
                    key: "update",
                    value: function(t, e) {
                        if (this.energy = t.getEnergy(this.freqLow, this.freqHigh) / 255, !1 === this.isDetected && this.energy - this.penergy > this.treshold) {
                            this.isDetected = !0, this.callback ? this.callback(this.energy) : e && e(this.energy);
                            var n = this;
                            setTimeout(function() {
                                n.isDetected = !1;
                            }, this.sensitivity);
                        }
                        this.penergy = this.energy;
                    }
                }
            ]), r;
        }();
        function xn(t, e) {
            for(var n = 0; n < e.length; n++){
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        var Sn = function() {
            function n47(t169, e103) {
                !function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                }(this, n47), this.audiovoices = [], this.notes = {}, this._newest = 0, this._oldest = 0, this.maxVoices = e103 || 8, this.AudioVoice = void 0 === t169 ? p5.MonoSynth : t169, this._voicesInUse = new rt.a(0), this.output = p1.audiocontext.createGain(), this.connect(), this._allocateVoices(), p1.soundArray.push(this);
            }
            return function(t, e, n) {
                e && xn(t.prototype, e), n && xn(t, n);
            }(n47, [
                {
                    key: "_allocateVoices",
                    value: function() {
                        for(var t = 0; t < this.maxVoices; t++)this.audiovoices.push(new this.AudioVoice), this.audiovoices[t].disconnect(), this.audiovoices[t].connect(this.output);
                    }
                },
                {
                    key: "play",
                    value: function(t, e, n, i) {
                        var r = 3 < arguments.length && void 0 !== i ? i : 1;
                        this.noteAttack(t, e, n), this.noteRelease(t, n + r);
                    }
                },
                {
                    key: "noteADSR",
                    value: function(t, e, n, i, r, o) {
                        var s = 5 < arguments.length && void 0 !== o ? o : 0, a = p1.audiocontext.currentTime + s;
                        this.audiovoices[this.notes[t].getValueAtTime(a)].setADSR(e, n, i, r);
                    }
                },
                {
                    key: "setADSR",
                    value: function(e, n, i, r) {
                        this.audiovoices.forEach(function(t) {
                            t.setADSR(e, n, i, r);
                        });
                    }
                },
                {
                    key: "noteAttack",
                    value: function(t, e, n) {
                        var i, r = 2 < arguments.length && void 0 !== n ? n : 0, o = p1.audiocontext.currentTime + r, s = h1(t), a = e || .1;
                        this.notes[s] && null !== this.notes[s].getValueAtTime(o) && this.noteRelease(s, 0), this._voicesInUse.getValueAtTime(o) < this.maxVoices ? i = Math.max(~~this._voicesInUse.getValueAtTime(o), 0) : (i = this._oldest, oldestNote = l1(this.audiovoices[this._oldest].oscillator.freq().value), this.noteRelease(oldestNote), this._oldest = (this._oldest + 1) % (this.maxVoices - 1)), this.notes[s] = new rt.a, this.notes[s].setValueAtTime(i, o);
                        var u = null === this._voicesInUse._searchBefore(o) ? 0 : this._voicesInUse._searchBefore(o).value;
                        if (this._voicesInUse.setValueAtTime(u + 1, o), this._updateAfter(o, 1), this._newest = i, "number" == typeof a) {
                            var c = 1 / this._voicesInUse.getValueAtTime(o) * 2;
                            a = c < a ? c : a;
                        }
                        this.audiovoices[i].triggerAttack(s, a, r);
                    }
                },
                {
                    key: "_updateAfter",
                    value: function(t, e) {
                        if (null !== this._voicesInUse._searchAfter(t)) {
                            this._voicesInUse._searchAfter(t).value += e;
                            var n = this._voicesInUse._searchAfter(t).time;
                            this._updateAfter(n, e);
                        }
                    }
                },
                {
                    key: "noteRelease",
                    value: function(t170, e) {
                        var n = p1.audiocontext.currentTime, i = e || 0, r = n + i;
                        if (t170) {
                            var o = h1(t170);
                            if (this.notes[o] && null !== this.notes[o].getValueAtTime(r)) {
                                var s = Math.max(~~this._voicesInUse.getValueAtTime(r).value, 1);
                                this._voicesInUse.setValueAtTime(s - 1, r), 0 < s && this._updateAfter(r, -1), this.audiovoices[this.notes[o].getValueAtTime(r)].triggerRelease(i), this.notes[o].dispose(), delete this.notes[o], this._newest = 0 === this._newest ? 0 : (this._newest - 1) % (this.maxVoices - 1);
                            }
                        } else for(var a in this.audiovoices.forEach(function(t) {
                            t.triggerRelease(i);
                        }), this._voicesInUse.setValueAtTime(0, r), this.notes)this.notes[a].dispose(), delete this.notes[a];
                    }
                },
                {
                    key: "connect",
                    value: function(t) {
                        var e = t || p1.input;
                        this.output.connect(e.input ? e.input : e);
                    }
                },
                {
                    key: "disconnect",
                    value: function() {
                        this.output && this.output.disconnect();
                    }
                },
                {
                    key: "dispose",
                    value: function() {
                        this.audiovoices.forEach(function(t) {
                            t.dispose();
                        }), this.output && (this.output.disconnect(), delete this.output);
                    }
                }
            ]), n47;
        }();
        function kn() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, kn);
        }
        p5.prototype.getAudioContext = c1.b, p5.prototype.userStartAudio = c1.c, p5.prototype.sampleRate = function() {
            return p1.audiocontext.sampleRate;
        }, p5.prototype.freqToMidi = l1, p5.prototype.midiToFreq = r19, p5.prototype.noteToFreq = h1, p5.prototype.soundFormats = function() {
            p1.extensions = [];
            for(var t = 0; t < arguments.length; t++){
                if (arguments[t] = arguments[t].toLowerCase(), !(-1 < [
                    "mp3",
                    "wav",
                    "ogg",
                    "m4a",
                    "aac"
                ].indexOf(arguments[t]))) throw arguments[t] + " is not a valid sound format!";
                p1.extensions.push(arguments[t]);
            }
        }, p5.prototype.disposeSound = function() {
            for(var t = 0; t < p1.soundArray.length; t++)p1.soundArray[t].dispose();
        }, p5.prototype._checkFileFormats = function(t) {
            var e;
            if ("string" == typeof t) {
                var n = (e = t).split(".").pop();
                if (-1 < [
                    "mp3",
                    "wav",
                    "ogg",
                    "m4a",
                    "aac"
                ].indexOf(n)) {
                    if (!p5.prototype.isFileSupported(n)) for(var i = e.split("."), r = i[i.length - 1], o = 0; o < p1.extensions.length; o++){
                        var s = p1.extensions[o];
                        if (p5.prototype.isFileSupported(s)) {
                            r = "", 2 === i.length && (r += i[0]);
                            for(var a = 1; a <= i.length - 2; a++)r += "." + i[a];
                            e = r += ".", e = e += s;
                            break;
                        }
                    }
                } else for(var u = 0; u < p1.extensions.length; u++){
                    var c = p1.extensions[u];
                    if (p5.prototype.isFileSupported(c)) {
                        e = e + "." + c;
                        break;
                    }
                }
            } else if ("object" === f1(t)) for(var l = 0; l < t.length; l++){
                var h = t[l].split(".").pop();
                if (p5.prototype.isFileSupported(h)) {
                    e = t[l];
                    break;
                }
            }
            return e;
        }, p5.prototype._mathChain = function(t, e, n, i, r) {
            for(var o in t.mathOps)t.mathOps[o] instanceof r && (t.mathOps[o].dispose(), (n = o) < t.mathOps.length - 1 && (i = t.mathOps[o + 1]));
            return t.mathOps[n - 1].disconnect(), t.mathOps[n - 1].connect(e), e.connect(i), t.mathOps[n] = e, t;
        }, p5.prototype.convertToWav = a2, p5.prototype.interleave = u2, p5.prototype.writeUTFBytes = d, p5.prototype.safeBufferSize = y, p5.prototype.saveSound = function(t, e) {
            var n = a2(t.buffer);
            p5.prototype.writeFile([
                n
            ], e, "wav");
        }, p5.prototype.registerMethod("remove", p5.prototype.disposeSound), p5.Panner = k, p5.SoundFile = E, p5.prototype.loadSound = function(t, e, n, i) {
            -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && window.alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
            var r = this;
            return new q(t, function() {
                "function" == typeof e && e.apply(r, arguments), "function" == typeof r._decrementPreload && r._decrementPreload();
            }, n, i);
        }, p5.prototype.registerPreloadMethod("loadSound", p5.prototype), p5.Amplitude = B, p5.FFT = j, p5.Oscillator = nt, p5.SinOsc = J, p5.TriOsc = K, p5.SawOsc = tt, p5.SqrOsc = et, p5.Noise = dt, p5.Pulse = xt, p5.AudioIn = kt, p5.Effect = Ct, p5.Filter = Gt, p5.LowPass = Dt, p5.HighPass = It, p5.BandPass = Ut, p5.EQ = ee, p5.listener3D = ie, p5.Panner3D = le, p5.Delay = ve, p5.Reverb = Ae, p5.Convolver = Oe, p5.prototype.createConvolver = function(t171, e, n) {
            -1 < window.location.origin.indexOf("file://") && "undefined" === window.cordova && alert("This sketch may require a server to load external files. Please see http://bit.ly/1qcInwS");
            var i = this, r = new Oe(t171, function(t) {
                "function" == typeof e && e(t), "function" == typeof i._decrementPreload && i._decrementPreload();
            }, n);
            return r.impulses = [], r;
        }, p5.prototype.registerPreloadMethod("createConvolver", p5.prototype), p5.Metro = Ee, p5.Phrase = Me, p5.Part = Fe, p5.Score = De, p5.SoundLoop = Ge, p5.Compressor = He, p5.peakDetect = Qe, p5.SoundRecorder = tn, p5.Distortion = cn, p5.Gain = hn, p5.AudioVoice = fn, p5.MonoSynth = bn, p5.OnsetDetect = wn, p5.PolySynth = Sn, p5.PeakDetect = Qe, p5.Signal = kn;
    }
]); //# sourceMappingURL=p5.sound.min.js.map 

//# sourceMappingURL=index.c02cb7b6.js.map
