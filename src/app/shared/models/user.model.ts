/**
 * @class
 * @description - It holds the the users's credentials for registration
 */
export class UserRegistrationCredentials {
  /**
   * @constructor
   * @param username
   * @param pass
   * @param email
   * @param birth
   */
  constructor(
    public username: string,
    public pass: string,
    public email: string,
    public birth: string
  ) {}
}

/**
 * @class
 * @description - It holds the user's credentials for login
 */
export class UserLoginCredentials {
  /**
   * @constructor
   * @param username
   * @param pass
   */
  constructor(public username: string, public pass: string) {}
}

/**
 * @class
 * @description - It holds the user's credentials for updating the user profile
 */
export class UserUpdateCredentials {
  /**
   * @constructor
   * @param username
   * @param pass
   * @param email
   * @param birth
   */
  constructor(
    public username: string | null,
    public pass: string | null,
    public email: string | null,
    public birth: string | null
  ) {}
}
