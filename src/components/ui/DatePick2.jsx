import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import { addDays } from "date-fns";
import { useState } from "react";

function DatePick2() {
  const [state, setState] = useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
    compare: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "compare",
    },
  });
  console.log(state);
  return (
    <DateRangePicker
      onChange={(item) => setState({ ...state, ...item })}
      months={1}
      minDate={addDays(new Date(), -300)}
      maxDate={addDays(new Date(), 900)}
      direction="vertical"
      scroll={{ enabled: true }}
      ranges={[state.selection, state.compare]}
    />
  );
}

export default DatePick2;
