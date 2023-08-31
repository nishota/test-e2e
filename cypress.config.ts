import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");

export default defineConfig({
  e2e: {
    async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions){

      // implement node event listeners here

      const options = {
        ...browserify.defaultOptions,
        typescript: require.resolve("typescript"),
      };
      options.browserifyOptions.plugin.unshift(['tsify']);
      on("file:preprocessor", cucumber(options));
    },
    specPattern: "cypress/integration/*.feature",
    baseUrl: "https://192.168.10.109:7273/",
    video: false,
  },
});
