/**
 * A week (Monday - Sunday)
 *
 * Used for listing transactions in a date range
 */
export type Week = {
  /**
   * @param name - Name of the week, e.g. "This week"
   */
  name: string;
  /**
   * @param start - a date for the beginning of the week
   */
  start: Date;
  /**
   * @param end - a date for the end of the week
   */
  end: Date;
};
