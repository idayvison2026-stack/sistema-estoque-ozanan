const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/estoque.db', (err) => {
  if (err) {
    console.error('Erro ao conectar banco:', err.message);
  } else {
    console.log('Banco SQLite conectado 🚀');
  }
});

module.exports = db;