import React, { useState } from 'react';
import {
  Switch, Route, Link, useRouteMatch, useHistory,
} from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>Anecdotes</Link>
      <Link to="/create" style={padding}>Create new</Link>
      <Link to="/about" style={padding}>About</Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
    <p>{`has ${anecdote.votes} votes`}</p>
    <p>
      {'For more info, see '}
      <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    <hr />
    {'Anecdote app for '}
    <a href="https://courses.helsinki.fi/fi/tkt21009">Full Stack -websovelluskehitys</a>
    {'. See '}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a>
    {' for the source code.'}
  </div>
);

const Notification = (props) => {
  const { notification } = props;

  let style = {
    border: 'solid',
    margin: '0.5rem',
    padding: 10,
    borderWidth: 2,
    borderRadius: '0.25rem',
  };

  if (notification === '') {
    style = { ...style, display: 'none' };
  }

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

const CreateNew = (props) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
    history.push('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');
  const [notificationTimeout, setNotificationTimeout] = useState(null);

  // Every time the component is rendered, the match will be made.
  const match = useRouteMatch('/anecdotes/:id');
  const singleAnecdote = match ? anecdotes.find((anec) => anec.id === match.params.id) : null;

  const setAppNotification = (notif, duration = 5000) => {
    setNotification(notif);
    const timeoutId = setTimeout(() => {
      setNotification('');
    }, duration);
    clearTimeout(notificationTimeout);
    setNotificationTimeout(timeoutId);
  };

  const addNew = (anecdote) => {
    const newAnecdote = { ...anecdote, id: (Math.random() * 10000).toFixed(0) };
    setAnecdotes(anecdotes.concat(newAnecdote));
    setAppNotification(`Created a new anecdote: "${newAnecdote.content}"`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Menu />

      <Switch>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={singleAnecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
