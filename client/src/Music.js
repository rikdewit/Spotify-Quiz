import { UserContext } from './App'
import React, { useContext } from 'react';

export function Music(props) {
    const user = useContext(UserContext);

    return (
        <div>
            {user ? user.display_name : "None"}
        </div>

    );
}