import React from "react";
import { Route } from "react-router";

import LandingPage from "./demos/LandingPage.js";
import HomePage from './excite_components/General/main'

//Buyers Access
import All_Uploads from './excite_components/General/Home'
import All_Post from './excite_components/General/Market'
import Enterprise_Showcase from './excite_components/General/Unveil'
import Basic_Query from './excite_components/General/Simple_Query'

import Search_Results from './excite_components/General/Results'

import PostDetail from './excite_components/General/Post_detail'
import Request_Order_url from './excite_components/containers/Make_Order'

import Filter_Post_Form from './excite_components/containers/Filter_Post'
import Vendor_View from './excite_components/General/Vendor_Data'
import Category_Post from './excite_components/General/Categories'
import Category_Links from './excite_components/General/Products_and_Services'

//Ecommerce 
import CartList from './excite_components/General/Ecommerce/CartItems'



//Sub Categories
import Electronics_Items from './excite_components/General/SubCategories/Electronics/Electronics_list'
import Electronics_Item_Detail from './excite_components/General/SubCategories/Electronics/Electronics_details'

import Fashion_Items from './excite_components/General/SubCategories/Fashion/Fashion_list'
import Fashion_Item_Detail from './excite_components/General/SubCategories/Fashion/Fashion_detail'

import Home_App_Items from './excite_components/General/SubCategories/Home_Appliances/Home_list'
import Home_App_Item_Detail from './excite_components/General/SubCategories/Home_Appliances/Home_details'

import Services_Item from './excite_components/General/SubCategories/Services/Services_list'
import Services_Item_Detail from './excite_components/General/SubCategories/Services/Services_detail'

import Phones_Item from './excite_components/General/SubCategories/Phones/Phones_list'
import Phones_Item_Detail from './excite_components/General/SubCategories/Phones/Phones_detail'

import Property_Items from './excite_components/General/SubCategories/Properties/Property_list'
import Property_Item_Detail from './excite_components/General/SubCategories/Properties/Property_detail'

import Vehicle_Items from './excite_components/General/SubCategories/Vehicles/Vehicles_list'
import Vehicles_Item_Detail from './excite_components/General/SubCategories/Vehicles/Vehicles_detail'

// User Admninstration
import AdminLayout from './excite_components/Private/AdminLayout'

//Creating Post for vendors
import Create_Post_Portal from './excite_components/Private/Create/Portal'
import Electronics_Item_Create from './excite_components/Private/Create/Electronics'
import Property_Item_Create from './excite_components/Private/Create/Property'
import Services_Item_Create from './excite_components/Private/Create/Services'
import HomeApp_Item_Create from './excite_components/Private/Create/HomeApp'
import Vehicles_Item_Create from './excite_components/Private/Create/Vehicles'
import Fashion_Item_Create from './excite_components/Private/Create/Fashion'
import Phone_Item_Create from './excite_components/Private/Create/Phones'

import User_Post_Conent from './excite_components/Private/User_Post_Content'
import Load_User_Post from './excite_components/Private/UserPost'

///Every User Uploads 
import User_Posts_Items from './excite_components/Private/Uploads/User_Uploads'
//ends here

import User_Profile from './excite_components/Private/Business_Profile/Profile'
import User_Analysis from './excite_components/Private/Analytics/Analytics'

//Qoutes
import Quotes_listing from './excite_components/Private/Quotations/Quotes_List'

//Implementsation 
import Logicstics_Channel from  './excite_components/Private/Logicstics/Logicstics'
import Logicstics_Details from './excite_components/Private/Logicstics/Logicstics_Content'
import Create_New_Order from './excite_components/Private/Logicstics/Create_Order'
import Edit_Order from './excite_components/Private/Logicstics/Edit_Order'
import Profile_Edit from './excite_components/Private/UserAction/Edit_Profile'
import Business_Profile_Edit from './excite_components/Private/Business_Profile/Edit_Business_Profile'

