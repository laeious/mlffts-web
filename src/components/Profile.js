import React from 'react';
import axios from 'axios';
import qs from 'qs';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

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
        line_id: ''
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
    } else if (name === 'license') {
      userForm.license = value
    } else if (name === 'province') {
      userForm.province = value
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
        this.setState({ isLoading: false })
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

  addLineNoti = () => {
    window.open("https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=30zspWaxsQs0We0MzyM4Qv&redirect_uri=http://localhost:8080/noti&state=12345abcde&scope=notify");
  }

  render() {

    console.log(this.props.user)
    let errors = this.state.errors;
    if (!this.state.user) {
      return null
    }


    return (
      <div className="">
        <div className="section" style={{ padding: "1rem 1.5rem" }}>
          <div className="contianer">

            <div className="columns is-centered">
              <div className="column  is-half is-12-moible is-10-tablet is-6-widescreen ">
                <div className="box">
                  <div className=" container has-text-centered">
                    <h3 className="title is-2 has-text-centered athiti">PROFILE</h3>

                    <hr />

                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className=" ">Name</label>
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
                        <label className=" ">Lastname</label>
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
                        <label className=" ">Citizen ID</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input className="input" type="text" placeholder=""
                              name="citizen_id"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.user.citizen_id} />
                            {errors.citizen_id.length > 0 && <span className='error'>{errors.citizen_id}</span>}
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
                              value={this.state.user.email} />
                            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
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
                              name="e_code_id"
                              placeholder=""
                              onChange={this.handleChange}
                              value={this.state.user.e_code_id} />
                            {errors.e_code_id.length > 0 && <span className='error'>{errors.e_code_id}</span>}
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
                          this.state.user.line_id ?
                            <button class="button is-danger is-outlined">
                              <span>{this.state.user.line_id}</span>
                              <span class="icon is-small">
                                <i class="fas fa-times"></i>
                              </span>
                            </button>
                            :
                            <a href="https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=30zspWaxsQs0We0MzyM4Qv&redirect_uri=http://localhost:8080/noti&state=12345abcde&scope=notify">
                              <button className="button line-noti-btn is-outlined">
                                <span>Get Notify!</span>
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
                        <button className="button is-primary" disabled={this.state.checkNull || this.state.checkErrors} onClick={this.submit}>
                          Submit
                    </button>
                      </p>
                      <p className="control">
                        <button className="button is-light">
                          <a href="/">
                            Cancel
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