import React, { useEffect, useState} from 'react';
import axios from "axios";
import {ENDPOINT_ADD_RESOURCE} from "../../../../Constants/UrlConstants";
import TitlesTable from "../../AdminLayout/TitlesTable";
import TitlePage from "../../AdminLayout/TitlePage";
import {ADMIN_UPDATE_RESOURCE} from "../../../../Constants/constants";
import Item from "../Item";

const ResourcesContainer = () => {

    const [resources, setResources] = useState([]);

    const titles = ['#', 'name', 'url', 'author', 'language', 'level',  'publisher', 'Update', 'delete'];
    const userAttributesKey = ['resourceName', 'url', 'author', 'language', 'level',  'publisher'];

    useEffect(() => {
        const token = localStorage.getItem('tokenUser');
        axios.get(ENDPOINT_ADD_RESOURCE, {headers: {Authorization: "Bearer " + token}})
            .then(response => {
                console.log(response);
                setResources(response.data['hydra:member']);
            }, (error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <TitlePage title="Page de gestion des resources"/>

            <table className="table">
                <TitlesTable titles={titles} />
                    <Item items={resources} attributeskey={userAttributesKey} endpoint={ADMIN_UPDATE_RESOURCE}/>
            </table>

        </div>
    );
};
export default ResourcesContainer;