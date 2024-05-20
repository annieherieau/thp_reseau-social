import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function Header() {
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoggedIn = true;

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
      {!isLoggedIn &&
              <Nav.Item>
                <NavLink to="/login">Connexion</NavLink>
              </Nav.Item>}
              {!isLoggedIn && <Nav.Item>
                <NavLink to="/register">Inscription</NavLink>
              </Nav.Item>}

              {isLoggedIn &&
              <Nav.Item>
                <NavLink to="/profile">Profile</NavLink>
              </Nav.Item> }
              {isLoggedIn &&
               <Nav.Item>
               <NavLink to="/">Se déconnecter</NavLink>
             </Nav.Item> }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
