using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;
using System.Data;


public partial class _Default : System.Web.UI.Page
{
    private string PATH = HttpContext.Current.Server.MapPath("files/test.txt");
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AppendHeader("Access-Control-Allow-Origin", "*");
        var sr = new StreamReader(Request.InputStream);
        string content = sr.ReadToEnd();
        if (content != null)
        {
            Response.Write("zapisano");
            SaveFile(content);
        }
        else
        {
            Response.Write("nie udało się zapisać");
        }
        //

    }
    private void SaveFile(string content )
    {
        //Response.Write("test");
        StreamWriter writer = new StreamWriter(PATH, true, Encoding.UTF8);
        writer.Write(content+"\r\n");
        writer.Close();
    }
}