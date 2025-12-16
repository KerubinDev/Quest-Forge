# Security Policy

## 🔒 Reporting a Vulnerability

The QuestForge team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

📧 **[Your Email Here]** with the subject line: `[SECURITY] QuestForge Vulnerability Report`

### What to Include

Please include the following information in your report:

- **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass)
- **Full paths** of source file(s) related to the vulnerability
- **Location** of the affected source code (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact** of the vulnerability and how an attacker might exploit it

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt of your vulnerability report within 48 hours
- **Updates**: We'll provide regular updates on our progress
- **Timeline**: We aim to patch critical vulnerabilities within 7 days
- **Credit**: We'll credit you in our security advisories (unless you prefer to remain anonymous)

## 🛡️ Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes            |
| < 1.0   | ❌ No             |

## 🔐 Security Best Practices

### For Developers

- Always use **environment variables** for sensitive data (API keys, database credentials)
- Never commit `.env` files or secrets to the repository
- Keep **dependencies up to date** to avoid known vulnerabilities
- Use **parameterized queries** to prevent SQL injection
- Implement **proper input validation** on all user inputs
- Use **HTTPS** for all production deployments
- Enable **CORS** properly to prevent unauthorized access
- Implement **rate limiting** on API endpoints
- Use **JWT tokens** with appropriate expiration times
- Hash passwords with **bcrypt** (already implemented)

### For Deployments

- Use **strong, unique passwords** for all services
- Enable **two-factor authentication** where possible
- Keep **PostgreSQL** behind a firewall, not publicly accessible
- Use **environment-specific** configurations (dev, staging, production)
- Regularly **backup your database**
- Monitor **logs** for suspicious activity
- Use **SSL/TLS certificates** for production deployments
- Implement **security headers** (Helmet middleware already included)

## 🔍 Known Security Considerations

### Current Implementation

- ✅ **JWT Authentication** with access and refresh tokens
- ✅ **Password Hashing** with bcrypt
- ✅ **Helmet.js** for security headers
- ✅ **CORS** configuration
- ✅ **Input Validation** with class-validator
- ✅ **SQL Injection Protection** via TypeORM parameterized queries

### Future Enhancements

- 🔄 Rate limiting on authentication endpoints
- 🔄 Two-factor authentication (2FA)
- 🔄 Account lockout after failed login attempts
- 🔄 Audit logging for sensitive operations
- 🔄 Security scanning in CI/CD pipeline

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security Best Practices](https://docs.nestjs.com/security/authentication)
- [React Security Best Practices](https://react.dev/learn/keeping-components-pure)

## 🙏 Thank You

Thank you for helping keep QuestForge and our users safe!
