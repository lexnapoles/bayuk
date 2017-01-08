import React from "react";
import Form from "../../form/Form";
import TextFilter from "../../filters/textFilter/TextFilter";
import CategoryFilter from "../../filters/categoryFilter/CategoryFilterContainer";
import Filter from "../../filters/filter/Filter";
import ImagesFilter from "../../filters/ImagesFilter/ImagesFilterContainer";

const AddProduct = ({
	form,
	errors,
	maxImages,
	onSubmit,
	onNameChange,
	onImagesChange,
	onDescriptionChange,
	onCategoryChange,
	onPriceChange
}) => (
	<Form formName="addForm" onSubmit={onSubmit}>
		<ImagesFilter error={errors.images} maxImages={maxImages} onChange={onImagesChange}/>
		<TextFilter name={form.name} error={errors.name} placeholder="Product name" onChange={onNameChange} required={true}/>
		<TextFilter name={form.description} error={errors.description} placeholder="Product description" onChange={onDescriptionChange}	required={true}/>
		<CategoryFilter error={errors.category} onChange={onCategoryChange}/>
		<Filter title="Price" error={errors.price}>
			<input type="number" min="0" placeholder="0" onChange={onPriceChange}/>
		</Filter>
	</Form>
);

AddProduct.propTypes = {
	form:                React.PropTypes.object.isRequired,
	errors:              React.PropTypes.object.isRequired,
	maxImages:           React.PropTypes.number.isRequired,
	onSubmit:         	 React.PropTypes.func.isRequired,
	onNameChange:        React.PropTypes.func.isRequired,
	onImagesChange:      React.PropTypes.func.isRequired,
	onDescriptionChange: React.PropTypes.func.isRequired,
	onCategoryChange:    React.PropTypes.func.isRequired,
	onPriceChange:       React.PropTypes.func.isRequired
};

export default AddProduct;