import React from "react";
import ReactDOM from "react-dom";
import {shallow, mount} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenu";
import sidebarStyles from "../../../src/components/sidebarMenu/sidebarMenu.css";

describe("<SidebarMenu />", function () {
	it("has a sidebar class", function () {
		const sidebar      = shallow(<SidebarMenu />),
					sidebarClass = sidebarStyles.sidebar;

		assert.isTrue(sidebar.hasClass(sidebarClass));
	});

	it("calculates its width dynamically when mounted", function () {
		const sidebar  = ReactDOM.render(<SidebarMenu>Test</SidebarMenu>, document.body),
					style    = window.getComputedStyle(ReactDOM.findDOMNode(sidebar)),
					domWidth = Math.round(parseFloat(style.getPropertyValue("width")));

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebar.state.width, domWidth);
	});

	it("defaults to hidden", function () {
		const sidebar = mount(<SidebarMenu />);

		assert.equal(sidebar.prop("hidden"), true);
	});


	it("is positioned to the left when hidden", function () {
		const sidebar               = ReactDOM.render(<SidebarMenu>Test</SidebarMenu>, document.body),
					sidebarDOMNode        = ReactDOM.findDOMNode(sidebar),
					sidebarTopRightCorner = sidebarDOMNode.getBoundingClientRect().right;

		ReactDOM.unmountComponentAtNode(document.body);

		assert.isBelow(sidebarTopRightCorner, 0);
	});

	it("is visible when hidden is false", function () {
		const sidebar              = ReactDOM.render(<SidebarMenu hidden={false}>Test</SidebarMenu>, document.body),
					sidebarDOMNode       = ReactDOM.findDOMNode(sidebar),
					sidebarTopLeftCorner = sidebarDOMNode.getBoundingClientRect().left;

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebarTopLeftCorner, 0);
	});
});




