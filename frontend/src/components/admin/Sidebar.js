import React from 'react';

const Sidebar = ({handleDashboard, state}) => {
    return (
        <nav style={{display:"block"}} id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">

                  <li className="nav-item">
                    <a href ="#" className={state.adminHome == true ? "nav-link active" : "nav-link"} onClick={()=>handleDashboard("ADMIN-HOME")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                           className="bi bi-house-door" viewBox="0 0 24 24">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                      </svg>
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href ="#"  className={state.doctor == true ? "nav-link active" : "nav-link"} onClick={()=>handleDashboard("DOCTOR")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                           className="bi bi-person-hearts" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                              d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566ZM9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"/>
                      </svg>
                      Doctor
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href ="#"  className={state.staff == true ? "nav-link active" : "nav-link"} onClick={()=>handleDashboard("STAFF")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                           className="bi bi-person-gear" viewBox="0 0 24 24">
                        <path
                            d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
                      </svg>
                      Staff
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href ="#"  className={state.patch == true ? "nav-link active" : "nav-link"} onClick={()=>handleDashboard("PATCH")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                           className="bi bi-building-gear" viewBox="0 0 24 24">
                        <path
                            d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z"/>
                        <path
                            d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm4.386 1.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
                      </svg>
                      Developer
                    </a>
                  </li>

                </ul>

                {/*<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">*/}
                {/*    <span>Print reports</span>*/}
                {/*</h6>*/}
                {/*<ul className="nav flex-column mb-2">*/}
                {/*    <li className="nav-item">*/}
                {/*        <a className="nav-link" href="#">*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"*/}
                {/*                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"*/}
                {/*                 stroke-linejoin="round" className="feather feather-file-text">*/}
                {/*                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>*/}
                {/*                <polyline points="14 2 14 8 20 8"></polyline>*/}
                {/*                <line x1="16" y1="13" x2="8" y2="13"></line>*/}
                {/*                <line x1="16" y1="17" x2="8" y2="17"></line>*/}
                {/*                <polyline points="10 9 9 9 8 9"></polyline>*/}
                {/*            </svg>*/}
                {/*            Year-end sale*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </div>
        </nav>

    );
}

export default Sidebar;
// <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280, height: "100vh"}}>
//     <hr/>
//     <ul className="nav nav-pills flex-column mb-auto">
//         <li className="nav-item">
//
//         </li>
//         <li>
//             <button  className="nav-link text-white">
//                 Doctor
//             </button>
//         </li>
//         <li>
//             <button onClick={()=>handleDashboard("STAFF")} className="nav-link text-white">
//                 Staff
//             </button>
//         </li>
//         <li>
//             <button onClick={()=>handleDashboard("PATIENT")} className="nav-link text-white">
//                 Patient
//             </button>
//         </li>
//         <li>
//             <button onClick={()=>handleDashboard("PATCH")} className="nav-link text-white">
//                 Developers
//             </button>
//         </li>
//         <li>
//             <a href="#" className="nav-link text-white">
//                 Patients
//             </a>
//         </li>
//         <li>
//             <a href="#" className="nav-link text-white">
//                 Bills & receipts
//             </a>
//         </li>
//     </ul>
{/*    <hr/>*/}
{/*</div>*/}