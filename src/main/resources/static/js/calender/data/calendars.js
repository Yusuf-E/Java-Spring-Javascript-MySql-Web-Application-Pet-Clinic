'use strict';

/* eslint-disable require-jsdoc, no-unused-vars */

var CalendarList = [];

function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.dragBgColor = null;
}

function addCalendar(calendar) {
    CalendarList.push(calendar);
    //console.log("addCalendar > ", JSON.stringify(calendar))
}

function findCalendar(id) {
    var found;

    CalendarList.forEach(function(calendar) {
        if (calendar.id === id) {
            found = calendar;
        }
    });

    return found || CalendarList[0];
}

function hexToRGBA(hex) {
    var radix = 16;
    var r = parseInt(hex.slice(1, 3), radix),
        g = parseInt(hex.slice(3, 5), radix),
        b = parseInt(hex.slice(5, 7), radix),
        a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
    var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

    return rgba;
}

callResult()
 function callResult() {
    $.ajax({
        url: 'http://localhost:8090/calendarInfo',
        async: false,
        success: function (res) {
            res.calendarInfos.forEach((item, index) => {
                const calendar = new CalendarInfo();
                calendar.id = String(item.cid);
                calendar.name = item.cname;
                calendar.color = item.ccolor;
                calendar.bgColor = item.cbgColor;
                calendar.dragBgColor = item.cdragBgColor;
                calendar.borderColor = item.cborderColor;
                addCalendar(calendar);
            })
        },
        error: function (error) {
            console.error(error)
        }
    })
}


