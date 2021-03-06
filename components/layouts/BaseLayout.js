import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = (props) => {
    const { className, children, isAuthenticated, user, isSiteOwner, cannonical } = props;
    const headerType = props.headerType || 'defualt';
    const title = props.title || 'Fried Maximiliano Web';
    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content="My name is Fried Maximiliano and I am an experienced software engineer and freelance developer. I have a Master's degree in Artificial Intelligence and several years of experience working on a wide range of technologies and projects from C++ development for ultrasound devices to modern mobile and web applications in React and Angular. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I invite you to take my course, where I have put a lot of effort to explain web and software engineering concepts in a detailed, hands-on and understandable way." />
                <meta name="keywords" content="jerga portfolio, jerga developer, jerga freelancig, jerga programming"/>
                <meta property="og:title" content="Filip Jerga - programmer, developer, bloger" />
                <meta property="og:locale" content="en_EU" />
                <meta property="og:url" content={`${process.env.BASE_URL}`}/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content="My name is Fried Maximiliano and I am an experienced software engineer and freelance developer."/>
                {cannonical && <Link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`}/>}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" integrity="sha384-v8BU367qNbs/aIZIxuivaU55N5GPF89WBerHoGA4QTcbUjYiLQtKdrfXnqAcXyTv" crossorigin="anonymous"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link rel="icon" type="image/ico" href="/static/favicon.ico"/>
            </Head>
            <div className="layout-contianer">
                <Header
                        isAuthenticated={isAuthenticated}
                        user={user}
                        isSiteOwner={isSiteOwner}
                        className={`port-nav-${headerType}`}/>
                <main className={`cover ${className}`}>
                    <div className="wrapper">
                        {children}
                    </div>
                </main>
            </div>
        </React.Fragment>
    )
}

export default BaseLayout;
