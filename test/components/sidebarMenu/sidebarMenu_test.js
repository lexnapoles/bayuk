import React from "react";
import ReactDOM from "react-dom";
import {shallow} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenu";

const sidebar = (props = {}) => shallow(<SidebarMenu {...props} />).first();

const sidebarStyle = (component = sidebar()) => component.prop("style");


describe("<SidebarMenu />", function () {
	it("has a div with sidebar class", function () {
		const sidebar = shallow(<SidebarMenu />),
					element = sidebar.first();

		assert.equal(element.type(), "div");
	});

	it("has style", function () {
		const style = sidebar().prop("style");

		assert.isObject(style);
	});

	it("is a left sidebar", function () {
		const style = sidebarStyle();

		assert.equal(style.left, 0);
	});

	it("calculates its width dynamically", function () {
		const sidebar  = ReactDOM.render(<SidebarMenu />, document.body),
					style    = window.getComputedStyle(ReactDOM.findDOMNode(sidebar)),
					domWidth = Math.round(parseFloat(style.getPropertyValue("width")));

		sidebar.calculateWidth();

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebar.state.width, domWidth);
	});


});




