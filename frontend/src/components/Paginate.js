/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ totalProduct, result, searchKey, category }) => {
  const page = Math.ceil(totalProduct / result);

  return (
    page > 1 && (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {[...Array(page).keys()].map((x) => {
            return (
              <li className="page-item" key={x + 1}>
                <Link
                  className="page-link active"
                  to={
                    category
                      ? `category/${category}/page/${x + 1}`
                      : searchKey
                      ? `/search/${searchKey}/page/${x + 1}`
                      : `/page/${x + 1}`
                  }
                >
                  {x + 1}
                </Link>
              </li>
            );
          })}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Paginate;
