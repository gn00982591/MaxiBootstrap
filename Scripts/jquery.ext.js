(function ($, undefined) {
    /*$*/
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
        .ajaxComplete(function (event, xhr, settings) { /*setTimeout(function () { $.unblockUI(); }, 100);*/ })
        .ajaxSuccess(function () { /*$("#debug").text("");*/ })
        .ajaxError(function (event, jqxhr, settings, thrownError) {
            $("#dvbug").text(jqxhr.responseText);
            location.href = "#dverror";
        });
});