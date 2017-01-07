import React, {Component} from "react";
import {shallow} from "enzyme";
import {createDefaultObjectFrom} from "../../../src/utils/utils";

class FormContainer extends Component {
	constructor(props) {
		super(props);

		const elementsObj = createDefaultObjectFrom(props.elements, "");

		this.state = ({
			form: elementsObj,
			errors: elementsObj
		});
	}

	render() {
		return (
			<div></div>
		);
	}
}

FormContainer.propTypes = {
	elements: React.PropTypes.array.isRequired
};

describe("<FormContainer/>", function () {
	it("creates the form state using the elements array", function () {
		const elements= ["name", "email"],
					wrapper = shallow(<FormContainer elements={elements}/>);

		assert.deepEqual(wrapper.state("form"), {name: "", email: ""});
	});

	it("creates the error state using the elements array", function () {
		const elements= ["name", "email"],
					wrapper = shallow(<FormContainer elements={elements}/>);

		assert.deepEqual(wrapper.state("errors"), {name: "", email: ""});
	});
});


