import React, { useRef, useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { BiCloudDownload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const TopBar = () => {
  const dispatch = useDispatch();
  const headerTitle = useSelector((state) => state.headerTitle);
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth + 50);
  }, [headerTitle]);

  return (
    <div className="w-full h-full flex justify-between">
      <div
        id="left-side"
        className="flex justify-around items-center h-full w-[50%] z-[1000]"
      >
        <div id="logo-container" className="h-9 w-9">
          <img
            className="rounded-lg shadow-md"
            src="viz-logo.png"
            alt="Viz Logo"
            draggable={false}
          />
        </div>
        <div
          id="header-option-bar-container "
          className="h-full w-[90%] flex flex-col justify-center"
        >
          <div>
            <div id="header-container" className="text-base">
              <p>
                <span
                  className="absolute opacity-0 z-[-100] whitespace-pre"
                  ref={span}
                >
                  {headerTitle}
                </span>
                <input
                  type="text"
                  className="box-border min-w-[50px] p-0 font-bold"
                  style={{ width }}
                  value={headerTitle}
                  onChange={(e) => {
                    dispatch({ type: "SET_Header", payload: e.target.value });
                  }}
                />
              </p>
            </div>
            <div id="menu" className="flex items-center gap-3">
              <Menu className="text-sm">
                <MenuButton className="text-sm">File</MenuButton>
                <MenuList className="flex flex-col text-xs">
                  <MenuItem command="⌘N">New File</MenuItem>
                  <MenuItem command="⌘O">Open</MenuItem>
                  <MenuItem command="⌘S">Save</MenuItem>
                  <MenuItem command="⌘⇧E">Export</MenuItem>
                </MenuList>
              </Menu>
              <Menu className="text-sm">
                <MenuButton className="text-sm">Edit</MenuButton>
                <MenuList className="flex flex-col text-xs">
                  <MenuItem command="⌘A">Select All</MenuItem>
                  <MenuItem command="⌘X">Cut</MenuItem>
                  <MenuItem command="⌘C">Copy</MenuItem>
                  <MenuItem command="⌘P">Paste</MenuItem>
                  <MenuItem command="⌘U">Undo</MenuItem>
                  <MenuItem command="⌘Y">Redo</MenuItem>
                  <MenuItem>Background Color</MenuItem>
                </MenuList>
              </Menu>
              <Menu className="text-sm">
                <MenuButton className="text-sm">Insert</MenuButton>
                <MenuList className="flex flex-col text-xs">
                  <MenuItem>Viz diagram</MenuItem>
                  <MenuItem>Image</MenuItem>
                  <MenuItem>Video</MenuItem>
                  <MenuItem>Youtube</MenuItem>
                </MenuList>
              </Menu>
              <Menu className="text-sm">
                <MenuButton className="text-sm">Tool</MenuButton>
                <MenuList className="flex flex-col text-xs">
                  <MenuItem>Align Left</MenuItem>
                  <MenuItem>Alight Right</MenuItem>
                  <MenuItem>Alight Top</MenuItem>
                  <MenuItem>Alight Bottom</MenuItem>
                  <MenuItem command="⌘L">Lock</MenuItem>
                  <MenuItem command="⌘B">Bold</MenuItem>
                  <MenuItem command="⌘I">Italic</MenuItem>
                  <MenuItem command="⌘U">Underline</MenuItem>
                </MenuList>
              </Menu>
              <Menu className="text-sm">
                <MenuButton className="text-sm">Help</MenuButton>
                <MenuList className="flex flex-col text-xs">
                  <MenuItem>Usage</MenuItem>
                  <MenuItem>Key Binding</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div
        id="right-side"
        className="h-full flex justify-end items-center gap-4 mr-5"
      >
        <button className="bg-[#333333] hover:bg-[#555555] text-white font-bold text-sm px-4 py-2 flex justify-center items-center gap-2 rounded-sm shadow-md">
          <div className="text-xl font-extrabold">
            <BiCloudDownload />
          </div>
          Export
        </button>
        <Avatar className="shadow-md" size="sm" bg="orange.600" />
      </div>
    </div>
  );
};

export default TopBar;
