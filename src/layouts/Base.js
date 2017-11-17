import React, { PropTypes } from 'react'
import addDataToWindow from '../modules/addDataToWindow'
import buildGoogleAnalyticsHeadScript from '../modules/buildGoogleAnalyticsHeadScript'
import googleAnalyticsBodyScript from '../modules/googleAnalyticsBodyScript'
import segmentAnalyticsBodyScript from '../modules/segmentAnalyticsBodyScript'
import getNewRelicHeader from '../modules/getNewRelicHeader'

const Base = ({
  title,
  siteUrl,
  newRelicEnabled,
  googleAnalyticsId,
  optimizelyProjectId,
  segmentAnalyticsConfig,
  children
}) => (
  <html>
    <head>
      <title>{title}</title>

      {getNewRelicHeader(newRelicEnabled)}

      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content='versal, versal.com, Versal Group Inc.' />
      <meta name='description' content='Versal Group, Inc.' />
      <meta property='og:image' content='/assets/img/fb-og.png' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content='One idea can launch a million more' />

      <link rel='shortcut icon' href='/favicon.ico' />
      <link rel='stylesheet' href={`${siteUrl}/styles/main.min.css`} />

      {googleAnalyticsId && (
        <script type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: buildGoogleAnalyticsHeadScript(googleAnalyticsId)
          }} />
      )}

      {optimizelyProjectId && (
        <script
          type='text/javascript'
          src={`//cdn.optimizely.com/js/${optimizelyProjectId}.js`} />
      )}
    </head>

    <body>
      {children}

      {googleAnalyticsId && (
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{ __html: googleAnalyticsBodyScript }} />
      )}

      {segmentAnalyticsConfig && (
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{ __html: segmentAnalyticsBodyScript }} />
      )}

      {segmentAnalyticsConfig && (
        <script
          type='text/javascript'
          src={`${siteUrl}/scripts/scriptAnalytics.js`} />
      )}

      {segmentAnalyticsConfig && (
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: addDataToWindow(
              'segmentAnalyticsConfig',
              segmentAnalyticsConfig
            )
          }} />
      )}
    </body>
  </html>
)

Base.defaults = {
  newRelicEnabled: false,
  googleAnalyticsId: null,
  segmentAnalyticsId: null,
  optimizelyProjectId: null
}

Base.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
  newRelicEnabled: PropTypes.bool,
  googleAnalyticsId: PropTypes.string,
  segmentAnalyticsId: PropTypes.string,
  optimizelyProjectId: PropTypes.string
}

export default Base
