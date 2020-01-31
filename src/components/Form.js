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
                <div className="field">
                  <label className="label ">Username</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Password</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Confirm Password</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Lastname</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Email</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">License number</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">Province</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
                  </div>
                </div>
                <div className="field">
                  <label className="label ">E_code</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="" />
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

export default Form