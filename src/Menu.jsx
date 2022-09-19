/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Hamburger from "./assets/Hamburger.svg";
function Menu() {
  const [menuBarItems, setMenubarItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburgerMenu() {
    setHamburgerOpen(!isHamburgerOpen);
  }
  async function getAndSetMenuBarItems() {
    try {
      setLoading(true);
      const { data } = await axios.get("../menu.json");
      setMenubarItems(data);

      console.log(data);
    } catch (err) {
      console.log({ err });
      alert("Failed to fetch menu bar items..");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAndSetMenuBarItems();
  }, []);

  if (!menuBarItems || loading) {
    return <div>Fetching Items from API.</div>;
  }

  return (
    <div>
      <img src={Hamburger} onClick={toggleHamburgerMenu} />
      {isHamburgerOpen &&
        menuBarItems.map((item) => (
          <MenuBarItem
            active={item.active}
            title={item.title}
            icon={item.icon}
          />
        ))}
    </div>
  );
}

export default Menu;

function MenuBarItem({ active, title, icon }) {
  const imgSrc = require(`${icon}`);
  return (
    <div style={{ background: active ? "pink" : "white" }}>
      <img src={imgSrc} style={{ width: 50, height: 50 }} />
      <p>{title}</p>
    </div>
  );
}
