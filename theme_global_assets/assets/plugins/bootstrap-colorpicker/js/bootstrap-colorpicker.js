!function (t) { "use strict"; "object" == typeof exports ? module.exports = t(window.jQuery) : "function" == typeof define && define.amd ? define(["jquery"], t) : window.jQuery && !window.jQuery.fn.colorpicker && t(window.jQuery) }(function (t) { "use strict"; var e = function (e, o) { this.value = { h: 0, s: 0, b: 0, a: 1 }, this.origFormat = null, o && t.extend(this.colors, o), e && (void 0 !== e.toLowerCase ? (e += "", this.setColor(e)) : void 0 !== e.h && (this.value = e)) }; e.prototype = { constructor: e, colors: { aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000000", blanchedalmond: "#ffebcd", blue: "#0000ff", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgrey: "#d3d3d3", lightgreen: "#90ee90", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370d8", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#d87093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", red: "#ff0000", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#2dddbd", violet: "#ee82ee", wheat: "#f5deb3", white: "#ffffff", whitesmoke: "#f5f5f5", yellow: "#ffff00", yellowgreen: "#9acd32", transparent: "transparent" }, _sanitizeNumber: function (t) { return "number" == typeof t ? t : isNaN(t) || null === t || "" === t || void 0 === t ? 1 : "" === t ? 0 : void 0 !== t.toLowerCase ? (t.match(/^\./) && (t = "0" + t), Math.ceil(100 * parseFloat(t)) / 100) : 1 }, isTransparent: function (t) { return !!t && ("transparent" === (t = t.toLowerCase().trim()) || t.match(/#?00000000/) || t.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/)) }, rgbaIsTransparent: function (t) { return 0 === t.r && 0 === t.g && 0 === t.b && 0 === t.a }, setColor: function (t) { (t = t.toLowerCase().trim()) && (this.isTransparent(t) ? this.value = { h: 0, s: 0, b: 0, a: 0 } : this.value = this.stringToHSB(t) || { h: 0, s: 0, b: 0, a: 1 }) }, stringToHSB: function (e) { var o; e = e.toLowerCase(), void 0 !== this.colors[e] && (e = this.colors[e], o = "alias"); var i = this, r = !1; return t.each(this.stringParsers, function (t, s) { var a = s.re.exec(e), n = a && s.parse.apply(i, [a]), l = o || s.format || "rgba"; return !n || (r = l.match(/hsla?/) ? i.RGBtoHSB.apply(i, i.HSLtoRGB.apply(i, n)) : i.RGBtoHSB.apply(i, n), i.origFormat = l, !1) }), r }, setHue: function (t) { this.value.h = 1 - t }, setSaturation: function (t) { this.value.s = t }, setBrightness: function (t) { this.value.b = 1 - t }, setAlpha: function (t) { this.value.a = Math.round(parseInt(100 * (1 - t), 10) / 100 * 100) / 100 }, toRGB: function (t, e, o, i) { var r, s, a, n, l; return t || (t = this.value.h, e = this.value.s, o = this.value.b), t = (t *= 360) % 360 / 60, r = s = a = o - (l = o * e), r += [l, n = l * (1 - Math.abs(t % 2 - 1)), 0, 0, n, l][t = ~~t], s += [n, l, l, n, 0, 0][t], a += [0, 0, n, l, l, n][t], { r: Math.round(255 * r), g: Math.round(255 * s), b: Math.round(255 * a), a: i || this.value.a } }, toHex: function (t, e, o, i) { var r = this.toRGB(t, e, o, i); return this.rgbaIsTransparent(r) ? "transparent" : "#" + (1 << 24 | parseInt(r.r) << 16 | parseInt(r.g) << 8 | parseInt(r.b)).toString(16).substr(1) }, toHSL: function (t, e, o, i) { t = t || this.value.h, e = e || this.value.s, o = o || this.value.b, i = i || this.value.a; var r = t, s = (2 - e) * o, a = e * o; return a /= s > 0 && s <= 1 ? s : 2 - s, s /= 2, a > 1 && (a = 1), { h: isNaN(r) ? 0 : r, s: isNaN(a) ? 0 : a, l: isNaN(s) ? 0 : s, a: isNaN(i) ? 0 : i } }, toAlias: function (t, e, o, i) { var r = this.toHex(t, e, o, i); for (var s in this.colors) if (this.colors[s] === r) return s; return !1 }, RGBtoHSB: function (t, e, o, i) { var r, s, a, n; return t /= 255, e /= 255, o /= 255, r = ((r = 0 === (n = (a = Math.max(t, e, o)) - Math.min(t, e, o)) ? null : a === t ? (e - o) / n : a === e ? (o - t) / n + 2 : (t - e) / n + 4) + 360) % 6 * 60 / 360, s = 0 === n ? 0 : n / a, { h: this._sanitizeNumber(r), s: s, b: a, a: this._sanitizeNumber(i) } }, HueToRGB: function (t, e, o) { return o < 0 ? o += 1 : o > 1 && (o -= 1), 6 * o < 1 ? t + (e - t) * o * 6 : 2 * o < 1 ? e : 3 * o < 2 ? t + (e - t) * (2 / 3 - o) * 6 : t }, HSLtoRGB: function (t, e, o, i) { var r; e < 0 && (e = 0); var s = 2 * o - (r = o <= .5 ? o * (1 + e) : o + e - o * e), a = t + 1 / 3, n = t, l = t - 1 / 3; return [Math.round(255 * this.HueToRGB(s, r, a)), Math.round(255 * this.HueToRGB(s, r, n)), Math.round(255 * this.HueToRGB(s, r, l)), this._sanitizeNumber(i)] }, toString: function (t) { var e = !1; switch (t = t || "rgba") { case "rgb": return e = this.toRGB(), this.rgbaIsTransparent(e) ? "transparent" : "rgb(" + e.r + "," + e.g + "," + e.b + ")"; case "rgba": return "rgba(" + (e = this.toRGB()).r + "," + e.g + "," + e.b + "," + e.a + ")"; case "hsl": return e = this.toHSL(), "hsl(" + Math.round(360 * e.h) + "," + Math.round(100 * e.s) + "%," + Math.round(100 * e.l) + "%)"; case "hsla": return e = this.toHSL(), "hsla(" + Math.round(360 * e.h) + "," + Math.round(100 * e.s) + "%," + Math.round(100 * e.l) + "%," + e.a + ")"; case "hex": return this.toHex(); case "alias": return this.toAlias() || this.toHex(); default: return e } }, stringParsers: [{ re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/, format: "rgb", parse: function (t) { return [t[1], t[2], t[3], 1] } }, { re: /rgb\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/, format: "rgb", parse: function (t) { return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], 1] } }, { re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/, format: "rgba", parse: function (t) { return [t[1], t[2], t[3], t[4]] } }, { re: /rgba\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/, format: "rgba", parse: function (t) { return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]] } }, { re: /hsl\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/, format: "hsl", parse: function (t) { return [t[1] / 360, t[2] / 100, t[3] / 100, t[4]] } }, { re: /hsla\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/, format: "hsla", parse: function (t) { return [t[1] / 360, t[2] / 100, t[3] / 100, t[4]] } }, { re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, format: "hex", parse: function (t) { return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16), 1] } }, { re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/, format: "hex", parse: function (t) { return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16), 1] } }], colorNameToHex: function (t) { return void 0 !== this.colors[t.toLowerCase()] && this.colors[t.toLowerCase()] } }; var o = { horizontal: !1, inline: !1, color: !1, format: !1, input: "input", container: !1, component: ".add-on, .input-group-addon", sliders: { saturation: { maxLeft: 100, maxTop: 100, callLeft: "setSaturation", callTop: "setBrightness" }, hue: { maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setHue" }, alpha: { maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setAlpha" } }, slidersHorz: { saturation: { maxLeft: 100, maxTop: 100, callLeft: "setSaturation", callTop: "setBrightness" }, hue: { maxLeft: 100, maxTop: 0, callLeft: "setHue", callTop: !1 }, alpha: { maxLeft: 100, maxTop: 0, callLeft: "setAlpha", callTop: !1 } }, template: '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div><div class="colorpicker-selectors"></div></div>', align: "right", customClass: null, colorSelectors: null }, i = function (i, r) { if (this.element = t(i).addClass("colorpicker-element"), this.options = t.extend(!0, {}, o, this.element.data(), r), this.component = this.options.component, this.component = !1 !== this.component && this.element.find(this.component), this.component && 0 === this.component.length && (this.component = !1), this.container = !0 === this.options.container ? this.element : this.options.container, this.container = !1 !== this.container && t(this.container), this.input = this.element.is("input") ? this.element : !!this.options.input && this.element.find(this.options.input), this.input && 0 === this.input.length && (this.input = !1), this.color = new e(!1 !== this.options.color ? this.options.color : this.getValue(), this.options.colorSelectors), this.format = !1 !== this.options.format ? this.options.format : this.color.origFormat, !1 !== this.options.color && (this.updateInput(this.color), this.updateData(this.color)), this.picker = t(this.options.template), this.options.customClass && this.picker.addClass(this.options.customClass), this.options.inline ? this.picker.addClass("colorpicker-inline colorpicker-visible") : this.picker.addClass("colorpicker-hidden"), this.options.horizontal && this.picker.addClass("colorpicker-horizontal"), "rgba" !== this.format && "hsla" !== this.format && !1 !== this.options.format || this.picker.addClass("colorpicker-with-alpha"), "right" === this.options.align && this.picker.addClass("colorpicker-right"), !0 === this.options.inline && this.picker.addClass("colorpicker-no-arrow"), this.options.colorSelectors) { var s = this; t.each(this.options.colorSelectors, function (e, o) { var i = t("<i />").css("background-color", o).data("class", e); i.click(function () { s.setValue(t(this).css("background-color")) }), s.picker.find(".colorpicker-selectors").append(i) }), this.picker.find(".colorpicker-selectors").show() } this.picker.on("mousedown.colorpicker touchstart.colorpicker", t.proxy(this.mousedown, this)), this.picker.appendTo(this.container ? this.container : t("body")), !1 !== this.input && (this.input.on({ "keyup.colorpicker": t.proxy(this.keyup, this) }), this.input.on({ "change.colorpicker": t.proxy(this.change, this) }), !1 === this.component && this.element.on({ "focus.colorpicker": t.proxy(this.show, this) }), !1 === this.options.inline && this.element.on({ "focusout.colorpicker": t.proxy(this.hide, this) })), !1 !== this.component && this.component.on({ "click.colorpicker": t.proxy(this.show, this) }), !1 === this.input && !1 === this.component && this.element.on({ "click.colorpicker": t.proxy(this.show, this) }), !1 !== this.input && !1 !== this.component && "color" === this.input.attr("type") && this.input.on({ "click.colorpicker": t.proxy(this.show, this), "focus.colorpicker": t.proxy(this.show, this) }), this.update(), t(t.proxy(function () { this.element.trigger("create") }, this)) }; i.Color = e, i.prototype = { constructor: i, destroy: function () { this.picker.remove(), this.element.removeData("colorpicker", "color").off(".colorpicker"), !1 !== this.input && this.input.off(".colorpicker"), !1 !== this.component && this.component.off(".colorpicker"), this.element.removeClass("colorpicker-element"), this.element.trigger({ type: "destroy" }) }, reposition: function () { if (!1 !== this.options.inline || this.options.container) return !1; var t = this.container && this.container[0] !== document.body ? "position" : "offset", e = this.component || this.element, o = e[t](); "right" === this.options.align && (o.left -= this.picker.outerWidth() - e.outerWidth()), this.picker.css({ top: o.top + e.outerHeight(), left: o.left }) }, show: function (e) { if (this.isDisabled()) return !1; this.picker.addClass("colorpicker-visible").removeClass("colorpicker-hidden"), this.reposition(), t(window).on("resize.colorpicker", t.proxy(this.reposition, this)), !e || this.hasInput() && "color" !== this.input.attr("type") || e.stopPropagation && e.preventDefault && (e.stopPropagation(), e.preventDefault()), !this.component && this.input || !1 !== this.options.inline || t(window.document).on({ "mousedown.colorpicker": t.proxy(this.hide, this) }), this.element.trigger({ type: "showPicker", color: this.color }) }, hide: function () { this.picker.addClass("colorpicker-hidden").removeClass("colorpicker-visible"), t(window).off("resize.colorpicker", this.reposition), t(document).off({ "mousedown.colorpicker": this.hide }), this.update(), this.element.trigger({ type: "hidePicker", color: this.color }) }, updateData: function (t) { return t = t || this.color.toString(this.format), this.element.data("color", t), t }, updateInput: function (t) { if (t = t || this.color.toString(this.format), !1 !== this.input) { if (this.options.colorSelectors) { var o = new e(t, this.options.colorSelectors).toAlias(); void 0 !== this.options.colorSelectors[o] && (t = o) } this.input.prop("value", t) } return t }, updatePicker: function (t) { void 0 !== t && (this.color = new e(t, this.options.colorSelectors)); var o = !1 === this.options.horizontal ? this.options.sliders : this.options.slidersHorz, i = this.picker.find("i"); if (0 !== i.length) return !1 === this.options.horizontal ? (o = this.options.sliders, i.eq(1).css("top", o.hue.maxTop * (1 - this.color.value.h)).end().eq(2).css("top", o.alpha.maxTop * (1 - this.color.value.a))) : (o = this.options.slidersHorz, i.eq(1).css("left", o.hue.maxLeft * (1 - this.color.value.h)).end().eq(2).css("left", o.alpha.maxLeft * (1 - this.color.value.a))), i.eq(0).css({ top: o.saturation.maxTop - this.color.value.b * o.saturation.maxTop, left: this.color.value.s * o.saturation.maxLeft }), this.picker.find(".colorpicker-saturation").css("backgroundColor", this.color.toHex(this.color.value.h, 1, 1, 1)), this.picker.find(".colorpicker-alpha").css("backgroundColor", this.color.toHex()), this.picker.find(".colorpicker-color, .colorpicker-color div").css("backgroundColor", this.color.toString(this.format)), t }, updateComponent: function (t) { if (t = t || this.color.toString(this.format), !1 !== this.component) { var e = this.component.find("i").eq(0); e.length > 0 ? e.css({ backgroundColor: t }) : this.component.css({ backgroundColor: t }) } return t }, update: function (t) { var e; return !1 === this.getValue(!1) && !0 !== t || (e = this.updateComponent(), this.updateInput(e), this.updateData(e), this.updatePicker()), e }, setValue: function (t) { this.color = new e(t, this.options.colorSelectors), this.update(!0), this.element.trigger({ type: "changeColor", color: this.color, value: t }) }, getValue: function (t) { var e; return t = void 0 === t ? "#000000" : t, void 0 !== (e = this.hasInput() ? this.input.val() : this.element.data("color")) && "" !== e && null !== e || (e = t), e }, hasInput: function () { return !1 !== this.input }, isDisabled: function () { return !!this.hasInput() && !0 === this.input.prop("disabled") }, disable: function () { return !!this.hasInput() && (this.input.prop("disabled", !0), this.element.trigger({ type: "disable", color: this.color, value: this.getValue() }), !0) }, enable: function () { return !!this.hasInput() && (this.input.prop("disabled", !1), this.element.trigger({ type: "enable", color: this.color, value: this.getValue() }), !0) }, currentSlider: null, mousePointer: { left: 0, top: 0 }, mousedown: function (e) { !e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches && (e.pageX = e.originalEvent.touches[0].pageX, e.pageY = e.originalEvent.touches[0].pageY), e.stopPropagation(), e.preventDefault(); var o = t(e.target).closest("div"), i = this.options.horizontal ? this.options.slidersHorz : this.options.sliders; if (!o.is(".colorpicker")) { if (o.is(".colorpicker-saturation")) this.currentSlider = t.extend({}, i.saturation); else if (o.is(".colorpicker-hue")) this.currentSlider = t.extend({}, i.hue); else { if (!o.is(".colorpicker-alpha")) return !1; this.currentSlider = t.extend({}, i.alpha) } var r = o.offset(); this.currentSlider.guide = o.find("i")[0].style, this.currentSlider.left = e.pageX - r.left, this.currentSlider.top = e.pageY - r.top, this.mousePointer = { left: e.pageX, top: e.pageY }, t(document).on({ "mousemove.colorpicker": t.proxy(this.mousemove, this), "touchmove.colorpicker": t.proxy(this.mousemove, this), "mouseup.colorpicker": t.proxy(this.mouseup, this), "touchend.colorpicker": t.proxy(this.mouseup, this) }).trigger("mousemove") } return !1 }, mousemove: function (t) { !t.pageX && !t.pageY && t.originalEvent && t.originalEvent.touches && (t.pageX = t.originalEvent.touches[0].pageX, t.pageY = t.originalEvent.touches[0].pageY), t.stopPropagation(), t.preventDefault(); var e = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((t.pageX || this.mousePointer.left) - this.mousePointer.left))), o = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top + ((t.pageY || this.mousePointer.top) - this.mousePointer.top))); return this.currentSlider.guide.left = e + "px", this.currentSlider.guide.top = o + "px", this.currentSlider.callLeft && this.color[this.currentSlider.callLeft].call(this.color, e / this.currentSlider.maxLeft), this.currentSlider.callTop && this.color[this.currentSlider.callTop].call(this.color, o / this.currentSlider.maxTop), "setAlpha" === this.currentSlider.callTop && !1 === this.options.format && (1 !== this.color.value.a ? (this.format = "rgba", this.color.origFormat = "rgba") : (this.format = "hex", this.color.origFormat = "hex")), this.update(!0), this.element.trigger({ type: "changeColor", color: this.color }), !1 }, mouseup: function (e) { return e.stopPropagation(), e.preventDefault(), t(document).off({ "mousemove.colorpicker": this.mousemove, "touchmove.colorpicker": this.mousemove, "mouseup.colorpicker": this.mouseup, "touchend.colorpicker": this.mouseup }), !1 }, change: function (t) { this.keyup(t) }, keyup: function (t) { 38 === t.keyCode ? (this.color.value.a < 1 && (this.color.value.a = Math.round(100 * (this.color.value.a + .01)) / 100), this.update(!0)) : 40 === t.keyCode ? (this.color.value.a > 0 && (this.color.value.a = Math.round(100 * (this.color.value.a - .01)) / 100), this.update(!0)) : (this.color = new e(this.input.val(), this.options.colorSelectors), this.color.origFormat && !1 === this.options.format && (this.format = this.color.origFormat), !1 !== this.getValue(!1) && (this.updateData(), this.updateComponent(), this.updatePicker())), this.element.trigger({ type: "changeColor", color: this.color, value: this.input.val() }) } }, t.colorpicker = i, t.fn.colorpicker = function (e) { var o = arguments, r = null, s = this.each(function () { var s = t(this), a = s.data("colorpicker"), n = "object" == typeof e ? e : {}; a || "string" == typeof e ? "string" == typeof e && (r = a[e].apply(a, Array.prototype.slice.call(o, 1))) : s.data("colorpicker", new i(this, n)) }); return "getValue" === e ? r : s }, t.fn.colorpicker.constructor = i });