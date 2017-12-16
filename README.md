
<div align="center">
  <img width="150" height="150" src="http://shellscape.org/assets/images/external/loglevelnext-icon.svg">
</div>
&nbsp;  

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![devdeps][devdeps]][devdeps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]

# loglevelnext

`loglevelnext` is a modern logging library for Node.js and modern browsers,
written with modern patterns and practices, that provides log level mapping the
`console` object.

## Work In Progress

This project has not been published and is under development.

## Factories aka Plugins

If you're used to using plugins with `loglevel`, fear not. The same capabilities
are available in `loglevelnext`, but in a much more straightforward and structured
way. `loglevelnext` supports by way of "Factories." A `Factory` is nothing more
than a class which defines several base methods which operate on the `console`
and provide functionality to a `LogLevel` instance. All factories must inherit from the
[`MethodFactory`][methodFactory] class, and may override any defined class functions.

For an example factory, please have a look at the [`PrefixFactory`][prefixFactory]
which provides similar functionality as the [loglevel-prefix](loglevelpre) plugin,
and is the factory which is used when a user passes the `prefix` option to a
`LogLevel` instance.

## Browser Support

As mentioned, `loglevelnext` is a logging library for Node.js and _modern_
browsers, which means the latest versions of the major browsers. Unfortunately
"oldIE" versions aren't officially supported. The minimum Internet Exploder
version supported is IE10, though [Microsoft no longer supports it][oldie].

If you're in need of support for old or outdated browser versions, please use
the older [loglevel][loglevel], which supports browsers as old as IE6.

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

[deps]: https://david-dm.org/shellscape/loglevelnext.svg
[deps-url]: https://david-dm.org/shellscape/loglevelnext

[devdeps]: https://david-dm.org/shellscape/loglevelnext/dev-status.svg
[devdeps-url]: https://david-dm.org/shellscape/loglevelnext

[tests]: http://img.shields.io/travis/shellscape/loglevelnext.svg
[tests-url]: https://travis-ci.org/shellscape/loglevelnext

[cover]: https://codecov.io/gh/shellscape/loglevelnext/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/shellscape/loglevelnext

[loglevel]: https://githhub.com/pimterry/loglevel
[loglevelpre]: https://github.com/kutuluk/loglevel-plugin-prefix
[oldie]: https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support
[methodFactory]: lib/MethodFactory.js
[prefixFactory]: factory/PrefixFactory.js
