import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { useLanguage } from '../languageContext';
import './Instrucoes.css';

const Instrucoes = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="instrucoes-container">
      <button className="btn-voltar" onClick={() => navigate('/')}>
        {t('difficulty', 'back')}
      </button>
      <Card
        className="card"
        title={t('home', 'instructions')}
        subtitle={<pre className="card-subtitle">{t('instructions', 'text')}</pre>}
        buttons={[]}
      />
    </div>
  );
};

export default Instrucoes;

