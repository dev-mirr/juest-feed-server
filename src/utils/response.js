const httpStatus = require('http-status')

export const response = (res, data = {}, code = httpStatus.OK) => {
  let result = {
    code: code
  }

  //if (code > 339) {
  //  result.code = code
  //}

  if (typeof data === 'object') {
    result = Object.assign({
      data,
    }, result)
  }

  return res.status(code).json(result)
}