import React, { useState } from 'react'

export default function QuestionInput(props) {

    return (
        <form onSubmit={props.submit}>
            <label>
                Year:
          <input type="text" value={props.val} onChange={props.change} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}