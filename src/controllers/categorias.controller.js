import { AppError } from '../utils/appError.js';

export class CategoriasController {
  constructor(categoriasService) {
    this.service = categoriasService;
    this.index = this.index.bind(this);
    this.nova = this.nova.bind(this);
    this.criar = this.criar.bind(this);
  }

  async index(req, res, next) {
    try {
      const categorias = await this.service.listar();
      res.render('categorias/index', { titulo: 'Categorias', categorias });
    } catch (erro) {
      next(erro);
    }
  }

  nova(req, res) {
    res.render('categorias/form', {
      titulo: 'Nova Categoria', valores: {}, erros: [],
    });
  }

  async criar(req, res, next) {
    try {
      await this.service.criar(req.body);
      req.flash('sucesso', 'Categoria cadastrada com sucesso.');
      res.redirect('/categorias');
    } catch (erro) {
      if (erro instanceof AppError && erro.status >= 400 && erro.status < 500) {
        return res.status(erro.status).render('categorias/form', {
          titulo: 'Nova Categoria', valores: req.body, erros: [erro.message],
        });
      }
      next(erro);
    }
  }
}
