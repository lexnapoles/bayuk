import React from "react";
import {shallow} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenu";

const sidebarStyle = () => {
	const sidebarDiv = shallow(<SidebarMenu />).find(".sidebar");
	return sidebarDiv.prop("style");
}

describe("<SidebarMenu />", function () {
	it("has a div with sidebar class", function () {
		const sidebar = shallow(<SidebarMenu />),
					element = sidebar.find(".sidebar");

		assert.equal(element.type(), "div");
	});

	it("has style", function () {
		const sidebarDiv = shallow(<SidebarMenu />).find(".sidebar"),
					style      = sidebarDiv.prop("style");

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
});




