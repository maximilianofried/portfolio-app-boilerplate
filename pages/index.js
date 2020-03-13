import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFlipping: false
        }

        this.roles = ['Foo', 'Fooooo', 'Faa', 'Faaaaa'];
    }

    animateCard() {
        this.cardAnimationInterval = setInterval(() => {
            this.setState({
                isFlipping: !this.state.isFlipping
            });
        }, 3000);
    }

    componentDidMount() {
        this.animateCard();
    }

    componentWillUnmount() {
        this.cardAnimationInterval && clearInterval(this.cardAnimationInterval);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {isFlipping} = this.state;
        return (
            <BaseLayout className={`cover ${isFlipping ? 'cover-1' : 'cover-0'}`} {...this.props.auth}
                        headerType="index"
                        title="Maximiliano Fried - Webpage">
            <div className="main-section">
                <div className="background-image">
                <img src="/static/images/background-index.png" />
                </div>
                <Container>
                <Row>
                    <Col md="6">
                    <div className="hero-section">
                        <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                        <div className="front">
                            <div className="hero-section-content">
                            <h2> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h2>
                            <div className="hero-section-content-intro">
                                Curabitur tristique mollis lacus.
                            </div>
                            </div>
                            <img alt="Guy programming welcome picture" className="image" src="/static/images/section-1.jpg"/>
                            <div className="shadow-custom">
                            <div className="shadow-inner"> </div>
                            </div>
                        </div>
                        <div className="back">
                            <div className="hero-section-content">
                            <h2> Lorem ipsum dolor sit amet, consectetur adipiscing elit </h2>
                            <div className="hero-section-content-intro">
                                Curabitur tristique mollis lacus.
                            </div>
                            </div>
                            <img alt="Guy programming welcome picture" className="image" src="/static/images/section-2.jpg"/>
                            <div className="shadow-custom shadow-custom-2">
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
                        Mauris posuere posuere purus id convallis.
                        Donec mattis fringilla orci ac imperdiet.
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
                    {/* <div className="hero-welcome-bio">
                        <h2>
                        Let's take at the black spirits.
                        </h2>
                    </div> */}
                    </Col>
                </Row>
                </Container>
            </div>
            </BaseLayout>

        )
    }
}

export default Index;
