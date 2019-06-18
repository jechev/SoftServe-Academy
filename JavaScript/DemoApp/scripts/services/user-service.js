const userService = (function() {
  const baseUrl = 'http://localhost:3000/';

  function register(email, password) {
    return axios.post(baseUrl + 'register', {
      email: email,
      password: password 
    });
  }

  function login(email, password) {
    return axios.post(baseUrl + 'login', {
      email: email,
      password: password
    });
  }

  function saveToken(res) {
    sessionStorage.setItem('accessToken', res.data.accessToken);
    sessionStorage.setItem('email', JSON.parse(res.config.data).email);
  }

  function isAuth() {
    return sessionStorage.getItem('accessToken') !== null;
  }

  function logout() {
    sessionStorage.clear()
  }

  return {
    register,
    login,
    saveToken,
    isAuth,
    logout
  }


}());
