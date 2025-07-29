# 🌟 Distcom

[![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)](https://github.com/private-archieve/distcom)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Mina Protocol](https://img.shields.io/badge/Mina_Protocol-o1js-orange.svg)](https://minaprotocol.com/)

> A decentralized social networking platform powered by the Mina Blockchain, offering users a seamless, secure, and censorship-resistant environment for authentic social interactions.

## 🚀 Overview

Distcom is a revolutionary decentralized social networking platform that leverages the power and innovation of the **Mina Blockchain** to offer users a seamless, secure, and censorship-resistant environment for social interactions. Unlike traditional social networks governed by centralized entities, Distcom empowers its community by distributing control and ownership directly to its users.

## ✨ Features

### 🔐 Core Social Features
- **User Profiles** - Customizable user profiles with authentication
- **Messaging System** - Real-time communication between users
- **Groups & Communities** - Create and join topic-based communities
- **Blog Publishing** - Share long-form content with the community
- **Social Feed** - Discover and interact with community content
- **Search & Discovery** - Find users, groups, and content easily

### 🛡️ Blockchain-Powered Features
- **Zero-Knowledge Proofs** - Privacy-preserving interactions
- **Decentralized Voting** - Community governance through smart contracts
- **Donation System** - Support creators and communities
- **Event Management** - Organize and participate in community events
- **Censorship Resistance** - Content stored on decentralized infrastructure

### 🎨 User Experience
- **Modern UI/UX** - Built with Tailwind CSS and Radix UI
- **Responsive Design** - Optimized for desktop and mobile
- **Real-time Updates** - Live notifications and messaging
- **Dark/Light Mode** - Customizable theme preferences

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 15.1.3 with App Router
- **Language**: TypeScript 5.7.2
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS with custom components
- **Components**: Radix UI primitives
- **Icons**: FontAwesome & Lucide React
- **State Management**: Zustand
- **Animations**: Motion (Framer Motion)

### Blockchain & Backend
- **Blockchain**: Mina Protocol
- **ZK Framework**: o1js (SnarkyJS)
- **Database**: InstantDB
- **Authentication**: Custom wallet integration
- **Smart Contracts**: Custom voting, donation, and event contracts

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Next.js with Turbo
- **Linting**: Built-in Next.js linting
- **Type Checking**: TypeScript strict mode

## 🌍 Why Mina Blockchain?

The Mina Blockchain stands out as the **world's lightest blockchain**, boasting a constant-sized blockchain of just **22 kilobytes**. This lightweight architecture ensures that Distcom remains:

- **Scalable** - Efficient performance regardless of network size
- **Accessible** - No need for hefty computational resources
- **Private** - Zero-knowledge proofs protect user data
- **Secure** - Cryptographic verification without data exposure

## 🎯 The Distcom Vision

At its core, Distcom envisions a democratized digital social space where individuals can connect without intermediaries, ensuring that their voices remain authentic and unfiltered. By harnessing the transformative potential of the Mina Blockchain, Distcom aims to:

### 🗽 Promote Digital Freedom
Create an environment where users can express themselves freely without fear of undue censorship or surveillance.

### 🤝 Foster Community Ownership
Encourage collaborative governance, allowing the community to make decisions that shape the platform's future.

### 💚 Enhance Digital Well-being
Implement features and protocols that prioritize user well-being, reducing the negative impacts often associated with conventional social media platforms.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/private-archieve/distcom.git
   cd distcom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 📁 Project Structure

```
distcom/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── blogs/             # Blog functionality
│   │   ├── groups/            # Groups and communities
│   │   ├── messages/          # Messaging system
│   │   ├── profile/           # User profiles
│   │   └── ...
│   ├── Base/                   # Core application logic
│   │   ├── DistcomZKBase/     # Zero-knowledge proof implementations
│   │   ├── MinaProtocol/      # Mina blockchain integration
│   │   │   ├── Contracts/     # Smart contracts
│   │   │   └── Tests/         # Contract tests
│   │   └── ...
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── Pages/                 # Page components
│   └── store/                 # State management
├── public/                    # Static assets
├── Archieve/                  # Legacy code and examples
└── package.json              # Project dependencies
```

## 🔗 Smart Contracts

Distcom includes several smart contracts built with o1js:

- **DonationContract** - Handle community donations and funding
- **VoteContract** - Implement decentralized governance
- **EventContract** - Manage community events
- **MessageContract** - Secure messaging functionality

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use existing UI components when possible
- Write tests for new smart contracts
- Ensure responsive design for all components
- Follow the existing code style and conventions

## 📜 License

This project is part of the private-archieve organization. Please refer to the repository settings for license information.

## 🌐 Links & Resources

- **Mina Protocol**: [https://minaprotocol.com/](https://minaprotocol.com/)
- **o1js Documentation**: [https://docs.minaprotocol.com/zkapps](https://docs.minaprotocol.com/zkapps)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Documentation**: [https://react.dev/](https://react.dev/)

## 📞 Support

For questions, issues, or contributions, please:

- Open an issue in this repository
- Check existing documentation
- Review the project's discussion board

---

<div align="center">

**Built with ❤️ for the decentralized future**

*Empowering communities through blockchain technology*

</div> 