
<div align="center">
  <img width="150" height="150" src="http://shellscape.org/assets/images/external/loglevelnext-icon.svg">
</div>
&nbsp;  

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]

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


[npm]: https://img.shields.io/npm/v/loglevelnext.svg
[npm-url]: https://npmjs.com/package/loglevelnext

[node]: https://img.shields.io/node/v/loglevelnext.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/shellscape/loglevelnext/dev-status.svg
[deps-url]: https://david-dm.org/shellscape/loglevelnext

[tests]: http://img.shields.io/travis/shellscape/loglevelnext.svg
[tests-url]: https://travis-ci.org/shellscape/loglevelnext

[cover]: https://codecov.io/gh/shellscape/loglevelnext/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/shellscape/loglevelnext

[loglevel]: https://githhub.com/pimterry/loglevel
