const { execSync } = require('child_process')
const { readdir, readFile, rename, writeFile } = require('fs/promises')
const process = require('process')

const copyRepo = async (existing, copy) => {
  const execOpt = { encoding: 'utf8', stdio: 'inherit' }
  const tempDir = 'copyrepo-tmp'
  execSync(`cd /tmp && git clone --bare https://${process.env.GITHUB_TOKEN}@github.com/${existing}.git ${tempDir}`, execOpt)
  process.chdir(`/tmp/${tempDir}`)
  try {
    await findAndReplace('copyRepo', 'someReplacement')
    await findAndRename('copyRepo', 'someReplacement')
  } 
  execSync(`cd /tmp/${tempDir} && git push --mirror https://${process.env.GITHUB_TOKEN}@github.com/${copy}.git`, execOpt)
  execSync(`cd /tmp && rm -rf ${tempDir}`, execOpt)

  return true;
}

const findAndReplace = async (keyword, replacement) => {
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true })
    files.forEach(async (file) => {
      try {
        if (!file.isDirectory()) {
          const fileContents = await readFile(file.name, 'utf8')
          await writeFile(file.name, fileContents.replace(keyword, replacement), 'utf8')
        }
      } catch(err) {
        console.log(err)
      }
    })
  } catch(err) {
    console.log(err)
  }
}

const findAndRename = async (currentName, newName) => {
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true })
    files.forEach(async (file) => {
      try {
        if (!file.isDirectory() && file.name.match(currentName)) {
          const extension = file.name.split('.').slice(1).join('.')
          const finalName = extension ? `${newName}.${extension}` : newName;
          await rename(file.name, finalName)
        }
      } catch(err) {
        console.log(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
}
module.exports = something;
