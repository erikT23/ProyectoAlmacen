import styled from "styled-components";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export function InputRetraso({
  value: initialValue,
  onChange,
  debounce = 2000,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <Container>
      <article className="content">
        <CiSearch className="icono" />
        <input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </article>
    </Container>
  );
}

const Container = styled.div`
  //background-color: ${(props) => props.theme.bg};
  width: 200px;
  border-radius: 10px;
  height: 40px;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  border: 1px solid #414244;

  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;

    .icono {
      font-size: 18px;
    }

    input {
      font-size: 15px;
      width: 100%;
      outline: none;
      background: none;
      border: 0;
      color: ${(props) => props.theme.text};
    }
  }
`;
