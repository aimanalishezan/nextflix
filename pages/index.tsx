import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';

import styles from '../styles/Login.module.scss';
import LoginBg from '../public/assets/loginBg.jpg';
import { ROUTES } from '../config/route';

export default function Home(): React.ReactElement {
  const router: NextRouter = useRouter();

  const onSignIn = () => {
    router.push(ROUTES.BROWSE)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Aiflix</title>
        <meta name='description' content='Netflix clone, made using Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
      <Image 
          src="/assets/loginBg.jpg"
          alt="Login background" 
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className={styles.main__card}>
          <h1>
            Aiflix
          </h1>
          <p>A simple Netflix clone built using Next.js</p>
          <div className={styles.button} onClick={onSignIn}>Sign in</div>
        </div>
      </main>
    </div>
  );
}
