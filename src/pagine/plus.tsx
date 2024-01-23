function Plus() {
  return (
    <>
      <div className="jj">
        <form className="row g-3">
          <div className="col-12">
            <label htmlFor="nome" className="form-label">
              Nome del Progetto
            </label>
            <input type="text" className="form-control" id="nomeProgetto" />
          </div>
          <div className="col-12">
            <label htmlFor="descrizione" className="form-label">
              Descrizione
            </label>
            <textarea className="form-control" rows={3} id="descrizione" />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              Categoria
            </label>
            <select id="inputState" className="form-select">
              <option selected>Seleziona</option>
              <option>Categoria A</option>
              <option>Categoria B</option>
              <option>Categoria C</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Plus;
