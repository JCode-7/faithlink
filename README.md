# Faith-Link - Christian Community Platform

A modern, secure platform for believers to connect, share their faith journey, and grow together in Christ.

## 🌟 Features

- **Secure Authentication** - JWT-based sessions with bcrypt password hashing
- **Community Posts** - Share discussions, Bible verses, and prayer requests
- **Real-time Interactions** - Like, comment, and engage with the community
- **Content Moderation** - Automatic filtering to maintain a respectful environment
- **Responsive Design** - Beautiful UI that works on all devices
- **SEO Optimized** - Built for search engine visibility
- **Privacy Focused** - Your data stays secure and private

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/faith-link.git
   cd faith-link
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Edit `.env.local` with your database credentials and secrets.

4. **Set up the database**
   - Create a MySQL database named `faithlink_db`
   - Run the SQL scripts in the `scripts/` folder:
     \`\`\`bash
     mysql -u root -p faithlink_db < scripts/create-database-mysql-fixed.sql
     mysql -u root -p faithlink_db < scripts/seed-data-mysql.sql
     \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Set up Database**
   - Use PlanetScale, Railway, or any MySQL hosting service
   - Update your environment variables with production database credentials

### Deploy to Other Platforms

The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Heroku

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | MySQL host | Yes |
| `DB_USER` | MySQL username | Yes |
| `DB_PASSWORD` | MySQL password | Yes |
| `DB_NAME` | Database name | Yes |
| `DB_PORT` | MySQL port (default: 3306) | Yes |
| `NEXTAUTH_SECRET` | JWT secret key | Yes |
| `NEXTAUTH_URL` | App URL | Yes |
| `NEXT_PUBLIC_BASE_URL` | Public app URL | Yes |

### Security

- Generate a strong `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Regular security updates

## 📊 Analytics & Monitoring

- Built-in health check endpoint: `/api/health`
- Database connection testing: `/api/test-db`
- Optional page view tracking
- Error logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

- **Email**: support@faithlink.app
- **Documentation**: [docs.faithlink.app](https://docs.faithlink.app)
- **Community**: Join our Discord server

## 🌍 Making It Searchable

To make your Faith-Link app discoverable on search engines:

1. **Deploy to a public URL** (Vercel, Netlify, etc.)
2. **Submit to search engines**:
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)
3. **Create quality content** - The seed data provides a good start
4. **Build backlinks** - Share on social media, Christian forums
5. **Optimize for keywords** - "Christian community", "faith sharing", etc.

The app includes:
- ✅ Sitemap.xml
- ✅ Robots.txt  
- ✅ Meta tags & Open Graph
- ✅ Structured data
- ✅ Mobile optimization
- ✅ Fast loading times

---

Built with ❤️ for the global Christian community
