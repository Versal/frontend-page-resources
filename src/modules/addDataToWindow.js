// A injection-safe way to throw a bunch of values up into the window
// namespace.

/*
 * Usage
 *
 * ```
 * addToWindow('foo', '<script>alert("hax3d")</script>')
 * ```
 * This will safely assign the string to `window.foo`.
 */

// base 64 encode it on the page to avoid injection attacks
const addDataToWindow = (name, value) => `
window.${name} = JSON.parse(
  window.atob("${Buffer.from(JSON.stringify(value)).toString('base64')}")
) || {};
`

export default addDataToWindow
