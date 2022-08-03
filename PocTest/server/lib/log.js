'use strict'

const Log = msg => {
  if (process.env.DEBUG) {
    console.log(msg)
  }
}
module.exports = {Log
}
