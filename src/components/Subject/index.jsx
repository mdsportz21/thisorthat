import React, { Component } from 'react';
import './Subject.css';
import PropTypes from 'prop-types'; //https://www.npmjs.com/package/prop-types

class Subject extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(this.props.subjectId);
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
  subjectId: PropTypes.number
};

Subject.defaultProps = { //https://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
  onClick: function(value) {
    console.log(value);
  },
  imgLink: '',
  altText: '',
  description: '',
  subjectId: -1
};

export default Subject;