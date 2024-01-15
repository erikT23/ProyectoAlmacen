import styled from "styled-components";

export function MenuHambur() {
  return (
    <Container>
      <NavBar>
        <section>
          <HamburguerMenu>
            <label htmlFor="checkbox" className="toggle">
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </label>
          </HamburguerMenu>
        </section>
      </NavBar>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.body};
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const HamburguerMenu = styled.div`
  position: fixed;
  top: 1rem;
  left: 15px;
  z-index: 100;
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: 0.5s;
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: ${(props) => props.theme.bg5};
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
