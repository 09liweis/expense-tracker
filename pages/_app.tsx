import { Analytics } from "@vercel/analytics/react"
import '../styles/globals.css';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import AppContext from '../AppContext';
import Header from '../components/Header';
import { emptyUser } from '../types';
import { useState, useEffect } from 'react';
import { checkUserToken, getLanguages } from '../helpers';
import LoginForm from '../components/LoginForm';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const getPageTitle = (pageProps: any) => {
  const pageMeta = pageProps.pageMeta;
  return pageMeta?.title || 'Sam - Full Stack Developer';
};

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(emptyUser);
  const [lang, setLang] = useState(getLanguages('en'));
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  
  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  Router.events.on('routeChangeError', () => {
    setLoading(false);
  });

  const router = useRouter();

  useEffect(() => {
    const userResponse = checkUserToken();
    userResponse.then((res: any) => {
      if (res?.user) {
        setUser(res.user);
      }
    });

    document.addEventListener('copy', (e) => {
      alert('You are trying to copy my stuff');
    });

    return () => {
      document.removeEventListener('copy', (e) => {
        console.info("remove copy event listener");
      })
    }
  }, []);

  useEffect(() => {
    setLang(getLanguages(router.locale));
  }, [router.locale]);

  return (
    <>
      <Head>
        <title>{getPageTitle(pageProps)}</title>
        <meta name="keywords" content="samliweisen, samli" />
        <meta name="description" content="samliweisen profolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContext.Provider
        value={{
          isUserLoggedIn: user?._id,
          user,
          lang,
          setUser,
        }}
      >
        <main className="p-2">
          <Header
            setShowLogin={setShowLogin}
            lang={lang}
            user={user}
            setUser={setUser}
            router={router}
          />
          <section className="bg-card mt-2 p-2 rounded-sm">
            {loading ? <LoadingSkeleton /> : <Component {...pageProps} />}
          </section>
          {!user?._id && showLogin ? (
            <LoginForm setShowLogin={setShowLogin} setUser={setUser} />
          ) : null}
          <Analytics />
        </main>
      </AppContext.Provider>
    </>
  );
}

export default MyApp;