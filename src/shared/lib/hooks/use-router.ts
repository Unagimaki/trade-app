import { useNavigate, useLocation } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    navigate,
    location,
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
  };
};