import React from "react";
import ReactDOM from "react-dom";
import {shallow, mount} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenuWithOverlay";
import sidebarStyles from "../../../src/components/sidebarMenu/sidebarMenu.css";

const renderSidebarMenuToDOM = (props = {}, children = "Test") =>
	ReactDOM.render(<SidebarMenu {...props}>{children}</SidebarMenu>, document.body);

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

	it("is hidden by default", function () {
		const sidebarMenu = mount(<SidebarMenu />);

		assert.isFalse(sidebarMenu.prop("visible"));
	});

	it("calculates the sidebar width dynamically when mounted", function () {
		const sidebarMenu     = renderSidebarMenuToDOM(),
					sidebar         = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
					style           = window.getComputedStyle(sidebar),
					sidebarDOMWidth = Math.round(parseFloat(style.getPropertyValue("width")));

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebarMenu.state.sidebarWidth, sidebarDOMWidth);
	});

	it("moves the sidebar to the left, out of the screen, when hidden", function () {
		renderSidebarMenuToDOM();

		const sidebar               = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
					sidebarTopRightCorner = sidebar.getBoundingClientRect().right;

		ReactDOM.unmountComponentAtNode(document.body);

		assert.isBelow(sidebarTopRightCorner, 0);
	});

	it("moves the overlay to the top left corner, occupying the whole screen, when the sidebar is hidden", function () {
		renderSidebarMenuToDOM();

		const overlay              = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
					overlayTopLeftCorner = overlay.getBoundingClientRect().left;

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(overlayTopLeftCorner, 0);
	});


	it("when the sidebar is hidden, ", function () {
		renderSidebarMenuToDOM();

		const overlay              = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
					overlayTopLeftCorner = overlay.getBoundingClientRect().left;

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(overlayTopLeftCorner, 0);
	});

	it("makes the sidebar visible when visible is true", function () {
		renderSidebarMenuToDOM({visible: true});

		const sidebar              = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
					sidebarTopLeftCorner = sidebar.getBoundingClientRect().left;

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebarTopLeftCorner, 0);
	});
});




