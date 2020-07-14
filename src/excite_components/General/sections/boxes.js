import React from 'react'
import {
    HomeOutlined, CarOutlined, MailOutlined
  } from '@ant-design/icons';


export default function Boxes() {
    return (
        <div>
            <div class="home-box">

                <div class="home-card">
                    <span className="box-color"><HomeOutlined /><b>Store</b></span>
                </div>

                <div class="home-card">
                    <span   className="box-color"><CarOutlined /> <b>Delivery</b></span>
                </div>

                <div class="home-card">
                    <span className="box-color"><CarOutlined /> <b>Logistics</b></span>
                </div>

                <div class="home-card">
                    <span className="box-color" ><MailOutlined /><b> Email Marketing</b></span>
                </div>
                

            </div>
        </div>
    )
}
