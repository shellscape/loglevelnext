# MethodFactory

The `MethodFactory`, and subsequent factories that inherit from it, are
responsible for wrapping `console` methods to provide logging functionality.

## Methods

## `bindMethod(obj, methodName)`

Binds a corresponding `console` method to the object specified.

Returns: `Function`

### Parameters

### `obj`

Type: `Object`

### `methodName`

Type: `String`

### Parameters

## `distillLevel(level)`

Processes a valid level value and returns the numerical value.

Returns: `Number`

### Parameters

### `level`

Type: `Any`

The level to process.

## `levelValid(level)`

Determines if a given log level corresponds to a name or value in `levels`.

Returns: `Boolean`

### Parameters

### `level`

Type: `Any`

The level to check.

### Parameters

## `make(methodName)`

Contains logic for binding the specified method and adding it to the logger.

### Parameters

### `methodName`

Type: `String`

The method to create.

## `replaceMethods(logLevel)`

The entry point for `LogLevel` instances to request binding and wrapping of log
methods.

### Properties

### `logLevel`
Type: `String|Number`

Specifies the minimum level that will produce log output. The value must be a
`String` or `Number.`

## `levels`

Type: `Object`

Gets an object which represents the valid level name-value pairs for this log
instance. The return value will match the same property in
[`LogLevel`](LogLevel.md).

## `logger`

Type: `LogLevel`

Gets or sets the logger that the factory will operate on.

## `methods`

Type: `Array [ String ]`

Gets an `Array`of `String` containing the list of methods that the Factory will
wrap for the logger. This list is distilled from the `levels` property.
