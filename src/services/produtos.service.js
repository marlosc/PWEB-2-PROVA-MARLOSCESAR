import { AppError } from '../utils/appError.js';

export class ProdutosService {
  constructor(produtosRepository, categoriasRepository) {
    this.repo = produtosRepository;
    this.categoriasRepo = categoriasRepository;
  }

  async listar() {
    return this.repo.listar();
  }

  async criar(dados) {
    const nome = typeof dados?.nome === 'string' ? dados.nome.trim() : '';
    if (!nome) throw new AppError('Informe o nome do produto.', 400);

    const preco = Number(dados?.preco);
    if (dados?.preco === '' || !Number.isFinite(preco) || preco <= 0) {
      throw new AppError('O preço precisa ser um número maior que zero.', 400);
    }

    const categoriaId = Number(dados?.categoriaId);
    if (!Number.isInteger(categoriaId) || categoriaId <= 0) {
      throw new AppError('Selecione uma categoria válida.', 422);
    }

    const categoria = await this.categoriasRepo.buscarPorId(categoriaId);
    if (!categoria) throw new AppError('A categoria informada não existe.', 422);

    return this.repo.criar({ nome, preco, categoriaId });
  }
}
