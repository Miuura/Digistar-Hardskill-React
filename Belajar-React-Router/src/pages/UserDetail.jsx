import { useParams } from 'react-router-dom';
import { usersData } from '../data/UserData';
import { Link } from 'react-router-dom';

const UserDetail = () => {
  const { userId } = useParams();
  const user = usersData.find((user) => user.id === parseInt(userId));
  
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <br /><hr />
      <h2>User Detail</h2>
      <hr />
      <h3>{user.name}</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <hr />
      <h5>Address</h5>
      <p>
        {user.address.street}, {user.address.suite}
      </p>
      <p>
        {user.address.city}, {user.address.zipcode}
      </p>
      <hr />
      <h5>Company</h5>
      <p>{user.company.name}</p>
      <p>{user.company.catchPhrase}</p>
      <p>{user.company.bs}</p>
      <hr /> <br />
      <button type="button" className="btn btn-light">
        <Link to="/user">
            Back
        </Link>
      </button>
    </div>
  );
};

export default UserDetail;
