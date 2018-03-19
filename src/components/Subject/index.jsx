import React, { Component } from 'react';
import './Subject.css';
import PropTypes from 'prop-types'; //1
import Image from 'react-image-resizer';

class Subject extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this); //2
  }

  handleClick(e) {
    this.props.onClick(this.props.side); //3
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <Image 
          src={this.props.team.imgLink} 
          alt={this.props.team.name}
          className="Subject"
          width={200}
          height={200}
        />
        <p>{this.props.team.name}</p>
      </div>
    );
  }
}

Subject.propTypes = {
  onClick: PropTypes.func,
  side: PropTypes.object,
  team: PropTypes.object
};

Subject.defaultProps = { // 2
  onClick: function(value) {
    console.log(value);
  }
};

export default Subject;

/**
 * Sources
 * 1. https://www.npmjs.com/package/prop-types
 * 2. https://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
 * 3. https://stackoverflow.com/questions/26176519/reactjs-call-parent-method
 */