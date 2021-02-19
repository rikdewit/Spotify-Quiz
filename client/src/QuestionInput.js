import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers';

export default function QuestionInput(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

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
            />
            <input type="submit" value="Submit" />

        </form>
    );
}