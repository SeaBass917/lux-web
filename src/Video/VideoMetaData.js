class VideoMetaData {
  constructor(
    title,
    nsfw,
    studio,
    staff,
    yearStart,
    yearEnd,
    producer,
    englishLicense,
    visitedMal,
    director,
    tags,
    visitedIMDB,
    visitedWikipedia,
    dateAdded,
    description
  ) {
    this.title = title;
    this.nsfw = nsfw;
    this.studio = studio;
    this.staff = staff;
    this.yearStart = yearStart;
    this.yearEnd = yearEnd;
    this.producer = producer;
    this.englishLicense = englishLicense;
    this.visitedMal = visitedMal;
    this.director = director;
    this.tags = tags;
    this.visitedIMDB = visitedIMDB;
    this.visitedWikipedia = visitedWikipedia;
    this.dateAdded = dateAdded;
    this.description = description;
  }

  /**
   * Checks if the required fields for a thumbnail are present.
   * @returns {bool}  True if all required fields are present.
   */
  checkRequiredFieldsThumbnail() {
    return this.title != null && this.nsfw != null;
  }

  /**
   * Checks if the required fields for an info page are present.
   * @returns {bool}  True if all required fields are present.
   */
  checkRequiredFieldsInfoPage() {
    return (
      this.title != null &&
      this.description != null &&
      this.tags != null &&
      this.yearStart != null
    );
  }
}

export default VideoMetaData;
