/**
 * =====================================================
 * Trade Mark QID Management System V4
 * Utility Functions
 * =====================================================
 */

/**
 * Return Spreadsheet
 */
function getSpreadsheet() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

/**
 * Return Sheet
 */
function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}

/**
 * Include HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Format Date
 */
function formatDate(date) {

  if (!date) return "";

  return Utilities.formatDate(
    new Date(date),
    Session.getScriptTimeZone(),
    "dd-MMM-yyyy"
  );

}

/**
 * Success Response
 */
function success(data) {

  return {
    success: true,
    data: data
  };

}

/**
 * Error Response
 */
function failure(message) {

  return {
    success: false,
    message: message
  };

}
