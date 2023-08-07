import { createGame } from "../../game";

const GameTestPage = () => {
  createGame("100vw", "100vh", "game");
  return <div id="game"></div>;
};

export default GameTestPage;
