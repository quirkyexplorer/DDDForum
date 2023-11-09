import { defineFeature, loadFeature } from 'jest-cucumber';
import { RestFulApiDriver } from '../../../src/shared/http/RestFulApiDriver';
import { CreateUserInput } from '../../../src/modules/users/dtos/userDTOs';
import { UserBuilder } from '../builders/userBuilder';
import { http } from '../../../src/index';
import path from 'path';
import { after } from 'node:test';

const feature = loadFeature(path.join(__dirname, './registration.feature'));

defineFeature(feature, (test) => {
  test('Successful registration', ({ given, when, then, and }) => {

      let driver = new RestFulApiDriver(http);
      let createUserInput : CreateUserInput;
      let response: any

    beforeAll(() => {
      // start server
      // clear out databse

    });

    afterAll(() => {
      
    });
     
    given('I am a new user', () => {
      createUserInput = new UserBuilder()
        .withFirstName('Daniel')
        .withLastName('Segura')
        .withUserName('quirkydev')
        .withRandomEmail()
        .build()
    });

    when('I register with a valid account details', async () => {
      response = await driver.post('/users/new', createUserInput)
    });

    then('I should be granted access to my account', () => {
      console.log(response);
      expect(response.body.success).toBeTruthy();
      expect(response.body.error).toBeFalsy();
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.email).toEqual(createUserInput.email);
      expect(response.body.data.firstName).toEqual(createUserInput.firstName);
      expect(response.body.data.lastName).toEqual(createUserInput.lastName);
      expect(response.body.data.username).toEqual(createUserInput.username);
    });

    and('I should receive an email with login instructions', () => {
        // cant test at this leve, gotta verify at the infra
    });
  });

});