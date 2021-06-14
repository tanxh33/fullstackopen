// Note that Mocha JS prefers function() {} calls
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset'); // Empty test database
    cy.createUser({ name: 'Hermione Granger', username: 'hermione', password: 'granger79' }); // Add new user
    cy.visit('http://localhost:3000'); // Visit the frontend home page
  });

  it('Login form is shown', () => {
    cy.contains('blogs!');
    cy.contains('Login');
  });

  // This test will fail.
  // it('front page contains random text', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.contains('wtf is this app?');
  // });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('hermione');
      cy.get('#password').type('granger79');
      cy.get('#login-button').click();

      // Assertion with .should(), .and()
      // Here we use it to check some CSS properties
      cy.get('div.success')
        .should('contain', 'Login successful')
        .and('have.css', 'color', 'rgb(64, 201, 64)')
        .and('have.css', 'border-style', 'solid');
      // Note that some CSS property tests fail on Firefox.

      cy.contains('Logged in as Hermione Granger');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('hermione');
      cy.get('#password').type('WRONGPASSWORDKID');
      cy.get('#login-button').click();

      cy.get('div.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(202, 21, 21)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Logged in as Hermione Granger');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      // Log in the user, but through a HTTP request instead of the UI,
      // so we aren't testing the login flow over and over again.
      // We use a custom command, defined in /cypress/support/commands.js
      cy.login({ username: 'hermione', password: 'granger79' });
    });

    it('A new blog can be created', () => {
      cy.contains('Add new blog').click();
      cy.get('#input-blog-title').type('A note created by cypress');
      cy.get('#input-blog-author').type('cypress');
      cy.get('#input-blog-url').type('https://docs.cypress.io/guides/overview/why-cypress');
      cy.get('#create-blog-button').click();

      cy.get('div.blog')
        .should('have.length', 1)
        .contains('A note created by cypress');
    });

    // We've tested adding new blog by itself, now these other tests act on a blog that exists.
    describe('and a blog exists', () => {
      beforeEach(() => {
        // Bypassing UI again by directly making a HTTP POST request.
        cy.createBlog({
          title: 'From the Red Line', author: 'yuuka', url: 'https://medium.com/from-the-red-line',
        });
        cy.createBlog({
          title: 'second blog', author: 'author2', url: 'url2', likes: 3,
        });
        cy.createBlog({
          title: 'third blog', author: 'author3', url: 'url3', likes: 5,
        });
      });

      it('blogs are ordered according to descending number of likes', () => {
        cy.get('div.blog').each((blog) => {
          cy.get(blog).find('button').contains('View').click();
        });
        cy.get('span.blog-likes')
          .should('have.length', 3)
          // From the array of <span>, extract the text content and convert to numbers.
          // Note that the selected elements use JQuery .map((i, elem)),
          // which have swapped arguments.
          .then((blogLikes) => blogLikes.map((i, span) => parseInt(span.innerHTML, 10)))
          .then((likes) => {
            // Sort the number array ourselves, then check they're the same as before sorting.
            const sorted = likes.sort((a, b) => b - a);
            expect(likes).to.deep.equal(sorted);
          });
      });

      it('it can be liked', () => {
        cy.contains('Red Line').parent().as('theBlogDiv'); // 'as' command can reduce copypaste
        cy.get('@theBlogDiv').find('button').contains('View').click();
        cy.get('@theBlogDiv').should('contain', 'Likes: 0');
        cy.get('@theBlogDiv').find('button').contains('Like').as('likeButton');
        cy.get('@likeButton').click();
        cy.get('@theBlogDiv').should('contain', 'Likes: 1');
        cy.get('@likeButton').click();
        cy.get('@theBlogDiv').should('contain', 'Likes: 2');
      });

      it.only('blogs are still ordered after liking', () => {
        cy.get('div.blog').each((blog) => {
          cy.get(blog).find('button').contains('View').click();
        });

        cy.contains('Red Line').parent().as('theBlogDiv');
        cy.get('@theBlogDiv').find('button').contains('Like').as('likeButton');
        for (let i = 0; i < 6; i += 1) {
          cy.get('@likeButton').click();
          cy.get('@theBlogDiv').should('contain', `Likes: ${i + 1}`);
        }

        cy.get('span.blog-likes')
          .then((blogLikes) => {
            expect(blogLikes[0]).to.contain('6'); // Check that Red Line has moved up to the top
            return blogLikes.map((i, span) => parseInt(span.innerHTML, 10));
          })
          .then((likes) => {
            const sorted = likes.sort((a, b) => b - a);
            expect(likes).to.deep.equal(sorted);
          });
      });

      it('it can be deleted', () => {
        cy.contains('Red Line').parent().as('theBlogDiv');
        cy.get('@theBlogDiv').find('button').contains('View').click();
        cy.get('@theBlogDiv').find('button').contains('Delete').click();
        // Seems that Cypress implicitly accepts the confirmation when the test doesn't define it
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Are you sure you want to remove From the Red Line by yuuka?');
        });
        cy.on('window:confirm', () => true);
        cy.get('html').should('not.contain', 'From the Red Line');
      });

      it('it cannot be deleted by another user', () => {
        cy.createUser({ name: 'Ron Weasley', username: 'weasleyking', password: 'ronaldTheDonald' });
        cy.get('button').contains('Logout').click();
        cy.login({ username: 'weasleyking', password: 'ronaldTheDonald' });
        cy.contains('Red Line').parent().as('theBlogDiv');
        cy.get('@theBlogDiv').find('button').contains('View').click();
        cy.get('@theBlogDiv').find('button').contains('Delete').click();
        cy.get('div.error').should('contain', 'Delete blog failed');
        cy.get('html').should('contain', 'From the Red Line');
      });
    });
  });
});
