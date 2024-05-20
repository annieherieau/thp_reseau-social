import { Container, Nav,  Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { removeCookie } from "../app/cookies";
import toHomePage from "../app/toHomePage";

// atoms
import { useAtomValue } from "jotai";
import { authAtom } from "../app/atoms";


export default function Header() {
  const isLoggedIn = useAtomValue(authAtom);
  const logOut = () => {
    removeCookie();
    toHomePage()
  } 
  return (
    <header>
      <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
        <Container>
          <NavLink className="navbar-brand" to="/">
            Logo
          </NavLink>
          <Navbar.Toggle aria-controls="app-navbar" />
          <Navbar.Collapse id="app-navbar">
            <Nav>
              <Nav.Item>
                <NavLink className='nav-link' to="/">Accueil</NavLink>
              </Nav.Item>
              {!isLoggedIn && (
                <Nav.Item>
                  <NavLink className='nav-link' to="/login">Connexion</NavLink>
                </Nav.Item>
              )}
              {!isLoggedIn && (
                <Nav.Item>
                  <NavLink className='nav-link' to="/register">Inscription</NavLink>
                </Nav.Item>
              )}

              {isLoggedIn && (
                <Nav.Item>
                  <NavLink className='nav-link' to="/profile">Profile {isLoggedIn.username}</NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item>
                  <Nav.Link onClick={()=> logOut()}>
                    Se déconnecter
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
