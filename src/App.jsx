import { useEffect, useState } from "react";
import styled from "styled-components";
import patternDividerDT from "./assets/pattern-divider-desktop.svg";
import patternDividerMB from "./assets/pattern-divider-mobile.svg";
import iconDice from "./assets/icon-dice.svg";
import { useMediaQuery } from "react-responsive";

function App() {
  const [advice, setAdvice] = useState("");

  const isBigScreen = useMediaQuery({ query: '(min-width: 1440px)' })



  console.log(advice);

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip);
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);
      });
  }, []);

  return (
    <MainZ>
      <Main>
        <small>{`ADVICE #${advice.id}`}</small>
        <h1>{`"${advice.advice}"`}</h1>
        <PictureZone>
          <img src={isBigScreen? patternDividerDT : patternDividerMB} alt="#" />
        </PictureZone>
      </Main>
      <ButtonZone onClick={reloadPage}>
        <img src={iconDice} alt="#" />
      </ButtonZone>
    </MainZ>
  );
}

const MainZ = styled.main`
display: flex;
flex-direction: column;
`;
const Main = styled.div`
  width: clamp(320px, 90vw, 500px);
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  border-radius: 10px;
  background-color: hsl(217, 19%, 24%);
  padding: 2rem 1rem 2rem 1rem;
  h1 {
    margin: 1rem 0;
    color: hsl(193, 38%, 86%);
    font-size: 28px;
  }
  small {
    letter-spacing: 3px;
    color: hsl(150, 100%, 66%);
  }
`;
const PictureZone = styled.div`
  width: unset;
  img {
    width: 100%;
  }
`;
const ButtonZone = styled.div`
  width: 60px;
  border: none;
  background-color: hsl(150, 100%, 66%);

  display: flex;
  align-items: center;
  align-self: center;
  text-align: center;
  justify-content: center;

  border-radius: 50%;
  aspect-ratio: 1;
  position: relative;
  top: -30px;
  cursor: pointer;
  img {
    width: 22px;
  }

  &:hover{
    box-shadow: hsl(150, 100%, 66%) 0px 2px 4px 0px, hsl(150, 100%, 66%) 0px 2px 16px 0px;
  }
`;

export default App;
