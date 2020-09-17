import React, {useState, useEffect} from "react";
import {getPrograms} from "../../Services/ProgramsServices";
import Program from "./Program";
import ConnectedUserNav from "../../Layout/Nav/ConnectedUserNav";
import WaveLoader from "../Utils/WaveLoader";
import Background1 from "../../Images/mockup-2443050_1920.jpg";

const Programs = () => {
    const [programs, setPrograms] = useState();
    const [loading, setLoading] = useState(true);

    //on utilise un useEffect pour lancer la requete dès le chargement de la page
    useEffect(() => {
        getPrograms()
            .then((res) => {
                const programsList = res.data["hydra:member"];
                setPrograms(programsList);
                console.log(programsList);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);


    return (

        <>
            <ConnectedUserNav />
            <div style={{ backgroundImage:`url(${Background1})`, height: "100vh" }} >
                <div className="card-deck">
                        {loading ? (
                                <WaveLoader />
                        ) : (
                            programs.map((program, index) => {
                                return (
                                        <Program key={index} program={program} />
                                );
                            })
                        )}
                </div>
            </div>
        </>
    );
};

export default Programs;