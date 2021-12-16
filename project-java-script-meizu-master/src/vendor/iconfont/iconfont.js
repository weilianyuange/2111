!function (e) {
    var t, n, o, i, a,
        c = '<svg><symbol id="icon-meizu1" viewBox="0 0 5851 1024"><path d="M3028.203862 0.025201h217.430546v1023.740373h-217.430546z m-1697.247607 0H176.874768A173.710011 173.710011 0 0 0 0.35164 170.687667v853.077907h207.467421V235.272158a69.62466 69.62466 0 0 1 70.32794-68.335314h371.800373v857.063156h207.467422V166.702417h371.68316a69.62466 69.62466 0 0 1 70.32794 68.335315v788.727842h207.467421V170.687667a173.592797 173.592797 0 0 0-175.819849-170.662466z m604.117 788.727841v-193.401833h825.65001V428.439566h-825.65001V235.272158a69.507447 69.507447 0 0 1 70.32794-68.335314h798.690966V0.025201h-900.197625a173.592797 173.592797 0 0 0-176.523129 170.662466v682.41544a173.592797 173.592797 0 0 0 176.640342 170.662467h900.080412V857.088357h-798.690966a69.62466 69.62466 0 0 1-70.32794-68.335315zM4403.935572 0.025201h-928.211589v166.677216h768.449953l-737.388446 632.951456c-118.268152 97.755836-41.376271 223.877274 56.848418 223.877274h939.464058v-166.44279h-783.453246l738.443365-632.951456c119.205857-103.616498 46.885293-223.994487-53.449234-223.994487z m1238.123375 0v788.845055a69.507447 69.507447 0 0 1-70.32794 68.218101H4979.218117a69.507447 69.507447 0 0 1-70.32794-68.218101V0.025201h-206.998568v853.077906a173.710011 173.710011 0 0 0 176.405915 170.662467h795.174569a173.475584 173.475584 0 0 0 176.523128-170.662467V0.025201z m0 0" fill="#1296db" ></path></symbol></svg>',
        d = (d = document.getElementsByTagName("script"))[d.length - 1].getAttribute("data.json-injectcss"),
        l = function (e, t) {
            t.parentNode.insertBefore(e, t)
        };
    if (d && !e.__iconfont__svg__cssinject__) {
        e.__iconfont__svg__cssinject__ = !0;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
        } catch (e) {
            console && console.log(e)
        }
    }

    function s() {
        a || (a = !0, o())
    }

    function h() {
        try {
            i.documentElement.doScroll("left")
        } catch (e) {
            return void setTimeout(h, 50)
        }
        s()
    }

    t = function () {
        var e, t;
        (t = document.createElement("div")).innerHTML = c, c = null, (e = t.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", t = e, (e = document.body).firstChild ? l(t, e.firstChild) : e.appendChild(t))
    }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(t, 0) : (n = function () {
        document.removeEventListener("DOMContentLoaded", n, !1), t()
    }, document.addEventListener("DOMContentLoaded", n, !1)) : document.attachEvent && (o = t, i = e.document, a = !1, h(), i.onreadystatechange = function () {
        "complete" == i.readyState && (i.onreadystatechange = null, s())
    })
}(window);