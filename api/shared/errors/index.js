module.exports = function (status, message) {
  return {
    status,
    body: message
  }
}