import React from 'react';
import { List, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);


const Results = props =>{
    const results = props.post_results
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
                      dataSource={results}
                      
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
                            {item.GigDescription}
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


export default Results;
  

         