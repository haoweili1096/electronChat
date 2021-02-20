import React, { useState } from 'react';

export default function Messenger({onSubmit}) {

    const [value, setValue] = useState('');

    const onKeyPress = e => {
        if(e.key === 'Enter'){
            e.preventDefault(); // don't go to next line
            onSubmit(value);
            setValue('');
        }
    }

    return (
        <div className="chat-input from-group mt-3 mb-0">
            <textarea
                onChange={e => setValue(e.target.value)}
                onKeyPress={onKeyPress}
                value={value}
                className="form-control"
                row="3"
                placeholder="Type your message here..">

            </textarea>
        </div>
    )
}