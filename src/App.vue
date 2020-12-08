<template>
    <router-view>
    </router-view>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
  :root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    overflow-x: hidden;
  }
  body{
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    color: #151D65 !important;
    background-color: #f2f5f7 !important;
  }

    /*---------scrollbar-----------*/
  /* Let's get this party started */
  ::-webkit-scrollbar {
    width: 8px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    display: none;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #151d65;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #3d4cbf;
    cursor: pointer;
  }


  .navbar-light .navbar-brand {
    color: #151D65 !important;
  }
  .navbar-light .navbar-nav .nav-link.active{
    color:#151D65 !important
  }
  .btn:hover {
    background-color: #283181 !important;
    text-decoration: none;
  }
  a {
    transition: color 0.3s ease-in-out;
  }
  .bg-info {
    background-color: #f2f5f7 !important;
  }

    .input-group-text {
    color: #151d65;
    background-color: #F6F6F6!important;
    border-color: #F6F6F6!important;
    border-radius: .5rem 0 0 .5rem !important;
  }
  input {
    color: #151d65;
    background-color: #F6F6F6!important;
    border: none !important;
  }
  .form-control {
    border: 1px solid #f6f6f6;
    border-radius: 0 .5rem .5rem 0 !important;
    background-color: #F6F6F6!important;
  }


#page{
  background-color: #F2F5F7 !important;
  padding-left: 10%;
}

.DatMas{
    text-align: center;
    color: #151D65;
    font-size: 100%;
    font-weight: bold;
  }

  .sidebar{
    background-color: #151D65;
    border-radius: 0% 10% 10% 0%;
  }

  .iconForm{
    color: #151D65;
    position: relative;
    top: 30px;
    
  }

  .logout{
    text-align: center;
    color: #151D65;
    font-size: 100%;
    font-weight: bold;
  }

  #listHam{
    position:absolute;
    left: 0px;
    right: 0px;
    padding-bottom: 45%;
    padding-right: 5%;
    border-radius: 0% 10% 10% 0%;
    background-color: #151D65;
  }

  .titleProduct{
    text-align: center;
    font-weight: bold;
    color: #151D65;
    font-size: 30px;
  }

  

  .modDel{
    font-weight:900;
    color:#151D65;
    text-align: center;
  }

  .admin{
    padding-right: 15%;
  }

  #accountTitle{
    color: #151D65;
    font-size: 200%;
    font-weight: bold;
    padding-top: 2%;
  }

  .tabelAcc{
    color: #151D65;
  }

  .iconEdit{
    color: #61AB43;
  }

  .iconDelete{
    color: #D9534F;
  }

  .editForm{
    color: #151D65;
    font-weight: bold;
    font-size: 30px;
    text-align: center;
  }

  .saveBtn{
    color: #151D65;
  }
</style>
