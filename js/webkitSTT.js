!(function (t, n) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define([], n)
    : "object" == typeof exports
    ? (exports.WebKitSTTPluginSDK = n())
    : (t.WebKitSTTPluginSDK = n());
})(self, () =>
  (() => {
    "use strict";
    var t = {
        d: (n, e) => {
          for (var o in e)
            t.o(e, o) &&
              !t.o(n, o) &&
              Object.defineProperty(n, o, { enumerable: !0, get: e[o] });
        },
        o: (t, n) => Object.prototype.hasOwnProperty.call(t, n),
        r: (t) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "__esModule", { value: !0 });
        },
      },
      n = {};
    t.r(n), t.d(n, { WebKitSTT: () => r });
    var e = (function () {
      function t() {}
      return (
        (t.prototype.appendPickerHTMLtoChatWindowFooter = function (t) {
          this.hostInstance.chatEle
            .find(".kore-chat-footer .footerContainer")
            .append(t);
        }),
        (t.prototype.installSpeechToTextTemplate = function () {
          var t = this,
            n = t.hostInstance.$;
          (t.pickerHTML = n(t.getSpeechToTextTemplateString())),
            t.appendPickerHTMLtoChatWindowFooter(t.pickerHTML),
            t.bindEvents();
        }),
        (t.prototype.getSpeechToTextTemplateString = function () {
          return '<div class="sdkFooterIcon microphoneBtn">         <button class="notRecordingMicrophone" title="Microphone On">             <i class="microphone"></i>         </button>         <button class="recordingMicrophone" title="Microphone Off" >             <i class="microphone"></i>             <span class="recordingGif"></span>         </button>         <div id="textFromServer"></div>     </div>';
        }),
        (t.prototype.bindEvents = function () {
          var t = this,
            n = t.hostInstance.$;
          n(t.pickerHTML).on("click", ".notRecordingMicrophone", function (n) {
            t.onRecordButtonClick && t.onRecordButtonClick();
          }),
            n(t.pickerHTML).on("click", ".recordingMicrophone", function (n) {
              t.stop(),
                setTimeout(function () {
                  t.setCaretEnd(
                    document.getElementsByClassName("chatInputBox")
                  );
                }, 350);
            });
        }),
        t
      );
    })();
    var o,
      i =
        ((o = function (t, n) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, n) {
                  t.__proto__ = n;
                }) ||
              function (t, n) {
                for (var e in n)
                  Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
              }),
            o(t, n)
          );
        }),
        function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function e() {
            this.constructor = t;
          }
          o(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((e.prototype = n.prototype), new e()));
        });
    const r = (function (t) {
      function n(n) {
        var e = t.call(this) || this;
        return (
          (e.name = "WebKitSTT"),
          (e.two_line = /\n\n/g),
          (e.one_line = /\n/g),
          (e.config = n),
          e
        );
      }
      return (
        i(n, t),
        (n.prototype.onHostCreate = function () {
          var t = this;
          t.hostInstance.on("viewInit", function (n) {
            t.onInit();
          });
        }),
        (n.prototype.onInit = function () {
          this.installSpeechToTextTemplate();
        }),
        (n.prototype.onRecordButtonClick = function () {
          this.initializeWebKitSpeechRecognition(),
            this.startWebKitRecognization();
        }),
        (n.prototype.initializeWebKitSpeechRecognition = function () {
          var t = this,
            n = t.hostInstance.$;
          "webkitSpeechRecognition" in window &&
            t.isChrome() &&
            ((this.recognition = new window.webkitSpeechRecognition()),
            (this.final_transcript = ""),
            (this.recognition.continuous = !0),
            (this.recognition.interimResults = !0),
            (this.recognition.onstart = function () {
              (this.prevStr = ""),
                (t.recognizing = !0),
                n(".recordingMicrophone").css("display", "block"),
                n(".notRecordingMicrophone").css("display", "none");
            }),
            (this.recognition.onerror = function (t) {
              console.log(t.error),
                n(".recordingMicrophone").css("display", "none"),
                n(".notRecordingMicrophone").css("display", "block");
            }),
            (this.recognition.onend = function () {
              (t.recognizing = !1),
                n(".recordingMicrophone").trigger("click"),
                n(".recordingMicrophone").css("display", "none"),
                n(".notRecordingMicrophone").css("display", "block");
            }),
            (this.recognition.onresult = function (e) {
              this.final_transcript = "";
              for (var o = "", i = e.resultIndex; i < e.results.length; ++i)
                e.results[i].isFinal
                  ? (this.final_transcript += e.results[i][0].transcript)
                  : (o += e.results[i][0].transcript);
              (this.final_transcript = t.capitalize(this.final_transcript)),
                (this.final_transcript = t.linebreak(this.final_transcript)),
                (o = t.linebreak(o)),
                "" !== this.final_transcript &&
                  (this.prevStr += this.final_transcript),
                t.recognizing &&
                  (n(".chatInputBox").html(this.prevStr + "" + o),
                  n(".sendButton").removeClass("disabled")),
                setTimeout(function () {
                  t.setCaretEnd(
                    document.getElementsByClassName("chatInputBox")
                  ),
                    (document.getElementsByClassName(
                      "chatInputBox"
                    )[0].scrollTop =
                      document.getElementsByClassName(
                        "chatInputBox"
                      )[0].scrollHeight);
                }, 350);
            }));
        }),
        (n.prototype.startWebKitRecognization = function () {
          this.recognizing
            ? this.recognition.stop()
            : ((this.final_transcript = ""),
              (this.recognition.lang = this.config.lang || "en-US"),
              this.recognition.start());
        }),
        (n.prototype.isChrome = function () {
          var t = window.chrome,
            n = window.navigator,
            e = n.vendor,
            o = n.userAgent.indexOf("OPR") > -1,
            i = n.userAgent.indexOf("Edge") > -1;
          return (
            !!n.userAgent.match("CriOS") ||
            (null != t && "Google Inc." === e && !1 === o && !1 === i)
          );
        }),
        (n.prototype.linebreak = function (t) {
          return t
            .replace(this.two_line, "<p></p>")
            .replace(this.one_line, "<br>");
        }),
        (n.prototype.capitalize = function (t) {
          return t.replace(t.substr(0, 1), function (t) {
            return t.toUpperCase();
          });
        }),
        (n.prototype.setCaretEnd = function (t) {
          if (t && t.item(0) && t.item(0).innerText.length) {
            var n = document.createRange();
            n.selectNodeContents(t[0]), n.collapse(!1);
            var e = window.getSelection();
            e.removeAllRanges(), e.addRange(n), (this.prevRange = n);
          } else (this.prevRange = !1), t && t[0] && t[0].focus();
        }),
        (n.prototype.stop = function () {
          var t = this,
            n = t.hostInstance.$;
          "" !== n(".chatInputBox").text() &&
            t.hostInstance.config.autoEnableSpeechAndTTS &&
            window.chatContainerConfig.sendMessage(n(".chatInputBox"));
          n(".recordingMicrophone").css("display", "none"),
            n(".notRecordingMicrophone").css("display", "block"),
            t.recognizing && (t.recognition.stop(), (t.recognizing = !1));
        }),
        n
      );
    })(e);
    return n;
  })()
);
