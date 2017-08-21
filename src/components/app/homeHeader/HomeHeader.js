import React, { Component } from 'react';
import Icon from 'react-fa';
import { logo, toolbar, addProduct } from './homeHeader.css';
import SearchIcon from '../../icons/searchIcon/SearchIcon';
import SidebarMenu from '../../sidebarMenu/SidebarMenu';
import Header from '../../header/Header';
import UserMenuThumbnailContainer from '../../user/userMenuThumbnail/UserMenuThumbnailContainer';
import AddProductBtn from '../../addProductBtn/AddProductBtn';

class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { sidebarVisible: false };

    this.toggleSidebarVisibility = this.toggleSidebarVisibility.bind(this);
  }

  toggleSidebarVisibility() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  }

  render() {
    return (
      <Header >
        <SidebarMenu
          visible={this.state.sidebarVisible}
          onOverlayClicked={this.toggleSidebarVisibility}
        >
          <UserMenuThumbnailContainer />
        </SidebarMenu >
        <div className={toolbar} >
          <Icon name="bars" size="lg" onClick={this.toggleSidebarVisibility} />
          <AddProductBtn className={addProduct} />
        </div >
        <div className={logo} >Bayuk</div >
        <SearchIcon />
      </Header >
    );
  }
}

export default HomeHeader;