//Inventory
import Inventory_Store from './excite_components/Private/Inventory/Inventories'
import Create_Inventory from './excite_components/Private/Inventory/Create_Item'

//Email Marketing
import Contact_Field from './excite_components/Private/Broadcast/Contacts'
import newContact from './excite_components/Private/Broadcast/createContact'
import MalingParty from './excite_components/Private/Broadcast/Mailing'

//Create Post
import Create_Post from './excite_components/Private/UserAction/Create_Post'

//Selects Membership
import Membership_Select from  './excite_components/Private/UserAction/Select_Memebership'

// Book Keeping
import BookKeepingList from './excite_components/Private/Book_Keeping/Book_Keeping_Store'
import New_Book from './excite_components/Private/Book_Keeping/Create_Book'


//BUYER FUNCTIONS LIES HERE
import buyerProfile from './excite_components/Buyers/Profile_Settings'
import buyerOrders from './excite_components/Buyers/Customer_Orders'
import Buyer_Orders from './excite_components/Buyers/Customer_Orders_Details'
//BUYER FUNCTIONS ENDS  HERE

//Excite Admin Control
import AdminDashboard from './excite_components/ExciteAdmin/dashboard'
import Admin_Logicstics_Channel from './excite_components/ExciteAdmin/Logicstics/Logicstics'
import Admin_Logicstics_Details from './excite_components/ExciteAdmin/Logicstics/Logicstics_Content'

import userListView from './excite_components/ExciteAdmin/UserManagement/userList'
import adminCampaigns from './excite_components/ExciteAdmin/Influencer/CampaignList'
import adminCampaignDetail from './excite_components/ExciteAdmin/Influencer/CampaignDetailView'
import ProcessVendor from './excite_components/ExciteAdmin/vendorControl/vendorDetails'

//Influencer Marketing
import InflunencerMarketingPortal from './excite_components/Private/InfluencerMarketing/Portal'
import NewCampaign from './excite_components/Private/InfluencerMarketing/CreateCampaign'
import vendorCampaign from './excite_components/Private/InfluencerMarketing/Campaigns'
import vendorCampaignDetail from './excite_components/Private/InfluencerMarketing/CampaignDetails'
import NewTrend from './excite_components/Private/InfluencerMarketing/CreateTrend'

//Authentication 
import LoginForm from './authentication/Login'
import Registration from './authentication/Register'
import ChangePassword from './authentication/changePassword'
import PasswordReset from './authentication/resetPassword'
import PasswordResetConfirm from './authentication/resetPasswordConfirm'
import resetPasswordDone from './authentication/resetPasswordDone'




