var iscloseblockui = false;

(function ($, undefined) {
    /*$*/
    $.extend({
        /*加法，處理javascript在處理Float的問題*/
        "addition": function (num1, num2) {
            var r1, r2, m;
            try { r1 = num1.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = num2.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            return (num1 * m + num2 * m) / m;
        },
        /*乘法*/
        "multiplication": function (num1, num2) {
            var m = 0, s1 = (num1 == null ? 0 : num1).toString(), s2 = (num2 == null ? 0 : num2).toString();
            try { m += s1.split(".")[1].length } catch (e) { }
            try { m += s2.split(".")[1].length } catch (e) { }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        },
        /*除法*/
        "division": function (num1, num2) {
            var t1 = 0, t2 = 0, r1, r2;
            try { t1 = num1.toString().split(".")[1].length } catch (e) { }
            try { t2 = num2.toString().split(".")[1].length } catch (e) { }
            r1 = Number(num1.toString().replace(".", ""));
            r2 = Number(num2.toString().replace(".", ""));
            return (r1 / r2) * Math.pow(10, t2 - t1);
        },
        /*物件內容轉數字*/
        "tonumone": function (o) { return $.multiplication(o, 1); },
        /*物件內容轉數字*/
        "tonum": function (o, l) { for (var i in l) { o[l[i]] = $.multiplication(o[l[i]], 1); } return o; },
        /*物件內容轉數字加千分符*/
        "tonumonethou": function (o) {
            var str = $.multiplication(o, 1).toString();
            return str.replace(/\./.test(str) ? (/(\d{1,3})(?=(\d{3})+\.)/g) : (/(\d{1,3})(?=(\d{3})+$)/g), "$1,");
        },
        /*清除元件的val()的空白，並轉大寫*/
        "totrimupper": function (o) { o.val($.trim(o.val()).toUpperCase()); }
    });
    /*by element*/
    $.fn.extend({
        /*form元件轉object*/
        "serializeobject": function () {
            var o = {};
            $(this).find('input[type="hidden"], input[type="date"], input[type="number"], input[type="text"], input[type="password"], input[type="checkbox"], input[type="radio"], select ,textarea').each(function () {
                var $th = $(this)
                if (this.name === null || this.name === undefined || this.name === '') { return; }
                var elemValue = '';
                if ($th.is('select')) { elemValue = $th.find('option:selected').val(); }
                else if ($th.is('input[type="checkbox"]') || $th.is('input[type="radio"]')) { elemValue = $th.is(":checked"); }
                else { elemValue = this.value; }
                $(o).prop(this.name, elemValue);
            });
            return o;
        },
    });
})(jQuery);

$(window).on("load", function () {
    /*ajax 全域設定*/
    $.ajaxSetup({ "global": true });
    $(document)
        .ajaxStart(function (e) {
            if (iscloseblockui) { iscloseblockui = false; return; }
            $.blockUI({
                cursorReset: "wait",
                message: '<div><img alt="讀取中…" title="讀取中…" src="/Content/lightbox/loading.gif">讀取中…</div>',
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#fff',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .1,
                    color: '#FFF'
                }
            });
        })
        .ajaxStop($.unblockUI)
        .ajaxError(function (event, jqxhr, settings, thrownError) {
            $("#dvbug").text(jqxhr.responseText);
            location.href = "#dverror";
        });
});