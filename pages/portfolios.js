import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCard from '../components/portfolios/PortfolioCard';
import {Col, Row, Button} from 'reactstrap';
import {getPortfolios, deletePortfolio} from '../actions';
import {Router} from '../routes';
class Portfolio extends React.Component {

    static async getInitialProps() {
        let portfolios = [];
        try {
            portfolios = await getPortfolios();
            portfolios = response.data;
        } catch(err) {
            console.log(err);
        }
        return {portfolios};
    }

    navigateToEdit(portfolioId, e) {
        e.stopPropagation();
        Router.pushRoute(`/portfolios/${portfolioId}/edit`)
    }

    displayDeleteWarning(portfolioId, e) {
        e.stopPropagation();
        const isConfirm = confirm('You are about to delete this portfolio');
        if(isConfirm) {
            this.deletePortfolio(portfolioId);
        }
        else {

        }
    }

    deletePortfolio(portfolioId) {
        deletePortfolio(portfolioId)
            .then(() => {
                Router.pushRoute('/portfolios');
            })
            .catch(err => console.log(err));
    }

    renderPortfolios(portfolios) {
        const {isAuthenticated, isSiteOwner} = this.props.auth;

        return portfolios.map((portfolio, index) => {
            return(
                <Col md="4" key={index}>
                    <PortfolioCard portfolio={portfolio}>
                        {isAuthenticated && isSiteOwner &&
                            <React.Fragment>
                                <Button onClick={(e) => this.navigateToEdit(portfolio._id, e)} color="warning">Edit</Button>{'  '}
                                <Button onClick={(e) => this.displayDeleteWarning(portfolio._id, e)} color="danger">Delete</Button>
                            </React.Fragment>
                        }
                    </PortfolioCard>
                </Col>
            )
        })
    }
    render() {
        const {portfolios} = this.props;
        const {isAuthenticated, isSiteOwner} = this.props.auth;

        return (
            <BaseLayout title="Maximiliano Fried - See My Portfolio" {...this.props.auth}>
                <BasePage className="portfolio-page" title="Portfolio Page">
                    {   isAuthenticated && isSiteOwner &&
                        <Button onClick={() => Router.pushRoute('/portfolios/new')}
                                color="success"
                                className="create-port-btn">Create Portfolio
                        </Button>
                    }
                    <Row>
                        {this.renderPortfolios(portfolios)}
                    </Row>
                </BasePage>
            </BaseLayout>
        )
    }
}

export default Portfolio;