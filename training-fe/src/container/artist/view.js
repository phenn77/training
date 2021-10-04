import axios from "axios";
import React from "react";

export default class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artistId: this.props.artistId,
      data: {},
    };
  }

  async componentWillMount() {
    if (this.state.artistId) {
      await axios
      .get(`http://127.0.0.1:8080/artist/${this.state.artistId}`)
      .then((res) => {
        this.setState = {
          data: res.data,
        };
      });
    }
  }

  render() {
    return <div>
        {this.state.data}
        YOOOOO
    </div>;
  }
}
