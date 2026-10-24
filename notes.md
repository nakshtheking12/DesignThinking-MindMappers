css:-
/* Decorative background gradient to show off the transparency */
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%);
  min-height: 200vh;
  color: #ffffff;
}

/* Glassmorphism Navbar Configuration */
.navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  border-radius: 16px;
  z-index: 1000;
  
  /* Core Glassmorphism Engine */
  background: rgba(255, 255, 255, 0.07);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  backdrop-filter: blur(12px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

/* Inner Layout Elements */
.logo {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(45deg, #ff007f, #7928ca);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: #ffffff;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #ffffff;
  color: #0f172a;
}

.content-spacer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}


html:-

<nav class="navbar">
  <div class="logo">GlassNav</div>
  <ul class="nav-links">
    <li><a href="#" class="active">Home</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <button class="nav-btn">Get Started</button>
</nav>

<div class="content-spacer">
  <h1>Scroll down to see the glass effect in action.</h1>
</div>
