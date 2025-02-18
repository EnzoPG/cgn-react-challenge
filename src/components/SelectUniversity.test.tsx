// eslint-disable-next-line no-unused-vars
import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { SelectUniversity } from "./SelectUniversity"
import fetchMock from 'jest-fetch-mock'

describe("Select Component", () => {

  beforeEach(() => {
    fetchMock.resetMocks(); // Clear mocks before each test
  });

  test("renders the Select component correctly", () => {
    render(
      <Provider store={store}>
        <SelectUniversity disabled={false} label={`Please type an university name`} />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Type to search...")).toBeInTheDocument();
  });

  test("displays results when user types a search query", async () => {
    render(
      <Provider store={store}>
        <SelectUniversity disabled={false} label={`Please type an university name`} />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Type to search...");

    fireEvent.change(input, { target: { value: "Tri" } });

    await waitFor(() => {
      expect(screen.getByText("Triton College")).toBeInTheDocument();
    });
  });

  test("hides results when input is cleared", async () => {
    render(
      <Provider store={store}>
        <SelectUniversity disabled={false} label={`Please type an university name`} />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Type to search...");

    fireEvent.change(input, { target: { value: "Oxford" } });

    await waitFor(() => {
      expect(screen.getByText("University of Oxford")).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryByText("University of Oxford")).not.toBeInTheDocument();
    });
  });

  test("shows 'No results found' when search has no matches", async () => {
    render(
      <Provider store={store}>
        <SelectUniversity disabled={false} label={`Please type an university name`} />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Type to search...");
    fireEvent.change(input, { target: { value: "tests" } });

    await waitFor(() => {
      expect(screen.getByText("Nessuna università trovata")).toBeInTheDocument();
    });
  });
});
