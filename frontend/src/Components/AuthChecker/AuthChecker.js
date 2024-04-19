import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Utils/supabase';

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const session = await supabase.auth.getSession();

      if (session?.data?.session?.user) {
        navigate('/dashboard');
      }
    }

    fetchData();
  }, [navigate]);

  return children;
};

export default AuthChecker;