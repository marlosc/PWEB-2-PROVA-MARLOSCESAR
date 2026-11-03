import { prisma } from '../config/database.js';

export class ProdutosRepositoryPrisma {
  async listar() {
    return prisma.produto.findMany({
      include: { categoria: true },
      orderBy: { id: 'asc' },
    });
  }

  async criar(dados) {
    return prisma.produto.create({
      data: {
        nome: dados.nome,
        preco: dados.preco,
        categoriaId: dados.categoriaId,
      },
    });
  }
}
