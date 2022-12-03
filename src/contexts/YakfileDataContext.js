import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from './CurrentUserContext';
import { axiosReq } from "../api/axiosDefaults";

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
            }
        }
        handleMount();
    }, [currentUser]);

    return (
        <YakfileDataContext.Provider value={yakfileData}>
            <SetYakfileDataContext.Provider value={setYakfileData}>
                {children}
            </SetYakfileDataContext.Provider>
        </YakfileDataContext.Provider>
    )
}