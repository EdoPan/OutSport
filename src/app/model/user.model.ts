export class User {
  email: string;//ASSEGNARE A QUESTA EMAIL CON firebase.auth().currentUser.email
  gender: string;
  age: number;
  height: number;
  weight: number;

  constructor() {
  }

  getEmail(): string{
    return this.email;
  }

}
