/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction";
import Loader from "./Loader";
import ProductScreen from "./Screen/ProductScreen";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";

const Hero = () => {
  const { search, category } = useParams();
  const searchKey = search || "";
  const [PageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();
  const { loading, error, products, result, resultPerPage, totalProduct } =
    useSelector((state) => state.productList);
  const pages = Math.ceil(totalProduct / resultPerPage);

  useEffect(() => {
    dispatch(productAction(category, searchKey, PageNum));
  }, [dispatch, searchKey, PageNum, category]);
  return (
    <section className="hero py-5">
      <div className="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <NotFound />
        ) : (
          <>
            <div className="row row-cols-2 row-cols-md-1 row-cols-lg-2 g-4 mb-5">
              {products.map((product) => (
                <ProductScreen product={product} key={product._id} />
              ))}
            </div>

            {!loading && result !== 0 && result >= resultPerPage && (
              <div className=" py-5">
                <div
                  className="btn-group rounded-0"
                  role="group"
                  aria-label="First group"
                >
                  {!isNaN(pages) &&
                    [...Array(pages).keys()].map((page) => {
                      return (
                        <button
                          type="button"
                          className={`btn ${
                            PageNum === page + 1
                              ? "bg-dark text-light"
                              : "btn-outline-secondary"
                          } px-3 p-2 rounded-0 fs-5`}
                          key={page + 1}
                          onClick={() => setPageNum(page + 1)}
                        >
                          {page + 1}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
