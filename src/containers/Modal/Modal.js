import React from 'react';

import { Modal, Button } from 'semantic-ui-react';

const MovieModal = props => (
  <Modal
    style={{ top: 250 }}
    closeIcon
    className='modal'
    trigger={
      // Click to activate Modal
      <Button primary style={{ marginLeft: 20 }} size='tiny'>
        Movie Summary
      </Button>
    }
  >
    <Modal.Header style={{ textAlign: 'center' }}>{props.title}</Modal.Header>
    <Modal.Content>
      <h3 style={{ padding: 10 }}>What is it about ? </h3>
      <p style={{ padding: 10, fontWeight: 400, color: 'blue', fontSize: 18 }}>
        {/* Movie summary will be presented */}
        {props.summary}
      </p>
      <br />
    </Modal.Content>
  </Modal>
);

export default MovieModal;
