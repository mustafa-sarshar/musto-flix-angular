/**
 * @class
 */
export class Person {
  /**
   * @constructor
   * @param _id
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
  constructor(
    public _id: string,
    public name: string,
    public bio: string,
    public birth: string,
    public death: string
  ) {}
}

/**
 * @class
 * @description - It holds the data of each director
 */
export class Director extends Person {
  /**
   * @constructor
   * @param _id
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
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

/**
 * @class
 * @description - It hold the data of each actor
 */
export class Actor extends Person {
  /**
   * @constructor
   * @param _id
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
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

/**
 * @class
 * @description - It holds the data of each genre
 */
export class Genre {
  /**
   * @constructor
   * @param _id
   * @param name
   * @param des
   */
  constructor(public _id: string, public name: string, public des: string) {}
}

/**
 * @class
 * @description - It holds the data of each movie
 */
export class Movie {
  /**
   * @constructor
   * @param _id
   * @param title
   * @param des
   * @param directors
   * @param stars
   * @param genres
   * @param image_url
   * @param featured
   */
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
