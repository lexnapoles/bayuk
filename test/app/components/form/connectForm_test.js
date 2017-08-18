/*
  eslint-disable
  no-unused-expressions,
  prefer-arrow-callback,
  import/no-extraneous-dependencies,
  func-names
 */

import React from 'react';
import { shallow } from 'enzyme';
import { pick } from 'lodash/object';
import connectForm from 'Components/form/connectForm/connectForm';

const SomeComponent = () => <div >A Component</div >;

const getProps = wrapper => pick(wrapper.props(),
  ['elements', 'handlers', 'validation', 'errorMessages']);

const defaultRequiredProps = {
  elements: ['first'],
};

const getForm = (props = {}, children = SomeComponent) => {
  const formProps = { ...defaultRequiredProps, ...props };
  const Form = connectForm(formProps)(children);

  return shallow(<Form onSubmit={() => undefined} />);
};

describe('connectForm', function () {
  it('returns a React.Component wrapping formWrapper(WrappedComponent)', function () {
    const component = connectForm(defaultRequiredProps)(SomeComponent);

    assert.isTrue(Boolean(component.prototype.isReactComponent));
  });


  it('uses a default handlers object if no custom one has been passed', function () {
    const requiredProps = {
      elements: ['first'],
      validation: { first: () => undefined },
      errorMessages: { first: 'First Error' },
    };

    const Form = connectForm(requiredProps)(SomeComponent);
    const wrapper = shallow(<Form onSubmit={() => undefined} />);

    assert.property(getProps(wrapper), 'handlers');
  });

  it('uses a custom handler object if one has been passed', function () {
    const customMessage = 'Custom name handler';
    const customProps = {
      ...defaultRequiredProps,
      elements: ['name'],
      handlers: { onNameChange: () => customMessage },
    };

    const onNameChange = getForm(customProps).prop('handlers').onNameChange;

    assert.equal(onNameChange(), customMessage);
  });

  it('shows the displayName ConnectForm([WrappedComponent])', function () {
    assert.equal(getForm().name(), 'ConnectForm(SomeComponent)');
  });

  describe('Error handling', function () {
    it('throws an exception if there is no elements variable', function () {
      assert.throws(connectForm(), /Elements variable is required/);
    });

    it('throws an exception if elements is empty', function () {
      const props = {
        elements: [],
      };

      assert.throws(connectForm(props), /Elements variable cannot be empty/);
    });

    it('throws an exception if validators are included but the corresponding error messages are not',
      function () {
        const props = {
          ...defaultRequiredProps,
          validation: {
            name: () => true,
            email: () => true,
          },
          errorMessages: {
            name: 'Error',
          },
        };

        assert.throws(connectForm(props),
          /A validator doesn't have its corresponding error message/);
      });
  });
});
