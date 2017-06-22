function validate_and_submit_forms(t) {
    var e = void 0 !== t && t.length > 0 ? t : $("form.validate-form");
    e.each(function () {
        var t = $(this); t.find(".validate-field")
            .each(function () {
                $(this).change(function () {
                    if ($(this).siblings(".alert").fadeOut("fast", function () {
                        $(this).remove()
                    }), "" != $(this).val().trim()) {
                        var e = validate_fields(t, $(this)); if (e.length > 0 && void 0 !== e[0].message && "" != e[0].message && "success" != e[0].message) { var i = '<div class="alert">' + e[0].message + "</div>"; $(this).after(i), $(this).siblings(".alert").fadeIn("fast") }
                    }
                })
            }), t.submit(function (e) { e.preventDefault(), $(this).find(".form-loader").fadeIn("fast"); var i = $(this).attr("action"); if (void 0 === i && "" == i) return !1; $(this).find(".alert").fadeOut("fast", function () { $(this).remove() }), $(this).find(".form-general-error-container").fadeOut("fast", function () { $(this).empty() }); var a = !1; return $(this).find(".validate-field").each(function () { var e = validate_fields(t, $(this)); if (e.length > 0 && void 0 !== e[0].message && "" != e[0].message && "success" != e[0].message) { var i = '<div class="alert">' + e[0].message + "</div>"; $(this).after(i), $(this).siblings(".alert").fadeIn("fast"), a = !0 } }), 1 == a ? ($(this).find(".form-loader").fadeOut("fast"), !1) : ($.ajax({ type: "POST", url: i, data: $(this).serialize(), dataType: "html", success: function (e) { t.find(".form-loader").fadeOut("fast"); var i = "Form submitted successfully." == e ? !0 : !1, a = '<div class="alert '; a += 1 == i ? "success" : "error", a += '">' + e + "</div>", t.find(".form-general-error-container").html(a).fadeIn("fast", function () { $(this).delay(1e4).fadeOut("fast", function () { $(this).remove() }) }), 1 == i && t.find(".form-control").val("") }, error: function () { t.find(".form-loader").fadeOut("fast"); var e = '<div class="alert">An error occured. Please try again later.</div>'; t.find(".form-general-error-container").html(e).fadeIn("fast") } }), void 0) })
    })
}

function validate_fields(t, e) {
    if (void 0 !== t && t.length > 0) {
        var i = void 0 !== e && e.length > 0 ? e : t.find(".validate"), a = new Array;
        return i.each(function () {
            var t = $(this).attr("data-validation-type"),
                e = $(this).hasClass("required"),
                i = $(this).val().trim(), n = new Array;
            n.field_object = $(this),
                n.message = "success",
                1 != e || "" != i && null !== i && void 0 !== i || (n.message = "This field is required"),
                "string" == t && "" != i && null !== i && void 0 !== i ? null == i.match(/^[a-z0-9 .\-]+$/i) && (n.message = "Invalid characters found.") : "email" == t && "" != i && null !== i && void 0 !== i ? null == i.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && (n.message = "Please enter a valid email address.") : "phone" == t && "" != i && null !== i && void 0 !== i && null == i.match(/^\(?\+?[\d\(\-\s\)]+$/) && (n.message = "Invalid characters found."), a.push(n)
        }), a
    }
}
function fixed_bg_image_dimensions_on_mobile() {
    var t = $("#outer-background-container"); if (t.length > 0) { var e = t.attr("data-default-background-img"); if (void 0 !== e && "" != e) if (jQuery.browser.mobile) $("body").css({ "background-image": "", "background-position": "", "background-repeat": "", "background-size": "", "background-attachment": "", background: "#000" }), t.css({ opacity: "1" }); else { var i = viewport().height + .1 * viewport().height; viewport().width + .1 * viewport().width; var a = new Image; a.src = e, $("body").css({ "background-image": "url(" + e + ")", "background-position": "top center", "background-repeat": "no-repeat", "background-attachment": "fixed", "background-size": "auto " + i + "px, cover" }), t.css({ opacity: "0" }) } }
} function contact_form_IE9_placeholder_fix() {
    var t = $("form"); t.each(function () { $(this), $(this).find(".form-control").each(function () { var t = $(this).attr("placeholder"); void 0 !== t && "" != t && ($(this).val(t), $(this).focus(function () { $(this).val() == t && $(this).val("") }), $(this).blur(function () { "" == $(this).val() && $(this).val(t) })) }) })
}