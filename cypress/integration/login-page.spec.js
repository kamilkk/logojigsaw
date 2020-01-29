describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it focuses the name input', () => {
    cy.focused().get('.MuiInputBase-input');
  });

  it("it disables let's go button", () => {
    cy.get('[data-testid=letsgo]').should('have.disabled', true);
  });

  it('it accepts input in to the name field', () => {
    const input = 'Some random name';
    cy.get('.MuiInputBase-input')
      .type(input)
      .should('have.value', input);
  });

  it("it enables let's go button", () => {
    const input = 'Timon';
    cy.get('.MuiInputBase-input')
      .type(input)
      .should('have.value', input);
    cy.get('[data-testid=letsgo]').should('have.enabled', false);
  });
});
