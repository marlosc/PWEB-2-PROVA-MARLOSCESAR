import { AppError } from '../utils/appError.js';

export class ProdutosController {
  constructor(produtosService, categoriasService) {
    this.service = produtosService;
    this.categoriasService = categoriasService;
    this.index = this.index.bind(this);
    this.novo = this.novo.bind(this);
    this.criar = this.criar.bind(this);
  }

  async index(req, res, next) {
    try {
      const produtos = await this.service.listar();
      res.render('produtos/index', { titulo: 'Produtos', produtos });
    } catch (erro) {
      next(erro);
    }
  }

  async novo(req, res, next) {
    try {
      const categorias = await this.categoriasService.listar();
      res.render('produtos/form', {
        titulo: 'Novo Produto', valores: {}, erros: [], categorias,
      });
    } catch (erro) {
      next(erro);
    }
  }

  async criar(req, res, next) {
    try {
      await this.service.criar(req.body);
      req.flash('sucesso', 'Produto cadastrado com sucesso.');
      res.redirect('/produtos');
    } catch (erro) {
      if (erro instanceof AppError && erro.status >= 400 && erro.status < 500) {
        try {
          const categorias = await this.categoriasService.listar();
          return res.status(erro.status).render('produtos/form', {
            titulo: 'Novo Produto', valores: req.body,
            erros: [erro.message], categorias,
          });
        } catch (erroLista) {
          return next(erroLista);
        }
      }
      next(erro);
    }
  }
}
