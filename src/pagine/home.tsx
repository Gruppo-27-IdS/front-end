import React from "react";
import { News, expand_proj, show_profile } from "../logica/funzioni";

//lista news dei progetti che segui

function Home() {
  const t = [
    new News(
      "abc12",
      "tony",
      "progetto cupido",
      "Questa è la descrizione di un progetto inserito nella lista. Questa è una prova per la lunghezza del post della news",
      "23/01/2024",
      "exmp_img/davideMoscardelli.jpg",
      [
        "exmp_img/IMG_20221020_012317.jpg",
        "exmp_img/IMG_20221022_185348.jpg",
        "exmp_img/IMG_20221101_010102.jpg",
      ]
    ),
    new News(
      "def45",
      "abbi",
      "nome",
      "descrizione",
      "23/11/2021",
      "exmp_img/allBlacksFC2.jpeg",
      []
    ),
  ];

  const [likes, setLikes] = React.useState(0);
  function gigi() {
    setLikes(likes + 1);
  }
  return (
    <>
      <div className="body-home ">
        {t.map((item) => (
          <div className="card news" key={item.u_project}>
            <div className="card-body">
              <img
                src={item.fnews_src}
                className="card-logo-prof"
                alt={item.news_title}
              />
              <div>
                <p className="news-title">{item.news_title}</p>
                <p
                  className="pro-tg"
                  onClick={() => expand_proj(item.u_project, <Home />)}
                >
                  @{item.u_project}
                </p>
                <p className="news-data">{item.news_data}</p>
              </div>

              <p className="news-text ">{item.news_description}</p>
              <p className="ut-tg" onClick={() => show_profile(1, <Home />)}>
                @{item.u_name}
              </p>
            </div>
            <div
              className={
                item.g_news.length === 0 ? "" : "image-scroll-container"
              }
            >
              {item.g_news.map((x) => (
                <img
                  src={x}
                  className="card-img-top k"
                  height="250px"
                  alt="..."
                  key={x}
                />
              ))}
            </div>
            <div className="interazioni">
              <div className="interazioni-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="rgb(235, 182, 75)"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                  onClick={gigi}
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
                <p>{likes}</p>
              </div>
              <div className="interazioni-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="rgb(235, 182, 75)"
                  className="bi bi-chat"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                </svg>
              </div>
              <div className="interazioni-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="rgb(235, 182, 75)"
                  className="bi bi-share-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Home;
