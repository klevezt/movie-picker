import React from 'react'

const Pagination = ({ current, onClickNext }) => {
    return (
        <nav className="mt-5" aria-label="Page navigation ">
            <ul className="pagination justify-content-center">
                {/* <li className="page-item disabled">
                  <a className="page-link" tabindex="-1" aria-disabled="true">Previous</a>
              </li> */}
                {/* <li className="page-item"><a className="page-link">1</a></li> */}
                {/* <li className="page-item"><a className="page-link">2</a></li> */}
                {/* <li className="page-item"><a className="page-link">3</a></li> */}
                <li className="page-item">
                    <button className="page-link" onClick={() => onClickNext(current + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination