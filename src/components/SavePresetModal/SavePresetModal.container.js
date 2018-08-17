import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { SavePresetModalComponent } from './SavePresetModal.component';
import { savePresetModalSelectors } from './SavePresetModal.selectors';
import {
  setPresetPrompt,
  savePresetAs,
  setPreset,
} from '../../common';

const mapDispatchToProps = {
  setPresetPrompt,
  savePresetAs,
  setPreset,
};

const handlers = {
  onChangeNameField: ({ updateNameField, setError }) => (event) => {
    if (event.target.value.length < 32) {
      updateNameField(event.target.value);
      setError(null);
    }
  },
  onClose: props => () => {
    const {
      setPresetPrompt: connectedSetPresetPrompt,
      updateNameField,
    } = props;
    updateNameField('');
    connectedSetPresetPrompt(false);
  },
  onSubmit: props => (event) => {
    event.preventDefault();
    const {
      setPresetPrompt: connectedSetPresetPrompt,
      savePresetAs: connectedSavePresetAs,
      setPreset: connectedSetPreset,
      currentState,
      updateNameField,
      nameField,
      setError,
    } = props;

    if (nameField.length < 1) {
      setError('Min length 1');
    } else if (nameField.length > 32) {
      setError('Max length 32');
    } else {
      connectedSetPresetPrompt(false);
      connectedSavePresetAs({
        ...currentState,
        name: nameField,
      });
      connectedSetPreset(nameField);
      updateNameField('');
      setError(null);
    }
  },
};

export const SavePresetModal = compose(
  connect(savePresetModalSelectors, mapDispatchToProps),
  withState('nameField', 'updateNameField', ''),
  withState('error', 'setError', null),
  withHandlers(handlers),
)(SavePresetModalComponent);