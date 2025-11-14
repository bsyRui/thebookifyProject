"use client"

import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../auth/authProvider"
import useUserProfile from "../../hooks/user/Profile"
import "./../../styles/componentstyles/header.css"
import UserProfile from "../user/userProfile"; // adjust path if needed

const Header = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const { user, logout } = useAuth()
  const userId = user?.user_id
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useUserProfile(userId)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hideHeader, setHideHeader] = useState(false)

  // Handle scroll to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setHideHeader(true)
      } else {
        setHideHeader(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim() !== "") {
      navigate(`/books?title=${encodeURIComponent(searchTerm.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate("/")
  }

  // Para exibir a imagem de perfil correta, pegamos do profile (fallback para avatar do user ou placeholder)
  const avatarUrl = profile?.image_url || user?.avatar || "/placeholder.svg?height=36&width=36"
  const displayName = profile?.full_name || user?.username || user?.email || "User"
  const emailDisplay = profile?.email || user?.email || ""

  return (
    <header className={hideHeader ? "header-hidden" : ""}>
      <div className="topbar">
        <div className="left-corner">
          
          <Link to="/" id="icon">
            Venezuela.
          </Link>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              name="title"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              autoComplete="off"
            />
            <button type="submit" aria-label="Submit search">
              <i class="bi bi-search"></i>
            </button>
          </form>
          </div>
          <div className="pages">
            <Link to="/main">
              <span>Explore</span>
            </Link>
            {user ? (
              <>
                <Link to="/dashboard">
                  <span>Dashboard</span>
                </Link>
                <Link to="/social">
                  <span>Social</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <span>About Us</span>
                </Link>
                <a href="#contact">
                  <span>Contact Us</span>
                </a>
              </>
            )}
            <a href="#community">
              <span>Community</span>
            </a>
          </div>

        <div className="right-corner">
          

          {user ? (
            <div className="user-section" title={displayName}>
              <UserProfile/>
            </div>
          ) : (
            <button
              type="button"
              className="btnJoin"
              aria-label="Join us"
              onClick={() => navigate("/join")}
            >
              <i className="icon-user-plus"></i>
              Join Us
            </button>
          )}

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={mobileMenuOpen ? "icon-x" : "icon-menu"}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <Link to="/" id="mobile-icon" onClick={() => setMobileMenuOpen(false)}>
            Venezuela.
          </Link>
          <button
            type="button"
            className="mobile-close"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="icon-x"></i>
          </button>
        </div>

        <form className="mobile-search" onSubmit={handleSearch}>
          <i class="bi bi-search"></i>
          <input
            type="text"
            name="title"
            placeholder="Search books, authors, genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            autoComplete="off"
          />
          <button type="submit" aria-label="Submit search">
            <i className="icon-arrow-right"></i>
          </button>
        </form>

        <nav className="mobile-nav">
          <Link to="/main" onClick={() => setMobileMenuOpen(false)}>
            <i className="icon-compass"></i>
            <span>Explore</span>
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <i className="icon-layout-dashboard"></i>
                <span>Dashboard</span>
              </Link>
              <Link to="/gamification" onClick={() => setMobileMenuOpen(false)}>
                <i className="icon-trophy"></i>
                <span>Gamification</span>
              </Link>
              <Link to="/podcast" onClick={() => setMobileMenuOpen(false)}>
                <i className="icon-headphones"></i>
                <span>Podcasts</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <i className="icon-info"></i>
                <span>About Us</span>
              </Link>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <i className="icon-mail"></i>
                <span>Contact Us</span>
              </a>
            </>
          )}

          <a href="#community" onClick={() => setMobileMenuOpen(false)}>
            <i className="icon-users"></i>
            <span>Community</span>
          </a>
        </nav>

        {user ? (
          <div className="mobile-user-section">
            <div className="mobile-user-info">
              <img
                src={avatarUrl || "/placeholder.svg?height=50&width=50"}
                alt={displayName}
                className="user-avatar"
                width={50}
                height={50}
              />
              <div className="user-details">
                <div className="user-name">{displayName}</div>
                <div className="user-email">{emailDisplay}</div>
              </div>
            </div>

            <div className="mobile-user-actions">
              <button
                type="button"
                onClick={() => {
                  navigate("/dashboard")
                  setMobileMenuOpen(false)
                }}
              >
                <i className="icon-user"></i>
                My Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/settings")
                  setMobileMenuOpen(false)
                }}
              >
                <i className="icon-settings"></i>
                Settings
              </button>
              <button type="button" className="logout" onClick={handleLogout}>
                <i className="icon-log-out"></i>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="mobile-btnJoin"
            onClick={() => {
              setMobileMenuOpen(false)
              navigate("/join")
            }}
          >
            <i className="icon-user-plus"></i>
            Join Us
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
