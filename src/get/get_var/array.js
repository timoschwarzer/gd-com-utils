const { ARRAY } = require('../../constants')

/**
 * Decode Array
 * @param genericDecoder
 * @param buf {Buffer}
 * @returns {{value: Array, length: Number}}
 */
function getVarArray (genericDecoder, buf) {
  const nbEntries = buf.readUInt32LE(0) & 0x7FFFFFFF
  // const shared = !!buf.readUInt32LE(0) & 0x80000000

  // start at 4 cause of nbEntries
  const data = {
    array: [],
    buffer: buf.slice(4),
    pos: 4
  }

  for (let index = 0; index < nbEntries; index++) {
    const decodedValue = genericDecoder(data.buffer)
    data.array.push(decodedValue.value)
    data.buffer = data.buffer.slice(decodedValue.length + 4)
    data.pos += decodedValue.length + 4
  }

  return {
    value: data.array,
    length: data.pos
  }
}

module.exports = {
  decode: getVarArray,
  type: ARRAY
}
