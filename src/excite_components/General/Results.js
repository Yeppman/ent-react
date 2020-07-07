import React from 'react';
import { List, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

class Search_Results extends React.Component{
    

    state = {
        fetched_results :[]
    }
   
    Recieve_Query = async()=>{
        const title = this.props.match.params.Title
        alert(title ,'oo')
        axios.get('https://backend-entr.herokuapp.com/core_api/post_filter/', {
            params:{
                title
            }
        })
        .then(res =>{
            this.setState({
                fetched_results : res.data
            })
        })
    }


    componentDidMount(){
        this.Recieve_Query()
    }


    render(){
        const {fetched_results} = this.state
        return (
            
        
            <div className="container" >
      <List
         className="post-list-text"
         itemLayout="vertical"
         size="large"
         pagination={{
           onChange: page => {console.log(page);},
           pageSize: 3,
         }}
         dataSource={fetched_results}
         
     renderItem={item => (
       <List.Item
         key={item.GigTitle}
         actions={[
           <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
           <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
           <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
         ]}
         extra={
           <img
             width={272}
             alt="logo"
             src={item.GigImage1}
           />
         }
       >
         <List.Item.Meta
           title={<a  className="post-list-title" 
           href={`/post_detail/${item.id}`}> {item.GigTitle} </a>}
           description={
             <p className="post-list-text">
             <a 
            href={`/post_detail/${item.id}`}
            style={{color:"#434343"}} >
            {item.GigDescription.length < 50 ? 
              `${item.GigDescription}` : `${item.GigDescription.substring(0, 300)}...` }
            </a>
            </p>
           }
         />
         {item.content}
       </List.Item>
     )}
   />

</div>
    


)
    }

}


export default Search_Results;
  

         