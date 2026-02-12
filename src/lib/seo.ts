const FALLBACK_SITE_URL = "https://vexis-log.vercel.app";

const normalizeUrl = (value: string) => value.replace(/\/$/, "");

export const getSiteUrl = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    FALLBACK_SITE_URL;

  return normalizeUrl(envUrl);
};

export const getAbsoluteUrl = (path = "/") => {
  const baseUrl = getSiteUrl();

  if (path === "/") {
    return baseUrl;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
