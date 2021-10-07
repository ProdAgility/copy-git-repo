const copyRepo = require('./copyRepo')
const { findAndRename, findAndReplace } = require('./utilities')
const { execSync } = require('child_process')

jest.mock("child_process")
process.chdir = () => {}
jest.mock('./utilities', () => ({
  findAndRename: jest.fn(() => Promise.resolve()),
  findAndReplace: jest.fn(() => Promise.resolve())
}))

describe('copyRepo', () => {
  it('makes expected calls', async () => {
    await copyRepo('existing', 'copy')

    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/git clone/),
      expect.anything()
    )
    expect(findAndReplace).toHaveBeenCalledWith(
      'existing',
      'copy'
    )
    expect(findAndRename).toHaveBeenCalledWith(
      'existing',
      'copy'
    )
    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/git.*commit/),
      expect.anything()
    )
    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/git push/),
      expect.anything()
    )
    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/rm -rf/),
      expect.anything()
    )
  })
})

