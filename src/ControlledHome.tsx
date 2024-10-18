import * as React from 'react';

export default function  UncontrolledHome() {
    const [ username, setUsername ] = React.useState('');
    return (
        <main>
            <p>Controlled component</p>
            <form onSubmit={(event ) => {
                event.preventDefault();

                console.log('Controlled: ',username);
            }}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"/>
                <button>Submit</button>
            </form>
        </main>
    );
}
