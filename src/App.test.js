import React from "react";
import { shallow } from "enzyme";
import axios from "axios";

import App from "./App";

jest.mock("axios");

it("fetches albums on mount", () => {
  shallow(<App />);

  expect(axios.get).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/albums"
  );
});
