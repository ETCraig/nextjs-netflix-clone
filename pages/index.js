import Head from "next/head";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/section-cards";
import NavBar from "../components/navbar/navbar";
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import { redirectUser } from "../utils/redirectUser";

import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const marvelVideos = await getVideos("marvel trailer");
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("indie music");
  const popularVideos = await getPopularVideos();
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  return {
    props: {
      marvelVideos,
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
}

export default function Home({
  marvelVideos,
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
  watchItAgainVideos,
}) {
  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          title="Stranger Things"
          subTitle="When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."
          imgUrl="/static/desktop-1024x576.jpeg"
          videoId="yQEondeGvKo"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Marvel" videos={marvelVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Disney" videos={disneyVideos} size="small" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </>
  );
}
