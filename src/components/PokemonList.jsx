import React,{ useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]); // 포켓몬 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // API 호출 함수
  const fetchPokemons = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=251"
      );
      if (!response.ok) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setPokemons(data.results); // 포켓몬 데이터 저장
    } catch (err) {
      setError(err.message); // 에러 저장
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchPokemons();
  }, []);

  // 로딩 상태
  if (loading) {
    return <p>로딩 중...</p>;
  }

  // 에러 상태
  if (error) {
    return <p>에러: {error}</p>;
  }

  return (
    <div>
      <h1>포켓몬 리스트</h1>
      <ul>
        {pokemons.map((pokemon, index) => {
          const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
          return (
            <li key={index}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemon.name}
              />
              {pokemon.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default PokemonList;
