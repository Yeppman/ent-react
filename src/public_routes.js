import React from "react";
import { Route } from "react-router";

import All_Uploads from './components/General/Home'
import All_Post from './components/General/Market'
import Enterprise_Showcase from './components/General/Unveil'
import Basic_Query from './components/General/Simple_Query'

import Search_Results from './components/General/Results'

import PostDetail from './components/General/Post_detail'
import Request_Order_url from './components/containers/Make_Order'

import Filter_Post_Form from './components/containers/Filter_Post'
import Vendor_View from './components/General/Vendor_Data'
import Category_Post from './components/General/Categories'
import Category_Links from './components/General/Products_and_Services'

//Sub Categories
import Electronics_Items from './components/General/SubCategories/Electronics/Electronics_list'
import Electronics_Item_Detail from './components/General/SubCategories/Electronics/Electronics_details'

import Fashion_Items from './components/General/SubCategories/Fashion/Fashion_list'
import Fashion_Item_Detail from './components/General/SubCategories/Fashion/Fashion_detail'

import Home_App_Items from './components/General/SubCategories/Home_Appliances/Home_list'
import Home_App_Item_Detail from './components/General/SubCategories/Home_Appliances/Home_details'

import Services_Item from './components/General/SubCategories/Services/Services_list'
import Services_Item_Detail from './components/General/SubCategories/Services/Services_detail'

import Phones_Item from './components/General/SubCategories/Phones/Phones_list'
import Phones_Item_Detail from './components/General/SubCategories/Phones/Phones_detail'

import Property_Items from './components/General/SubCategories/Properties/Property_list'
import Property_Item_Detail from './components/General/SubCategories/Properties/Property_detail'

// User Admninstration
import AdminLayout from './components/Private/AdminLayout'

//Creating Post
import Create_Post_Portal from './components/Private/Create/Portal'
import Electronics_Item_Create from './components/Private/Create/Electronics'
import Property_Item_Create from './components/Private/Create/Property'
import Services_Item_Create from './components/Private/Create/Services'
import HomeApp_Item_Create from './components/Private/Create/HomeApp'
import Vehicles_Item_Create from './components/Private/Create/Vehicles'


import User_Post_Conent from './components/Private/User_Post_Content'
import Load_User_Post from './components/Private/UserPost'

///Every User Uploads 
import User_Posts_Items from './components/Private/Uploads/User_Uploads'
//ends here

import User_Profile from './components/Private/Business_Profile/Profile'
import User_Analysis from './components/Private/Analytics/Analytics'


import Quotes_listing from './components/Private/Quotations/Quotes_List'

//Implementsation 
import Logicstics_Channel from  './components/Private/Logicstics/Logicstics'
import Logicstics_Details from './components/Private/Logicstics/Logicstics_Content'
import Create_New_Order from './components/Private/Logicstics/Create_Order'
import Edit_Order from './components/Private/Logicstics/Edit_Order'
import Profile_Edit from './components/Private/UserAction/Edit_Profile'
import Business_Profile_Edit from './components/Private/Business_Profile/Edit_Business_Profile'

import Inventory_Store from './components/Private/Inventory/Inventories'
import Create_Inventory from './components/Private/Inventory/Create_Item'


import Contact_Field from './components/Private/Broadcast/Contacts'
import Message_Contact from './components/Private/Broadcast/Mail_Contacts'

import Create_Post from './components/Private/UserAction/Create_Post'
import Membership_Select from  './components/Private/UserAction/Select_Memebership'

//Authentication 
import LoginForm from './authentication/Login'
import Registration from './authentication/Register'
import ChangePassword from './authentication/changePassword'
import PasswordReset from './authentication/resetPassword'
import PasswordResetConfirm from './authentication/resetPasswordConfirm'
import resetPasswordDone from './authentication/resetPasswordDone'


