export type EmailTemplateProps = {
  type: EmailTypeProps;
  email: string;
  subject: string;
};

export type EmailTypeProps =
  | {
      kind: EmailTypeEnum.VERIFICATION;
    }
  | {
      kind: EmailTypeEnum.OTP;
      otpCode: string;
    };

export enum EmailTypeEnum {
  VERIFICATION,
  OTP,
}

export function EmailTemplate({ email, type }: EmailTemplateProps): string {
  if (type.kind === EmailTypeEnum.OTP) {
    return OTPEmailTemplate({ email, otpCode: type.otpCode });
  }

  return `<p>Hello ${email}, please verify your email.</p>`;
}

export function OTPEmailTemplate({
  email,
  otpCode,
}: {
  email: string;
  otpCode: string;
}): string {
  return `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  
  
    <style type="text/css">
      
      @media only screen and (min-width: 720px) {
        .u-row {
          width: 700px !important;
        }

        .u-row .u-col {
          vertical-align: top;
        }

        
            .u-row .u-col-100 {
              width: 700px !important;
            }
          
      }

      @media only screen and (max-width: 720px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }

        .u-row {
          width: 100% !important;
        }

        .u-row .u-col {
          display: block !important;
          width: 100% !important;
          min-width: 320px !important;
          max-width: 100% !important;
        }

        .u-row .u-col > div {
          margin: 0 auto;
        }

}
    
body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}


table, td { color: #ffffff; } #u_body a { color: #0071e3; text-decoration: underline; } #u_content_text_17 a { color: #d2d2d7; text-decoration: none; }
    </style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #ffffff">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table role="presentation" id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;" bgcolor="#000000"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="700" align="center" style="border-collapse: collapse;"><tr><td style="padding:0;"><![endif]-->
    


<div class="u-row-container" style="padding: 0px;background-color: transparent;">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:helvetica,sans-serif;" align="left">
        
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://assets.unlayer.com/projects/139/1676495528722-apple_logo_circle_f5f5f7-000_2x.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 15%;max-width: 102px;" width="102" height="102"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:helvetica,sans-serif;" align="left">
        
  <!--[if mso]><table role="presentation" width="100%"><tr><td><![endif]-->
    <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 48px; font-weight: 400;"><span>Aderas</span></h1>
  <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:helvetica,sans-serif;" align="left">
        
  <!--[if mso]><table role="presentation" width="100%"><tr><td><![endif]-->
    <h2 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 28px; font-weight: 400;"><span>Hello ${email}, Here is your email OTP verification</span></h2>
  <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
        
  <div style="font-size: 17px; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="line-height: 140%;">${otpCode}</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td></tr></table></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>





<div class="u-row-container" style="padding: 15px 15px 70px;background-color: transparent;">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 15px 15px 70px;background-color: transparent;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
        
  <div style="font-size: 16px; font-weight: 700; color: #9d9d9d; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="line-height: 140%;">Do not share this code with anybody.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td></tr></table></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>





<div class="u-row-container" style="padding: 10px 10px 50px;background-color: #1d1d1f;">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px 10px 50px;background-color: #1d1d1f;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 30px;"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:helvetica,sans-serif;" align="left">
        
<div aria-label="menu" class="menu" style="text-align:center;">
<!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style=""><tr><![endif]-->

  <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
  
    <a aria-label="Menu item - Shop Online" href="https://www.apple.com/" target="_self" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-size:14px;text-decoration:none" >
      Shop Online
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    <span aria-label="menu separator" style="padding:5px 10px;display:inline-block;color:#424245;font-size:14px;">
      |
    </span>
    <!--[if (mso)|(IE)]></td><![endif]-->
  

  <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
  
    <a aria-label="Menu item - Find a Store" href="https://www.apple.com/" target="_self" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-size:14px;text-decoration:none" >
      Find a Store
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    <span aria-label="menu separator" style="padding:5px 10px;display:inline-block;color:#424245;font-size:14px;">
      |
    </span>
    <!--[if (mso)|(IE)]></td><![endif]-->
  

  <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
  
    <a aria-label="Menu item - 1-800-MY-APPLE" href="https://www.apple.com/" target="_self" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-size:14px;text-decoration:none" >
      1-800-MY-APPLE
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    <span aria-label="menu separator" style="padding:5px 10px;display:inline-block;color:#424245;font-size:14px;">
      |
    </span>
    <!--[if (mso)|(IE)]></td><![endif]-->
  

  <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
  
    <a aria-label="Menu item - Get the Apple Store App" href="https://www.apple.com/" target="_self" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-size:14px;text-decoration:none" >
      Get the Apple Store App
    </a>
  
  <!--[if (mso)|(IE)]></td><![endif]-->
  

<!--[if (mso)|(IE)]></tr></table><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
        
  <table role="presentation" aria-label="divider" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;border-top: 1px solid #424245;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <!--[if gte mso 15]>&nbsp;<![endif]-->
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_17" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
        
  <div style="font-size: 12px; color: #86868b; line-height: 200%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 200%;">If you reside in the U.S. territories, please call Goldman Sachs at 877-255-5923 with questions about Apple Card.</p>
<p style="line-height: 200%;">TM and © 2023 Apple Inc. One Apple Park Way, MS 96-DM, Cupertino, CA 95014.</p>
<p style="line-height: 200%;"><a rel="noopener" href="https://www.apple.com/" target="_blank">All Rights Reserved</a>    |   <a rel="noopener" href="https://www.apple.com/" target="_blank">Privacy Policy</a>    |   <a rel="noopener" href="https://www.apple.com/" target="_blank">My Apple ID</a></p>
<p style="line-height: 200%;">If you prefer not to receive commercial email from Apple, or if you’ve changed your email address, please <a rel="noopener" href="https://www.apple.com/" target="_blank">click here</a>.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td></tr></table></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>

        `;
}
