import Axios  from "axios";

const apiClient = Axios.create({
    baseURL: `${import.meta.env.VITE_APP_URL}`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
  });

  export default apiClient;