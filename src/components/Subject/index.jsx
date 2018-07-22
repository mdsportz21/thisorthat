import React, { Component } from 'react';
import './Subject.css';
import PropTypes from 'prop-types'; //1
import Image from 'react-image-resizer';

class Subject extends Component {

  handleClick(e) {
    this.props.onClick(e); //3
  }

  getLabelComponent(text) {
    const { team, isWinner } = this.props;
    const name = team.name;
    if (isWinner) {
      return (
        <h3>{name}</h3>
      );
    }

    return (
      <p>{name}</p>
    );
  }

  render() {
    const { hideLabel } = this.props;
    const subjectDiv = this.props.team ? (
      <div onClick={(e) => this.handleClick(e)}>
        <Image 
          src={this.props.team.imgLink} 
          alt={this.props.team.name}
          className="Subject"
          width={200}
          height={200}
        />
        { hideLabel ? null : this.getLabelComponent() }
      </div>
    ) : (
      <div></div>
    );

    return (
      <div>
        {subjectDiv}
      </div>
    );
  }
}

Subject.propTypes = {
  onClick: PropTypes.func,
  team: PropTypes.object,
  hideLabel: PropTypes.bool
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