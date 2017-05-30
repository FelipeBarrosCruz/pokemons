function Logger () {
  const consoleWrapper = {}

  Object.keys(console).forEach((index) => {
    if (typeof console[index] === 'function') {
      consoleWrapper[index] = (...arguments) => {
        if (process.env.NODE_ENV === 'development') {
          return console[index].apply(console, arguments)
        }
      }
    }
  })
  return consoleWrapper
}

module.exports = new Logger()
