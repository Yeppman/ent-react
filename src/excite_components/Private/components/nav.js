import React from 'react'
import { UserOutlined, BellOutlined } from '@ant-design/icons';

export default function Nav() {
    return (
        <div>
            <div class="nav">
                <ul class="nav-order">
                    <li class="nav-list"><a href="#home">Home</a></li>
                    <li><a class="" href="#news">News</a></li>
                    <li><a class="" href="#contact">Contact</a></li>
                    <li style={{float:'right'}}>
                        <a class="active" href="#about">
                            <span className="box-icon"><UserOutlined style={{ fontSize: '16px' }} theme="outlined" /></span>
                        John Doe</a>
                    </li>
                    <li style={{float:'right'}}>
                        <a class="active " href="#about">
                            <span className="box-icon"> <BellOutlined style={{ fontSize: '16px' }} /></span>
                        </a>
                    </li>
                   
                </ul>
            </div>
        </div>
    )
}
