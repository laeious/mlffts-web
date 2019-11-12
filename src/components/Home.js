import React from 'react';
import Card from './Card';

class Home extends React.Component {

    render() {
        return (
            <div className="section athiti">
                {/* <section class="hero">
                    <div class="hero-body-l">
                        <div class="container">
                            <h1 class="title is-3">
                                MLFFTS
                            </h1>
                            <h2 class="subtitle is-6">
                                Multilane Free Flow Toll System
                            </h2>
                        </div>
                    </div>
                </section> */}

                <h1 class="title is-3">ประวัติค่าผ่านทางพิเศษ</h1>
                <div className="columns is-centered">
                    <div className="column is-10">
                       <Card />
                       <Card />
                       <Card />
                       <Card />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;