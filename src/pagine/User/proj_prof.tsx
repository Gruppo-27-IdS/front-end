import { root } from "../../main";

interface DettProfInt {
  list: proj[];
  comp: JSX.Element;
}

interface proj {
  _id: string;
  name: string;
  description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  opensource: boolean;
}

const Proj_prof: React.FC<DettProfInt> = ({ list, comp }) => {
  return (
    <>
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => root.render(comp)}
      ></button>
      <div
        className="row row-cols-1 row-cols-md-2 g-4 jj"
        style={{ paddingTop: 5 }}
      >
        {list.map((item) => (
          <>
            <div className="col" key={item._id}>
              <div
                className="card mb-3 h-100"
                //onClick={() => expand_proj(item, <My_proj />)}
              >
                {/*}
                  <img
                    src={item.g_proj.length > 0 ? item.g_proj[0] : ""}
                    className="card-img-top"
                    alt=""
                  />*/}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: 25 }}>
                    {item.name}
                  </h5>
                  <p className="news-text" style={{ fontSize: 20 }}>
                    {item.description}
                  </p>
                  <p className="news-text">
                    <small
                      className="text-body-secondary"
                      style={{ fontSize: 15 }}
                    >
                      {item.category}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default Proj_prof;
