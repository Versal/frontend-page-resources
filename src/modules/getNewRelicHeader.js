const getNewRelicHeader = isEnabled => {
  if (!isEnabled) return null
  const newrelic = require('newrelic').default
  return newrelic.getBrowserTimingHeader()
}

export default getNewRelicHeader
