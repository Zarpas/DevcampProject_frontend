import { useState } from 'react';


// function useToken() {

  export function getToken(tokenName) {
    let userToken = '';
    try {
      userToken = localStorage.getItem(tokenName);
    }
    catch (error) {
      // console.error(error);
      userToken = null;
    }
    return userToken && userToken
  }

  // const [token, setToken] = useState(getToken());

  export function saveToken(tokenName, userToken) {
    localStorage.setItem(tokenName, userToken);
    getToken(tokenName);
  };

  export function removeToken(tokenName) {
    localStorage.removeItem(tokenName);
    getToken(tokenName);
  }

  // return {
  //   setToken: saveToken,
  //   token,
  //   removeToken
  // }

// }

// export default useToken;