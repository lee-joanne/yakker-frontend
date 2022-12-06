// Infinite scroll, followhelper, and jwt token code credit goes to CI's Moments Project
import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    // console.log
  }
};

export const followHelper = (yakfile, clickedYakfile, following_id) => {
  return yakfile.id === clickedYakfile.id
    ? {
        ...yakfile,
        follower_count: yakfile.follower_count + 1,
        following_id,
      }
    : yakfile.is_author
    ? { ...yakfile, following_count: yakfile.following_count + 1 }
    : yakfile;
};

export const unfollowHelper = (yakfile, clickedYakfile) => {
  return yakfile.id === clickedYakfile.id
    ? {
        ...yakfile,
        follower_count: yakfile.follower_count - 1,
        following_id: null,
      }
    : yakfile.is_author
    ? { ...yakfile, following_count: yakfile.following_count - 1 }
    : yakfile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
