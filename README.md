
<div align="center">
  <img width="150" height="150" src="http://shellscape.org/assets/images/external/loglevelnext-icon.svg">
</div>

# loglevelnext

`loglevelnext` is a modern logging library for Node.js and modern browsers,
written with modern patterns and practices, that provides log level mapping the
`console` object.

## Work In Progress

This project has not been published and is under development.

## Browser Support

As mentioned, `loglevelnext` is a logging library for Node.js and _modern_
browsers, which means the latest versions of the major browsers. Unfortunately
"oldIE" versions aren't officially supported. The minimum Internet Exploder
version supported is IE10, though [Microsoft no longer
supports it](https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support).

If you're in need of support for old or outdated browser versions, please use
the older [loglevel](loglevel), which supports browsers as old as IE6.

_Note: This library's distribution file is compiled in a way that will
technically work all the way back to IE8 - as that version and above support
`localStorage`. However, IE8 and IE9 require that the developer tools be open
prior to invoking this library._

## Attribution

_This project is a fork of the much-loved [loglevel](loglevel) module._

Base Log SVG by [Freepik](http://www.freepik.com/) from [www.flaticon.com](http://www.flaticon.com).

## License

#### [MIT](./LICENSE)


[npm]: https://img.shields.io/npm/v/webpack-dev-server.svg
[npm-url]: https://npmjs.com/package/webpack-dev-server

[node]: https://img.shields.io/node/v/webpack-dev-server.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/webpack-dev-server.svg
[deps-url]: https://david-dm.org/webpack/webpack-dev-server

[tests]: http://img.shields.io/travis/webpack/webpack-dev-server.svg
[tests-url]: https://travis-ci.org/webpack/webpack-dev-server

[cover]: https://codecov.io/gh/webpack/webpack-dev-server/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack/webpack-dev-server

[loglevel]: https://githhub.com/pimterry/loglevel
