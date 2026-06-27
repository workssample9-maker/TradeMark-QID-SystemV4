/**
 * =====================================================
 * Trade Mark QID Management System V4
 * Employee Search Engine
 * =====================================================
 */

/**
 * Search Employee by QID
 */
function searchEmployee(qid) {

  qid = String(qid).trim();

  if (!qid) {
    return failure("Please enter QID Number.");
  }

  const sheet = getSheet(CONFIG.EMPLOYEE_SHEET);

  if (!sheet) {
    return failure("Employees sheet not found.");
  }

  const values = sheet.getDataRange().getDisplayValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0].trim() === qid) {

      const employee = {

        qid: values[i][0],
        remarks: values[i][1],
        expireDate: values[i][2],
        name: values[i][3],
        photoFileId: values[i][4],

        status: getEmployeeStatus(values[i][2]),

        remainingDays: getRemainingDays(values[i][2])

      };

      logSearch(employee);

      return success(employee);

    }

  }

  return failure("QID NOT FOUND");

}

/**
 * ACTIVE / EXPIRED
 */
function getEmployeeStatus(expireDate) {

  if (!expireDate) return "ACTIVE";

  const d = new Date(expireDate);

  if (isNaN(d.getTime())) return "ACTIVE";

  d.setHours(0,0,0,0);

  const today = new Date();

  today.setHours(0,0,0,0);

  return d >= today ? "ACTIVE" : "EXPIRED";

}

/**
 * Remaining Days
 */
function getRemainingDays(expireDate) {

  if (!expireDate) return "";

  const d = new Date(expireDate);

  if (isNaN(d.getTime())) return "";

  const today = new Date();

  today.setHours(0,0,0,0);

  d.setHours(0,0,0,0);

  return Math.ceil(
    (d.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24)
  );

}

/**
 * Search Log
 */
function logSearch(employee){

  const sheet = getSheet(CONFIG.SEARCH_LOG_SHEET);

  if(!sheet) return;

  sheet.appendRow([

    new Date(),

    employee.qid,

    employee.name,

    employee.status

  ]);

}
