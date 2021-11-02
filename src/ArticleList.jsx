import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ArticleList({ name }) {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/articles")
      .then(articl => articl.data.articles)
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

      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {articles &&
                articles.map(article => {
                  return (
                    <>
                      <div className="article-preview" key={article.slug}>
                        <div className="article-meta">
                          <Link to={`/profile/${article.author.username}`}>
                            {article.author.image ? (
                              <img src={article.author.image} />
                            ) : (
                              <img src="http://i.imgur.com/Qr71crq.jpg" />
                            )}
                          </Link>
                          <div className="info">
                            <Link to={`/profile/${article.author.username}`} className="author">
                              {article.author.username}
                            </Link>
                            <span className="date">{new Date(article.createdAt).toDateString()}</span>
                          </div>
                          <button className="btn btn-outline-primary btn-sm pull-xs-right">
                            <i className="ion-heart" /> {article.favoritesCount}
                          </button>
                        </div>
                        <Link to={`/${article.slug}`} className="preview-link">
                          <h1>{article.title}</h1>
                          <p>{article.description}</p>
                          <span>Read more...</span>
                        </Link>
                      </div>
                    </>
                  );
                })}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
