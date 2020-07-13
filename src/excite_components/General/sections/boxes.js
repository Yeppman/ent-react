import React from 'react'
import {
    HomeOutlined, CarOutlined
  } from '@ant-design/icons';


export default function Boxes() {
    return (
        <div>
            <div class="home-box">

                <div class="home-card">
                    <span style={{fontSize: '25px'}}  className="box-color"><HomeOutlined />Store</span>
                </div>

                <div class="home-card">
                    <span style={{fontSize: '25px'}}  className="box-color"><CarOutlined /> Delivery</span>
                </div>

                <div class="home-card">
                    <span className="box-color"><b>Nokia</b></span>
                </div>

                <div class="home-card">
                    <span className="box-color" style={{fontSize: '25px'}}><b>Phillips</b></span>
                </div>
                
                <div class="home-card">
                    <span className="box-color" style={{fontSize: '25px'}}><b>Samsung</b></span>
                </div>

            </div>
        </div>
    )
}
