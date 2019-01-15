const packageJSON = require("./../package.json");

describe("annict.anime.js", () => {
  it("package", () => {
    expect(packageJSON.version).toBe("0.0.1");
  });
});
