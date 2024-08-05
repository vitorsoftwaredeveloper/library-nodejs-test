import request from "supertest";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";
import app from "../../app";

let servidor;
beforeEach(() => {
  const porta = 4000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});

describe("Test router login (POST)", () => {
  it(" should be verify login e-mail and password is required to authentic", async () => {
    const loginMock = {
      email: "af@gmail.com",
    };

    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."');
  });

  it(" should be verify if user is registred", async () => {
    const loginMock = {
      email: "afsdsd@gmail.com",
      senha: "wer",
    };

    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(500)
      .expect('"Usuario não cadastrado."');
  });

  it(" should be verify password user is incorrect", async () => {
    const loginMock = {
      email: "af@gmail.com",
      senha: "wer",
    };

    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(500)
      .expect('"Usuario ou senha invalido."');
  });

  it(" should be verify password user is incorrect", async () => {
    const loginMock = {
      email: "af@gmail.com",
      senha: "222",
    };

    const userLogged = await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(201);
    expect(userLogged.body.message).toBe("Usuario conectado");
    expect(userLogged.body).toHaveProperty("accessToken");
  });
});
