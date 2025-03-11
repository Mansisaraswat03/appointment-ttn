import Link from 'next/link';
import styles from './login.module.css';
import Image from 'next/image';
const Login = () => {
  return (
    <section className={styles.formSection} aria-labelledby="login-heading">
        <div className={styles.formContainer}>
          <h1 id="login-heading" className={styles.title}>Login</h1>
          
          <p className={styles.signupText}>
            Are you a new member?{' '}
            <Link href="/register" className={styles.signupLink}>
              Sign up here.
            </Link>
          </p>

          <form className={styles.form} method="POST" action="/api/login" aria-label="Login Form">
            {/* Email Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                {/* <span className={styles.icon} aria-hidden="true">📧</span> */}
                <Image src="/images/@.svg" alt="Email icon" width={20} height={20} className={styles.icon}/>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="emmawatson@gmail.com"
                  required
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                {/* <span className={styles.icon} aria-hidden="true">🔒</span> */}
                <Image src="/images/lock.svg" alt="Email icon" width={20} height={20} className={styles.icon}/>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  required
                  autoComplete="current-password"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.loginBtn} aria-label="Login to your account">
              Login
            </button>

            {/* Reset Button */}
            <button
              type="reset"
              className={styles.resetBtn}
              aria-label="Reset form fields"
            >
              Reset
            </button>
          </form>

          <div className={styles.footerLinks}>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </section>
  )
}

export default Login
