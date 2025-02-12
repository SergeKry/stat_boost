import PlayerCard from "./PlayerCard";

function PlayersList() {
  const players = [
    {
      id: 1,
      nickname: "Player1",
      wgId: 31231231,
    },
    {
      id: 2,
      nickname: "Player2",
      wgId: 31231244,
    },
  ];

  return (
    <>
        {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
        ))}
    </>
  );
}

export default PlayersList;
