import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';


const Load_Comments = (props) =>(
 
    <div>
        {
            props.take_comments.map((i)=>(
                <Comment
                    author={i.name}
                    avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
                    }
                    content={
                    <p>
                        {i.comments}
                    </p>
                    }
                    datetime={
                    <Tooltip title>
                        <span>{i.created}</span>
                    </Tooltip>
                    }
                />
            ))
        }    
    
    </div>

)

export default Load_Comments