import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faMusic } from "@fortawesome/free-solid-svg-icons";
import "../style/navbar.css";

import { Link } from "react-router-dom";

import Artist from "../container/artist/index";

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <nav className="navbar-container">
            <ul>
              <Link to="/artist">
                <li className="text-white">
                  <FontAwesomeIcon icon={faMusic} className="fa-2x" />
                </li>
              </Link>
              <Link to="/album">
                <li className="text-white">
                  <FontAwesomeIcon icon={faCompactDisc} pulse className="fa-2x" />
                </li>
              </Link>
              <Link to="/single">
                <li className="text-white">
                  <FontAwesomeIcon icon={faCompactDisc} pulse className="fa-2x" />
                </li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className="navbar-right">
          <nav className="navbar-container">
          <ul>
              <Link to="/artist">
                <li>
                  <FontAwesomeIcon icon={faMusic} className="fa-2x" />
                </li>
              </Link>
              <Link to="/album">
                <li>
                  <FontAwesomeIcon icon={faCompactDisc} pulse className="fa-2x" />
                </li>
              </Link>
              <Link to="/single">
                <li>
                  <FontAwesomeIcon icon={faCompactDisc} pulse className="fa-2x" />
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
