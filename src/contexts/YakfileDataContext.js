import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from './CurrentUserContext';
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { followHelper, unfollowHelper } from "../utils/utils";

const YakfileDataContext = createContext();
const SetYakfileDataContext = createContext();
export const useYakfileData = () => useContext(YakfileDataContext);
export const useSetYakfileData = () => useContext(SetYakfileDataContext);

export const YakfileDataProvider = ({ children }) => {
    const [yakfileData, setYakfileData] = useState({
        pageYakfile: { results: [] },
        popularYakfiles: { results: [] },
    });
    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    const handleFollow = async (clickedYakfile) => {
        try {
            const { data } = await axiosRes.post("/follower/", {
                followed_user: clickedYakfile.id,
            });

            setYakfileData((prevState) => ({
                ...prevState,
                pageYakfile: {
                    results: prevState.pageYakfile.results.map((yakfile) =>
                        followHelper(yakfile, clickedYakfile, data.id)
                    ),
                },
                popularYakfiles: {
                    ...prevState.popularYakfiles,
                    results: prevState.popularYakfiles.results.map((yakfile) =>
                        followHelper(yakfile, clickedYakfile, data.id)
                    ),
                },
            }));
        } catch (err) {
            console.log(err);
            if (err.response?.status === 500) {
                navigate('/500')
            }
        }
    };

    const handleUnfollow = async (clickedYakfile) => {
        try {
            await axiosRes.delete(`/follower/${clickedYakfile.following_id}`);
            setYakfileData((prevState) => ({
                ...prevState,
                pageYakfile: {
                    results: prevState.pageYakfile.results.map((yakfile) =>
                        unfollowHelper(yakfile, clickedYakfile)
                    ),
                },
                popularYakfile: {
                    ...prevState.popularYakfiles,
                    results: prevState.popularYakfiles.results.map((yakfile) =>
                        unfollowHelper(yakfile, clickedYakfile)
                    ),
                },
            }));
            navigate(0);
        } catch (err) {
            console.log(err);
            if (err.response?.status === 500) {
                navigate('/500')
            }
        }
    };

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    '/yakfile/?ordering=-follower_count'
                );
                setYakfileData(prevState => ({
                    ...prevState,
                    popularYakfiles: data,
                }))
            } catch (err) {
                console.log(err)
                if (err.response?.status === 500) {
                    navigate('/500')
                }
            }
        }
        handleMount();
    }, [currentUser, navigate]);

    return (
        <YakfileDataContext.Provider value={yakfileData}>
            <SetYakfileDataContext.Provider value={{ setYakfileData, handleFollow, handleUnfollow }}>
                {children}
            </SetYakfileDataContext.Provider>
        </YakfileDataContext.Provider>
    )
}