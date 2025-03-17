'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.link}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.png" alt="MedCare Logo" width={30} height={30} />
          MedCare
        </Link>

        {/* Desktop Menu */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/appointments">Appointments</Link>
          </li>
          <li>
            <Link href="/doctors">Doctors</Link>
          </li>
          <li>
            <Link href="/reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <Link href="/login">
          <button className={styles.loginBtn}>Login</button>
        </Link>
        <Link href="/register">
          <button className={styles.registerBtn}>Register</button>
        </Link>

        {/* Hamburger Icon */}
        <button className={styles.menuIcon} onClick={toggleMenu} aria-label="Toggle Menu">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile Slider Menu */}
      <div className={`${styles.sliderMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.sliderHeader}>
          <Link href="/" className={styles.logo}>
            <Image src="/images/logo.png" alt="MedCare Logo" width={30} height={30} />
            MedCare
          </Link>
          <button onClick={toggleMenu} className={styles.closeIcon} aria-label="Close Menu">
            <FiX size={28} />
          </button>
        </div>

        <ul className={styles.sliderLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/appointments">Appointments</Link>
          </li>
          <li>
            <Link href="/health-blog">Health Blog</Link>
          </li>
          <li>
            <Link href="/reviews">Reviews</Link>
          </li>
        </ul>

        <div className={styles.sliderActions}>
          <Link href="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
          <Link href="/register">
            <button className={styles.registerBtn}>Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
