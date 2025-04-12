# Argentina Precio Comparison

<p align="center">
  <img src="public/placeholder-logo.svg" alt="Argentina Precio Logo" width="120" />
</p>

## 🌟 Overview

Argentina Precio Comparison is a web application designed to compare product prices across Argentina, Chile, Brazil, and the USA. The platform helps users understand purchasing power differences, analyze international price variations, and visualize dollar value differences across these regions.

## 🚀 Features

### Price Comparator

Compare specific products across different countries:
- View price differences in USD
- See percentage differences
- Understand purchasing power variations

### Categories

Explore whether Argentina is expensive or cheap in different product categories:
- Technology (+85% more expensive in Argentina)
- Clothing & Footwear (+45% more expensive)
- Supermarket & Food (+30% more expensive)
- Housing (-20% cheaper in Argentina)
- Transport (-35% cheaper in Argentina)

Each category includes:
- Visual indicators of price differences
- Trend indicators (whether prices are increasing or decreasing)
- Detailed product comparisons within each category

## 💻 Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library based on Radix UI
- **Data**: Currently using mock data (API integration planned for future)

## 🛠️ Project Structure

```
/app                    # Next.js App Router structure
  /categorias           # Categories feature
    /[slug]             # Dynamic category detail pages
  /comparador           # Price comparator feature
  /layout.tsx           # Main application layout
  /page.tsx             # Homepage

/components             # Reusable UI components
  /ui                   # UI component library
  /theme-provider.tsx   # Theme context provider

/hooks                  # Custom React hooks

/lib                    # Utility functions

/public                 # Static assets

/styles                 # Global styles
```

## 📊 Data Analysis

The application analyzes price differences across countries to help users understand:

- How much more/less expensive products are in Argentina compared to other countries
- Which categories offer better value in Argentina
- How currency fluctuations affect purchasing power

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (supports React 19)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/franciscobeccaria/dolar-caro-fe.git
cd dolar-caro-fe

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

Note: The `--legacy-peer-deps` flag is required due to React 19 compatibility with some dependencies.

### Building for Production

```bash
npm run build
npm start
```

## 🔮 Future Plans

- Connect to real-time price comparison APIs
- Add user accounts for saving favorite comparisons
- Implement historical price tracking
- Add more countries for comparison
- Create mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Francisco Beccaria

---

<p align="center">
Built with ❤️ for understanding international purchasing power
</p>
