import App, { Container } from 'next/app';
import {ToastContainer} from 'react-toastify';
import auth0 from '../services/auth0';
//Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mains.scss';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps, auth }) {
    return (
    <Container>
      <ToastContainer/>
      <Component {...pageProps} auth={auth} />
    </Container>
    )
  }

  MyApp.getInitialProps = async (appContext) => {
     let appProps = await App.getInitialProps(appContext);
     const user = process.browser ? await auth0.clientAuth() : await  auth0.serverAuth(appContext.ctx.req);
     const isSiteOwner = user && user[process.env.NAMESPACE + '/role'] === 'siteOwner';
     const auth = {user, isAuthenticated: !!user, isSiteOwner};
     return {...appProps, auth,};
   }

  export default MyApp;