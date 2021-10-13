const { execSync } = require('child_process')
const { findAndRename, findAndReplace } = require('./utilities')

module.exports = async (configOrExisting, copy) => {
  const execOpt = { encoding: 'utf8', stdio: 'inherit' }
  const tempDir = `${copy}-tmp`
  execSync(`rm -rf ${tempDir} && cd /tmp && git clone --bare https://${process.env.GITHUB_TOKEN}@github.com/${existing}.git ${tempDir}`, execOpt)
  process.chdir(`/tmp/${tempDir}`)
  try {
    await findAndReplace(existing, copy)
    await findAndRename(existing, copy)
  } catch (error) {
    console.log(error)
  }
  execSync(`git -c user.name="${process.env.GIT_USER_NAME}" -c user.email="${process.env.GIT_EMAIL}" commit -am "updates"`, execOpt)
  execSync(`git push --mirror https://${process.env.GITHUB_TOKEN}@github.com/${copy}.git`, execOpt)
  process.chdir(`/tmp/`)
  execSync(`rm -rf ${tempDir}`, execOpt)

  return true;
}
