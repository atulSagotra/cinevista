# 🎬 React Native Movie App

A sleek movie browsing app built with **React Native** and **TMDb API**.  
It features a 3D slanted **Now Playing** carousel, a **Coming Soon** section, and detailed movie info — including genres, runtime, synopsis, cast, and cinema options.

---

## ✨ Features

- 🎠 **Stylish carousel** for Now Playing movies with 3D tilt effect
- 🎟 **Coming Soon** horizontal movie list
- 📜 **Movie Detail view** with genre, runtime, rating, synopsis, cast, and cinemas
- 🔍 **Search bar** on HomeScreen (UI placeholder – ready to connect to API)
- 📱 **Responsive UI** for multiple screen sizes
- 🛠 **Clean navigation** with React Navigation stack

---

## 🛠 Tech Stack

- [React Native](https://reactnative.dev/) — Cross-platform mobile framework  
- [React Navigation](https://reactnavigation.org/) — Screen navigation  
- [Axios](https://axios-http.com/) — API calls  
- [TMDb API](https://developer.themoviedb.org/) — Movie database  
- TypeScript (optional, depending on your setup)

---

## 📦 Installation

1. Clone the repository:
git clone https://github.com/yourusername/react-native-movie-app.git
cd react-native-movie-app


2. Install dependencies:
npm install

or
yarn install


3. **(iOS only)** Install CocoaPods dependencies:
cd ios && pod install && cd ..


4. **Add your TMDb API token**  
- Create a `.env` file and store:
  ```
  TMDB_BEARER_TOKEN=your_tmdb_token_here
  ```
- Update the `tmdb.ts` file to import from your `.env`:
  ```
  import { TMDB_BEARER_TOKEN } from '@env';
  ```
*(Current code uses a hardcoded token for demo purposes — replace for production.)*

---

## 🚀 Running the App

For **Android**:
npx react-native run-android


For **iOS**:
npx react-native run-ios


Or start Metro bundler:
npx react-native start

---

## 📂 Project Structure

├── App.tsx # App entry & navigation
├── screens/
│ ├── HomeScreen.tsx # Landing page with carousel & coming soon
│ ├── SeeAllMoviesScreen.tsx # Grid view of movies
│ ├── MovieDetailScreen.tsx # Detailed movie info
├── services/
│ └── tmdb.ts # TMDb API service functions
├── types/
│ └── movie.ts # TS types for API models
└── README.md


---

## 🔑 API Usage

This app uses **[The Movie Database API](https://developer.themoviedb.org/)**.  
Required endpoints in `services/tmdb.ts`:

- `/movie/now_playing`
- `/movie/upcoming`
- `/movie/{id}`
- `/movie/popular` *(optional)*

---

## 📌 Next Steps / TODO

- Connect Search bar to TMDb’s `/search/movie` endpoint  
- Show full cast with profile pictures  
- Play trailers and show related movies  
- Add favorites/watchlist functionality

---

## 📄 License

This project is licensed under the MIT License.