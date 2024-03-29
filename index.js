const { app, BrowserWindow, Menu } = require('electron')
const express = require("express");

// Keep a global reference of the window object - important
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600,
    webPreferences: { nodeIntegration: true }
  })
  win.loadFile('index.html')

  // When window is closed - stop all web servers
  win.on('closed', () => {
    win = null
  })

  // clear electron's default menu...
  win.removeMenu()
}

// Some APIs can only be used after this
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.