import * as React from 'react';
import { useRef } from "react";

export default function  Home() {
    const  inputRef = useRef<HTMLInputElement>(null);

    return (
        <main>
            <form onSubmit={(event ) => {
                event.preventDefault();

                console.log(inputRef.current?.value);
            }}>
                <input ref={inputRef} type="text" name="username"/>
                <button>Submit</button>
            </form>
        </main>
    );
}
