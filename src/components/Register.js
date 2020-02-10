import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        username: '',
        password: '',
        comfirmPassword: '',
        name: '',
        lastName: '',
        email: '',
        license: '',
        province: '',
        e_code: '',
      },
      isLoading: false,
      emailInvalid: false,
      passwordInvalid: false,
      hidePassword: true,
      duplicateUser: false,
      duplicateEmail: false,
      duplicateLicense: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'email') {
      this.setState({
        emailInvalid: false,
        duplicateEmail: false
      })
    } else if (e.target.name === 'password') {
      this.setState({
        passwordInvalid: false
      })
    } else if (e.target.name === 'license') {
      this.setState({
        duplicateLicense: false
      })
    }
    let userForm = this.state.userForm;
    if (e.target.name === 'username') {
      userForm.username = e.target.value
      console.log(this.validateUser(e.target.value))
    } else if (e.target.name === 'password') {
      userForm.password = e.target.value
    } else if (e.target.name === 'comfirmPassword') {
      userForm.comfirmPassword = e.target.value
    } else if (e.target.name === 'name') {
      userForm.name = e.target.value
    } else if (e.target.name === 'lastName') {
      userForm.lastName = e.target.value
    } else if (e.target.name === 'email') {
      userForm.email = e.target.value
      console.log(this.validateEmail(e.target.value))
    } else if (e.target.name === 'license') {
      userForm.license = e.target.value
    } else if (e.target.name === 'province') {
      userForm.province = e.target.value
    } else if (e.target.name === 'e_code') {
      userForm.e_code = e.target.value
    }
    this.setState({
      userForm: userForm
    })
    // console.log(e.target.name);
    console.log(e.target.value)
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  validatePassword = (pass) => {
    let re = /^[A-Za-z0-9_<>()\[\]\\.,;:\s@"]*$/;
    return re.test(String(pass));
  }

  validateUser = (user) => {
    let re = /^[A-Za-z0-9_]*$/;
    return re.test(String(user));
  }

  validateName = (name) => {
    let re = /^[A-Za-z0-9_]*$/;
    let reth = /^[ก-๏\s]+$/;
    return re.test(String(name)) || reth.test(String(name));
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  render() {
    return (
      <div className="sectino">

        <div className="contianer">
          <div className="topic">
            <h2 className="title is-1">Register</h2>
          </div>

          <div className="columns is-centered">
            <div className="column  is-half is-11-moible is-10-tablet is-6-widescreen ">
              <div className=" container">

                <div className="field">
                  <label className="label ">Username</label>
                  <div className="control">
                    <input className="input" type="text"
                      name="username"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.username} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Password</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="password"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.password} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Confirm Password</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="comfirmPassword"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.comfirmPassword} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="name"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.name} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Lastname</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="lastName"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.lastName} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Email</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="email"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.email} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">License number</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="license"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.license} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Province</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="province"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.province} />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">E_code</label>
                  <div className="control">
                    <input className="input" type="text" placeholder=""
                      name="e_code"
                      placeholder=""
                      onChange={this.handleChange}
                      value={this.state.userForm.e_code} />
                  </div>
                </div>
                <div className="field is-grouped is-pulled-right">
                  <div className="control">
                    <button className="button is-link">Submit</button>
                  </div>
                  <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>




    );
  }
}

export default Register