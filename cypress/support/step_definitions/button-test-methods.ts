/// <reference types="cypress"/>
import { Then, When, Given } from "cypress-cucumber-preprocessor/steps";

const buttonTestMethods =[
    { 
        name: `{string}ボタンがある`,
        method: (buttonName: string) => cy.get('.btn').contains(buttonName)
    },
    { 
        name: `{string}ボタンをクリックする`,
        method: (buttonName: string) => {
            cy.get('.btn').contains(buttonName).click();
        }
    },
    { 
        name: `{string}ボタンは{string}色である`,
        method: (buttonName: string) => {
            cy.get('.btn').contains(buttonName).click();
        }
    },
];

buttonTestMethods.forEach(m => {
    When(m.name, m.method);
    Then(m.name, m.method);
    Given(m.name, m.method);
});