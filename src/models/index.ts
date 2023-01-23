class UserRegistrationCredentials {
  public username: string;
  public pass: string;
  public email: string;
  public birth: Date;

  constructor(username: string, pass: string, email: string, birth: Date) {
    this.username = username;
    this.pass = pass;
    this.email = email;
    this.birth = birth;
  }
}

class UserLoginCredentials {
  public username: string;
  public pass: string;

  constructor(username: string, pass: string) {
    this.username = username;
    this.pass = pass;
  }
}

class UserUpdateCredentials {
  public username: string;
  public pass: string;
  public email: string;
  public birth: Date;

  constructor(username: string, pass: string, email: string, birth: Date) {
    this.username = username;
    this.pass = pass;
    this.email = email;
    this.birth = birth;
  }
}

export {
  UserRegistrationCredentials,
  UserLoginCredentials,
  UserUpdateCredentials,
};
