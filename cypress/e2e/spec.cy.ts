import cypress from 'cypress'

Cypress.on('uncaught:exception', () => false)

describe('e2e spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'https://api.github.com/repos/facebook/react', {
      fixture: 'profile.json',
    })
    cy.intercept('GET', 'https://api.github.com/repos/facebook/react/issues', {
      fixture: 'issues.json',
    })
  })

  it('renders starting page corectly', () => {
    cy.get('input[placeholder="Enter repo URL"]')
    cy.contains('button', 'Load Issues').should('be.disabled')
  })

  it('entered the correct value', () => {
    cy.get('input').type('https://github.com/facebook/react')
    cy.get('button').click()
    cy.contains('Some error').should('not.exist')
    cy.get('.info').should('exist')
    cy.get('a').should('have.length', 2)
    cy.get('.board').should('have.length', 3)
    cy.get('.card-body').should('have.length', 7)
  })

  it('entered the wrong value', () => {
    cy.get('input').type('sometext')
    cy.get('button').click()
    cy.contains('Some error').should('be.visible')
  })

  it('Drag & Drop', () => {
    cy.get('input').type('https://github.com/facebook/react')
    cy.get('button').click()
    const boards = ['open', 'close', 'progress']
    cy.get('div[data-card-cy]').each(($el) => {
      const random = Math.floor(Math.random() * boards.length)
      const id = $el.attr('data-card-cy')
      cy.wait(10)
      cy.get(`[data-card-cy=${id}]`).dragAndDrop(
        `[data-card-cy=${id}]`,
        `[data-board-cy= ${boards[random]}]`
      )
    })
  })
  it('saves state to local storage', () => {
    cy.get('input').type('https://github.com/facebook/react')
    cy.get('button').click()
    cy.wait(10)

    cy.get(`[data-card-cy]`).dragAndDrop(
      `[data-card-cy]`,
      `[data-board-cy=progress]`
    )
    cy.wait(10)
    cy.window()
      .its('store')
      .invoke('getState')
      .then(($state) => {
        cy.window()
          .its('localStorage')
          .invoke('getItem', 'hello@cypress.io')
          .then(($cachedState) => {
            expect(JSON.parse($cachedState as string)).to.deep.equal(
              $state.repository
            )
          })
      })
  })

  it('gets state from local storage', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').type('https://github.com/facebook/react')
    cy.get('button').click()

    cy.wait(10)
    cy.get(`[data-card-cy]`).dragAndDrop(
      `[data-card-cy]`,
      `[data-board-cy=progress]`
    )
    cy.wait(10)
    cy.get(`[data-card-cy]`).dragAndDrop(
      `[data-card-cy]`,
      `[data-board-cy=progress]`
    )
    cy.wait(10)
    cy.get(`[data-card-cy]`).dragAndDrop(
      `[data-card-cy]`,
      `[data-board-cy=progress]`
    )
    cy.wait(10)

    cy.window()
      .its('store')
      .invoke('getState')
      .then(($state) => {
        cy.window()
          .its('localStorage')
          .invoke('getItem', 'hello@cypress.io')
          .then(($cachedState) => {
            expect(JSON.parse($cachedState as string)).to.deep.equal(
              $state.repository
            )
          })
      })

    cy.reload()
    cy.get('input').type('hello@cypress.io')
    cy.get('button').click()
    cy.wait(100)
    cy.window()
      .its('store')
      .invoke('getState')
      .then(($state) => {
        cy.window()
          .its('localStorage')
          .invoke('getItem', 'hello@cypress.io')
          .then(($cachedState) => {
            expect(JSON.parse($cachedState as string)).to.deep.equal(
              $state.repository
            )
          })
      })
  })

  afterEach(() => {
    cy.clearLocalStorage()
  })
})
