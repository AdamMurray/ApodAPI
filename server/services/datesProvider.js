
// dateService.js

/*
 * Provides various methods for returning dates
 */

module.exports.getDateStrings = function (dates) {
  var dateStrings = [];
  var dateString;

  for (i = 0; i < dates.length; i++) {
    dateString = getDateString(dates[i]);
    dateStrings.push(dateString);
  }

  return dateStrings;
}

var getDateString = function (date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1; // January is 0
  var yyyy = date.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  return yyyy + '-' + mm + '-' + dd;
}

module.exports.getDateString = getDateString;

module.exports.getDatesFromTodayUntilDate = function (date) {
  var startDate = new Date(date);
  var endDate = new Date();
  var dates = [];

  while(startDate < endDate) {
      dates.push(startDate);
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }

  return dates;
};

module.exports.getDatesBetweenTodayAndLastYear = function () {
    var today = new Date();
    var todayLastYear = new Date((new Date()).setFullYear((new Date()).getFullYear() - 1));
    var startDate = todayLastYear;
    var endDate = today;
    var dates = [];

    while(startDate < endDate) {
        dates.push(startDate);
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }

    return dates;
};

module.exports.getDatesBetweenTodayAndLastMonth = function () {
    var today = new Date();
    var todayLastYear = new Date((new Date()).setMonth((new Date()).getMonth() - 1));
    var startDate = todayLastYear;
    var endDate = today;
    var dates = [];

    while(startDate < endDate) {
        dates.push(startDate);
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }

    return dates;
};

module.exports.getDatesBetweenStartAndEndDate = function (startDate, endDate) {
    var dates = [];

    while(startDate < endDate) {
        dates.push(startDate);
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }

    return dates;
};
