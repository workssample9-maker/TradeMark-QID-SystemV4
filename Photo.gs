/**
 * =====================================================
 * Trade Mark QID Management System V4
 * Photo Service
 * =====================================================
 */

/**
 * Get Employee Photo URL
 */
function getPhotoUrl(fileId) {

  if (!fileId) {
    return getDefaultPhoto();
  }

  try {

    DriveApp.getFileById(fileId);

    return "https://drive.google.com/thumbnail?id=" +
           fileId +
           "&sz=w800";

  } catch (err) {

    return getDefaultPhoto();

  }

}

/**
 * Default Image
 */
function getDefaultPhoto() {

  return "https://placehold.co/600x400?text=NO+PHOTO";

}

/**
 * Check Photo Exists
 */
function hasPhoto(fileId) {

  if (!fileId) return false;

  try {

    DriveApp.getFileById(fileId);

    return true;

  } catch (err) {

    return false;

  }

}

/**
 * Get Photo Metadata
 */
function getPhotoInfo(fileId){

  if(!fileId){

    return null;

  }

  try{

    const file = DriveApp.getFileById(fileId);

    return {

      id:file.getId(),

      name:file.getName(),

      size:file.getSize(),

      type:file.getMimeType(),

      created:file.getDateCreated(),

      updated:file.getLastUpdated()

    };

  }catch(err){

    return null;

  }

}
