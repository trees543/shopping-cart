import { useState } from 'react';
import { createPortal } from 'react-dom';

const Error = ({ err }) => {
  const [showError, setShowError] = useState(true);

  const handleClose = () => {
    setShowError(false);
  };

  return createPortal(
    <div className="err">{err}</div>,
    document.querySelector('#err')
  );
};

export default Error;
