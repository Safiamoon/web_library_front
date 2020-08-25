import React, {useState, useEffect, useContext} from "react";
import {getProgramInfo} from "../../Services/ProgramsServices";
import {Circle, Wave} from "better-react-spinkit";
import Resource from "../ResourcesPage/Resource";
import ConnectedUserNav from "../../Layout/Nav/ConnectedUserNav";
import UserContext from "../Context/UserContext";

const FrameworkInfo = ({match}) => {
    const [ressources, setRessources] = useState();
    const {username} = useContext(UserContext);
    const token = localStorage.getItem('tokenUser');
    const config = {headers: {Authorization: "Bearer " + token}};
    const [loading, setLoading] = useState(true);
    const idFramework = match.params.id;

    useEffect(() => {
        getProgramInfo(idFramework, config)
            .then((res) => {
                const resourcesList = res.data.topic.ressources;
                setRessources(resourcesList);
                console.log(resourcesList);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{height:"100vh"}}>
            <ConnectedUserNav username={username} />
            <div className="card-deck mt-5">
                {loading ? (
                    <div style={{minHeight:"100vh"}} className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                        <Wave size={100} color={"#00acee"} />
                    </div>
                ) : (
                    ressources.map((resource) => {
                        return (
                            <>
                                <Resource key={resource['@id']} resource={resource} />
                            </>
                        );
                    })
                )}
            </div>
        </div>
    );
};
export default FrameworkInfo;
