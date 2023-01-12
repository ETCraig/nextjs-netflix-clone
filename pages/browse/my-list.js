import Head from "next/head";
import NavBar from "../../components/navbar/navbar";
import SectionCards from "../../components/card/section-cards";
import { redirectUser } from "../../utils/redirectUser";
import { getMyList } from "../../lib/videos";

import styles from "../../styles/MyList.module.css";

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);
  const videos = await getMyList(userId, token);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My list</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
