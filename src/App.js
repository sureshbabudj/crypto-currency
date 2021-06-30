import React from "react";
import Coins from "./pages/Coins";
import Exchanges from "./pages/Exchanges";
import "./App.css";
import { Router, Link } from "@reach/router";
const Home = () => <h3>Home</h3>;
const About = () => <h3>About</h3>;
const NotFound = () => (
  <div style={{ textAlign: "center", margin: "2rem 0" }}>
    <h1>404</h1>
    <p>Sorry, The page is not found.</p>
  </div>
);

function App() {
  return (
    <div>
      <header id="header">
        <span className="nav-heading nav-brand">Crypto Currency</span>
        <nav className="header">
          <ul>
            <li>
              <Link
                to={`${
                  process.env.NODE_ENV === "production"
                    ? "/crypto-currency"
                    : ""
                }/`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={`${
                  process.env.NODE_ENV === "production"
                    ? "/crypto-currency"
                    : ""
                }/coins`}
              >
                Coins
              </Link>
            </li>
            <li>
              <Link
                to={`${
                  process.env.NODE_ENV === "production"
                    ? "/crypto-currency"
                    : ""
                }/exchanges`}
              >
                Exchanges
              </Link>
            </li>
            <li class="nav-header">
              <Link
                to={`${
                  process.env.NODE_ENV === "production"
                    ? "/crypto-currency"
                    : ""
                }/about`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container" style={{ paddingTop: "57px" }}>
        <Router
          basepath={
            process.env.NODE_ENV === "production" ? "/crypto-currency" : "/"
          }
        >
          <Home path="/" />
          <About path="about" />
          <Exchanges path="exchanges" />
          <Coins path="coins" />
          <NotFound default />
        </Router>
      </div>
    </div>
  );
}

export default App;
