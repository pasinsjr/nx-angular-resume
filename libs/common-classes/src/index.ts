class String40 {
  private constructor(public value: string) {}

  public static create(value: string) {
    if (value.length > 40) {
      throw new TypeError('String must has less than or equal 40 characters');
    }
    return new String40(value);
  }
}

export { String40 };
