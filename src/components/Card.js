import React from 'react';

function Card(props) {
    return (
        <div className="columns is-centered">
        <div className="column is-11">
            <div className="box">
                <div className="media">
                    <div className="media-left">
                        <p>ด่านทางเข้า : <b>KBT1_N2</b> </p>
                        <p>ด่านทางออก-ช่องทางที่ : <b>KBW2_X1-MX01</b></p>
                    </div>
                    <div className="media-content">
                        <p>ราคา : <b>40</b> บาท</p>
                        <p>เวลา : <b>28/10/2017  13:39:58</b></p>
                    </div>
                    <div className="media-right">

                        <a className="">
                            <figure class="image is-48x48">
                                <img class="is-rounded" src="/images/receipt.png" />
                            </figure></a>
                    </div>
                </div>


            </div>
        </div>
    </div>
    )
}

export default Card;