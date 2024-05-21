
import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка Авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });
          afterEach('Конец теста', function () {
            cy.get(result_page.close).should('be.visible');
           });

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.wait(5000);

         cy.get(result_page.title).contains('Авторизация прошла успешно');
         cy.get(result_page.title).should('be.visible');
     })

     it('Не верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('iLoveqastudio17');
        cy.get(main_page.login_button).click();

        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.title).should('be.visible');
    })
    it('Проверка валидации нет @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();

        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
        cy.get(result_page.title).should('be.visible');
    })

    it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.send_button).click();

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
        cy.get(result_page.title).should('be.visible');
    })

    it('Верный пароль и не верный логин', function () {
        cy.get(main_page.email).type('german@dolniko.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();

        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.title).should('be.visible');
    })

    it('проверку на приведение к строчным буквам в логине:', function () {
        cy.get(main_page.email).type('GermaN@dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();

        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.title).should('be.visible');
    })
 }) 








