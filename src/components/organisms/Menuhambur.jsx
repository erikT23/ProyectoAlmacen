import styled from "styled-components";
import { LinksArray, SecondarylinksArray, ToggleTema } from "../../index";
import { NavLink } from "react-router-dom";
import { v } from "../../styles/variables";
import { useState } from "react";
export function MenuHambur() {
  const [click, setClick] = useState(false);

  return (
    <Container>
      <NavBar>
        <section>
          <HamburgerMenu onClick={() => setClick}>
            <label
              htmlFor="checkbox"
              className={click ? "toogle active" : "toogle"}
            >
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </label>
          </HamburgerMenu>
        </section>
        <Main $click={click.toString()}>
          {LinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => setClick(!click)}
              className="LinkContainer"
              key={label}
            >
              <NavLink to={to} className="Links">
                <div className="Linkicon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
          <Divider />
          {SecondarylinksArray.map(({ icon, label, to }) => (
            <div
              onClick={() => setClick(!click)}
              className="LinkContainer"
              key={label}
            >
              <NavLink to={to} className="Links">
                <div className="Linkicon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
          <ToggleTema />
          <Divider />
        </Main>
      </NavBar>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const HamburgerMenu = styled.span`
  position: fixed;
  top: 2.3rem;
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    height: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition-duration: 0.5s;
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.bg5};
    border-radius: 4px;
  }

  #bar2 {
    transition-duration: 0.8s;
  }

  #bar1,
  #bar3 {
    width: 70%;
  }

  #checkbox:checked + .toggle .bars {
    position: absolute;
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle #bar2 {
    transform: scaleX(0);
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle #bar1 {
    width: 100%;
    transform: rotate(45deg);
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle #bar3 {
    width: 100%;
    transform: rotate(-45deg);
    transition-duration: 0.5s;
  }

  #checkbox:checked + .toggle {
    transition-duration: 0.5s;
    transform: rotate(180deg);
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  z-index: 10;
  @media screen {
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;
