const { makeMap, shiftLetter, recover, encrypt, decrypt } = require('../src/cipher')

test('makeMap shifts A by D', () => {
  const mapping = makeMap(3)
  const val = mapping.get('A')
  expect(val).toBe('D')
})

test('makeMap shifts Z by B', () => {
  const mapping = makeMap(2)
  const val = mapping.get('Z')
  expect(val).toBe('B')
})

test('shiftLetter shifts by 3', () => {
  const res = shiftLetter(0, 3)
  expect(res).toBe('D')
})

test('shiftLetter turns Z to B', () => {
  const res = shiftLetter(25, 2)
  expect(res).toBe('B')
})

test('shiftLetter turns Z to C', () => {
  const res = shiftLetter(25, 3)
  expect(res).toBe('C')
})

test('recover returns map key', () => {
  const items = new Map()
  items.set('A', 'X')
  const res = recover(items, 'X')
  expect(res).toBe('A')
})

test('encrypt returns correct cipher text', () => {
  const plain = 'ABC'
  const key = 2
  const val = encrypt(plain, key)

  expect(val).toBe('CDE')
})

test('encrypt more complex returns correct cipher text', () => {
  const plain = 'XYZ'
  const key = 2
  const val = encrypt(plain, key)

  expect(val).toBe('ZAB')
})

test('encrypt more punctuation returns correct cipher text', () => {
  const plain = 'X Y Z'
  const key = 2
  const val = encrypt(plain, key)

  expect(val).toBe('Z A B')
})

test('decrypt returns correct plain text', () => {
  const cipher = 'CDE'
  const key = 2
  const val = decrypt(cipher, key)

  expect(val).toBe('ABC')
})

test('decrypt more complex returns correct plain text', () => {
  const cipher = 'ZAB'
  const key = 2
  const val = decrypt(cipher, key)

  expect(val).toBe('XYZ')
})
