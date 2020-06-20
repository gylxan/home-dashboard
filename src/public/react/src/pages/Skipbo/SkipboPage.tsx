import React, { useEffect, useState } from 'react';
import { getSkipboGames } from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';

function SkipboPage() {
  const [skipboGames, setSkipboGames] = useState([] as SkipboGame[]);

  useEffect(() => {
    getSkipboGames().then((data) => setSkipboGames(data));
  }, []);

  return (
    <div className="SkipboPage">
      <ul>
        {skipboGames.map((game) => (
          <>
            <div>{new Date(game.playTime).toLocaleString('de-DE')}</div>
            <ul>
              {game.points.map((point) => (
                <li>{point.player}</li>
              ))}
            </ul>
          </>
        ))}
      </ul>
    </div>
  );
}

export default SkipboPage;
