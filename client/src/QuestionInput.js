import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers';

export default function QuestionInput(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <form onSubmit={props.submit}>
            <label>
                Year:
          <input type="text" value={props.val} onChange={props.change} />
            </label>
            <input type="submit" value="Submit" />

            <DatePicker
                label="year"
                views={["year"]}
                value={selectedDate}
                onChange={handleDateChange}
                minDate={new Date("1910-01-01")}
                maxDate={new Date()}
                animateYearScrolling={true}
                variant="dialog"

            />
        </form>
    );
}