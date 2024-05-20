import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { removeCookie } from "../app/cookies";
// atoms
import { useAtomValue } from "jotai";
import { authAtom, isLoggedInAtom } from "../app/atoms";

export default function Header() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const username = isLoggedIn ? useAtomValue(authAtom).username : null;

  return (
    <header>
      <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
          <NavLink className="navbar-brand" to="/">
            Logo
          </NavLink>
          <Navbar.Toggle aria-controls="app-navbar" />
          <Navbar.Collapse id="app-navbar">
            <Nav>
              <Nav.Item>
                <NavLink to="/">Accueil</NavLink>
              </Nav.Item>
              {!isLoggedIn && (
                <Nav.Item>
                  <NavLink to="/login">Connexion</NavLink>
                </Nav.Item>
              )}
              {!isLoggedIn && (
                <Nav.Item>
                  <NavLink to="/register">Inscription</NavLink>
                </Nav.Item>
              )}

              {isLoggedIn && (
                <Nav.Item>
                  <NavLink to="/profile">Profile {username}</NavLink>
                </Nav.Item>
              )}
              {isLoggedIn && (
                <Nav.Item>
                  <NavLink to="/" onClick={removeCookie}>
                    Se déconnecter
                  </NavLink>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
