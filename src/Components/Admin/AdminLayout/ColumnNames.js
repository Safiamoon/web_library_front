import React from "react";

//composant qui regroupe les titres de la table des items
//pour que l'admin puisse s'y retrouver dans la gestion des items
const ColumnNames = ({columnNames}) => {
    return (

        <thead>
            <tr>
                {columnNames ? columnNames.map((columnName, index) =>
                        <th scope="col" key={index}>{columnName}</th>
                    )
                    : <th scope="col"/>
                }
            </tr>
        </thead>
    );
};
export default ColumnNames;