import React from "react";
import ReactDOM from "react-dom";
import {shallow, mount} from "enzyme";
import SidebarMenu from "../../../src/components/sidebarMenu/SidebarMenu";
import sidebarStyles from "../../../src/components/sidebarMenu/sidebarMenu.css";

const divInBody = () => {
	const div = document.createElement("div");

	document.body.appendChild(div);

	return div;
};

const getSidebarMenu = (props = {}) => shallow(<SidebarMenu onOverlayClicked={() => void 0} {...props}/>);

const disableTransitions = () => {
	const sidebar = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
				overlay = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0];

	sidebar.style.transition = "none";
	overlay.style.transition = "none";
};

const renderSidebarMenu = (props = {}, children = "Test") => {
	let sidebarMenu = {};

	ReactDOM.render(<SidebarMenu ref={component => sidebarMenu = component} onOverlayClicked={() => void 0} {...props}>{children}</SidebarMenu>, divInBody());

	disableTransitions();

	return sidebarMenu;
};

const unmountSidebarMenu = () => {
	const div = document.getElementsByTagName("div")[0];

	ReactDOM.unmountComponentAtNode(div);
	document.body.innerHTML = "";
};

describe("<SidebarMenu />", function () {
	it("has a sidebar element", function () {
		const sidebarMenu = getSidebarMenu(),
					sidebar     = sidebarMenu.find(`.${sidebarStyles.sidebar}`);

		assert.equal(sidebar.length, 1);
	});

	it("has an overlay element", function () {
		const sidebarMenu = getSidebarMenu(),
					overlay     = sidebarMenu.find(`.${sidebarStyles.overlay}`);

		assert.equal(overlay.length, 1);
	});

	it("is hidden by default", function () {
		const sidebarMenu = mount(<SidebarMenu onOverlayClicked={() => void 0}/>);

		assert.isFalse(sidebarMenu.prop("visible"));
	});

	it("calculates the sidebar width dynamically when mounted", function () {
		const sidebarMenu     = renderSidebarMenu(),
					sidebar         = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
					sidebarDOMWidth = sidebar.getBoundingClientRect().width;

		unmountSidebarMenu();

		assert.equal(sidebarMenu.state.sidebarWidth, sidebarDOMWidth);
	});

	it("doesn't tell the parent component that the overlay was clicked if it's hidden", function () {
		const onClick     = sinon.spy(),
					sidebarMenu = getSidebarMenu({visible: false, onOverlayClicked: onClick}),
					overlay     = sidebarMenu.find(`.${sidebarStyles.overlay}`);

		overlay.simulate("click");

		assert.isFalse(onClick.called);
	});

	it("tells the parent component that the overlay was clicked if it's visible", function () {
		const onClick     = sinon.spy(),
					sidebarMenu = getSidebarMenu({visible: true, onOverlayClicked: onClick}),
					overlay     = sidebarMenu.find(`.${sidebarStyles.overlay}`);

		overlay.simulate("click");

		assert.isTrue(onClick.called);
	});

	describe("sidebar", function () {
		it("moves to the left, out of the screen, when hidden", function () {
			renderSidebarMenu();

			const sidebar               = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
						sidebarTopRightCorner = sidebar.getBoundingClientRect().right;

			unmountSidebarMenu();

			assert.equal(sidebarTopRightCorner, 0);
		});

		it("moves to the top left corner when visible", function () {
			renderSidebarMenu({visible: true});

			const sidebar              = document.getElementsByClassName(`${sidebarStyles.sidebar}`)[0],
						sidebarTopLeftCorner = sidebar.getBoundingClientRect().left;

			unmountSidebarMenu();

			assert.equal(sidebarTopLeftCorner, 0);
		});
	});

	describe("overlay", function () {
		it("hides when the sidebar is hidden", function () {
			renderSidebarMenu();

			const overlay           = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayVisibility = window.getComputedStyle(overlay).getPropertyValue("visibility");

			unmountSidebarMenu();

			assert.equal(overlayVisibility, "hidden");
		});

		it("moves to the top left corner, occupying the whole screen, when the sidebar is hidden", function () {
			renderSidebarMenu();

			const overlay              = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayTopLeftCorner = overlay.getBoundingClientRect().left;

			unmountSidebarMenu();

			assert.equal(overlayTopLeftCorner, 0);
		});

		it("is visible when the sidebar is also visible", function () {
			renderSidebarMenu({visible: true});

			const overlay           = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayVisibility = window.getComputedStyle(overlay).getPropertyValue("visibility");

			unmountSidebarMenu();

			assert.equal(overlayVisibility, "visible");
		});

		it("is next to the sidebar when the latter is visible ", function () {
			const sidebarMenu      = renderSidebarMenu({visible: true}),
						sidebarWidth     = sidebarMenu.state.sidebarWidth,
						overlay          = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						overlayLeftCoord = overlay.getBoundingClientRect().left;

			unmountSidebarMenu();

			assert.equal(overlayLeftCoord, sidebarWidth);
		});

		it("is translucent when visible", function () {
			renderSidebarMenu({visible: true});

			const overlay = document.getElementsByClassName(`${sidebarStyles.overlay}`)[0],
						opacity = window.getComputedStyle(overlay).getPropertyValue("opacity");

			unmountSidebarMenu();

			assert.isAtLeast(opacity, 0.5);
		});
	})
});




