import { describe } from "@jest/globals";
import LivrosImagensService from "../../services/livrosImagensService";
import { BUFFER_IMG } from "./mock";

const livrosImagensService = new LivrosImagensService();

describe("Testando livrosImagensService.cadastrarImagem", () => {
  it("O sistema deve salvar uma imagem vinculada ao livro caso todos os dados estejam corretos", async () => {
    const imagemMock = {
      file: {
        originalname: "curso node.png",
        mimetype: "image/png",
        size: 2857,
        buffer: BUFFER_IMG,
      },
      body: {
        livroId: 1,
      },
    };
    const imagemSalva = await livrosImagensService.cadastrarImagem(imagemMock);
    expect(imagemSalva.content.livro_id).toBe(imagemMock.body.livroId);
    expect(imagemSalva.content.size).toBeLessThan(5000);
    await livrosImagensService.excluirImagemLivro(imagemSalva.content.id);
  });

  it("É obrigatório informar o id do livro a qual a imagem é vinculada", async () => {
    const imagemMock = {
      file: {
        originalname: "curso node.png",
        mimetype: "image/png",
        size: 2857,
        buffer: {
          type: "Buffer",
          data: BUFFER_IMG,
        },
      },
      body: {},
    };
    const imagemSave = livrosImagensService.cadastrarImagem(imagemMock);
    await expect(imagemSave).rejects.toThrowError(
      "O id do livro é obrigatório."
    );
  });

  it("O sistema só permite imagens do tipo PNG e JPG", async () => {
    const imagemMock = {
      file: {
        originalname: "curso node.gif",
        mimetype: "image/gif",
        size: 2857,
        buffer: {
          type: "Buffer",
          data: BUFFER_IMG,
        },
      },
      body: {
        livroId: 1,
      },
    };
    const imagemSave = livrosImagensService.cadastrarImagem(imagemMock);
    await expect(imagemSave).rejects.toThrowError(
      `O formato ${imagemMock.file.mimetype} não é permitido.`
    );
  });

  it("O sistema só permite imagens ate 5000kb", async () => {
    const imagemMock = {
      file: {
        originalname: "curso node.png",
        mimetype: "image/png",
        size: 5001,
        buffer: {
          type: "Buffer",
          data: BUFFER_IMG,
        },
      },
      body: {
        livroId: 1,
      },
    };
    const imagemSave = livrosImagensService.cadastrarImagem(imagemMock);
    await expect(imagemSave).rejects.toThrowError(
      "O limite para upload de imagem é de 5000kb."
    );
  });
});
