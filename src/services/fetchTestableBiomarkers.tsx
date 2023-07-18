const { VITE_VITAL_LABS_API_KEY } = import.meta.env;

export const fetchTestableBiomarkers = () => {
  return fetch("/api", {
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "x-vital-api-key": VITE_VITAL_LABS_API_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json().then((res) => res))
    .catch(console.error);
};
