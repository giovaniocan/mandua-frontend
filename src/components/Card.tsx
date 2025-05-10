// components/Card.tsx
import { Button } from './Button';
import './Card.css';

interface CardProps {
  title: string;
  subtitle: string;
  buttons: {
    text: string;
    color: 'green' | 'blue' | 'yellow' | 'brown';
    onClick?: () => void;
  }[];
}

export const Card = ({ title, subtitle, buttons }: CardProps) => {
  return (
    <div className="card">
      <h1 className="card-title">{title}</h1>
      <p className="card-subtitle">{subtitle}</p>
      
      <div className="card-buttons">
        {buttons.map((button, index) => (
          <Button 
            key={index} 
            text={button.text} 
            color={button.color} 
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  );
};