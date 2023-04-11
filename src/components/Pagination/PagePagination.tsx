import React, { useState, useEffect } from "react";
import axios from "axios";

import Pagination from "./Pagination";

export default function PagePagination() {
  /* Pagination Start */
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const params = { page, size: 10 };
      const {
        data: { totalPages, data },
      } = await axios.get("https://api.instantwebtools.net/v1/passenger", {
        params,
      });
      setTotalPages(totalPages);
      setItems((prev) => data);
    };
    fetch();
  }, [page]);

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };
  /* Pagination End */
  return (
    <>
      {/* Pagination Start */}
      <div style={{ display: "none", marginTop: "100px" }}>
        <ul>
          {items.map((item: { _id: number; name: string }) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
        <Pagination
          count={totalPages}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
      {/* Pagination End */}
    </>
  );
}
