import React from 'react';
import './sideBarComponent.scss'
function sideBarComponent (props){
    
    function handleClick(name) {
        props.menuChangeHandler(name); // pass any argument to the callback
      }

       let listItem = MenuList.map((menu)=> <li className={(props.activateMenu === menu.value)?'active':''} onClick={()=>handleClick(menu.value)} key={menu.id}><a href={menu.link}>{menu.name}</a></li>)
       return (
                <ul className="main-menu">
                    {listItem}
                </ul>
        )
}

export default sideBarComponent;
const MenuList = [
    { id:1,'name':'Today' ,value:'today'},
    { id:2,'name':'Planned',value:'planned'},
    { id:3,'name':'Important',value:'important'},
    { id:4,'name':'All',value:'all'},
];
