/// <reference types="cypress"/>
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const locationTestMethods =[
    { 
        name: `{string}にアクセスする`,
        method: (path:string) => cy.visit(path)
    },
    { 
        name: `タイトルに{string}がある`,
        method: (title:string) => cy.title().should("include", title)
    },
    { 
        name: `{string}に遷移する`,
        method: (path:string) => cy.location().should(loc=>{
            expect(loc.pathname).to.eq(path);
        })
    },

];
locationTestMethods.forEach(m => {
    When(m.name, m.method);
    Then(m.name, m.method);
    Given(m.name, m.method);
});