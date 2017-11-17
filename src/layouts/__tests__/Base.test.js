import React from 'react'
import expect from 'expect'
import Base from '../Base'
import { renderToStaticMarkup } from 'react-dom/server'
import page from 'cheerio'

const getTestFixture = component => page.load(renderToStaticMarkup(component))

describe('base layout', () => {
  it('shows title', () => {
    const component = getTestFixture(
      <Base title='test title' siteUrl='http://testsite'>
        <div>test content</div>
      </Base>
    )
    expect(component('title').text()).toEqual('test title')
  })

  it('sets meta tags', () => {
    const component = getTestFixture(
      <Base title='test title' siteUrl='http://testsite'>
        <div>test content</div>
      </Base>
    )
    expect(component(`meta[content='text/html; charset=utf-8']`).length).toBeTruthy()
    expect(component(`meta[content='IE=edge']`).length).toBeTruthy()
    expect(component(`meta[content='width=device-width, initial-scale=1']`).length).toBeTruthy()
    expect(component(`meta[name='keywords']`).attr('content')).toBeTruthy()
    expect(component(`meta[property='og:image']`).attr('content')).toBeTruthy()
    expect(component(`meta[property='og:title']`).attr('content')).toBeTruthy()
    expect(component(`meta[property='og:description']`).attr('content')).toBeTruthy()
  })

  it('declares favicon', () => {
    const component = getTestFixture(
      <Base title='test title' siteUrl='http://testsite'>
        <div>test content</div>
      </Base>
    )
    expect(component(`link[rel='shortcut icon']`).attr('href')).toEqual('/favicon.ico')
  })

  it('includes site css', () => {
    const component = getTestFixture(
      <Base title='test title' siteUrl='http://testsite'>
        <div>test content</div>
      </Base>
    )
    expect(component(`link[rel='stylesheet']`).attr('href')).toEqual('http://testsite/styles/main.min.css')
  })

  it('displays content in body', () => {
    const component = getTestFixture(
      <Base title='test title' siteUrl='http://testsite'>
        <div>test content</div>
      </Base>
    )
    expect(component('body div').text()).toEqual('test content')
  })
})
