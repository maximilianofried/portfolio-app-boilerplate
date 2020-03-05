// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';
import moment from 'moment';

const validateInputs = (values) => {
  const errors = {};
  Object.entries(values).forEach(([key, value]) => {
    if(!values[key] && key != 'endDate') {
      errors[key] = `${key} is required!`;
    }
  })

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if(startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'end date cannot be before start date!';
  }

  return errors;
}

const PortfolioCreateForm = ({initialValues, onSubmit, error}) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field  type="text"
                  name="title"
                  label="title"
                  component={PortInput} />
          <Field  type="text"
                  name="company"
                  label="company"
                  component={PortInput} />
          <Field  type="text"
                  name="location"
                  label="location"
                  component={PortInput} />
          <Field  type="text"
                  name="position"
                  label="position"
                  component={PortInput} />
          <Field  type="textarea"
                  name="description"
                  label="description"
                  component={PortInput}/>
          <Field  type="text"
                  name="startDate"
                  label="startDate"
                  initialDate={initialValues.startDate}
                  component={PortDate} />
          <Field  type="text"
                  name="endDate"
                  label="endDate"
                  initialDate={initialValues.endDate}
                  canBeDisabled={true}
                  component={PortDate}  />
          {error &&
            <Alert color="danger">{error}</Alert>
          }
          <Button color="success" size="lg" type="submit">
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;












// import React from 'react';

// export default class PortfolioCreateForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {title: '', description: '', weapon: ''};

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({[event.target.name]: event.target.value});
//     }

//     handleSubmit(event) {
//         alert('submitted: ' + this.state.title + ' ' + this.state.description + ' ' + this.state.weapon);
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <Label>
//                 Name:
//                 <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
//                 </Label>
//                 <Label>
//                 Description:
//                 <textarea name="description" value={this.state.description} onChange={this.handleChange} />
//             </Label>
//             <Label>
//             Pick your favorite weapon:
//             <select name="weapon" value={this.state.weapon} onChange={this.handleChange}>
//                 <option value="gun">Gun</option>
//                 <option value="knife">Knife</option>
//                 <option value="katana">Katana</option>
//                 <option value="ak47">AK47</option>
//             </select>
//             </Label>
//                 <input type="submit" value="Submit" />
//             </form>
//       );
//     }
//   }