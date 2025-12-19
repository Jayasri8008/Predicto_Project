import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * DefaultRedirect Component
 * Ensures users always land on the PredictoLanding page when visiting the root
 */
export default function DefaultRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Always redirect to the main landing page
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}