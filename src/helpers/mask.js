import React from 'react';
import InputMask from 'react-input-mask';

class InputCPF extends React.Component {
  render() {
    const value = this.props.value;
    let isInvalid = this.props.isInvalid;
    if (value?.includes("_") || value == "")  isInvalid = true;
    else isInvalid = false;
    return <InputMask {...this.props} mask="999.999.999-99" className={`form-control ${isInvalid ? "is-invalid" : ""}`} />; 
  }
}

class InputCNPJ extends React.Component {
  render() {
    const value = this.props.value;
    let isInvalid = this.props.isInvalid;
    if (value?.includes("_") || value == "")  isInvalid = true;
    else isInvalid = false;
    return <InputMask {...this.props} mask="99.999.999/9999-99" className={`form-control ${isInvalid ? "is-invalid" : ""}`} />;
  }
}

class InputCEP extends React.Component {
  render() {
    const value = this.props.value;
    let isInvalid = this.props.isInvalid;
    if (value?.includes("_") || value == "")  isInvalid = true;
    else isInvalid = false;
    return <InputMask {...this.props} mask="99999-999" className={`form-control ${isInvalid ? "is-invalid" : ""}`} value={this.props.value} />;
  }
}

class InputHourMinutes extends React.Component {
  render() {
    const value = this.props.value;
    let isInvalid = this.props.isInvalid;
    if (value?.includes("_") || value == "")  isInvalid = true;
    else isInvalid = false;
    return <InputMask {...this.props} mask="99:99" className={`form-control ${isInvalid ? "is-invalid" : ""}`} value={this.props.value} />;
  }
}

class InputPLACA extends React.Component {
  render() {
    const value = this.props.value;
    let isInvalid = this.props.isInvalid;
    if (value?.includes("_") || value == "")  isInvalid = true;
    else isInvalid = false;
    return <InputMask {...this.props} mask="aaa-99*9" className={`form-control ${isInvalid ? "is-invalid" : ""}`} />;
  }
}

class InputTELEFONE extends React.Component {
  render() {
    const value = this.props.value;
    let isInvalid = this.props.isInvalid;
    if (value?.includes("_") || value == "")  isInvalid = true;
    else isInvalid = false;
    return <InputMask {...this.props} mask="(99) 99999-9999" className={`form-control ${isInvalid ? "is-invalid" : ""}`} />;
  }
}

class InputDIAMES extends React.Component {
  render() {
    const value = this.props.value;
    let isInvalid = this.props.isInvalid;
    if (value?.includes("_") || value == "")  isInvalid = true;
    else isInvalid = false;
    return <InputMask {...this.props} mask="99/99" className={`form-control ${isInvalid ? "is-invalid" : ""}`} />;
  }
}

export {    
    InputCPF,
    InputCNPJ,
    InputCEP,
    InputPLACA,
    InputTELEFONE,
    InputHourMinutes,
    InputDIAMES
};