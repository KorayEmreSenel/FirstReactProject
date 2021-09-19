import { Pagination } from "react-bootstrap";

function Pager({ currentPage, x, onClick }) {
  return (
    <div className="pagination justify-content-center">
      <Pagination onClick={onClick}>
        <Pagination.Item id={1}>{"<<"}</Pagination.Item>

        {currentPage > 1 && (
          <Pagination.Item id={currentPage - 1}>{"<- Prev"}</Pagination.Item>
        )}
        {currentPage - 1 > 1 && (
          <Pagination.Item id={currentPage - 1}>
            {currentPage - 2}
          </Pagination.Item>
        )}
        {currentPage > 1 && (
          <Pagination.Item id={currentPage - 1}>
            {currentPage - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{currentPage}</Pagination.Item>
        {currentPage !== x && (
          <Pagination.Item id={currentPage + 1}>
            {currentPage + 1}
          </Pagination.Item>
        )}
        {currentPage + 1 < x && (
          <Pagination.Item id={currentPage + 2}>
            {currentPage + 2}
          </Pagination.Item>
        )}
        {currentPage !== x && (
          <Pagination.Item id={currentPage + 1}>{"Next ->"}</Pagination.Item>
        )}
        <Pagination.Item id={x}>{">>"}</Pagination.Item>
      </Pagination>
    </div>
  );
}
export default Pager;
