
import React from 'react';

function Trial(props) {

    const { userName, displayName } = props;

    return (
        <div>
            <p>Username : {userName}</p>
            <p>Display Name : {displayName}</p>
        </div>
    );
}

export default Trial;

