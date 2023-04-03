/**
   * Minified by jsDelivr using Terser v3.14.1.
   * Original file: /npm/jquery.ripples@0.6.3/dist/jquery.ripples.js
   * 
   * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
   */
  ! function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : t(e.jQuery)
  }(this, function(e) {
      "use strict";
      var t, r = (e = e && "default" in e ? e.default : e)(window);
      function i(e) {
          return "%" == e[e.length - 1]
      }
      function o(e, r, i) {
          function o(e, r) {
              var i = t.createShader(e);
              if (t.shaderSource(i, r), t.compileShader(i), !t.getShaderParameter(i, t.COMPILE_STATUS)) throw new Error("compile error: " + t.getShaderInfoLog(i));
              return i
          }
          var n = {};
          if (n.id = t.createProgram(), t.attachShader(n.id, o(t.VERTEX_SHADER, e)), t.attachShader(n.id, o(t.FRAGMENT_SHADER, r)), t.linkProgram(n.id), !t.getProgramParameter(n.id, t.LINK_STATUS)) throw new Error("link error: " + t.getProgramInfoLog(n.id));
          n.uniforms = {}, n.locations = {}, t.useProgram(n.id), t.enableVertexAttribArray(0);
          for (var a, s, u = /uniform (\w+) (\w+)/g, h = e + r; null != (a = u.exec(h));) s = a[2], n.locations[s] = t.getUniformLocation(n.id, s);
          return n
      }
      function n(e, r) {
          t.activeTexture(t.TEXTURE0 + (r || 0)), t.bindTexture(t.TEXTURE_2D, e)
      }
      function a(e) {
          var t = /url\(["']?([^"']*)["']?\)/.exec(e);
          return null == t ? null : t[1]
      }
      var s = function() {
              var e = document.createElement("canvas");
              if (!(t = e.getContext("webgl") || e.getContext("experimental-webgl"))) return null;
              var r = {};
              if (["OES_texture_float", "OES_texture_half_float", "OES_texture_float_linear", "OES_texture_half_float_linear"].forEach(function(e) {
                      var i = t.getExtension(e);
                      i && (r[e] = i)
                  }), !r.OES_texture_float) return null;
              var i = [];
              function o(e, t, i) {
                  var o = "OES_texture_" + e,
                      n = o + "_linear",
                      a = n in r,
                      s = [o];
                  return a && s.push(n), {
                      type: t,
                      arrayType: i,
                      linearSupport: a,
                      extensions: s
                  }
              }
              i.push(o("float", t.FLOAT, Float32Array)), r.OES_texture_half_float && i.push(o("half_float", r.OES_texture_half_float.HALF_FLOAT_OES, null));
              var n = t.createTexture(),
                  a = t.createFramebuffer();
              t.bindFramebuffer(t.FRAMEBUFFER, a), t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
              for (var s = null, u = 0; u < i.length; u++)
                  if (t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 32, 32, 0, t.RGBA, i[u].type, null), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, n, 0), t.checkFramebufferStatus(t.FRAMEBUFFER) === t.FRAMEBUFFER_COMPLETE) {
                      s = i[u];
                      break
                  } return s
          }(),
          u = function(e, t) {
              try {
                  return new ImageData(e, t)
              } catch (r) {
                  return document.createElement("canvas").getContext("2d").createImageData(e, t)
              }
          }(32, 32);
      e("head").prepend("<style>.jquery-ripples { position: relative; z-index: 0; }</style>");
      var h = function(r, i) {
          var o = this;
          this.$el = e(r), this.interactive = i.interactive, this.resolution = i.resolution, this.textureDelta = new Float32Array([1 / this.resolution, 1 / this.resolution]), this.perturbance = i.perturbance, this.dropRadius = i.dropRadius, this.crossOrigin = i.crossOrigin, this.imageUrl = i.imageUrl;
          var n = document.createElement("canvas");
          n.width = this.$el.innerWidth(), n.height = this.$el.innerHeight(), this.canvas = n, this.$canvas = e(n), this.$canvas.css({
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: -1
          }), this.$el.addClass("jquery-ripples").append(n), this.context = t = n.getContext("webgl") || n.getContext("experimental-webgl"), s.extensions.forEach(function(e) {
              t.getExtension(e)
          }), this.updateSize = this.updateSize.bind(this), e(window).on("resize", this.updateSize), this.textures = [], this.framebuffers = [], this.bufferWriteIndex = 0, this.bufferReadIndex = 1;
          for (var a = s.arrayType, u = a ? new a(this.resolution * this.resolution * 4) : null, h = 0; h < 2; h++) {
              var d = t.createTexture(),
                  c = t.createFramebuffer();
              t.bindFramebuffer(t.FRAMEBUFFER, c), t.bindTexture(t.TEXTURE_2D, d), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, s.linearSupport ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, s.linearSupport ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.resolution, this.resolution, 0, t.RGBA, s.type, u), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, d, 0), this.textures.push(d), this.framebuffers.push(c)
          }
          this.quad = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.quad), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), t.STATIC_DRAW), this.initShaders(), this.initTexture(), this.setTransparentTexture(), this.loadImage(), t.clearColor(0, 0, 0, 0), t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA), this.visible = !0, this.running = !0, this.inited = !0, this.destroyed = !1, this.setupPointerEvents(), requestAnimationFrame(function e() {
              o.destroyed || (o.step(), requestAnimationFrame(e))
          })
      };
      h.DEFAULTS = {
          imageUrl: null,
          resolution: 256,
          dropRadius: 20,
          perturbance: .03,
          interactive: !0,
          crossOrigin: ""
      }, h.prototype = {
          setupPointerEvents: function() {
              var e = this;
              function t(t, r) {
                  e.visible && e.running && e.interactive && e.dropAtPointer(t, e.dropRadius * (r ? 1.5 : 1), r ? .14 : .01)
              }
              this.$el.on("mousemove.ripples", function(e) {
                  t(e)
              }).on("touchmove.ripples touchstart.ripples", function(e) {
                  for (var r = e.originalEvent.changedTouches, i = 0; i < r.length; i++) t(r[i])
              }).on("mousedown.ripples", function(e) {
                  t(e, !0)
              })
          },
          loadImage: function() {
              var e = this;
              t = this.context;
              var r = this.imageUrl || a(this.originalCssBackgroundImage) || a(this.$el.css("backgroundImage"));
              if (r != this.imageSource)
                  if (this.imageSource = r, this.imageSource) {
                      var i = new Image;
                      i.onload = function() {
                          function r(e) {
                              return 0 == (e & e - 1)
                          }
                          t = e.context;
                          var o = r(i.width) && r(i.height) ? t.REPEAT : t.CLAMP_TO_EDGE;
                          t.bindTexture(t.TEXTURE_2D, e.backgroundTexture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, o), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, o), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, i), e.backgroundWidth = i.width, e.backgroundHeight = i.height, e.hideCssBackground()
                      }, i.onerror = function() {
                          t = e.context, e.setTransparentTexture()
                      }, i.crossOrigin = this.imageSource.match(/^data:/) ? null : this.crossOrigin, i.src = this.imageSource
                  } else this.setTransparentTexture()
          },
          step: function() {
              t = this.context, this.visible && (this.computeTextureBoundaries(), this.running && this.update(), this.render())
          },
          drawQuad: function() {
              t.bindBuffer(t.ARRAY_BUFFER, this.quad), t.vertexAttribPointer(0, 2, t.FLOAT, !1, 0, 0), t.drawArrays(t.TRIANGLE_FAN, 0, 4)
          },
          render: function() {
              t.bindFramebuffer(t.FRAMEBUFFER, null), t.viewport(0, 0, this.canvas.width, this.canvas.height), t.enable(t.BLEND), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), t.useProgram(this.renderProgram.id), n(this.backgroundTexture, 0), n(this.textures[0], 1), t.uniform1f(this.renderProgram.locations.perturbance, this.perturbance), t.uniform2fv(this.renderProgram.locations.topLeft, this.renderProgram.uniforms.topLeft), t.uniform2fv(this.renderProgram.locations.bottomRight, this.renderProgram.uniforms.bottomRight), t.uniform2fv(this.renderProgram.locations.containerRatio, this.renderProgram.uniforms.containerRatio), t.uniform1i(this.renderProgram.locations.samplerBackground, 0), t.uniform1i(this.renderProgram.locations.samplerRipples, 1), this.drawQuad(), t.disable(t.BLEND)
          },
          update: function() {
              t.viewport(0, 0, this.resolution, this.resolution), t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]), n(this.textures[this.bufferReadIndex]), t.useProgram(this.updateProgram.id), this.drawQuad(), this.swapBufferIndices()
          },
          swapBufferIndices: function() {
              this.bufferWriteIndex = 1 - this.bufferWriteIndex, this.bufferReadIndex = 1 - this.bufferReadIndex
          },
          computeTextureBoundaries: function() {
              var e, t = this.$el.css("background-size"),
                  o = this.$el.css("background-attachment"),
                  n = function(e) {
                      var t = e.split(" ");
                      if (1 !== t.length) return t.map(function(t) {
                          switch (e) {
                              case "center":
                                  return "50%";
                              case "top":
                              case "left":
                                  return "0";
                              case "right":
                              case "bottom":
                                  return "100%";
                              default:
                                  return t
                          }
                      });
                      switch (e) {
                          case "center":
                              return ["50%", "50%"];
                          case "top":
                              return ["50%", "0"];
                          case "bottom":
                              return ["50%", "100%"];
                          case "left":
                              return ["0", "50%"];
                          case "right":
                              return ["100%", "50%"];
                          default:
                              return [e, "50%"]
                      }
                  }(this.$el.css("background-position"));
              if ("fixed" == o ? ((e = {
                      left: window.pageXOffset,
                      top: window.pageYOffset
                  }).width = r.width(), e.height = r.height()) : ((e = this.$el.offset()).width = this.$el.innerWidth(), e.height = this.$el.innerHeight()), "cover" == t) var a = Math.max(e.width / this.backgroundWidth, e.height / this.backgroundHeight),
                  s = this.backgroundWidth * a,
                  u = this.backgroundHeight * a;
              else if ("contain" == t) a = Math.min(e.width / this.backgroundWidth, e.height / this.backgroundHeight), s = this.backgroundWidth * a, u = this.backgroundHeight * a;
              else {
                  s = (t = t.split(" "))[0] || "", u = t[1] || s;
                  i(s) ? s = e.width * parseFloat(s) / 100 : "auto" != s && (s = parseFloat(s)), i(u) ? u = e.height * parseFloat(u) / 100 : "auto" != u && (u = parseFloat(u)), "auto" == s && "auto" == u ? (s = this.backgroundWidth, u = this.backgroundHeight) : ("auto" == s && (s = this.backgroundWidth * (u / this.backgroundHeight)), "auto" == u && (u = this.backgroundHeight * (s / this.backgroundWidth)))
              }
              var h = n[0],
                  d = n[1];
              h = i(h) ? e.left + (e.width - s) * parseFloat(h) / 100 : e.left + parseFloat(h), d = i(d) ? e.top + (e.height - u) * parseFloat(d) / 100 : e.top + parseFloat(d);
              var c = this.$el.offset();
              this.renderProgram.uniforms.topLeft = new Float32Array([(c.left - h) / s, (c.top - d) / u]), this.renderProgram.uniforms.bottomRight = new Float32Array([this.renderProgram.uniforms.topLeft[0] + this.$el.innerWidth() / s, this.renderProgram.uniforms.topLeft[1] + this.$el.innerHeight() / u]);
              var f = Math.max(this.canvas.width, this.canvas.height);
              this.renderProgram.uniforms.containerRatio = new Float32Array([this.canvas.width / f, this.canvas.height / f])
          },
          initShaders: function() {
              var e = ["attribute vec2 vertex;", "varying vec2 coord;", "void main() {", "coord = vertex * 0.5 + 0.5;", "gl_Position = vec4(vertex, 0.0, 1.0);", "}"].join("\n");
              this.dropProgram = o(e, ["precision highp float;", "const float PI = 3.141592653589793;", "uniform sampler2D texture;", "uniform vec2 center;", "uniform float radius;", "uniform float strength;", "varying vec2 coord;", "void main() {", "vec4 info = texture2D(texture, coord);", "float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);", "drop = 0.5 - cos(drop * PI) * 0.5;", "info.r += drop * strength;", "gl_FragColor = info;", "}"].join("\n")), this.updateProgram = o(e, ["precision highp float;", "uniform sampler2D texture;", "uniform vec2 delta;", "varying vec2 coord;", "void main() {", "vec4 info = texture2D(texture, coord);", "vec2 dx = vec2(delta.x, 0.0);", "vec2 dy = vec2(0.0, delta.y);", "float average = (", "texture2D(texture, coord - dx).r +", "texture2D(texture, coord - dy).r +", "texture2D(texture, coord + dx).r +", "texture2D(texture, coord + dy).r", ") * 0.25;", "info.g += (average - info.r) * 2.0;", "info.g *= 0.995;", "info.r += info.g;", "gl_FragColor = info;", "}"].join("\n")), t.uniform2fv(this.updateProgram.locations.delta, this.textureDelta), this.renderProgram = o(["precision highp float;", "attribute vec2 vertex;", "uniform vec2 topLeft;", "uniform vec2 bottomRight;", "uniform vec2 containerRatio;", "varying vec2 ripplesCoord;", "varying vec2 backgroundCoord;", "void main() {", "backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);", "backgroundCoord.y = 1.0 - backgroundCoord.y;", "ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;", "gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);", "}"].join("\n"), ["precision highp float;", "uniform sampler2D samplerBackground;", "uniform sampler2D samplerRipples;", "uniform vec2 delta;", "uniform float perturbance;", "varying vec2 ripplesCoord;", "varying vec2 backgroundCoord;", "void main() {", "float height = texture2D(samplerRipples, ripplesCoord).r;", "float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;", "float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;", "vec3 dx = vec3(delta.x, heightX - height, 0.0);", "vec3 dy = vec3(0.0, heightY - height, delta.y);", "vec2 offset = -normalize(cross(dy, dx)).xz;", "float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);", "gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;", "}"].join("\n")), t.uniform2fv(this.renderProgram.locations.delta, this.textureDelta)
          },
          initTexture: function() {
              this.backgroundTexture = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this.backgroundTexture), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, 1), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR)
          },
          setTransparentTexture: function() {
              t.bindTexture(t.TEXTURE_2D, this.backgroundTexture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, u)
          },
          hideCssBackground: function() {
              var e = this.$el[0].style.backgroundImage;
              "none" != e && (this.originalInlineCss = e, this.originalCssBackgroundImage = this.$el.css("backgroundImage"), this.$el.css("backgroundImage", "none"))
          },
          restoreCssBackground: function() {
              this.$el.css("backgroundImage", this.originalInlineCss || "")
          },
          dropAtPointer: function(e, t, r) {
              var i = parseInt(this.$el.css("border-left-width")) || 0,
                  o = parseInt(this.$el.css("border-top-width")) || 0;
              this.drop(e.pageX - this.$el.offset().left - i, e.pageY - this.$el.offset().top - o, t, r)
          },
          drop: function(e, r, i, o) {
              t = this.context;
              var a = this.$el.innerWidth(),
                  s = this.$el.innerHeight(),
                  u = Math.max(a, s);
              i /= u;
              var h = new Float32Array([(2 * e - a) / u, (s - 2 * r) / u]);
              t.viewport(0, 0, this.resolution, this.resolution), t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]), n(this.textures[this.bufferReadIndex]), t.useProgram(this.dropProgram.id), t.uniform2fv(this.dropProgram.locations.center, h), t.uniform1f(this.dropProgram.locations.radius, i), t.uniform1f(this.dropProgram.locations.strength, o), this.drawQuad(), this.swapBufferIndices()
          },
          updateSize: function() {
              var e = this.$el.innerWidth(),
                  t = this.$el.innerHeight();
              e == this.canvas.width && t == this.canvas.height || (this.canvas.width = e, this.canvas.height = t)
          },
          destroy: function() {
              this.$el.off(".ripples").removeClass("jquery-ripples").removeData("ripples"), t = null, e(window).off("resize", this.updateSize), this.$canvas.remove(), this.restoreCssBackground(), this.destroyed = !0
          },
          show: function() {
              this.visible = !0, this.$canvas.show(), this.hideCssBackground()
          },
          hide: function() {
              this.visible = !1, this.$canvas.hide(), this.restoreCssBackground()
          },
          pause: function() {
              this.running = !1
          },
          play: function() {
              this.running = !0
          },
          set: function(e, t) {
              switch (e) {
                  case "dropRadius":
                  case "perturbance":
                  case "interactive":
                  case "crossOrigin":
                      this[e] = t;
                      break;
                  case "imageUrl":
                      this.imageUrl = t, this.loadImage()
              }
          }
      };
      var d = e.fn.ripples;
      e.fn.ripples = function(t) {
          if (!s) throw new Error("Your browser does not support WebGL, the OES_texture_float extension or rendering to floating point textures.");
          var r = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : void 0;
          return this.each(function() {
              var i = e(this),
                  o = i.data("ripples"),
                  n = e.extend({}, h.DEFAULTS, i.data(), "object" == typeof t && t);
              (o || "string" != typeof t) && (o ? "string" == typeof t && h.prototype[t].apply(o, r) : i.data("ripples", o = new h(this, n)))
          })
      }, e.fn.ripples.Constructor = h, e.fn.ripples.noConflict = function() {
          return e.fn.ripples = d, this
      }
  });
  //# sourceMappingURL=/sm/27fae8e73deeb1f194086cd2ebdf956b5ff872a3667b013eba744a889ea8f043.map
