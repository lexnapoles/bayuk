import React from "react";
import {shallow, mount} from "enzyme";
import HomeHeader from "../../../src/components/header/homeHeader/HomeHeader";

const store = {
	subscribe: () => void 0,
	dispatch:  () => void 0,
	getState:  () => ({
		currentUser: {token: ""}
	})
};

const options = {
	context: {store},
	childContextTypes: {
		store: React.PropTypes.object.isRequired
	}
};

describe("<HomeHeader />", function () {
	it("hides the sidebar by default", function () {
		const header = shallow(<HomeHeader />);

		assert.isFalse(header.state("sidebarVisible"));
	});

	it("passes the sidebarVisible state to the sidebar", function () {
		const header  = mount(<HomeHeader />, options),
					sidebar = header.find("SidebarMenu");

		header.setState({sidebarVisible: true});

		assert.isTrue(sidebar.prop("visible"));
	});

	it("opens the sidebar when the menu icon is clicked", function () {
		const header   = mount(<HomeHeader />, options),
					sidebar  = header.find("SidebarMenu"),
					menuIcon = header.find(".fa-bars");

		menuIcon.simulate("click");

		assert.isTrue(sidebar.prop("visible"));
	});
});




