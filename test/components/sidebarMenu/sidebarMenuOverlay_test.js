import React from "react";
import ReactDOM from "react-dom";
import {shallow, mount} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenuWithOverlay";
import sidebarStyles from "../../../src/components/sidebarMenu/sidebarMenu.css";

describe("<SidebarMenuOverlay />", function () {
	it("has a sidebar element", function () {
		const sidebarMenu = shallow(<SidebarMenu />),
					sidebar     = sidebarMenu.find(`.${sidebarStyles.sidebar}`);

		assert.equal(sidebar.length, 1);
	});

	it("has an overlay element", function () {
		const sidebarMenu = shallow(<SidebarMenu />),
					overlay     = sidebarMenu.find(`.${sidebarStyles.overlay}`);

		assert.equal(overlay.length, 1);
	});

	it("defaults to hidden", function () {
		const sidebarMenu = mount(<SidebarMenu />);

		assert.equal(sidebarMenu.prop("hidden"), true);
	});

	it("calculates the sidebar width dynamically when mounted", function () {
		const sidebarMenu     = ReactDOM.render(<SidebarMenu>Test</SidebarMenu>, document.body),
					sidebar         = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
					style           = window.getComputedStyle(sidebar),
					sidebarDOMWidth = Math.round(parseFloat(style.getPropertyValue("width")));

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebarMenu.state.sidebarWidth, sidebarDOMWidth);
	});

	// it("is positioned to the left when hidden", function () {
	// 	const sidebar               = ReactDOM.render(<SidebarMenu>Test</SidebarMenu>, document.body),
	// 				sidebarDOMNode        = ReactDOM.findDOMNode(sidebar),
	// 				sidebarTopRightCorner = sidebarDOMNode.getBoundingClientRect().right;
	//
	// 	ReactDOM.unmountComponentAtNode(document.body);
	//
	// 	assert.isBelow(sidebarTopRightCorner, 0);
	// });
	//
	// it("is visible when hidden is false", function () {
	// 	const sidebar              = ReactDOM.render(<SidebarMenu hidden={false}>Test</SidebarMenu>, document.body),
	// 				sidebarDOMNode       = ReactDOM.findDOMNode(sidebar),
	// 				sidebarTopLeftCorner = sidebarDOMNode.getBoundingClientRect().left;
	//
	// 	ReactDOM.unmountComponentAtNode(document.body);
	//
	// 	assert.equal(sidebarTopLeftCorner, 0);
	// });
});




