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