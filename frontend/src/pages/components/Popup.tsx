import './Popup.css'

function Popup(props) {

    const onClickExit = () => {
        props.setTrigger(false);
    };

    return (props.trigger) ? (
        <div className="popup-wrapper">
            <div className="popup">
                <button className="yes-btn" onClick={props.onClickYes}>Yes</button>
                <button className="close-btn" onClick={onClickExit}>Exit</button>
                {props.children}
            </div>
        </div>) : "";
}

export default Popup;