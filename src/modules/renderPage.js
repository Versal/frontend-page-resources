import { renderToStaticMarkup } from 'react-dom/server'

const renderPage = page => {
  const pageMarkup = renderToStaticMarkup(page)
  return `<!DOCTYPE html>${pageMarkup}`
}

export default renderPage
