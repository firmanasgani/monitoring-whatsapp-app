export const apiInterceptors = (history: any) => ({
  request: [
    (config: any) => {
      const token = localStorage.getItem('jwt');
      if (token && config.url !== '/login') {
        config.headers = {
          Authorization: `Bearer ${token}`,
          ...config.headers,
        };
      }
      return config;
    },
  ],
  response: [
    (response: any) => {
      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
      }
      return response;
    },
    (error: any) => {
      if (error.response.status === 401) {
        localStorage.removeItem('jwt');
        history.push('/login');
      }
      return Promise.reject(error);
    },
  ],
});
