import React from 'react';
import {Link} from "react-router-dom";

const UserItem = (props) => {
  const {id, name, surnames} = props.user;

  return (
    <div className='user-inline'>
      <Link to={`/user/${id}`}>{id}</Link>
      {name}
      {surnames}
    </div>
  );
}

export default UserItem;