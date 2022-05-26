describe('todos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('서비스 접속 테스트 (렌더 테스트)', () => {
    cy.get('.header > h1').should('have.text', 'todos');
    cy.get('.new-todo').should('be.visible');
  });

  it('투두 아이템 추가 기능', () => {
    cy.get('.new-todo').type('text{enter}');
    cy.get('.new-todo').type('text2{enter}');
    cy.get('.todo-list').children().should('have.length', 2);
  });
});
