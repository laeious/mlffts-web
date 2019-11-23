import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
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
                <div class="field">
                  <label class="label ">Username</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">Password</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">Confirm Password</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">Name</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">Lastname</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">Email</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">License number</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">Province</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field">
                  <label class="label ">E_code</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="" />
                  </div>
                </div>
                <div class="field is-grouped is-pulled-right">
                  <div class="control">
                    <button class="button is-link">Submit</button>
                  </div>
                  <div class="control">
                    <button class="button is-link is-light">Cancel</button>
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

export default Form