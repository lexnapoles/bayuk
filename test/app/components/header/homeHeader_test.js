/*
  eslint-disable
  no-unused-expressions,
  prefer-arrow-callback,
  import/no-extraneous-dependencies,
  func-names,
  import/extensions,
  import/no-unresolved
 */

import React from "react";
import { shallow, mount } from "enzyme";
import HomeHeader from "Components/app/homeHeader/HomeHeader";

const store = {
  subscribe: () => undefined,
  dispatch: () => undefined,
  getState: () => ({
    entities: {
      users: {
        allIds: [],
        byId: {}
      }
    },
    currentUser: {}
  })
};

const options = {
  context: { store },
  childContextTypes: {
    store: React.PropTypes.object.isRequired
  }
};

describe("<HomeHeader />", function() {
  it("hides the sidebar by default", function() {
    const header = shallow(<HomeHeader />);

    assert.isFalse(header.state("sidebarVisible"));
  });

  it("passes the sidebarVisible state to the sidebar", function() {
    const header = mount(<HomeHeader />, options);
    const sidebar = header.find("SidebarMenu");

    header.setState({ sidebarVisible: true });

    assert.isTrue(sidebar.prop("visible"));
  });

  it("opens the sidebar when the menu icon is clicked", function() {
    const header = mount(<HomeHeader />, options);
    const sidebar = header.find("SidebarMenu");
    const menuIcon = header.find(".fa-bars");

    menuIcon.simulate("click");

    assert.isTrue(sidebar.prop("visible"));
  });
});
