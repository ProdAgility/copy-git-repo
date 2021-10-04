const { readdir, readFile, rename, writeFile } = require('fs/promises')

const findAndReplace = async (keyword, replacement) => {
  return;
  console.log('find and replace beingexecuted!')
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true })
    files.forEach(async (file) => {
      try {
        if (!file.isDirectory()) {
          const fileContents = await readFile(file.name, 'utf8')
          await writeFile(file.name, fileContents.replace(keyword, replacement), 'utf8')
          return;
        }
      } catch(error) {
        console.log(error)
      }
    })
  } catch(error) {
    console.log(error)
  }
}

const findAndRename = async (currentName, newName) => {
  return;
  console.log('beingexecuted!')
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true })
    files.forEach(async (file) => {
      try {
        if (!file.isDirectory() && file.name.match(currentName)) {
          const extension = file.name.split('.').slice(1).join('.')
          const finalName = extension ? `${newName}.${extension}` : newName;
          await rename(file.name, finalName)
          return;
        }
      } catch(error) {
        console.log(error)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  findAndRename,
  findAndReplace
}
