import React from "react";
import {shallow, mount} from "enzyme";
import Header from "../../../src/components/header/Header";

describe("<Header />", function () {
	it("hides the sidebar by default", function () {
		const header = shallow(<Header />);

		assert.isTrue(header.state("sidebarHidden"));
	});

	it("passes the sidebarHidden state to the sidebar", function () {
		const header  = mount(<Header />),
					sidebar = header.find("SidebarMenu");

		header.setState({sidebarHidden: false});

		assert.isFalse(sidebar.prop("hidden"));
	});

	it("opens the sidebar when the menu icon is clicked", function () {
		const header   = mount(<Header />),
					sidebar  = header.find("SidebarMenu"),
					menuIcon = header.find(".menuIcon");

		menuIcon.simulate("click");

		assert.isFalse(sidebar.prop("hidden"));
	});
});




