using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MaxiBootstrap.Models
{
    public static class CsProp
    {
        public static bool isDebug => true;
        #region isWeb
        /// <summary>
        /// 公用Controllers-Way
        /// </summary>
        public static string isWeb_Controllers = "Way";
        /// <summary>
        /// 首頁Views-Index
        /// </summary>
        public static string isWeb_IndexViews = "Index";
        /// <summary>
        /// 登入Views-Login
        /// </summary>
        public static string isWeb_LoginViews = "Login";
        #endregion isWeb

        #region Google OAuth
        /// <summary>
        /// ClientID
        /// </summary>
        public static string isOAuth_ClientID = "430580124379-tm4nmbmvqfus3a7apue0gi34mgvih6dj.apps.googleusercontent.com";
        /// <summary>
        /// ClientSecret
        /// </summary>
        public static string isOAuth_ClientSecret = "nh0xPDT2t7zgMRUm8LIyJrZJ";
        /// <summary>
        /// RedirectURI
        /// </summary>
        public static string isOAuth_RedirectURI = isDebug ? "http://localhost:61503/OAuth/oauthcallback" : "http://maxibootstrap.apphb.com/OAuth/oauthcallback";
        #endregion Google OAuth

    }
}