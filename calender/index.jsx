import React, { useState } from "react"
import moment from "moment"
import "./style.scss"

const Calender = ({ onChange }) => {
    const [month, setMonth] = useState(Number(moment().format("MM")))
    const [year, setYear] = useState(new Date().getFullYear())
    let firstDay = Number(moment(new Date(`${year}-${month}-01`)).startOf("month").format("d"))
    let daysInMonth = moment(`${year}-${month}-01`).daysInMonth()
    const [selectedDay, setSelectedDay] = useState()
    const dateFillArr = Array.from({ length: daysInMonth + firstDay }, (ele, i) => i + 1)
    let dateFrame = []
    dateFillArr.forEach((val, index) => {
        if ((index + 1) <= firstDay) {
            dateFrame.push("")
        }
        else {
            dateFrame.push({ label: index + 1 - firstDay, moment: moment(new Date(`${year}-${month}-${index + 1 - firstDay}`)), iso: new Date(`${year}-${month}-${index + 1 - firstDay}`).toISOString() })
        }
    })
    const dateArray = Array.from({ length: Math.ceil(dateFrame.length / 7) }, (v, i) => dateFrame.slice(i * 7, i * 7 + 7));

    const handleOnDateHighlight = (day) => {
        if (day?.moment) {
            let className = "date "
            if (moment(day?.moment).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")) {
                className += "today"
            }
            if (moment(day?.moment).format("YYYY-MM-DD") === moment(selectedDay?.moment).format("YYYY-MM-DD")) {
                className += " selected"
            }
            return className;
        }
    }

    const handleOnNavigationPrevious = () => {
        if (month === 1) {
            setYear(() => year - 1)
            setMonth(12)
        }
        else {
            setMonth((month) => month - 1)
        }
    }

    const handleOnNavigationAfter = () => {
        if (month === 12) {
            setYear(() => year + 1)
            setMonth(1)
        }
        else {
            setMonth((month) => month + 1)
        }
    }

    return (
        <div className="calender">
            <h2 className="title">Calender</h2>
            <div className="calender-month">
                <button onClick={() => handleOnNavigationPrevious()} >&#8678;</button>
                <h3>{moment(new Date(`${year}-${month}-01`)).format("MMMM Y")}</h3>
                <button onClick={() => handleOnNavigationAfter()}>&#8680;</button>
            </div>
            <table className="calender-table row-days">
                <thead className="days-container">
                    <tr>
                        {moment.weekdaysShort().map(day => <th key={day}>{day}</th>)}
                    </tr>
                </thead>
                <tbody className="date-container">
                    {dateArray.map((week, dateIndex) =>
                        <tr key={dateIndex}>
                            {week.map((day, weekIndex) => <td key={weekIndex} className={handleOnDateHighlight(day)} onClick={() => { onChange(new Date(day?.iso)); setSelectedDay({ ...day, date: new Date(day?.iso) }); }}>{day?.label}</td>)}
                        </tr>
                    )}
                </tbody>
            </table >
        </div>
    )
}

export default Calender;