import { getGreeting } from '../support/app.po';

describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Pasin profile name.', () => {
    getGreeting().contains('Pasin Sukjaimitr');
  });
});
