const express = require('express');
const router = express.Router();
const db = require('../database/db');

db.run(`
  CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_empresa TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    endereco TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT NOT NULL,
    contato_principal TEXT NOT NULL
  )
`);

router.post('/', (req, res) => {
  const {
    nome_empresa,
    cnpj,
    endereco,
    telefone,
    email,
    contato_principal
  } = req.body;

  if (!nome_empresa || !cnpj || !endereco || !telefone || !email || !contato_principal) {
    return res.status(400).json({
      erro: 'Todos os campos são obrigatórios'
    });
  }

  const sql = `
    INSERT INTO fornecedores
    (nome_empresa, cnpj, endereco, telefone, email, contato_principal)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [nome_empresa, cnpj, endereco, telefone, email, contato_principal],
    function(err) {
      if (err) {
        return res.status(400).json({
          erro: 'Fornecedor com esse CNPJ já está cadastrado!'
        });
      }

      res.status(201).json({
        mensagem: 'Fornecedor cadastrado com sucesso!',
        id: this.lastID
      });
    }
  );
});

router.get('/', (req, res) => {
  db.all(`SELECT * FROM fornecedores`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ erro: err.message });
    }

    res.json(rows);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;

  const {
    nome_empresa,
    cnpj,
    endereco,
    telefone,
    email,
    contato_principal
  } = req.body;

  const sql = `
    UPDATE fornecedores
    SET nome_empresa = ?, cnpj = ?, endereco = ?, telefone = ?, email = ?, contato_principal = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [nome_empresa, cnpj, endereco, telefone, email, contato_principal, id],
    function(err) {
      if (err) {
        return res.status(400).json({ erro: err.message });
      }

      res.json({
        mensagem: 'Fornecedor atualizado com sucesso!'
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM fornecedores WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(400).json({ erro: err.message });
    }

    res.json({
      mensagem: 'Fornecedor deletado com sucesso!'
    });
  });
});

module.exports = router;