import React from "react";
import ReactDOM from "react-dom";
import {shallow} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenu";

const sidebar = (props = {}) => shallow(<SidebarMenu {...props} />).find(".sidebar");

const sidebarStyle = (component = sidebar()) => component.prop("style");


describe("<SidebarMenu />", function () {
	it("has a div with sidebar class", function () {
		const sidebar = shallow(<SidebarMenu />),
					element = sidebar.find(".sidebar");

		assert.equal(element.type(), "div");
	});

	it("has style", function () {
		const style = sidebar().prop("style");

		assert.isObject(style);
	});

	it("has absolute position", function () {
		assert.equal(sidebarStyle().position, "absolute");
	});

	it("starts at the top left corner", function () {
		const style         = sidebarStyle(),
					sidebarCoords = {top: style.top, left: style.left},
					topLeftCorner = {top: 0, left: 0};

		assert.deepEqual(sidebarCoords, topLeftCorner);
	});

	it("has a background color", function () {
		assert.isDefined(sidebarStyle().background);
	});

	it("fills the screen vertically", function () {
		assert.equal(sidebarStyle().height, "100%");
	});

	it("calculates its width dynamically", function () {
		const sidebar = ReactDOM.render(<SidebarMenu />, document.body),
					style = window.getComputedStyle(ReactDOM.findDOMNode(sidebar)),
					domWidth = Math.round(parseFloat(style.getPropertyValue("width")));


		sidebar.calculateWidth();

		ReactDOM.unmountComponentAtNode(document.body);

		assert.equal(sidebar.state.width, domWidth);
	});


});




