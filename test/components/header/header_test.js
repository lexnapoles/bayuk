import React from "react";
import {shallow, mount} from "enzyme";
import Header from "../../../src/components/header/Header";

describe("<Header />", function () {
	it("hides the sidebar by default", function () {
		const header = shallow(<Header />);

		assert.isFalse(header.state("sidebarVisible"));
	});

	it("passes the sidebarVisible state to the sidebar", function () {
		const header  = mount(<Header />),
					sidebar = header.find("SidebarMenuW");

		header.setState({sidebarVisible: true});

		assert.isTrue(sidebar.prop("visible"));
	});

	it("opens the sidebar when the menu icon is clicked", function () {
		const header   = mount(<Header />),
					sidebar  = header.find("SidebarMenu"),
					menuIcon = header.find(".menuIcon");

		menuIcon.simulate("click");

		assert.isTrue(sidebar.prop("visible"));
	});
});




