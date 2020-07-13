import React from 'react'

export default function Sidebar() {

    const sideDrop = () =>{
        /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
        var dropdown = document.getElementsByClassName("dropdown-btn");
        var i;

        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            }
            else {
                dropdownContent.style.display = "block";
            }
                });
        }

    }

    return (
        <>
        <div class="sidenav">
                <div class="sidenav-header">
                    <img src="https://www.w3schools.com/howto/img_avatar.png"  style={{width:'80px', borderRadius: '50%'}} />
                    <p><h3>John Doe</h3></p>
                    <p>Johndoe@gmail.com</p>
                    <span><button className="profile-button">Edit Profile</button></span>
                </div>
            <a href="#about" className="link-active">Dashboard</a>
            <a href="#about">Profile</a>
            <a href="#services">Analysis</a>
            <a href="#clients">Products</a>
            <a href="#contact">Influencer Marketing</a>
            <a href="#contact">Book Keeping</a>
            <a href="#contact">Inventory</a>
            {/* <button class="dropdown-btn" onClick={() => {sideDrop()}}>
                Dropdown wwkwk
            </button>
            <div class="dropdown-container">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div> */}
        </div>
        </>
    )
}
 