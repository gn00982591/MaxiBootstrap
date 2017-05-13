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
            ViewBag.Msg = "";
            if (string.IsNullOrWhiteSpace(id_token)) { return View(); }

            try
            {
                using (var client = new HttpClient())
                {
                    var content = new FormUrlEncodedContent(new[] { new KeyValuePair<string, string>("id_token", id_token), });

                    var result = client.PostAsync("https://www.googleapis.com/oauth2/v3/tokeninfo", content).Result;
                    var resultContent = result.Content.ReadAsStringAsync().Result;
                    var data = JsonConvert.DeserializeObject<CsGoogleOAuth>(resultContent);
                    ViewBag.Msg = resultContent;
                    if (data.email_verified) { return RedirectToAction(CsProp.isWeb_IndexViews, CsProp.isWeb_Controllers); }
                    return View();
                }
            }
            catch { return View(); }
        }

        public ActionResult Index() { return View(); }
    }
}