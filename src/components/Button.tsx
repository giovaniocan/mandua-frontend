// components/Button.tsx
import './Button.css';

interface ButtonProps {
  text: string;
  color: 'green' | 'blue' | 'yellow' | 'brown';
  onClick?: () => void;
}

export const Button = ({ text, color, onClick }: ButtonProps) => {
  const buttonClass = `button button-${color}`;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
    >
      {text}
    </button>
  );
};