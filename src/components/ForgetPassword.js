import React from 'react';
import axios from 'axios';
import qs from 'qs';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Lang from '../helpers/Lang';
import Modal from './Modal';

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        username: '',
        password: '',
        comfirmPassword: '',
        firstname: '',
        lastname: '',
        citizen_id: '',
        email: '',
        e_code: '',
      },
      errors: {
        username: '',
        password: '',
        comfirmPassword: '',
        firstname: '',
        lastname: '',
        citizen_id: '',
        email: '',
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
      duplicateLicense: false,
      isModal: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    let userForm = this.state.userForm;

    if (name === 'username') {
      userForm.username = value;
      errors.username = (value.length < 4 || !this.validateUser(value)) ? 'Username must be atleast 5 characters long' : '';
    } else if (name === 'password') {
      userForm.password = value
      errors.password = (value.length < 2 || !this.validatePassword(value)) ? 'Password must be atleast 2 characters long' : '';
    } else if (name === 'comfirmPassword') {
      userForm.comfirmPassword = value
      errors.comfirmPassword = (userForm.password !== value) ? 'Password and confirmation password do not match' : '';
    } else if (name === 'firstname') {
      userForm.firstname = value
      errors.firstname = !this.validateName(value) ? 'A-Z or ก-ฮ' : '';
    } else if (name === 'lastname') {
      userForm.lastname = value
      errors.lastname = !this.validateName(value) ? 'A-Z or ก-ฮ' : '';
    } else if (name === 'citizen_id') {
      userForm.citizen_id = value
      errors.citizen_id = !this.validateCitizenID(value) ? 'Number 13 digits' : '';
    } else if (name === 'email') {
      userForm.email = value
      errors.email = !this.validateEmail(value) ? 'Invalid Email' : '';
    } else if (name === 'license') {
      userForm.license = value
    } else if (name === 'province') {
      userForm.province = value
    } else if (name === 'e_code') {
      userForm.e_code = value
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

    console.log(checkNull, checkErrors)

    this.setState({ userForm, errors, checkNull, checkErrors })
  }

  submit(event) {
    event.preventDefault();
    const userForm = this.state.userForm;
    const reqBody = {
      username: userForm.username,
      password: userForm.password,
      firstname: userForm.firstname,
      lastname: userForm.lastname,
      citizen_id: userForm.citizen_id,
      email: userForm.email,
      license: userForm.license,
      province: userForm.province,
      e_code: userForm.e_code,
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    console.log('in submit');
    this.setState({ isLoading: true });

    axios.post('https://mlffts-api.herokuapp.com/register', qs.stringify(reqBody), config).then(
      res => {
        console.log(res)
        this.setState({ isLoading: false, isModal:true })
        // show modal and reload
      }).catch(err => {
        console.log('error ja')
        console.log(err)
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          this.setState({ isLoading: false })
          // console.log(err.response.headers);        
          // this.setState({ isLoading: false, isError: err.response.data })
        }
      })

  }

  validatePassword = (pass) => {
    let re = /^[A-Za-z0-9_<>()\[\]\\.,;:\s@"]*$/;
    return re.test(String(pass));
  }

  validateUser = (user) => {
    let re = /^[A-Za-z0-9_]*$/;
    return re.test(String(user));
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
        <nav className="navbar  is-fixed-top has-background-grey-darker  is-transparent" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/">
              <div className="navbar-item">
                <h1 className="title logo-nav">
                  MLFFTS
                        </h1>
              </div>
            </Link>

            <a className="navbar-burger" data-target="navbarList" onClick={this.handleMenu}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <a className="button Sarabun " href="/login">
                  <Lang lang={this.props.lang} en="Log In" th="เข้าสู่ระบบ" />
                </a>
              </div>
              <span className="my-divider"></span>
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
          </div>


        </nav>

        {
          this.state.isModal ?
            <Modal lang={this.props.lang}>
              <div className="box" style={{ padding: '2.5rem 2rem 1rem 2rem' , borderRadius:'5px'}}>
                <div className="columns has-text-centered is-centered">
                  <div className="column is-11">
                    <div className="container">
                      <span className="icon check-icon">
                        <i class="far fa-check-circle"></i>
                      </span>
                    </div>
                    <p className="title Sarabun" style={{marginTop:'1rem'}}><Lang lang={this.props.lang} en="Registration completed successfully" th="สมัครสมาชิกเสร็จสมบูรณ์" /></p>
                    <p className="subtitle Sarabun"><Lang lang={this.props.lang} en="Please check your registered email to activate your account" th="โปรดตรวจสอบอีเมลของคุณเพื่อเปิดใช้งานบัญชี" /></p>
                    <a className="button Sarabun modal-login-btn is-dark" href="/login"> <Lang lang={this.props.lang} en="Log In" th="เข้าสู่ระบบ" /></a>
                  </div>
                </div>
              </div>
            </Modal>
            : null
        }

        <div className="section" style={{ padding: "1rem 1.5rem" }}>
          <div className="contianer">

            <div className="columns is-centered">
              <div className="column  is-half is-12-moible is-10-tablet is-6-widescreen ">
                <div className="register box">
                  <div className=" container">
                    <h3 className="title is-2 has-text-centered Sarabun"><Lang lang={this.props.lang} en="Register" th="สมัครสมาชิก" /></h3>

                    <hr />
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="Username" th="ชื่อผู้ใช้" /> *</label>
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
                          {errors.username.length > 0 && <span className='error'>{errors.username}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="Password" th="รหัสผ่าน" /> *</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="password" placeholder=""
                              name="password"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.userForm.password} />
                            {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="Confirm Password" th="ยืนยันรหัสผ่าน" /> *</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="text" placeholder="" type="password"
                              name="comfirmPassword"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.userForm.comfirmPassword} />
                            {errors.comfirmPassword.length > 0 && <span className='error'>{errors.comfirmPassword}</span>}

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="Firstname" th="ชื่อ" /> *</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="text" placeholder=""
                              name="firstname"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.userForm.firstname} />
                            {errors.firstname.length > 0 && <span className='error'>{errors.firstname}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" "><Lang lang={this.props.lang} en="Lastname" th="นามสกุล" /> *</label>
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
                        <label className=" "><Lang lang={this.props.lang} en="Citizen ID" th="รหัสประชาชน" /> *</label>
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
                        <label className=" "><Lang lang={this.props.lang} en="Email" th="อีเมล" /> *</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="text" placeholder=""
                              name="email"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.userForm.email} />
                            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" ">E_code *</label>
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
                        <button className={`button is-dark ${this.state.isLoading ? 'is-active' : ''}`} disabled={this.state.checkNull || this.state.checkErrors} onClick={this.submit}>
                          <Lang lang={this.props.lang} en="Submit" th="ยืนยัน" />
                        </button>
                      </p>
                      <p className="control">
                        <button className="button is-light">
                          <a href="/">
                            <Lang lang={this.props.lang} en="Cancel" th="ยกเลิก" />
                          </a>
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

export default ForgetPassword;