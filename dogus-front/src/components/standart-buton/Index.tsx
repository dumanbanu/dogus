import React from 'react';

interface StandardButtonProps {
  onClickEventHandler: () => void;
  content: JSX.Element | string | number;
  bg: string; 
  color: string; 
  size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'; 
}

const sizeStyles = {
    xxsmall: { fontSize: '10px', padding: '8px 16px' },
    xsmall: { fontSize: '11px', padding: '9px 18px' }, 
    small: { fontSize: '12px', padding: '10px 20px' },
    medium: { fontSize: '14px', padding: '12px 24px' },
    large: { fontSize: '16px', padding: '14px 28px' },
    xlarge: { fontSize: '18px', padding: '16px 32px' }, 
  };
const StandardButton: React.FC<StandardButtonProps> = ({
  onClickEventHandler,
  content = null,
  bg="white",
  color= "black",
  size = "medium"
}) => {
  const style = {
    borderRadius: "15px",
    backgroundColor: bg,
    color: color,
    ...sizeStyles[size]

  };

  return (
    <button onClick={onClickEventHandler} style={style}>
      {content}
    </button>
  );
}

export default StandardButton;
