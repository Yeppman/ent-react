import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
//import { required } from "redux-form-validators"

import { renderField, renderError} from "../store/utils/renderUtils";
import { resetPassword } from "../store/actions/auth";
import {
  Form,
  Select,
  Input,
  notification
} from "antd";


class PasswordReset extends Component {

    // static propTypes = {
    //     ...propTypes
    // };

    render() {
        const { handleSubmit, error } = this.props;

        const validate = val => {
            const errors = {};
            if (!val.email) {
              console.log('email is required');
              errors.email = 'Required';
            } else if (!/^.+@.+$/i.test(val.email)) {
              console.log('email is invalid');
              errors.email = 'Invalid email address';
            }

            return errors;
          };
           
          PasswordReset = reduxForm({
            formR: "password_reset",
            onSubmit: resetPassword,
            validate
        })(PasswordReset)

          
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <div className="control">
        <label className="field">{label}</label>
        <input className="input" {...input} placeholder={label} type={type}/>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

return (
        <div className="row justify-content-center">

                <form className="form"  onSubmit={handleSubmit}>

                    <div className="field">
                    <div className="control">
                        <label className="label">Email</label>
                        <Field className="input" name="email" 
                        component="input" type="email" placeholder="Email Address"/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                    </div>

                </form>;
    </div>
        )
    }
}

export default PasswordReset
