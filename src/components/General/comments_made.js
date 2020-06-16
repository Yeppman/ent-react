import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';

const All_Comments = ({comment}) =>{

    return(
        <Comment
       
        author={comment.name}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            {comment.comments}
          </p>
        }
        datetime={
          <Tooltip title>
            <span>{comment.created}</span>
          </Tooltip>
        }
      />
    )
 
}

export default All_Comments