const alphabet = require('./alphabet')

function makeMap(key) {
  if (typeof key !== 'number') {
    throw new TypeError('The Key must be a number')
  }

  const mapping = new Map()

  for (let alpha of alphabet) {
    const index = alphabet.findIndex((x) => x === alpha)
    const beta = shiftLetter(index, key)
    mapping.set(alpha, beta)
  }

  return mapping
}

function shiftLetter(index, key) {
  let offset = index + key

  if (offset > 25) {
    offset = (offset % 25) - 1
  }

  return alphabet[offset]
}

function recover(items, value) {
  return [...items].find(([key, val]) => val == value)[0]
}

function encrypt(plain, key) {
  if (typeof plain !== 'string') {
    throw new TypeError('The plain text must be a string')
  }

  const mapping = makeMap(key)

  const letters = plain.split('')

  return letters
    .map((letter) => {
      if (mapping.has(letter.toUpperCase())) {
        return mapping.get(letter.toUpperCase())
      }

      return letter
    })
    .join('')
}

function decrypt(cipher, key) {
  if (typeof cipher !== 'string') {
    throw new TypeError('The cipher text must be a string')
  }

  const mapping = makeMap(key)

  const letters = cipher.split('')

  return letters
    .map((letter) => {
      if (mapping.has(letter.toUpperCase())) {
        return recover(mapping, letter.toUpperCase())
      }

      return letter
    })
    .join('')
}

module.exports = {
  makeMap,
  shiftLetter,
  recover,
  encrypt,
  decrypt,
}
