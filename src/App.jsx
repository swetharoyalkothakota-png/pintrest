import { useState } from 'react'
import './App.css'

const pins = [
  {
    title: 'Dream Home',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Fashion Inspiration',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Delicious Food',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Travel Dreams',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Cute Workspace',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Beautiful Flowers',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Coffee Time',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Creative Ideas',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80'
  },
]

export default function App() {
  const [mode, setMode] = useState('login')
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState([])
  const [userName, setUserName] = useState('')

  function handleAuth(e) {
    e.preventDefault()
    setMessage('')

    const users = JSON.parse(
      localStorage.getItem('pinterestUsers') || '[]'
    )

    if (mode === 'signup') {
      if (!name.trim()) {
        setMessage('Please enter your name.')
        return
      }

      const exists = users.some(
        user => user.email === email.trim().toLowerCase()
      )

      if (exists) {
        setMessage('Account already exists. Please log in.')
        return
      }

      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      }

      localStorage.setItem(
        'pinterestUsers',
        JSON.stringify([...users, newUser])
      )

      setUserName(newUser.name)
      setLoggedIn(true)
    } else {
      const user = users.find(
        user =>
          user.email === email.trim().toLowerCase() &&
          user.password === password
      )

      if (!user) {
        setMessage('Incorrect email or password.')
        return
      }

      setUserName(user.name)
      setLoggedIn(true)
    }

    setPassword('')
  }

  function logout() {
    setLoggedIn(false)
    setMode('login')
    setEmail('')
    setPassword('')
    setMessage('')
  }

  const filteredPins = pins.filter(pin =>
    `${pin.title} ${pin.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  if (!loggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">

          <div className="auth-logo">P</div>

          <h1>
            {mode === 'login'
              ? 'Welcome to Pinterest'
              : 'Create your account'}
          </h1>

          <p className="auth-subtitle">
            Find new ideas and inspiration.
          </p>

          <form onSubmit={handleAuth}>

            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div className="password-box">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (minimum 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {message && (
              <p className="auth-message">{message}</p>
            )}

            <button type="submit" className="auth-submit">
              {mode === 'login' ? 'Log in' : 'Sign up'}
            </button>

          </form>

          <p className="auth-switch">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}

            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setMessage('')
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>

          <p className="auth-footer">
            Discover ideas. Save inspiration. Create your world.
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="app">

      <header className="navbar">
        <div className="logo">P</div>
        <strong className="brand">Pinterest</strong>

        <button className="nav-btn active">Home</button>
        <button className="nav-btn">Explore</button>

        <input
          className="search"
          placeholder="Search for ideas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <span className="profile">
          {userName.charAt(0).toUpperCase()}
        </span>

        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
      </header>

      <main>
        <h1>Welcome, {userName}! ✨</h1>
        <p className="subtitle">
          Discover your next idea.
        </p>

        <div className="filters">
          {[
            'All ideas',
            'Fashion',
            'Interior',
            'Food',
            'Travel',
            'Nature',
            'Art'
          ].map(category => (
            <button
              key={category}
              onClick={() =>
                setSearch(category === 'All ideas' ? '' : category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        <section className="masonry">
          {filteredPins.map(pin => (
            <article className="pin" key={pin.title}>

              <img
                className="pin-photo"
                src={pin.image}
                alt={pin.title}
              />

              <div className="pin-info">
                <div>
                  <strong>{pin.title}</strong>
                  <small>{pin.category}</small>
                </div>

                <button
                  className={
                    saved.includes(pin.title)
                      ? 'save saved'
                      : 'save'
                  }
                  onClick={() =>
                    setSaved(old =>
                      old.includes(pin.title)
                        ? old.filter(title => title !== pin.title)
                        : [...old, pin.title]
                    )
                  }
                >
                  {saved.includes(pin.title) ? 'Saved ✓' : 'Save'}
                </button>
              </div>

            </article>
          ))}
        </section>

        {filteredPins.length === 0 && (
          <p className="empty">
            No ideas found. Try another search.
          </p>
        )}

      </main>
    </div>
  )
}

import { useState } from 'react'
import './App.css'

const defaultPins = [
  { id: '1', title: 'Dream Home', category: 'Interior', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80' },
  { id: '2', title: 'Fashion Inspiration', category: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80' },
  { id: '3', title: 'Delicious Food', category: 'Food', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80' },
  { id: '4', title: 'Travel Dreams', category: 'Travel', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80' },
  { id: '5', title: 'Cute Workspace', category: 'Interior', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80' },
  { id: '6', title: 'Beautiful Flowers', category: 'Nature', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80' },
  { id: '7', title: 'Coffee Time', category: 'Food', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80' },
  { id: '8', title: 'Creative Ideas', category: 'Art', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80' },
]

function readStorage(key, fallback = []) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [mode, setMode] = useState('login')
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [search, setSearch] = useState('')
  const [activePage, setActivePage] = useState('Home')
  const [saved, setSaved] = useState([])
  const [customPins, setCustomPins] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Interior')
  const [newImage, setNewImage] = useState('')
  const [pinMessage, setPinMessage] = useState('')

  const savedKey = `pinterestSaved_${userEmail}`
  const pinsKey = `pinterestCustomPins_${userEmail}`

  function loadUserData(userEmailAddress) {
    setSaved(readStorage(`pinterestSaved_${userEmailAddress}`))
    setCustomPins(readStorage(`pinterestCustomPins_${userEmailAddress}`))
    setActivePage('Home')
  }

  function handleAuth(e) {
    e.preventDefault()
    setMessage('')

    const users = readStorage('pinterestUsers')

    const cleanEmail = email.trim().toLowerCase()

    if (mode === 'signup') {
      if (!name.trim()) {
        setMessage('Please enter your name.')
        return
      }

      if (password.length < 6) {
        setMessage('Password must contain at least 6 characters.')
        return
      }

      if (users.some(user => user.email === cleanEmail)) {
        setMessage('Account already exists. Please log in.')
        return
      }

      const newUser = {
        name: name.trim(),
        email: cleanEmail,
        password
      }

      localStorage.setItem(
        'pinterestUsers',
        JSON.stringify([...users, newUser])
      )

      setUserName(newUser.name)
      setUserEmail(newUser.email)
      loadUserData(newUser.email)
      setLoggedIn(true)
    } else {
      const user = users.find(
        item => item.email === cleanEmail && item.password === password
      )

      if (!user) {
        setMessage('Incorrect email or password.')
        return
      }

      setUserName(user.name)
      setUserEmail(user.email)
      loadUserData(user.email)
      setLoggedIn(true)
    }

    setPassword('')
  }

  function logout() {
    setLoggedIn(false)
    setMode('login')
    setEmail('')
    setPassword('')
    setMessage('')
    setSearch('')
    setActivePage('Home')
  }

  const allPins = [...customPins, ...defaultPins]

  const filteredPins = allPins.filter(pin =>
    `${pin.title} ${pin.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const visiblePins = activePage === 'Saved Ideas'
    ? filteredPins.filter(pin => saved.includes(pin.id))
    : filteredPins

  function toggleSave(pin) {
    const nextSaved = saved.includes(pin.id)
      ? saved.filter(id => id !== pin.id)
      : [...saved, pin.id]

    setSaved(nextSaved)
    localStorage.setItem(savedKey, JSON.stringify(nextSaved))
  }

  function createPin(e) {
    e.preventDefault()
    setPinMessage('')

    const title = newTitle.trim()
    const image = newImage.trim()

    try {
      const parsedUrl = new URL(image)
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid URL')
      }
    } catch {
      setPinMessage('Please enter a valid image URL starting with https://')
      return
    }

    const newPin = {
      id: `custom-${Date.now()}`,
      title,
      category: newCategory,
      image
    }

    const nextPins = [newPin, ...customPins]
    setCustomPins(nextPins)
    localStorage.setItem(pinsKey, JSON.stringify(nextPins))

    setNewTitle('')
    setNewCategory('Interior')
    setNewImage('')
    setSearch('')
    setPinMessage('Your Pin was created successfully!')
    setActivePage('Home')
  }

  if (!loggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">P</div>

          <h1>
            {mode === 'login' ? 'Welcome to Pinterest' : 'Create your account'}
          </h1>

          <p className="auth-subtitle">
            Find new ideas and inspiration.
          </p>

          <form onSubmit={handleAuth}>
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div className="password-box">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (minimum 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {message && <p className="auth-message">{message}</p>}

            <button type="submit" className="auth-submit">
              {mode === 'login' ? 'Log in' : 'Sign up'}
            </button>
          </form>

          <p className="auth-switch">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}

            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setMessage('')
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>

          <p className="auth-footer">
            Discover ideas. Save inspiration. Create your world.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">P</div>
        <strong className="brand">Pinterest</strong>

        <button
          className={`nav-btn ${activePage === 'Home' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Home')
            setPinMessage('')
          }}
        >
          Home
        </button>

        <button
          className={`nav-btn ${activePage === 'Saved Ideas' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Saved Ideas')
            setPinMessage('')
          }}
        >
          Saved Ideas
        </button>

        <button
          className={`nav-btn ${activePage === 'Create Pin' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Create Pin')
            setPinMessage('')
          }}
        >
          + Create
        </button>

        <input
          className="search"
          placeholder="Search for ideas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button
          className="profile"
          title="Open profile"
          onClick={() => setActivePage('Profile')}
        >
          {userName.charAt(0).toUpperCase()}
        </button>

        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
      </header>

      <main>
        {activePage === 'Profile' ? (
          <section className="profile-page">
            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <h1>{userName}</h1>
            <p className="subtitle">{userEmail}</p>

            <div className="profile-stats">
              <div>
                <strong>{saved.length}</strong>
                <span>Saved ideas</span>
              </div>
              <div>
                <strong>{customPins.length}</strong>
                <span>Created Pins</span>
              </div>
            </div>

            <button
              className="nav-btn active"
              onClick={() => setActivePage('Saved Ideas')}
            >
              View Saved Ideas
            </button>
          </section>
        ) : activePage === 'Create Pin' ? (
          <section className="create-page">
            <h1>Create a Pin ✨</h1>
            <p className="subtitle">Share an idea with your collection.</p>

            <form className="create-form" onSubmit={createPin}>
              <label htmlFor="pin-title">Pin title</label>
              <input
                id="pin-title"
                type="text"
                placeholder="e.g. My Dream Room"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
              />

              <label htmlFor="pin-category">Category</label>
              <select
                id="pin-category"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
              >
                {['Interior', 'Fashion', 'Food', 'Travel', 'Nature', 'Art'].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <label htmlFor="pin-image">Image URL</label>
              <input
                id="pin-image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newImage}
                onChange={e => setNewImage(e.target.value)}
                required
              />

              {pinMessage && <p className="auth-message">{pinMessage}</p>}

              <button type="submit" className="auth-submit">
                Create Pin
              </button>
            </form>
          </section>
        ) : (
          <>
            <h1>
              {activePage === 'Saved Ideas'
                ? 'Your Saved Ideas ❤️'
                : `Welcome, ${userName}! ✨`}
            </h1>

            <p className="subtitle">
              {activePage === 'Saved Ideas'
                ? 'All your favorite ideas in one place.'
                : 'Discover your next idea.'}
            </p>

            {activePage === 'Home' && (
              <div className="filters">
                {['All ideas', 'Fashion', 'Interior', 'Food', 'Travel', 'Nature', 'Art'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSearch(category === 'All ideas' ? '' : category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            <section className="masonry">
              {visiblePins.map(pin => (
                <article className="pin" key={pin.id}>
                  <img
                    className="pin-photo"
                    src={pin.image}
                    alt={pin.title}
                    loading="lazy"
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />

                  <div className="pin-info">
                    <div>
                      <strong>{pin.title}</strong>
                      <small>{pin.category}</small>
                    </div>

                    <button
                      className={saved.includes(pin.id) ? 'save saved' : 'save'}
                      onClick={() => toggleSave(pin)}
                    >
                      {saved.includes(pin.id) ? 'Saved ✓' : 'Save'}
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {visiblePins.length === 0 && (
              <p className="empty">
                {activePage === 'Saved Ideas'
                  ? 'No saved ideas yet. Go Home and save a photo!'
                  : 'No ideas found. Try another search.'}
              </p>
            )}
          </>
        )}
      </main>
    </div>
  )
}

  const [pinMessage, setPinMessage] = useState('')

  const savedKey = `pinterestSaved_${userEmail}`
  const pinsKey = `pinterestCustomPins_${userEmail}`

  function loadUserData(userEmailAddress) {
    setSaved(readStorage(`pinterestSaved_${userEmailAddress}`))
    setCustomPins(readStorage(`pinterestCustomPins_${userEmailAddress}`))
    setActivePage('Home')
  }

  function handleAuth(e) {
    e.preventDefault()
    setMessage('')

    const users = readStorage('pinterestUsers')

    const cleanEmail = email.trim().toLowerCase()

    if (mode === 'signup') {
      if (!name.trim()) {
        setMessage('Please enter your name.')
        return
      }

      if (password.length < 6) {
        setMessage('Password must contain at least 6 characters.')
        return
      }

      if (users.some(user => user.email === cleanEmail)) {
        setMessage('Account already exists. Please log in.')
        return
      }

      const newUser = {
        name: name.trim(),
        email: cleanEmail,
        password
      }

      localStorage.setItem(
        'pinterestUsers',
        JSON.stringify([...users, newUser])
      )

      setUserName(newUser.name)
      setUserEmail(newUser.email)
      loadUserData(newUser.email)
      setLoggedIn(true)
    } else {
      const user = users.find(
        item => item.email === cleanEmail && item.password === password
      )

      if (!user) {
        setMessage('Incorrect email or password.')
        return
      }

      setUserName(user.name)
      setUserEmail(user.email)
      loadUserData(user.email)
      setLoggedIn(true)
    }

    setPassword('')
  }

  function logout() {
    setLoggedIn(false)
    setMode('login')
    setEmail('')
    setPassword('')
    setMessage('')
    setSearch('')
    setActivePage('Home')
  }

  const allPins = [...customPins, ...defaultPins]

  const filteredPins = allPins.filter(pin =>
    `${pin.title} ${pin.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const visiblePins = activePage === 'Saved Ideas'
    ? filteredPins.filter(pin => saved.includes(pin.id))
    : filteredPins

  function toggleSave(pin) {
    const nextSaved = saved.includes(pin.id)
      ? saved.filter(id => id !== pin.id)
      : [...saved, pin.id]

    setSaved(nextSaved)
    localStorage.setItem(savedKey, JSON.stringify(nextSaved))
  }

  function createPin(e) {
    e.preventDefault()
    setPinMessage('')

    const title = newTitle.trim()
    const image = newImage.trim()

    try {
      const parsedUrl = new URL(image)
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid URL')
      }
    } catch {
      setPinMessage('Please enter a valid image URL starting with https://')
      return
    }

    const newPin = {
      id: `custom-${Date.now()}`,
      title,
      category: newCategory,
      image
    }

    const nextPins = [newPin, ...customPins]
    setCustomPins(nextPins)
    localStorage.setItem(pinsKey, JSON.stringify(nextPins))

    setNewTitle('')
    setNewCategory('Interior')
    setNewImage('')
    setSearch('')
    setPinMessage('Your Pin was created successfully!')
    setActivePage('Home')
  }

  if (!loggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">P</div>

          <h1>
            {mode === 'login' ? 'Welcome to Pinterest' : 'Create your account'}
          </h1>

          <p className="auth-subtitle">
            Find new ideas and inspiration.
          </p>

          <form onSubmit={handleAuth}>
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div className="password-box">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (minimum 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {message && <p className="auth-message">{message}</p>}

            <button type="submit" className="auth-submit">
              {mode === 'login' ? 'Log in' : 'Sign up'}
            </button>
          </form>

          <p className="auth-switch">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}

            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setMessage('')
              }}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>

          <p className="auth-footer">
            Discover ideas. Save inspiration. Create your world.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">P</div>
        <strong className="brand">Pinterest</strong>

        <button
          className={`nav-btn ${activePage === 'Home' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Home')
            setPinMessage('')
          }}
        >
          Home
        </button>

        <button
          className={`nav-btn ${activePage === 'Saved Ideas' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Saved Ideas')
            setPinMessage('')
          }}
        >
          Saved Ideas
        </button>

        <button
          className={`nav-btn ${activePage === 'Create Pin' ? 'active' : ''}`}
          onClick={() => {
            setActivePage('Create Pin')
            setPinMessage('')
          }}
        >
          + Create
        </button>

        <input
          className="search"
          placeholder="Search for ideas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button
          className="profile"
          title="Open profile"
          onClick={() => setActivePage('Profile')}
        >
          {userName.charAt(0).toUpperCase()}
        </button>

        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
      </header>

      <main>
        {activePage === 'Profile' ? (
          <section className="profile-page">
            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <h1>{userName}</h1>
            <p className="subtitle">{userEmail}</p>

            <div className="profile-stats">
              <div>
                <strong>{saved.length}</strong>
                <span>Saved ideas</span>
              </div>
              <div>
                <strong>{customPins.length}</strong>
                <span>Created Pins</span>
              </div>
            </div>

            <button
              className="nav-btn active"
              onClick={() => setActivePage('Saved Ideas')}
            >
              View Saved Ideas
            </button>
          </section>
        ) : activePage === 'Create Pin' ? (
          <section className="create-page">
            <h1>Create a Pin ✨</h1>
            <p className="subtitle">Share an idea with your collection.</p>

            <form className="create-form" onSubmit={createPin}>
              <label htmlFor="pin-title">Pin title</label>
              <input
                id="pin-title"
                type="text"
                placeholder="e.g. My Dream Room"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
              />

              <label htmlFor="pin-category">Category</label>
              <select
                id="pin-category"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
              >
                {['Interior', 'Fashion', 'Food', 'Travel', 'Nature', 'Art'].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <label htmlFor="pin-image">Image URL</label>
              <input
                id="pin-image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newImage}
                onChange={e => setNewImage(e.target.value)}
                required
              />

              {pinMessage && <p className="auth-message">{pinMessage}</p>}

              <button type="submit" className="auth-submit">
                Create Pin
              </button>
            </form>
          </section>
        ) : (
          <>
            <h1>
              {activePage === 'Saved Ideas'
                ? 'Your Saved Ideas ❤️'
                : `Welcome, ${userName}! ✨`}
            </h1>

            <p className="subtitle">
              {activePage === 'Saved Ideas'
                ? 'All your favorite ideas in one place.'
                : 'Discover your next idea.'}
            </p>

            {activePage === 'Home' && (
              <div className="filters">
                {['All ideas', 'Fashion', 'Interior', 'Food', 'Travel', 'Nature', 'Art'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSearch(category === 'All ideas' ? '' : category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            <section className="masonry">
              {visiblePins.map(pin => (
                <article className="pin" key={pin.id}>
                  <img
                    className="pin-photo"
                    src={pin.image}
                    alt={pin.title}
                    loading="lazy"
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />

                  <div className="pin-info">
                    <div>
                      <strong>{pin.title}</strong>
                      <small>{pin.category}</small>
                    </div>

                    <button
                      className={saved.includes(pin.id) ? 'save saved' : 'save'}
                      onClick={() => toggleSave(pin)}
                    >
                      {saved.includes(pin.id) ? 'Saved ✓' : 'Save'}
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {visiblePins.length === 0 && (
              <p className="empty">
                {activePage === 'Saved Ideas'
                  ? 'No saved ideas yet. Go Home and save a photo!'
                  : 'No ideas found. Try another search.'}
              </p>
            )}
          </>
        )}
      </main>
    </div>
  )


