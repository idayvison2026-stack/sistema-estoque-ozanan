const express = require('express');
const router = express.Router();
const db = require('../database/db');

db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    codigo_barras TEXT UNIQUE,
    quantidade INTEGER,
    categoria TEXT
  )
`);

router.post('/', (req, res) => {

  const {
    nome,
    descricao,
    codigo_barras,
    quantidade,
    categoria
  } = req.body;

  if (!nome || !descricao) {
    return res.status(400).json({
      erro: 'Nome e descrição são obrigatórios'
    });
  }

  const sql = `
    INSERT INTO produtos
    (nome, descricao, codigo_barras, quantidade, categoria)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [nome, descricao, codigo_barras, quantidade, categoria],
    function(err) {

      if (err) {
        return res.status(400).json({
          erro: err.message
        });
      }

      res.status(201).json({
        mensagem: 'Produto cadastrado com sucesso!',
        id: this.lastID
      });

    }
  );

});

router.get('/', (req, res) => {

  const sql = `SELECT * FROM produtos`;

  db.all(sql, [], (err, rows) => {

    if (err) {
      return res.status(400).json({
        erro: err.message
      });
    }

    res.json(rows);

  });

});

router.put('/:id', (req, res) => {

  const { id } = req.params;

  const {
    nome,
    descricao,
    codigo_barras,
    quantidade,
    categoria
  } = req.body;

  const sql = `
    UPDATE produtos
    SET
      nome = ?,
      descricao = ?,
      codigo_barras = ?,
      quantidade = ?,
      categoria = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [
      nome,
      descricao,
      codigo_barras,
      quantidade,
      categoria,
      id
    ],
    function(err) {

      if (err) {
        return res.status(400).json({
          erro: err.message
        });
      }

      res.json({
        mensagem: 'Produto atualizado com sucesso!'
      });

    }
  );

});
router.delete('/:id', (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM produtos
    WHERE id = ?
  `;

  db.run(sql, [id], function(err) {

    if (err) {
      return res.status(400).json({
        erro: err.message
      });
    }

    res.json({
      mensagem: 'Produto deletado com sucesso!'
    });

  });

});
module.exports = router;