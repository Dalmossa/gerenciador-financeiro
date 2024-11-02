const request = require('supertest');
const app = require('../src/app'); // Caminho do seu arquivo principal que exporta o express app

describe('Testando rotas de usuários', () => {
  it('Deve retornar a lista de usuários', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          senha: expect.any(String),
          dataCriacao: expect.any(String),
        }),
      ])
    );
  });
});
