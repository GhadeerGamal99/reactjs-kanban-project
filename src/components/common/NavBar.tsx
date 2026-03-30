import SearchBar from "./SearchBar"

const NavBar = () => {
  return (
    <nav className="w-[95%] m-auto border-b">
<div className="flex justify-between w-full my-5">
    <div className="flex">
        <img src="src/assets/image/trelloLogo.png" alt="trello logo" className="h-10 w-10"/>
        <div className="flex flex-col ml-3"> 
            <h2 className="text-text-primary text-[14px]"> KANBAN BOARD</h2>
            <p className="text-text-secondary text-[14px]">tasks 10</p>
        </div>
    </div>
    <SearchBar></SearchBar>
</div>

    </nav>
  )
}

export default NavBar