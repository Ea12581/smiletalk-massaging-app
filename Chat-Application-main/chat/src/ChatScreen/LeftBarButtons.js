
function LeftBarButtons ({ handleLogOut }) {

    return (
        <div id="icon_menu">
            <img id="chat_icon" className="icon" src="icons/chat_icon.png"></img>
            <img className="icon" src="icons/phone_icon.png"></img>
            <img className="icon" src="icons/bell_icon.png"></img>
            <img className="icon" src="icons/settings_icon.png"></img>
            <img id="logout_icon" src="icons/exit_icon.png" onClick = {handleLogOut}></img>
        </div>
    );
}

export default LeftBarButtons;
