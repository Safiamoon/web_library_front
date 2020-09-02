import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {URL_API} from "../../../../Constants/UrlConstants";
import ConnectedUserNav from "../../../../Layout/Nav/ConnectedUserNav";
import {Box, Input, InputGroup, InputLeftElement, Stack} from "@chakra-ui/core";
import FormControl from "@chakra-ui/core/dist/FormControl";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import UserContext from "../../../Context/UserContext";
import ButtonSubmit from "../../../Utils/ButtonSubmit";
import {ADMIN_PROGRAMS} from "../../../../Constants/constants";
import {Wave} from "better-react-spinkit";
import InputFormControl from "../../../Utils/Form/InputFormControl";

const UpdateProgramForm = ({match}) => {

    const {username} = useContext(UserContext);
    const [title] = useState("Send");
    const [resource, setResource] = useState();
    let history = useHistory();
    const token = localStorage.getItem('tokenUser');
    const config = {headers: {Authorization: "Bearer " + token, 'Content-type': 'application/json'}};

    useEffect(() => {
        Axios.get(`${URL_API}${match.params.id}`, config)
            .then(response => {
                setResource(response.data);
            })
            .catch(error => console.log(error));
    })

    const updateThisProgram = (e) => {
        e.preventDefault();
        Axios.put(`${URL_API}` + match.params.id, {name:e.target.elements.programName.value}, config)
            .then(history.push(ADMIN_PROGRAMS));
    };

    return (
        <div style={{height:"150vh"}}>

            <ConnectedUserNav username={username} />
            {
                resource ?
                    <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                        <Box w="80%" p={4} mb={5} className="align-self-center">
                            <div className="form" style={{height:"140vh"}}>
                                <h2 className="text-uppercase" style={{color:"#d83a3a"}}>Update Program</h2>
                                <form onSubmit={updateThisProgram}>
                                    <Stack spacing={4}>

                                        <InputFormControl
                                            id="id"
                                            name="id"
                                            label="id"
                                            placeholder={resource['@id']}
                                            isDisabled={true}
                                        />

                                        <InputFormControl
                                            name="programName"
                                            id="programName"
                                            label="Program Name"
                                            placeholder={resource.programName}
                                        />

                                        <ButtonSubmit title={title} />

                                    </Stack>
                                </form>
                            </div>
                        </Box>
                    </div>
                    :
                    <div style={{minHeight:"100vh"}} className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                        <Wave size={100} color={"#00acee"} />
                    </div>
            }
        </div>
    );
};

export default UpdateProgramForm;