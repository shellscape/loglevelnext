# LogLevel

Every instance of a log in `loglevelnext` is a `LogLevel` class. This reference
applies both to the default logger and all loggers created with `getLogger()`.

## Log Levels

By default `loglevelnext` ships supporting the following log level name-value
pairs:

```
{
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}
```

## Methods

### `constructor(options)`

The constructor for this class accepts an `options` Object. The following is a
property reference for the Object:

### `factory`

Type: `Class:MethodFactory`
Default: `null`

Specifies the factory to use when wrapping `console` methods. The value must be
a class which inherits from `MethodFactory`.

### `id`

Type: `String|Any`

By default, the identifier for a logger is set internally and equal to the
specified logger name. The caching of the loggers works off of this property.
_However_, in some environments or scenarios it may be preferable for no caching
of loggers, resulting in each logger requested being a separate instance.

_If you require multiple unique loggers of the same name, set this `id`
property to a unique identifier._

### `level`

Type: `String`
Default: `'info'`

Specifies the level the logger should use. A logger will not produce output for
any log level _beneath_ the specified level. Available levels and order are:

```js
[
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'silent'
]
```

_Note: The level names shown above correspond to the available logging methods,
with the notable exception of the `silent` level._

### `name`

Type: `String`
Default: `+new Date()`

Specifies the name of the log to create. This property is required, and used to
differentiate between loggers when `webpack-log` is used in multiple projects
executing in the same process space.

### `prefix`

The `prefix` object defines properties for adding a prefix to each bit of data
logged.

disable() {
  this.level = this.levels.SILENT;
}

### `disable`

Instructs the logger to hide output for every log level. This is equivalent
to setting the `level` property to `'silent'` or `5`.

### `enable`

Instructs the logger to produce output for every log level. This is equivalent
to setting the `level` property to `'trace'` or `0`.

### Properties

#### `level(options)`

Type: `Function`
Default: ``options => `[${options.level}]` ``

A function used to define the value used to replace instances of
`{{level}}` within the [prefix template](#template). The `options` argument will
contain an `Object` matching `{ level: (String), logger: (LogLeveL) }`. This
function should represent the current level of log producing output.

#### `name(options)`

Type: `Function`
Default: ``options => `[${options.name}]` ``

A function used to define the value used to replace instances of
`{{name}}` within the [prefix template](#template).  The `options` argument will
contain an `Object` matching `{ level: (String), logger: (LogLeveL) }`. This
function should represent the name of the logger producing output.

#### `template`

Type: `String`
Default: `'{{time}} {{level}} '`

Defines the template that represents the prefix. The template uses
[Mustache](https://mustache.github.io) syntax. When prefixing log output, the
logger will interpolate the template string and attempt to execute a function on
the `prefix` object corresponding to a given tag.

For example:

```js
{
  prefix: {
    foo: () => 'bar',
    template: '{{foo}}-'
  }
}
```

Would then result in a prefix of `'bar-'` prepended to the output for each log
method call.

### `time()`

Type: `Function`
Default: `() => new Date().toTimeString().split(' ')[0]`

A function used to define the value used to replace instances of
`{{time}}` within the [prefix template](#template). This function should
represent the time at which the logger produced output.

### Properties

#### `factory`

Type: `Class:MethodFactory`

Gets or sets the factory to use when wrapping `console` methods. When setting
this property, the value must be a class which inherits from `MethodFactory`.

#### `level`

Type: `String|Number`

Gets or sets the level the log should operate on. When setting this property, the
value must be a `String` or `Number.`

#### `levels`

Type: `Object`

Gets an object which represents the valid level name-value pairs for this log
instance.
