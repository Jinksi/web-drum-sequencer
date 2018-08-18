import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { LabelBox } from '../LabelBox';
import { HoverButton } from '../design-system';

export const PatternSelectorComponent = ({ onSelectPattern, pattern }) => {
  const buttons = R.range(0, 8).map(buttonNumber => (
    <HoverButton
      key={`preset-${buttonNumber}`}
      p={0}
      height="1.3rem"
      width="1.3rem"
      borderRadius={2}
      bg={pattern === buttonNumber ? 'melon' : 'lightGray'}
      ml="1px"
      mr="1px"
      mt="1px"
      transitionSpeed="0.1s"
      onClick={() => {
        onSelectPattern(buttonNumber);
      }}
      fontWeight="600"
      fontSize="0.6em"
      color="rgba(0,0,0,0.4)"
      activeBg="darkMelon"
      outline="none"
    >
      {buttonNumber + 1}
    </HoverButton>
  ));

  return (
    <LabelBox label="PATTERNS">
      {buttons}
    </LabelBox>
  );
};

PatternSelectorComponent.propTypes = {
  pattern: PropTypes.number.isRequired,
  onSelectPattern: PropTypes.func.isRequired,
};
