function Notif() {
  let l = [1, 2, 3, 4, 5, 6, 6, 7, 8, 5, 4, 3, 5, 6, 5, 3, 6];

  return (
    <>
      <div className="list-group jj">
        {l.map((item) => (
          <button
            type="button"
            className="list-group-item list-group-item-action "
            aria-current="true"
            style={{ fontSize: 18 }}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
export default Notif;
