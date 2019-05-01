class String40 {
  private constructor(public value: string) {}

  public static create(value: string) {
    return value.length > 40
      ? new TypeError('String must has less than or equal 40 characters')
      : new String40(value);
  }
}

export { String40 };
