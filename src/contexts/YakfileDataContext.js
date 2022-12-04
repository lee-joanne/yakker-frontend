import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from './CurrentUserContext';
import { axiosReq } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

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
            <SetYakfileDataContext.Provider value={setYakfileData}>
                {children}
            </SetYakfileDataContext.Provider>
        </YakfileDataContext.Provider>
    )
}