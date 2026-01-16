import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyPage } from "../../features/user";
import { renderWithProviders, mockUser } from "../../testing/testUtils";

// useApiRequestのモック
const mockExecute = vi.fn();
const mockClearError = vi.fn();

vi.mock("../../hooks/useApiRequest", () => ({
  useApiRequest: () => ({
    execute: mockExecute,
    isLoading: false,
    error: null,
    clearError: mockClearError,
  }),
}));

describe("MyPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ユーザー情報が表示される", () => {
    renderWithProviders(<MyPage />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    expect(screen.getByText("マイページ")).toBeInTheDocument();
    expect(screen.getByText("ユーザー情報")).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it("パスワード変更フォームが表示される", () => {
    renderWithProviders(<MyPage />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    expect(screen.getByText("パスワード変更")).toBeInTheDocument();
    expect(screen.getByLabelText("現在のパスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("新しいパスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("新しいパスワード（確認）")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "パスワードを変更" })
    ).toBeInTheDocument();
  });

  it("ホームに戻るリンクが表示される", () => {
    renderWithProviders(<MyPage />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    const homeLink = screen.getByRole("link", { name: "ホームに戻る" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("パスワード変更が成功した場合、成功メッセージが表示される", async () => {
    mockExecute.mockResolvedValueOnce({ message: "パスワードを変更しました" });

    renderWithProviders(<MyPage />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    const user = userEvent.setup();

    await user.type(screen.getByLabelText("現在のパスワード"), "oldpassword");
    await user.type(screen.getByLabelText("新しいパスワード"), "newpassword123");
    await user.type(
      screen.getByLabelText("新しいパスワード（確認）"),
      "newpassword123"
    );
    await user.click(screen.getByRole("button", { name: "パスワードを変更" }));

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith("/api/password", {
        method: "PUT",
        body: {
          current_password: "oldpassword",
          new_password: "newpassword123",
          new_password_confirmation: "newpassword123",
        },
      });
    });
  });

  it("パスワード変更後にフォームがクリアされる", async () => {
    mockExecute.mockResolvedValueOnce({ message: "パスワードを変更しました" });

    renderWithProviders(<MyPage />, {
      authValue: { user: mockUser, isAuthenticated: true },
    });

    const user = userEvent.setup();

    const currentPasswordInput = screen.getByLabelText("現在のパスワード");
    const newPasswordInput = screen.getByLabelText("新しいパスワード");
    const confirmPasswordInput = screen.getByLabelText(
      "新しいパスワード（確認）"
    );

    await user.type(currentPasswordInput, "oldpassword");
    await user.type(newPasswordInput, "newpassword123");
    await user.type(confirmPasswordInput, "newpassword123");
    await user.click(screen.getByRole("button", { name: "パスワードを変更" }));

    await waitFor(() => {
      expect(currentPasswordInput).toHaveValue("");
      expect(newPasswordInput).toHaveValue("");
      expect(confirmPasswordInput).toHaveValue("");
    });
  });
});
