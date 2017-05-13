using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MaxiBootstrap.Models;
using System.Net.Http;
using Newtonsoft.Json;

namespace MaxiBootstrap.Controllers
{
    public class WayController : Controller
    {
        public ActionResult Login(string id_token)
        {
            if (string.IsNullOrWhiteSpace(id_token)) { return View(); }
            using (var client = new HttpClient())
            {
                var content = new FormUrlEncodedContent(new[] { new KeyValuePair<string, string>("id_token", id_token), });
                var result = client.PostAsync("https://www.googleapis.com/oauth2/v3/tokeninfo", content).Result;
                var resultContent = result.Content.ReadAsStringAsync().Result;
                var data = JsonConvert.DeserializeObject<CsGoogleOAuth>(resultContent);
                if (data.email_verified && data.azp == CsProp.isOAuth_ClientID)
                {
                    /*cookie確認*/
                    /*登入帳號確認*/
                    return RedirectToAction(CsProp.isWeb_IndexViews, CsProp.isWeb_Controllers);
                }
            }
            return Redirect("https://www.google.com.tw/");
        }

        public ActionResult Index() { return View(); }
    }
}