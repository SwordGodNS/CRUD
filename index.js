const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function criarCliente(name, lastName, cpf, address) {
  try {
    const novoCliente = await prisma.cliente.create({
      data: {
        name,
        lastName,
        cpf,
        address,
      },
    });
    console.log('Novo cliente criado com sucesso:', novoCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
  }
}

async function listarClientes() {
  try {
    const clientes = await prisma.cliente.findMany();
    console.log('Lista de clientes:');
    console.table(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
  }
}

async function encontrarClientePorId(id) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
    });
    console.log('Cliente encontrado pelo ID:', cliente);
  } catch (error) {
    console.error('Erro ao encontrar cliente pelo ID:', error);
  }
}

async function atualizarCliente(id, newData) {
  try {
    const clienteAtualizado = await prisma.cliente.update({
      where: { id },
      data: newData,
    });
    console.log('Cliente atualizado com sucesso:', clienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
  }
}

async function excluirCliente(id) {
  try {
    const clienteExcluido = await prisma.cliente.delete({
      where: { id },
    });
    console.log('Cliente excluído com sucesso:', clienteExcluido);
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
  }
}

async function main() {
  console.log('Iniciando operações CRUD para a tabela Cliente...');

  // Criando alguns clientes de exemplo
  await criarCliente('João', 'Silva', '12345678900', 'Rua das Flores, 123');
  await criarCliente('Maria', 'Santos', '98765432100', 'Avenida Principal, 456');

  // Listando todos os clientes
  await listarClientes();

  // Encontrando um cliente pelo ID
  await encontrarClientePorId(1);

  // Atualizando os dados de um cliente
  await atualizarCliente(1, { lastName: 'Pereira' });

  // Excluindo um cliente
  await excluirCliente(2);

  // Listando clientes após as operações
  await listarClientes();

  console.log('Operações CRUD concluídas.');

  // Desconectando do banco de dados após a execução
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Erro:', error);
});