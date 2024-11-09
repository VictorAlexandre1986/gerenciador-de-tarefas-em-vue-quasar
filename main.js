const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./src/db.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:5173'); // URL do Vite
}

// Manipuladores IPC para tarefas
ipcMain.handle('add-task', (event, task) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO tasks (title, priority) VALUES (?, ?)');
      stmt.run(task.title, task.priority, function(err) {
        if (err) {
          console.error('Erro ao adicionar tarefa:', err.message);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  });
  
  ipcMain.handle('get-tasks', () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
  
  ipcMain.handle('update-task-due-date', (event, { id, due_date }) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('UPDATE tasks SET due_date = ? WHERE id = ?');
      stmt.run(due_date.toISOString(), id, function(err) {
        if (err) {
          console.error('Erro ao atualizar data de vencimento:', err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
  
  app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
  

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
