import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const renderMenu = (items) => {
    return (
        <DropdownMenu>
          {
              items.map((item, index) => (
                  <DropdownItem key={index} {...item.handlers}>{item.text}</DropdownItem>
              ))
          }
        </DropdownMenu>
    )
}

const PortButtonDropdown = (props) => {
    const {items} = props;
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    return (
        <ButtonDropdown className="port-dropdown" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret size="sm"/>
            {renderMenu(items)}
        </ButtonDropdown>
    );
}

export default PortButtonDropdown;