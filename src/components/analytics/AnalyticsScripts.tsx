import Script from "next/script";
import { prisma } from "@/lib/prisma";

async function getAnalyticsSettings() {
  try {
    return await prisma.analyticsSettings.findUnique({ where: { id: "singleton" } });
  } catch {
    return null;
  }
}

/** Renders in <head> (or right after it): GA gtag.js, the GTM head script,
 * and any custom head snippet. Server component — reads settings itself. */
export async function AnalyticsHead() {
  const settings = await getAnalyticsSettings();
  if (!settings) return null;

  return (
    <>
      {settings.gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.gaMeasurementId}');`}
          </Script>
        </>
      )}
      {settings.gtmContainerId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${settings.gtmContainerId}');`}
        </Script>
      )}
      {settings.customHeadSnippet && (
        <span dangerouslySetInnerHTML={{ __html: settings.customHeadSnippet }} />
      )}
    </>
  );
}

/** Renders right after <body> opens: the GTM <noscript> iframe fallback and
 * any custom body snippet. */
export async function AnalyticsBody() {
  const settings = await getAnalyticsSettings();
  if (!settings) return null;

  return (
    <>
      {settings.gtmContainerId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${settings.gtmContainerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
      )}
      {settings.customBodySnippet && (
        <span dangerouslySetInnerHTML={{ __html: settings.customBodySnippet }} />
      )}
    </>
  );
}
