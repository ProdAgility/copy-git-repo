const { execSync } = require('child_process')
const { findAndRename, findAndReplace } = require('./utilities')

module.exports = async (existing, copy) => {
  const execOpt = { encoding: 'utf8', stdio: 'inherit' }
  const tempDir = 'copyrepo-tmp'
  execSync(`cd /tmp && git clone --bare https://${process.env.GITHUB_TOKEN}@github.com/${existing}.git ${tempDir}`, execOpt)
  process.chdir(`/tmp/${tempDir}`)
  try {
    await findAndReplace('copyRepo', 'someReplacement')
    await findAndRename('copyRepo', 'someReplacement')
  } catch (error) {
    console.log(error)
  }
  execSync(`git -c user.name='${process.env.GIT_USER_NAME}' -c user.email='${process.env.GIT_EMAIL}' commit -m 'updates'`)
  execSync(`git push --mirror https://${process.env.GITHUB_TOKEN}@github.com/${copy}.git`, execOpt)
  execSync(`rm -rf ${tempDir}`, execOpt)

  return true;
}
