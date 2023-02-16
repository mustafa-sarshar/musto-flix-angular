export class UserRegistrationCredentials {
  constructor(
    public username: string,
    public pass: string,
    public email: string,
    public birth: string
  ) {}
}

export class UserLoginCredentials {
  constructor(public username: string, public pass: string) {}
}

export class UserUpdateCredentials {
  constructor(
    public username: string | null,
    public pass: string | null,
    public email: string | null,
    public birth: string | null
  ) {}
}
