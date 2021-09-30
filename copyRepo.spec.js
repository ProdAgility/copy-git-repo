const copyRepo = require('./copyRepo')
const { execSync } = require('child_process')

jest.mock("child_process")
describe('copyRepo', () => {
  it('makes expected calls', async () => {
    execSync.mockResolvedValue(Buffer.from('a'))
    execSync.mockResolvedValue(Buffer.from('b'))
    execSync.mockResolvedValue(Buffer.from('c'))

    await copyRepo('existing', 'copy')

    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/.*git clone.*/),
      expect.anything()
    )
    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/.*git push*/),
      expect.anything()
    )
    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/.*rm -rf.*/),
      expect.anything()
    )
  })
})

