describe("Dictionary App", () => {
  it('has title "Dictionary App"', () => {
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.title().should("eq", "Dictionary App");
  });
  it("has a form that users can look up english words", () => {
    const searchTerm = "warped";
    const expected = [
      "having or marked by great volume or bulk : large; also : full",
      "numerous",
    ];
    cy.intercept(
      "GET",
      "https://www.dictionaryapi.com/api/v3/references/collegiate/json/*",
      [
        {
          shortdef: expected,
        },
      ]
    );
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.get("form");
    cy.get("#results");
    cy.get("#search-term").type(searchTerm);
    cy.get("input[type=submit]").click();
    cy.contains(expected[0]);
  });
  it("shows synonyms if not a word", () => {
      const searchTerm = "asdfasdfasldfkjasldkfj"
      const expected = ["apple", "orange"]
    cy.intercept(
      "GET",
      "https://www.dictionaryapi.com/api/v3/references/collegiate/json/*",
      expected,
    );
    cy.visit("http://127.0.0.1:5500/index.html");
    cy.get("form");
    cy.get("#results");
    cy.get("#search-term").type(searchTerm);
    cy.get("input[type=submit]").click();
    cy.contains(expected[0]);
    cy.contains(expected[1]);
  });
//   it("looks up a synonym if clicked on");
});
