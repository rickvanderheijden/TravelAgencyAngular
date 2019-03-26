import { browser, element, by } from 'protractor';

export class MatngularPage {
  navigateTo() {
    return browser.get('/auth/login');
  }

  getUsernameInput() {
    return element(by.id('email'));
  }

  getPasswordInput() {
    return element(by.id('email'));
  }
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
