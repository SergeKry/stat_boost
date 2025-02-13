import { useState, useEffect } from "react";
import { searchWgPlayers } from "../api/wgPlayerApi";

const useWgPlayerSearch = (query) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // timeout for search (1sec)
    useEffect(() => {
        const handler = setTimeout(() => {
        setDebouncedQuery(query);
        }, 1000);

        return () => clearTimeout(handler);
    }, [query]);

    // make sure search query length is more than 3 letters
    useEffect(() => {
    if (debouncedQuery.length < 3) {
        setPlayers([]);
        return;
    }

    const fetchPlayers = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await searchWgPlayers(debouncedQuery);
          const formattedPlayers = data.map((player) => ({
            label: player.nickname,
            wgPlayerId: player.account_id,
          }));
          setPlayers(formattedPlayers);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
          console.log(players[0])
        }
      };
  
      fetchPlayers();
    }, [debouncedQuery]);

    return { players, setPlayers, loading, error };
};

export default useWgPlayerSearch;