const GeneralRouter = () =>(
    <div>

    <Route exact path = "/login/" component = {LoginForm} /> {" "}
    <Route exact path = "/register/" component = {Registration} /> {" "}
    <Route exact path = "/changePassword/" component = {ChangePassword} /> {" "}
    <Route exact path = "/passwordReset/" component = {PasswordReset} /> {" "}
    <Route exact path = "/passwordResetDone/" component = {resetPasswordDone} /> {" "}

    <Route exact path="/" component={All_Uploads} />{" "}
    <Route exact path="/market/" component={All_Post} />{" "}
    <Route exact path="/showcase/" component={Enterprise_Showcase} />{" "}
    
    <Route exact path="/search_query/:Title/" component={Basic_Query} />{" "}

    <Route exact path="/search/:Title/" component={Search_Results} />{" "}
    <Route exact path = "/services_list" component = {Category_Links} /> {" "}

    <Route exact path = "/category/:categoryID/" component = {Category_Post} /> {" "}
    <Route exact path = "/post_detail/:PostDetailID/" component = {PostDetail} /> {" "} 
    
    <Route exact path = "/categories/electronics/" component = {Electronics_Items} /> {" "}
    <Route exact path = "/categories/electronics/:ItemDetailID/" component = {Electronics_Item_Detail} /> {" "}
    
    <Route exact path = "/categories/fashion/" component = {Fashion_Items} /> {" "}
    <Route exact path = "/categories/fashion/:ItemDetailID/" component = {Fashion_Item_Detail} /> {" "}

    <Route exact path = "/categories/home_applicances/" component = {Home_App_Items} /> {" "}
    <Route exact path = "/categories/home_applicances/:ItemDetailID/" component = {Home_App_Item_Detail} /> {" "}

    <Route exact path = "/categories/services/" component = {Services_Item} /> {" "}
    <Route exact path = "/categories/services/:ItemDetailID/" component = {Services_Item_Detail} /> {" "}

    <Route exact path = "/categories/phones/" component = {Phones_Item} /> {" "}
    <Route exact path = "/categories/phones/:ItemDetailID/" component = {Phones_Item_Detail} /> {" "}    
    
    <Route exact path = "/categories/property/" component = {Property_Items} /> {" "}
    <Route exact path = "/categories/property/:ItemDetailID/" component = {Property_Item_Detail} /> {" "}    

    {/*Creatting Portals */}
    <Route exact path = "/create/portal/" component = {Create_Post_Portal} /> {" "}   
    <Route exact path = "/create/portal/electronics/:categoryID/" component = {Electronics_Item_Create} /> {" "} 


    {/*Creatting Portals */}




    <Route exact path = "/make_order/" component = {Request_Order_url} /> {" "} 
     
    <Route exact path = "/filter_post" component = {Filter_Post_Form} /> {" "}
    <Route exact path = "/Vendor_Profile/:VendorID/" component = {Vendor_View} /> {" "}
    
    {/*Dashboard Portals */}
    <Route exact path = "/dashboard/" component = {AdminLayout} />{""}
    <Route exact path = "/profile/" component = {User_Profile} />{""}

    <Route exact path = "/edit_profile/" component = {Profile_Edit} />{""}
    <Route exact path = "/edit_business_profile/" component = {Business_Profile_Edit} />{""}
   
    
    <Route exact path = "/user_uploads/" component = {User_Posts_Items} /> {""}
    <Route exact path = "/user_post/" component = {Load_User_Post} /> {""}
    
    <Route exact path = "/create_item/" component ={Create_Inventory} /> {""}
    <Route exact path = "/user_post_detail/:UserPostDetailID/" component = {User_Post_Conent} />{""}
    
    <Route exact path = "/analysis/" component = {User_Analysis} />{""}

    <Route exact path = "/vendor_quotes/" component = {Quotes_listing} />{""}
    <Route exact path = "/membership_select/" component ={Membership_Select} /> {""}
     {/*Dashboard Portals */}

    <Route exact path = "/logicstics/" component ={Logicstics_Channel} /> {""}
    <Route exact path = "/create_order/" component ={Create_New_Order} /> {""}
    <Route exact path = "/view_order/:OrderID/" component ={Logicstics_Details} /> {""}
    <Route exact path = "/edit_order/:OrderID/" component ={Edit_Order} /> {""}
 
    <Route exact path = "/inventories/" component ={Inventory_Store} /> {""}
    <Route exact path = "/create_inventory/" component ={Create_Inventory} /> {""}

    <Route exact path = "/contacts/" component ={Contact_Field} /> {""}   
    <Route exact path = "/message_contact/:ContactID/" component ={Message_Contact} /> {""}    

    
 
 </div>
)
export default GeneralRouter 