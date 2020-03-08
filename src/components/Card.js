import React from 'react';

function Card(props) {
    return (
        <div className="columns is-centered" style={{'margin':'0'}}>
            <div className="column is-11 no-padding-btm">
                <div className="box no-padding-btm">
                    <div className="columns is-mobile ">
                        <div className="column is-10 no-padding-btm">
                            <div className="columns is-hidden-touch">
                                <div className="column is-6">
                                    <p>ด่านทางเข้า : <b>KBT1_N2</b> </p>
                                    <p>ด่านทางออก : <b>KBW2_X1</b></p>
                                </div>
                                <div className="column is-6 no-padding-left">
                                    <p>ราคา : <b>40</b> บาท</p>
                                    <p>เวลา : <b>28/10/2017  13:39:58</b></p>
                                </div>
                            </div>
                            <div className="columns is-hidden-desktop">
                                <div className="column">
                                    <p>ด่านทางเข้า : <b>KBT1_N2</b> </p>
                                    <p>ด่านทางออก : <b>KBW2_X1</b></p>
                                    <p>เวลา : <b>28/10/2017  13:39:58</b></p>
                                    <p>ราคา : <b>40</b> บาท</p>
                                </div>
                            </div>
                        </div>
                        <div className="column is-2  is-centered has-text-centered  is-hidden-desktop recipe-icon-box ">
                            <figure className="image is-1by1 ">
                                <img className="is-rounded recipe-icon" src="/images/receipt.png" />
                            </figure>
                        </div>
                        <div className="column is-2  is-centered has-text-centered  is-hidden-touch recipe-icon-box">
                            <figure className="image is-48x48  is-inline-block ">
                                <img className="is-rounded recipe-icon" src="/images/receipt.png" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;