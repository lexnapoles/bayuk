import React, {Component, createElement} from "react";
import {shallow} from "enzyme";
import FormWrapper from "../../../src/components/form/FormWrapper";
import {getDisplayName} from "../../../src/utils/utils";

const defaultProps = {
	elements:      [],
	handlers:      {},
	validation:    {},
	errorMessages: {},
	onSubmit:      () => void 0
};

const connectForm = (props = defaultProps) => WrappedComponent => {
	class ConnectForm extends Component {
		constructor(props) {
			super(props);
		}

		render() {
			return createElement(FormWrapper(WrappedComponent), props);
		}
	}

	ConnectForm.displayName = `ConnectForm${getDisplayName(WrappedComponent)}`;

	return ConnectForm;
};

class SomeComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>A Component</div>;
	}
}

describe("connectForm", function () {
	it("returns a React.Component wrapping FormWrapper(WrappedComponent)", function () {
		const component = connectForm()(SomeComponent);

		assert.isTrue(Boolean(component.prototype.isReactComponent));
	});

	it("uses default props if no props object has been passed", function () {
		const Form    = connectForm()(SomeComponent),
					wrapper = shallow(<Form onSubmit={() => void 0}/>);

		assert.deepEqual(wrapper.props(), defaultProps);
	});

	it("uses custom props if a props object has been passed", function () {
		const customProps = {
			elements:      ["name", "email"],
			handlers:      {},
			validation:    {},
			errorMessages: {},
			onSubmit:      () => "onSubmit"
		};

		const Form    = connectForm(customProps)(SomeComponent),
					wrapper = shallow(<Form onSubmit={() => void 0}/>);

		assert.deepEqual(wrapper.props(), customProps);
	});

	it("shows the displayName ConnectForm([WrappedComponent])", function () {
		const Form    = connectForm()(SomeComponent),
					wrapper = shallow(<Form onSubmit={() => void 0}/>);

		window.console.log("WRAPPER DEBUG: ", wrapper.debug());

		assert.equal(wrapper.name(), "ConnectForm(SomeComponent)");
	})
});


