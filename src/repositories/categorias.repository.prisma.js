import { prisma } from '../config/database.js';

export class CategoriasRepositoryPrisma {
  async listar() {
    return prisma.categoria.findMany({ orderBy: { id: 'asc' } });
  }

  async buscarPorId(id) {
    return prisma.categoria.findUnique({ where: { id } });
  }

  async criar(dados) {
    return prisma.categoria.create({ data: { nome: dados.nome } });
  }
}
