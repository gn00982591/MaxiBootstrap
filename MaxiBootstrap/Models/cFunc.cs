using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MaxiBootstrap.Models
{
    public static class CsFunc
    {
        #region DateTime
        /// <summary>
        /// 取得台灣的時間
        /// </summary>
        public static DateTime ToTwDateTime(this DateTime o)
        { return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Taipei Standard Time")); }

        /// <summary>
        /// 日期輸出中文星期
        /// </summary>
        public static string ToTwWeek(this DateTime o) { return o.ToString("dddd", new System.Globalization.CultureInfo("zh-TW")); }

        /// <summary>
        /// 日期格試輸出設定
        /// </summary>
        public static string ToDate(this DateTime o) { return o.ToString("yyyy-MM-dd"); }

        /// <summary>
        /// 日期格試輸出設定
        /// </summary>
        public static string ToDateTime(this DateTime o) { return o.ToString("yyyy-MM-dd HH:mm:ss"); }

        #endregion DateTime
    }
}