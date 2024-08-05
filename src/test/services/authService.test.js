import { describe } from "@jest/globals";
import AuthService from "../../services/authService";
import Usuario from "../../models/usuario";

const authService = new AuthService();

describe("should be test authService.cadastarUsuario", () => {
  it("should be verify user need fields name, email and password", async () => {
    const userMock = {
      nome: "Rafael",
      email: "rafael@mail.com",
    };

    const saveUser = authService.cadastrarUsuario(userMock);
    await expect(saveUser).rejects.toThrowError(
      "Senha, nome e email dos usuários são obrigatórios"
    );
  });

  it("should be verify can't register duplicated e-mail", async () => {
    const userMock = {
      nome: "Rafael",
      email: "teste@gmail.com",
      senha: "332",
    };

    const saveUser = authService.cadastrarUsuario(userMock);
    await expect(saveUser).rejects.toThrowError("Usuário já cadastrado");
  });

  it("should be verify register message success", async () => {
    const userMock = {
      nome: "Rafael",
      email: "actorws@gmail.com",
      senha: "332",
    };

    const saveUser = await authService.cadastrarUsuario(userMock);
    expect(saveUser.message).toBe("usuario criado");

    await Usuario.excluir(saveUser.content.id);
  });

  it("should be verify register message success", async () => {
    const userMock = {
      nome: "Vitor",
      email: "asf@gmail.com",
      senha: "222",
    };

    const saveUser = await authService.cadastrarUsuario(userMock);
    expect(saveUser.content).toMatchObject(userMock);

    await Usuario.excluir(saveUser.content.id);
  });
});
