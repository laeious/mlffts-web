import React from 'react';
import axios from 'axios';
import qs from 'qs';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import getToken from '../helpers/getToken';
import Lang from '../helpers/Lang';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userForm: {
        firstname: '',
        lastname: '',
        citizen_id: '',
        line_id: '',
        email: '',
        e_code_id: '',
      },
      errors: {
        firstname: '',
        lastname: '',
        citizen_id: '',
        line_id: '',
        email: '',
        e_code_id: '',
        line_id: ''
      },
      originalEcode: this.props.user.e_code_id,
      errorEcode: this.props.user.e_code_id.map(el => true),
      checkNull: false,
      checkErrors: false,
      isLoading: false,
      emailInvalid: false,
      passwordInvalid: false,
      hidePassword: true,
      duplicateUser: false,
      duplicateEmail: false,
      duplicateLicense: false,
      isCancel: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    let userForm = this.state.user;

    if (name === 'firstname') {
      userForm.firstname = value
      errors.firstname = !this.validateName(value) ? 'A-Z/a-z/ก-ฮ' : '';
    } else if (name === 'lastname') {
      userForm.lastname = value
      errors.lastname = !this.validateName(value) ? 'A-Z/a-z/ก-ฮ' : '';
    } else if (name === 'citizen_id') {
      userForm.citizen_id = value
      errors.citizen_id = !this.validateCitizenID(value) ? 'Invalid Citizen ID' : '';
    } else if (name === 'email') {
      userForm.email = value
      errors.email = !this.validateEmail(value) ? 'Invalid Email' : '';
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

    this.setState({ user: userForm, errors, checkNull, checkErrors })
  }

  checkObjects = (id, list) => {
    for(let i=0; i<list.length; i++){
      if(list[i].e_code_id === id){
        return true
      }
    }
    return false
  }

  submitAdd = (e_code) => {

    const reqBody = {
      e_code: e_code
    }
    console.log(reqBody)

    const token = getToken();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      }
    }

    console.log('in add submit');

    axios.post('https://mlffts-api.herokuapp.com/ecodemap/add', qs.stringify(reqBody), config).then(
      res => {
        console.log(res);
        this.setState({ isLoading: false })
      }).catch(err => {
        console.log('error ja')
        console.log(err)
        if (err.response) {
          console.log(err.response.data);
          console.log((err.response));

          console.log(err.response.status);
          console.log(err.response.headers);
        }
      })
  }
  
  submitDelete = (id) => {
    
    const reqBody = {
      e_code_id: id
    }
    console.log(reqBody)

    const token = getToken();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      }
    }

    console.log('in delete submit');

    axios.post('https://mlffts-api.herokuapp.com/ecodemap/delete', qs.stringify(reqBody), config).then(
      res => {
        console.log(res);
        this.setState({ isLoading: false })
      }).catch(err => {
        console.log('error ja')
        console.log(err)
        if (err.response) {
          console.log(err.response.data);
          console.log((err.response));

          console.log(err.response.status);
          console.log(err.response.headers);
        }
      })
  }

  
  submit(event) {
    event.preventDefault();

    let promises = [];

    const userForm = this.state.user;
    const reqBody = {
      firstname: userForm.firstname,
      lastname: userForm.lastname,
      email: this.state.user.line_id ? null : userForm.email
    }
    console.log(reqBody)

 
    console.log(this.state.originalEcode);
    console.log(this.state.user.e_code_id);
    let oldE = this.state.originalEcode;
    let newE = this.state.user.e_code_id

    for(let i=0; i<oldE.length; i++){
      let check = this.checkObjects(oldE[i].e_code_id, newE)
      if(!check){
        this.submitDelete(oldE[i].e_code_id);
      }
    }

    for(let i=0; i<newE.length; i++){
      if(newE[i].e_code_id === null){
        this.submitAdd(newE[i].e_code)
      }
    }


    const token = getToken();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      }
    }

    console.log('in submit');

    axios.post('https://mlffts-api.herokuapp.com/profile/edit', qs.stringify(reqBody), config).then(
      res => {
        console.log(res);
        this.setState({ isLoading: false })
      }).catch(err => {
        console.log('error ja')
        console.log(err)
        if (err.response) {
          console.log(err.response.data);
          console.log((err.response));

          console.log(err.response.status);
          console.log(err.response.headers);
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

  addLineNoti = () => {
    window.open("https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=30zspWaxsQs0We0MzyM4Qv&redirect_uri=http://localhost:8080/noti&state=12345abcde&scope=notify");
  }

  cancelLineNoti = () => {
    this.setState({ isCancel: true })
        
    const reqBody = {
      access_token: null
    }
    console.log(reqBody)

    const token = getToken();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      }
    }

    axios.post('https://mlffts-api.herokuapp.com/notify/update ', qs.stringify(reqBody), config).then(
      res => {
        console.log(res);
        this.setState({ isLoading: false })
      }).catch(err => {
        console.log('error ja')
        console.log(err)
        if (err.response) {
          console.log(err.response.data);
          console.log((err.response));

          console.log(err.response.status);
          console.log(err.response.headers);
        }
      })

  }

  validateEcode = (user) => {
    let re = /^(\d{10})$/;
    if(user === ''){ return true }
    return re.test(String(user));
  }

  addECode = () => {
    let e_code_id = [...this.state.user.e_code_id, {e_code_id: null,e_code:''}];
    let errorEcode = e_code_id.map(el => { return this.validateEcode(el.e_code)})
    this.setState(prevState => ({ user: {...prevState.user, e_code_id}, errorEcode}))
  }

  deleteECode = (i) => {
    let e_code_id = [...this.state.user.e_code_id];
    e_code_id.splice(i,1);
    this.setState({ user: {...this.state.user, e_code_id} });
  }

  ECodeHandle = (i, event) => {
    let e_code_id = [...this.state.user.e_code_id];
    e_code_id[i].e_code = event.target.value;
    let errorEcode = e_code_id.map(el => {return this.validateEcode(el.e_code)})
    let checkErrors = false;

    for (let i in errorEcode) {
      if (!errorEcode[i]) {
        checkErrors = true;
      }
    }
    
    
    this.setState({  user: {...this.state.user, e_code_id} , errorEcode, checkErrors});
  }

  render() {

    console.log(this.props.user)
    let errors = this.state.errors;
    if (!this.state.user) {
      return null
    }

    console.log(this.state.user.e_code_id)

    let checkEcodeEmpty = (this.state.user.e_code_id.length === 1  && this.state.user.e_code_id[0].e_code === '');


    return (
      <div className="">
        <div className="section" style={{ padding: "1rem 1.5rem" }}>
          <div className="contianer">

            <div className="columns is-centered">
              <div className="column  is-half is-12-moible is-10-tablet is-6-widescreen ">
                <div className="box">
                  <div className=" container has-text-centered">
                    <h3 className="title is-2 has-text-centered Sarabun"><Lang lang={this.props.lang} en="Profile" th="โปรไฟล์" /></h3>

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
                              value={this.state.user.firstname} />
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
                              value={this.state.user.lastname} />
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
                              value={this.state.user.citizen_id}
                              readOnly />
                            {errors.citizen_id.length > 0 && <span className='error'>{errors.citizen_id}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    {!this.state.user.line_id &&
                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className=" "><Lang lang={this.props.lang} en="Email" th="อีเมล" /></label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <input className="input" type="text" placeholder=""
                                name="email"
                                placeholder=""
                                onChange={this.handleChange}
                                value={this.state.user.email} />
                              {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                            </div>
                          </div>
                        </div>
                      </div>}


                    {
                      this.state.user.e_code_id.map((el, i) => {
                        if(this.state.user.e_code_id.length === 1) {
                          return (
                            <div className="field is-horizontal" key={i}>
                              <div className="field-label is-normal">
                                <label className=" ">E_code</label>
                              </div>
                              <div className="field-body">
                                <div className="field  has-addons">
                                  <div className="control is-expanded">
                                    <input className="input" type="text" placeholder=""
                                      name="e_code_id"
                                      placeholder=""
                                      onChange={this.ECodeHandle.bind(this,i)}
                                      value={el.e_code} />
                                    {!this.state.errorEcode[i] && <span className='error'><Lang lang={this.props.lang} en='Invalid E_code' th='E_code ไม่ถูกต้อง'/></span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        if (i === 0 && this.state.user.e_code_id.length > 1) {
                          return (
                            <div className="field is-horizontal" key={i}>
                              <div className="field-label is-normal">
                                <label className=" ">E_code</label>
                              </div>
                              <div className="field-body">
                                <div className="field  has-addons">
                                  <div className="control is-expanded">
                                    <input className="input" type="text" placeholder=""
                                      name="e_code_id"
                                      placeholder=""
                                      onChange={this.ECodeHandle.bind(this,i)}
                                      value={el.e_code} />
                                    {!this.state.errorEcode[i] && <span className='error'><Lang lang={this.props.lang} en='Invalid E_code' th='E_code ไม่ถูกต้อง'/></span>}
                                  </div>
                                  <div className="control">
                                    <a className="button is-danger" onClick={this.deleteECode.bind(this, i)}>
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
                            <div className="field is-horizontal" key={i}>
                              <div className="field-label is-normal">
                                <label className=" "></label>
                              </div>
                              <div className="field-body">
                                <div className="field  has-addons">
                                  <div className="control is-expanded">
                                    <input className="input" type="text" placeholder=""
                                      name="e_code_id"
                                      placeholder=""
                                      onChange={this.ECodeHandle.bind(this,i)}
                                      value={el.e_code} />
                                    {!this.state.errorEcode[i] && <span className='error'><Lang lang={this.props.lang} en='Invalid E_code' th='E_code ไม่ถูกต้อง'/></span>}
                                  </div>
                                  <div className="control">
                                    <a className="button is-danger" onClick={this.deleteECode.bind(this, i)}>
                                      <span className="icon is-small">
                                        <i className="fas fa-times " ></i>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }


                      })
                    }




                    <div className="field  is-horizontal" >
                      <div className="field-label is-normal">
                        <label className=" "></label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <button className="button is-fullwidth is-light" onClick={this.addECode} disabled={!this.validateEcode(this.state.user.e_code_id[this.state.user.e_code_id.length-1].e_code) || this.state.user.e_code_id[this.state.user.e_code_id.length-1].e_code === ''}>
                              <span className="icon is-small"><i className="fas fa-plus-circle"></i></span>
                              <span><Lang lang={this.props.lang} en="Add E_code" th="เพิ่ม E_code" /></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" ">Line Notification</label>
                      </div>
                      <div className="field-body">
                        {
                          (this.state.user.access_token && !this.state.isCancel) ?
                            <button className="button is-danger is-outlined" onClick={this.cancelLineNoti}>
                              <span><Lang lang={this.props.lang} en="Cancel Line Notify" th="ยกเลิก Line Notify" /></span>
                              <span className="icon is-small">
                                <i className="fas fa-times"></i>
                              </span>
                            </button>
                            :
                            // <a href="https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=30zspWaxsQs0We0MzyM4Qv&redirect_uri=http://localhost:8080/noti&state=12345abcde&scope=notify">
                            <a href="https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=30zspWaxsQs0We0MzyM4Qv&redirect_uri=https://mlffts-web.herokuapp.com/noti&state=12345abcde&scope=notify">
                              <button className="button line-noti-btn is-outlined">
                                <span><Lang lang={this.props.lang} en="Get Line Notify" th="ใช้ Line Notify" /></span>
                              </button>
                            </a>

                        }
                      </div>
                      {/* <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input className="input" type="text" placeholder=""
                            name="line_id"
                            placeholder=""
                            onChange={this.handleChange}
                            value={this.state.user.line_id} />
                          {errors.line_id.length > 0 && <span className='error'>{errors.line_id}</span>}
                        </div>
                      </div>
                    </div> */}
                    </div>
                    <div className="field is-grouped is-grouped-right" style={{ marginTop: "2em" }}>
                      <p className="control">
                        <button className="button is-dark" disabled={this.state.checkNull || this.state.checkErrors || checkEcodeEmpty} onClick={this.submit}>
                          <Lang lang={this.props.lang} en="Save changes" th="บันทึก" />
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

export default Profile