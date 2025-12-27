import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { isLanguageSelected } = useLanguage();

  useEffect(() => {
    if (isLanguageSelected) {
      navigate('/home');
    } else {
      navigate('/language');
    }
  }, [isLanguageSelected, navigate]);

  return null;
};

export default Index;
