import React from "react";
import Coins from "./pages/Coins";
import Exchanges from "./pages/Exchanges";
import "./App.css";
import { Router, Link } from "@reach/router";
const Home = () => <h3>Home</h3>;
const About = () => <h3>About</h3>;

function App() {
  return (
    <div>
      <header id="header">
        <span className="nav-heading nav-brand">Crypto Currency</span>
        <nav className="header">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/coins">Coins</Link>
            </li>
            <li>
              <Link to="exchanges">Exchanges</Link>
            </li>
            <li class="nav-header">
              <Link to="about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container" style={{ paddingTop: "57px" }}>
        <Router>
          <Home path="/" />
          <About path="about" />
          <Exchanges path="exchanges" />
          <Coins path="coins" />
        </Router>
      </div>
    </div>
  );
}

export default App;
