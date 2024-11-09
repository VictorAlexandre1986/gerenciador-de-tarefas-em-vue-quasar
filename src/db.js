
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo de banco de dados
const dbPath = path.resolve(__dirname, 'tasks.db');

// Cria uma instância do banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// Cria a tabela se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      priority TEXT,
      completed INTEGER DEFAULT 0,
      due_date TEXT
    )`);
  });

module.exports = db;
