// Recoil also does Asynchronous Data Queries
import React from "react";
import {
  selector,
  selectorFamily,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";

/**
  // Synchronous Example

const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

const currentUserNameState = selector({
  key: 'CurrentUserName',
  get: ({get}) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <CurrentUserInfo />
    </RecoilRoot>
  );
}
 */

// Async without parameter
/**
 const WeatherQuery = selector({
  key: "User",
  get:
    (city) =>
    async ({ get }) => {
      const response = await fetch(
        "https://goweather.herokuapp.com/weather/Melbourne"
      );

      // Error handling
      if (response.error) {
        throw response.error;
      }

      return response.json();
    },
});
 */

// Asynchronous Fetch with parameter query - Use selectorFamily
const WeatherQuery = selectorFamily({
  key: "User",
  get: (city) => async () => {
    const response = await fetch(
      `https://goweather.herokuapp.com/weather/${city}`
    );

    // Error handling
    if (response.error) {
      throw response.error;
    }
    return response.json();
  },
});

export default function FetchWeatherData() {
  // const weather = useRecoilValue(WeatherQuery("Melbourne"));
  const weather = useRecoilValueLoadable(WeatherQuery("Melbourne"));

  switch (weather.state) {
    case "hasValue":
      return (
        <div>
          Current temp: {weather.contents.temperature}, description:{" "}
          {weather.contents.description}
        </div>
      );
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      throw weather.contents;
  }
}
