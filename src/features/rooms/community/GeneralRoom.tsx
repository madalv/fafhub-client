import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import UserInfo from "../../userinfo/UserInfo";
import SelectedRoom from "../selectedRoom/SelectedRoom";
import { useStore } from "../../../app/stores/store";
import MessageInput from "../selectedRoom/MessageInput";
import UserList from "../selectedRoom/UserList";

interface Quote {
  Catchphrase: string;
  Author: string;
}
const GeneralRoom: React.FC = () => {
  const { roomStore } = useStore();
  const middleSection = useRef<HTMLDivElement>(null);
  var quotes: Quote[] = [
    {
      Catchphrase: "MăcarCaScript (1)",
      Author: "Alex Burlacu",
    },
    {
      Catchphrase:
        "... si din versiunea 4 cand o adaugat OOP o devenit NishMacarCaScript (2)",
      Author: "Alex Burlacu",
    },
    {
      Catchphrase: "Donati pentru canapea.",
      Author: "Ana Maria Brinza",
    },
    {
      Catchphrase: "Un exemplu de asta, si v-am spart",
      Author: "Bostan",
    },
    {
      Catchphrase: "Băieți, trebuie de organizat FCIM tusa",
      Author: "Bostan",
    },
    {
      Catchphrase: "Of course...if you'll reach it.",
      Author: "Bostan Viorel",
    },
    {
      Catchphrase:
        "Eu sper ca voi ascultati muzica normala ... la rock ma refer",
      Author: "Bostan Viorel",
    },
    {
      Catchphrase: "A piece of cake.",
      Author: "Bostan Viorel",
    },
    {
      Catchphrase: "be greater than average",
      Author: "Bostan Viorel",
    },
    {
      Catchphrase: "You are wrong!",
      Author: "Bostan Viorel",
    },
    {
      Catchphrase:
        "If you solve those exercises in under two hours, you are okay.",
      Author: "Bostan Viorel",
    },
    {
      Catchphrase: "У каждого додика своя методика",
      Author: "Bostan Viorel",
    },
    {
      Catchphrase: "going to infinity",
      Author: "Cojuhari Elena",
    },
    {
      Catchphrase: "Predati-va Zmeilor!",
      Author: "Gheorghe Ceban",
    },
    {
      Catchphrase: "Da, da, da, da...",
      Author: "Irina Cojuhari",
    },
    {
      Catchphrase: "”empathy string” instead of ”empty string”",
      Author: "Irina Cojuhari",
    },
    {
      Catchphrase: "good question, but later",
      Author: "Kulev_mujîk",
    },
    {
      Catchphrase: "Questions, proposals, manifestations?",
      Author: "Kulev_mujîk",
    },
    {
      Catchphrase: "Iar acum oleacî di striptiz.",
      Author: "Kulev_mujîk",
    },
    {
      Catchphrase: "Meloci, no priyatno.",
      Author: "Luca Schidu: despre bursă",
    },
    {
      Catchphrase: "N-am mai avut așa studenți deștepți...",
      Author: "Oleg Lupan",
    },
    {
      Catchphrase: "Așa grupă ocupată n-am mai văzut.",
      Author: "Oleg Lupan",
    },
    {
      Catchphrase: "Cofee break without coffee.",
      Author: "Oleg Lupan",
    },
    {
      Catchphrase: "Scuz, scuz, scuz, scuz!",
      Author: "Sava Vîrtosu",
    },
    {
      Catchphrase: "N-ai maini, n-ai piceni.",
      Author: "Schidu Vasile",
    },
    {
      Catchphrase: "Da poate problema e în TCP/IP",
      Author: "Stanislav Spatari",
    },
    {
      Catchphrase: "- Dmna profesoară spoate o intrebare? \n- NU!",
      Author: "Sudachevschi",
    },
    {
      Catchphrase: 'you sink (instead of "you think")',
      Author: "Tronciu",
    },
    {
      Catchphrase: "Professor Yamadaa",
      Author: "Tronciu",
    },
    {
      Catchphrase: "When I work at Palma de Maiorca",
      Author: "Tronciu",
    },
    {
      Catchphrase: "Georman Students",
      Author: "Tronciu",
    },
    {
      Catchphrase: "A georman student will never do zis.",
      Author: "Tronciu",
    },
    {
      Catchphrase: "John pushes Maria.",
      Author: "Tronciu",
    },
    {
      Catchphrase: "lecția e lecție dar pauza e sfântă",
      Author: "Vitalie Cotelea",
    },
    {
      Catchphrase: "Oua de casa? Da eu credeam ca-s de gaina",
      Author: "Vitalie Cotelea",
    },
    {
      Catchphrase:
        "Sașa: N-ai ce scurge dintr-o cârpă uscată!\nAlexei: Păi umezește-o!",
      Author: "Alexandr Vdovicenco și Alexei Șerșun",
    },
    {
      Catchphrase:
        "Dacă ceva, Facultatea de Caluclatoare și Informatică la USM mai există...",
      Author: "Sergiu Corlat",
    },
    {
      Catchphrase:
        "Я научу вас хорошему плохому. Есть плохой плохой и есть хороший плохой. Так вот, я научу вас хорошему плохому.",
      Author: "Ciorba",
    },
    {
      Catchphrase: "Covid ii la voi in cap",
      Author: "Bostan",
    },
    {
      Catchphrase: "You have a fetish with interfaces.",
      Author: "Andrei Postaru",
    },
    {
      Catchphrase: 'Cum s-ar spune "Vozimi s polki pirojok".',
      Author: "Andrei Postaru",
    },
    {
      Catchphrase: "It will castrate the object.",
      Author: "Andrei Postaru",
    },
    {
      Catchphrase: "Inheritance is like virginity, you can use it only once.",
      Author: "Andrei Postaru",
    },
    {
      Catchphrase: "Game changing, mind blowing.",
      Author: "Alexandr Vdovicenco",
    },
    {
      Catchphrase: "Ze car of ze Adrian",
      Author: "Tronciu",
    },
    {
      Catchphrase:
        "Lina: Define engleza nu prea imbunatatita)\nIrina: am venit cu C1, am plecat cu C5 in limba moldoengleza",
      Author: "Lina(FAF-201) si Irina(FAF-203)",
    },
    {
      Catchphrase:
        "Lina: One bright side, notele se pun după curve.\nDeci dacă nimeni nu reușește să facă mai mult de jumate, \ndar tu faci fix jumate ai 10 deși ai scris de 5.\nTina: Curbe, Lina draga.\nLina: Nici nu știu, să editez sau să las asa.",
      Author: "Lina(FAF-201) si Constantina(FAF-202)",
    },
    {
      Catchphrase: "Noroc: spish?\nMadalina: huish",
      Author: "Noroc si Madalina(FAF-203)",
    },
    {
      Catchphrase: "If you commit plagiarism, make sure you do it correctly.",
      Author: "Vasile Drumea",
    },
    {
      Catchphrase: "Do you know how MUCH my hour costs?!",
      Author: "Alexandr Vdovicenco",
    },
    {
      Catchphrase:
        "Dupa 4 ani de programare(la colegiu) am ales 4 ani de programare.",
      Author: "Viorel Noroc(FAF-203)",
    },
    {
      Catchphrase: "Nu-s asa de terorist",
      Author: "Aureliu Zgureanu",
    },
    {
      Catchphrase: "Iarba noastra cu iarba lor nu se compara",
      Author: "Patricia",
    },
  ];
  const [randomQuote, setRandomQuote] = useState<Quote>();
  useEffect(() => {
    middleSection.current?.setAttribute(
      "style",
      `height:${window.innerHeight * 0.8}px`
    );
  }, [middleSection.current?.clientHeight]);
  useEffect(() => {
    //console.log(JSON.stringify(roomStore.generalRoom))
    roomStore.setSelectedRoom(roomStore.generalRoomId).then();
  }, [roomStore]);
  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  return (
    <div className="roomContainer mainSection">
      <div className="roomsHeader">
        <h1>General</h1>

        <UserInfo />
      </div>
      <div className="middleSection" ref={middleSection}>
        <div className="middle__hero">
          <div className="quotesContainer">
            <div className="quoteHero">
              <span className="quote">'{randomQuote?.Catchphrase}'</span>
              <span>@{randomQuote?.Author}</span>
            </div>
          </div>
          <div className="roomMiddle">
            <SelectedRoom />
            <MessageInput />
          </div>
        </div>
        <div className="roomRight">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default observer(GeneralRoom);
