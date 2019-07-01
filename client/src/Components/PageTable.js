import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
 import {NavLink} from 'react-router-dom';

class PageTable extends Component {
  constructor(props){
    super(props);
    this.state={enquiries:[]}
  }

  render() {
  let data=this.props.res.data
  let header=this.props.res.header
  let count=this.props.res.count
  let rows,pages,sort,curr,order;
  if(this.props.options){
    rows=this.props.options.rows;
    pages=Math.ceil(count/rows);
    curr=this.props.options.page;
    sort=this.props.options.sort;
    order=this.props.options.order;
  }

    return (
      <div className="container cat">
        <br/>
        <h1>{this.props.title}</h1>
        <br/>
        {data.length>0?
        <div>
        <input type="text" onKeyDown={this.props.searchFor}></input>
        <br/>
        <br/>
        <Table className="table">
        <GetHeader header={Object.keys(header)} sortBy={this.props.sortBy} sort={sort} order={order}/>
        <GetBody body={data} link={this.props.link} header={Object.keys(header)}/>
        </Table>      
        {this.props.options.rows?<GetPagination pages={pages} curr={curr} link={this.props.getPage}/>:null}
        </div>
        :
        <div>
        <input type="text" onKeyDown={this.props.searchFor}></input>
        <Table className="table">
          <GetHeader header={Object.keys(header)} sortBy={this.props.sortBy} sort={sort} order={order}/>
          <tr><td>No Data</td></tr>
        </Table>      
        </div>        
        }
      </div>
    );
  }
}

const GetBody =(props)=>{
  return (<tbody>
      {props.body.map((val,i) => (<GetRow key={i} link={props.link} header={props.header} body={val}></GetRow>))}
      </tbody>);

}

const GetRow =(props)=>{
    let data=props.body,_id,header=props.header,link=props.link;
    if(header[0]==='_id') header.shift();
    _id=props.body['_id'];
    return (
        <tr>
        {header.map((field,i) => (
        <td key={i}><NavLink to={'/'+link+'/'+_id}>{data[field]}</NavLink></td>
        )
        )}
        </tr>
        );  
  }
const GetPagination=(props)=>{
  let pages=[];
  let curr=props.curr;

  if(curr===1 || curr ===2){let i=2;while(i<=props.pages && i<=curr+2){pages.push(i);i++;}}
  else if(props.pages===curr) pages=[curr-1,curr];
  else pages=[curr-1,curr,curr+1];

  return(<Pagination size="md" variant="secondary">
    {curr===1?<Pagination.First disabled/>:<Pagination.First onClick={()=>props.link(1)}/>}
    {curr===1?<Pagination.Prev disabled/>:<Pagination.Prev onClick={()=>props.link(curr-1)}/>}
    {curr===1?<Pagination.Item active>{1}</Pagination.Item>:<Pagination.Item onClick={()=>props.link(1)}>{1}</Pagination.Item>}
    {(curr!==1 && curr!==2)?<Pagination.Ellipsis/>:('')}
    {pages.map((page,i) =>(curr===page?<Pagination.Item key={i} active>{page}</Pagination.Item>:<Pagination.Item key={i} onClick={()=>props.link(page)}>{page}</Pagination.Item>))}
    {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Ellipsis />:''}
    {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Item onClick={()=>props.link(props.pages)}>{props.pages}</Pagination.Item>:('')}
    {curr!==props.pages?<Pagination.Next onClick={()=>props.link(curr+1)}/>:<Pagination.Next disabled/>}
    {curr!==props.pages?<Pagination.Last onClick={()=>props.link(props.pages)}/>:<Pagination.Last disabled/>}
    
  </Pagination>);
}
const GetHeader =(props)=>{
  if(props.header[0]==='_id'){
    props.header.shift();
    var sort=props.sort;
  }
  return (<thead>
      <tr>
      {props.header.map((col,i) => (          
        <th key={i} onClick={()=>props.sortBy(i)}>{col}{(sort===i&&props.order===0)?<span>&#8593;</span>:null}{(sort===i&&props.order===1)?<span>&#8595;</span>:null}</th>
      ))}
      </tr>
      </thead>);
}
export default PageTable;
