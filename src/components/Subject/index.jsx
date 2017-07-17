import React, { Component } from 'react';
import './Subject.css';
import PropTypes from 'prop-types'; //1

class Subject extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this); //2
  }

  handleClick(e) {
    this.props.onClick(this.props.subjectId); //3
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <img className="Subject" src={this.props.imgLink} alt={this.props.altText}/>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

Subject.propTypes = {
  onClick: PropTypes.func,
  imgLink: PropTypes.string,
  altText: PropTypes.string,
  description: PropTypes.string,
  subjectId: PropTypes.string
};

Subject.defaultProps = { //2
  onClick: function(value) {
    console.log(value);
  },
  imgLink: '',
  altText: '',
  description: ''
};

export default Subject;

/**
 * Sources
 * 1. https://www.npmjs.com/package/prop-types
 * 2. https://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
 * 3. https://stackoverflow.com/questions/26176519/reactjs-call-parent-method
 */