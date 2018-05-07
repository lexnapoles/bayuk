import PropTypes from "prop-types";
import React, { Component } from "react";
import { overlay, sidebar } from "./sidebarMenu.css";

class SidebarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarWidth: 0
    };

    this.onOverlayClicked = this.onOverlayClicked.bind(this);
  }

  componentDidMount() {
    this.setSidebarWidth();
  }

  onOverlayClicked() {
    if (this.props.visible) {
      this.props.onOverlayClicked();
    }
  }

  getSidebarStyle() {
    const width = this.state.sidebarWidth;
    const left = this.props.visible ? 0 : -width;

    return width ? { left, width } : {};
  }

  setSidebarWidth() {
    this.setState({
      sidebarWidth: this.sidebar.getBoundingClientRect().width
    });
  }

  getOverlayStyle() {
    if (this.state.sidebarWidth) {
      const { visible } = this.props;

      return {
        left: visible ? this.state.sidebarWidth : 0,
        right: visible ? 0 : null,
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? 0.8 : 0
      };
    }

    return { opacity: 0 };
  }

  render() {
    return (
      <div>
        <div
          className={sidebar}
          style={this.getSidebarStyle()}
          ref={div => {
            this.sidebar = div;
          }}
        >
          {this.props.children}
        </div>
        <div
          className={overlay}
          style={this.getOverlayStyle()}
          onClick={this.onOverlayClicked}
          onKeyDown={this.onOverlayClicked}
          role="switch"
          aria-checked="false"
          tabIndex="0"
        />
      </div>
    );
  }
}

SidebarMenu.propTypes = {
  visible: PropTypes.bool,
  onOverlayClicked: PropTypes.func.isRequired,
  children: PropTypes.node
};

SidebarMenu.defaultProps = {
  visible: false,
  children: []
};

export default SidebarMenu;
