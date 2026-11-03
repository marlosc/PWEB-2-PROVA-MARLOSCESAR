import { body, validationResult } from 'express-validator';

export const regrasCategoria = [
  body('nome').trim().notEmpty().withMessage('Informe o nome da categoria.'),
];

export const regrasProduto = [
  body('nome').trim().notEmpty().withMessage('Informe o nome do produto.'),
  body('preco').notEmpty().withMessage('Informe o preço.')
    .bail().isFloat({ gt: 0 }).withMessage('O preço deve ser maior que zero.'),
  body('categoriaId').notEmpty().withMessage('Escolha uma categoria.')
    .bail().isInt({ gt: 0 }).withMessage('Escolha uma categoria válida.'),
];

// Reexibe o formulário (sem redirect) para que o navegador mostre os erros.
export function verificar(view, montarDadosDaView = async () => ({})) {
  return async (req, res, next) => {
    const resultado = validationResult(req);
    if (resultado.isEmpty()) return next();

    try {
      const extras = await montarDadosDaView(req);
      res.status(422).render(view, {
        titulo: view.startsWith('categorias/') ? 'Nova Categoria' : 'Novo Produto',
        valores: req.body,
        erros: resultado.array().map((erro) => erro.msg),
        ...extras,
      });
    } catch (erro) {
      next(erro);
    }
  };
}
