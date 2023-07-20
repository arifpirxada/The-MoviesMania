const Modal = (props) => {
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div style={props.darkStyle} className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Filters</h1>
                            <button style={{backgroundColor: "#fff"}} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <button className="filter-button filter-btns m-2" ref={props.rated} onClick={() => {props.filterFunc("Top Rated")}} data-bs-dismiss="modal">Top Rated</button>
                        <button className="filter-button filter-btns m-2" ref={props.popular} onClick={() => {props.filterFunc("Popular")}} data-bs-dismiss="modal">Popular</button>
                        <button className="filter-button filter-btns m-2" ref={props.upcoming} onClick={() => {props.filterFunc("Upcoming")}} data-bs-dismiss="modal">Upcoming</button>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Apply</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;