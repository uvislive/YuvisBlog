import "./Postcomponent.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import ReactPaginate from "react-paginate";

function PostComponent({ category }) {
  const [article, setArticle] = useState([]);

  const [pageNo, setPageNo] = useState(0);

  const userPerPage = 6;
  const pageVisited = pageNo * userPerPage;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:9000/allpost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      console.log(response.data.posts);
      setArticle(response.data.posts);
    };
    fetchData();
  });

  // pagination logic here
  const displayPost = article
    .slice(pageVisited, pageVisited + userPerPage)
    .map((value) => {
      return (
        <>
        <div className="col-md-4">
          <PostItem
            key={value._id}
            urlToImage={value.photo}
            title={value.title}
            description={value.body}
          />
          </div>
        </>
      );
    });

  const pageCount = Math.ceil(article.length / userPerPage);
  function changePage({ selected }) {
    setPageNo(selected);
  }

  return (
    <div className="yuvi">
      {/* <h1 className="text-center"> Top Blog </h1> */}
      <div className="container ">
        <div className="row">
          {/* {article.map((value) => {
            return (
              <div className="col-md-4">
                <PostItem
                  key={value._id}
                  urlToImage={value.photo}
                  title={value.title}
                  description={value.body}
                />
                {displayPost}
              </div>
            );
          })} */}
    
     {displayPost}

<div className="pagination">

     <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
     pageCount={pageCount}
     onPageChange={changePage}
     containerClassName={"pagebtns"}
     previousLinkClassName={"previousBttns"}
     nextLinkClassName={"nextBttns"}
     disabledClassName={"disAble"}
     activeClassName={"paginationActive"}

      />


</div>


        </div>
      </div>
    </div>
  );
}

export default PostComponent;
