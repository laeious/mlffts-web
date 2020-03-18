import React from 'react';
import Lang from '../helpers/Lang';

function Card(props) {
    return (
        <div className="columns is-centered is-gapless" style={{ 'margin': '0', 'paddingBottom': '0.4em', 'paddingTop': '0.1em' }}>
            <div className="column is-11 small-padding-btm">
                <div className="box small-padding-btm">
                    <div className="columns is-mobile ">
                        <div className="column is-10 small-padding-btm">
                            <div className="columns is-hidden-touch">
                                <div className="column is-5 no-padding-btm">
                                    <p><Lang lang={props.lang} en="Entry plaza" th="ด่านทางเข้า" /> : <b>{props.entry}</b> </p>
                                    <p><Lang lang={props.lang} en="Exit plaza" th="ด่านทางออก" /> : <b>{props.exit}</b></p>
                                </div>
                                <div className="column is-7 no-padding-left no-padding-btm">
                                    <p><Lang lang={props.lang} en="Cost" th="ราคา" /> : <b>{props.cost}</b> <Lang lang={props.lang} en="Baht" th="บาท" /></p>
                                    <p><Lang lang={props.lang} en="Time" th="เวลา" /> : <b>{props.time}</b></p>

                                </div>
                            </div>
                            <div className="columns is-hidden-touch">
                                <div className="column no-padding-top-btm" >
                                <p><Lang lang={props.lang} en="License Plate" th="ป้ายทะเบียนรถ"/> : <b>{props.lp}</b></p>
                                </div>
                            </div>

                            <div className="columns is-hidden-desktop">
                                <div className="column">
                                    <p><Lang lang={props.lang} en="Entry plaza" th="ด่านทางเข้า" /> : <b>{props.entry}</b>  :  </p>
                                    <p><Lang lang={props.lang} en="Exit plaza" th="ด่านทางออก" /> : <b>{props.exit}</b></p>
                                    <p><Lang lang={props.lang} en="Time" th="เวลา" /> : <b>{props.time}</b></p>
                                    <p><Lang lang={props.lang} en="Cost" th="ราคา" /> : <b>{props.cost}</b> <Lang lang={props.lang} en="Baht" th="บาท" /></p>
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