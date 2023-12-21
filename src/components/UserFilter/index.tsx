import React from 'react';
import s from './index.module.sass'

interface UserFilterProps {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const UserFilter = ({ filter, setFilter }: UserFilterProps) => (
  <div>
    <input
      type="text"
      placeholder={'Filter:'}
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className={s.filter}
    />
  </div>
);

export default UserFilter