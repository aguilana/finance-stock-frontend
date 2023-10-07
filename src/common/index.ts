export const config = {
  API_ENDPOINT:
    import.meta.env.VITE_ENV !== 'production'
      ? import.meta.env.VITE_BACKEND_API_URL
      : 'https://actual-url/api',
};
