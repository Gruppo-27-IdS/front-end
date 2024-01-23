function Message() {
  let l = ["chat1", "chat2", "chat3", "chat4", "chat5", "chat6"];

  return (
    <>
      <div className="list-group jj">
        {l.map((item) => (
          <button
            type="button"
            className="list-group-item list-group-item-action "
            aria-current="true"
            style={{ fontSize: 20 }}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
export default Message;
