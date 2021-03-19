import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './MainTable.css';

interface I_itemObj {
    'index'?:number;
    'id'?:string;
    'title'?:string;
    'publication_year'?:string;
    'publisher'?:string;
    'subjects'?:string[];
    'url_ccdc'?:string;
  }

interface IProps {
    csData?: I_itemObj[];
    handleSelectData?:(index:number,evn:React.MouseEvent)=>void;
}

function MainTable({csData,handleSelectData}:IProps, ){
return (
    <Table striped bordered hover className={'table-responsive'} role="rowtable" responsive="lg">
            <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                </tr>
             </thead>
            <tbody >
              {csData && csData.map((item:I_itemObj)=>(
                   <tr key={item['index']}  onClick={(evn)=>handleSelectData(item['index'],evn)}> 
                   <td>{item['id']}</td>
                   <td>{item['title']}</td>
                 </tr>
                )
              )}
          </tbody>
        </Table>
)
}

export default MainTable;