using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using MaxiBootstrap.Models;

namespace MaxiBootstrap
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = CsProp.isWeb_Controllers, action = CsProp.isWeb_IndexViews, id = UrlParameter.Optional }
            );
        }
    }
}
