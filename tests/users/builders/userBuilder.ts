import { CreateUserInput } from "../../../src/modules/users/dtos/userDTOs";
import { generateRandomInteger } from "../../../src/shared/utils/numberUtils";

export class UserBuilder {

  private userInput: CreateUserInput;

  constructor () {
    this.userInput = {
      email: '', 
      username: '', 
      firstName: '',
      lastName: '',
    }
  }

  withFirstName(value: string) {
    this.userInput.firstName = value;
    return this;
  }
  
  withLastName(value: string ) {
    this.userInput.lastName = value;
    return this;
  }
  
  withUserName(value: string) {
    this.userInput.username = value;
    return this;
  }
  
  withRandomEmail() {
    const randomSequence = generateRandomInteger(100, 10000);
    this.userInput.email = `test-${randomSequence}@gmail.com`
    return this;
  }
  
  build(): CreateUserInput {
    return this.userInput;
  }
}