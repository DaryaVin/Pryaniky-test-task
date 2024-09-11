export const createDate = (dateString: string | Date) => {
  return typeof dateString === "string" ? new Date(dateString) : dateString;
};
