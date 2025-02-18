import { FC, useEffect, useState } from "react";
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
    text: `Поздравляю!🎁`,
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
    name: "Павел Кузин",
    text: `Поздравляю!🤝`,
  },
];
const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <p className="text">{item.text}</p>
              <h6 className="name">{item.name}</h6>
            </div>
          ))}
        </section>
        <button onClick={() => setIsModalOpen(true)}>Сказать спасибо</button>
        {isModalOpen && (
          <PopUp isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="modal">
              <h4>С наилучшими пожеланиями, твоя команда</h4>
              <img src="/revamp_it.png" />
            </div>
          </PopUp>
        )}
      </main>
    </>
  );
};

export default App;
