import axios from "axios";
import React from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";

import "../../style/common.css";

import View from "../artist/view";

export default class Index extends React.Component {
  constructor() {
    super();

    this.getInfo = this.getInfo.bind(this);

    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(`http://127.0.0.1:8080/picture/613881b3b36d8d0d622a702f`)
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  getInfo(artistId) {
    return <View artistId={artistId} />;
  }

  render() {
    const data = this.state.data;
    const images = [];

    const baseUrl = "http://127.0.0.1:8080/";

    data.map((dt, key) => {
      const imgUrl = baseUrl + dt.fileDirectory;

      const img = (
        <div key={key} className="img-container">
          <a href={baseUrl + "artist/613881b3b36d8d0d622a702f"}>
            <img
              src={imgUrl}
              className="
              w-40 h-40 
              md:w-32 md:h-32 
              lg:w-48 lg:h-48 
              xl:w-48 xl:h-48 
              img-thumbnail"
              alt={dt.name}
              onClick={() => this.getInfo(dt.id)}
            />
          </a>
          <div className="img-name">{dt.name}</div>
        </div>
      );

      return images.push(img);
    });

    return <div className="data-container flex">{images}</div>;
  }
}
