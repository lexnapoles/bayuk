import React, {Component} from "react";
import {shallow} from "enzyme";
import {pick} from "lodash/object";
import connectForm, {defaultProps} from "../../../src/components/form/connectForm/connectForm";

class SomeComponent extends Component {
	render() {
		return <div>A Component</div>;
	}
}

const getProps = wrapper => pick(wrapper.props(), ["elements", "handlers", "validation", "errorMessages"]);

describe("connectForm", function () {
	it("returns a React.Component wrapping FormWrapper(WrappedComponent)", function () {
		const component = connectForm()(SomeComponent);

		assert.isTrue(Boolean(component.prototype.isReactComponent));
	});

	it("uses default props if no props object has been passed", function () {
		const Form    = connectForm()(SomeComponent),
					wrapper = shallow(<Form onSubmit={() => void 0}/>);

		assert.deepEqual(getProps(wrapper), defaultProps);
	});

	it("uses custom props if a props object has been passed", function () {
		const customProps = {
			elements:      ["name", "email"],
			handlers:      {},
			validation:    {},
			errorMessages: {}
		};

		const Form    = connectForm(customProps)(SomeComponent),
					wrapper = shallow(<Form onSubmit={() => void 0}/>);

		assert.deepEqual(getProps(wrapper), customProps);
	});

	it("shows the displayName ConnectForm([WrappedComponent])", function () {
		const Form    = connectForm()(SomeComponent),
					wrapper = shallow(<Form onSubmit={() => void 0}/>);

		assert.equal(wrapper.name(), "ConnectForm(SomeComponent)");
	})
});


