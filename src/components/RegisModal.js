import React from 'react'

class RegisModal extends React.Component {
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
    //   <div className="section gray-bg" style={{ padding: "1rem 1.5rem" }}>
    <div class="modal is-active">
  <div class="modal-background"></div>
        <div className="contianer">
          {/* <div className="topic">
            <h2 className="title is-1">Register</h2>
          </div> */}

          <div className="columns is-centered">
            <div className="column  is-half is-12-moible is-10-tablet is-6-widescreen ">
              <div className="register box">
                <div className=" container">
                  
                  <h3 className="title is-2 has-text-centered">Register</h3>

                  <hr/>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Username</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text"
                            name="username"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.username} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Password</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="password"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.password} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Confirm Password</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="comfirmPassword"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.comfirmPassword} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Name</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="name"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.name} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Lastname</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="lastName"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.lastName} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Email</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="email"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.email} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal long-label">
                    <div className="field-label is-normal">
                      <label className=" ">License number</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="license"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.license} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Province</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="province"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.province} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">E_code</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="e_code"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.e_code} />
                        </div>
                      </div>
                    </div>
                  </div>



                  <div class="field is-grouped is-grouped-right">
                    <p class="control">
                      <button class="button is-dark">
                        Submit
                    </button>
                    </p>
                    <p class="control">
                      <button class="button is-light">
                        Cancel
                    </button>
                    </p>
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

export default RegisModal;