import { createGame } from "../../game";

const GameTestPage = () => {
  createGame(960, 600, "game");
  return <div id="game"></div>;
};

export default GameTestPage;
