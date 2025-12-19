import Image from "next/image";
import Game from "./components/Game";

export default function Home() {
  return (
     <div>
      <h1>Tic Tac Toe Game</h1>
       <Game />
    </div>
      );
}
