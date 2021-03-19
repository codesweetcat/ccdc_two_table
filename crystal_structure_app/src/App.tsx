import React, { useEffect, useState } from 'react';
import './App.css';
import { getCCDS_RowData } from './services/fetch';
import { Col, Row} from "react-bootstrap";
import MainTable from './components/MainTable';
import SelectTable from './components/SelectTable';

//Publication year▪Publisher▪Subjects▪URL(which links back to theCCDC)
interface I_itemObj {
  'index'?:number;
  'id'?:string;
  'title'?:string;
  'publication_year'?:string;
  'publisher'?:string;
  'subjects'?:string[];
  'url_ccdc'?:string;
}



function App() {
  //row cs data from first loading
  const [csData, setCsData] = useState<I_itemObj[] | []>([]);
  //select row will be populated 
  const [selectData, setSelectData] = useState<I_itemObj>();
  //select row's top offset, will pass to selectTable component; 
  const [selectDataHeight, setSelectDataHeight] = useState<number>(0);
  const selectDataTableStyle = {
    transform: `translateY(${selectDataHeight}px)`,
  }

  useEffect(() => {//loading page, populate data into local state
    getCCDS_RowData('https://api.test.datacite.org/dois?query=prefix:10.5517')
    .then((res)=>{
      const temArray:I_itemObj[] = []
      res['data'].map((item: any,index:number)=>{
        const temItem:I_itemObj = {}
        temItem['index'] = index
        temItem['id']=item.id
        temItem['title'] = item.attributes.titles[0].title
        temItem['publication_year'] = item.attributes.publicationYear
        temItem['publisher'] = item.attributes.publisher
        temItem['subjects'] = item.attributes.subjects
        temItem['url_ccdc'] = item.attributes.url
        temArray.push(temItem);
        return temArray;
      })
      setCsData(temArray)
     
    })
  }, [])

  /*Expanding selected row to expose details might be better than pointing to details on the right-side
  just try differences */
  const handleSelectDataAndTopOffset= (index:number | undefined,evn: React.MouseEvent<HTMLTableRowElement>) => { 
    const node = evn.target as HTMLElement;
    console.log(csData.filter(item=>item['index'] === index)[0],node.getBoundingClientRect())
    setSelectDataHeight(node.getBoundingClientRect()['top']) //check resouses: https://jsfiddle.net/7520ebgf/23/
      return setSelectData(csData.filter(item=>item['index'] === index)[0])
  }

   
  return (
    <div>
       <Row>
       <Col xs="4">
          <MainTable csData={csData} handleSelectData={handleSelectDataAndTopOffset}/>
        </Col>
        <Col xs="6">
          <SelectTable selectData={selectData} selectDataTableStyle={selectDataTableStyle}/>
        </Col>
    </Row>
  </div>
  );
}

export default App;

