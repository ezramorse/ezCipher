/**
 * Text animation effect for transitioning between elements in an unordered list
 *
 * Solves a random "cipher" to construct the next section of text
 *
 * @date        2014-12-02
 * @version     0.0.1
 * @copyright   Copyright (c) 2014 Ezra Morse <me@ezramorse.com>
 * @license     Released under the MIT and GPL licenses
 * @author      Ezra Morse <me@ezramorse.com>
 */
(function( $ ) {
    $.fn.ezCipher = function (options) {

        var t = this;
        t.settings = $.extend({
            steps: 18,
            activeClass: 'ezCipherActive',
            innerSteps: 4,
            time: 1.5,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        }, options);
        t.info = [];

        t._init = function () {

            t.info = [];

            this.filter("ul").each(function (h, w) {

                t.info[h] = {children: [], pMaxes: [], spans: [], current: 0};

                $(w).children('li').each(function (i, x) {

                    if (i > 0)
                        $(x).hide();
                    else
                        $(x).addClass(t.settings.activeClass);

                    t.info[h].children[i] = {p: [], li: x};

                    $(x).children('p').each(function (j, y) {

                        var c = y.textContent || y.innerText;

                        t.info[h].children[i].p[j] = {html: c.replace(/\s+/g, ' ').replace(/\s{2,}/g, ' '), c: y.className};
                        t.info[h].children[i].p[j].l = t.info[h].children[i].p[j].html.length;
                        if (!(j in t.info[h].pMaxes) || t.info[h].pMaxes[j] < t.info[h].children[i].p[j].l)
                            t.info[h].pMaxes[j] = t.info[h].children[i].p[j].l;
                    });

                });

                var li = $('<li/>');
                $(w).append(li);
                li.hide();
                t.info[h].cipher = li;
                for (var k=0; k < t.info[h].pMaxes.length; k++) {
                    var p = $('<p/>');
                    li.append(p);
                    t.info[h].spans[k] = {parent: p, children: []};
                    for (var j=0; j < t.info[h].pMaxes[k]; j++) {
                        var s = $('<span/>');
                        t.info[h].spans[k].children[j] = s;
                        p.append(s);
                    }
                }

            });

            return t;
        };

        t.transition = function (h, s) {
            if (!s) { s = h; h = 0 };
            if (s == t.info[h].current)
                return t;

            var src = t.info[h].children[t.info[h].current];
            var target = t.info[h].children[s];
            for (var k=0; k < t.info[h].pMaxes.length; k++) {
                if (k in src.p)
                    t.info[h].spans[k].parent[0].className = src.p[k].c;
                for (var j=0; j < t.info[h].spans[k].children.length; j++) {
                    if (!(k in src.p) || src.p[k].l < j)
                        t.info[h].spans[k].children[j][0].innerHTML = '';
                    else {
                        t.info[h].spans[k].children[j][0].innerHTML = src.p[k].html[j];
                    }

                    var to = '';
                    if (k in target.p && target.p[k].l > j)
                        to = target.p[k].html[j];
                    if (typeof to == "undefined") {
                        to = '';
                    }

                    var steps = Math.ceil(Math.random() * t.settings.innerSteps);
                    var time = t.settings.time/t.settings.steps;
                    var delaySteps = Math.ceil(Math.random() * (t.settings.steps - steps));
                    var states = [];

                    for (i = 1; i <= t.settings.steps; i++) {
                        if (i <= delaySteps) {
                            states[i] = t.info[h].spans[k].children[j][0].innerHTML;
                            if (states[i] == 'undefined')
                                states[i] = '';
                        } else {

                            var burnSteps = (t.settings.steps - i - steps);

                            if (steps <= 0 || burnSteps <= 0)
                                states[i] = to;
                            else {

                                var roll = Math.random()*burnSteps/steps;
                                if (roll <= 1 || i == 0) {
                                    states[i] = t.settings.chars.charAt(Math.floor(Math.random() * t.settings.chars.length));
                                } else
                                    states[i] = states[i-1];

                                steps -= 1;
                            }
                        }
                    }

                    var go = function () {

                        var span = t.info[h].spans[k].children[j];
                        span.data('states', states);
                        span.data('step', 0);

                        var i = setInterval(function() {
                            var step = span.data('step')+1;
                            var states = span.data('states');

                            span[0].innerHTML = states[step];

                            if (step >= t.settings.steps)
                                clearInterval(i);
                            else
                                span.data('step', step);

                        }, time*1000);

                    }();

                }
            }
            var swap = function (h, s) {

                var i = setInterval(function () {

                    clearInterval(i);
                    t.info[h].cipher.hide();
                    t.info[h].current = s;
                    $(t.info[h].children[t.info[h].current].li).removeClass('hidden').show().addClass(t.settings.activeClass);

                }, t.settings.time * 1000);
            };
            swap(h,s);

            $(t.info[h].children[t.info[h].current].li).hide().removeClass(t.settings.activeClass);
            t.info[h].cipher.show();


            return t;
        };

        t._init();

        return t;

    }
}( jQuery ));
