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