class Environment {
  production: boolean;
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

class String150 {
  private constructor(public value: string) {}

  public static create(value: string) {
    if (value.length > 150) {
      return new TypeError('String must has less than or equal 150 characters');
    }

    return new String150(value);
  }
}

class String40 {
  private constructor(public value: string) {}

  public static create(value: string) {
    if (value.length > 40) {
      throw new TypeError('String must has less than or equal 40 characters');
    }
    return new String40(value);
  }
}

class String20 {
  private constructor(public value: string) {}

  public static create(value: string) {
    if (value.length > 20) {
      throw new TypeError('String must has less than or equal 20 characters');
    }
    return new String20(value);
  }
}

class StringPath {
  private constructor(public value: string) {}

  //need implement path validation

  public static create(value: string) {
    return new StringPath(value);
  }
}

class StringURL {
  private constructor(public value: string) {}

  //need implement URL validation

  public static create(value: string) {
    return new StringURL(value);
  }
}

export { String150, String40, String20, StringPath, StringURL, Environment };
