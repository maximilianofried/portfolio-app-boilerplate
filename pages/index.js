import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.roles = ['Drug Addict', 'Hacker', 'Activist', 'Pornstar'];
    }
    render() {
        const {isAuthenticated, user} = this.props.auth;
        return (
            <BaseLayout {...this.props.auth} className="cover" headerType="index">
            <div className="main-section">
                <div className="background-image">
                <img src="/static/images/background-index.png" />
                </div>
                <Container>
                <Row>
                    <Col md="6">
                    <div className="hero-section">
                        <div className={`flipper`}>
                        <div className="back">
                            <div className="hero-section-content">
                            <h2> Violador serial borracho y machista </h2>
                            <div className="hero-section-content-intro">
                                Have a look at my portfolio and job history.
                            </div>
                            </div>
                            <img className="image" src="/static/images/section-1.png"/>
                            <div className="shadow-custom">
                            <div className="shadow-inner"> </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </Col>
                    <Col md="6" className="hero-welcome-wrapper">
                    <div className="hero-welcome-text">
                        <h1>
                        {isAuthenticated && <span><b>{user.name} </b></span>}
                        Welcome to the hell.
                        Get informed, collaborate and discover many ways to die!
                        </h1>
                        <Typed
                            loop
                            typeSpeed={60}
                            backSpeed={60}
                            strings={this.roles}
                            shuffle={false}
                            backDelay={1000}
                            loopCount={0}
                            showCursor
                            cursorChar="|"
                            className="self-typed"
                            />
                    </div>
                    <div className="hero-welcome-bio">
                        <h1>
                        Let's take at the black spirits.
                        </h1>
                    </div>
                    </Col>
                </Row>
                </Container>
            </div>
            </BaseLayout>

        )
    }
}

export default Index;
