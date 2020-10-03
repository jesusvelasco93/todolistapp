import React from 'react';
import ListPageComponent from '../listPage/listpage.component';
import NavbarComponent from '../navbar/navbar.component';

function AppComponent() {
  return (
    <div>
      {/* Menú */}
      <NavbarComponent/>
      {/* Page */}
      <ListPageComponent/>
    </div>
  );
}

export default AppComponent;
