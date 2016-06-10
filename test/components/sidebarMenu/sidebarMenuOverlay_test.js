import React from "react";
import ReactDOM from "react-dom";
import {shallow, mount} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenuWithOverlay";
import sidebarStyles from "../../../src/components/sidebarMenu/sidebarMenu.css";

const mountSidebarMenu = (props = {}, children = "Test") =>
	ReactDOM.render(<SidebarMenu {...props}>{children}</SidebarMenu>, document.body);

const unmountSidebarMenu = () => ReactDOM.unmountComponentAtNode(document.body);

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
		const sidebarMenu     = mountSidebarMenu(),
					sidebar         = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
					style           = window.getComputedStyle(sidebar),
					sidebarDOMWidth = Math.round(parseFloat(style.getPropertyValue("width")));

		unmountSidebarMenu();

		assert.equal(sidebarMenu.state.sidebarWidth, sidebarDOMWidth);
	});

	describe("sidebar", function () {
		it("moves to the left, out of the screen, when hidden", function () {
			mountSidebarMenu();

			const sidebar               = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
						sidebarTopRightCorner = sidebar.getBoundingClientRect().right;

			unmountSidebarMenu();

			assert.isBelow(sidebarTopRightCorner, 0);
		});


		it("moves to the top left corner when visible", function () {
			mountSidebarMenu({visible: true});

			const sidebar              = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
						sidebarTopLeftCorner = sidebar.getBoundingClientRect().left;

			unmountSidebarMenu();

			assert.equal(sidebarTopLeftCorner, 0);
		});
	});

	describe("overlay", function () {
		it("hides when the sidebar is hidden", function () {
			mountSidebarMenu();

			const overlay           = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayVisibility = window.getComputedStyle(overlay).getPropertyValue("visibility");

			unmountSidebarMenu();

			assert.equal(overlayVisibility, "hidden");
		});

		it("moves to the top left corner, occupying the whole screen, when the sidebar is hidden", function () {
			mountSidebarMenu();

			const overlay              = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayTopLeftCorner = overlay.getBoundingClientRect().left;

			unmountSidebarMenu();

			assert.equal(overlayTopLeftCorner, 0);
		});

		it("is visible when the sidebar is also visible", function () {
			mountSidebarMenu({visible: true});

			const overlay           = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayVisibility = window.getComputedStyle(overlay).getPropertyValue("visibility");

			unmountSidebarMenu();

			assert.equal(overlayVisibility, "visible");
		});

		it("is next to the sidebar when the latter is visible ", function () {
			const sidebarMenu      = mountSidebarMenu({visible: true}),
						sidebarWidth     = sidebarMenu.state.sidebarWidth,
						overlay          = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayLeftCoord = Math.round(overlay.getBoundingClientRect().left);

			unmountSidebarMenu();

			assert.equal(overlayLeftCoord, sidebarWidth);
		});

		it("is translucent when visible", function () {
			mountSidebarMenu({visible: true});

			const overlay = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						opacity = window.getComputedStyle(overlay).getPropertyValue("opacity");

			unmountSidebarMenu();

			assert.isAtMost(opacity, 0.5);
		});

	})
});




