describe('counter', () => {
  let input;
  let increaseButton;
  let number;
  let decreaseButton;
  beforeEach(() => {
    cy.visit('/');

    input = '.counterapp input';
    increaseButton = '.counter > :nth-child(2)';
    number = '.counter > span';
    decreaseButton = '.counter > :nth-child(4)';
  });

  it('서비스 접속 테스트 (렌더 테스트)', () => {
    cy.get('.counterapp > h1').should('have.text', 'COUNTER!');
    cy.get(input).should('be.visible');
    cy.get(increaseButton).should('have.text', '+1');
    cy.get(number).should('have.text', '0');
    cy.get(decreaseButton).should('have.text', '-1');
  });

  it('diff 인풋 변경(5)', () => {
    cy.get(input).should('have.text', '');
    cy.get(input).clear().type(5);
    cy.get(input).should('have.value', '5');
  });

  it('증가 기능 테스트', () => {
    cy.get(number).should('have.text', 0);

    cy.get(increaseButton).click();
    cy.get(number).should('have.text', 1);

    cy.get(increaseButton).click();
    cy.get(increaseButton).click();
    cy.get(number).should('have.text', 3);
  });

  it('감소 기능 테스트', () => {
    cy.get(number).should('have.text', 0);

    cy.get(decreaseButton).click();
    cy.get(number).should('have.text', -1);

    cy.get(decreaseButton).click();
    cy.get(decreaseButton).click();
    cy.get(number).should('have.text', -3);
  });

  it('diff 인풋 변경(5) 및 증가/감소 테스트', () => {
    cy.get(input).should('have.text', '');

    cy.get(input).clear().type('5{enter}');

    cy.get(increaseButton).click();
    cy.get(increaseButton).click();
    cy.get(number).should('have.text', 10);

    cy.get(decreaseButton).click();
    cy.get(number).should('have.text', 5);
  });
});
