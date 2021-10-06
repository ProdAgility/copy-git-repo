const utilities = require('./utilities')

const mockFileContents = {
  "x": "find text find",
  "y": "something",
  "z": "text find text",
  "waldo.yml": "",
  "waldo.backup.spec.js": "",
  "waldo2": ""
}
jest.mock('fs/promises', () => {
  return {
    readdir: () => Promise.resolve([
      {name: 'x', isDirectory: () => false},
      {name: 'y', isDirectory: () => false},
      {name: 'z', isDirectory: () => false},
      {name: 'waldo.yml', isDirectory: () => false},
      {name: 'waldo.backup.spec.js', isDirectory: () => false},
      {name: 'waldo2', isDirectory: () => true}
    ]),
    readFile: (f) => Promise.resolve(mockFileContents[f]),
    rename: jest.fn(),
    writeFile: jest.fn()
  };
});

describe('utilities', () => {
  describe('findAndRename', () => {
    const { rename } = require('fs/promises')

    it('makes expected calls', async () => {
      await utilities.findAndRename('waldo', 'somethingelse')

      expect(rename).toHaveBeenCalledWith(
        'waldo.yml',
        'somethingelse.yml'
      )
      expect(rename).toHaveBeenCalledWith(
        'waldo.backup.spec.js',
        'somethingelse.backup.spec.js'
      )
    })
  })

  describe('findAndReplace', () => {
    const { writeFile } = require('fs/promises')

    it('makes expected calls', async () => {
      await utilities.findAndReplace('find', 'replace')

      expect(writeFile).toHaveBeenCalledWith(
        'x',
        'replace text replace',
        'utf8'
      )
      expect(writeFile).toHaveBeenCalledWith(
        'z',
        'text replace text',
        'utf8'
      )
    })
  })
})

