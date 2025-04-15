import React, { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoadingProps {
  withOverlay?: boolean;
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ withOverlay, color = '#28B6E3' }) => {
  const imageStyle: CSSProperties = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
  };

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#212121',
    zIndex: 2,
  };

  if (withOverlay) {
    return (
      <div style={overlayStyle}>
        <div style={imageStyle}>
          <ClipLoader size={100} color={color} />
        </div>
      </div>
    );
  }

  return (
    <div style={imageStyle}>
      <ClipLoader size={100} color={color} />
    </div>
  );
};
