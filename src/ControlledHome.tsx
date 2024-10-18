import * as React from 'react';
import { useRef } from "react";

export default function  UncontrolHome() {
    const  inputRef = useRef<HTMLInputElement>(null);
    return (
        <main>
            <p>Uncontrolled component</p>
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
