import React, { Component } from 'react'
import { connect } from "react-redux";

    

export default class BkCreation extends Component {

    state = {
        'AllowUser':false,
        loading:true,
        error:null,
    }

    //Verifies Membership
    GrantUser = false
    accountType(){
        const planMode = this.props.membership_type
        if (planMode=='Basic' || planMode == 'Premium'){
            this.setState({
              AllowUser:true
            })
            this.GrantUser= true
        }
      }

    

      ProcessQuery = (values,err) =>{

        const cac_name = values['cac_name']
        const cac_location = values['cac_location']
        const cac_logo = values['cac_logo']

        let formData = new FormData();
        formData.append('item_name', cac_name)
        formData.append('item_price', cac_location)
        formData.append('item_quantity', cac_logo)

         if(!err){
       
             axios.defaults.headers = {
               "Content-Type": "application/json",
               Authorization: `Token ${this.props.token}`
             };
             
             axios.get(postURL, formData)
             .then(res =>{
                 console.log(res.data)
                 const take_response = res.data['Message']
                
                 this.openNotification(take_response)            
             }).catch(e =>{
                 console.log(e)
             })
           }
           
           //process query contents ends here
       }

   
    componentDidMount(){
        if (this.props.token !== undefined && this.props.token !== null){
            this.Contact_List(this.props.token)
        }
        
    }
  

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Contact_List(newProps.token)
          }
        }
      }

  

    render() {
        return (
            <>
                {
                    this.GrantUser ? (
                        <>
                        <div>
                <Form  onFinish={this.ProcessQuery}>
        
                     <Form.Item rules={[{ required: true }]}  name ="cac_name">
                                <Input placeholder="Name" enterButton />
                     </Form.Item>

                     <Form.Item rules={[{ required: true }]}  name ="cac_location">
                                <Input placeholder="Price" enterButton />
                     </Form.Item>

                     <Form.Item rules={[{ required: true }]} name="cac_logo">
                          <input  type="file" name="Logo"/>
                          {/* onChange={this.FileSelected1} */}
                     </Form.Item>

                      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
               </Form>
            </div>
                        </>
                    ) : (
                        <>
                      <TemporaryDrawer/>
                      <div className="container">
                    <div className="grid grid-cols-4">
                        <div className="col-span-4 sm:col-span-4 md:col-span-4 xl:col-span-4 lg:col-span-4">
                                <p>
                        Upgrade to use this feature
                        </p>
                                </div>
                            </div>
                        </div>
                            </>
                    )
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode,
    };
  };
  
  
export default connect(
    mapStateToProps,
    null
  )(CheckoutPage);
  