import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../Utils/supabase';

function PrivateRoute({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const session = await supabase.auth.getSession();
        setUser(session?.data?.session?.user);
        setIsLoading(false);
    };

    if (isLoading) {
        return <div></div>;
    }

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
