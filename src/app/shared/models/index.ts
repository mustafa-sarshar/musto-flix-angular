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
    public username: string,
    public pass: string,
    public email: string,
    public birth: string
  ) {}
}

export class Person {
  constructor(
    public _id: string,
    public name: string,
    public bio: string,
    public birth: string,
    public death: string
  ) {}
}

export class Director extends Person {
  constructor(
    _id: string,
    name: string,
    bio: string,
    birth: string,
    death: string
  ) {
    super(_id, name, bio, birth, death);
  }
}

export class Actor extends Person {
  constructor(
    _id: string,
    name: string,
    bio: string,
    birth: string,
    death: string
  ) {
    super(_id, name, bio, birth, death);
  }
}

export class Genre {
  constructor(public _id: string, public name: string, public des: string) {}
}

export class Movie {
  constructor(
    public _id: string,
    public title: string,
    public des: string,
    public directors: Director[],
    public stars: Actor[],
    public genres: Genre[],
    public image_url: string,
    public featured: boolean
  ) {}
}
