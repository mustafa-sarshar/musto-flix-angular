class UserRegistrationCredentials {
  constructor(
    public username: string,
    public pass: string,
    public email: string,
    public birth: string
  ) {}
}

class UserLoginCredentials {
  constructor(public username: string, public pass: string) {}
}

class UserUpdateCredentials {
  constructor(
    public username: string,
    public pass: string,
    public email: string,
    public birth: string
  ) {}
}

class Person {
  constructor(
    public _id: string,
    public name: string,
    public bio: string,
    public birth: string,
    public death: string
  ) {}
}

class Director extends Person {
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

class Actor extends Person {
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

class Genre {
  constructor(public _id: string, public name: string, public des: string) {}
}

class Movie {
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

export {
  UserRegistrationCredentials,
  UserLoginCredentials,
  UserUpdateCredentials,
  Director,
  Actor,
  Genre,
  Movie,
};
