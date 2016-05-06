import React from "react";
import {shallow, mount} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenu";

const sidebar = () => shallow(<SidebarMenu />).find(".sidebar");

const sidebarStyle = () => {
	return sidebar().prop("style");
};

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

	it("is has absolute position", function () {
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

	it("accepts a width as prop", function () {
		const width            = 100,
					sidebarWithWidth = mount(<SidebarMenu width={width}/>);

		assert.equal(sidebarWithWidth.props().width, width);
	});

	it("has a width determined by the width prop", function () {
		const width            = 100,
					sidebarWithWidth = shallow(<SidebarMenu width={width}/>).find(".sidebar"),
					style = sidebarWithWidth.prop("style");

		assert.equal(style.width, width);
	});
});




