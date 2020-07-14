import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
 


const post_list_url = 'https://backend-entr.herokuapp.com/core_api/post_list/'
class  Gallery extends React.Component{
  handleOnDragStart = (e) => e.preventDefault()

  Latest_Uploads = async() =>{
    const get_data = await fetch(post_list_url)
    const processed_data =  await get_data.json()
    console.log(processed_data)
    this.setState({
      'latest_posts' : processed_data.slice(0,4) ,
    'error' : null ,
    'loading': false ,
    })
  
  }
  
  state = {
    'posts' : [] ,
    latest_posts : [] ,
    'error' : null ,
    'loading': true ,
    results: [],
    categories : [],
    skelenton  : true,
  } 
 
    render(){
      return(
        <AliceCarousel mouseTrackingEnabled>
      <img src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" onDragStart={this.handleOnDragStart} className="yours-custom-class" />
      <img src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" onDragStart={this.handleOnDragStart} className="yours-custom-class" />
      <img src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" onDragStart={this.handleOnDragStart} className="yours-custom-class" />
      <img src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" onDragStart={this.handleOnDragStart} className="yours-custom-class" />
      <img src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" onDragStart={this.handleOnDragStart} className="yours-custom-class" />
    </AliceCarousel>
      )
    }

}

export default Gallery