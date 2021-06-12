import React, { Component } from "react";

function addHoverTo(WrappedComponent) {
  return class Hover extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hover: false
      };

      this.hoverOn = this.hoverOn.bind(this);
      this.hoverOff = this.hoverOff.bind(this);
    }

    hoverOn() {
      this.setState({
        hover: true
      });
    }

    hoverOff() {
      this.setState({
        hover: false
      });
    }

    render() {
      return (
        <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
          <WrappedComponent hover={this.state.hover} {...this.props} />
        </div>
      );
    }
  };
}

export default addHoverTo;
