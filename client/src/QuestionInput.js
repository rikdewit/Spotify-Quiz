import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers';
import { DateTime } from 'luxon'

export default function QuestionInput(props) {

    return (
        <form onSubmit={props.submit}>


            <DatePicker
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
            <input className="Spotify" type="submit" value="Submit" />

        </form>
    );
}