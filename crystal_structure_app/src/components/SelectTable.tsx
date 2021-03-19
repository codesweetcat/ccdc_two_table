import React from 'react';
import { Table } from 'react-bootstrap';
import { I_itemObj } from '../global';

interface IProps {
    selectData?: I_itemObj;
    selectDataTableStyle?:{
        transform: string;
    };
}

function SelectTable({selectData,selectDataTableStyle}:IProps){
return (
    <Table striped bordered hover  style={selectDataTableStyle} role="selectdetailtable">
    <thead>
        <tr>
          <th>Publication year</th>
          <th>Publisher</th>
          <th>Subjects</th>
          <th>URL(which links back to theCCDC)</th>
        </tr>
   </thead>
  <tbody>
      {selectData && (
          <tr key={selectData['index']} > 
          <td>{selectData['publication_year']}</td>
          <td>{selectData['publisher']}</td>
          <td>{selectData['subjects'].map((selectData,index)=>(
            <p key={index}>{selectData['subject']}</p>
          ))}
          </td>
          <td>{selectData['url_ccdc']}</td>
    
        </tr>
      )
      }
  </tbody>
</Table>
)
}

export default SelectTable;