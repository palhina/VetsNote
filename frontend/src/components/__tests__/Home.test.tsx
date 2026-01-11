import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { Home } from "../Home";
import { renderWithProviders, mockUser } from "../../test/testUtils";

// useHomeDataのモック
vi.mock("../../hooks/useHomeData", () => ({
  useHomeData: () => ({
    cases: [],
    notes: [],
    isLoading: false,
    handleDeleteCase: vi.fn(),
    handleDeleteNote: vi.fn(),
  }),
}));

// useSearchのモック
vi.mock("../../hooks/useSearch", () => ({
  useSearch: () => ({
    searchQuery: "",
    setSearchQuery: vi.fn(),
    isSearching: false,
    searchedCases: [],
    searchedNotes: [],
    isLoading: false,
    handleSearch: vi.fn(),
    handleClearSearch: vi.fn(),
    handleKeyDown: vi.fn(),
  }),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("HOMEタイトルが表示される", () => {
    renderWithProviders(<Home />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    expect(screen.getByRole("heading", { name: "HOME" })).toBeInTheDocument();
  });

  it("ログインユーザーの名前が表示される", () => {
    renderWithProviders(<Home />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    expect(
      screen.getByText(`ようこそ、${mockUser.name}さん`)
    ).toBeInTheDocument();
  });

  it("マイページリンクが表示される", () => {
    renderWithProviders(<Home />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    const myPageLink = screen.getByRole("link", { name: "マイページ" });
    expect(myPageLink).toBeInTheDocument();
    expect(myPageLink).toHaveAttribute("href", "/mypage");
  });

  it("新規作成リンクが表示される", () => {
    renderWithProviders(<Home />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    const createLink = screen.getByRole("link", { name: "+ 新規作成" });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute("href", "/create");
  });

  it("ユーザーがnullの場合、ようこそメッセージは表示されない", () => {
    renderWithProviders(<Home />, {
      authValue: { user: null, isAuthenticated: false },
    });

    expect(screen.queryByText(/ようこそ/)).not.toBeInTheDocument();
  });
});
