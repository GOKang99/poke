import { useState } from "react";

const PokemonInput = ({ onInputSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력 값을 상태로 관리
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 동작 방지
    const limit = parseInt(inputValue, 10);//10진수로 inputvalue를 바꾸도록 함. 
    if (!isNaN(limit) && limit > 0) {
      onInputSubmit(limit); // 부모 컴포넌트로 입력 값 전달
      setInputValue("");
    } else {
      alert("1 이상의 유효한 숫자를 입력해주세요."); // 잘못된 값 처리
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        포켓몬 개수:
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="숫자를 입력하세요"
        />
      </label>
      <button type="submit">불러오기</button>
    </form>
  );
};

export default PokemonInput;
