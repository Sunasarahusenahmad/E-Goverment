import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useNavigation, useParams } from 'react-router-dom';
import Sidebar from './Component/Sidebar';

function Addpanchayat() {

  const { id, obid } = useParams("")

  const naviget = useNavigate();
  const Toggle = () => {
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function () {
      sidebar.classList.toggle("active");
      if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }



  const [villagename, setvillagename] = useState('');
  const [sarpanchname, setsarpanchname] = useState('');
  const [sarpanchnumber, setsarpanchnumber] = useState('');
  const [panchayataddress, setpanchayataddress] = useState('');
  const [totalpeople, settotalpeople] = useState('');
  const [peopleladies, setpeopleladies] = useState('');
  const [villagecode, setvillagecode] = useState('');
  const [isupdate, setIsupdate] = useState(false);

  const Getdata = async () => {
    const res = await fetch(`/getdata/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await res.json();
    if (!data) {
      window.alert('error in get data')
    }
    else {
      let temp = []
      let maindata = []

      temp = data.panchayat
      temp.filter((e) => {
        if (e._id == obid) {
          maindata = e;
        }
      })
      setIsupdate(true)
      setvillagename(maindata.villagename);
      setsarpanchname(maindata.sarpanchname)
      setsarpanchnumber(maindata.sarpanchnumber)
      setpanchayataddress(maindata.panchayataddress)
      settotalpeople(maindata.totalpeople)
      setvillagecode(maindata.villagecode)
      setpeopleladies(maindata.peopleladies)


    }
  }



  const savedata = async (e) => {
    e.preventDefault();



    const res = await fetch(`/addpanchayat/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        villagename, sarpanchname, sarpanchnumber, panchayataddress, totalpeople, villagecode, peopleladies
      })
    })

    console.log(res);
    const data = await res.json();
    console.log(data);
    if (res.status === 400) {
      window.alert('error is already exist !!!!')
    }
    else {
      window.alert('Member Added')
      naviget(`/panchayat/${id}`, { replace: true })
    }
  }


  const updatestaff = async (e) => {
    e.preventDefault();



    const res = await fetch(`/editpanchayat/${id}/${obid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        villagename, sarpanchname, sarpanchnumber, panchayataddress, totalpeople, villagecode, peopleladies

      })
    })

    console.log(res);
    const data = await res.json();
    console.log(data);
    if (res.status === 400) {
      window.alert('error is already exist !!!!')
    }
    else {
      window.alert('panchayat Updated')
      naviget(`/panchayat/${id}`, { replace: true })
    }
  }


  useEffect(() => {
    if (obid) {
      Getdata()
    }
  }, []);

  return (
    <>
      {/* <div class="sidebar">
        <div class="logo-details">
          <i class='bx bxl-c-plus-plus'></i>
          <span class="logo_name">Vadgam</span>
        </div>
        <ul class="nav-links">
          <li>
            <NavLink to={`/admin/${id}`}>
              <a >
                <i class='bx bx-grid-alt' ></i>
                <span class="links_name">Dashboard</span>
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/staffinfo/${id}`}>
              <a>
                <i class='bx bx-box' ></i>
                <span class="links_name">staffinfo</span>
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/panchayat/${id}`}>
              <a href="#" className='active'>
                <i class='bx bx-list-ul' ></i>
                <span class="links_name">Panchayat</span>
              </a>
            </NavLink>

          </li>
          <li>
            <NavLink to={`/department/${id}`}>
              <a href="#">
                <i class='bx bx-pie-chart-alt-2' ></i>
                <span class="links_name">Department</span>
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/schemes/${id}`}>
              <a href="#">
                <i class='bx bx-coin-stack' ></i>
                <span class="links_name">Schemes</span>
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/notice/${id}`}>
              <a href="#">
                <i class='bx bx-book-alt' ></i>
                <span class="links_name">Notice</span>
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/award/${id}`}>
              <a href="#">
                <i class='bx bx-user' ></i>
                <span class="links_name">Awards</span>
              </a>
            </NavLink>
          </li>





          <li class="log_out">
            <NavLink to={`/adminlogin`} >

              <a href="#">
                <i class='bx bx-log-out'></i>
                <span class="links_name">Log out</span>
              </a>
            </NavLink>
          </li>
        </ul>
      </div> */}
      <Sidebar id={id} cls={'panchayat'}/>
      
      <section class="home-section">
        <nav>
          <div class="sidebar-button">
            <i class='bx bx-menu sidebarBtn' onClick={Toggle}></i>
            <span class="dashboard">Dashboard</span>
          </div>
          <div class="search-box">
            <input type="text" placeholder="Search..." />
            <i class='bx bx-search' ></i>
          </div>
          <div class="profile-details">
            {/* <!--<img src="images/profile.jpg" alt="">--> */}
            <span class="admin_name">Vadgam</span>
            <i class='bx bx-chevron-down' ></i>
          </div>
        </nav>


        <div class="home-content">


          <div class="sales-boxe pb-5">
            <div class="recent-sales box">
              <div style={{ display: "flex", justifyContent: "space-between" }}>

                { isupdate ?  <div class="title">Update Panchayat</div> :<div class="title">Add New Panchayat</div>}

              </div>
              <hr />

              <form action="" >

                <p className='label'>Village Name</p>
                <input type="text" className='inputtag form-control' placeholder="Staff Member Name" value={villagename} onChange={(e) => { setvillagename(e.target.value) }} />
                <p className='label'>Sarpanch Name</p>
                <input type="text" className='inputtag form-control' value={sarpanchname} onChange={(e) => { setsarpanchname(e.target.value) }} placeholder="Sarpanch Name" />

                <p className='label'>Sarpanch Number</p>
                <input type="tel" className='inputtag form-control' value={sarpanchnumber} onChange={(e) => { setsarpanchnumber(e.target.value) }} placeholder="Sarpanch Number" maxLength={10} />

                <p className='label'>Panchayat Address</p>
                <textarea className='inputtag form-control' onChange={(e) => { setpanchayataddress(e.target.value) }} placeholder="Panchayat Address" > </textarea>


                <p className='label'>Village Code</p>
                <input type="number" className='inputtag form-control' value={villagecode} onChange={(e) => { setvillagecode(e.target.value) }} placeholder="Village Code" maxLength={10} />

                <p className='label'>People (Gents)</p>
                <input type="number" className='inputtag form-control' value={totalpeople} onChange={(e) => { settotalpeople(e.target.value) }} placeholder="Total Gents" pattern="[0-9]{10}" maxLength={10} />

                <p className='label'>People (Ladies)</p>
                <input type="number" className='inputtag form-control' value={peopleladies} onChange={(e) => { setpeopleladies(e.target.value) }} placeholder="Total Ladies" pattern="[0-9]{10}" maxLength={10} />





                <div>
                  {isupdate ? <input type="submit" className='btn btn-primary mt-5' value="Update Panchayat" onClick={updatestaff} /> : <input type="submit" className='btn btn-primary mt-5' value="Add New Panchayat" onClick={savedata} />}
                </div>
              </form>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Addpanchayat