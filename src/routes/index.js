import { Router } from 'express';
import { CategoriasRepositoryPrisma } from '../repositories/categorias.repository.prisma.js';
import { ProdutosRepositoryPrisma } from '../repositories/produtos.repository.prisma.js';
import { CategoriasService } from '../services/categorias.service.js';
import { ProdutosService } from '../services/produtos.service.js';
import { CategoriasController } from '../controllers/categorias.controller.js';
import { ProdutosController } from '../controllers/produtos.controller.js';
import { regrasCategoria, regrasProduto, verificar } from '../middlewares/validacao.middleware.js';

export function criarRotas() {
  const router = Router();
  const categoriasRepo = new CategoriasRepositoryPrisma();
  const produtosRepo = new ProdutosRepositoryPrisma();
  const categoriasService = new CategoriasService(categoriasRepo);
  const produtosService = new ProdutosService(produtosRepo, categoriasRepo);
  const categoriasController = new CategoriasController(categoriasService);
  const produtosController = new ProdutosController(produtosService, categoriasService);

  router.get('/', (req, res) => res.redirect('/produtos'));

  router.get('/categorias', categoriasController.index);
  router.get('/categorias/nova', categoriasController.nova);
  router.post('/categorias', regrasCategoria,
    verificar('categorias/form'), categoriasController.criar);

  router.get('/produtos', produtosController.index);
  router.get('/produtos/novo', produtosController.novo);
  router.post('/produtos', regrasProduto,
    verificar('produtos/form', async () => ({
      categorias: await categoriasService.listar(),
    })), produtosController.criar);

  return router;
}
