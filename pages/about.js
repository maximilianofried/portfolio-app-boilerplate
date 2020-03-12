import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import { Row, Col } from 'reactstrap';
class About extends React.Component {
    render() {
        return (
            <BaseLayout title="Maximiliano Fried - Learn More About Me" {...this.props.auth}>
                <BasePage className="about-page" title="About Page">
                    <Row className="mt-5">
                        <Col md="6">
                            <div className="left-side">
                                <h1 className="title fadein">Hello, Welcome</h1>
                                <h4 className="subtitle fadein">To About Page</h4>
                                <p className="subsubTitle fadein">Feel free to read short description about me.</p>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="fadein" id="intro">
                                <p>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</p>
                                <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
                                    Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                                    similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth()(About);
