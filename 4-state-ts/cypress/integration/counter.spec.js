describe('counter', () => {
  beforeEach(() => {
    cy.visit('/');

    // $input = cy.get('input');
    // $increaseButton = cy.get('.counter > :nth-child(2)');
    // $number = cy.get('span');
    // $decreaseButton = cy.get('.counter > :nth-child(4)');
  });

  it('서비스 접속 테스트 (렌더 테스트)', () => {
    cy.get('h1').should('have.text', 'COUNTER!');
    cy.get('input').should('be.visible');
    cy.get('.counter > :nth-child(2)').should('have.text', '+1');
    cy.get('span').should('have.text', '0');
    cy.get('.counter > :nth-child(4)').should('have.text', '-1');
  });

  it('diff 인풋 변경(5)', () => {
    cy.get('input').should('have.text', '');
    cy.get('input').clear().type(5);
    cy.get('input').should('have.value', '5');
  });

  it('증가 기능 테스트', () => {
    cy.get('span').should('have.text', 0);

    cy.get('.counter > :nth-child(2)').click();
    cy.get('span').should('have.text', 1);

    cy.get('.counter > :nth-child(2)').click();
    cy.get('.counter > :nth-child(2)').click();
    cy.get('span').should('have.text', 3);
  });

  it('감소 기능 테스트', () => {
    cy.get('span').should('have.text', 0);

    cy.get('.counter > :nth-child(4)').click();
    cy.get('span').should('have.text', -1);

    cy.get('.counter > :nth-child(4)').click();
    cy.get('.counter > :nth-child(4)').click();
    cy.get('span').should('have.text', -3);
  });

  it('diff 인풋 변경(5) 및 증가/감소 테스트', () => {
    cy.get('input').should('have.text', '');

    cy.get('input').clear().type('5{enter}');

    cy.get('.counter > :nth-child(2)').click();
    cy.get('.counter > :nth-child(2)').click();
    cy.get('span').should('have.text', 10);

    cy.get('.counter > :nth-child(4)').click();
    cy.get('span').should('have.text', 5);
  });
});
