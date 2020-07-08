import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import {Input ,  Spin ,Card , Form, Button ,
    List, Avatar ,
    Select , DatePicker ,Modal , Upload, message,notification} from 'antd';
 import TemporaryDrawer from '../Sidebar/SideNav'
 import { PlusOutlined } from '@ant-design/icons';

 
const TextArea = Input.TextArea
const { Option } = Select;



const formItemLayout = {
    wrapperCol: { span: 12, offset: 6 }
  };

const host = "https://backend-entr.herokuapp.com"


const openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      
    });
  }

const Tier=  ['Teir1','Teir2','Teir3']
const Hashtags = ['#BlackLives' ,'#Girl', '#Fashion']
const Trend = ['Pop' ,'Nike','E-Sports']

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class NewCampaign extends Component {

    state = {
        data: [] ,
        tiers: [],
        category:[],

        tags:[],
        trends: [],

        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList:[],

        image1:null,
        image2 : null,
        image3: null,
        }

    getTiers = async(token)=>{
        const url = host + '/management/tier-list/'
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
        axios.get(url)
        .then(res =>{
            this.setState({
                tiers : res.data
            })
            console.log('Tiers',res.data)
        })
    }

    getCammpaignCategories = async(token)=>{
      const url = host + '/management/c-categories/'
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        
      axios.get(url)
      .then(res =>{
          this.setState({
              trends : res.data
          })
          console.log(res.data)
      })
  }

    allocateTags = (tag)=>{
      const tagList = []
      tagList.push(tag)
      this.setState({
        tags : tagList
      })
      console.log('The Tagw',tag)
      
    }

  
    allocateTrend = (trenditem)=>{
      // alert('works', trenditem)
      const trendList = []
      trendList.push(trenditem)
      this.setState({
        trends : trendList
      })
      console.log('The Item',trenditem)
     
    }


    //Process Image Upload
    handleImageChange1 = (e) => {
      console.log(e.target.files[0])
        this.setState({
          image1: e.target.files[0]
        })
      };

      handleImageChange2 = (e) => {
        this.setState({
          image2: e.target.files[0]
        })
      };

      handleImageChange3 = (e) => {
        this.setState({
          image3: e.target.files[0]
        })
      };

      handleCancel = () => this.setState({ previewVisible: false });

      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
      };


  ProcessImages = ({ fileList }) =>{
    console.log()
    
    let zImage1 = fileList[0].originFileObj === undefined ? null : fileList[0].originFileObj;
    let zImage2 = fileList[1]
    let zImage3 = fileList[2]

    if (zImage2 != null){
      zImage2 = fileList[1].originFileObj === undefined ? null : fileList[1].originFileObj;
      this.setState({
        image2 : zImage2
      })
      console.log('second image', zImage2)
    }

    if (zImage3 != null){
      zImage2 = fileList[2].originFileObj === undefined ? null : fileList[2].originFileObj;
      this.setState({
        image2 : zImage2
      })
      console.log('third image', zImage3)
    }
   

    this.setState(
      
      {  image1: zImage1 ,
        fileList
       }
      )
      console.log('First Image', zImage1)
  };

  //Image HanldeENDS HERE
      

      CampaignQuery = async(values) =>{

        const title = values['Title']
        const tier_id = values['Tier']
        const categoryID = values['CategoryID']
        
        const description = values['Description']
        
        const contents = values['Contents']

        console.log(title)
        console.log(categoryID)

      
        const hashtags = String(values['Tags'])
        const trend = String(values['Trend'])
       
        const image1 = this.state.image1
        const image2 = this.state.image2
        const image3 = this.state.image3
   
        console.log('values from forn',title, categoryID ,  contents)
       
        
        let fd = new FormData()
        fd.append('title',title)
        fd.append('tier_id', tier_id)
        fd.append('categoryID', categoryID)
        fd.append('hashtags',hashtags)
        fd.append('trend', trend)
        fd.append('description',description)
        fd.append('contents',contents)
        fd.append('image1' ,image1)
        fd.append('image2' ,image2)
        fd.append('image3' ,image3)
       // console.log(fd)

        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        
        const url = host + '/management/create-campaign/'
        axios.post(url , fd)
        .then(res => {
            if (res.status == 200){
                openNotification(res.data['Message'])
                this.props.history.push('/campaign-list/')
            }else{
                openNotification('Task Failed')
            }
        })

    }

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.getTiers(this.props.token)
          this.getCammpaignCategories(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getTiers(newProps.token)
            this.getCammpaignCategories(newProps.token)
        }
        }
      }

    render() {
      const {tiers , category } = this.state
      const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
        return (
            <>
        <TemporaryDrawer />
                
    <div className ="container mx-auto">
                    <div className = "grid grid-cols-6">

                    <div className="login-section col-span-6 
                sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                    <div className="">
                        <Form 
                        {...formItemLayout}
                         onFinish={this.CampaignQuery}>

                      <Form.Item name ="Tier">
                            <Select placeholder ="Select Tier">
                        {
                            tiers.map((b)=>(
                                  <>
                                  <Option value={b.id}>{b.Level}</Option>
                                  </>
                                    ))
                                }
                            </Select>
                         </Form.Item>

                        
                         
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Title">
                            
                                <Input
                                placeholder="Campaign Title"
                                enterButton
                                />
                            
                            </Form.Item>


                            <Form.Item name="Tags">
                        <Select
                            mode="multiple"
                              style={{ width: '100%' }}
                              placeholder="Select Popular Tag"

                              optionLabelProp="label"
                            >
                            {
                              Hashtags.map((c)=>(
                              <Option value={c}
                              onClick={()=>{this.allocateTags(c)}}
                              label={c}>
                            <div className="demo-option-label-item">
                              <span role="img" aria-label>
                                
                              </span>
                              {c}
                            </div>
                              </Option>
                                ))
                              }
                            </Select>
                      </Form.Item>

                      <Form.Item name="Trend">
                        <Select
                            mode="multiple"
                              style={{ width: '100%' }}
                              placeholder="Select Popular Trend"

                              optionLabelProp="label"
                            >
                            {
                              Trend.map((c)=>(
                              <Option value={c}
                              onClick={()=>{this.allocateTrend(c)}}
                              label={c}>
                            <div className="demo-option-label-item">
                              <span role="img" aria-label>
                                
                              </span>
                              {c}
                            </div>
                              </Option>
                                ))
                              }
                            </Select>
                      </Form.Item>

                          

                         <Form.Item 
                        name="Description">
                            <TextArea 
                            placeholder = 'Your Description ?'
                            rules={[{ required: true }]}
                            rows={4} />
                        </Form.Item>
                            


                          <div className="clearfix">
                            <Upload
                             
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.ProcessImages}
                            >
                              {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal
                              visible={previewVisible}
                              title={previewTitle}
                              footer={null}
                              onCancel={this.handleCancel}
                            >
                              <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                          </div>
                          

                          <Form.Item >
                          <button
                            class="login-button"
                          htmlType="submit">
                            Create
                          </button>
                        </Form.Item>

                       </Form>
                    


                        </div>

                        </div>
                   
                        
                        </div> 

                    </div>
                

            </>
        )
    }
}


const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
    };
  };
  
  export default connect(
    mapStateToProps,
    null,
  )(NewCampaign)