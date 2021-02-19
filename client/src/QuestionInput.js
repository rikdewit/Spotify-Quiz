import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers';
import { DateTime } from 'luxon'

export default function QuestionInput(props) {

    return (
        <div>
            <DatePicker
                color="primary"
                label="year"
                views={["year"]}
                value={props.val}
                onChange={props.change}
                minDate={new Date("1910-01-01")}
                maxDate={new Date()}
                variant="dialog"
                autoOk={true}
                className="Picker"
                fullWidth={true}
            />
            <br></br>

            <button className="Spotify" onClick={props.submit}>Submit</button>
        </div>
    );
}