import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'

// Google Analytics 4. The Measurement ID is not secret (it ships to the
// browser). Loaded in production only so local development doesn't send hits.
const GA_MEASUREMENT_ID = 'G-YP8274QQR9'

// Common Room Signals. The site ID ships to the browser. Activity flows into
// the shared Common Room workspace, attributed to this site by domain.
const COMMON_ROOM_SITE_ID = 'c3ff1a35-122c-4945-9c2a-fc368b45cf1e'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          <Script id="common-room" strategy="afterInteractive">
            {`
              (function() {
                if (typeof window === 'undefined') return;
                if (typeof window.signals !== 'undefined') return;
                var script = document.createElement('script');
                script.src = 'https://cdn.cr-relay.com/v1/site/${COMMON_ROOM_SITE_ID}/signals.js';
                script.async = true;
                window.signals = Object.assign(
                  [],
                  { _opts: { apiHost: 'https://api.cr-relay.com' } },
                  ['page', 'identify', 'form'].reduce(function (acc, method){
                    acc[method] = function () {
                      signals.push([method, arguments]);
                      return signals;
                    };
                    return acc;
                  }, {})
                );
                document.head.appendChild(script);
              })();
            `}
          </Script>
        </>
      )}
    </>
  )
}
