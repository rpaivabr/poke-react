import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export function List() {
  const navigate = useNavigate();

  function goToDetail(event: MouseEvent, id: number) {
    event.preventDefault();
    navigate(`/detail/${id}`, {replace: true})
  }

  return (
    <>
      <p>list works!</p>
      <Link to="/detail/new">New Pokemon</Link>
      <br />
      <a href="#" onClick={(event) => goToDetail(event, 1)}>Edit Pokemon 1</a>
    </>
  )
}