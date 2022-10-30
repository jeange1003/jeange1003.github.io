async function pickFile() {
  const fileHandler = await window.showOpenFilePicker()
  let log = ''
  log += '选取了文件：'
  fileHandler.forEach(handler => {
    log += handler.name + '\r\n'
  })
  const pickFileLogElement = document.getElementById('pickFileLog')
  pickFileLogElement.innerText = log
}

async function pickMultipleFile() {
  const pickerOpts = {
    multiple: true
  };
  const fileHandler = await window.showOpenFilePicker(pickerOpts)
  let log = ''
  log += '选取了文件：\r\n'
  fileHandler.forEach(handler => {
    log += handler.name + '\r\n'
  })
  const pickMultipleFileLogElement = document.getElementById('pickMultipleFileLog')
  pickMultipleFileLogElement.innerText = log
}

async function pickSpecificTypeFile() {
  const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };
  const fileHandler = await window.showOpenFilePicker(pickerOpts)
  let log = ''
  log += '选取了文件：\r\n'
  fileHandler.forEach(handler => {
    log += handler.name + '\r\n'
  })
  const pickSpecificTypeFileLogElement = document.getElementById('pickSpecificTypeFileLog')
  pickSpecificTypeFileLogElement.innerText = log
}

async function pickTextFileAndReadIt() {
  const pickerOpts = {
    types: [
      {
        description: 'Text',
        accept: {
          'text/plain': ['.txt']
        }
      },
    ]
  };
  const [fileHandler] = await window.showOpenFilePicker(pickerOpts)
  let log = ''
  log += '文件内容：\r\n'
  const file = await fileHandler.getFile()
  const fileContent = await file.text()
  log += fileContent
  const pickTextFileAndReadItLogElement = document.getElementById('pickTextFileAndReadItLog')
  pickTextFileAndReadItLogElement.innerText = log
}

let writableFileHandler
async function pickFileAndCreateWritable() {
  const pickerOpts = {
    types: [
      {
        description: 'Text',
        accept: {
          'text/plain': ['.txt']
        }
      },
    ]
  };
  const fileHandlers = await window.showOpenFilePicker(pickerOpts)
  writableFileHandler = fileHandlers[0]
  const writableFile = await writableFileHandler.getFile()
  const fileContent = await writableFile.text()
  const writableFileContentElement = document.getElementById('writableFileContent')
  writableFileContentElement.value = fileContent
}

async function saveToWritableFile() {
  const writable = await writableFileHandler.createWritable()
  const newContent = document.getElementById('writableFileContent').value
  await writable.write(newContent)
  await writable.close()
  const logEl = document.getElementById('saveToWritableFileLog')
  logEl.innerText = '写入成功，打开文件看看吧'
}

async function saveFile() {
  const fileHandles = await window.showSaveFilePicker({
    suggestedName: 'a.txt'
  })
  const writable = await fileHandles.createWritable()
  const saveFileContentEl = document.getElementById('saveFileContent')
  const content = saveFileContentEl.value
  await writable.write(content)
  await writable.close()
  const logEl = docuemnt.getElementById('saveFileLog')
  logEl.value = '保存成功，打开文件看看吧'
}

async function pickDirectory() {
  const directoryHandle = await window.showDirectoryPicker()
  const entries = await directoryHandle.entries()
  let log = ''
  for await (let entry of entries) {
    log += `name: ${entry[0]}, type: ${entry[1].kind} \r\n`
  }
  const logEl = document.getElementById('pickDirectoryLog')
  logEl.innerText = log
}

let directoryToCreateSubdirectoryHandle
async function pickDirectoryToCreateSubdirectory() {
  directoryToCreateSubdirectoryHandle = await window.showDirectoryPicker()
  document.getElementById('pickDirectoryToCreateSubdirectoryLog').innerText = '选择成功，请输入要创建的文件夹名称，然后点击创建按钮'
}

async function createDirectory() {
  const name = document.getElementById('directoryNameToCreate').value
  const logEl = document.getElementById('createDirectoryLog')
  if (name === '') {
    logEl.innerText = '输入的名字不能为空'
    return
  } else {
    logEl.innerText = ''
  }
  await directoryToCreateSubdirectoryHandle.getDirectoryHandle(name, { create: true })
  logEl.innerText = '文件夹创建成功，去看看吧'
}