import React, {useContext, useState}from "react";
import {Circle} from "better-react-spinkit";
import { Button, Input, Stack, InputGroup, InputLeftElement } from "@chakra-ui/core";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import FormControl from "@chakra-ui/core/dist/FormControl";
import { Select } from "@chakra-ui/core";
import SelectAuthor from "../SelectResource/SelectAuthor";
import SelectLevel from "../SelectResource/SelectLevel";
import SelectProgram from "../SelectResource/SelectProgram";
import { Box } from "@chakra-ui/core";
import UserContext from "../Context/UserContext";
import ConnectedUserNav from "../../Layout/Nav/ConnectedUserNav";

const AddResourceFormProgram = ({getAddedResource, isLoading, getAddedResourceInput})=>{
    const {username} = useContext(UserContext);
    const [showInput, setShowInput] = useState(false);

    const changeInput = (e) => {
        setShowInput(true);
    }

    const changeInputToFalse = (e) => {
        setShowInput(false);
    }


    return(
        <div style={{height:"150vh"}}>

            <ConnectedUserNav username={username} />
            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
                <Box w="80%" p={4} mb={5} className="align-self-center">
                    <div className="form" style={{height:"140vh"}}>
                        <h2 className="text-uppercase" style={{color:"#4a9bd1"}}>Add a new resource</h2>
                        {/* On utilise l operateur ternaire : si showInput est vrai alors on soumet avec getAddedResourceInput*/}
                        {/* sinon on utilise getAddedResource */}
                        <form onSubmit={showInput ? getAddedResourceInput : getAddedResource}>

                            <Stack spacing={4}>

                            <FormControl isRequired>
                            <FormLabel htmlFor="Name">Name</FormLabel>
                            <InputGroup>
                                <InputLeftElement />
                                <Input
                                variant="outline"
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Title..."
                                />
                            </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                            <FormLabel htmlFor="url">Url</FormLabel>
                            <InputGroup>
                                <InputLeftElement/>
                                <Input
                                variant="outline"
                                type="text"
                                name="url"
                                id="url"
                                className="form-control"
                                placeholder="Url..."
                                />
                            </InputGroup>
                            </FormControl>


                            {
                                    showInput ?
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="author">Author</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement/>
                                                <Input
                                                    variant="outline"
                                                    type="text"
                                                    name="author"
                                                    id="author"
                                                    className="form-control"
                                                    placeholder="author..."
                                                />
                                            </InputGroup>
                                            <button onClick={changeInputToFalse}>Select an existing author</button>
                                        </FormControl>
                                        :
                                        <FormControl isRequired id="parap">
                                            <FormLabel htmlFor="name">Author</FormLabel>
                                            <SelectAuthor></SelectAuthor>
                                            <button onClick={changeInput}>Add a new author</button>
                                        </FormControl>
                                }

                            <FormControl isRequired>
                            <FormLabel htmlFor="language">Language</FormLabel>
                            <Select placeholder="Language..." variant="outline" type="text" name="language" id="language" className="form-control">
                                <option value="French">French</option>
                                <option value="English">English</option>
                            </Select>
                            </FormControl>

                            <FormControl isRequired>
                            <FormLabel htmlFor="level">Level</FormLabel>
                            <SelectLevel></SelectLevel>
                            </FormControl>

                            <FormControl isRequired>
                            <FormLabel htmlFor="program">Program</FormLabel>
                            <SelectProgram></SelectProgram>
                            </FormControl>

                            {isLoading ? (
                            <Button
                                type="submit"
                                variantColor="telegram"
                                variant="solid"
                                width="full"
                                border="transparent"
                            >
                            <Circle />
                            </Button>
                            ) : (
                            <Button
                                type="submit"
                                rightIcon="arrow-forward"
                                variantColor="red"
                                variant="solid"
                                width="150px"
                                border="transparent"
                            >
                                Add resource
                            </Button>
                            )
                            }

                            </Stack>
                        </form>
                    </div>
                </Box>
            </div>
        </div>
    );
}
    


export default AddResourceFormProgram;