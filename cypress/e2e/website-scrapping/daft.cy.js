/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
function getRandomWait() {
    return Math.floor(Math.random() * 3000); // Random wait in milliseconds (0 to 5000)
}
describe('Daft Scrapper', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        //   cy.visit('https://auth.daft.ie/')
    })
    it('should log in successfully', () => {
        cy.visit('https://www.daft.ie/', { log: false });

        // Wait for 2 seconds
        cy.wait(getRandomWait());
        cy.get('#js-cookie-modal-level-one').should('be.visible');
        cy.wait(getRandomWait());
        // Click the "ACCEPT ALL" button
        cy.contains('Accept All').click();

        // Wait for the modal to disappear (assuming it's no longer visible)
        cy.wait(getRandomWait());
        // Click on "Sign in"
        cy.contains('Sign in').click();

        // Wait for 2 seconds
        cy.wait(getRandomWait());

        // Fill in email and password
        cy.get('input[name="username"]').type('mohsen.nurisa@gmail.com');
        cy.wait(getRandomWait());
        cy.get('input[name="password"]').type('Fokol@1371');

        // Wait for 2 seconds
        cy.wait(getRandomWait());

        // Click on "SIGN IN" button
        cy.get('.login__button').click();

        // Wait for 2 seconds (or as needed)
        cy.wait(getRandomWait());

        cy.visit('https://www.daft.ie/property-for-rent/dublin-city?numBeds_from=2&firstPublishDate_from=now-3d%2Fd&sort=publishDateDesc&pageSize=20&propertyType=houses&propertyType=apartments', { log: false });
        cy.wait(getRandomWait());
        let links = [];
        cy.get('[data-testid="results"] li').each(($result, index) => {
            // Open each result in a new tab
            cy.wrap($result)
                .find('a') // Adjust the selector if needed to target the link within each result item
                .invoke('attr', 'href')
                .then(href => {
                    links.push(href);
                });
        });
        cy.wrap(links).each((href) => {
            cy.visit('https://www.daft.ie' + href, { log: false, timeout: 30000, failOnStatusCode: false });
            cy.wait(getRandomWait());
            cy.scrollTo(0, 500);
            cy.wait(getRandomWait());
            // cy.contains('Email Agent').click();
            cy.get('[data-testid="message-btn-mobile-floating-btn"]').click();
            cy.wait(getRandomWait() + 5);

            cy.get('body').then((body) => {
                if (body.find('[data-testid="alert-message-wrapper"]').length > 0 || body.find('[data-testid="alert-message"]').length > 0 || body.find('[data-testid="contact-form-enquired-panel-icon-content"]').length > 0) {
                    return;
                }
                else {
                    cy.get('[data-testid="adultTenants-increment-button"]').click();
                    cy.wait(getRandomWait());
                    cy.get('#contact-form-modal').find('[data-testid="submit-button"]').click();
                    cy.wait(getRandomWait() + 3);
                    cy.window().then(win => {
                        win.close();
                    });
                }
            })

            // You can add assertions here to verify successful login
            // For example, you can check for elements that are displayed after successful login.
        });
    });
})


