import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div className="container-not-found">
    <Header />
    <div className="not-found-data">
      <img
        src="https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906728/notfound_okkgyt.png"
        alt="not-found-pic"
        className="not-found-image"
      />

      <h1 className="not-found-title">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>

      <div className="button-container">
        <Link to="/">
          <button type="button" className="home-button">
            Home
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
