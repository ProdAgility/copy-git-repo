const handler = require('./handler')
const { execSync } = require('child_process')

// jest.mock("child_process", () => {
//   return {
//     execSync: () => "This is a test message"
//   };
// });
jest.mock("child_process")
process.chdir = () => {}
jest.mock('./utilities', () => ({
  findAndRename: jest.fn(),
  findAndReplace: jest.fn()
}))
describe('handler', () => {
  fit('returns data when invoked directly', async () => {
    execSync.mockResolvedValue(Buffer.from('a'))
    execSync.mockResolvedValue(Buffer.from('b'))
    execSync.mockResolvedValue(Buffer.from('c'))

    const result = await handler({"existing": "existing_name", "copy": "copy_name"})
    expect(result).toEqual(true)
  })
  // it('returns an http response when invoked from api gateway', async () => {
  //   execSync.mockResolvedValue(Buffer.from('a'))
  //   // findAndReplace.mockResolvedValue(true)
  //   // findAndRename.mockResolvedValue(true)
  //   execSync.mockResolvedValue(Buffer.from('b'))
  //   execSync.mockResolvedValue(Buffer.from('c'))

  //   const result = await handler({body:'{"existing": "existing_name", "copy": "copy_name"}'})
  //   expect(result).toEqual({statusCode: 201, body: JSON.stringify({functionReturnValue: true})})
  // })
})
