import React from 'react';
import axios from 'axios';
import qs from 'qs';
import {Link} from 'react-router-dom';

class LineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        username: '',
        password: '',
        comfirmPassword: '',
        name: '',
        lastName: '',
        citizen_id: '',
        email: '',
        license: '',
        province: '',
        e_code: '',
      },
      errors: {
        username: '',
        password: '',
        comfirmPassword: '',
        name: '',
        lastName: '',
        citizen_id: '',
        email: '',
        license: '',
        province: '',
        e_code: ''
      },
      checkNull: true,
      checkErrors: false,
      isLoading: false,
      emailInvalid: false,
      passwordInvalid: false,
      hidePassword: true,
      duplicateUser: false,
      duplicateEmail: false,
      duplicateLicense: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    let userForm = this.state.userForm;
    
    if (name === 'name') {
      userForm.name = value
      errors.name = !this.validateName(value) ? 'A-Z or ก-ฮ' : '';
    } else if (name === 'lastName') {
      userForm.lastName = value
      errors.lastName = !this.validateName(value) ? 'A-Z or ก-ฮ' : '';
    } else if (name === 'citizen_id') {
      userForm.citizen_id = value
      errors.citizen_id = !this.validateCitizenID(value) ? 'Number 13 digits' : '';
    } else if (name === 'email') {
      userForm.email = value
      errors.email = !this.validateEmail(value) ? 'Invalid Email' : '';
    } else if (name === 'e_code') {
      userForm.e_code = value
    }

    let checkNull = false;
    for (let i in userForm) {
      console.log(i)
      if (userForm[i] === '') {
        checkNull = true;
      }
    }

    let checkErrors = false;
    for (let i in errors) {
      if (errors[i].length > 0) {
        checkErrors = true;
      }
    }

    console.log(checkNull)
    this.setState({ userForm, errors, checkNull, checkErrors })
  }

  submit(event) {
    event.preventDefault();
    const userForm = this.state.userForm;
    const reqBody = {
      firstname: userForm.name,
      lastName: userForm.lastName,
      citizen_id: userForm.citizen_id,
      email: userForm.email,
      e_code: userForm.e_code,
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    console.log('in submit');

    axios.post('https://mlffts-api.herokuapp.com/register', qs.stringify(reqBody), config).then(
      res => {
        this.setState({isLoading: false})
      }).catch(err => {
        console.log('error ja')
        console.log(err)
      })

  }

  validateCitizenID = (user) => {
    let re = /^[0-9]*$/;
    return re.test(String(user));
  }

  validateName = (name) => {
    let re = /^[A-Za-z_]*$/;
    let reth = /^[ก-๏\s]+$/;
    return re.test(String(name)) || reth.test(String(name));
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  render() {
    let errors = this.state.errors;
    return (
      <div className="navbar-space">
         <nav className="navbar  is-fixed-top has-background-grey-darker" role="navigation" aria-label="main navigation">
           <div className="navbar-brand">
                    <Link to="/">
                        <div className="navbar-item">
                            <h1 className="title logo-nav"  onClick={() => window.location.reload()}>
                                MLFFTS
                        </h1>
                        </div>
                    </Link>
                </div>
            {/* <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="navbar-item button is-link has-text-white">
                                    <b>เข้าสู่ระบบ</b>
                                </a>
                            <a className="navbar-item button is-link has-text-white">
                                    <b>สมัครสมาชิก</b>
                                </a>
                        </div>
                    </div>
                </div>
            </div> */}
        </nav>

      <div className="section" style={{ padding: "1rem 1.5rem" }}>
        <div className="contianer">
          {/* <div className="topic">
            <h2 className="title is-1">Register</h2>
          </div> */}

          <div className="columns is-centered">
            <div className="column  is-half is-12-moible is-10-tablet is-6-widescreen ">
              <div className="register box">
                <div className=" container">

                  <h3 className="title is-2 has-text-centered">Please fill the form</h3>

                  <hr />

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
                          {errors.name.length > 0 && <span className='error'>{errors.name}</span>}
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
                          {errors.lastName.length > 0 && <span className='error'>{errors.lastName}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className=" ">Citizen ID</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="citizen_id"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.userForm.citizen_id} />
                          {errors.citizen_id.length > 0 && <span className='error'>{errors.citizen_id}</span>}
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
                          {errors.e_code.length > 0 && <span className='error'>{errors.e_code}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-grouped is-grouped-right" style={{ marginTop: "2em" }}>
                    <p className="control">
                      <button className="button is-dark" disabled={this.state.checkNull || this.state.checkErrors} onClick={this.submit}>
                        Submit
                    </button>
                    </p>
                    <p className="control">
                      <button className="button is-light">
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
      </div>



    );
  }
}

export default LineForm