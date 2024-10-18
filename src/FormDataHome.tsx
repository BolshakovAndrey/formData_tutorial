import * as React from 'react';

export default function  FormDataHome() {
    function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
        const formData = new FormData(event.currentTarget);
        console.log('FormData Uncontrolled: ', formData.get("username"));
        console.log(formData);

        const formValues = Object.fromEntries(formData);
        console.log('formValues from Object.fromEntries(formData)', formValues);
    }

    return (
        <main>
            <p>FormData Uncontrolled component</p>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"/>
                <button>Submit</button>
            </form>
        </main>
    );
}
