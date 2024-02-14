export const getCookie = (name: string) => {
  const cookie: Record<string, string> = {};

  document.cookie.split(";").forEach((el) => {
    const split = el.split("=");

    cookie[split[0].trim()] = split.slice(1).join("=");
  });

  return cookie[name];
};
