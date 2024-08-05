import { describe } from "@jest/globals";
import db from "../../db/dbconfig.js";

describe("Test config db", () => {
  it("should be check connection db", async () => {
    const mockAuthor = {
      nome: "Luana",
      nacionalidade: "Brasileira",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const authorSave = await db("autores")
      .insert(mockAuthor)
      .then((res) => db("autores").where("id", res[0]))
      .then((res) => res[0]);

    expect(authorSave.nome).toBe(mockAuthor.nome);

    await db("autores").where({ id: authorSave.id }).del();
  });
});
