const { readdir, readFile, rename, writeFile } = require('fs/promises')
const utilities = require('./utilities')
jest.mock('fs/promises', () => {
  return {
    readdir: () => [
      {name: 'x', isDirectory: () => false},
      {name: 'y', isDirectory: () => false},
      {name: 'z', isDirectory: () => false},
      {name: 'waldo.yml', isDirectory: () => false},
      {name: 'waldo.backup.spec.js', isDirectory: () => false},
      {name: 'waldo2', isDirectory: () => true}
    ],
    readFile: () => "This is a test message",
    rename: jest.fn(),
    writeFile: () => "This is a test message"
  };
});
describe('utilities', () => {
  describe('findAndRename', () => {
    it('makes expected calls', async () => {
      utilities.findAndRename('waldo', 'somethingelse')

      debugger
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
  // describe('findAndReplace', () => {
  //   it('makes expected calls', async () => {
  //     execSync.mockResolvedValue(Buffer.from('a'))
  //     execSync.mockResolvedValue(Buffer.from('b'))
  //     execSync.mockResolvedValue(Buffer.from('c'))

  //     await copyRepo('existing', 'copy')

  //     expect(execSync).toHaveBeenCalledWith(
  //       expect.stringMatching(/.*git clone.*/),
  //       expect.anything()
  //     )
  //     expect(execSync).toHaveBeenCalledWith(
  //       expect.stringMatching(/.*git push*/),
  //       expect.anything()
  //     )
  //     expect(execSync).toHaveBeenCalledWith(
  //       expect.stringMatching(/.*rm -rf.*/),
  //       expect.anything()
  //     )
  //   })
  // })
})

