const { readdir, readFile, rename, writeFile } = require('fs/promises')

const findAndRename = async (fileName, newName) => {
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true })
    files.forEach(async (file) => {
      try {
        if (!file.isDirectory() && file.name.match(fileName)) {
          const extension = file.name.split('.').slice(1).join('.')
          const finalName = extension ? `${newName}.${extension}` : newName;
          await rename(file.name, finalName)
          return
        }
      } catch(error) {
        console.log(error)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const findAndReplace = async (keyword, replacement) => {
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true })
    files.forEach(async (file) => {
      try {
        if (!file.isDirectory()) {
          const fileContents = await readFile(file.name, 'utf8')

          if (fileContents.includes(keyword)) {
            await writeFile(
              file.name,
              fileContents.replace(new RegExp(`${keyword}`, 'g'), replacement),
              'utf8'
            )
          }
          return
        }
      } catch(error) {
        console.log(error)
      }
    })
  } catch(error) {
    console.log(error)
  }
}

module.exports = {
  findAndRename,
  findAndReplace
}
