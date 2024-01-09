import axios from "axios";
import { hash, compare } from "bcryptjs";
import VideoMetaData from "../Video/VideoMetaData";

/**************************
 * Constants
 **************************/

const serverTimeoutSeconds = 5;

// TODO: Move this under configuration?
/// Server Port
const defaultServerPort = "8081";

// Endpoints
const endpointGetPepper = "GetPepper";
const endpointGetAuthToken = "GetAuthToken";

const endpointMangaCollectionIndex = "GetMangaCollectionIndex";
const endpointMangaMetaDataByTitle = "GetMangaMetaDataByTitle";
const endpointMangaChaptersByTitle = "GetMangaChaptersByTitle";

const endpointVideoCollectionIndex = "GetVideoCollectionIndex";
const endpointVideoMetaDataByTitle = "GetVideoMetaDataByTitle";
const endpointVideoEpisodesByTitle = "GetVideoEpisodesByTitle";
const endpointSubtitleSelections = "GetSubtitleSelectionsForEpisode";
const endpointSubtitlesChewieFmt = "GetSubtitlesChewieFmt";

// Known Paths
const pathManga = "manga";
const pathVideo = "video";
const pathMusic = "music";
const pathImage = "images";
const pathSubtitles = "subtitles";
const pathMangaThumbnail = "lux-assets/thumbnails/manga/";
const pathMangaCoverArt = "lux-assets/covers/manga/";
const pathVideoThumbnail = "lux-assets/thumbnails/video/";
const pathVideoCoverArt = "lux-assets/covers/video/";
const pathMusicThumbnail = "lux-assets/thumbnails/music/";
const pathMusicCoverArt = "lux-assets/covers/music/";

// TODO: This is jank af. Have this be a local resource
//       The reason it is currently not, is because the list is a list of
//       Network images. So, you'd need to find some common class, etc...
const endpointBlackPng = "public/assets/images/_black.png";

/**
 * Convert a JWT to a signed folder used on the server side.
 * This is where our authorized data will be.
 * @param {string} jwt
 * @returns {string}
 */
function convertJWTToSignedFolder(jwt) {
  if (jwt.length < 25) {
    return jwt;
  }
  return jwt.substring(jwt.length - 25);
}

/**************************
 * Server Auth Endpoints
 **************************/

/**
 * Get the pepper from the server.
 * @param {string} serverIP The IP of the server.
 * @param {string} serverPort Defaults to 8081
 * @returns {string} The pepper from the server.
 * @throws {Error} If the server does not respond, or the response is not 200.
 */
export async function getPepper(serverIP, serverPort = defaultServerPort) {
  const response = await axios.get(
    `http://${serverIP}:${serverPort}/${endpointGetPepper}`,
    {
      timeout: serverTimeoutSeconds * 1000,
    }
  );

  if (response.status != 200) {
    throw new Error(response.data);
  }

  return response.data;
}

/**
 * Get the JWT auth token from the server.
 * @param {string} serverIP The IP of the server.
 * @param {string} pwd The password to hash.
 * @param {string} pepper The pepper to hash with.
 * @param {string} serverPort Defaults to 8081
 * @returns {string} The JWT auth token from the server.
 * @throws {Error} If the server does not respond, or the response is not 200.
 */
export async function getAuthToken(
  serverIP,
  pwd,
  pepper,
  serverPort = defaultServerPort
) {
  // Hash the password
  const hashedPassword = await hash(pwd, pepper);

  // Send the request to the server
  const response = await axios.post(
    `http://${serverIP}:${serverPort}/${endpointGetAuthToken}`,
    {
      pwdHash: hashedPassword,
    },
    {
      timeout: serverTimeoutSeconds * 1000,
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data);
  }

  return response.data;
}

/**************************
 * Video Endpoints
 **************************/

export async function getVideoCollectionIndex(
  token,
  serverIP,
  serverPort = defaultServerPort
) {
  const response = await axios.get(
    `http://${serverIP}:${serverPort}/${endpointVideoCollectionIndex}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data);
  }

  // Parse the response in VideoMetaData objects
  const videoMetaDataList = [];
  for (const metadata of response.data) {
    videoMetaDataList.push(
      new VideoMetaData(
        metadata.title,
        metadata.nsfw,
        metadata.studio,
        metadata.staff,
        metadata.yearStart,
        metadata.yearEnd,
        metadata.producer,
        metadata.englishLicense,
        metadata.visitedMal,
        metadata.director,
        metadata.tags,
        metadata.visitedIMDB,
        metadata.visitedWikipedia,
        metadata.dateAdded,
        metadata.description
      )
    );
  }

  return videoMetaDataList;
}
