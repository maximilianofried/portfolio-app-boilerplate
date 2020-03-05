import App from 'next/app';
import auth0 from '../services/auth0';
//Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mains.scss';
const namespace = 'http://localhost:3000';
function MyApp({ Component, pageProps, auth }) {
    return <Component {...pageProps} auth={auth} />
  }

  MyApp.getInitialProps = async (appContext) => {
     let appProps = await App.getInitialProps(appContext);
     const user = process.browser ? await auth0.clientAuth() : await  auth0.serverAuth(appContext.ctx.req);
     const isSiteOwner = user && user[namespace + '/role'] === 'siteOwner';
     const auth = {user, isAuthenticated: !!user, isSiteOwner};
     return {...appProps, auth,};
   }

  export default MyApp;