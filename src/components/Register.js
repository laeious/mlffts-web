import React from 'react';
import axios from 'axios';
import qs from 'qs';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Lang from '../helpers/Lang';
import Modal from './Modal';

class Register extends React.Component {
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
        e_code: [''],
      },
      errors: {
        username: '',
        password: '',
        comfirmPassword: '',
        firstname: '',
        lastname: '',
        citizen_id: '',
        email: '',
      },
      errorEcode: [true],
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
      if (this.props.lang === 'en') {
        errors.username = (value.length < 4 || !this.validateUser(value)) ? 'Username must be atleast 5 characters long' : '';
      } else {
        errors.username = (value.length < 4 || !this.validateUser(value)) ? 'ต้องมีความยาวอย่างน้อย 5 ตัวอักษร' : '';
      }
    } else if (name === 'password') {
      userForm.password = value

      if (this.props.lang === 'en') {
        errors.password = (value.length < 5 || !this.validatePassword(value)) ? 'Password must be atleast 6 characters long' : '';
      } else {
        errors.password = (value.length < 5 || !this.validatePassword(value)) ? 'ต้องมีความยาวอย่างน้อย 6 ตัวอักษร' : '';
      }
    } else if (name === 'comfirmPassword') {
      userForm.comfirmPassword = value
      if (this.props.lang === 'en') {
        errors.comfirmPassword = (userForm.password !== value) ? 'Password and confirmation password do not match' : '';
      } else {
        errors.comfirmPassword = (userForm.password !== value) ? 'รหัสผ่านทั้งสองช่องไม่ตรงกัน' : '';
      }
    } else if (name === 'firstname') {
      userForm.firstname = value
      errors.firstname = !this.validateName(value) ? '[a-zA-Z] หรือ [ก-ฮ]' : '';
    } else if (name === 'lastname') {
      userForm.lastname = value
      errors.lastname = !this.validateName(value) ? '[a-zA-Z] หรือ [ก-ฮ]' : '';
    } else if (name === 'citizen_id') {
      userForm.citizen_id = value
      if (this.props.lang === 'en') {
        errors.citizen_id = !this.validateCitizenID(value) ? 'Invalid Citizen ID' : '';
      } else {
        errors.citizen_id = !this.validateCitizenID(value) ? 'รหัสประชาชนไม่ถูกต้อง' : '';
      }
    } else if (name === 'email') {
      userForm.email = value
      if (this.props.lang === 'en') {
        errors.email = !this.validateEmail(value) ? 'Invalid Email' : '';
      } else {
        errors.email = !this.validateEmail(value) ? 'อีเมลไม่ถูกต้อง' : '';
      }
    }
    // else if (name === 'e_code') {
    //   userForm.e_code = value

    //   if (this.props.lang === 'en') {
    //     errors.e_code = !this.validateEcode(value) ? 'Invalid E_code' : '';
    //   } else {
    //     errors.e_code = !this.validateEcode(value) ? 'E_code ไม่ถูกต้อง' : '';
    //   }
    // }

    let checkNull = false;
    console.log(userForm)
    for (let i in userForm) {
      console.log(typeof(i), i)
      if (userForm[i] === '' && i !== 'e_code' ) {
        console.log(i)
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

  addECode = () => {
    let e_code = [...this.state.userForm.e_code, ''];
    let errorEcode = e_code.map(el => { return this.validateEcode(el)})
    this.setState(prevState => ({ userForm: {...this.state.userForm, e_code}, errorEcode}))
  }

  deleteECode = (i) => {
    let e_code = [...this.state.userForm.e_code];
    e_code.splice(i,1);
    this.setState({ userForm: {...this.state.userForm, e_code} });
  }

  ECodeHandle = (i, event) => {
    let e_code = [...this.state.userForm.e_code];
    e_code[i] = event.target.value;
    let errorEcode = e_code.map(el => {return this.validateEcode(el)})
    let checkErrors = false;
    console.log(errorEcode)
    for (let i in errorEcode) {
      if (!i) {
        checkErrors = true;
      }
    }
    
    this.setState({  userForm: {...this.state.userForm, e_code} , errorEcode, checkErrors});
  }

  submit(event) {
    // event.preventDefault();
    this.setState({ isLoading: true });

    const userForm = this.state.userForm;
    let e_code = userForm.e_code;
    e_code = e_code.filter( (item) => {return item!==''})
    let e_code_list = JSON.stringify({e_code});
    console.log(e_code_list)

    const reqBody = {
      username: userForm.username,
      password: userForm.password,
      firstname: userForm.firstname,
      lastname: userForm.lastname,
      citizen_id: userForm.citizen_id,
      email: userForm.email,
      e_code_list
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    console.log('in submit');
    console.log(reqBody)

    axios.post('https://mlffts-api.herokuapp.com/register', qs.stringify(reqBody), config).then(
      res => {
        console.log(this.state.isLoading)
        console.log(res)
        this.setState({ isLoading: false, isModal: true })
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
    let re = /^(\d{13})$/;
    return re.test(String(user));
  }

  validateEcode = (user) => {
    let re = /^(\d{10})$/;
    if(user === ''){ return true }
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
    console.log(this.state.userForm.e_code)
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
              <div className="box" style={{ padding: '2.5rem 2rem 1rem 2rem', borderRadius: '5px' }}>
                <div className="columns has-text-centered is-centered">
                  <div className="column is-11">
                    <div className="container">
                      <span className="icon check-icon">
                        <i className="far fa-check-circle"></i>
                      </span>
                    </div>
                    <p className="title Sarabun" style={{ marginTop: '1rem' }}><Lang lang={this.props.lang} en="Registration completed successfully" th="สมัครสมาชิกเสร็จสมบูรณ์" /></p>
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
                        <label className=" "><Lang lang={this.props.lang} en="Username" th="ชื่อผู้ใช้" /> <span className="red-span">*</span></label>
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
                        <label className=" "><Lang lang={this.props.lang} en="Password" th="รหัสผ่าน" /> <span className="red-span">*</span></label>
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
                        <label className=" "><Lang lang={this.props.lang} en="Confirm Password" th="ยืนยันรหัสผ่าน" /> <span className="red-span">*</span></label>
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
                        <label className=" "><Lang lang={this.props.lang} en="First Name" th="ชื่อ" /> <span className="red-span">*</span></label>
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
                        <label className=" "><Lang lang={this.props.lang} en="Last Name" th="นามสกุล" /> <span className="red-span">*</span></label>
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
                        <label className=" "><Lang lang={this.props.lang} en="Citizen ID" th="รหัสประชาชน" /> <span className="red-span">*</span></label>
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
                        <label className=" "><Lang lang={this.props.lang} en="Email" th="อีเมล" /> <span className="red-span">*</span></label>
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

                    {
                      this.state.userForm.e_code.map((el, i) => {
                        if (i !== 0) {
                          return (
                            <div className="field  is-horizontal" key={i}>
                              <div className="field-label is-normal">
                                <label className=" ">E_code</label>
                              </div>
                              <div className="field-body">
                                <div className="field has-addons">
                                  <div className="control is-expanded">
                                    <input className="input" type="text" placeholder=""
                                      name="e_code"
                                      placeholder=""
                                      onChange={this.ECodeHandle.bind(this,i)}
                                      value={el} />
                                    {!this.state.errorEcode[i] && <span className='error'><Lang lang={this.props.lang} en='Invalid E_code' th='E_code ไม่ถูกต้อง'/></span>}
                                  </div>
                                  <div className="control">
                                    <a className="button is-danger" onClick={this.deleteECode.bind(this,i)}>
                                      <span className="icon is-small">
                                        <i className="fas fa-times " ></i>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div className="field  is-horizontal" key={i}>
                              <div className="field-label is-normal">
                                <label className=" ">E_code <span className="red-span">*</span></label>
                              </div>
                              <div className="field-body">
                                <div className="field">
                                  <div className="control">
                                    <input className="input" type="text" placeholder=""
                                      name="e_code"
                                      placeholder=""
                                      onChange={this.ECodeHandle.bind(this,i)}
                                      value={el} />
                                    {!this.state.errorEcode[i] && <span className='error'><Lang lang={this.props.lang} en='Invalid E_code' th='E_code ไม่ถูกต้อง'/></span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })}

                    <div className="field  is-horizontal" >
                      <div className="field-label is-normal">
                        <label className=" "></label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <buttoon className="button is-fullwidth is-light" onClick={this.addECode}>
                              <span className="icon is-small"><i className="fas fa-plus-circle"></i></span>
                              <span><Lang lang={this.props.lang} en="Add E_code" th="เพิ่ม E_code" /></span>
                            </buttoon>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="field is-grouped is-grouped-right" style={{ marginTop: "2em" }}>
                      <p className="control">
                        {
                          console.log(this.state.checkNull, this.state.checkErrors, this.state.userForm.e_code[0]==='')
                        }
                        <button className={`button is-dark ${this.state.isLoading ? 'is-loading' : ''}`} disabled={this.state.checkNull || this.state.checkErrors || this.state.userForm.e_code[0]===''} onClick={this.submit}>
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

export default Register