const { execSync } = require('child_process')
const process = require('process')

const copyRepo = async (existing, copy) => {
  const execOpt = { encoding: 'utf8', stdio: 'inherit' }
  const tempDir = 'copyrepo-tmp'
  execSync(`cd /tmp && git clone --bare https://${process.env.GITHUB_TOKEN}@github.com/${existing}.git ${tempDir}`, execOpt)
  execSync(`cd /tmp/${tempDir} && git push --mirror https://${process.env.GITHUB_TOKEN}@github.com/${copy}.git`, execOpt)
  execSync(`cd /tmp && rm -rf ${tempDir}`, execOpt)

  return true;
}

module.exports = copyRepo;
