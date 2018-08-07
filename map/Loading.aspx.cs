using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AppendHeader("Access-Control-Allow-Origin", "*");

        string PATH = HttpContext.Current.Server.MapPath("files/test.txt");
        string content = System.IO.File.ReadAllText(PATH);
        Response.Write(content);
    }
}