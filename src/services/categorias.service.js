import { AppError } from '../utils/appError.js';

export class CategoriasService {
  constructor(categoriasRepository) {
    this.repo = categoriasRepository;
  }

  async listar() {
    return this.repo.listar();
  }

  async criar(dados) {
    const nome = typeof dados?.nome === 'string' ? dados.nome.trim() : '';
    if (!nome) throw new AppError('Informe o nome da categoria.', 400);
    return this.repo.criar({ nome });
  }
}
