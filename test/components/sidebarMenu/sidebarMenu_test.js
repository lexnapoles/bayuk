import React from "react";
import ReactDOM from "react-dom";
import {shallow} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenu";

const sidebar = (props = {}) => shallow(<SidebarMenu {...props} />).first();

//const sidebarStyle = (component = sidebar()) => component.prop("style");


describe("<SidebarMenu />", function () {
	it("calculates its width dynamically when mounted", function () {
		const sidebar  = ReactDOM.render(<SidebarMenu />, document.body),
					style    = window.getComputedStyle(ReactDOM.findDOMNode(sidebar)),
					domWidth = Math.round(parseFloat(style.getPropertyValue("width")));

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebar.state.width, domWidth);
	});

	it("starts hidden to the left", function () {
		const sidebar               = ReactDOM.render(<SidebarMenu />, document.body),
					sidebarDOMNode        = ReactDOM.findDOMNode(sidebar),
					sidebarTopRightCorner = sidebarDOMNode.getBoundingClientRect().right;

		ReactDOM.unmountComponentAtNode(document.body);

		assert.isBelow(sidebarTopRightCorner, 0);
	});
});




