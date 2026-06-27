/**
 * =====================================================
 * Trade Mark QID Management System V4
 * Core Engine
 * =====================================================
 */

/**
 * Web App
 */
function doGet() {

  return HtmlService
    .createTemplateFromFile("Index")
    .evaluate()
    .setTitle(CONFIG.APP_NAME)
    .addMetaTag(
      "viewport",
      "width=device-width, initial-scale=1"
    );

}

/**
 * Dashboard Statistics
 */
function getDashboardStats() {

  const sheet = getSheet(CONFIG.EMPLOYEE_SHEET);

  const data = sheet.getDataRange().getDisplayValues();

  let total = 0;
  let active = 0;
  let expired = 0;

  for (let i = 1; i < data.length; i++) {

    if (!data[i][0]) continue;

    total++;

    const expire = new Date(data[i][2]);

    if (isNaN(expire.getTime())) {

      active++;

      continue;

    }

    expire.setHours(0,0,0,0);

    const today = new Date();
    today.setHours(0,0,0,0);

    if (expire >= today) {

      active++;

    } else {

      expired++;

    }

  }

  return success({

    total: total,

    active: active,

    expired: expired

  });

}
