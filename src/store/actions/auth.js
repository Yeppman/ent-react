import axios from "axios";
import * as actionTypes from "./actionTypes";

import {changePasswordUrl, resetPasswordUrl, resetPasswordConfirmUrl,
  activateUserUrl, userProfileUrl, loginURL
  } from '../../constants'

import {notification , message} from 'antd'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};
 
export const authFail = error => {
  message.error('Invalid Username or password',10)
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
  
};

export const logout = () => {
  localStorage.removeItem("user");
  
  //message.success('Logout successfull')
  //window.location.replace('/login')
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("https://backend-entr.herokuapp.com/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_buyer: res.data.user_type.is_buyer,
          is_seller: res.data.user_type.is_seller,
          expirationDate: new Date(new Date().getTime() + 36000 * 10000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  username,
  email,
  password1,
  password2,
  is_buyer
) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password1,
      password2,
      is_buyer,
      is_seller: !is_buyer
    };
    axios
      .post("https://backend-entr.herokuapp.com/rest-auth/registration/", user)
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_buyer,
          is_seller: !is_buyer,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        //dispatch(fetchCart())
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};



export const changePassword = (formValues, token) => {
  //const token = getUserToken(store.getState());

  return dispatch => {
    dispatch(authStart())
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios.post(changePasswordUrl, formValues)
      .then((res) => {
        console.log(res.data);
        // dispatch(notifSend({
          //     message: "Password has been changed successfully",
          //     kind: "info",
          //     dismissAfter: 5000
          // }));
          // // redirect to the route '/profile'
          //history.push("/profile");
      })
      .catch((err) => {
          console.log(err);
        // If request is bad...
          // Show an error to the user
         // const processedError = processServerError(error.response.data);
          //throw new SubmissionError(processedError);
      });
  }

}

export const resetPassword = ( token, email) => {

  return dispatch => {
    dispatch(authStart())
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios.post(resetPasswordUrl, email)
    .then(response => {
        // redirect to reset done page
        //history.push("/reset_password_done");
    }).catch((error) => {
        console.log(error);

        // If request is bad...
        // Show an error to the user
        //const processedError = processServerError(error.response.data);
        //throw new SubmissionError(processedError);
    });
  }
}

export const confirmPasswordChange = (formValues, uid, token) => {
  //const { uid, token } = props.match.params;
  //const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
  const data = Object.assign(formValues, { uid, token });

  return dispatch => {
    axios.post(resetPasswordConfirmUrl, data)
      .then(res => {
          // dispatch(notifSend({
          //     message: "Password has been reset successfully, please log in",
          //     kind: "info",
          //     dismissAfter: 5000
          // }));

          // history.push("/login");
      }).catch((err) => {
          // If request is bad...
          // Show an error to the user
        //  const processedError = processServerError(error.response.data);
        //  throw new SubmissionError(processedError);
      });
  }
}

// util functions
// function processServerError(error) {
//   return  Object.keys(error).reduce(function(newDict, key) {
//       if (key === "non_field_errors") {
//           newDict["_error"].push(error[key]);
//       } else if (key === "token") {
//           // token sent with request is invalid
//           newDict["_error"].push("The link is not valid any more.");
//       } else {
//           newDict[key] = error[key];
//       }

//       return newDict
//   }, {"_error": []});
// }
