import { FC, useEffect, useRef, useState } from "react";
import "./index.css";
import PopUp from "./PopUp/PopUp";

const congratulations = [
  {
    id: 1,
    name: "Ян Свинцов",
    text: `Богдан, поздравляю тебя с твои днем, благодарен за уделенное работе
            время. Хоть пока ты и не сеньор, но обязательно им станешь. Не
            забрасывай то, что ты делаешь, даже если не всегда получается. Я был
            на твоем уровне несколько лет назад и попадал в точно такие же
            ошибки, так что твой уровень остается таковым лишь сегодня - завтра
            будут совершенно другие навыки, другой опыт, другой вклад в развитие
            компании и коллектива. Оставайся таким же открытым и трудолюбивым,
            чем сможем - тем поможем!🍓`,
  },
  {
    id: 2,
    name: "Никита Бабицын",
    text: `Дорогой Богдан! Хочу пожелать тебе в этот особенный день оставаться таким же открытым и понимающим человеком, каким мы все тебя знаем и ценим. Спасибо за твою способность находить общий язык с людьми и поддерживать команду — это реально важно.
Как начинающий фронтенд разработчик, ты уже достиг многого, и я уверен, что дальше - больше. Пусть все твои цели, включая финансовые и какие-нибудь ещё, сбываются, а каждый день приносит новые возможности и радость!`,
    img: "/smile.webp",
  },
  {
    id: 3,
    name: "Екатерина Титарева",
    text: `Успехов тебе во всех делах и достижения поставленных целей,
    классных путешествий, ярких событий, семейного благополучия и большого-большого счастья! 🤩`,
  },
  {
    id: 4,
    name: "Андрей Касьянов",
    text: `Желаю сил совмещать такой темп работы с дообучением, поменьше 9+
              часовых рабочих сеансов и побольше млн$ в наносек 🚀`,
  },
  {
    id: 5,
    name: "Пётр Кузин",
    text: `Желаю, чтобы каждый год своей жизни рос и развивался в профессии, и всегда достигал поставленных целей 📈`,
  },
];
const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const handleToggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isModalOpen, handleCloseModal]);

  return (
    <>
      <header>
        <div className="money" style={{ visibility: "hidden" }}></div>
        <div className="money"></div>
        <div className="money"></div>
        <div className="money"></div>
        <div className="money"></div>
        <div className="logo">
          <img src="/revamp_it.svg" alt="logo" />
        </div>
      </header>
      <main>
        <h1>С Днём Рождения, Богдан!</h1>
        <section className="notes">
          {congratulations.map((item) => (
            <div className="note" key={item.id}>
              <div className="wish">
                <p className="text">{item.text}</p>
                {item?.img && (
                  <img
                    src={item.img}
                    width={100}
                    height={100}
                    alt="smile"
                    className="smile"
                  />
                )}
              </div>
              <h6 className="name">{item.name}</h6>
            </div>
          ))}
        </section>
        <button onClick={() => setIsModalOpen(true)}>Сказать спасибо</button>
        {isModalOpen && (
          <PopUp isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="modal">
              <h4>С наилучшими пожеланиями, твоя команда</h4>
              <img src="/revamp_it.png" className="logo" />
            </div>
          </PopUp>
        )}
      </main>
      <footer>
        <audio ref={audioRef} src="/audio.mp3" />
        {isPlaying ? (
          <div className="audioIcon" onClick={handleToggleAudio}>
            <img src="/pause.svg" />
          </div>
        ) : (
          <div className="audioIcon" onClick={handleToggleAudio}>
            <img src="/play.svg" />
          </div>
        )}
      </footer>
    </>
  );
};

export default App;
