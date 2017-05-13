using MaxiBootstrap.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using MaxiBootstrap.Models;
using System.Net.Http;

namespace MaxiBootstrap.Controllers
{
    [AllowAnonymous]
    public class OAuthController : Controller
    {
        public ActionResult oauthcallback(string id_token)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var content = new FormUrlEncodedContent(new[]{
                      new KeyValuePair<string, string>("id_token", id_token),
                  });

                    var result = client.PostAsync("https://www.google.com/recaptcha/api/siteverify", content).Result;
                    var resultContent = result.Content.ReadAsStringAsync().Result;
                    var data = JsonConvert.DeserializeObject<CsGoogleOAuth>(resultContent);

                    return RedirectToAction(data.email_verified ? CsProp.isWeb_IndexViews : CsProp.isWeb_LoginViews, CsProp.isWeb_Controllers);
                }
            }
            catch { return RedirectToAction(CsProp.isWeb_LoginViews, CsProp.isWeb_Controllers); }
            ////由于是https，这里必须要转换为HttpWebRequest
            //var webRequest = WebRequest.Create("https://accounts.google.com/o/oauth2/token") as HttpWebRequest;
            //webRequest.Method = "POST";
            //webRequest.ContentType = "application/x-www-form-urlencoded";

            ////参考https://developers.google.com/accounts/docs/OAuth2WebServer
            //var postData = $"code={Request.QueryString["code"]}&client_id={CsProp.isOAuth_ClientID}&client_secret={CsProp.isOAuth_ClientSecret}&redirect_uri={CsProp.isOAuth_RedirectURI}&grant_type=authorization_code";

            ////在HTTP POST请求中传递参数
            //using (var sw = new StreamWriter(webRequest.GetRequestStream()))
            //{ sw.Write(postData); }

            ////发送请求，并获取服务器响应
            //var resonseJson = "";
            //using (var response = webRequest.GetResponse())
            //using (var sr = new StreamReader(response.GetResponseStream()))
            //{ resonseJson = sr.ReadToEnd(); }

            ////通过Json.NET对服务器返回的json字符串进行反序列化，得到access_token
            //var accessToken = JsonConvert.DeserializeAnonymousType(resonseJson, new { access_token = "", expires_in = "" });
            //Response.Cookies.Add(new HttpCookie(FormsAuthentication.FormsCookieName, FormsAuthentication.Encrypt(
            //    new FormsAuthenticationTicket(
            //        version: 1,
            //        name: Convert.ToBase64String(new SHA512CryptoServiceProvider().ComputeHash(Encoding.Default.GetBytes(accessToken.expires_in))),
            //        issueDate: DateTime.Now.ToTwDateTime(),
            //        expiration: DateTime.Now.ToTwDateTime().AddMinutes(20),
            //        isPersistent: false,
            //        userData: Convert.ToBase64String(new SHA512CryptoServiceProvider().ComputeHash(Encoding.Default.GetBytes(accessToken.access_token))),
            //        cookiePath: FormsAuthentication.FormsCookiePath)
            //)));
            return RedirectToAction(CsProp.isWeb_LoginViews, CsProp.isWeb_Controllers);
        }
    }
}