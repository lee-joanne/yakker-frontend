// Infinite scroll and followhelper code credit goes to CI's Moments Project
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
    } catch (err) { }
};

export const followHelper = (yakfile, clickedYakfile, following_id) => {
    return yakfile.id === clickedYakfile.id
        ?
        {
            ...yakfile,
            follower_count: yakfile.follower_count + 1,
            following_id,
        }
        : yakfile.is_owner
            ?
            { ...yakfile, following_count: yakfile.following_count + 1 }
            :
            yakfile;
};