describe('Dictionary App', () => {
    it('has title "Dictionary App"', () =>{
        cy.visit('http://127.0.0.1:5500/index.html')
        cy.title().should('eq', 'Dictionary App')
    })
    it("has a form that users can look up english words")
    it("shows synonyms if not a word")
    it("looks up a synonym if clicked on")
})