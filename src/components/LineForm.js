import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { Link } from 'react-router-dom';
import Lang from '../helpers/Lang';

class LineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        firstname: '',
        lastname: '',
        citizen_id: '',
        e_code: '',
      },
      errors: {
        firstname: '',
        lastname: '',
        citizen_id: '',
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

    if (name === 'firstname') {
      userForm.firstname = value
      errors.firstname = !this.validateName(value) ? '[A-Z/ก-ฮ]' : '';
    } else if (name === 'lastname') {
      userForm.lastname = value
      errors.lastname = !this.validateName(value) ? '[A-Z/ก-ฮ]' : '';
    } else if (name === 'citizen_id') {
      userForm.citizen_id = value
      if (this.props.lang === 'en') {
        errors.citizen_id = !this.validateCitizenID(value) ? 'Invalid Citizen ID' : '';
      } else {
        errors.citizen_id = !this.validateCitizenID(value) ? 'รหัสประชาชนไม่ถูกต้อง' : '';
      }
    } else if (name === 'e_code') {
      userForm.e_code = value
      if (this.props.lang === 'en') {
        errors.e_code = !this.validateEcode(value) ? 'Invalid E_code' : '';
      } else {
        errors.e_code = !this.validateEcode(value) ? 'E_code ไม่ถูกต้อง' : '';
      }
    }

    let checkNull = false;
    for (let i in userForm) {
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
      line_id: this.props.user.line_id,
      firstname: userForm.firstname,
      lastname: userForm.lastname,
      citizen_id: userForm.citizen_id,
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
        console.log(res.data)
        // this.setState({ isLoading: false })
      }).catch(err => {
        console.log(err)
        if (err.response) {
          console.log(err.response.data)
      }
      })

  }

  validateCitizenID = (user) => {
    let re = /^(\d{13})$/;
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

  validateEcode= (user) => {
    let re = /^(\d{10})$/;
    return re.test(String(user));
  }

  render() {
    let errors = this.state.errors;
    return (
      <div className="navbar-space">
        <nav className="navbar  is-fixed-top has-background-grey-darker" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/">
              <div className="navbar-item">
                <h1 className="title logo-nav" onClick={() => window.location.reload()}>
                  MLFFTS
                        </h1>
              </div>
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-text-white has-border-left">
              <span id="th-button" className={this.props.lang === 'th' ? 'lang-active' : ''}
                onClick={this.props.toggleLang}
              >TH </span>
                                        /
                                        <span id="en-button" className={this.props.lang === 'en' ? 'lang-active' : ''}
                onClick={this.props.toggleLang}
              > EN</span>
            </div>
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

                    <h3 className="title is-2 has-text-centered Sarabun"><Lang lang={this.props.lang} en="Please fill the form" th="กรุณากรอกแบบฟอร์ม" /></h3>

                    <hr />

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="First Name" th="ชื่อ" /></label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="text" placeholder=""
                              name="firstname"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.userForm.name} />
                            {errors.firstname.length > 0 && <span className='error'>{errors.firstname}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="Last Name" th="นามสกุล" /></label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="text" placeholder=""
                              name="lastname"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.userForm.lastname} />
                            {errors.lastname.length > 0 && <span className='error'>{errors.lastname}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="Citizen ID" th="รหัสประชาชน" /></label>
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