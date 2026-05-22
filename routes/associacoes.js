const express = require('express');
const router = express.Router();
const db = require('../database/db');

db.run(`
  CREATE TABLE IF NOT EXISTS produto_fornecedor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER,
    fornecedor_id INTEGER,
    UNIQUE(produto_id, fornecedor_id)
  )
`);

router.post('/', (req, res) => {

  const { produto_id, fornecedor_id } = req.body;

  if (!produto_id || !fornecedor_id) {
    return res.status(400).json({
      erro: 'Produto e fornecedor são obrigatórios'
    });
  }

  const sql = `
    INSERT INTO produto_fornecedor
    (produto_id, fornecedor_id)
    VALUES (?, ?)
  `;

  db.run(
    sql,
    [produto_id, fornecedor_id],
    function(err) {

      if (err) {
        return res.status(400).json({
          erro: 'Fornecedor já associado a este produto!'
        });
      }

      res.status(201).json({
        mensagem: 'Fornecedor associado com sucesso ao produto!'
      });

    }
  );

});

router.get('/', (req, res) => {

  const sql = `
    SELECT
      pf.id,
      p.nome AS produto,
      f.nome_empresa AS fornecedor
    FROM produto_fornecedor pf
    JOIN produtos p ON pf.produto_id = p.id
    JOIN fornecedores f ON pf.fornecedor_id = f.id
  `;

  db.all(sql, [], (err, rows) => {

    if (err) {
      return res.status(400).json({
        erro: err.message
      });
    }

    res.json(rows);

  });

});

router.delete('/:id', (req, res) => {

  const { id } = req.params;

  db.run(
    `DELETE FROM produto_fornecedor WHERE id = ?`,
    [id],
    function(err) {

      if (err) {
        return res.status(400).json({
          erro: err.message
        });
      }

      res.json({
        mensagem: 'Associação removida com sucesso!'
      });

    }
  );

});

module.exports = router;