const PageRouter= () => (
    <div>
        
        <Route exact path="/" component={HomePage} />{" "}

        <Route exact path = "/login/" component = {LoginForm} /> {" "}
    <Route exact path = "/register/" component = {Registration} /> {" "}
    <Route exact path = "/changePassword/" component = {ChangePassword} /> {" "}
    <Route exact path = "/passwordReset/" component = {PasswordReset} /> {" "}
    <Route exact path = "/passwordResetDone/" component = {resetPasswordDone} /> {" "}

     {/*Admin  Portals */}
    <Route exact path = "/Admin/" component = {AdminDashboard} /> {" "}
    
    <Route exact path = "/admin/user-management/" component = {userListView} /> {" "}
    <Route exact path = "/admin_logistics/" component = {Admin_Logicstics_Channel} /> {" "}


    <Route exact path = "/logistics_order/:OrderID/" component ={Admin_Logicstics_Details} /> {""}

    <Route exact path = "/admin/campaigns/" component ={adminCampaigns} /> {""} 
    <Route exact path = "/admin-campaign-detail/:campaignID/" component ={adminCampaignDetail} /> {""}  
    
    <Route exact path = "/review-vendor/:vendorProfileID/" component ={ProcessVendor} /> {""}  
     {/*Admin  Portals */}

     {/*Buyer Accounts and Dashboard Starts here */}
    <Route exact path = "/profile/user/" component ={buyerProfile} /> {""}  
    <Route exact path = "/my_orders/" component ={buyerOrders} /> {""}      
    <Route exact path = "/orders_details/:OrderID/" component ={Buyer_Orders} /> {""} 

    <Route exact path = "/cart/" component ={CartList} /> {""} 

    {/*Buyer Dashboard ends here */}

    {/*MarketPlace here */}
    <Route exact path="/upload" component={All_Uploads} />{" "}
    <Route exact path="/market/" component={All_Post} />{" "}
    <Route exact path="/showcase/" component={HomePage} />{" "}
    
    <Route exact path="/search_query/:Title/" component={Basic_Query} />{" "}

    <Route exact path="/search/:Title/" component={Search_Results} />{" "}
    <Route exact path = "/services_list" component = {Category_Links} /> {" "}
    {/*MarketPlace ends here */}

     {/*Categories Ends here  */}
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

    
    <Route exact path = "/categories/vehicles/" component = {Vehicle_Items} /> {" "}
    <Route exact path = "/categories/vehicles/:ItemDetailID/" component = {Vehicles_Item_Detail} /> {" "} 
    {/*Categories Ends here  */}


    {/*Creating  Item Portals By Vendors */}
    <Route exact path = "/create/portal/" component = {Create_Post_Portal} /> {" "}   
    <Route exact path = "/create/portal/electronics/:categoryID/" component = {Electronics_Item_Create} /> {" "} 
    <Route exact path = "/create/portal/fashion/:categoryID/" component = {Fashion_Item_Create} /> {" "} 
    <Route exact path = "/create/portal/services/:categoryID/" component = {Services_Item_Create} /> {" "}
    <Route exact path = "/create/portal/property/:categoryID/" component = {Property_Item_Create} /> {" "}  
    <Route exact path = "/create/portal/home_applicances/:categoryID/" component = {HomeApp_Item_Create} /> {" "} 
    <Route exact path = "/create/portal/vehicles/:categoryID/" component = {Vehicles_Item_Create} /> {" "} 
    <Route exact path = "/create/portal/phones/:categoryID/" component = {Phone_Item_Create} /> {" "} 


    {/*Creating Portals ends here */}

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

     {/*Book Keeping starts here */}
    <Route exact path = "/book_keeping/" component ={BookKeepingList} /> {""}
    <Route exact path = "/create_new_record/" component ={New_Book} /> {""}
     {/*BK ends here */}
     
     {/*Dashboard ends here */}

    {/*logistic here */}
    <Route exact path = "/logicstics/" component ={Logicstics_Channel} /> {""}
    <Route exact path = "/create_order/" component ={Create_New_Order} /> {""}
    <Route exact path = "/view_order/:OrderID/" component ={Logicstics_Details} /> {""}
    <Route exact path = "/edit_order/:OrderID/" component ={Edit_Order} /> {""}
    {/*logistics ends here */}

    {/*IMS  here */}
    <Route exact path = "/inventories/" component ={Inventory_Store} /> {""}
    <Route exact path = "/create_inventory/" component ={Create_Inventory} /> {""}
    {/*IMS stops here */}

    {/*Email Marketin ends here */}
    <Route exact path = "/contacts/" component ={Contact_Field} /> {""}   
    
    <Route exact path = "/mailing/" component ={MalingParty} /> {""}  
    <Route exact path = "/store_client/" component ={newContact} /> {""}    
    {/*Email Marketing ends here */}
    
     {/*Influencer Marketing starts here */}
     <Route exact path = "/influencer-marketing/portal" component ={InflunencerMarketingPortal} /> {""}   
    <Route exact path = "/create-campaign/" component ={NewCampaign} /> {""}  
    <Route exact path = "/create-trend/" component ={NewTrend} /> {""} 
    <Route exact path = "/campaign-list/" component ={vendorCampaign} /> {""}  
    <Route exact path = "/campaign-detail/:campaignID/" component ={vendorCampaignDetail} /> {""}  
    
      
    {/*Influencer Marketing ends here */}

    </div>
)

export default PageRouter