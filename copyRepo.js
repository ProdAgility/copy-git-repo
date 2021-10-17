const { execSync } = require('child_process')
const { findAndRename, findAndReplace } = require('./utilities')

module.exports = async (existing, copy) => {
  const execOpt = { encoding: 'utf8', stdio: 'inherit' }
  const tempDir = `repo`
  process.chdir(`/tmp/`)
  execSync(`rm -rf ${tempDir} && git clone https://${process.env.GITHUB_TOKEN}@github.com/${existing}.git ${tempDir}`, execOpt)

  process.chdir(`/tmp/${tempDir}`)
  execSync(`rm -rf .git/`, execOpt)
  try {
    await findAndReplace(existing, copy)
    await findAndRename(existing, copy)
  } catch (error) {
    console.log(error)
  }
  execSync(`git init`, execOpt)
  execSync(`git status`, execOpt)
  execSync(`git add .`, execOpt)
  execSync(`git status`, execOpt)
  execSync(`git -c user.name="${process.env.GIT_USER_NAME}" -c user.email="${process.env.GIT_EMAIL}" commit -m "updates"`, execOpt)
  execSync(`git push --set-upstream https://${process.env.GITHUB_TOKEN}@github.com/${copy}.git master`, execOpt)

  process.chdir(`/tmp/`)
  execSync(`rm -rf ${tempDir}`, execOpt)

  return true;
}
