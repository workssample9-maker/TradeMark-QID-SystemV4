/**
 * =====================================================
 * Trade Mark QID Management System V4
 * Dashboard Service
 * =====================================================
 */

/**
 * Get Dashboard Statistics
 */
function getDashboardStats() {

  const sheet = getSheet(CONFIG.EMPLOYEE_SHEET);

  if (!sheet) {
    return failure("Employees sheet not found.");
  }

  const data = sheet.getDataRange().getDisplayValues();

  let total = 0;
  let active = 0;
  let expired = 0;
  let expiringSoon = 0;

  for (let i = 1; i < data.length; i++) {

    const qid = data[i][0];

    if (!qid) continue;

    total++;

    const status = getEmployeeStatus(data[i][2]);

    if (status === "ACTIVE") {

      active++;

      const days = getRemainingDays(data[i][2]);

      if (days >= 0 && days <= 30) {
        expiringSoon++;
      }

    } else {

      expired++;

    }

  }

  return success({

    total: total,

    active: active,

    expired: expired,

    expiringSoon: expiringSoon,

    systemVersion: CONFIG.VERSION,

    company: CONFIG.COMPANY

  });

}

/**
 * Dashboard Health
 */
function getSystemInfo() {

  return success({

    app: CONFIG.APP_NAME,

    version: CONFIG.VERSION,

    company: CONFIG.COMPANY,

    timezone: Session.getScriptTimeZone(),

    currentTime: new Date()

  });

}

/**
 * Today's Search Count
 */
function getTodaySearchCount() {

  const sheet = getSheet(CONFIG.SEARCH_LOG_SHEET);

  if (!sheet) {

    return 0;

  }

  const values = sheet.getDataRange().getValues();

  const today = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyyMMdd"
  );

  let count = 0;

  for (let i = 1; i < values.length; i++) {

    if (!values[i][0]) continue;

    const d = Utilities.formatDate(
      new Date(values[i][0]),
      Session.getScriptTimeZone(),
      "yyyyMMdd"
    );

    if (d === today) {

      count++;

    }

  }

  return count;

}
