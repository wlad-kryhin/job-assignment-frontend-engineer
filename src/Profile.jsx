import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile({ name }) {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState(null);
  let filter;
  if (articles) {
    filter = articles.filter(art => art.author.username === username);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/profiles/${username}`)
      .then(response => setUser(response.data.profile))
      .catch(error => alert(error.message));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/articles")
      .then(artical => artical.data.articles)
      .then(data => setArticles(data))
      .catch(error => alert(error.message));
  }, []);
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <a className="nav-link active" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/login">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/register">
                Sign up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/register">
                {name}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {user && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  {user.image ? <img src={user.image} /> : <img src="http://i.imgur.com/Qr71crq.jpg" />}
                  <h4>{user.username}</h4>
                  <p>{user.bio}</p>
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round" />
                    &nbsp; Follow {user.username}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <a className="nav-link active" href="">
                        My Articles
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="">
                        Favorited Articles
                      </a>
                    </li>
                  </ul>
                </div>
                {filter &&
                  filter.map(articles => (
                    <div className="article-preview" key={articles.slug}>
                      <div className="article-meta">
                        <Link to={`/profile/${articles.author.username}`}>
                          {articles.author.image ? (
                            <img src={articles.author.image} />
                          ) : (
                            <img src="http://i.imgur.com/Qr71crq.jpg" />
                          )}
                        </Link>
                        <div className="info">
                          <Link to={`/profile/${articles.author.username}`} className="author">
                            {articles.author.username}
                          </Link>
                          <span className="date">{new Date(articles.createdAt).toDateString()}</span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                          <i className="ion-heart" /> {articles.favoritesCount}
                        </button>
                      </div>
                      <Link to={`/${articles.slug}`} className="preview-link">
                        <h1>{articles.title}</h1>
                        <p>{articles.description}</p>
                        <span>Read more...</span>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}
